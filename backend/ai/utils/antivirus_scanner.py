# # utils/antivirus_scanner.py

# import magic
# import tempfile
# import os
# import subprocess
# import hashlib

# from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile

# def save_uploaded_file_to_temp(file_obj):
#     if isinstance(file_obj, InMemoryUploadedFile):
#         temp_file = tempfile.NamedTemporaryFile(delete=False)
#         for chunk in file_obj.chunks():
#             temp_file.write(chunk)
#         temp_file.close()
#         return temp_file.name
#     elif isinstance(file_obj, TemporaryUploadedFile):
#         return file_obj.temporary_file_path()
#     else:
#         raise ValueError("Unsupported file type")

# def get_file_hash(filepath):
#     hash_md5 = hashlib.md5()
#     with open(filepath, "rb") as f:
#         for chunk in iter(lambda: f.read(4096), b""):
#             hash_md5.update(chunk)
#     return hash_md5.hexdigest()

# def scan_file_with_clamav(filepath):
#     try:
#         result = subprocess.run(['clamscan', filepath], capture_output=True, text=True)
#         if "OK" in result.stdout:
#             return False, "File is clean."
#         elif "FOUND" in result.stdout:
#             return True, result.stdout
#         else:
#             return None, "Unknown scan result: " + result.stdout
#     except FileNotFoundError:
#         return None, "ClamAV is not installed or not found in PATH."

# def check_file_signature(filepath):
#     try:
#         mime = magic.Magic(mime=True)
#         file_type = mime.from_file(filepath)
#         return file_type
#     except Exception as e:
#         return f"Error identifying file type: {e}"

# def is_malicious(file_obj):
#     temp_path = save_uploaded_file_to_temp(file_obj)
#     file_type = check_file_signature(temp_path)
#     file_hash = get_file_hash(temp_path)
    
#     infected, message = scan_file_with_clamav(temp_path)

#     result = {
#         "file_type": file_type,
#         "file_hash": file_hash,
#         "infected": infected,
#         "message": message
#     }

#     # Clean up the temp file
#     try:
#         os.remove(temp_path)
#     except Exception:
#         pass

#     return result


import magic
import tempfile
import os
import hashlib
from virustotal_python import Virustotal
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile

# Replace this with your actual API key
VIRUSTOTAL_API_KEY = ""

# def save_uploaded_file_to_temp(file_obj):
#     if isinstance(file_obj, InMemoryUploadedFile):
#         temp_file = tempfile.NamedTemporaryFile(delete=False)
#         for chunk in file_obj.chunks():
#             temp_file.write(chunk)
#         temp_file.close()
#         return temp_file.name
#     elif isinstance(file_obj, TemporaryUploadedFile):
#         return file_obj.temporary_file_path()
#     else:
#         raise ValueError("Unsupported file type")

def save_uploaded_file_to_temp(file_obj):
    try:
        # For Django uploads
        if hasattr(file_obj, 'chunks'):
            temp_file = tempfile.NamedTemporaryFile(delete=False)
            for chunk in file_obj.chunks():
                temp_file.write(chunk)
            temp_file.close()
            return temp_file.name

        # For FastAPI / Starlette uploads
        elif hasattr(file_obj, 'read'):
            file_obj.seek(0)
            temp_file = tempfile.NamedTemporaryFile(delete=False)
            temp_file.write(file_obj.read())
            temp_file.close()
            return temp_file.name

        raise ValueError("Unsupported file type")
    except Exception as e:
        raise ValueError(f"Error handling uploaded file: {e}")


def get_file_hash(filepath):
    hash_md5 = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def scan_file_with_virustotal(filepath):
    try:
        vtotal = Virustotal(API_KEY=VIRUSTOTAL_API_KEY)
        with open(filepath, "rb") as file_to_scan:
            resp = vtotal.request("files", files={"file": file_to_scan}, method="POST")
            analysis_id = resp.data["id"]

        # Get analysis report
        report = vtotal.request(f"analyses/{analysis_id}", method="GET")
        stats = report.data["attributes"]["stats"]
        malicious = stats.get("malicious", 0)
        suspicious = stats.get("suspicious", 0)
        harmless = stats.get("harmless", 0)

        if malicious > 0 or suspicious > 0:
            return True, f"Detected: {malicious} malicious, {suspicious} suspicious"
        else:
            return False, "File is clean."

    except Exception as e:
        return None, f"VirusTotal API error: {e}"

