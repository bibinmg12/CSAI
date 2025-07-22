from pymongo import MongoClient
from django.conf import settings


# MONGO_URI = "mongodb://localhost:27017"
# MONGO_DB_NAME = "CSAI"
mongo_client = MongoClient(settings.MONGO_URI)
mongo_db = mongo_client[settings.MONGO_DB_NAME]



def get_traffic_logs_collection():
    return mongo_db["traffic_logs"]