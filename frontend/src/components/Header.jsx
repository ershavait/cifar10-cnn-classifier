export default function Header() {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(6,14,32,0.85)", backdropFilter: "blur(20px)",
      padding: "0 32px", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid rgba(64,72,93,0.15)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #ba9eff, #8455ef)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16
        }}>✦</div>
        <span style={{
          fontFamily: "Manrope", fontWeight: 800, fontSize: 20,
          background: "linear-gradient(135deg, #ba9eff, #8455ef)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Lumina Classifier</span>
      </div>

      <nav style={{ display: "flex", gap: 8 }}>
        {["Explore", "History", "Docs"].map((n, i) => (
          <button key={n} style={{
            background: i === 0 ? "rgba(186,158,255,0.1)" : "transparent",
            border: "none",
            color: i === 0 ? "#ba9eff" : "rgba(222,229,255,0.5)",
            padding: "6px 14px", borderRadius: 999, fontSize: 11,
            fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: "Inter"
          }}>{n}</button>
        ))}
      </nav>
    </header>
  );
}
