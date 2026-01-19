# 🧠 Mentat — Local AI Document Assistant

Mentat is a **local-first AI assistant** that allows users to **ask questions** or **summarize PDF documents** using a large language model running **entirely on their own machine**.

The project is split into:
- a **FastAPI backend** that handles AI inference, document loading, and retrieval-augmented generation (RAG)
- a **React + Vite frontend** that provides a clean, modern user interface

The AI model is served locally using **Ollama**, enabling privacy-preserving, offline-capable inference.

---

## ✨ Key Features

- Ask natural language questions
- Upload PDF documents for summarization or Q&A
- Retrieval-Augmented Generation (RAG)
- Local LLM inference via Ollama (no cloud dependency)
- Clean React UI
- Modular, production-ready backend structure

---

## 🏗️ Project Structure

```text
Mentat/
├── backend/
│   ├── app/
│   │   ├── api.py
│   │   ├── llm.py
│   │   ├── rag.py
│   │   ├── embeddings.py
│   │   ├── loaders.py
│   │   ├── prompts.py
│   │   ├── schemas.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .venv/
├── mentat-ui/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## ⚙️ Requirements

### System Requirements
- **Python 3.12+**
- **Node.js 18+**
- **Ollama** installed locally

---

## 🧠 Backend Dependencies (Python)

Installed via `pip` inside a virtual environment:

- fastapi
- uvicorn\[standard\]
- langchain
- langchain-community
- langchain-text-splitters
- langchain-ollama
- pypdf
- pydantic
- python-multipart
- requests
- numpy

All backend dependencies are listed in:
backend/requirements.txt

## ⚛️ Frontend Dependencies (Node / React)

Installed automatically via `npm install` from `package.json`.

Key libraries include:
- react
- react-dom
- vite
- tailwindcss
- lucide-react
- clsx
- class-variance-authority

---

## 🤖 Ollama Setup

Mentat relies on Ollama to run LLMs locally.

1. Install Ollama  
   👉 https://ollama.com

2. Pull a model (example):
   ```bash
   ollama pull llama3.1

 Ollama must be running for the backend to work.

Installation & Running the Project
1️⃣ Backend Setup
cd backend
python -m venv .venv
.\.venv\Scripts\Activate   # Windows
pip install -r requirements.txt


Start the API:

uvicorn app.api:app --reload


📍 Backend runs at:

http://localhost:8000


API docs available at:

http://localhost:8000/docs

2️⃣ Frontend Setup
cd mentat-ui
npm install
npm run dev


📍 Frontend runs at:

http://localhost:5173

🧪 Development Notes

The backend and frontend run as separate servers

Ollama handles model inference locally

No cloud services are required

🔒 Privacy & Local-First Design

All AI inference happens locally via Ollama:

No prompts are sent to third-party APIs

Documents never leave your machine

Internet connection is optional after setup

📌 Future Improvements

Streaming responses

Model selection from the UI

Chat history

Authentication

Dockerized deployment

Cloud-optional inference backends
