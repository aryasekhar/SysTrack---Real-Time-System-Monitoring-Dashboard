# backend/utils/system_info.py
import psutil
import platform
import socket
from datetime import datetime

def get_system_metrics():
    """
    Collect current system metrics from the local machine
    """
    return {
        "hostname": socket.gethostname(),
        "cpu_usage": psutil.cpu_percent(interval=1),
        "memory_usage": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage('/').percent if platform.system() != "Windows" else psutil.disk_usage('C:\\').percent,
        "timestamp": datetime.utcnow().isoformat()
    }

def get_system_info():
    """
    Get detailed system information
    """
    return {
        "hostname": socket.gethostname(),
        "platform": platform.system(),
        "platform_release": platform.release(),
        "platform_version": platform.version(),
        "architecture": platform.machine(),
        "processor": platform.processor(),
        "cpu_count": psutil.cpu_count(),
        "total_memory_gb": round(psutil.virtual_memory().total / (1024**3), 2)
    }

def check_network_connectivity(host="8.8.8.8", port=53, timeout=3):
    """
    Check network connectivity by attempting to connect to a host
    """
    try:
        socket.setdefaulttimeout(timeout)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
        return True
    except socket.error:
        return False
