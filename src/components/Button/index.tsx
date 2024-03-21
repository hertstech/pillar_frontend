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
        background: loading || disabled? "#D3D3D3" : "#099250",
        color: loading|| disabled ? "#000" : "#F6FEF9",
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
        cursor: loading || disabled ? "not-allowed" : "pointer",
      }}
      disabled={loading || disabled}
    >
      {loading && <div className="animateSpin"></div>}
      {title}
    </button>
  );
}
