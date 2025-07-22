# import cv2
# import torch
# import numpy as np
# from PIL import Image
# import os
# from .face_detector import detect_faces
# from torchvision import transforms

# # Set the path to your model (assuming it's in the models folder)
# MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'model.pth')

# # Load the PyTorch model
# # xception_model = torch.load(MODEL_PATH)
# xception_model = torch.load(MODEL_PATH, map_location=torch.device('cpu'))

# xception_model.eval()  # Set the model to evaluation mode



# import cv2
# import torch
# import numpy as np
# from PIL import Image
# import os
# from .face_detector import detect_faces
# from torchvision import transforms
# import pretrainedmodels  # Make sure this is installed

# # Load Xception architecture
# xception_model = pretrainedmodels.__dict__['xception'](num_classes=1000, pretrained=None)

# # Set the path to your model weights
# MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'model.pth')

# # Load weights
# state_dict = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
# xception_model.load_state_dict(state_dict)

# xception_model.eval()  # Now this works fine


# # Image preprocessing for Xception
# def preprocess_for_xception(image):
#     img = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)).resize((299, 299))
#     preprocess = transforms.Compose([
#         transforms.ToTensor(),
#         transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
#     ])
#     img = preprocess(img).unsqueeze(0)
#     return img

# def process_frame(frame):
#     """
#     Preprocess a single frame and run it through the deepfake model.
#     """
#     processed_frame = preprocess_for_xception(frame)
#     with torch.no_grad():
#         prediction = xception_model(processed_frame)
#         confidence = prediction.item()  # Assuming it's a single value (binary classification)
#         return confidence

# def classify_deepfake_video(video_path):
#     """
#     Classify a video as containing a deepfake or not based on its frames.
#     """
#     result = {
#         "status": "OK",
#         "is_fake": None,
#         "confidence": None,
#         "message": "",
#         "frame_results": []
#     }

#     # Open video file
#     cap = cv2.VideoCapture(video_path)
#     if not cap.isOpened():
#         result["status"] = "error"
#         result["message"] = "Error opening video file."
#         return result

#     total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#     deepfake_frame_count = 0

#     # Iterate through each frame in the video
#     for frame_idx in range(total_frames):
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Step 1: Check for face in the frame
#         faces = detect_faces(frame)  # Assuming detect_faces works for video frames too
#         if len(faces) == 0:
#             result["frame_results"].append({
#                 "frame": frame_idx,
#                 "status": "No face detected"
#             })
#             continue

#         # Step 2: Classify the frame for deepfake detection
#         try:
#             confidence = process_frame(frame)
#             deepfake_threshold = 0.5  # Adjust based on model's performance

#             if confidence > deepfake_threshold:
#                 deepfake_frame_count += 1
#                 result["frame_results"].append({
#                     "frame": frame_idx,
#                     "status": "Deepfake detected",
#                     "confidence": confidence
#                 })
#             else:
#                 result["frame_results"].append({
#                     "frame": frame_idx,
#                     "status": "Real face detected",
#                     "confidence": confidence
#                 })

#         except Exception as e:
#             result["status"] = "error"
#             result["message"] = f"Error processing frame {frame_idx}: {str(e)}"
#             break

#     cap.release()  # Release the video capture object

#     # Step 3: Analyze the frame results to classify the video
#     if deepfake_frame_count / total_frames > 0.5:
#         result["is_fake"] = True
#         result["confidence"] = round((deepfake_frame_count / total_frames) * 100, 2)
#         result["message"] = "Video contains deepfake content."
#     else:
#         result["is_fake"] = False
#         result["confidence"] = round((1 - deepfake_frame_count / total_frames) * 100, 2)
#         result["message"] = "Video is real."

#     return result




import os
import cv2
import torch
import numpy as np
from PIL import Image
from torchvision import transforms
import pretrainedmodels
import torch.nn as nn
from .face_detector import detect_faces

# Base directory and model path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'model.pth')

# Load Xception model
xception = pretrainedmodels.__dict__['xception'](pretrained='imagenet')
xception.last_linear = nn.Linear(xception.last_linear.in_features, 1)

# Load fine-tuned weights
if os.path.exists(MODEL_PATH):
    try:
        state_dict = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
        xception.load_state_dict(state_dict, strict=False)
        print("Custom model.pth loaded successfully.")
    except Exception as e:
        print(f"Failed to load model.pth: {e}")
else:
    print("model.pth not found. Using pretrained ImageNet weights.")

xception.eval()
model = xception  # Set global model

# Preprocessing for Xception
preprocess = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def preprocess_frame_for_xception(frame):
    """
    Preprocess BGR OpenCV frame for Xception
    """
    img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    img_tensor = preprocess(img).unsqueeze(0)  # Add batch dimension
    return img_tensor

def classify_frame(frame):
    """
    Classify a single frame using the model
    """
    img_tensor = preprocess_frame_for_xception(frame)
    with torch.no_grad():
        prediction = model(img_tensor).squeeze(0).item()
    return prediction

def classify_deepfake_video(video_path):
    """
    Analyze a video file and classify it as deepfake or real.
    """
    result = {
        "status": "OK",
        "is_fake": None,
        "confidence": None,
        "message": "",
        "frame_results": []
    }

    if not os.path.exists(video_path):
        result["status"] = "error"
        result["message"] = "Video file not found."
        return result

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        result["status"] = "error"
        result["message"] = "Error opening video file."
        return result

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    deepfake_frames = 0
    processed_frames = 0
    frame_interval = max(total_frames // 20, 1)  # Sample up to 20 frames

    for idx in range(0, total_frames, frame_interval):
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret:
            continue

        # Face detection
        faces = detect_faces(frame)
        if len(faces) == 0:
            result["frame_results"].append({
                "frame": idx,
                "status": "No face detected"
            })
            continue

        try:
            score = classify_frame(frame)
            is_deepfake = score > 0.5
            if is_deepfake:
                deepfake_frames += 1

            result["frame_results"].append({
                "frame": idx,
                "status": "Deepfake detected" if is_deepfake else "Real face detected",
                "confidence": round(score * 100, 2)
            })
            processed_frames += 1

        except Exception as e:
            result["status"] = "error"
            result["message"] = f"Error processing frame {idx}: {str(e)}"
            cap.release()
            return result

    cap.release()

    if processed_frames == 0:
        result["status"] = "error"
        result["message"] = "No valid frames with faces detected."
        return result

    deepfake_ratio = deepfake_frames / processed_frames
    result["is_fake"] = deepfake_ratio > 0.5
    result["confidence"] = round(deepfake_ratio * 100, 2) if result["is_fake"] else round((1 - deepfake_ratio) * 100, 2)
    result["message"] = "Video contains deepfake content." if result["is_fake"] else "Video appears real."

    return result
