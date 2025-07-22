from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import SuspiciousOperation
import json
import base64
import smtplib
import hashlib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import Request
from bson import ObjectId
from email.mime.image import MIMEImage
import subprocess
from datetime import datetime, timezone, timedelta
from pymongo import MongoClient
from bson.objectid import ObjectId
from django.core.files.storage import FileSystemStorage, default_storage
from django.views.decorators.http import require_http_methods, require_POST

from gridfs import GridFS

import os
import numpy as np
import random
import mimetypes
import uuid
import tempfile
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser , FormParser
from rest_framework.response import Response
from rest_framework import status
from .detection_engine import detect_threats
from .data_collection import collect_network_traffic
from .pre_processing import preprocess_network_data
import pytz
import csv
import joblib
from urllib.parse import urlparse
import validators
from cryptography.fernet import Fernet

# from ai.utils.encryption import generate_key, encrypt_file, decrypt_file
from ai.serializers import EncryptedFileUploadSerializer


import traceback
import logging
import requests
logger = logging.getLogger(__name__)


import string
from dotenv import load_dotenv
load_dotenv()
from django.http import Http404
from django.http import HttpResponse


# from ai.utils import (
#     antivirus_scanner, face_detector, deepfake_image,
#     deepfake_video, metadata_analyzer, gan_detector, danger_score
# )


# Create your views here.

MONGO_URI = "mongodb://localhost:27017"
MONGO_DB_NAME = "CSAI"
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[MONGO_DB_NAME]
user_collection=mongo_db["user"]
login_collection=mongo_db["login"]
login_capture=mongo_db["login_attempts"]
deepfake_result=mongo_db["deepfake_results"]

system_logs=mongo_db["system_logs"]
network_traffic = mongo_db["network_traffic"]
email_breaches = mongo_db["email_breaches"]
email_analytics = mongo_db["email_analytics"]
password_check = mongo_db["password_check"]
email_filter = mongo_db["email_filter"]
url_analysis = mongo_db["url_analysis"]
file_sharing = mongo_db["file_sharing"]
breach_collection = mongo_db["breach_collection"]
otps = mongo_db["otps"]

ip_list = mongo_db["ip_list"]
ip_attempts = mongo_db["ip_storing_attempts"]
blacklisted_log = mongo_db['blacklisted_log']
threats_collection = mongo_db["threats"]

scan_results = mongo_db["malware_scaning"]

fs = GridFS(mongo_db)




# failed_attempts = defaultdict(int)

# Your Gmail sender account
SENDER_EMAIL = "bibincsai@gmail.com"
SENDER_PASSWORD = ""

ADMIN = "admi.csai777@gmail.com"
ADMIN_PASSWORD =""


MAX_ATTEMPTS = 3
BLOCK_DURATION_MINUTES = 30


def get_formatted_ist_time():
    ist = pytz.timezone('Asia/Kolkata')
    now_ist = datetime.now(ist)
    return now_ist.strftime("%d-%m-%Y %I:%M:%S %p")  # Example: "21-05-2025 03:21:54 PM"


def user_disp(request):
    pipeline = [
        {
            "$lookup": {
                "from": "login",                
                "localField": "loginid",      
                "foreignField": "_id",         
                "as": "login_info"           
            }
        },
        {
            "$unwind": "$login_info"          
        },
        {
            "$project": {                      
                "_id": {"$toString": "$_id"},
                "name": 1,
                "contact": 1,
                "email": "$login_info.email"    
            }
        }
    ]

    user_list = list(mongo_db["user"].aggregate(pipeline))
    return JsonResponse(user_list, safe=False)

import re

# @csrf_exempt
# def register_user(request):
#     if request.method == "POST":
#         try:
#             name = request.POST.get('name', '').strip()
#             contact = request.POST.get('contact', '').strip()
#             email = request.POST.get('email', '').strip()
#             password = request.POST.get('password', '').strip()
#             usertype = request.POST.get("usertype", '').strip()

#             # Basic empty check
#             if not name or not contact or not email or not password or not usertype:
#                 return JsonResponse({"error": "All fields are required"}, status=400)

#             # Name must not contain digits
#             if any(char.isdigit() for char in name):
#                 return JsonResponse({"error": "Name should not contain numbers"}, status=400)

#             # Contact must be 10 digits
#             if not re.match(r'^\d{10}$', contact):
#                 return JsonResponse({"error": "Contact number must be exactly 10 digits"}, status=400)

#             # Email format check
#             if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
#                 return JsonResponse({"error": "Invalid email format"}, status=400)

#             # Check if email already exists
#             if mongo_db.login.find_one({"email": email}):
#                 return JsonResponse({"error": "Email already registered"}, status=400)

#             # Password minimum length check
#             if len(password) < 6:
#                 return JsonResponse({"error": "Password must be at least 6 characters"}, status=400)

#             # Usertype validation
#             if usertype not in ["User", "Admin"]:
#                 return JsonResponse({"error": "Invalid usertype"}, status=400)

#             # Insert login details
#             login_data = {
#                 "email": email,
#                 "password": password,
#                 "usertype": usertype,
#             }
#             login_result = mongo_db.login.insert_one(login_data)

#             # Insert user details
#             user_data = {
#                 "name": name,
#                 "contact": contact,
#                 "loginid": login_result.inserted_id,
#             }
#             mongo_db.user.insert_one(user_data)

#             return JsonResponse({"message": "User registered successfully"}, status=201)

#         except Exception as e:
#             return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

