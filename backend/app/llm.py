import os 
from langchain_ollama import ChatOllama

LLM_MODEL = "llama3.1"

OLLAMA_BASE_URL = os.getenv(
    "OLLAMA_BASE_URL",
    "http://localhost:11434"
)

# Clean string output (no metadata)
llm = ChatOllama(
    model=LLM_MODEL,
    base_url=OLLAMA_BASE_URL
 ) 
