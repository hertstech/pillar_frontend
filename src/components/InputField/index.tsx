import { Skeleton, Typography } from "@mui/material";
import Styles from "./styles.module.css";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface TextProps {
  label: string;
  name: string;
  value: string | number;
  type: string;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
}

export default function InputField({
  name,
  value,
  onChange,
  label,
  placeholder,
  type,
  required,
  disabled,
  pattern,
}: TextProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={Styles.wrapper}>
      <label htmlFor={name}>
        {label}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={Styles.input}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          pattern={pattern}
        />
        {type === "password" && (
          <div
            className={Styles.icon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        )}
      </label>
    </div>
  );
}

interface TextLabelProps {
  text: any;
  label: string;
  isLoading?: boolean;
}
export const TextLabel = ({ text, label, isLoading }: TextLabelProps) => (
  <label
    className={Styles.label}
    style={{
      fontWeight: 600,
      color: "#475467",
      fontSize: 16,
      margin: "10px 0px",
      // textTransform: "capitalize",
    }}
  >
    {label}
    {isLoading ? (
      <Skeleton
        variant="text"
        animation="wave"
        width={300}
        sx={{ fontSize: "18px" }}
      />
    ) : (
      <Typography
        sx={{
          "&::first-letter": {
            textTransform: "uppercase",
          },
        }}
        fontWeight={400}
        fontSize={16}
        color={"#101928"}
      >
        {text}
      </Typography>
    )}
  </label>
);
