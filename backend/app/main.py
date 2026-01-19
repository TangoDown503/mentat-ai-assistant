from app.llm import llm
from app.rag import run_rag

# CHAT MODE

def run_chat(question: str) -> str:
    response = llm.invoke(question)
    return response.content

# APP ENTRY POINT

def run_app(): 
    while True:
        print("=== Ollama LangChain Assistant ===\n")

        pdf_path = input("PDF path (press Enter to skip): ").strip()
        question = input("Your question: ").strip()

        while not question:
                print("Error: Nothing was given to Mentat")
                question = input("Ask your question any time: ").strip()

        if not pdf_path:
            print("\nChat mode:\n")
            print("Thinking....\n")
            print(run_chat(question))
        else:
            print("\nDocument mode:\n")
            print("Thinking....\n")
            print(run_rag(pdf_path, question))

        other_question = input("\n\n Want to ask something else? Type Y or N:  ").strip().upper()

        if other_question == "N":
             break

if __name__ == "__main__":
    run_app()
