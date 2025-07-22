from tensorflow.keras.models import load_model

# Load your legacy HDF5 model
model = load_model("fake_detector.h5")

# Save it in the modern Keras SavedModel format (.keras)
model.save("fake_detector.keras")   # this will create a directory named "fake_detector.keras"

print("✅ Model converted successfully to fake_detector.keras format!")
