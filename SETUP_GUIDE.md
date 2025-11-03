# SysTrack Setup Guide

Complete step-by-step guide to get SysTrack running on your system.

## 📋 Prerequisites

- **Python 3.8+** installed
- **Node.js 16+** and npm installed
- **Git** (optional)

## 🚀 Setup Instructions

### Step 1: Backend Setup

1. Open PowerShell and navigate to the backend directory:
```powershell
cd "c:\Users\anjan\OneDrive\Desktop\Monitoring system\backend"
```

2. Create a Python virtual environment:
```powershell
python -m venv venv
```

3. Activate the virtual environment:
```powershell
.\venv\Scripts\Activate.ps1
```

4. Install dependencies:
```powershell
pip install -r requirements.txt
```

5. Start the backend server:
```powershell
uvicorn main:app --reload
```

The backend should now be running on: **http://localhost:8000**

You can view the API docs at: **http://localhost:8000/docs**

---

### Step 2: Frontend Setup

1. Open a **NEW PowerShell window** and navigate to the frontend directory:
```powershell
cd "c:\Users\anjan\OneDrive\Desktop\Monitoring system\frontend"
```

2. Install npm dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend should now be running on: **http://localhost:5173**

---

### Step 3: Agent Setup

1. Open a **THIRD PowerShell window** and navigate to the agent directory:
```powershell
cd "c:\Users\anjan\OneDrive\Desktop\Monitoring system\agent"
```

2. Install dependencies:
```powershell
pip install -r requirements.txt
```

3. Run the agent:
```powershell
python system_agent.py
```

The agent will start collecting metrics every 10 seconds and sending them to the backend.

---

## 🎯 Verification

1. Open your browser and go to: **http://localhost:5173**
2. You should see the SysTrack dashboard
3. Within 10 seconds, you should see metrics appearing from your machine
4. The dashboard will auto-refresh every 10 seconds

---

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed: `python --version`
- Ensure port 8000 is not in use
- Check that all dependencies installed correctly

### Frontend won't start
- Make sure Node.js is installed: `node --version`
- Try deleting `node_modules` and running `npm install` again
- Ensure port 5173 is not in use

### Agent connection errors
- Verify the backend is running on http://localhost:8000
- Check your firewall settings
- Make sure the API_URL in `system_agent.py` is correct

---

## 🐳 Docker Alternative (Optional)

If you have Docker installed, you can run everything with:

```powershell
docker-compose up
```

This will start both backend and frontend in containers.

---

## 📊 Project Features Demonstrated

✅ **System Administration**: Monitoring CPU, memory, disk usage
✅ **Network Management**: Client-server communication via REST API
✅ **Backend Development**: FastAPI with SQLAlchemy ORM
✅ **Database Design**: SQLite with proper schema
✅ **Frontend Development**: React with real-time updates
✅ **API Design**: RESTful endpoints with proper documentation
✅ **Deployment**: Docker containerization ready

---

## 🎓 Interview Talking Points

- **System Metrics Collection**: Using psutil library for cross-platform monitoring
- **REST API Design**: Implemented CRUD operations with FastAPI
- **Database Schema**: Normalized tables with proper indexing
- **Real-time Updates**: Polling mechanism with 10-second intervals
- **Error Handling**: Graceful degradation when services are unavailable
- **Scalability**: Agent can run on multiple machines simultaneously
- **Code Organization**: Modular structure with separation of concerns

---

## 📝 Next Steps to Enhance

1. Add authentication/authorization
2. Implement WebSocket for true real-time updates
3. Add alerting system for threshold breaches
4. Create charts using Chart.js
5. Add historical data analysis
6. Implement network latency monitoring
7. Add support for custom metrics

---

## 📞 Support

For issues or questions, check:
- Backend API docs: http://localhost:8000/docs
- Frontend console for errors (F12 in browser)
- Agent console output for connection issues
