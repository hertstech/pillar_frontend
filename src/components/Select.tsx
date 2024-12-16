import React from "react";
import { Box, MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface CustomSelectProps
  extends Omit<TextFieldProps, "select" | "onChange" | "value"> {
  label: string;
  name: string;
  value: string;
  isDisabled?: boolean;
  validationError?: FieldError;
  register?: UseFormRegisterReturn;
  onChange: (value: string) => void;
  selectItems: {
    id: string;
    name: string;
    value: string;
    icon?: JSX.Element;
  }[];
  itemStyle?: (item: {
    id: string;
    name: string;
    value: string;
    icon?: JSX.Element;
  }) => any;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  onChange,
  register,
  itemStyle,
  isDisabled,
  selectItems,
  validationError,
  ...textFieldProps
}) => {
  const selectedItem = selectItems.find((item) => item.value === value);

  return (
    <label htmlFor={name} className="font-600 text-neu-700">
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
            fontWeight: 400,
            border: "0px solid #E7E9FB",
            borderRadius: "8px",
            width: "auto",
          },
        }}
        error={!!validationError}
        disabled={isDisabled}
        helperText={validationError ? validationError.message : ""}
        inputRef={register?.ref}
        name={register?.name}
        onChange={(e) => {
          e.preventDefault();
          register?.onChange?.(e);
          onChange(e.target.value);
        }}
        onBlur={register?.onBlur}
        InputProps={{
          startAdornment: selectedItem?.icon && (
            <Box sx={{ display: "flex", alignItems: "center", marginRight: 1 }}>
              {selectedItem.icon}
            </Box>
          ),
        }}
        {...textFieldProps}
      >
        {selectItems.map((item) => (
          <MenuItem
            key={item.id}
            value={item.value}
            className="!flex items-center py-2 px-4"
          >
            {/* <Box sx={{ marginRight: "8px" }}>{item.icon}</Box> */}
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
