from pymongo import MongoClient
import gridfs

client = MongoClient("mongodb://localhost:27017")
db = client["CSAI"]
fs = gridfs.GridFS(db)
deepfake_result = db["deepfake_results"]









