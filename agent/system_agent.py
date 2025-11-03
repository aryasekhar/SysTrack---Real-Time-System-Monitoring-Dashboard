# agent/system_agent.py
import psutil
import platform
import requests
import socket
import time
from datetime import datetime

# Configuration
API_URL = "http://localhost:8000/metrics/"
INTERVAL_SECONDS = 10  # Send data every 10 seconds

def collect_metrics():
    """
    Collect system metrics from the local machine
    """
    # Determine disk path based on platform
    disk_path = '/' if platform.system() != "Windows" else 'C:\\'
    
    return {
        "hostname": socket.gethostname(),
        "cpu_usage": psutil.cpu_percent(interval=1),
        "memory_usage": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage(disk_path).percent,
        "timestamp": datetime.utcnow().isoformat()
    }

def send_data():
    """
    Send collected metrics to the backend API
    """
    data = collect_metrics()
    try:
        response = requests.post(API_URL, json=data, timeout=5)
        if response.status_code == 201:
            print(f"✅ Data sent successfully: {data['hostname']} - CPU: {data['cpu_usage']}%, MEM: {data['memory_usage']}%, DISK: {data['disk_usage']}%")
        else:
            print(f"⚠️  Server responded with status code: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print(f"❌ Error: Cannot connect to API at {API_URL}. Make sure the backend is running.")
    except requests.exceptions.Timeout:
        print(f"❌ Error: Request timeout while connecting to {API_URL}")
    except Exception as e:
        print(f"❌ Error sending data: {e}")

def run_agent():
    """
    Run the agent continuously, sending data at regular intervals
    """
    print(f"🚀 SysTrack Agent started")
    print(f"📡 Sending metrics to: {API_URL}")
    print(f"⏱️  Interval: {INTERVAL_SECONDS} seconds")
    print(f"🖥️  Monitoring: {socket.gethostname()}\n")
    
    while True:
        send_data()
        time.sleep(INTERVAL_SECONDS)

if __name__ == "__main__":
    try:
        run_agent()
    except KeyboardInterrupt:
        print("\n\n🛑 Agent stopped by user")
