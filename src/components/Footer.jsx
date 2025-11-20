export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "12px 0",
        textAlign: "center",
        background: "#0f172a",
        color: "#e2e8f0",
        fontSize: "0.9rem",
        marginTop: "20px",
        borderTop: "1px solid #1e293b",
      }}
    >
      Designed & Developed by{" "}
      <a
        href="https://github.com/100ravSingh"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#38bdf8",
          fontWeight: "700",
          textDecoration: "none",
        }}
      >
        Sourav Singh
      </a>
    </footer>
  );
}
