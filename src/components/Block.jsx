import { LAYER_COLORS } from "../pyramidConfig";

export default function Block({ block, onClick }) {
  
  // -------------------------------
  // Layer-based default color
  // Difficulty: bottom → top
  // -------------------------------
  let bgColor = LAYER_COLORS[block.rowIndex];

  // -------------------------------
  // Override for team result colors
  // -------------------------------
  if (block.status === "teamA") bgColor = "#3b82f6";   // blue
  if (block.status === "teamB") bgColor = "#ec4899";   // pink
  if (block.status === "wrong") bgColor = "#ef4444";   // red

  // Text color: black for default, white for team colors
  const textColor = block.status === null ? "black" : "white";

  return (
    <button
      onClick={() => onClick(block)}
      disabled={block.used}
      className="block-btn"
      style={{
        width: "clamp(32px, 4vw, 52px)",
        height: "clamp(32px, 4vw, 52px)",
        borderRadius: "6px",
        border: "1px solid #374151",
        backgroundColor: bgColor,
        color: textColor,
        fontSize: "clamp(10px, 1.4vw, 18px)",
        fontWeight: "700",
        cursor: block.used ? "not-allowed" : "pointer",
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

        transition: "0.15s ease-in-out",
      }}
      title={`Points: ${block.points}`}
    >
      {block.randomNumber}
    </button>
  );
}
