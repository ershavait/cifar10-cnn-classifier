import io
import torch
import os
import gdown
import torch.nn as nn
import torchvision.transforms as transforms
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch.nn.functional as F

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pth")

if not os.path.exists(MODEL_PATH):
    print("Downloading model weights...")
    gdown.download(
        "https://drive.google.com/uc?id=1G7wZm1HMOOjivdFQiBqRN1J4eLpM-e7e",
        MODEL_PATH,
        quiet=False,
        fuzzy=True
    )

# ── APP ────────────────────────────────────────────────────
app = FastAPI(title="CIFAR-10 Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── CLASSES ────────────────────────────────────────────────
CLASSES = ["airplane", "automobile", "bird", "cat", "deer",
           "dog", "frog", "horse", "ship", "truck"]

CLASS_ICONS = {
    "airplane": "✈️", "automobile": "🚗", "bird": "🐦",
    "cat": "🐱", "deer": "🦌", "dog": "🐶", "frog": "🐸",
    "horse": "🐴", "ship": "🚢", "truck": "🚛"
}

# ── MODEL ──────────────────────────────────────────────────
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv_layers = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1), nn.ReLU(), nn.MaxPool2d(2, 2),
        )
        self.fc_layers = nn.Sequential(
            nn.Linear(4 * 4 * 128, 256), nn.ReLU(), nn.Linear(256, 10)
        )

    def forward(self, x):
        x = self.conv_layers(x)
        x = x.view(x.size(0), -1)
        return self.fc_layers(x)


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model  = CNN().to(device)

# Load weights if exists, else use random weights for demo
import os
if os.path.exists(MODEL_PATH):
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    print("✅ Loaded trained model")
else:
    print("⚠️ No model.pth found — using untrained model")

model.eval()

# ── TRANSFORM ──────────────────────────────────────────────
transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# ── ROUTES ─────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "running", "device": str(device)}


@app.post("/classify")
async def classify(file: UploadFile = File(...)):
    # Read image
    contents = await file.read()
    image    = Image.open(io.BytesIO(contents)).convert("RGB")

    # Preprocess
    tensor = transform(image).unsqueeze(0).to(device)

    # Inference
    with torch.no_grad():
        logits      = model(tensor)
        probs       = F.softmax(logits, dim=1)[0]
        confidence  = probs.max().item()
        pred_idx    = probs.argmax().item()

    # Top 5 predictions
    top5_probs, top5_idx = torch.topk(probs, 5)
    top5 = [
        {
            "class": CLASSES[i.item()],
            "icon": CLASS_ICONS[CLASSES[i.item()]],
            "probability": round(p.item() * 100, 2)
        }
        for p, i in zip(top5_probs, top5_idx)
    ]

    return {
        "predicted_class": CLASSES[pred_idx],
        "icon":            CLASS_ICONS[CLASSES[pred_idx]],
        "confidence":      round(confidence * 100, 2),
        "top5":            top5,
        "device":          str(device)
    }
