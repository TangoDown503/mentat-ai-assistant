from langchain_core.prompts import ChatPromptTemplate

QA_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a careful AI assistant. "
        "Answer the question using ONLY the provided context. "
        "Be as descriptive as the context allows you to be."
        "If the answer is not in the context, say: "
        "'I could not find that information in the document.'"
        "Answer in the language the user uses to ask you a question."
    ),
    (
        "human",
        "Context:\n{context}\n\nQuestion:\n{input}"
    )
])