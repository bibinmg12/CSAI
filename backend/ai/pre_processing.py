
from backend.settings import db
import re

def normalize_ip(ip):
    return ip.lower()

def preprocess_network_data():
    """
    Preprocess network traffic data, normalize IPs.
    """
    network_traffic = db.network_traffic.find()

    for data in network_traffic:
        data["source_ip"] = normalize_ip(data["source_ip"])
        data["destination_ip"] = normalize_ip(data["destination_ip"])
        db.network_traffic.update_one({"_id": data["_id"]}, {"$set": data})
    
    return network_traffic

def preprocess_system_logs():
    """
    Preprocess system logs to extract and clean information.
    """
    logs = db.system_logs.find()
    cleaned_logs = []

    for log in logs:
        cleaned_logs.append(log["message"].strip())  # Clean and strip logs

    return cleaned_logs