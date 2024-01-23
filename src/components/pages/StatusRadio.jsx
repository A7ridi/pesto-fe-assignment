import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const container = {
  display: "flex",
  alignItems: "flex-start",
  gap: 0,
  flexDirection: "column",
  marginTop: 1,
  "@media (min-width: 600px)": {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    marginTop: 0.5,
  },
};

export default function StatusRadio({ selectedStatus, setSelectedStatus }) {
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  return (
    <FormControl sx={container}>
      <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedStatus}
        onChange={handleStatusChange}
        name="radio-buttons-group"
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <FormControlLabel value="To Do" control={<Radio />} label="To Do" />
        <FormControlLabel
          value="In Progress"
          control={<Radio />}
          label="In Progress"
        />
        <FormControlLabel value="Done" control={<Radio />} label="Done" />
      </RadioGroup>
    </FormControl>
  );
}
