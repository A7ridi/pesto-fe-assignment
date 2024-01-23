import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  const auth = getAuth(app);
  const [loginError, setLoginError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [switchType, setSwitchType] = React.useState(false);
  const navigate = useNavigate();

  const toggleSwitch = () => setSwitchType(!switchType);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      return;
    }

    setLoading(true);
    setLoginError("");

    try {
      let userCredential = null;
      if (switchType) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      if (userCredential) {
        navigate("/");
      }
    } catch (error) {
      const { code } = error;
      console.log({ error });
      let errorMessage = "";

      if (code === "auth/user-not-found") errorMessage = "User not found";
      else if (
        code === "auth/invalid-login-credentials" ||
        code === "auth/email-already-in-use"
      )
        errorMessage = "Invalid login credentials";
      else errorMessage = "Login failed";

      setLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {switchType ? "Log In" : "Sign Up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {loginError && (
              <Typography variant="body2" sx={{ color: "red", my: 1 }}>
                {loginError}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {switchType ? "Log In" : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  onClick={toggleSwitch}
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  {switchType
                    ? "Have an account? Login"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
