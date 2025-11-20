export default function Scoreboard({ teams, activeTeamIndex, switchTeam }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        margin: "20px 0",
        flexWrap: "wrap",
      }}
    >
      {teams.map((team, idx) => {
        const isActive = idx === activeTeamIndex;

        return (
          <div
            key={idx}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              minWidth: "140px",
              textAlign: "center",
              background: isActive ? "#2563eb" : "#1f2937", // Active = blue
              color: "white",
              boxShadow: isActive
                ? "0 0 12px rgba(37,99,235,0.8)"
                : "0 0 5px rgba(0,0,0,0.4)",
              transition: "0.2s ease-in-out",
            }}
          >
            <div style={{ fontSize: "1.2rem", fontWeight: "700" }}>
              {team.name}
            </div>

            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: "900",
                marginTop: "6px",
              }}
            >
              {team.score}
            </div>

            {isActive && (
              <button
                onClick={switchTeam}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#fbbf24",
                  fontWeight: "600",
                }}
              >
                Switch Team
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
