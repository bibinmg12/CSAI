# import cv2
# import numpy as np
# import os
# from typing import Tuple, Union, Dict

# # Use Haar Cascade for now; you can replace this with a DNN model for higher accuracy
# CASCADE_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
# face_cascade = cv2.CascadeClassifier(CASCADE_PATH)

# def detect_faces_image(image_path: str) -> Dict:
#     """Detect human faces in an image."""
#     image = cv2.imread(image_path)
#     if image is None:
#         return {"status": "error", "message": "Invalid image file."}

#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

#     if len(faces) == 0:
#         return {"status": "no_face", "message": "No human faces found in the image."}

#     return {
#         "status": "success",
#         "face_count": len(faces),
#         "face_boxes": faces.tolist(),  # [[x, y, w, h], ...]
#         "file_type": "image"
#     }


# def extract_key_frames(video_path: str, max_frames: int = 5) -> list:
#     """Extract a few key frames from a video."""
#     frames = []
#     cap = cv2.VideoCapture(video_path)

#     if not cap.isOpened():
#         return []

#     total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#     step = max(1, total_frames // max_frames)

#     for i in range(0, total_frames, step):
#         cap.set(cv2.CAP_PROP_POS_FRAMES, i)
#         ret, frame = cap.read()
#         if not ret:
#             continue
#         frames.append(frame)
#         if len(frames) >= max_frames:
#             break

#     cap.release()
#     return frames


# def detect_faces_video(video_path: str) -> Dict:
#     """Detect human faces in a video by scanning a few key frames."""
#     key_frames = extract_key_frames(video_path)

#     if not key_frames:
#         return {"status": "error", "message": "Unable to extract frames from video."}

#     face_found = False
#     total_faces = 0

#     for frame in key_frames:
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
#         if len(faces) > 0:
#             face_found = True
#             total_faces += len(faces)

#     if not face_found:
#         return {"status": "no_face", "message": "No human faces found in video frames."}

#     return {
#         "status": "success",
#         "face_count": total_faces,
#         "file_type": "video"
#     }


# def detect_faces(filepath: str) -> Dict:
#     """Master function to check if image or video and perform face detection."""
#     ext = os.path.splitext(filepath)[-1].lower()
#     if ext in ['.jpg', '.jpeg', '.png', '.bmp']:
#         return detect_faces_image(filepath)
#     elif ext in ['.mp4', '.mov', '.avi', '.mkv']:
#         return detect_faces_video(filepath)
#     else:
#         return {"status": "error", "message": f"Unsupported file format: {ext}"}










import cv2
import numpy as np
import os
from typing import Dict, Union

# Path to the DNN model files
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
MODEL_DIR = os.path.join(BASE_DIR, 'models')

CONFIG_PATH = os.path.join(MODEL_DIR, 'deploy.prototxt')
MODEL_PATH = os.path.join(MODEL_DIR, 'res10_300x300_ssd_iter_140000.caffemodel')

# Load the pre-trained DNN face detection model
net = cv2.dnn.readNetFromCaffe(CONFIG_PATH, MODEL_PATH)


def detect_faces_image(image_path: str) -> Dict:
    """Detect human faces in an image file using DNN."""
    image = cv2.imread(image_path)
    if image is None:
        return {"status": "error", "message": "Invalid image file."}
    return detect_faces_from_frame(image, file_type="image")


def extract_key_frames(video_path: str, max_frames: int = 5) -> list:
    """Extract a few key frames from a video file."""
    frames = []
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        return []

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    step = max(1, total_frames // max_frames)

    for i in range(0, total_frames, step):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if not ret:
            continue
        frames.append(frame)
        if len(frames) >= max_frames:
            break

    cap.release()
    return frames


def detect_faces_video(video_path: str) -> Dict:
    """Detect human faces in a video file using DNN on key frames."""
    key_frames = extract_key_frames(video_path)

    if not key_frames:
        return {"status": "error", "message": "Unable to extract frames from video."}

    face_found = False
    total_faces = 0

    for frame in key_frames:
        result = detect_faces_from_frame(frame, file_type=None)
        if result["status"] == "success":
            face_found = True
            total_faces += result["face_count"]

    if not face_found:
        return {"status": "no_face", "message": "No human faces found in video frames."}

    return {
        "status": "success",
        "face_count": total_faces,
        "file_type": "video"
    }


def detect_faces_from_frame(frame: np.ndarray, file_type: str = "frame") -> Dict:
    """Detect faces from a raw image frame (NumPy array)."""
    if frame is None:
        return {"status": "error", "message": "Invalid image frame."}

    h, w = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104.0, 177.0, 123.0), False, crop=False)
    net.setInput(blob)
    detections = net.forward()

    faces = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")
            faces.append((startX, startY, endX, endY))

    if not faces:
        return {"status": "no_face", "message": "No human faces found."}

    return {
        "status": "success",
        "face_count": len(faces),
        "face_boxes": faces,
        "file_type": file_type
    }


