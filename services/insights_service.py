# services/insights_service.py
from docx import Document
import openai, os

openai.api_key = os.getenv("OPENAI_API_KEY")

def extract_text_from_docx(file_path: str) -> str:
    doc = Document(file_path)
    return "\n".join([p.text for p in doc.paragraphs if p.text.strip()])

def summarize_text(text: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes documents."},
            {"role": "user", "content": f"Summarize this document:\n{text}"}
        ]
    )
    return response["choices"][0]["message"]["content"]
