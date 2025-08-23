from fastapi import APIRouter, UploadFile, File, HTTPException
from services.storage import upload_to_s3
import uuid
import boto3
import os
from services.s3_service import list_files, generate_presigned_url
from services.insights_service import extract_text_from_docx,summarize_text
from openai import OpenAI
import docx2txt
from fastapi import APIRouter, UploadFile, File, HTTPException
import json

AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

router = APIRouter()


s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION", "eu-north-1")
)
@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    # Only allow Word docs
    if not (file.filename.endswith(".docx") or file.filename.endswith(".doc")):
        raise HTTPException(status_code=400, detail="Only Word documents allowed")

    unique_filename = f"{uuid.uuid4()}-{file.filename}"
    
    # Upload to S3
    file_url = upload_to_s3(file, unique_filename)

    return {"message": "File uploaded successfully", "file_url": file_url}



@router.get("/documents")
def list_documents():
    """List all uploaded documents in S3 bucket."""
    files = list_files()
    return {"documents": files}

@router.get("/documents/{filename}/download")
def download_document(filename: str):
    """Generate a presigned URL to download a document."""
    try:
        url = generate_presigned_url(filename)
        return {"download_url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# ✅ Bedrock client
bedrock = boto3.client(
    "bedrock-runtime",
    region_name="eu-north-1",   # change to your region
)

MODEL_ID = "amazon.nova-lite-v1:0"  # Nova Lite model
@router.post("/documents/insights")
async def document_insights(file: UploadFile = File(...)):
    try:
        # ✅ Ensure /tmp exists
        os.makedirs("/tmp", exist_ok=True)

        # ✅ Save uploaded file
        temp_path = f"/tmp/{file.filename}"
        with open(temp_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # ✅ Extract text
        text = docx2txt.process(temp_path)
        if not text.strip():
            raise HTTPException(status_code=400, detail="Document is empty or unreadable")

        # ✅ Format request for Nova Lite
        body = json.dumps({
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"text": f"Summarize this document for beginners:\n\n{text[:4000]}"}  
                    ]
                }
            ],
            "inferenceConfig": {
                "maxTokens": 500,
                "temperature": 0.7,
                "topP": 0.9
            }
        })

        # ✅ Invoke Bedrock
        response = bedrock.invoke_model(
            modelId=MODEL_ID,
            contentType="application/json",
            accept="application/json",
            body=body,
        )

        result = json.loads(response["body"].read())
        summary = result["output"]["message"]["content"][0]["text"]

        return {
            "filename": file.filename,
            "summary": summary
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
