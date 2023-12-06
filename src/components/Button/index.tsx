interface ButtonProps {
  title: string;
}

export default function Button({ title }: ButtonProps) {
  return (
    <button
      style={{
        background: "#099250",
        color: "#F6FEF9",
        width: "100%",
        height: 24,
        padding: "24px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        outline: "none",
        borderRadius: 6,
      }}
      type="submit"
    >
      {title}
    </button>
  );
}
