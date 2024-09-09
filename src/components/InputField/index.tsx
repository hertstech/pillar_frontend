import { Skeleton, Typography } from "@mui/material";
import Styles from "./styles.module.css";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import classNames from "classnames";

interface TextProps {
  label: string;
  name: string;
  value: string | number;
  type: string;
  onChange?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  onWheel?: any;
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
  onWheel,
}: TextProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={Styles.wrapper}>
      <label htmlFor={name} style={{ color: "black" }}>
        {label}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={classNames(
            Styles.input,
            disabled &&
              `text-neutral-400 border-neutral-200 bg-[#F0F2F5]
               cursor-not-allowed text-[1rem] font-[500]`
          )}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          pattern={pattern}
          onWheel={onWheel}
        />
        {type === "password" && (
          <div
            className={Styles.icon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        )}

        {name === "bpm" && (
          <div className={Styles.adorn}>
            <span
              style={{
                fontWeight: "fontBold ",
                fontSize: 18,
                alignItems: "center",
                display: "flex",
              }}
            >
              bpm
            </span>
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
  suffix?: string;
}

export const TextLabel = ({
  text,
  label,
  isLoading,
  suffix,
}: TextLabelProps) => (
  <label
    className={Styles.label}
    style={{
      fontWeight: 400,
      color: "#667185",
      fontSize: 14,
      margin: "10px 0px",
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
          mt: "4px",
          fontWeight: "fontBold ",
        }}
        fontSize={16}
        color={"#101928"}
      >
        {text}
        {suffix}
      </Typography>
    )}
  </label>
);

export const ItemLabel = ({
  text,
  label,
  isLoading,
  suffix,
}: TextLabelProps) => {
  return (
    <label
      className=""
      style={{
        fontWeight: 400,
        color: "#475467",
        fontSize: 14,
        margin: "10px 0px",
      }}
    >
      {label}
      {isLoading ? (
        <Skeleton
          variant="text"
          animation="wave"
          width={80}
          sx={{ fontSize: "18px" }}
        />
      ) : (
        <Typography
          sx={{
            "&::first-letter": {
              textTransform: "uppercase",
            },
          }}
          fontWeight={600}
          fontSize={16}
          color={"#101928"}
        >
          {text}
          {suffix}
        </Typography>
      )}
    </label>
  );
};
