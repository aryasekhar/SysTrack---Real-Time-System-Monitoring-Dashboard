# SysTrack — System Health & Network Monitoring Dashboard

🌐 **A full-stack web application for real-time system and network monitoring**

## 🎯 Overview

SysTrack monitors system and network metrics (CPU usage, memory, disk, ping status) across multiple client machines, displaying them in real-time on a web dashboard.

## ⚙️ Tech Stack

- **Frontend**: React (Vite) + Bootstrap
- **Backend**: FastAPI (Python)
- **Database**: SQLite
- **Agent**: Python script for metrics collection
- **Deployment**: Docker Compose (optional)

## 🗂️ Project Structure

```
SysTrack/
├── backend/          # FastAPI backend
├── agent/            # System metrics collector
├── frontend/         # React dashboard
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Backend Setup

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on: http://localhost:8000

### Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

Frontend will run on: http://localhost:5173

### Agent Setup

```powershell
cd agent
pip install -r requirements.txt
python system_agent.py
```

## 📊 Features

- ✅ Real-time system metrics collection
- ✅ Multi-client monitoring
- ✅ RESTful API endpoints
- ✅ Responsive dashboard UI
- ✅ Historical data storage
- ✅ Data visualization with charts

## 🔗 API Endpoints

- `POST /metrics/` - Submit new metrics
- `GET /metrics/` - Retrieve all metrics
- `GET /metrics/latest` - Get latest metrics per host
- `GET /docs` - Interactive API documentation

## 🎨 Dashboard Features

- System health overview table
- Real-time metric updates
- Per-host metric tracking
- Timestamp tracking

## 📝 License

MIT License

## 👤 Author

Built for Infosys Systems Engineer role demonstration
