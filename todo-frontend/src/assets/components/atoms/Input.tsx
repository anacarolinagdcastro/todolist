import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: "outlined" | "filled" | "standard";
}

const Input: React.FC<InputProps> = ({ variant = "outlined", ...props }) => {
  return (
    <TextField
      variant={variant}
      fullWidth
      {...props}
    />
  );
};

export default Input;