#     return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            name = request.POST.get('name')
            contact = request.POST.get('contact')
            email = request.POST.get('email')
            password = request.POST.get('password')
            usertype = request.POST.get("usertype")

            # Basic field validation
            if not name or not contact or not email or not password or not usertype:
                return JsonResponse({"error": "All fields are required"}, status=400)

            # Check if email already exists
            if mongo_db.login.find_one({"email": email}):
                return JsonResponse({"error": "Email is already registered"}, status=400)

            # Insert login credentials
            login_data = {
                "email": email,
                "password": password,
                "usertype": usertype,
            }
            login_result = mongo_db.login.insert_one(login_data)

            # Insert user profile details
            user_data = {
                "name": name,
                "contact": contact,
                "loginid": login_result.inserted_id,
            }
            mongo_db.user.insert_one(user_data)

            return JsonResponse({"message": "User registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
# @csrf_exempt
# def register_user(request):
#     if request.method == "POST":
#         try:
#             name = request.POST.get('name')
#             contact = request.POST.get('contact')
#             email = request.POST.get('email')
#             password = request.POST.get('password')
#             usertype = request.POST.get("usertype")

#             if not name or not contact or not email or not password or not usertype:
#                 return JsonResponse({"error": "All fields are required"}, status=400)

#             login_data = {
#                 "email": email,
#                 "password": password,
#                 "usertype": usertype,
                
#             }
            
#             login_result=mongo_db.login.insert_one(login_data)
#             user_data = {
#                 "name": name,
#                 "contact": contact,
#                 "loginid": login_result.inserted_id, 
#             }
#             mongo_db.user.insert_one(user_data)

#             return JsonResponse({"message": "User registered successfully"}, status=201)

#         except Exception as e:
#             return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

#     return JsonResponse({"error": "Invalid request method"}, status=405)



# @csrf_exempt
# def login_view(request):
#     if request.method == 'POST':
#         ip = get_client_ip(request)
#         # ip = request.META.get('REMOTE_ADDR') You can replace with get_client_ip() if needed

#         # Step 1: Check if IP is blacklisted
#         if ip_list.find_one({"ip": ip, "type": "blacklist"}):
#             return JsonResponse({"error": "Your IP is blocked."}, status=403)

#         data = json.loads(request.body)
#         email = data.get('email')
#         password = data.get('password')

#         user = login_collection.find_one({'email': email, 'password': password})
#         if user:
#             # Step 2: Reset failed attempt counter for this IP
#             ip_attempts.delete_one({"ip": ip})

#             request.session['user_id'] = str(user['_id'])
#             request.session['usertype'] = user['usertype']
#             return JsonResponse({
#                 'message': 'Login successful',
#                 'usertype': user['usertype'],
#                 'userId': str(user['_id'])
#             })
#         else:
#             # Step 3: Record failed attempt
#             attempt = ip_attempts.find_one({"ip": ip})
#             now = datetime.utcnow()

#             if attempt:
#                 new_count = attempt["count"] + 1
#                 if new_count >= MAX_ATTEMPTS:
#                     # Auto-block this IP
#                     ip_list.insert_one({
#                         "ip": ip,
#                         "type": "blacklist",
#                         "reason": "auto-blocked",
#                         "timestamp": now
#                     })
#                     ip_attempts.delete_one({"ip": ip})
#                 else:
#                     ip_attempts.update_one(
#                         {"ip": ip},
#                         {"$set": {"count": new_count, "last_attempt": now}}
#                     )
#             else:
#                 ip_attempts.insert_one({
#                     "ip": ip,
#                     "count": 1,
#                     "last_attempt": now
#                 })

#             return JsonResponse({'error': 'Invalid credentials'}, status=401)

#     return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        ip = get_client_ip(request)
        now = datetime.utcnow()

        # # Step 1: Check if IP is blacklisted
        # if ip_list.find_one({"ip": ip, "type": "blacklist"}):
        #     return JsonResponse({"error": "Your IP is blocked."}, status=403)

        
        blacklisted = ip_list.find_one({"ip": ip, "type": "blacklist"})

        if blacklisted:
            blocked_time = blacklisted.get("timestamp")
            if blocked_time:
                unblock_time = blocked_time + timedelta(minutes=5)
                remaining = (unblock_time - now).total_seconds()

                if remaining > 0:
                    return JsonResponse({
                        "error": "IP_BLOCKED",
                        "remaining_time": int(remaining)
                    }, status=403)
                else:
                    # 🟢 Unblock IP after 5 mins
                    ip_list.delete_one({"ip": ip, "type": "blacklist"})

        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
        except Exception:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        # Step 2: Validate user
        user = login_collection.find_one({'email': email, 'password': password})
        if user:
            # Reset failed attempts for this IP
            ip_attempts.delete_one({"ip": ip})

            # ✅ Set session data
            request.session['user_id'] = str(user['_id'])
            request.session['usertype'] = user['usertype']
            # request.session['loginid'] = user.get('loginid')
            request.session['loginid'] = user['email']  # ✅ Use email as loginid

            request.session.set_expiry(3600)  # Optional: expire in 1 hour

            return JsonResponse({
                'message': 'Login successful',
                'usertype': user['usertype'],
                'userId': str(user['_id'])
            })

        # Step 3: Handle failed attempts
        attempt = ip_attempts.find_one({"ip": ip})
        now = datetime.utcnow()

        if attempt:
            new_count = attempt["count"] + 1
            if new_count >= MAX_ATTEMPTS:
                block_data = {
                        "ip": ip,
                        "type": "blacklist",
                        "reason": "auto-blocked",
                        "timestamp": now
                    }
                ip_list.insert_one(block_data)

                # Also log permanently to blacklisted_log (permanent)
                blacklisted_log.insert_one(block_data)
                ip_attempts.delete_one({"ip": ip})
            else:
                ip_attempts.update_one(
                    {"ip": ip},
                    {"$set": {"count": new_count, "last_attempt": now}}
                )
        else:
            ip_attempts.insert_one({
                "ip": ip,
                "count": 1,
                "last_attempt": now
            })

        return JsonResponse({'error': 'Invalid credentials'}, status=401)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# In views.py
# def check_session(request):
#     is_logged_in = 'user_id' in request.session
#     return JsonResponse({'valid': is_logged_in})

# def check_session(request):
#     if 'user_id' in request.session:
#         user_id = request.session['user_id']
#         user = login_collection.find_one({'_id': ObjectId(user_id)})
#         if user:
#             return JsonResponse({
#                 'valid': True,
#                 'username': user.get('email')  # or use user['name'] if available
#             })
#     return JsonResponse({'valid': False})

def check_session(request):
    if 'user_id' in request.session:
        login_id = request.session['user_id']

        # Step 1: Get login entry
        login_user = login_collection.find_one({'_id': ObjectId(login_id)})
        if login_user:
            # Step 2: Get user data from user_collection using loginid
            user = user_collection.find_one({'loginid': ObjectId(login_id)})
            if user:
                return JsonResponse({
                    'valid': True,
                    'username': user.get('name', 'User')  # fallback to 'User' if name missing
                })

            # If no user entry exists, fallback to email
            return JsonResponse({
                'valid': True,
                'username': login_user.get('email', 'User')
            })

    return JsonResponse({'valid': False})




def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def get_mac_from_ip(ip):
    try:
        pid = subprocess.Popen(["arp", "-n", ip], stdout=subprocess.PIPE)
        output = pid.communicate()[0].decode()
        for line in output.split("\n"):
            if ip in line:
                return line.split()[2]
    except Exception as e:
        print("MAC Fetch Error:", e)
    return "Unavailable"



@csrf_exempt
def capture_image(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()
        image_data = data.get('image')
        timestamp = data.get('timestamp', datetime.utcnow())
        ip_address = data.get('ip_address', 'Unavailable')
        device_id = data.get('device_id', 'Unavailable')

        # Store to DB
        login_capture.insert_one({
            "email": email,
            "image": image_data,
            "timestamp": timestamp,
            "ip_address": ip_address,
            "device_id": device_id
        })

        print(f"📸 Received failed login alert for {email}. Sending email...")

        # Send alert email
        send_intrusion_alert(email, image_data, timestamp, ip_address, device_id)

        return JsonResponse({"message": "Image captured and alert sent."}, status=200)


    

def send_intrusion_alert(email, image_data, timestamp, ip, mac):
    print("🔔 Inside send_intrusion_alert() function.")
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = email
    msg['Subject'] = 'Security Alert: Unauthorized Login Attempt Detected'

    body = f"""
    Hello,

    Someone tried to login to your account ({email}) and failed multiple times.

    Details of the attempt:
    - IP Address: {ip}
    - MAC Address: {mac}
    - Time: {timestamp}

    Attached is a captured image of the person who attempted the login.

    Stay safe!
    """
    msg.attach(MIMEText(body, 'plain'))

    # Decode base64 image and attach
    img_data = base64.b64decode(image_data.split(',')[1])  # Remove data:image/...;base64,
    image = MIMEImage(img_data, name="intruder.png")
    msg.attach(image)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        print(f"Alert email sent to {email}")
    except Exception as e:
        print(f"Failed to send email to {email}: {e}")



@csrf_exempt
def get_failed_login_images(request):
    if request.method == 'GET':
        documents = list(login_capture.find())

        # Normalize timestamps to UTC-aware datetime objects
        for doc in documents:
            ts = doc.get("timestamp")
            if isinstance(ts, str):
                try:
                    # Convert ISO string to aware datetime (assuming it's UTC)
                    doc["parsed_timestamp"] = datetime.fromisoformat(ts.replace("Z", "+00:00")).astimezone(timezone.utc)
                except Exception:
                    doc["parsed_timestamp"] = datetime.min.replace(tzinfo=timezone.utc)
            elif isinstance(ts, datetime):
                if ts.tzinfo is None:
                    doc["parsed_timestamp"] = ts.replace(tzinfo=timezone.utc)
                else:
                    doc["parsed_timestamp"] = ts.astimezone(timezone.utc)
            else:
                doc["parsed_timestamp"] = datetime.min.replace(tzinfo=timezone.utc)

        # Sort by datetime in descending order
        documents.sort(key=lambda x: x["parsed_timestamp"], reverse=True)

        results = []
        for doc in documents:
            timestamp = doc["parsed_timestamp"]
            formatted_time = timestamp.strftime("%Y-%m-%d %H:%M:%S")

            results.append({
                "email": doc.get("email", "N/A"),
                "timestamp": formatted_time,
                "image": doc.get("image", ""),
                "ip_address": doc.get("ip_address", ""),
                "mac_address": doc.get("device_id", ""),
            })

        return JsonResponse(results, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)





# @api_view(["GET"])
# def get_media_file(request, filename):
#     try:
#         file = fs.find_one({"filename": filename})
#         if not file:
#             raise Http404("File not found")
#         response = HttpResponse(file.read(), content_type=file.content_type)
#         response['Content-Disposition'] = f'inline; filename="{file.filename}"'
#         return response
#     except Exception as e:
#         print(f"[ERROR] Unable to retrieve file: {e}")
#         raise Http404("Error retrieving file")


@api_view(["GET"])
def get_media_file(request, filename):
    try:
        print(f"[DEBUG] Requested filename: {filename}")
        file = fs.find_one({"filename": filename})
        if not file:
            print("[WARN] File not found in GridFS.")
            raise Http404("File not found in GridFS")

        response = HttpResponse(file.read(), content_type=file.content_type)
        response['Content-Disposition'] = f'inline; filename="{file.filename}"'
        return response
    except Exception as e:
        print(f"[ERROR] Exception while retrieving file: {e}")
        raise Http404("Error retrieving file")



def convert_numpy_types(data):   
    """Recursively convert numpy types to native Python types."""
    if isinstance(data, dict):
        return {k: convert_numpy_types(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_numpy_types(v) for v in data]
    elif isinstance(data, tuple):
        return tuple(convert_numpy_types(v) for v in data)
    elif isinstance(data, (np.integer, np.int64, np.int32)):
        return int(data)
    elif isinstance(data, (np.floating, np.float32, np.float64)):
        return float(data)
    else:
        return data


@api_view(["POST"])
@parser_classes([MultiPartParser])
@csrf_exempt
def analyze_media(request):
    print("Received request")
    uploaded_file = request.FILES.get("media")
    print("FILES RECEIVED:", request.FILES)
    if "media" not in request.FILES:
        return Response({"error": "'media' not found in uploaded files"}, status=400)
    if uploaded_file:
        print(f"[DEBUG] Uploaded file size: {uploaded_file.size} bytes")
    if not uploaded_file:
        return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)
    # Get content type and determine file extension
    content_type = uploaded_file.content_type
    if not (content_type.startswith("video/") or content_type.startswith("image/")):
        return Response({"error": "Unsupported media type."}, status=status.HTTP_400_BAD_REQUEST)
        # Save to temp path for model processing
    ext = mimetypes.guess_extension(content_type) or '.jpg'
    filename = f"{uuid.uuid4()}{ext}"
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(temp_dir, filename)
    with open(temp_path, 'wb') as temp_file:
        for chunk in uploaded_file.chunks():
            temp_file.write(chunk)
    # Also store in GridFS
    gridfs_file_id = fs.put(uploaded_file, filename=uploaded_file.name, content_type=content_type)
    try:
        # Run actual analysis
        # print("[DEBUG] Running antivirus...")
        antivirus_result = antivirus_scanner.is_malicious(uploaded_file)
        print("[DEBUG] Antivirus Result:", antivirus_result)
        # print("[DEBUG] Running metadata_result...")
        metadata_result = metadata_analyzer.analyze_metadata(temp_path)
        print("[DEBUG] Metadata Result:", metadata_result)
        if content_type.startswith("image/"):
            print("[DEBUG] Running face detection...")
            face_result = face_detector.detect_faces(temp_path)
            print("[DEBUG] Face result:", face_result)
            if face_result.get("status") == "no_face":
                return Response({
                    "status": "no_face",
                    "message": "No human faces found. Please upload a valid image with a face.",
                }, status=status.HTTP_200_OK)           
            deepfake_result_data = deepfake_image.classify_deepfake(temp_path)
            print("[DEBUG] Deepfake Result:", deepfake_result_data)
          # print("[DEBUG] Running GAN detection...")
            gan_result = gan_detector.analyze_gan_image(temp_path)
            print("[DEBUG] GAN Result:", gan_result)
        else:  # video
            face_result = "N/A for video"
            print("[DEBUG] Running deepfake video detection...")
            deepfake_result_data = deepfake_video.classify_deepfake_video(temp_path)
            print("[DEBUG] Deepfake Result:", deepfake_result_data)
            gan_result = "Not Applicable"      
            print("[DEBUG] Antivirus Result:", antivirus_result)
            print("[DEBUG] Metadata Result:", metadata_result)
            print("[DEBUG] Deepfake Result:", deepfake_result_data)
            print("[DEBUG] GAN Result:", gan_result)
        print("[DEBUG] Calculating danger score...")
        danger_result = danger_score.calculate_danger_score({
            "antivirus": antivirus_result,
            "face": face_result,
            "metadata": metadata_result,
            "deepfake": deepfake_result_data,
            "gan": gan_result,
        })
        print("[DEBUG] danger Result:", danger_result)
        now = datetime.now(timezone.utc)
        # MongoDB insert
        mongo_data = {
            "filename": uploaded_file.name,
            "file_id": gridfs_file_id,
            # "file_id": fs.put(uploaded_file, filename=uploaded_file.name, content_type=content_type),
            "content_type": content_type,
            "antivirus": antivirus_result,
            "face_detection": face_result,
            "deepfake": deepfake_result_data,
            "gan": gan_result,
            "metadata": metadata_result,
            "danger_score": danger_result,
            "analyzed_at": now,
        }
        mongo_data_cleaned = convert_numpy_types(mongo_data)
        inserted = deepfake_result.insert_one(mongo_data_cleaned)
        # inserted = deepfake_result.insert_one(mongo_data)
        result_id_str = str(inserted.inserted_id)
        return Response({
            "result_id": result_id_str
        }, status=status.HTTP_200_OK)  
    except SuspiciousOperation as se:
        print("[SECURITY WARNING] SuspiciousOperation:", str(se))
        return Response({"error": "Suspicious activity detected."}, status=403)
    except Exception as e:
        import traceback
        print("EXCEPTION DURING ANALYSIS:")
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)



@api_view(['GET'])
def get_analysis_result(request, result_id):
    try:
        result = deepfake_result.find_one({"_id": ObjectId(result_id)})
        if not result:
            return Response({"error": "Result not found"}, status=status.HTTP_404_NOT_FOUND)

        # Convert ObjectId fields to string
        result["_id"] = str(result["_id"])
        if "file_id" in result and isinstance(result["file_id"], ObjectId):
            result["file_id"] = str(result["file_id"])

        return Response(result, status=status.HTTP_200_OK)

    except Exception as e:  
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


def get_network_traffic(request):
    data = list(network_traffic.find({}, {"_id": 0}).sort("timestamp", -1))

    return JsonResponse(data, safe=False)

def get_system_logs(request):
    data = list(system_logs.find({}, {"_id": 0}).sort("timestamp", -1))

    return JsonResponse(data, safe=False)


# 1. Check for email breaches
@api_view(["POST"])
def check_email_breaches(request):
    email = request.data.get("email")
    if not email:
        return JsonResponse({"error": "Email is required"}, status=400)

    url = f"https://api.xposedornot.com/v1/check-email/{email}"
    response = requests.get(url)
    data = response.json()

    # Only proceed if there are actual breaches
    if "breaches" in data and data["breaches"]:
        email_breaches.insert_one({
            "type": "email_breaches",
            "email": email,
            "results": data,
            "timestamp": datetime.utcnow()
        })
        return JsonResponse(data)

    # If no breach is found
    return JsonResponse({"message": "No breaches found for this email."})

# 2. Breach analytics
@api_view(["POST"])
def email_breach_analytics(request):
    email = request.data.get("email")
    if not email:
        return JsonResponse({"error": "Email is required"}, status=400)

    # Step 1: Check if the email is found in any breach
    check_url = f"https://api.xposedornot.com/v1/check-email/{email}"
    check_response = requests.get(check_url)
    check_data = check_response.json()

    if not check_data.get("breaches"):  # No breach found
        return JsonResponse({
            "message": "No breach found for this email",
            "email": email
        }, status=200)

    # Step 2: If breached, fetch breach analytics
    analytics_url = f"https://api.xposedornot.com/v1/breach-analytics?email={email}"
    response = requests.get(analytics_url)
    data = response.json()

    # Save the result only if a breach was found
    email_analytics.insert_one({
        "type": "email_analytics",
        "email": email,
        "results": data,
        "timestamp": datetime.utcnow()
    })

    return JsonResponse(data)


# 3. Password leak checker (k-anonymity)
@api_view(["POST"])
def check_password_leak(request):
    password = request.data.get("password")
    if not password:
        return JsonResponse({"error": "Password is required"}, status=400)

    sha1_pass = hashlib.sha1(password.encode("utf-8")).hexdigest().upper()
    prefix = sha1_pass[:5]
    suffix = sha1_pass[5:]
    url = f"https://api.pwnedpasswords.com/range/{prefix}"
    response = requests.get(url)
    lines = response.text.splitlines()

    found = False
    count = 0
    for line in lines:
        if line.startswith(suffix):
            found = True
            count = line.split(":")[1]
            break

    if found:
        result = {
            "password_leaked": True,
            "leak_count": int(count)
        }

        password_check.insert_one({
            "type": "password_check",
            "results": result,
            "timestamp": datetime.utcnow()
        })

        return JsonResponse(result)
    else:
        # If password is safe, just return this without storing
        return JsonResponse({"message": "Your password was not found in any known breaches."}, status=200)



@csrf_exempt
def get_user(request):
    if request.method == 'GET':
        try:
            loginid = request.session.get('user_id')
            print("Patient Profile Request - Session user_id:", loginid)

            if not loginid:
                return JsonResponse({'error': 'Unauthorized'}, status=401)

            user = user_collection.find_one({'loginid': ObjectId(loginid)})
            print("Patient found::", user)

            if not user:
                return JsonResponse({'error': 'patient not found'}, status=404)

            # Explicitly send only the fields needed
            response_data = {
                'name': user.get('name', ''),
                'contact': user.get('contact', ''),
            }

            return JsonResponse(response_data)

        except Exception as e:
            print("Error fetching profile:", e)
            return JsonResponse({'error': 'Server error'}, status=500)





@csrf_exempt
def update_user(request):
    if request.method == 'POST':
        loginid = request.session.get('user_id')
        if not loginid:
            return JsonResponse({'error': 'Not logged in'}, status=401)

        data = json.loads(request.body)

        fields = {
            'name': data.get('name'),
            'contact': data.get('contact'),
        }

        result = user_collection.update_one(
            {'loginid': ObjectId(loginid)},  # Ensure ObjectId is used
            {'$set': fields}
        )

        if result.modified_count > 0:
            return JsonResponse({'message': 'Profile updated successfully'})
        else:
            return JsonResponse({'message': 'No changes made'})

    return JsonResponse({'error': 'Invalid request method'},status=405)



def load_model():
    # Manually set the correct path to your models folder
    BASE_DIR = r"C:\Users\bijib\OneDrive\Desktop\CS_AI"
    model_path = os.path.join(BASE_DIR, 'models', 'spam_model.pkl')
    vectorizer_path = os.path.join(BASE_DIR, 'models', 'vectorizer.pkl')

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    if not os.path.exists(vectorizer_path):
        raise FileNotFoundError(f"Vectorizer file not found at: {vectorizer_path}")

    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    return model, vectorizer

@csrf_exempt
def upload_csv_and_classify(request):
    if request.method == 'POST' and request.FILES.get('file'):
        csv_file = request.FILES['file']
        file_path = default_storage.save(csv_file.name, csv_file)

        model, vectorizer = load_model()
        db = email_filter
        results = []

        with default_storage.open(file_path, 'r') as f:
            reader = csv.DictReader(f.read().splitlines())
            for row in reader:
                subject = row.get("subject", "")
                sender = row.get("sender", "")
                content = row.get("content", "")
                full_text = subject + " " + content
                vect = vectorizer.transform([full_text])
                is_spam = bool(model.predict(vect)[0])

                record = {
                    "subject": subject,
                    "sender": sender,
                    "content": content,
                    "is_spam": is_spam,
                    "timestamp": get_formatted_ist_time()
                }
                db.insert_one(record)
                record.pop("_id", None)
                results.append(record)

        return JsonResponse(results, safe=False)

    return JsonResponse({"error": "CSV file is required"}, status=400)




@csrf_exempt
def manual_classify(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            subject = data.get('subject', '')
            sender = data.get('sender', '')
            content = data.get('content', '')
            full_text = subject + " " + content

            model, vectorizer = load_model()
            vect = vectorizer.transform([full_text])
            is_spam = bool(model.predict(vect)[0])

            db = email_filter

            record = {
                "subject": subject,
                "sender": sender,
                "content": content,
                "is_spam": is_spam,
                "timestamp": get_formatted_ist_time()
            }

            db.insert_one(record)
            record.pop("_id", None)

            return JsonResponse(record, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "POST request required"}, status=400)



# Config
GOOGLE_API_KEY = "AIzaSyDEiwXxvhC-uIUoi5CbWuF1OUUdSBdwbibin"
GOOGLE_API_URL = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={GOOGLE_API_KEY}"

def check_with_google_safe_browsing(url):
    payload = {
        "client": {
            "clientId": "yourcompany",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "POTENTIALLY_HARMFUL_APPLICATION"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }
    try:
        response = requests.post(GOOGLE_API_URL, json=payload)
        matches = response.json().get('matches', [])
        return bool(matches), matches
    except Exception as e:
        return False, {"error": str(e)}



def get_url_info(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; CS_AI_Bot/1.0; +https://yourdomain.com/bot)"
    }
    try:
        response = requests.get(
            url,
            headers=headers,
            timeout=10,
            allow_redirects=True,
            # verify=False  # Uncomment to disable SSL verification (not recommended for prod)
        )
        parsed = urlparse(response.url)
        return {
            "final_url": response.url,
            "status_code": response.status_code,
            "redirected": len(response.history) > 0,
            "domain": parsed.netloc,
            "path": parsed.path,
            "headers": dict(response.headers)
        }
    except requests.exceptions.Timeout:
        logger.error(f"Timeout while fetching URL info for {url}")
        return {"error": "Timeout while trying to fetch URL info."}
    except requests.exceptions.TooManyRedirects:
        logger.error(f"Too many redirects for URL {url}")
        return {"error": "Too many redirects."}
    except requests.exceptions.SSLError as ssl_err:
        logger.error(f"SSL error for URL {url}: {ssl_err}")
        return {"error": f"SSL error: {ssl_err}"}
    except requests.exceptions.RequestException as e:
        logger.error(f"Request exception for URL {url}: {e}")
        return {"error": str(e)}
    except Exception as e:
        logger.error(f"Unexpected error for URL {url}: {e}")
        return {"error": f"Unexpected error: {e}"}




def capture_screenshot_playwright(url):
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, timeout=15000)
            page.wait_for_timeout(5000)
            screenshot = page.screenshot()
            browser.close()
            return base64.b64encode(screenshot).decode('utf-8')
    except Exception as e:
        return None

def capture_screenshot_fallback(url):
    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
        import time

        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        driver = webdriver.Chrome(options=chrome_options)
        driver.set_window_size(1280, 800)
        driver.get(url)
        time.sleep(5)
        screenshot = driver.get_screenshot_as_base64()
        driver.quit()
        return screenshot
    except Exception:
        return None
    


@csrf_exempt
@require_http_methods(["POST"])
def analyze_url(request):
    try:
        body = json.loads(request.body)
        url = body.get("url")

        # if not url or not validators.url(url):
        #     return JsonResponse({"error": "Invalid URL format."}, status=400)

        phishing_detected, phishing_details = check_with_google_safe_browsing(url)
        url_info = get_url_info(url)

        # screenshot = None
        screenshot = capture_screenshot_playwright(url)
        if not screenshot:
            screenshot = capture_screenshot_fallback(url)

        reasons = []
        risk_level = "Safe"

        if phishing_detected:
            reasons.append("Listed in Google Safe Browsing.")
            risk_level = "Phishing"
        elif "error" in url_info:
            reasons.append("Unable to fetch URL details.")
            risk_level = "Suspicious"
        elif url_info.get("redirected"):
            reasons.append("Multiple redirects detected.")
            risk_level = "Suspicious"

        data = {
            "url": url,
            "timestamp": get_formatted_ist_time(),
            "phishing_detected": phishing_detected,
            "phishing_details": phishing_details,
            "url_info": url_info,
            "screenshot_base64": screenshot,
            "reasons": reasons,
            "risk_level": risk_level
        }


        inserted = url_analysis.insert_one(data)
        data["_id"] = str(inserted.inserted_id)  # Convert ObjectId to string for JSON serialization
        return JsonResponse(data)

        # url_analysis.insert_one(data)
        # return JsonResponse(data)

    except Exception as e:
        logger.error(traceback.format_exc())
        return JsonResponse({"error": str(e)}, status=500)


UPLOAD_DIR = 'media/encrypted/'
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Util to generate Fernet key
def generate_key():
    return Fernet.generate_key()

# Util to encrypt file using Fernet
def encrypt_file(file):
    key = generate_key()
    fernet = Fernet(key)
    encrypted_data = fernet.encrypt(file.read())
    filename = f"enc_{uuid.uuid4().hex}.bin"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, 'wb') as f:
        f.write(encrypted_data)
    return filename, key.decode(), encrypted_data


# API: Fetch all users for dropdown
@api_view(['GET'])
def fetch_users(request):
    users = user_collection.find()
    result = []
    for user in users:
        result.append({
            "name": user['name'],
            "loginid": str(user['loginid']['$oid'] if isinstance(user['loginid'], dict) else user['loginid'])
        })
    return JsonResponse(result, safe=False)

# API: Upload, Encrypt, and Share file
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_and_encrypt(request):
    file = request.FILES.get('file')
    recipient_loginid = request.POST.get('recipient_loginid')
    sender_loginid = request.headers.get('loginid')

    if not file or not recipient_loginid or not sender_loginid:
        return JsonResponse({'error': 'Missing file or login IDs'}, status=400)

    filename, key, encrypted_data = encrypt_file(file)

    shared_files_doc = {
        "filename": filename,
        "original_filename": file.name,
        "sender_loginid": ObjectId(sender_loginid),
        "receiver_loginid": ObjectId(recipient_loginid),
        "encryption_key": key,
        "timestamp": datetime.utcnow(),
        "filetype": file.content_type
    }
    file_sharing.insert_one(shared_files_doc)

    return JsonResponse({
        "message": "File encrypted and shared successfully",
        "encrypted_filename": filename,
        "key": key
    })

# API: Get received files
@api_view(['GET'])
def fetch_received_files(request):
    current_loginid = request.headers.get('loginid')
    if not current_loginid:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    files = file_sharing.find({"receiver_loginid": ObjectId(current_loginid)})
    results = []
    for f in files:
        results.append({
            "_id": str(f['_id']),
            "filename": f['filename'],
            "original_filename": f.get('original_filename', ''),
            "sender_loginid": str(f['sender_loginid']),
            "timestamp": f['timestamp'].isoformat(),
            "filetype": f.get('filetype', '')
        })
    return JsonResponse(results, safe=False)

# API: Decrypt file
# @api_view(['POST'])
# @parser_classes([MultiPartParser, FormParser])
# def decrypt_file(request):
#     encrypted_filename = request.POST.get('filename')
#     decryption_key = request.POST.get('key')

#     if not encrypted_filename or not decryption_key:
#         return JsonResponse({'error': 'Missing file name or key'}, status=400)

#     file_path = os.path.join(UPLOAD_DIR, encrypted_filename)
#     if not os.path.exists(file_path):
#         return JsonResponse({'error': 'File not found'}, status=404)

#     try:
#         with open(file_path, 'rb') as f:
#             encrypted_data = f.read()
#         fernet = Fernet(decryption_key.encode())
#         decrypted_data = fernet.decrypt(encrypted_data)
#         encoded_file = base64.b64encode(decrypted_data).decode()
#         return JsonResponse({
#             "file_data": encoded_file
#         })
#     except Exception as e:
#         return JsonResponse({'error': 'Decryption failed', 'details': str(e)}, status=400)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def decrypt_file(request):
    encrypted_filename = request.POST.get('filename')
    decryption_key = request.POST.get('key')

    if not encrypted_filename or not decryption_key:
        return JsonResponse({'error': 'Missing file name or key'}, status=400)

    file_path = os.path.join(UPLOAD_DIR, encrypted_filename)
    if not os.path.exists(file_path):
        return JsonResponse({'error': 'File not found'}, status=404)

    try:
        # Retrieve the original MIME type from MongoDB
        file_doc = file_sharing.find_one({"filename": encrypted_filename})
        if not file_doc:
            return JsonResponse({'error': 'File metadata not found'}, status=404)

        original_mime_type = file_doc.get("filetype", "application/octet-stream")

        with open(file_path, 'rb') as f:
            encrypted_data = f.read()

        fernet = Fernet(decryption_key.encode())
        decrypted_data = fernet.decrypt(encrypted_data)

        encoded_file = base64.b64encode(decrypted_data).decode()

        return JsonResponse({
            "file_data": encoded_file,
            "mime_type": original_mime_type
        })

    except Exception as e:
        return JsonResponse({'error': 'Decryption failed', 'details': str(e)}, status=400)


# API: Get stored encryption keys (Key Vault)
@api_view(['GET'])
def get_file_keys(request):
    loginid = request.headers.get('loginid')
    if not loginid:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    files = file_sharing.find({"sender_loginid": ObjectId(loginid)})
    result = []
    for f in files:
        result.append({
            "filename": f['filename'],
            "original_filename": f.get('original_filename', ''),
            "key": f['encryption_key'],
            "timestamp": f['timestamp'].isoformat(),
            "receiver_loginid": str(f['receiver_loginid'])
        })
    return JsonResponse(result, safe=False)


# API: Get encryption key for a specific received file
@api_view(['POST'])
def fetch_shared_file_key(request):
    loginid = request.headers.get('loginid')
    filename = request.data.get('filename')

    if not loginid or not filename:
        return JsonResponse({'error': 'Unauthorized or missing filename'}, status=400)

    file_doc = file_sharing.find_one({
        "receiver_loginid": ObjectId(loginid),
        "filename": filename
    })

    if not file_doc:
        return JsonResponse({'error': 'File not found or access denied'}, status=404)

    return JsonResponse({"key": file_doc['encryption_key']})


@csrf_exempt
def send_key_access_otp(request):
    if request.method != 'POST':
        print("DEBUG: Invalid request method")  # ✅
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    try:
        data = json.loads(request.body)
        loginid = data.get("loginid")
        file_id = data.get("file_id")
        if isinstance(file_id, dict) and "$oid" in file_id:
            file_id = file_id["$oid"]

        
        print(f"DEBUG: loginid = {loginid}, file_id = {file_id}")  # ✅

        if not loginid or not file_id:
            print("DEBUG: Missing loginid or file_ids")
            return JsonResponse({"error": "Missing loginid or file_id"}, status=400)
        
        User = user_collection.find_one({"loginid": ObjectId(loginid)})
        print(f"DEBUG: user = {User}")
        if not User:
            print("DEBUG: User not found")
            return JsonResponse({"error": "User not found"}, status=404)
        login_doc = login_collection.find_one({"_id": User["loginid"]})
        print(f"DEBUG: login_doc = {login_doc}")
        if not login_doc:
            print("DEBUG: Login record not found")
            return JsonResponse({"error": "Login record not found"}, status=404)
        email = login_doc["email"]
        print(f"DEBUG: email = {email}")
        otp = str(random.randint(100000, 999999))
        print(f"DEBUG: Generated OTP = {otp}")

        otps.update_one(
            {"loginid": loginid},
            {"$set": {"otp": otp, "timestamp": datetime.now(timezone.utc)}},
            upsert=True
        )
        print("DEBUG: OTP stored in MongoDB")
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = email
        msg['Subject'] = "🔐 Your OTP to Access Decryption Key"

        body = f"""
        Hello,

        You have requested to view the decryption key of a file shared with you.

        Your One-Time Password (OTP) is:

        👉 OTP: {otp}

        This OTP is valid for only 5 minutes. Please do not share it with anyone.

        If you did not request this, you can ignore this email.

        - Cyber Sentinel AI
        """
        msg.attach(MIMEText(body, 'plain'))
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            print("DEBUG: Connecting to SMTP...")
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            print("DEBUG: Logged into Gmail SMTP")
            server.send_message(msg)
            print("DEBUG: Email sent successfully")
        return JsonResponse({"status": "OTP sent to your email"})
    except Exception as e:
        print(f"DEBUG: Exception occurred = {str(e)}")
        return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)
