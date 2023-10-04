import { loginCall } from "../apiCalls";
import { useRef, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const push = useNavigate();
  const email = useRef();
  const password = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const { isFetching, dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3}>
        <Typography variant="h5" align="center">
          SLAY
        </Typography>
        <Typography variant="body1" align="center">
          Welcome to SLAY! awesome people exclusive!
        </Typography>

        <form onSubmit={handleClick}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            inputRef={email}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            minLength="6"
            inputRef={password}
            variant="outlined"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography variant="h5" align="center" sx={{ color: "red" }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            mt={2}
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Login"
            )}
          </Button>
          <Link href="#" variant="body2" align="center" mt={1}>
            Forgot Password?
          </Link>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            mt={1}
            disabled={isFetching}
            onClick={() => {
              push("/register");
            }}
          >
            {isFetching ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Create a New Account"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
