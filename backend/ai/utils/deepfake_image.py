

import os
import cv2
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
import torch.nn as nn
import pretrainedmodels
from .face_detector import detect_faces
from transformers import CLIPProcessor, CLIPModel, BlipProcessor, BlipForConditionalGeneration
from torchvision.models import vit_b_16
from torchvision.models import ViT_B_16_Weights

# === Base directory setup ===

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'vit_deepfake_model1.pth')

# === Load ViT model for Deepfake Detection ===

# vit_model = vit_b_16(pretrained=True)
vit_model = vit_b_16(weights=ViT_B_16_Weights.DEFAULT)
# in_features = vit_model.heads[0].in_features
# vit_model.heads = nn.Linear(vit_model.heads.in_features, 1)  # Binary classification

in_features = vit_model.heads[0].in_features
vit_model.heads = nn.Sequential(nn.Linear(in_features, 2))

if os.path.exists(MODEL_PATH):
    try:
        state_dict = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
        vit_model.load_state_dict(state_dict, strict=True)
        print("✅ ViT deepfake model loaded successfully.")
    except Exception as e:
        print(f"❌ Failed to load ViT model: {e}")
else:
    print("⚠️ vit_deepfake_model1.pth not found. Using pretrained ImageNet weights.")

vit_model.eval()
model = vit_model  # Global model reference

# === Load CLIP model and processor ===

clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# === Load BLIP model and processor ===

blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")

# === Labels for CLIP classification ===

object_labels = [
    "a man driving a car", "a person riding a bike", "a person holding a gun",
    "a person standing", "a person sitting", "a face closeup", "a crowd of people",
    "a person in a spacesuit", "a soldier", "a celebrity", "a human face",
    "a prison", "a submarine", "an empty road", "a banana", "a keyboard"
]

# === Normalization for ViT ===

normalize = transforms.Normalize(mean=[0.5, 0.5, 0.5],
                                 std=[0.5, 0.5, 0.5])

def is_human_image(image_path):
    faces = detect_faces(image_path)
    return len(faces) > 0

def detect_object_label(image_path):
    try:
        image = Image.open(image_path).convert("RGB")
    except Exception as e:
        return "Invalid image"

    inputs = clip_processor(text=object_labels, images=image, return_tensors="pt", padding=True)
    with torch.no_grad():
        outputs = clip_model(**inputs)
        logits_per_image = outputs.logits_per_image
        probs = logits_per_image.softmax(dim=1)

    top_prob, top_idx = probs[0].max(dim=0)
    return object_labels[top_idx.item()]

def generate_blip_caption(image_path):
    try:
        image = Image.open(image_path).convert("RGB")
        inputs = blip_processor(images=image, return_tensors="pt")
        with torch.no_grad():
            out = blip_model.generate(**inputs)
            caption = blip_processor.decode(out[0], skip_special_tokens=True)
        return caption
    except Exception as e:
        return "BLIP captioning failed"

def preprocess_for_vit(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        normalize
    ])
    img = Image.open(image_path).convert("RGB")
    return transform(img).unsqueeze(0)

def classify_deepfake(image_path):
    result = {
        "status": "OK",
        "is_fake": None,
        "confidence": None,
        "message": "",
        "friendly_message": "",
        "blip_caption": None
    }

    label = detect_object_label(image_path)
    blip_caption = generate_blip_caption(image_path)
    result["blip_caption"] = blip_caption

    non_human_labels = ["cup", "bottle", "banana", "keyboard", "car", "chair", "book", "remote", "laptop", "mobile"]
    if label in non_human_labels:
        result["status"] = "error"
        result["message"] = f"The uploaded image appears to be a '{label}', not a human. Please upload a proper human face image."
        result["friendly_message"] = (
            f"🚫 The image looks like **{label}**, not a human face.\n"
            "👉 Please upload a photo that clearly shows a **human face**."
        )
        return result

    if not is_human_image(image_path):
        result["status"] = "error"
        result["message"] = "No human face detected in the uploaded image. Please upload a clear face image."
        result["friendly_message"] = (
            "😕 We couldn't find a human face in the image.\n"
            "📸 Please upload a **clear image of a person's face**, facing the camera."
        )
        return result
    
    
    try:
        processed_img = preprocess_for_vit(image_path)
        with torch.no_grad():
            prediction_raw = model(processed_img)
            prediction = torch.softmax(prediction_raw, dim=1)
            confidence_tensor, predicted_class = torch.max(prediction, dim=1)
            is_fake = predicted_class.item() == 1  # assuming class 1 = fake
            confidence = round(confidence_tensor.item() * 100, 2)

        result["is_fake"] = is_fake
        result["confidence"] = confidence
        result["message"] = "Deepfake analysis complete."

        if is_fake:
            result["friendly_message"] = (
                f"⚠️ The image appears to be **AI-generated or manipulated** (deepfake).\n"
                f"🧠 Confidence: **{confidence}%**\n"
                f"🔍 Please verify the source before trusting this media."
            )
        else:
            result["friendly_message"] = (
                f"✅ This image **looks real** (not a deepfake).\n"
                f"🔒 Confidence: **{confidence}%**\n"
                f"👍 Great! The photo seems to be authentic."
            )

    

    except Exception as e:
        result["status"] = "error"
        result["message"] = f"Prediction failed: {str(e)}"
        result["friendly_message"] = (
            "❌ Something went wrong while analyzing the image.\n"
            "🔁 Please try again with a different image or format."
        )

    return result




