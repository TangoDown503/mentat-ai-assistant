from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import shutil
import os
from typing import Optional
from pydantic import ValidationError

from app.rag import run_rag
from app.llm import llm
from app.schemas import AskRequest

app = FastAPI(title="Ollama RAG API")

# --- CORS (needed for React) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/ask")
async def ask(
    question: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    #VALIDATE THE INPUT
    try:
        data = AskRequest(question=question)
    except ValidationError as e:
        message = e.errors()[0]["msg"]
        raise HTTPException(status_code=400, detail=message)

    # CHAT MODE
    if file is None:
        response = llm.invoke(data.question)
        return {"answer": response.content}

    # DOCUMENT MODE
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400, 
            detail="Only PDF files are supported")

    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file, tmp)
        temp_path = tmp.name

    try:
        answer = run_rag(temp_path, data.question)
        return {"answer": answer}
    finally:
        os.remove(temp_path)
