import {
  Box,
  Divider,
  FormControl,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firebaseDB } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import SimpleSnackbar from "../Snackbar";

const TaskList = ({ tasks }) => {
  const [message, setMessage] = useState("");

  const updateHandler = async (id, value, todo) => {
    const payload = {
      title: todo?.title,
      description: todo?.description,
      status: value,
    };

    try {
      await setDoc(doc(firebaseDB, "Todos", id), payload);
      setMessage({ title: "Todo updated successfully", success: true });
    } catch (error) {
      setMessage({ title: "Something went wrong!!!", error: true });
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(firebaseDB, "Todos", id));
      setMessage({ title: "Todo deleted successfully", success: true });
    } catch (error) {
      setMessage({ title: "Something went wrong!!!", error: true });
    }
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
        padding: 2,
      }}
    >
      {tasks?.length === 0 && (
        <Typography
          variant="body"
          sx={{ justifyContent: "center", paddingY: 1, display: "flex" }}
        >
          No todo available!
        </Typography>
      )}

      {tasks.map((task, idx) => (
        <Box key={task.id}>
          <ListItem>
            <ListItemText
              primary={
                task.data()?.title.charAt(0).toUpperCase() +
                task.data()?.title.slice(1)
              }
              secondary={
                task.data()?.description.charAt(0).toUpperCase() +
                task.data()?.description.slice(1)
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                "@media (min-width: 600px)": {
                  flexDirection: "row",
                },
              }}
            >
              <FormControl size="small">
                <Select
                  value={task.data()?.status}
                  onChange={(e) =>
                    updateHandler(task.id, e.target.value, task.data())
                  }
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                onClick={() => deleteHandler(task.id)}
                sx={{ color: "rgb(255,99,71)", marginLeft: 3 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>

          {tasks.length - 1 !== idx && <Divider />}
        </Box>
      ))}

      <SimpleSnackbar title={message?.title} />
    </Paper>
  );
};

export default TaskList;
