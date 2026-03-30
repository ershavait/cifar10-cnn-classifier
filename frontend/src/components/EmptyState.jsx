const CHIPS = [
  "✈️ airplane", "🚗 auto", "🐦 bird", "🐱 cat", "🦌 deer",
  "🐶 dog", "🐸 frog", "🐴 horse", "🚢 ship", "🚛 truck"
];

export default function EmptyState() {
  return (
    <div style={{
      background: "rgba(25,37,64,0.4)", backdropFilter: "blur(24px)",
      padding: 28, borderRadius: 24,
      border: "1px solid rgba(64,72,93,0.1)",
      minHeight: 400, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16, textAlign: "center"
    }}>
      <div style={{ fontSize: 48, opacity: 0.3 }}>🔮</div>
      <p style={{ fontFamily: "Manrope", fontSize: 20, fontWeight: 700, color: "rgba(222,229,255,0.4)" }}>
        Awaiting Input
      </p>
      <p style={{ color: "#a3aac4", fontSize: 13, maxWidth: 260, lineHeight: 1.6 }}>
        Upload an image and click Classify to see neural network predictions
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 8 }}>
        {CHIPS.map(c => (
          <span key={c} style={{
            background: "rgba(51,35,204,0.2)", color: "#cecbff",
            padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 500
          }}>{c}</span>
        ))}
      </div>
    </div>
  );
}