# @csrf_exempt
# def verify_key_otp(request):
#     if request.method != 'POST':
#         return JsonResponse({"error": "Only POST allowed"}, status=405)
#     try:
#         data = json.loads(request.body)
#         loginid = data.get("loginid")
#         file_id = data.get("file_id")
#         entered_otp = data.get("otp")
#         if not loginid or not file_id or not entered_otp:
#             return JsonResponse({"error": "Missing required fields"}, status=400)
#         otp_doc = otps.find_one({"loginid": loginid})
#         if not otp_doc:
#             return JsonResponse({"error": "OTP not found. Please request a new one."}, status=404)
#         stored_otp = otp_doc.get("otp")
#         timestamp = otp_doc.get("timestamp")
#         if not timestamp or (datetime.now(timezone.utc) - timestamp).total_seconds() > 300:
#             return JsonResponse({"error": "OTP expired. Please request a new one."}, status=403)
#         if entered_otp != stored_otp:
#             return JsonResponse({"error": "Invalid OTP"}, status=401)
#         file_doc = file_sharing.find_one({"_id": ObjectId(file_id)})
#         print(file_doc)
#         if not file_doc:
#             return JsonResponse({"error": "File not found"}, status=404)
#         # return JsonResponse({"key": file_doc.get("encryption_key")})
#         return JsonResponse({"key": file_doc.get("encryption_key")})

