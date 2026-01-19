from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS

EMBED_MODEL = "nomic-embed-text"

embeddings = OllamaEmbeddings(model=EMBED_MODEL)


def build_vectorstore(documents):
    return FAISS.from_documents(documents, embeddings)
