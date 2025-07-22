# from fastapi import FastAPI, Request, UploadFile, File, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import shutil
# import uuid
# import os
# import traceback
# import requests
# app = FastAPI()

# # Allow React app running on localhost:3000 to connect
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# model = load_model("fake_detector.keras")  # Modern Keras SavedModel format

# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)


# # NEMOTRON_API_KEY = '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'

# @app.post("/analyze-media/")
# async def analyze_media(media: UploadFile = File(...)):
#     if not media.content_type.startswith("image/"):
#         raise HTTPException(status_code=400, detail="Only image uploads are supported.")

#     # Save uploaded image with unique filename
#     file_ext = os.path.splitext(media.filename)[-1]
#     file_id = str(uuid.uuid4())
#     saved_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_ext}")
    
#     with open(saved_path, "wb") as buffer:
#         shutil.copyfileobj(media.file, buffer)

#     try:
#         # Preprocess the saved image
#         img = image.load_img(saved_path, target_size=(224, 224))
#         img_array = image.img_to_array(img)
#         img_array = np.expand_dims(img_array, axis=0) / 255.0  # normalization

#         # Predict with the loaded model
#         pred = model.predict(img_array)[0][0]

#         # DEBUG: print raw prediction to console
#         print(f"[DEBUG] Raw prediction value: {pred}")

#         label = "Fake" if pred > 0.9715 else "Real"
#         confidence = float(pred)

#     except Exception as e:
#         print("[ERROR] Exception during prediction:")
#         traceback.print_exc()
#         raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

#     finally:
#         # Always remove uploaded image after prediction
#         if os.path.exists(saved_path):
#             os.remove(saved_path)

#     return {
#         "status": "success",
#         "prediction": label,
#         "confidence": confidence
#     }

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import shutil
import uuid
import os
import traceback
import mimetypes
import tempfile
from datetime import datetime, timezone
from ai.utils import (
    antivirus_scanner, face_detector, metadata_analyzer,
    gan_detector, danger_score
)
from bson import ObjectId
from db import deepfake_result, fs  # You must set these up to point to your MongoDB collections
from fastapi import Request
from fastapi import Path
from fastapi.responses import JSONResponse
import tempfile
import requests


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model = load_model("fake_detector.keras")
    print("[INFO] Model loaded successfully")
except Exception as e:
    print(f"[ERROR] Failed to load model: {e}")
    model = None

def convert_numpy_types(data):
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





# Preprocessing
def detect_and_crop_face(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    if len(faces) == 0:
        return img
    (x, y, w, h) = faces[0]
    return img[y:y+h, x:x+w]

def preprocess_with_clahe(image_path):
    img = detect_and_crop_face(image_path)
    img = cv2.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 21)
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    merged = cv2.merge((cl, a, b))
    enhanced = cv2.cvtColor(merged, cv2.COLOR_LAB2RGB)
    resized = cv2.resize(enhanced, (224, 224))
    return resized.astype("float32") / 255.0

def tta_predict(img, model):
    img = np.expand_dims(img, axis=0)
    augments = [
        img,
        np.expand_dims(np.fliplr(img[0]), axis=0),
        np.expand_dims(np.flipud(img[0]), axis=0),
        np.expand_dims(cv2.GaussianBlur(img[0], (5, 5), 0), axis=0),
        np.expand_dims(cv2.rotate(img[0], cv2.ROTATE_90_CLOCKWISE), axis=0),
    ]
    preds = [model.predict(x)[0][0] for x in augments]
    return float(np.mean(preds))