def detect_faces(input_data: Union[str, np.ndarray]) -> Dict:
    """
    Master function to detect faces from:
    - image/video file path (str)
    - raw image frame (np.ndarray)
    """
    if isinstance(input_data, np.ndarray):
        return detect_faces_from_frame(input_data)

    elif isinstance(input_data, str):
        ext = os.path.splitext(input_data)[-1].lower()
        if ext in ['.jpg', '.jpeg', '.png', '.bmp']:
            return detect_faces_image(input_data)
        elif ext in ['.mp4', '.mov', '.avi', '.mkv']:
            return detect_faces_video(input_data)
        else:
            return {"status": "error", "message": f"Unsupported file format: {ext}"}

    return {"status": "error", "message": "Unsupported input type. Must be a file path or image frame."}












# import cv2
# import numpy as np
# import os
# from typing import Dict

# # Path to the DNN model files

# # BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# MODEL_DIR = os.path.join(BASE_DIR, 'models')

# CONFIG_PATH = os.path.join(MODEL_DIR, 'deploy.prototxt')
# MODEL_PATH = os.path.join(MODEL_DIR, 'res10_300x300_ssd_iter_140000.caffemodel')

# net = cv2.dnn.readNetFromCaffe(CONFIG_PATH, MODEL_PATH)


# # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# # MODEL_PATH = os.path.join(BASE_DIR, 'models', 'res10_300x300_ssd_iter_140000.caffemodel')
# # CONFIG_PATH = os.path.join(BASE_DIR, 'models', 'deploy.prototxt')


# # # MODEL_PATH = './models/res10_300x300_ssd_iter_140000.caffemodel'
# # # CONFIG_PATH = './models/deploy.prototxt'

# # # Load the pre-trained Caffe model
# # net = cv2.dnn.readNetFromCaffe(CONFIG_PATH, MODEL_PATH)

# def detect_faces_image(image_path: str) -> Dict:
#     """Detect human faces in an image using DNN."""
#     image = cv2.imread(image_path)
#     if image is None:
#         return {"status": "error", "message": "Invalid image file."}

#     # Prepare image for DNN (resize and normalize)
#     h, w = image.shape[:2]
#     blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300), (104.0, 177.0, 123.0), False, crop=False)
#     net.setInput(blob)
#     detections = net.forward()

#     # Loop through the detections
#     faces = []
#     for i in range(detections.shape[2]):
#         confidence = detections[0, 0, i, 2]

#         # If the confidence is above a threshold, consider it as a valid face
#         if confidence > 0.5:
#             box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
#             (startX, startY, endX, endY) = box.astype("int")
#             faces.append((startX, startY, endX, endY))

#     if len(faces) == 0:
#         return {"status": "no_face", "message": "No human faces found in the image."}

#     return {
#         "status": "success",
#         "face_count": len(faces),
#         "face_boxes": faces,  # [[x, y, w, h], ...]
#         "file_type": "image"
#     }


# def extract_key_frames(video_path: str, max_frames: int = 5) -> list:
#     """Extract a few key frames from a video."""
#     frames = []
#     cap = cv2.VideoCapture(video_path)

#     if not cap.isOpened():
#         return []

#     total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
#     step = max(1, total_frames // max_frames)

#     for i in range(0, total_frames, step):
#         cap.set(cv2.CAP_PROP_POS_FRAMES, i)
#         ret, frame = cap.read()
#         if not ret:
#             continue
#         frames.append(frame)
#         if len(frames) >= max_frames:
#             break

#     cap.release()
#     return frames


# def detect_faces_video(video_path: str) -> Dict:
#     """Detect human faces in a video using DNN on key frames."""
#     key_frames = extract_key_frames(video_path)

#     if not key_frames:
#         return {"status": "error", "message": "Unable to extract frames from video."}

#     face_found = False
#     total_faces = 0

#     for frame in key_frames:
#         h, w = frame.shape[:2]
#         blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104.0, 177.0, 123.0), False, crop=False)
#         net.setInput(blob)
#         detections = net.forward()

#         for i in range(detections.shape[2]):
#             confidence = detections[0, 0, i, 2]
#             if confidence > 0.5:
#                 face_found = True
#                 total_faces += 1

#     if not face_found:
#         return {"status": "no_face", "message": "No human faces found in video frames."}

#     return {
#         "status": "success",
#         "face_count": total_faces,
#         "file_type": "video"
#     }


# def detect_faces(filepath: str) -> Dict:
#     """Master function to check if image or video and perform face detection."""
#     ext = os.path.splitext(filepath)[-1].lower()
#     if ext in ['.jpg', '.jpeg', '.png', '.bmp']:
#         return detect_faces_image(filepath)
#     elif ext in ['.mp4', '.mov', '.avi', '.mkv']:
#         return detect_faces_video(filepath)
#     else:
#         return {"status": "error", "message": f"Unsupported file format: {ext}"}
