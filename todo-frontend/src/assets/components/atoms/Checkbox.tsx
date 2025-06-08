// src/components/atoms/Checkbox.tsx
import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <input type="checkbox" {...props} className="form-checkbox w-4 h-4 text-blue-500" />;
};

export default Checkbox;
