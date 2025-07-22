

import re
from backend.settings import db
from datetime import datetime

def signature_based_detection():
    # Expanded patterns for various common web attacks
    # sql_injection_pattern = r"""(?ix)  # ignore case, verbose
    #     (                         # start group for SQLi
    #         \b(select|union|drop|insert|delete|update|create|alter|truncate)\b  # SQL keywords
    #         |(--|#|;|\bOR\b|\bAND\b)             # comment or boolean operators often used in injections
    #         |(['"]\s*(or|and)\s*['"]?\d+=\d+)   # ' OR 1=1 type injections
    #     )
    # """

    sql_injection_pattern = r"(?i)(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\-\-|\bOR\b\s+1=1)"


    xss_pattern = r"(?i)<script.*?>.*?</script.*?>"  # simple script tag XSS detection

    path_traversal_pattern = r"(\.\./|\.\.\\)"      # directory traversal

    command_injection_pattern = r"(\b(exec|system|passthru|shell_exec|popen|proc_open)\b)"  # PHP command injection

    detected_threats = []

    network_traffic = db.network_traffic.find()

    for packet in network_traffic:
        raw_data = packet.get("raw_data", "")

        if re.search(sql_injection_pattern, raw_data):
            detected_threats.append({
                'threat': 'SQL Injection',
                'source_ip': packet.get('source_ip', ''),
                'destination_ip': packet.get('destination_ip', ''),
                'timestamp': packet.get('timestamp'),
                'data': raw_data
            })

        elif re.search(xss_pattern, raw_data):
            detected_threats.append({
                'threat': 'XSS Attack',
                'source_ip': packet.get('source_ip', ''),
                'destination_ip': packet.get('destination_ip', ''),
                'timestamp': packet.get('timestamp'),
                'data': raw_data
            })

        elif re.search(path_traversal_pattern, raw_data):
            detected_threats.append({
                'threat': 'Path Traversal',
                'source_ip': packet.get('source_ip', ''),
                'destination_ip': packet.get('destination_ip', ''),
                'timestamp': packet.get('timestamp'),
                'data': raw_data
            })

        elif re.search(command_injection_pattern, raw_data):
            detected_threats.append({
                'threat': 'Command Injection',
                'source_ip': packet.get('source_ip', ''),
                'destination_ip': packet.get('destination_ip', ''),
                'timestamp': packet.get('timestamp'),
                'data': raw_data
            })

    return detected_threats


def anomaly_based_detection():
    detected_anomalies = []
    network_traffic = db.network_traffic.find()

    ip_count = {}

    for packet in network_traffic:
        ip = packet.get("source_ip", None)
        if ip:
            ip_count[ip] = ip_count.get(ip, 0) + 1

    for ip, count in ip_count.items():
        if count > 3:  # Example threshold
            detected_anomalies.append({
                'threat': 'Unusual Login Attempts',
                'source_ip': ip,
                'destination_ip': 'N/A',  # or extract from packet if needed
                'timestamp': datetime.utcnow(),  # add to match structure
                'data': f'{count} login attempts detected'
                # 'threat': 'Unusual Login Attempts',
                # 'ip': ip,
                # 'attempts': count
            })

    return detected_anomalies


def detect_threats():
    threats = []
    threats += signature_based_detection()
    threats += anomaly_based_detection()
    return threats
