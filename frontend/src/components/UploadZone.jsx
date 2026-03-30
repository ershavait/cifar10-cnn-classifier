import { useRef, useState } from "react";

export default function UploadZone({ onFile, preview }) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileRef.current.click()}
      style={{
        background: dragging ? "rgba(186,158,255,0.08)" : "#000",
        border: `2px dashed ${dragging ? "rgba(186,158,255,0.6)" : "rgba(64,72,93,0.3)"}`,
        borderRadius: 16,
        minHeight: preview ? "auto" : 280,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer", overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.19,1,0.22,1)"
      }}>

      {preview ? (
        <img src={preview} alt="preview"
          style={{ width: "100%", borderRadius: 14, display: "block" }} />
      ) : (
        <div style={{ padding: 40, textAlign: "center" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#141f38",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 28
          }}>☁</div>
          <p style={{ fontWeight: 600, marginBottom: 6, color: "#dee5ff" }}>
            Drag and drop your image
          </p>
          <p style={{ color: "#a3aac4", fontSize: 13 }}>PNG, JPG or WebP up to 10MB</p>
          <button style={{
            marginTop: 20, padding: "10px 28px", borderRadius: 12, fontSize: 14,
            background: "linear-gradient(135deg, #ba9eff, #8455ef)",
            border: "none", color: "#000", fontWeight: 700, cursor: "pointer"
          }}>Upload Image</button>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])} />
    </div>
  );
}
