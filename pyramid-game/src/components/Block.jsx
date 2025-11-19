export default function Block({ block, onClick }) {
  const bgColor =
    block.status === "correct"
      ? "#22c55e"      // green
      : block.status === "wrong"
      ? "#ef4444"      // red
      : "#facc15";     // yellow

  return (
    <button
      onClick={() => onClick(block)}
      disabled={block.used}
      style={{
        width: 28,
        height: 28,
        borderRadius: 4,
        border: "1px solid #444",
        backgroundColor: bgColor,
        fontSize: "10px",
        cursor: block.used ? "not-allowed" : "pointer",
      }}
      title={`Points: ${block.points}`}
    >
      {block.used ? "✓" : block.points}
    </button>
  );
}
