export default function() {
  return (
    <div
      className="position-absolute top-50 start-50 translate-middle d-flex align-items-center gap-4"
      style={{ zIndex: 0, userSelect: "none" }}
    >
      <h1
        className="fw-bold text-uppercase"
        style={{
          fontSize: "15rem",
          opacity: 0.08,
          color: "#ffffff",
          letterSpacing: "10px",
          filter: "blur(1px)",
          margin: 0,
        }}
      >
        Enginuary
      </h1>
    </div>
  );
}
