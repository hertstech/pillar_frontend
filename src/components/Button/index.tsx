interface ButtonProps {
  title: string;
  onClick: any;
}

export default function Button({ title, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#099250",
        color: "#F6FEF9",
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
        lineHeight: 24,
        cursor: "pointer",
      }}
      // type="submit"
    >
      {title}
    </button>
  );
}
