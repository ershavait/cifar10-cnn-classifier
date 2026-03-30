const CLASS_COLORS = {
  airplane: "#00F5FF", automobile: "#FF2D78", bird: "#00FF94",
  cat: "#B967FF", deer: "#FFD600", dog: "#FF6B35",
  frog: "#00FF94", horse: "#FF2D78", ship: "#00F5FF", truck: "#B967FF"
};

export default function ResultCard({ result, preview }) {
  const accent = CLASS_COLORS[result.predicted_class] || "#ba9eff";

  return (
    <div style={{
      background: "rgba(25,37,64,0.4)", backdropFilter: "blur(24px)",
      padding: 28, borderRadius: 24,
      border: `1px solid ${accent}22`,
      boxShadow: `0 8px 48px rgba(0,0,0,0.3), 0 0 40px ${accent}10`,
      animation: "fadeIn 0.5s cubic-bezier(0.19,1,0.22,1)"
    }}>

      {/* Top result */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a3aac4", marginBottom: 6 }}>
            Inferred Class
          </p>
          <h3 style={{
            fontFamily: "Manrope", fontSize: 42, fontWeight: 800, lineHeight: 1,
            textTransform: "capitalize",
            background: `linear-gradient(135deg, ${accent}, #dee5ff)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            {result.icon} {result.predicted_class}
          </h3>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "Manrope", fontSize: 36, fontWeight: 900, color: "#ffa5d9", lineHeight: 1 }}>
            {result.confidence}%
          </p>
          <p style={{ fontSize: 10, color: "#a3aac4", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Confidence
          </p>
        </div>
      </div>

      {/* Image preview */}
      {preview && (
        <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 24, position: "relative" }}>
          <img src={preview} alt="classified"
            style={{ width: "100%", display: "block", maxHeight: 200, objectFit: "cover" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
            display: "flex", alignItems: "flex-end", padding: 12
          }}>
            <span style={{ fontSize: 10, color: "rgba(222,229,255,0.5)", fontFamily: "monospace", letterSpacing: "0.2em" }}>
              LAYER_VISUALIZATION_ACTIVE
            </span>
          </div>
        </div>
      )}

      {/* Probability bars */}
      <p style={{
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "#a3aac4", marginBottom: 16, paddingBottom: 8,
        borderBottom: "1px solid rgba(64,72,93,0.2)"
      }}>Category Probabilities</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {result.top5.map((item, i) => (
          <div key={item.class}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{
                fontSize: 13, fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? "#dee5ff" : "rgba(222,229,255,0.6)",
                textTransform: "capitalize"
              }}>{item.icon} {item.class}</span>
              <span style={{ fontSize: 13, color: i === 0 ? accent : "#a3aac4", fontWeight: i === 0 ? 700 : 400 }}>
                {item.probability}%
              </span>
            </div>
            <div style={{ height: 5, background: "#0f1930", borderRadius: 999, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 999,
                width: `${item.probability}%`,
                background: i === 0 ? `linear-gradient(90deg, ${accent}, #8455ef)` : "rgba(64,72,93,0.5)",
                transition: "width 0.8s cubic-bezier(0.19,1,0.22,1)"
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Device badge */}
      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: result.device === "cuda" ? "#00FF94" : "#FFD600",
        }} />
        <span style={{ fontSize: 11, color: "#a3aac4" }}>
          Running on {result.device === "cuda" ? "GPU ⚡" : "CPU"}
        </span>
      </div>
    </div>
  );
}