def check_file_signature(filepath):
    try:
        mime = magic.Magic(mime=True)
        file_type = mime.from_file(filepath)
        return file_type
    except Exception as e:
        return f"Error identifying file type: {e}"

def is_malicious(file_obj):
    temp_path = save_uploaded_file_to_temp(file_obj)
    file_type = check_file_signature(temp_path)
    file_hash = get_file_hash(temp_path)

    infected, message = scan_file_with_virustotal(temp_path)

    result = {
        "file_type": file_type,
        "file_hash": file_hash,
        "infected": infected,
        "message": message
    }

    # Clean up the temp file
    try:
        os.remove(temp_path)
    except Exception:
        pass

    return result




# import magic
# import tempfile
# import os
# import hashlib
# from virustotal_python import Virustotal
# from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile

# # Replace this with your actual API key
# VIRUSTOTAL_API_KEY = "642afe116a5e1f885b47219adfa25e8e816eaf62e2256d816f758d82593383fc"

# def save_uploaded_file_to_temp(file_obj):
#     if isinstance(file_obj, InMemoryUploadedFile):
#         temp_file = tempfile.NamedTemporaryFile(delete=False)
#         for chunk in file_obj.chunks():
#             temp_file.write(chunk)
#         temp_file.close()
#         return temp_file.name
#     elif isinstance(file_obj, TemporaryUploadedFile):
#         return file_obj.temporary_file_path()
#     else:
#         raise ValueError("Unsupported file type")

# def get_file_hash(filepath):
#     hash_md5 = hashlib.md5()
#     with open(filepath, "rb") as f:
#         for chunk in iter(lambda: f.read(4096), b""):
#             hash_md5.update(chunk)
#     return hash_md5.hexdigest()

# def scan_file_with_virustotal(filepath):
#     try:
#         vtotal = Virustotal(API_KEY=VIRUSTOTAL_API_KEY)
#         with open(filepath, "rb") as file_to_scan:
#             resp = vtotal.request("files", files={"file": file_to_scan}, method="POST")
#             analysis_id = resp.data["id"]

#         # Get analysis report
#         report = vtotal.request(f"analyses/{analysis_id}", method="GET")
#         stats = report.data["attributes"]["stats"]
#         results = report.data["attributes"]["results"]
#         malicious = stats.get("malicious", 0)
#         suspicious = stats.get("suspicious", 0)
#         harmless = stats.get("harmless", 0)
#         undetected = stats.get("undetected", 0)
#         timeout = stats.get("timeout", 0)
#         failure = stats.get("failure", 0)

#         detailed_results = {}
#         for engine, details in results.items():
#             detailed_results[engine] = {
#                 "category": details.get("category"),
#                 "result": details.get("result"),
#                 "method": details.get("method"),
#                 "engine_name": details.get("engine_name")
#             }

#         summary = f"Malicious: {malicious}, Suspicious: {suspicious}, Harmless: {harmless}, Undetected: {undetected}, Timeout: {timeout}, Failure: {failure}"
#         infected = malicious > 0 or suspicious > 0

#         return infected, summary, detailed_results

#     except Exception as e:
#         return None, f"VirusTotal API error: {e}", {}

# def check_file_signature(filepath):
#     try:
#         mime = magic.Magic(mime=True)
#         file_type = mime.from_file(filepath)
#         return file_type
#     except Exception as e:
#         return f"Error identifying file type: {e}"

# def is_malicious(file_obj):
#     temp_path = save_uploaded_file_to_temp(file_obj)
#     file_type = check_file_signature(temp_path)
#     file_hash = get_file_hash(temp_path)

#     infected, message, detailed_results = scan_file_with_virustotal(temp_path)

#     result = {
#         "file_type": file_type,
#         "file_hash": file_hash,
#         "infected": infected,
#         "message": message,
#         "detailed_engine_results": detailed_results  # New field with engine-by-engine data
#     }

#     # Clean up the temp file
#     try:
#         os.remove(temp_path)
#     except Exception:
#         pass

#     return result
