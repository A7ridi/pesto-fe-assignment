import { Box, Button, FormLabel, Paper, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../../firebase";
import { useState } from "react";
import StatusRadio from "./StatusRadio";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("To Do");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length < 2 || description.length < 2) return;
    const payload = {
      title,
      description,
      status: selectedStatus,
    };

    setLoading(true);

    await addDoc(collection(firebaseDB, "Todos"), payload);
    setLoading(false);

    setTitle("");
    setDescription("");
  };

  return (
    <Paper
      elevation={1}
      sx={{
        maxHeight: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        marginTop: 1,
        borderRadius: "12px",
        paddingX: 4,
        paddingY: 3,
      }}
    >
      <FormLabel onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="standard"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="standard"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box sx={{ display: "flex" }}>
          <StatusRadio
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </Box>

        <Button
          disabled={!title || !description || loading}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 1 }}
        >
          Add Task
        </Button>
      </FormLabel>
    </Paper>
  );
};

export default TaskForm;
