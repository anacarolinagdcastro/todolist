// src/components/molecules/TaskCard.tsx
import React, { useState } from "react";
import { Card, CardContent, IconButton, Menu, MenuItem, Typography, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Checkbox from "../atoms/Checkbox"; // importando sua versão customizada

interface TaskCardProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, completed, onToggle, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            {/* Usa sua versão de Checkbox */}
            <Checkbox checked={completed} onChange={onToggle} />
            <Typography
              variant="body1"
              sx={{ textDecoration: completed ? "line-through" : "none" }}
            >
              {title}
            </Typography>
          </Box>

          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                onEdit();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                onDelete();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
