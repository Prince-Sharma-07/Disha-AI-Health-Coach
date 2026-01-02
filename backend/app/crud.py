from sqlalchemy.orm import Session
from app.models import Message

def create_message(db: Session, role: str, content: str):
    msg = Message(role=role, content=content)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

def get_messages(db: Session, limit: int, offset: int):
    return (
        db.query(Message)
        .order_by(Message.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

def get_recent_messages(db: Session, limit: int):
    return (
        db.query(Message)
        .order_by(Message.created_at.desc())
        .limit(limit)
        .all()
    )
