import React from "react";
import { Chip } from "@mui/material";

interface StatusBadgeProps {
  status: "completed" | "pending" | "in-progress" | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getColor = (status: string): "success" | "warning" | "default" | "primary" => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "in-progress":
        return "primary";
      default:
        return "default";
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Chip label={capitalize(status)} color={getColor(status)} variant="outlined" />
  );
};

export default StatusBadge;
