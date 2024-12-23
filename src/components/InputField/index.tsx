import { Box, Skeleton, Typography } from "@mui/material";
import Styles from "./styles.module.css";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import classNames from "classnames";
import { FaRegCircleCheck } from "react-icons/fa6";

interface TextProps {
  label: string;
  name: string;
  rows?: number;
  value?: string | number;
  type?: string;
  errors?: any;
  register?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  checking?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  pattern?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onWheel?: (e: React.WheelEvent) => void;
  textarea?: boolean;
}

export default function InputField({
  name,
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  required,
  disabled,
  pattern,
  register,
  onWheel,
  textarea = false,
  errors,
  ...rest
}: TextProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={Styles.wrapper}>
      <label htmlFor={name} className="text-neu-700 font-[600] text-[.875rem]">
        {label}
        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            {...(register && register(name, { required }))}
            cols={50}
            rows={rest.rows ? rest.rows : 4}
            placeholder={placeholder}
            disabled={disabled}
            className={classNames(
              "border-[1px] mt-2 !font-[400] text-[1rem] placeholder:text-neu-400",
              {
                "border-red-500 !border-[1px] ": errors?.[name],
                "bg-[#F0F2F5] cursor-not-allowed": disabled,
              }
            )}
            style={{
              width: "100%",
              padding: "8px",
              outline: "none",
              minHeight: "100px",
              borderRadius: "8px",
              borderColor: errors?.[name] ? "red" : "#e5e5e5",
            }}
          />
        ) : (
          <Box className="relative">
            <input
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              className={classNames(
                Styles.input,
                disabled &&
                  "text-neutral-400 border-neutral-200 bg-[#F0F2F5] cursor-not-allowed",
                errors?.[name] && "border-red-500 !border-[1px]",
                "!font-[400] !text-[1rem] placeholder:text-neu-400"
              )}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              pattern={pattern}
              onWheel={onWheel}
              {...(register && register(name, { required }))}
              readOnly={rest.isReadOnly}
              {...rest}
            />
            {rest.checking && (
              <span className="absolute top-5 right-4">
                <FaRegCircleCheck className="text-succ" size={18} />
              </span>
            )}
          </Box>
        )}
        {type === "password" && (
          <div
            className={Styles.icon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        )}
        {errors?.[name] && (
          <p className="text-err ml-4 text-xs !font-semibold">
            {errors[name]?.message || "This field is required"}
          </p>
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
