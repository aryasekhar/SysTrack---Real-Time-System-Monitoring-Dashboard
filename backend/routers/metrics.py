# backend/routers/metrics.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from datetime import datetime

from database import get_db
from models import Metric
from schemas import MetricCreate, MetricResponse

router = APIRouter(prefix="/metrics", tags=["Metrics"])

@router.post("/", response_model=MetricResponse, status_code=201)
def add_metric(metric: MetricCreate, db: Session = Depends(get_db)):
    """
    Add a new system metric to the database
    """
    db_metric = Metric(
        hostname=metric.hostname,
        cpu_usage=metric.cpu_usage,
        memory_usage=metric.memory_usage,
        disk_usage=metric.disk_usage,
        timestamp=metric.timestamp or datetime.utcnow()
    )
    db.add(db_metric)
    db.commit()
    db.refresh(db_metric)
    return db_metric

@router.get("/", response_model=List[MetricResponse])
def get_metrics(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all metrics with pagination
    """
    metrics = db.query(Metric).order_by(desc(Metric.timestamp)).offset(skip).limit(limit).all()
    return metrics

@router.get("/latest", response_model=List[MetricResponse])
def get_latest_metrics(db: Session = Depends(get_db)):
    """
    Get the latest metric for each unique hostname
    """
    # Subquery to get max timestamp per hostname
    from sqlalchemy import func
    subquery = db.query(
        Metric.hostname,
        func.max(Metric.timestamp).label('max_timestamp')
    ).group_by(Metric.hostname).subquery()
    
    # Join to get full records
    latest_metrics = db.query(Metric).join(
        subquery,
        (Metric.hostname == subquery.c.hostname) & 
        (Metric.timestamp == subquery.c.max_timestamp)
    ).all()
    
    return latest_metrics

@router.get("/{hostname}", response_model=List[MetricResponse])
def get_metrics_by_hostname(hostname: str, limit: int = 50, db: Session = Depends(get_db)):
    """
    Get metrics for a specific hostname
    """
    metrics = db.query(Metric).filter(
        Metric.hostname == hostname
    ).order_by(desc(Metric.timestamp)).limit(limit).all()
    
    if not metrics:
        raise HTTPException(status_code=404, detail=f"No metrics found for hostname: {hostname}")
    
    return metrics

@router.delete("/{metric_id}")
def delete_metric(metric_id: int, db: Session = Depends(get_db)):
    """
    Delete a specific metric by ID
    """
    metric = db.query(Metric).filter(Metric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")
    
    db.delete(metric)
    db.commit()
    return {"status": "success", "message": f"Metric {metric_id} deleted"}