#     except Exception as e:
#         return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)

import traceback  # Add this at the top

@csrf_exempt
def verify_key_otp(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    try:
        data = json.loads(request.body)
        loginid = data.get("loginid")
        file_id = data.get("file_id")
        entered_otp = data.get("otp")

        print("Received loginid:", loginid)
        print("Received file_id:", file_id)
        print("Received OTP:", entered_otp)

        if not loginid or not file_id or not entered_otp:
            return JsonResponse({"error": "Missing required fields"}, status=400)

        otp_doc = otps.find_one({"loginid": loginid})
        print("Fetched OTP doc:", otp_doc)

        if not otp_doc:
            return JsonResponse({"error": "OTP not found. Please request a new one."}, status=404)

        stored_otp = otp_doc.get("otp")
        timestamp = otp_doc.get("timestamp")
        print("Stored OTP:", stored_otp)
        print("Timestamp:", timestamp)

        # if not timestamp or (datetime.now(timezone.utc) - timestamp).total_seconds() > 300:
        #     return JsonResponse({"error": "OTP expired. Please request a new one."}, status=403)

        if entered_otp != stored_otp:
            return JsonResponse({"error": "Invalid OTP"}, status=401)

        file_doc = file_sharing.find_one({"_id": ObjectId(file_id)})
        print("Fetched file doc:", file_doc)

        if not file_doc:
            return JsonResponse({"error": "File not found"}, status=404)

        return JsonResponse({"key": file_doc.get("encryption_key")})

    except Exception as e:
        print("Exception occurred:")
        traceback.print_exc()  # ✅ shows full stack trace in terminal
        return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)






