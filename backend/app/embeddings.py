from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from app.llm import OLLAMA_BASE_URL


EMBED_MODEL = "nomic-embed-text"

embeddings = OllamaEmbeddings(
    model=EMBED_MODEL,
    base_url=OLLAMA_BASE_URL
)


def build_vectorstore(documents):
    return FAISS.from_documents(documents, embeddings)
