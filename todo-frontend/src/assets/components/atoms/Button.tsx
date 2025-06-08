// src/components/atoms/Button.tsx
import React from "react";
import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material";

interface ButtonProps extends MUIButtonProps {
  variant?: "contained" | "outlined" | "text"; // usando variantes do MUI
}

const Button: React.FC<ButtonProps> = ({ children, variant = "contained", ...props }) => {
  return (
    <MUIButton variant={variant} {...props}>
      {children}
    </MUIButton>
  );
};

export default Button;
