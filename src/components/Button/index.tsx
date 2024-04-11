interface ButtonProps {
  title: string;
  onClick?: any;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onClick,
  loading,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: loading ? "#D0D5DD" : "#2E90FA",
        opacity: disabled ? 0.3 : 1,
        // background: loading || disabled? "#D3D3D3" : "#2E90FA",
        color: loading || disabled ? "#FFF" : "#F6FEF9",
        width: "100%",
        height: 24,
        padding: "24px 16px",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        outline: "none",
        borderRadius: 6,
        fontSize: 16,
        // cursor: loading || disabled ? "not-allowed" : "pointer",
        cursor: loading ? "not-allowed" : disabled ? "not-allowed" : "pointer",
      }}
      disabled={loading || disabled}
    >
      {loading && <div className="animateSpin"></div>}
      {title}
    </button>
  );
}
