import "./App.css";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "./firebase";
import Router from "./components/routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const isLoggedInUser = user !== null && !loading;

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) {
    return <div>Something went wrong!!!</div>;
  }

  return (
    <BrowserRouter>
      <Router isLoggedInUser={isLoggedInUser} user={user} />
    </BrowserRouter>
  );
}

export default App;
