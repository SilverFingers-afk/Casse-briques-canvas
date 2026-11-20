from datetime import datetime, timezone
from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from database import Base

class Score(Base):
    __tablename__ = "scores"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    player: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    points: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None)
    )