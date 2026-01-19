from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain

from app.llm import llm
from app.embeddings import build_vectorstore
from app.loaders import load_documents_safe
from app.prompts import QA_PROMPT


def run_rag(pdf_path: str, question: str) -> str:
    # Load PDF safely
    documents = load_documents_safe(pdf_path)

    # Split
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )
    docs = splitter.split_documents(documents)

    # Vector store & retriever
    vectorstore = build_vectorstore(docs)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    # Chains
    document_chain = create_stuff_documents_chain(
        llm=llm,
        prompt=QA_PROMPT
    )

    retrieval_chain = create_retrieval_chain(
        retriever=retriever,
        combine_docs_chain=document_chain
    )

    # Invoke
    response = retrieval_chain.invoke({"input": question})
    return response["answer"]
