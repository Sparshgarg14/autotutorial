from fastapi import FastAPI
from routes import documents
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Doc Hub Backend")

# Register routes
app.include_router(documents.router, prefix="/documents", tags=["Documents"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
