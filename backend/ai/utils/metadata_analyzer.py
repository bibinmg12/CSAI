import os
import exiftool
import json

# def extract_metadata_with_exiftool(file_path):
#     try:
#         with exiftool.ExifTool() as et:
#             metadata = et.get_metadata(file_path)
#         return metadata
#     except Exception as e:
#         return {"error": str(e)}

# def extract_metadata_with_exiftool(file_path):
#     try:
#         with exiftool.ExifTool() as et:
#             output = et.execute(b"-j", file_path.encode())
#             metadata_list = json.loads(output.decode("utf-8"))
#             return metadata_list[0] if metadata_list else {}
#     except Exception as e:
#         return {"error": str(e)}

def extract_metadata_with_exiftool(file_path):
    try:
        with exiftool.ExifTool() as et:
            output = et.execute(b"-j", file_path.encode())
            # output is already str, no need to decode
            metadata_list = json.loads(output)
            return metadata_list[0] if metadata_list else {}
    except Exception as e:
        return {"error": str(e)}


def analyze_image_metadata(image_path):
    result = {
        "type": "image",
        "metadata": {},
        "suspicious": False,
        "flags": []
    }

    metadata = extract_metadata_with_exiftool(image_path)
    
    if not metadata or "error" in metadata:
        result["flags"].append(f"Error reading image metadata: {metadata.get('error', 'Unknown error')}")
        result["suspicious"] = True
        return result

    result["metadata"] = metadata

    # Suspicious tags check
    suspicious_tags = [
        "EXIF:Software", "EXIF:ProcessingSoftware", "XMP:CreatorTool",
        "Composite:DigitalCreationDate", "EXIF:ModifyDate", "EXIF:DateTimeOriginal"
    ]

    for tag in suspicious_tags:
        if tag in metadata:
            val = str(metadata[tag]).lower()
            if "photoshop" in val or "editor" in val or "modified" in val:
                result["flags"].append(f"Edited with suspicious software: {val}")
                result["suspicious"] = True

    # Modification date check
    mod_date = metadata.get("EXIF:ModifyDate")
    orig_date = metadata.get("EXIF:DateTimeOriginal")

    if mod_date and orig_date and mod_date != orig_date:
        result["flags"].append("Modification date differs from original.")
        result["suspicious"] = True

    return result

def analyze_video_metadata(video_path):
    result = {
        "type": "video",
        "metadata": {},
        "suspicious": False,
        "flags": []
    }

    metadata = extract_metadata_with_exiftool(video_path)

    if not metadata or "error" in metadata:
        result["flags"].append(f"Error reading video metadata: {metadata.get('error', 'Unknown error')}")
        result["suspicious"] = True
        return result

    result["metadata"] = metadata

    # Suspicious video tags
    suspicious_keys = ["QuickTime:EncodedDate", "QuickTime:TaggedDate", "QuickTime:Software", "XMP:CreateDate"]
    for key in suspicious_keys:
        if key in metadata:
            result["flags"].append(f"Suspicious metadata found: {key} -> {metadata[key]}")
            result["suspicious"] = True

    return result

def analyze_metadata(file_path):
    ext = os.path.splitext(file_path)[-1].lower()

    if ext in [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"]:
        return analyze_image_metadata(file_path)
    elif ext in [".mp4", ".mov", ".avi", ".mkv", ".webm"]:
        return analyze_video_metadata(file_path)
    else:
        return {
            "type": "unknown",
            "metadata": {},
            "suspicious": True,
            "flags": ["Unsupported file type for metadata analysis."]
        }
