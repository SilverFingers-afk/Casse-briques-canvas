from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from models import Score

app = FastAPI()

# Autoriser le frontend local à appeler l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# Créer les tables si elles n'existent pas
Base.metadata.create_all(bind=engine)

class ScoreCreate(BaseModel):
    player: str = Field(min_length=1, max_length=50)
    points: int = Field(ge=0)

class ScoreRead(ScoreCreate):
    id: int

    model_config = {"from_attributes": True}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/scores", response_model=ScoreRead, status_code=201)
def create_score(
    data: ScoreCreate,
    db: Session = Depends(get_db)
):
    score = Score(
        player=data.player,
        points=data.points
    )

    db.add(score)
    db.commit()
    db.refresh(score)

    return score

@app.get("/scores", response_model=list[ScoreRead])
def get_scores(db: Session = Depends(get_db)):
    statement = (
        select(Score)
        .order_by(Score.points.desc(), Score.id.asc())
        .limit(10)
    )

    return db.scalars(statement).all()