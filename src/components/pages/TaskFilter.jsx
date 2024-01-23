import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const boxContainer = {
  display: "flex",
  flexDirection: "row",
  gap: 3,
  alignItems: "center",
  justifyContent: "flex-end",
};

const TaskFilter = ({ onFilterChange }) => {
  const statuses = ["All", "To Do", "In Progress", "Done"];

  return (
    <FormControl sx={boxContainer} size="small">
      <Typography variant="h6" sx={{ fontSize: "16px" }}>
        Status
      </Typography>
      <Select
        defaultValue={statuses[0]}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {statuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskFilter;
