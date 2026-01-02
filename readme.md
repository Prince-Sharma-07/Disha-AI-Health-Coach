# 🩺 Disha — Mini AI Health Coach

This project is a **mini AI health coach** built as part of the Curelink Backend Engineer take-home assignment.

Disha simulates a **WhatsApp-like health conversation**, where users can chat naturally about symptoms, stress, and general well-being, and receive **safe, empathetic, health-focused guidance** powered by a real LLM.

The focus of this project is **backend architecture, LLM safety, and real-world chat behavior**, not visual polish.

---

## ✨ Key Features

- Single-session, WhatsApp-like chat experience  
- Persistent chat history (scroll up to load older messages)  
- Short-term conversational memory via context window  
- Rule-based medical protocols for common conditions  
- Health-only domain enforcement (no off-topic drift)  
- Strong system prompt to maintain consistent persona  
- Real LLM integration (OpenAI)  
- Clean, professional frontend (Next.js + Tailwind)

---

## 🏗️ Tech Stack

### Backend
- **FastAPI** (Python)
- **SQLite + SQLAlchemy** (persistent storage)
- **OpenAI API** (LLM responses)
- **Pydantic** (validation & schemas)

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**

---

## 🔁 User Flow

1. User opens the chat interface  
2. Latest messages load automatically  
3. Older messages load when scrolling upward  
4. User sends a message  
5. Backend processes the message in this order:
   - Greeting detection  
   - Medical protocol check (rule-based)  
   - Health-domain enforcement  
   - LLM call with recent context  
6. AI responds as **Disha**, the health coach  
7. Conversation continues in a single chat session  

---

## 🧠 Backend Architecture

```
Backend/
├── app/
│   ├── main.py           # FastAPI app & routes
│   ├── database.py       # DB connection
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── crud.py           # DB operations
│   ├── llm.py            # LLM orchestration
│   ├── protocols.py     # Medical protocols
│   └── config.py        # Environment config
```

## Design Highlights

1. Database is the source of truth for chat history
2. LLM context is bounded to avoid token overflow
3. Deterministic medical protocols override the LLM
4. Domain guard is enforced in backend logic, not only via prompts

---

## 🧠 LLM Design & Prompting

1. LLM Provider
2. OpenAI (gpt-4o-mini)
3. Prompt Strategy
4. A strong system prompt defines:
5. Persona (Disha)
6. Tone (empathetic, human, WhatsApp-like)
7. Medical safety boundaries
8. Refusal behavior for non-health topics
9. Only the most recent messages are sent as context
10. This ensures continuity without context overflow

---

## 🩺 Medical Safety & Guardrails

1. Rule-Based Protocols
2. Protocols are applied for common conditions such as:
3. Fever
4. Cold & cough
5. Headache
6. Digestive issues
7. Fatigue
8. Stress & anxiety
9. These protocols:
   -Provide deterministic, safe advice
   -Never diagnose or prescribe medication
   -Always include guidance on when to consult a doctor
   -Health-Only Enforcement
10. If a user asks about:
   -Programming
   -AI / ML   
   -Finance, business, or other non-health topics
   Disha politely refuses and redirects the conversation back to health.

---

## 🚀 Running the Project Locally

Backend Setup:
```
cd Backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

Create a .env file inside Backend/:
```
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=sqlite:///./chat.db
```

Run the backend:
```
uvicorn app.main:app --reload
```

Backend URL:
```
http://127.0.0.1:8000
```

API Docs:
```
http://127.0.0.1:8000/docs
```
Frontend Setup:
```
cd Frontend
npm install
```

Create .env.local:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run the frontend:
```
npm run dev
```

##Frontend URL:
```
http://localhost:3000
```
---

## 🔒 CORS

CORS is explicitly enabled in FastAPI to allow the frontend origin during local development.

---

## ⚡ Redis (Nice-to-Have)

1. Redis was mentioned as a nice-to-have.
2. It was intentionally not added because:
3. Single user
4. Single session
5. No performance bottlenecks
6. SQLite is sufficient
7. Where Redis Would Fit at Scale
8. Caching recent chat context
9. Rate-limiting LLM calls
10. Ephemeral session state
11. This was a deliberate trade-off, not an omission.

---

## 📉 Trade-offs & Limitations

1. No authentication
2. No multi-user support
3. No long-term user memory
4. No WebSockets (polling-style UX)
5. English only
6. All trade-offs were made to keep the system:
7. Simple
8. Explainable
9. Aligned with the assignment goals

---

## 🔮 If I Had More Time…

1. Long-term memory via fact extraction
2. Severity scoring for symptoms
3. Redis caching at scale
4. WebSocket-based real-time updates
5. Multilingual support
6. Analytics & monitoring
