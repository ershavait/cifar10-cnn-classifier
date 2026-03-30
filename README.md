# cifar10-cnn-classifier

A full-stack image classification app — CNN trained on CIFAR-10, served via FastAPI, with a React frontend. Upload any image and the model returns the top 5 predicted classes with confidence scores.

---

## Demo

![Demo](demo.png)

---

## How It's Built

### Model

A custom 3-layer CNN built in PyTorch and trained from scratch on the [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) dataset (60,000 32×32 images across 10 classes).

**Architecture:**
```
Input (3×32×32)
  → Conv2d(3→32) + ReLU + MaxPool     # 32×16×16
  → Conv2d(32→64) + ReLU + MaxPool    # 64×8×8
  → Conv2d(64→128) + ReLU + MaxPool   # 128×4×4
  → Flatten → Linear(2048→256) → ReLU
  → Linear(256→10)
```

Trained with:
- **Optimizer:** Adam (default lr)
- **Loss:** CrossEntropyLoss
- **Epochs:** 10
- **Batch size:** 64
- **Test accuracy:** ~70–72%

### Backend

FastAPI server (`main.py`) that:
1. Downloads `model.pth` automatically from Google Drive on first run
2. Accepts image uploads via `POST /classify`
3. Resizes to 32×32, normalizes, runs inference
4. Returns top-5 predictions with class names, icons, and probabilities

### Frontend

React + Vite UI with:
- Drag-and-drop image upload zone
- Live classification results with animated probability bars
- Top predicted class highlighted with confidence score

---

## Project Structure

```
cifar10-cnn-classifier/
├── backend/
│   ├── main.py              ← FastAPI server (auto-downloads model on first run)
│   ├── train.py             ← CNN training script (optional)
│   ├── CNN_for_CIFAR10.py   ← Standalone training + eval script
│   ├── dataloader.py        ← CIFAR-10 data loading
│   └── model.pth            ← Trained weights (auto-downloaded)
└── frontend/
    └── src/
        ├── App.jsx
        ├── api.js
        ├── components/
        │   ├── Header.jsx
        │   ├── UploadZone.jsx
        │   ├── ResultCard.jsx
        │   └── EmptyState.jsx
        └── pages/
            └── Home.jsx
```

---

## Setup & Running

### Prerequisites
- Python 3.8+
- Node.js 18+

### Step 1 — Install backend dependencies

```bash
cd backend
pip install torch torchvision fastapi uvicorn python-multipart pillow gdown
```

### Step 2 — Start the FastAPI backend

```bash
uvicorn main:app --reload --port 8000
```

> On first run, `model.pth` is downloaded automatically from Google Drive. No manual setup needed.
> Requires ~50 MB free disk space.

### Step 3 — Set up and start the React frontend

```bash
cd ../frontend
npm install
npm run dev
# UI running at http://localhost:5173
```

---

## Model Weights

The trained weights are hosted on Google Drive and downloaded automatically when you start the backend.

**[⬇️ Download model.pth manually](https://drive.google.com/file/d/1G7wZm1HMOOjivdFQiBqRN1J4eLpM-e7e/view?usp=sharing)**

If you prefer to place it manually, drop `model.pth` into the `backend/` directory — the server will skip the download if the file already exists.

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/classify` | Upload image → returns top-5 predictions |

**Response example:**
```json
{
  "predicted_class": "dog",
  "icon": "🐶",
  "confidence": 99.94,
  "top5": [
    { "class": "dog",  "icon": "🐶", "probability": 99.94 },
    { "class": "deer", "icon": "🦌", "probability": 0.06  }
  ],
  "device": "cpu"
}
```

---

## Classes

`airplane` · `automobile` · `bird` · `cat` · `deer` · `dog` · `frog` · `horse` · `ship` · `truck`

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Model | PyTorch (custom CNN) |
| Dataset | CIFAR-10 |
| Backend | FastAPI + Uvicorn |
| Frontend | React + Vite |
| Styling | Inline CSS (no framework) |
