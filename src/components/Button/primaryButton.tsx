import React from "react";
import { Button } from "@mui/material";

interface PrimaryButtonProps {
  type?: "button" | "submit" | "reset";
  width?: string;
  buttonName: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = "submit",
  width = "16rem",
  buttonName,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      type={type}
      sx={{
        color: "#F6FEF9",
        outline: "none",
        fontSize: "1rem",
        fontWeight: 600,
        background: "#2E90FA",
        "&:hover": { backgroundColor: "#2E90FA" },
        padding: "16px, 24px",
        borderRadius: 2,
        height: "3.5rem",
        width: width,
        "&.Mui-disabled": {
          opacity: 0.3,
          color: "white",
        },
      }}
      disabled={disabled}
      variant="outlined"
      className="!capitalize"
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};
