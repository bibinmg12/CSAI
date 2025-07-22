# backend/train.py
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model

# === GPU Setup ===
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        # Set memory growth to avoid allocating all memory at once
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print(f"Using GPU: {[gpu.name for gpu in gpus]}")
    except RuntimeError as e:
        print(e)
else:
    print("No GPU found. Training will run on CPU.")

# === Dataset Setup ===
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

train_ds = image_dataset_from_directory(
    r"../Dataset/Train", validation_split=0.2, subset="training",
    seed=42, image_size=IMG_SIZE, batch_size=BATCH_SIZE, label_mode="binary"
)
val_ds = image_dataset_from_directory(
    r"../Dataset/Train", validation_split=0.2, subset="validation",
    seed=42, image_size=IMG_SIZE, batch_size=BATCH_SIZE, label_mode="binary"
)

# === Data Augmentation ===
augment = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.1),
])
train_ds = train_ds.map(lambda x, y: (augment(x), y))

# === Prefetch for performance ===
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

# === Model Definition ===
base = EfficientNetB0(include_top=False, weights="imagenet", input_shape=IMG_SIZE + (3,))
base.trainable = False

x = GlobalAveragePooling2D()(base.output)
x = Dense(256, activation="relu")(x)
output = Dense(1, activation="sigmoid")(x)

model = Model(base.input, output)
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

# === Model Training ===
model.fit(train_ds, validation_data=val_ds, epochs=10)

# === Save Model ===
model.save("fake_detector.h5")
