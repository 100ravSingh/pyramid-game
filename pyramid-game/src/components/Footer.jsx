// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "16px",
        textAlign: "center",
        color: "#9ca3af",
        fontSize: "14px",
        borderTop: "1px solid #374151",
      }}
    >
      Designed & Developed by{" "}
      <a
        href="https://github.com/100ravSingh" 
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#fbbf24", textDecoration: "none", fontWeight: "bold" }}
      >
        Sourav Singh
      </a>
    </footer>
  );
}
