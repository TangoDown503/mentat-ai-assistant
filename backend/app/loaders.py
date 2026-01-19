from langchain_community.document_loaders import PyPDFLoader, PDFPlumberLoader


def load_documents_safe(pdf_path: str):
    try:
        loader = PyPDFLoader(pdf_path)
        return loader.load()
    except KeyError as e:
        if "bbox" in str(e):
            print("Making a small adjustment")
            loader = PDFPlumberLoader(pdf_path)
            return loader.load()
        raise
