from fastapi import FastAPI, UploadFile, File
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

app = FastAPI()
model = load_model("fake_detector.h5")

@app.post("/detect")
async def detect_image(file: UploadFile = File(...)):
    img = Image.open(file.file).convert("RGB").resize((224,224))
    arr = np.expand_dims(np.array(img)/255.0, axis=0)
    score = float(model.predict(arr)[0][0])
    return {"is_fake": score > 0.5, "confidence": score}
