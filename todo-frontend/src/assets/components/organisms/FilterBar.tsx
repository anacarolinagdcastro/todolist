import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface FilterBarProps {
  filter: "all" | "pending" | "completed";
  onChange: (newFilter: "all" | "pending" | "completed") => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, onChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue as "all" | "pending" | "completed");
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={filter}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="task filter tabs"
        centered
      >
        <Tab label="All" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="Completed" value="completed" />
      </Tabs>
    </Box>
  );
};

export default FilterBar;
