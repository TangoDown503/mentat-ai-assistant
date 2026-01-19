from langchain_ollama import ChatOllama

LLM_MODEL = "llama3.1"

# Clean string output (no metadata)
llm = ChatOllama(model=LLM_MODEL) 
