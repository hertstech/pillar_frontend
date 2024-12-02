interface ButtonProps {
  title: string;
  type?: "submit" | "button";
  onClick?: any;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  title,
  onClick,
  loading,
  disabled,
  type,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={rest.className}
      style={{
        background: loading ? "#D0D5DD" : "#2E90FA",
        opacity: disabled ? 0.3 : 1,
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
        cursor: loading ? "not-allowed" : disabled ? "not-allowed" : "pointer",
      }}
      type={type ? type : "button"}
      disabled={loading || disabled}
    >
      {loading && <div className="animateSpin"></div>}
      {title}
    </button>
  );
}
