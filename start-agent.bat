@echo off
echo Starting SysTrack Agent...
cd /d "%~dp0agent"
python system_agent.py
pause
