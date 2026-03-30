import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#060e20", color: "#dee5ff", fontFamily: "'Inter', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060e20; }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Header />
      <Home />

      <footer style={{
        textAlign: "center", paddingBottom: 32,
        color: "rgba(222,229,255,0.25)", fontSize: 11,
        letterSpacing: "0.2em", textTransform: "uppercase"
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 12 }}>
          {["Documentation", "Privacy", "API Status"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(222,229,255,0.3)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        © 2024 Lumina AI · Ethereal Lens Processing
      </footer>
    </div>
  );
}
