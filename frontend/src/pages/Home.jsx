import { useState } from "react";
import UploadZone from "../components/UploadZone";
import ResultCard from "../components/ResultCard";
import EmptyState from "../components/EmptyState";
import { classifyImage } from "../api";

export default function Home() {
  const [image,   setImage]   = useState(null);
  const [preview, setPreview] = useState(null);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleFile = (file) => {
    setImage(file);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleClassify = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const data = await classifyImage(image);
      setResult(data);
    } catch {
      setError("Cannot connect to backend. Make sure FastAPI is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <main style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h1 style={{
          fontFamily: "Manrope", fontSize: "clamp(36px,5vw,60px)",
          fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16
        }}>
          AI Image{" "}
          <span style={{
            background: "linear-gradient(135deg, #ba9eff, #9492ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Classifier</span>
        </h1>
        <p style={{ color: "#a3aac4", fontSize: 17, fontWeight: 300, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Upload any image and watch the neural network identify it across 10 precision categories in real time.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            background: "rgba(25,37,64,0.4)", backdropFilter: "blur(24px)",
            padding: 28, borderRadius: 24,
            border: "1px solid rgba(64,72,93,0.15)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.3)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 18 }}>Input Canvas</h2>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#ba9eff",
                background: "rgba(186,158,255,0.1)", padding: "4px 10px", borderRadius: 999
              }}>Neural Ready</span>
            </div>
            <UploadZone onFile={handleFile} preview={preview} />
          </div>

          {/* Action bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
            <button onClick={handleReset} style={{
              background: "transparent", border: "none", color: "#a3aac4",
              cursor: "pointer", fontSize: 13, fontWeight: 500
            }}>↺ Reset Canvas</button>

            <button onClick={handleClassify} disabled={!image || loading} style={{
              background: "linear-gradient(135deg, #ba9eff, #8455ef)",
              border: "none", color: "#000", fontWeight: 700,
              padding: "14px 32px", borderRadius: 999, fontSize: 15,
              cursor: image && !loading ? "pointer" : "not-allowed",
              opacity: !image || loading ? 0.5 : 1,
              display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.3s cubic-bezier(0.19,1,0.22,1)"
            }}>
              {loading ? (
                <>
                  <div style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000",
                    borderRadius: "50%", animation: "spin 0.8s linear infinite"
                  }} />
                  Analyzing...
                </>
              ) : "✦ Classify Image"}
            </button>
          </div>

          {error && (
            <div style={{
              background: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.2)",
              borderRadius: 12, padding: "12px 16px", color: "#ff6e84", fontSize: 13
            }}>{error}</div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {result ? <ResultCard result={result} preview={preview} /> : <EmptyState />}

          {/* Info box */}
          <div style={{
            background: "#091328", borderRadius: 16, padding: "16px 20px",
            display: "flex", alignItems: "center", gap: 14,
            border: "1px solid rgba(64,72,93,0.08)"
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,165,217,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 18
            }}>ℹ</div>
            <p style={{ fontSize: 12, color: "#a3aac4", lineHeight: 1.6 }}>
              Lumina AI uses a CNN trained on CIFAR-10. Train first with{" "}
              <code style={{ color: "#ba9eff" }}>python train.py</code>, then start the API.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
