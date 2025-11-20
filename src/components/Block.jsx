export default function Block({ block, onClick }) {
  // Background colors
  let bgColor = "#facc15"; // yellow (unused)

  if (block.status === "teamA") bgColor = "#3b82f6";  // blue
  if (block.status === "teamB") bgColor = "#ec4899";  // pink
  if (block.status === "wrong") bgColor = "#ef4444";  // red

  // Text color logic:
  // 🔹 TEAM BLOCK → white text
  // 🔹 WRONG BLOCK → white text
  // 🔹 UNUSED YELLOW BLOCK → black text
  const textColor =
    block.status === null ? "black" : "white";

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

        // FINAL text color
        color: textColor,

        fontSize: "11px",
        fontWeight: "bold",
        cursor: block.used ? "not-allowed" : "pointer",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      title={`Points: ${block.points}`}
    >
      {block.randomNumber}
    </button>
  );
}
