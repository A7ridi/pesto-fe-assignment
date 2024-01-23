import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import app from "../../firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [todos, loading] = useCollection(
    collection(getFirestore(app), "Todos"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const filteredTasks =
    filter === "All"
      ? todos?.docs
      : todos?.docs.filter((task) => task.data().status === filter);

  return (
    <Container
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", marginY: 1 }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Hi, {user?.email ?? ""}
          </Typography>
          <Button onClick={handleLogout} variant="outlined" color="error">
            <LogoutIcon />
            Logout
          </Button>
        </Box>
        <Typography variant="body">Task Management Application</Typography>
        <TaskForm user={user} />
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginY: 1,
          }}
        >
          <Typography variant="body" sx={{ fontWeight: "bold", marginY: 1 }}>
            Task List
          </Typography>
          <TaskFilter onFilterChange={setFilter} />
        </Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TaskList tasks={filteredTasks ?? []} />
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
