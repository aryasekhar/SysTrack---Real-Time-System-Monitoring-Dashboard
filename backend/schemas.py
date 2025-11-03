# backend/schemas.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class MetricBase(BaseModel):
    hostname: str = Field(..., description="Machine hostname")
    cpu_usage: float = Field(..., ge=0, le=100, description="CPU usage percentage")
    memory_usage: float = Field(..., ge=0, le=100, description="Memory usage percentage")
    disk_usage: float = Field(..., ge=0, le=100, description="Disk usage percentage")

class MetricCreate(MetricBase):
    timestamp: Optional[datetime] = None

class MetricResponse(MetricBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
