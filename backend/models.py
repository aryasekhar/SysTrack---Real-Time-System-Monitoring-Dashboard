# backend/models.py
from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
from datetime import datetime

class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    hostname = Column(String, index=True)
    cpu_usage = Column(Float)
    memory_usage = Column(Float)
    disk_usage = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Metric(hostname={self.hostname}, cpu={self.cpu_usage}%)>"
