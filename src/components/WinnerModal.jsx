export default function WinnerModal({ winner, teams, onRestart }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "30px 25px",
          borderRadius: "16px",
          width: "clamp(320px, 85vw, 420px)",
          textAlign: "center",
          color: "white",
          boxShadow: "0 0 25px rgba(0,0,0,0.6)",
          animation: "modalPop 0.3s ease",
        }}
      >
        {/* Trophy */}
        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
          {winner === "Draw" ? "🤝" : "🏆"}
        </div>

        {/* Title */}
        <h2 style={{ marginBottom: "10px", color: "#fbbf24" }}>
          {winner === "Draw" ? "Match Draw" : "Winner"}
        </h2>

        {/* Winner Name */}
        <div
          style={{
            fontSize: "1.6rem",
            fontWeight: "900",
            marginBottom: "15px",
          }}
        >
          {winner === "Draw" ? "Both Teams" : winner}
        </div>

        {/* Final Scores */}
        <div style={{ marginBottom: "20px" }}>
          {teams.map((t, i) => (
            <div
              key={i}
              style={{
                fontSize: "1.1rem",
                marginBottom: "6px",
                color: i === 0 ? "#3b82f6" : "#ec4899",
                fontWeight: "700",
              }}
            >
              {t.name}: {t.score}
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "1rem",
            fontWeight: "800",
            background: "#22c55e",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🔄 Restart Game
        </button>
      </div>
    </div>
  );
}
