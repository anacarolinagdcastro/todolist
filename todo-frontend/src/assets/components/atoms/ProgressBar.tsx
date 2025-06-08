// src/assets/components/atoms/ProgressBar.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface ProgressBarProps {
  completedTasks: number;
  totalTasks: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedTasks, totalTasks }) => {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 38,
        backgroundColor: "#ddd",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#a5d6a7", // verde suave
          transition: "width 0.3s ease-in-out",
          borderRadius: 2,
          zIndex: 1,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          position: "relative",
          zIndex: 2,
          color: progress > 50 ? "#000" : "#000", // texto sempre preto para verde suave
          fontWeight: "normal",
        }}
      >
        {`${completedTasks} of ${totalTasks} tasks done`}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
