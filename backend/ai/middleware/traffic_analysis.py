

# import re
# import json
# from django.http import JsonResponse
# from ai.utils.mongo import get_traffic_logs_collection
# from datetime import datetime

# # Broader set of malicious patterns
# MALICIOUS_PATTERNS = [

    
#     r"(?i)(union\s+select)",
#     r"(?i)(or\s+1=1)",
#     r"(?i)(drop\s+table)",
#     r"(?i)(<script>)",
#     r"(?i)(onerror=)",
#     r"(?i)(\.\./)",
#     r"(?i)(;.*?rm\s)",
#     r"(?i)(--)",
# ]

# class TrafficAnalysisMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response
#         self.collection = get_traffic_logs_collection()

#     def __call__(self, request):
#         if request.path.startswith('/analyze-media/'):
#             return self.get_response(request)
#         ip = request.META.get('REMOTE_ADDR', '')
#         method = request.method
#         path = request.get_full_path()
#         query_params = {k: v[0] if isinstance(v, list) else v for k, v in request.GET.lists()}

#         try:
#             body = request.body.decode('utf-8', errors='ignore')
#         except Exception:
#             body = ''

#         # Combine everything for easier pattern matching
#         combined_content = f"{path} {json.dumps(query_params)} {body}"

#         is_malicious = any(re.search(pattern, combined_content) for pattern in MALICIOUS_PATTERNS)

#         if is_malicious:

#             self.collection.insert_one({
#                 "ip": ip,
#                 "method": method,
#                 "path": path,
#                 "query_params": query_params,
#                 "body": body,
#                 "is_malicious": is_malicious,
#                 "timestamp": datetime.utcnow()
#             })
#             return JsonResponse({"error": "Suspicious activity detecteddd."}, status=403)

#         return self.get_response(request)