
from django.utils.timezone import now
from django.http import HttpRequest
from pymongo import MongoClient
from backend.settings import db
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import pytz

# Email credentials


SENDER_EMAIL = "bibincsai@gmail.com"
SENDER_PASSWORD = ""

ADMIN = "admi.csai777@gmail.com"
ADMIN_PASSWORD =""


def get_formatted_ist_time():
    ist = pytz.timezone('Asia/Kolkata')
    now_ist = datetime.now(ist)
    return now_ist.strftime("%d-%m-%Y %I:%M:%S %p")  # Example: "21-05-2025 03:21:54 PM"


def send_threat_alert_to_admin(threat_data_list):
    print("🚨 Sending threat alert email to admin...")

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = ADMIN
    msg['Subject'] = '🚨 Critical Alert: Multiple Threats Detected in Network System'

    body = "Hello Admin,\n\n⚠️ Multiple threats have been detected in the system:\n\n"

    for i, threat in enumerate(threat_data_list, start=1):
        body += f"""
Threat #{i}
- 🛡️ Type: {threat['threat']}
- 🌐 Source IP: {threat['source_ip']}
- 🎯 Destination IP: {threat['destination_ip']}
- ⏱️ Timestamp: {threat['timestamp']}
- 📄 Data: {threat.get('data', 'N/A')}
---------------------------
"""

    body += "\nPlease review the Intrusion Detection Dashboard for further insights and take necessary action.\n\nRegards,\nCSAI Threat Detection System"

    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        print("✅ Threat alert email sent to admin.")
    except Exception as e:
        print(f"❌ Failed to send threat alert to admin: {e}")


class NetworkTrafficMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest):
        try:
            full_path = request.get_full_path()

            # Threat patterns (SQLi, XSS, path traversal)

            suspicious_patterns = [
                # SQL Injection
                r"(?i)(\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bWHERE\b|\bOR\b\s+\d+=\d+)",

                # XSS attacks
                r"(?i)<script.*?>.*?</script>",
                r"(?i)javascript:",
                r"(?i)on\w+=['\"]?[^>]+",
                r"(?i)<iframe.*?>",
                r"(?i)<img\s+src=['\"]?javascript:.*?>",
                r"(?i)<svg.*?on\w+=.*?>",

                # Path traversal
                r"(\.\.\/|\.\.\\)+",

                # Basic command injection
                r"(?i)(;|\||&&|`|\$\(.*?\)|\bcat\b|\bwget\b|\bcurl\b|\bnc\b|\bping\b)",

                # SSRF / internal IP hits
                r"(127\.0\.0\.1|localhost|169\.254|\.internal)"
            ]


            # suspicious_patterns = [
            #     r"(?:\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b)",
            #     r"\bOR\b\s+\d+=\d+",
            #     r"<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>",
            #     r"(?:\.\.\/|\.\.\\)"
            # ]

            is_threat = any(re.search(pattern, full_path, re.IGNORECASE) for pattern in suspicious_patterns)

            if is_threat:
                # Prepare logs
                network_log = {
                    "source_ip": request.META.get('REMOTE_ADDR'),
                    "destination_ip": request.META.get('HTTP_HOST'),
                    "protocol": request.META.get('SERVER_PROTOCOL'),
                    "method": request.method,
                    "path": full_path,
                    "raw_data": dict(request.GET),
                    "timestamp": get_formatted_ist_time(),
                    "threat_detected": True
                }

                db.network_traffic.insert_one(network_log)

                db.system_logs.insert_one({
                    "message": f"⚠️ Threat detected in request path: {full_path}",
                    "level": "THREAT",
                    "source_ip": network_log["source_ip"],
                    "destination_ip": network_log["destination_ip"],
                    "timestamp": network_log["timestamp"],
                    "data": full_path
                })

                threat_data = {
                    "threat": "Malicious Pattern Detected",
                    "source_ip": network_log["source_ip"],
                    "destination_ip": network_log["destination_ip"],
                    "timestamp": network_log["timestamp"],
                    "data": full_path
                }

                db.threats.insert_one(threat_data)
                send_threat_alert_to_admin([threat_data])

        except Exception as e:
            db.system_logs.insert_one({
                "message": f"Failed to process request in NetworkTrafficMiddleware: {str(e)}",
                "level": "ERROR",
                "timestamp": get_formatted_ist_time()
            })

        return self.get_response(request)

        

