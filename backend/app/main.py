from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models, crud
from app.schemas import MessageCreate, MessageResponse
from app.llm import generate_reply
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Curelink Mini AI Health Coach")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def greet():
    return "Hi, I am Disha. Nice to meet you!"

@app.get("/messages", response_model=list[MessageResponse])
def load_messages(limit: int = 20, offset: int = 0, db: Session = Depends(get_db)):
    return crud.get_messages(db, limit, offset)

@app.post("/messages", response_model=MessageResponse)
def send_message(payload: MessageCreate, db: Session = Depends(get_db)):
    if not payload.content.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    user_msg = crud.create_message(db, "user", payload.content)

    recent = crud.get_recent_messages(db, 20)
    context = [{"role": m.role, "content": m.content} for m in reversed(recent)]

    reply = generate_reply(context, payload.content)
    assistant_msg = crud.create_message(db, "assistant", reply)

    return assistant_msg
