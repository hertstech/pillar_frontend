import React from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FieldError, UseFormRegister } from "react-hook-form";

interface CustomSelectProps
  extends Omit<TextFieldProps, "select" | "onChange" | "value"> {
  label: string;
  name: string;
  value: string;
  validationError?: FieldError;
  register?: UseFormRegister<any>;
  onChange: (value: string) => void;
  selectItems: { id: string; name: string; value: string }[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  selectItems,
  value,
  onChange,
  register,
  validationError,
  ...textFieldProps
}) => {
  return (
    <label htmlFor={name}>
      {label}
      <TextField
        select
        fullWidth
        value={value}
        sx={{
          marginTop: "8px",
          "& .MuiOutlinedInput-root": {
            border: "1px solid #E7E9FB",
            borderRadius: "8px",
          },
        }}
        error={!!validationError}
        helperText={validationError ? validationError.message : ""}
        {...(register ? register(name) : {})}
        {...textFieldProps}
        onChange={(e) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
      >
        {selectItems.map((item) => (
          <MenuItem key={item.id} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </label>
  );
};
