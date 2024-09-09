import React from "react";
import { Button } from "@mui/material";
import classNames from "classnames";

interface PrimaryButtonProps {
  type?: "button" | "submit" | "reset";
  width?: string;
  variant?: string;
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
  variant,
}) => {
  return (
    <Button
      type={type}
      sx={{
        // color: "#F6FEF9",
        outline: "none",
        fontSize: "1rem",
        fontWeight: 600,
        // background: "#2E90FA",
        "&:hover": { backgroundColor: "#2E90FA", color: "white" },
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
      className={classNames(
        "!capitalize",
        variant === "light"
          ? "text-pri-600 bg-[#D1E9FF]"
          : "!text-[#F6FEF9] !bg-pri-600"
      )}
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};
