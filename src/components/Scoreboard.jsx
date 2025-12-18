export default function Scoreboard({
  teams,
  timers,
  formatTime,
  activeTeamIndex,
  suddenDeath,
  gameOver,
}) {
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
        const isLowTime = timers[idx] <= 30 && timers[idx] > 0;

        return (
          <div
            key={idx}
            style={{
              padding: "14px 22px",
              borderRadius: "12px",
              minWidth: "170px",
              textAlign: "center",
              background: isActive ? "#1d4ed8" : "#1f2937",
              color: "white",
              border: isActive ? "2px solid #fbbf24" : "1px solid #374151",
              boxShadow: isActive
                ? "0 0 15px rgba(59,130,246,0.8)"
                : "0 0 6px rgba(0,0,0,0.4)",
              transition: "0.25s ease",
              opacity: gameOver && isActive ? 0.85 : 1,
            }}
          >
            {/* Team Name */}
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "800",
                marginBottom: "4px",
              }}
            >
              {team.name}
            </div>

            {/* Score */}
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "900",
                marginBottom: "4px",
              }}
            >
              {team.score}
            </div>

            {/* Timer */}
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: isLowTime ? "#ef4444" : "#fbbf24",
                animation: isLowTime ? "blink 1s infinite" : "none",
              }}
            >
              ⏱ {formatTime(timers[idx])}
            </div>

            {/* Active indicator */}
            {isActive && !gameOver && (
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  color: "#22c55e",
                }}
              >
                ▶ Your Turn
              </div>
            )}
          </div>
        );
      })}

      {/* Sudden Death Banner */}
      {suddenDeath && !gameOver && (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "900",
            color: "#f87171",
            fontSize: "1.1rem",
          }}
        >
          ⚠ SUDDEN DEATH — Beat opponent’s score before time runs out
        </div>
      )}
    </div>
  );
}
