# backend/middleware/ip_blocking.py
from django.http import JsonResponse
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["your_db_name"]
ip_collection = db["ip_list"]

class IPBlockMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = self.get_client_ip(request)

        # Block if blacklisted
        if ip_collection.find_one({"ip": ip, "type": "blacklist"}):
            return JsonResponse({"error": "Your IP has been blocked."}, status=403)

        # Allow if whitelisted
        if ip_collection.find_one({"ip": ip, "type": "whitelist"}):
            return self.get_response(request)

        return self.get_response(request)

    def get_client_ip(self, request):
        return request.META.get('REMOTE_ADDR')
