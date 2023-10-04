import baseUrl from "../axiosConfig";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();
  const description = useRef();
  const push = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState("1");

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else if (username.current.value.includes(" ")) {
      username.current.setCustomValidity("Username cannot contain spaces!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        city: city.current.value,
        from: from.current.value,
        relationship: relationship.current.value,
        description: description.current.value,
      };
      try {
        await baseUrl.post("/auth/register", user);
        push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3}>
        <Typography variant="h5" align="center">
          SLAY
        </Typography>
        <Typography variant="body1" align="center">
          Welcome to SLAY. No Karens!
        </Typography>

        <form onSubmit={handleClick}>
          <TextField
            fullWidth
            label="Username"
            required
            inputRef={username}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            required
            inputRef={email}
            variant="outlined"
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            required
            inputRef={password}
            variant="outlined"
            margin="normal"
            type="password"
            minLength="6"
          />
          <TextField
            fullWidth
            label="Password Again"
            required
            inputRef={passwordAgain}
            variant="outlined"
            margin="normal"
            type="password"
          />
          <TextField
            fullWidth
            label="Country"
            required
            inputRef={from}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="City"
            required
            inputRef={city}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Add Bio"
            inputRef={description}
            variant="outlined"
            margin="normal"
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Relationship Status</FormLabel>
            <RadioGroup
              aria-label="relationshipStatus"
              name="relationshipStatus"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <FormControlLabel
                value="1"
                control={<Radio inputRef={relationship} />}
                label="Single"
              />
              <FormControlLabel
                value="2"
                control={<Radio inputRef={relationship} />}
                label="In a Relationship"
              />
              <FormControlLabel
                value="3"
                control={<Radio inputRef={relationship} />}
                label="Complicated"
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            mt={2}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            mt={2}
            onClick={() => push("/login")}
          >
            Log into Account
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