@csrf_exempt
def dark_web(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            

            record = {
                "timestamp": get_formatted_ist_time(),
                "emails": data.get("emails", []),
                "cards": data.get("cards", [])
            }
            breach_collection.insert_one(record)

            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
    return JsonResponse({"error": "POST method required."}, status=400)



def record_failed_attempt(ip):
    now = get_formatted_ist_time()
    attempt = ip_attempts.find_one({"ip": ip})

    if attempt:
        new_count = attempt["count"] + 1

        # Auto-blacklist after max attempts
        if new_count >= MAX_ATTEMPTS:
            ip_list.insert_one({
                "ip": ip,
                "type": "blacklist",
                "reason": "auto-blocked",
                "timestamp": get_formatted_ist_time()
            })
            ip_attempts.delete_one({"ip": ip})
        else:
            ip_attempts.update_one(
                {"ip": ip},
                {"$set": {"count": new_count, "last_attempt": now}}
            )
    else:
        ip_attempts.insert_one({
            "ip": ip,
            "count": 1,
            "last_attempt": now
        })


def get_blocked_ips(request):
    blocked_ips = list(ip_list.find({"type": "blacklist"}))
    cleaned = [
        {
            "ip": ip["ip"],
            "reason": ip.get("reason", "auto-blocked"),
            "timestamp": ip.get("timestamp", get_formatted_ist_time())
        }
        for ip in blocked_ips
    ]
    return JsonResponse({"blocked_ips": cleaned}, safe=False)

@csrf_exempt
def whitelist_ip(request):
    if request.method == "POST":
        print("Received whitelist POST request")
        data = json.loads(request.body)
        ip = data.get("ip")
        if ip:
            ip_list.update_one(
                {"ip": ip},
                {
                    "$set": {
                        "type": "whitelist",
                        "reason": "manually whitelisted",
                        "timestamp": get_formatted_ist_time()
                    }
                },
                upsert=True
            )
            return JsonResponse({"message": f"{ip} has been whitelisted."})
        else:
            return JsonResponse({"error": "IP address not provided"}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def get_whitelisted_ips(request):
    if request.method == "GET":
        whitelisted = list(ip_list.find({"type": "whitelist"}))
        for entry in whitelisted:
            entry["_id"] = str(entry["_id"])
        return JsonResponse({"whitelisted_ips": whitelisted})
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def blacklist_ip_from_whitelist(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            raw_ip = data.get("ip")

            if not raw_ip:
                return JsonResponse({"error": "IP address is required."}, status=400)

            try:
                ip = str(ip_address(raw_ip))  # Normalize IP like '127.2.02.1' -> '127.2.2.1'
            except ValueError:
                return JsonResponse({"error": "Invalid IP format."}, status=400)

            existing = ip_list.find_one({"ip": ip})

            if existing:
                if existing.get("status") == "blocked":
                    return JsonResponse({"message": f"{ip} is already blacklisted."}, status=200)

                # Move from whitelist → blacklist
                ip_list.update_one(
                    {"ip": ip},
                    {"$set": {
                        "status": "blocked",
                        "reason": "Moved from whitelist",
                        "timestamp": get_formatted_ist_time()
                    }}
                )
            else:
                # Insert new if IP wasn't found at all
                ip_list.insert_one({
                    "ip": ip,
                    "status": "blocked",
                    "reason": "Manually blacklisted",
                    "timestamp": get_formatted_ist_time()
                })

            return JsonResponse({"message": f"{ip} has been blacklisted successfully."})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def logout_view(request):
    print("Before flush:", request.session.items())
    request.session.flush()
    print("After flush:", request.session.items())
    return JsonResponse({'message': 'Logged out'})



def get_threats_data(request):
    threats = list(threats_collection.find({}, {'_id': 0, 'timestamp': 1, 'threat': 1}))
    return JsonResponse(threats, safe=False)


@csrf_exempt
def get_files(request):
    """
    API endpoint to return file sharing data as JSON for visualization.
    """
    if request.method != "GET":
        return JsonResponse({"error": "GET method required."}, status=405)

    try:
        files_cursor = file_sharing.find({}, {"_id": 0, "timestamp": 1, "filename": 1, "original_filename": 1})
        files = list(files_cursor)

        return JsonResponse(files, safe=False)
    except Exception as e:
        return JsonResponse({"error": f"Database query failed: {str(e)}"}, status=500)
    




@csrf_exempt
def generate_password(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)

        length = data.get('length', 12)
        include_uppercase = data.get('uppercase', True)
        include_lowercase = data.get('lowercase', True)
        include_digits = data.get('digits', True)
        include_symbols = data.get('symbols', True)

        if not any([include_uppercase, include_lowercase, include_digits, include_symbols]):
            return JsonResponse({'error': 'At least one character type must be selected'}, status=400)

        characters = ''
        if include_uppercase:
            characters += string.ascii_uppercase
        if include_lowercase:
            characters += string.ascii_lowercase
        if include_digits:
            characters += string.digits
        if include_symbols:
            characters += string.punctuation

        password = ''.join(random.choice(characters) for _ in range(length))
        return JsonResponse({'password': password})
    



VT_API_KEY = os.getenv("VT_API_KEY")
VT_HEADERS = {"x-apikey": VT_API_KEY}
VT_BASE = "https://www.virustotal.com/api/v3"
print("Your VirusTotal API Key:", VT_API_KEY)

@csrf_exempt
def scan_file_view(request):
    if request.method == "POST":
        uploaded_file = request.FILES.get("file")
        user_id = request.session.get("user_id")  # ✅ From session

        if not uploaded_file or not user_id:
            return JsonResponse({"error": "Missing file or not logged in"}, status=400)

        # Save file temporarily
        filename = f"{uuid.uuid4()}_{uploaded_file.name}"
        file_path = os.path.join("temp_uploads", filename)
        os.makedirs("temp_uploads", exist_ok=True)

        with open(file_path, "wb") as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)

        try:
            # Upload to VirusTotal
            with open(file_path, "rb") as f:
                response = requests.post(
                    f"{VT_BASE}/files",
                    headers=VT_HEADERS,
                    files={"file": f}
                )

            if response.status_code != 200:
                return JsonResponse({"error": "VirusTotal upload failed"}, status=500)

            analysis_id = response.json().get("data", {}).get("id")

            # Get scan result
            result_response = requests.get(
                f"{VT_BASE}/analyses/{analysis_id}",
                headers=VT_HEADERS
            )

            if result_response.status_code != 200:
                return JsonResponse({"error": "VirusTotal result fetch failed"}, status=500)

            result_data = result_response.json()

            # Store in MongoDB with the user_id
            scan_results.insert_one({
                "user_id": ObjectId(user_id),
                "filename": uploaded_file.name,
                "scan_id": analysis_id,
                "result": result_data,
            })

            os.remove(file_path)

            return JsonResponse({
                "message": "Scan complete",
                "filename": uploaded_file.name,
                "scan_id": analysis_id,
                "stats": result_data.get("data", {}).get("attributes", {}).get("stats", {})
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

@csrf_exempt
def get_user_scans(request):
    if request.method == "GET":
        user_id = request.session.get("user_id")

        if not user_id:
            return JsonResponse({"error": "Not logged in"}, status=401)

        # Fetch scans by ObjectId
        cursor = scan_results.find({"user_id": ObjectId(user_id)})
        user_scans = []

        for doc in cursor:
            doc["user_id"] = str(doc["user_id"])  # Convert ObjectId to string
            if "_id" in doc:
                doc["_id"] = str(doc["_id"])
            user_scans.append(doc)

        return JsonResponse({"scans": user_scans}, safe=False)

    return JsonResponse({"error": "Only GET allowed"}, status=405)



# @csrf_exempt
# def scan_file_view(request):
#     if request.method == "POST":
#         uploaded_file = request.FILES.get("file")
#         loginid = request.session.get("loginid")  # ✅ Get from session

#         if not uploaded_file or not loginid:
#             return JsonResponse({"error": "Missing file or not logged in"}, status=400)

#         # Save file temporarily
#         filename = f"{uuid.uuid4()}_{uploaded_file.name}"
#         file_path = os.path.join("temp_uploads", filename)
#         os.makedirs("temp_uploads", exist_ok=True)

#         with open(file_path, "wb") as f:
#             for chunk in uploaded_file.chunks():
#                 f.write(chunk)

#         try:
#             # Upload to VirusTotal
#             with open(file_path, "rb") as f:
#                 response = requests.post(
#                     f"{VT_BASE}/files",
#                     headers=VT_HEADERS,
#                     files={"file": f}
#                 )

#             if response.status_code != 200:
#                 return JsonResponse({"error": "VirusTotal upload failed"}, status=500)

#             analysis_id = response.json().get("data", {}).get("id")

#             # Get scan result
#             result_response = requests.get(
#                 f"{VT_BASE}/analyses/{analysis_id}",
#                 headers=VT_HEADERS
#             )

#             if result_response.status_code != 200:
#                 return JsonResponse({"error": "VirusTotal result fetch failed"}, status=500)

#             result_data = result_response.json()

#             # Store in MongoDB with the loginid
#             scan_results.insert_one({
#                 "loginid": loginid,
#                 "filename": uploaded_file.name,
#                 "scan_id": analysis_id,
#                 "result": result_data,
#             })

#             os.remove(file_path)

#             return JsonResponse({
#                 "message": "Scan complete",
#                 "filename": uploaded_file.name,
#                 "scan_id": analysis_id,
#                 "stats": result_data.get("data", {}).get("attributes", {}).get("stats", {})
#             })

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)

#     return JsonResponse({"error": "Only POST allowed"}, status=405)


# @csrf_exempt
# def get_user_scans(request):
#     if request.method == "GET":
#         loginid = request.session.get("loginid")  # ✅ Get from session

#         if not loginid:
#             return JsonResponse({"error": "Not logged in"}, status=401)

#         user_scans = list(scan_results.find({"loginid": loginid}, {"_id": 0}))
#         return JsonResponse({"scans": user_scans}, safe=False)

#     return JsonResponse({"error": "Only GET allowed"}, status=405)


from bson import ObjectId

@csrf_exempt
def test_session_view(request):
    if 'user_id' in request.session:
        login_id = request.session['user_id']

        # Fetch from login_collection
        login_user = login_collection.find_one({'_id': ObjectId(login_id)})
        if login_user:
            # Try to fetch matching user from user_collection
            user = user_collection.find_one({'loginid': ObjectId(login_id)})
            if user:
                return JsonResponse({
                    "logged_in_as": user.get('name', 'User')  # Name from user_collection
                })

            # Fallback: use email from login_collection
            return JsonResponse({
                "logged_in_as": login_user.get('email', 'User')
            })

    return JsonResponse({
        "logged_in_as": "Not logged in"
    })

