import re
from .models import NetworkTraffic, SystemLog

def normalize_ip(ip):
    return ip.lower()

def parse_logs(raw_logs):
    """
    Example: Parse logs to extract meaningful data.
    """
    parsed_logs = []
    for log in raw_logs:
        # Example of parsing log message
        parsed_logs.append(log.message.strip())
    return parsed_logs

def preprocess_network_data():
    # Fetch network traffic data from the database
    network_data = NetworkTraffic.objects.all()

    for data in network_data:
        data.source_ip = normalize_ip(data.source_ip)
        data.destination_ip = normalize_ip(data.destination_ip)
        data.save()

    return network_data

def preprocess_system_logs():
    logs = SystemLog.objects.all()
    return parse_logs(logs)