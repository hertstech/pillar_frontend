import React from "react";
import { Box, MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomSelectProps
  extends Omit<TextFieldProps, "select" | "onChange" | "value"> {
  label: string;
  name: string;
  value: string;
  validationError?: FieldError;
  register?: UseFormRegisterReturn;
  onChange: (value: string) => void;
  selectItems: { id: string; name: string; value: string }[];
  itemStyle?: (item: { id: string; name: string; value: string }) => any;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  selectItems,
  value,
  onChange,
  register,
  itemStyle,
  validationError,
  ...textFieldProps
}) => {
  return (
    <label htmlFor={name} className="!font-900">
      {label}
      <TextField
        select
        fullWidth
        value={value}
        sx={{
          marginTop: "8px",
          "& .MuiOutlinedInput-root": {
            color: "#101928",
            fontSize: "16px",
            fontWeight: 500,
            border: "0px solid #E7E9FB",
            borderRadius: "8px",
            width: "auto",
          },
        }}
        error={!!validationError}
        helperText={validationError ? validationError.message : ""}
        inputRef={register?.ref}
        name={register?.name}
        onChange={(e) => {
          e.preventDefault();

          register?.onChange?.(e);
          onChange(e.target.value);
        }}
        onBlur={register?.onBlur}
        {...textFieldProps}
      >
        {selectItems.map((item) => (
          <MenuItem
            key={item.id}
            value={item.value}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
            }}
          >
            <Box
              sx={{
                ...(itemStyle ? itemStyle(item) : {}),
              }}
            >
              {item.name}
            </Box>
          </MenuItem>
        ))}
      </TextField>
    </label>
  );
};
