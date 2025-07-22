
from django.http import JsonResponse
from django.utils.timezone import now
import pymongo
from backend.settings import db

def collect_network_traffic(request):
   
    network_traffic = {
        "source_ip": request.META.get('REMOTE_ADDR'),
        "destination_ip": request.META.get('HTTP_HOST'),
        "protocol": request.META.get('SERVER_PROTOCOL'),
        "raw_data": str(request.GET),
        "timestamp": now()
    }

    # Insert data into MongoDB
    db.network_traffic.insert_one(network_traffic)
    log = {
        "message": f"Captured network traffic from {network_traffic['source_ip']} to {network_traffic['destination_ip']}",
        "level": "INFO",
        "timestamp": now()
    }
    db.system_logs.insert_one(log)
    return JsonResponse({"message": "Network traffic collected successfully"}, status=200)


