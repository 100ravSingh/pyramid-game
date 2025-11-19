export default function Scoreboard({ teams, activeTeamIndex, switchTeam }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {teams.map((team, idx) => (
          <div
            key={idx}
            style={{
              padding: "12px",
              width: "120px",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #333",
              background: activeTeamIndex === idx ? "#1f2937" : "#111827",
              boxShadow:
                activeTeamIndex === idx
                  ? "0 0 12px rgba(250, 204, 21, 0.7)"
                  : "none"
            }}
          >
            <h3 style={{ margin: "4px 0" }}>{team.name}</h3>
            <p style={{ fontSize: "22px", margin: 0 }}>{team.score}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          onClick={switchTeam}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: "#fbbf24",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Switch Team
        </button>
      </div>
    </>
  );
}