@app.post("/analyze-detailed/")
async def analyze_detailed(media: UploadFile = File(...)):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")
    if not media.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are supported.")
    
    ext = mimetypes.guess_extension(media.content_type) or ".jpg"
    filename = f"{uuid.uuid4()}{ext}"
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(temp_dir, filename)
    with open(temp_path, "wb") as f:
        shutil.copyfileobj(media.file, f)

    try:
        # Store in MongoDB GridFS
        # media.file.seek(0)
        # gridfs_file_id = fs.put(media.file, filename=media.filename, content_type=media.content_type)

        media.file.seek(0)
        gridfs_file_id = fs.put(media.file, filename=filename, content_type=media.content_type)


        # Antivirus scan
        # media.file.seek(0)
        # antivirus_result = antivirus_scanner.is_malicious(media)

        # media.file.seek(0)
        # media.file.name = media.filename  # Set file name for signature/mime check

        # Save FastAPI file to a temp file manually
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        media.file.seek(0)
        temp_file.write(media.file.read())
        temp_file.flush()
        temp_file.close()
        antivirus_result = antivirus_scanner.is_malicious(open(temp_file.name, "rb"))



        # antivirus_result = antivirus_scanner.is_malicious(media.file)


        # Metadata analysis
        metadata_result = metadata_analyzer.analyze_metadata(temp_path)

        # Face detection
        face_result = face_detector.detect_faces(temp_path)
        if face_result.get("status") == "no_face":
            return {"status": "no_face", "message": "No face detected in image."}

        # Deepfake prediction
        img_array = preprocess_with_clahe(temp_path)
        confidence = tta_predict(img_array, model)
        if confidence > 0.98:
            label = "Highly Fake"
        elif confidence > 0.9716:
            label = "Fake"
        elif confidence < 0.9717:
            label = "Real"
        else:
            label = "Uncertain"
        deepfake_result_data = {
            "confidence": round(confidence, 4),
            "label": label
        }

        # GAN detection
        gan_result = gan_detector.analyze_gan_image(temp_path)

        # Danger Score
        danger_result = danger_score.calculate_danger_score({
            "antivirus": antivirus_result,
            "face": face_result,
            "metadata": metadata_result,
            "deepfake": deepfake_result_data,
            "gan": gan_result
        })

        # Save to MongoDB
        now = datetime.now(timezone.utc)
        mongo_data = {

            "filename": filename,  # ✅ Use this, not media.filename
            "file_id": gridfs_file_id,
            "content_type": media.content_type,
            "antivirus": antivirus_result,
            "face_detection": face_result,
            "deepfake": deepfake_result_data,
            "gan": gan_result,
            "metadata": metadata_result,
            "danger_score": danger_result,
            "analyzed_at": now,


            # "filename": media.filename,
            # "file_id": gridfs_file_id,
            # "content_type": media.content_type,
            # "antivirus": antivirus_result,
            # "face_detection": face_result,
            # "deepfake": deepfake_result_data,
            # "gan": gan_result,
            # "metadata": metadata_result,
            # "danger_score": danger_result,
            # "analyzed_at": now,
        }
        cleaned = convert_numpy_types(mongo_data)
        inserted = deepfake_result.insert_one(cleaned)
        result_id_str = str(inserted.inserted_id)

        return {"result_id": result_id_str}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


# @app.get("/get-analysis-result/{result_id}")
# async def get_analysis_result(result_id: str):
#     try:
#         print("[DEBUG] Received result_id:", result_id)
#         result = deepfake_result.find_one({"_id": ObjectId(result_id)})
#         if not result:
#             return JSONResponse(status_code=404, content={"error": "Result not found"})

#         # Convert ObjectId fields to string
#         result["_id"] = str(result["_id"])
#         if "file_id" in result and isinstance(result["file_id"], ObjectId):
#             result["file_id"] = str(result["file_id"])

#         return JSONResponse(status_code=200, content=result)

#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

def convert_mongo_types(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, datetime):  # ✅ just `datetime` here, not `datetime.datetime`
        return obj.isoformat()
    elif isinstance(obj, (np.int64, np.int32, np.float64)):
        return float(obj)
    elif isinstance(obj, dict):
        return {k: convert_mongo_types(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_mongo_types(v) for v in obj]
    return obj

@app.get("/get-analysis-result/{result_id}")
async def get_analysis_result(result_id: str):
    try:
        print("[DEBUG] Received result_id:", result_id)

        result = deepfake_result.find_one({"_id": ObjectId(result_id)})
        if not result:
            return JSONResponse(status_code=404, content={"error": "Result not found"})

        cleaned_result = convert_mongo_types(result)
        return JSONResponse(status_code=200, content=cleaned_result)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
    
    


NEMOTRON_API_KEY = ''


@app.post("/api/query/")
async def handle_nemotron_query(request: Request):
    try:
        data = await request.json()
        user_query = data.get('query', '').strip()

        if not user_query:
            raise HTTPException(status_code=400, detail="Please provide a query.")

        nemotron_api_url = "https://integrate.api.nvidia.com/v1/chat/completions"
        headers = {
            'Authorization': f'Bearer {NEMOTRON_API_KEY}',
            'Content-Type': 'application/json',
        }

        system_message = (
            "You are a hacking assistant. Please only respond to hacking-related questions. "
            "If the question is unrelated, reply with: 'I can only help with hacking-related queries.'"
        )

        payload = {
            "model": "meta/llama3-70b-instruct",
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_query},
            ],
            "temperature": 0.7,
            "max_tokens": 200,
        }

        response = requests.post(nemotron_api_url, json=payload, headers=headers)

        if response.status_code == 200:
            response_data = response.json()
            answer = response_data.get('choices', [{}])[0].get('message', {}).get('content', "No answer received.")
            return {"answer": answer}
        else:
            raise HTTPException(status_code=500, detail=f"Nemotron API returned error: {response.status_code} - {response.text}")

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to Nemotron API: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")