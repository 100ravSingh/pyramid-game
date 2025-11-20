export default function RiddleModal({
  block,
  activeTeam,
  answerInput,
  setAnswerInput,
  feedback,
  onSubmit,
  onClose,
  hasAnswered
}) {
  if (!block) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          width: "clamp(300px, 80vw, 450px)",
          color: "white",
          boxShadow: "0 0 12px rgba(0,0,0,0.4)",
          animation: "modalPop 0.25s ease",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#fbbf24" }}>
          {activeTeam.name} — Solve the Riddle
        </h2>

        <p style={{ marginBottom: "15px", fontSize: "1.1rem" }}>
          {block.question}
        </p>

        <input
          type="text"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          placeholder="Type your answer..."
          disabled={hasAnswered}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #4b5563",
            marginBottom: "10px",
            fontSize: "1rem",
          }}
        />

        {feedback && (
          <p
            style={{
              marginBottom: "10px",
              fontWeight: "700",
              color:
                feedback.startsWith("Correct") ? "#22c55e" : "#ef4444",
            }}
          >
            {feedback}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onSubmit}
            disabled={hasAnswered}
            style={{
              padding: "10px 16px",
              background: "#3b82f6",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              flex: 1,
              marginRight: "10px",
              opacity: hasAnswered ? 0.6 : 1,
            }}
          >
            Submit
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "10px 16px",
              background: "#6b7280",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              flex: 1,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
