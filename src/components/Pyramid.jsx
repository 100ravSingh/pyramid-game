import Block from "./Block";

export default function Pyramid({ rows, onBlockClick }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: "8px",
        marginTop: "20px"
      }}
    >
      {rows.map((row, idx) => (
        <div key={idx} style={{ display: "flex", gap: "6px" }}>
          {row.map((block) => (
            <Block key={block.id} block={block} onClick={onBlockClick} />
          ))}
        </div>
      ))}
    </div>
  );
}
