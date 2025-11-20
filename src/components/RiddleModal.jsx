export default function RiddleModal({
  block,
  activeTeam,
  answerInput,
  setAnswerInput,
  feedback,
  onSubmit,
  onClose,
  hasAnswered,
}) {
  if (!block) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: 20,
          borderRadius: 12,
          width: "350px",
          border: "1px solid #333",
        }}
      >
        <h2>{activeTeam.name}</h2>
        <p><b>Points:</b> {block.points}</p>
        <p>{block.question}</p>

        <input
          type="text"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          placeholder="Answer..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "8px",
            background: "#000",
            color: "#fff",
            border: "1px solid #555"
          }}
        />

        {feedback && <p>{feedback}</p>}

        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button
            onClick={onSubmit}
            disabled={hasAnswered}
            style={{
                padding: "6px 12px",
                background: hasAnswered ? "#16a34a55" : "#22c55e",
                borderRadius: "6px",
                border: "none",
                cursor: hasAnswered ? "not-allowed" : "pointer",
            }}
            >
            {hasAnswered ? "Answered" : "Submit"}
            </button>

          <button
            onClick={onClose}
            style={{
              padding: "6px 12px",
              background: "transparent",
              borderRadius: "6px",
              border: "1px solid #777",
              color: "#fff",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
