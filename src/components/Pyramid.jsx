import Block from "./Block";
import "./Pyramid.css";

export default function Pyramid({ rows, onBlockClick }) {
  return (
    <div
      className="pyramid-container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",   // 🔥 FIX: bottom block appears first
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="pyramid-row"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",  // 🔥 Responsive support
            width: "100%",
          }}
        >
          {row.map((block) => (
            <Block
              key={block.id}
              block={block}
              onClick={onBlockClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
