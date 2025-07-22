# def calculate_danger_score(results):
#     """
#     Aggregate risk signals from multiple detectors and compute a final danger score.
#     results = {
#         'gan': {...},
#         'deepfake': {...},
#         'metadata': {...}
#     }
#     """
#     score = 0
#     reasons = []
#     flags = []

#     # GAN Detection
#     gan_result = results.get('gan')
#     if gan_result and gan_result.get("prediction") == "fake":
#         confidence = gan_result.get("confidence", 0)
#         if confidence > 90:
#             score += 25
#             reasons.append("GAN-generated image with high confidence.")
#         elif confidence > 70:
#             score += 15
#             reasons.append("Likely GAN-generated image.")

#     # Deepfake Detection
#     deepfake_result = results.get('deepfake')
#     if deepfake_result and deepfake_result.get("prediction") == "deepfake":
#         confidence = deepfake_result.get("confidence", 0)
#         if confidence > 90:
#             score += 30
#             reasons.append("High-confidence deepfake media detected.")
#         elif confidence > 70:
#             score += 20
#             reasons.append("Possible deepfake media.")

#     # Metadata Forensics
#     metadata = results.get('metadata')
#     if metadata:
#         if metadata.get("metadata_stripped") is True:
#             score += 10
#             reasons.append("Metadata stripped – common in malicious media.")
#         if metadata.get("suspicious_editing") is True:
#             score += 10
#             reasons.append("Signs of suspicious image editing.")
#         if metadata.get("ai_signature") is True:
#             score += 15
#             reasons.append("AI signature found in file metadata.")

#     # Clamp score to 100 max
#     score = min(score, 100)

#     # Categorize Risk Level
#     if score >= 80:
#         risk_level = "Critical"
#     elif score >= 60:
#         risk_level = "High"
#     elif score >= 30:
#         risk_level = "Moderate"
#     else:
#         risk_level = "Low"

#     return {
#         "danger_score": score,
#         "risk_level": risk_level,
#         "reasons": reasons,
#         "flags": reasons.copy()
#     }


# def calculate_danger_score(results):
#     """
#     Aggregate risk signals from multiple detectors and compute a final danger score.
#     results = {
#         'gan': {...},
#         'deepfake': {...},
#         'metadata': {...}
#     }
#     """
#     score = 0
#     reasons = []
#     flags = []

#     # GAN Detection
#     gan_result = results.get('gan')
#     if gan_result and gan_result.get("prediction") == "fake":
#         confidence = gan_result.get("confidence", 0)
#         if confidence > 90:
#             score += 25
#             reasons.append("GAN-generated image with high confidence.")
#         elif confidence > 70:
#             score += 15
#             reasons.append("Likely GAN-generated image.")

#     # Deepfake Detection - FIXED
#     deepfake_result = results.get('deepfake')
#     if deepfake_result and deepfake_result.get("is_fake") is True:
#         confidence = deepfake_result.get("confidence", 0)
#         if confidence > 90:
#             score += 30
#             reasons.append("High-confidence deepfake media detected.")
#         elif confidence > 70:
#             score += 20
#             reasons.append("Possible deepfake media.")

#     # Metadata Forensics
#     metadata = results.get('metadata')
#     if metadata:
#         if metadata.get("metadata_stripped") is True:
#             score += 10
#             reasons.append("Metadata stripped – common in malicious media.")
#         if metadata.get("suspicious_editing") is True:
#             score += 10
#             reasons.append("Signs of suspicious image editing.")
#         if metadata.get("ai_signature") is True:
#             score += 15
#             reasons.append("AI signature found in file metadata.")

#     # Clamp score to 100 max
#     score = min(score, 100)

#     # Categorize Risk Level
#     if score >= 80:
#         risk_level = "Critical"
#     elif score >= 60:
#         risk_level = "High"
#     elif score >= 30:
#         risk_level = "Moderate"
#     else:
#         risk_level = "Low"

#     return {
#         "danger_score": score,
#         "risk_level": risk_level,
#         "reasons": reasons,
#         "flags": reasons.copy()
#     }


def calculate_danger_score(results):
    score = 0
    reasons = []
    flags = []

    # GAN Detection
    gan_result = results.get('gan')
    if gan_result and gan_result.get("prediction") == "fake":
        confidence = gan_result.get("confidence", 0)
        if confidence > 90:
            score += 25
            flags.append("gan_high_confidence_fake")
            reasons.append(f"⚠️ GAN-generated image detected with {confidence:.2f}% confidence.")
        elif confidence > 70:
            score += 15
            flags.append("gan_moderate_confidence_fake")
            reasons.append(f"Possible GAN-generated image ({confidence:.2f}% confidence).")

    # Deepfake Detection
    deepfake_result = results.get('deepfake')
    if deepfake_result and deepfake_result.get("is_fake") is True:
        confidence = deepfake_result.get("confidence", 0)
        if confidence > 90:
            score += 30
            flags.append("deepfake_high_confidence")
            reasons.append(f"🎭 High-confidence deepfake detected ({confidence:.2f}%).")
        elif confidence > 70:
            score += 20
            flags.append("deepfake_moderate_confidence")
            reasons.append(f"Possible deepfake media ({confidence:.2f}% confidence).")

    # Metadata Forensics
    metadata = results.get('metadata')
    if metadata:
        if metadata.get("metadata_stripped"):
            score += 10
            flags.append("metadata_stripped")
            reasons.append("📁 Metadata stripped – often used in malicious media.")
        if metadata.get("suspicious_editing"):
            score += 10
            flags.append("suspicious_editing_detected")
            reasons.append("🖼️ Signs of suspicious image editing.")
        if metadata.get("ai_signature"):
            score += 15
            flags.append("ai_signature_detected")
            reasons.append("🧠 AI signature found in file metadata.")

    # Clamp score to 100
    score = min(score, 100)

    # Risk Level
    if score >= 80:
        risk_level = "Critical"
    elif score >= 60:
        risk_level = "High"
    elif score >= 30:
        risk_level = "Moderate"
    else:
        risk_level = "Low"

    return {
        "danger_score": score,
        "risk_level": risk_level,
        "reasons": reasons,
        "flags": flags
    }
