# PowerShell script to start all SysTrack components

Write-Host "🚀 Starting SysTrack System Monitoring Dashboard..." -ForegroundColor Cyan
Write-Host ""

$baseDir = "c:\Users\anjan\OneDrive\Desktop\Monitoring system"

# Start Backend
Write-Host "1️⃣ Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\backend'; .\venv\Scripts\Activate.ps1; python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "2️⃣ Starting Frontend Dashboard..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\frontend'; npm run dev"

Start-Sleep -Seconds 5

# Start Agent
Write-Host "3️⃣ Starting System Agent..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\agent'; python system_agent.py"

Write-Host ""
Write-Host "✅ All components started!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Dashboard: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window (services will keep running)..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
