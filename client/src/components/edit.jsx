import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  TextareaAutosize,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import baseUrl from "../axiosConfig";
import Update from "./update";
import { useNavigate } from "react-router-dom";

function EditUser() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const descriptionRef = useRef();
  const descriptionRef2 = useRef();
  const { user } = useContext(AuthContext);
  const push = useNavigate();

  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    description: user.description,
    city: user.city,
    from: user.from,
    relationshipStatus: user.relationship,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    baseUrl
      .put(`/user/${user._id}`, userData)
      .then((response) => {
        setSuccessMessage("Updated successfully");
        console.log("User updated:", response.data);
        push("/profile/" + user.username);
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage("Error updating user");
        console.error("Error updating user:", error);
      });
  };

  const handleFileChange = (e) => {
    setSelectedProfile(e.target.files[0]);
  };
  const handleFileChange2 = (e) => {
    setSelectedCover(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const description = descriptionRef.current.value;
    const selectedFile = selectedProfile;

    if (selectedFile) {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("userId", userId);

      try {
        const response = await baseUrl.post("/uploadProfilePicture", data);
        if (response.status === 200) {
          push("/profile/" + user.username);
          window.location.reload();
        }
      } catch (err) {
        console.error("Error uploading profile picture:", err);
      }
    }
  };
  const submitHandler2 = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const description = descriptionRef2.current.value;
    const selectedFile = selectedCover;

    if (selectedFile) {
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("userId", userId);

      try {
        const response = await baseUrl.post("/uploadCoverPicture", data);
        if (response.status === 200) {
          push("/profile/" + user.username);
          window.location.reload();
        }
      } catch (err) {
        console.error("Error uploading profile picture:", err);
      }
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Edit User Information</Typography>
      <TextField
        label="Username"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={userData.city}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="From"
        name="from"
        value={userData.from}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextareaAutosize
        rowsMin={3}
        placeholder="Description"
        name="description"
        value={userData.description}
        onChange={handleInputChange}
        fullWidth
        style={{ marginTop: "16px", marginBottom: "16px" }}
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Relationship Status</InputLabel>
        <Select
          name="relationshipStatus"
          value={userData.relationshipStatus}
          onChange={handleInputChange}
          label="Relationship Status"
        >
          <MenuItem value={1}>Single</MenuItem>
          <MenuItem value={2}>In a Relationship</MenuItem>
          <MenuItem value={3}>Complicated</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
      {successMessage && (
        <Typography sx={{ color: "green", marginTop: "16px" }} color="primary">
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography sx={{ color: "red", marginTop: "16px" }}>
          {errorMessage}
        </Typography>
      )}
      <Typography variant="h4" style={{ marginTop: "24px" }}>
        Update Images
      </Typography>
      <Update
        handleFileChange={handleFileChange}
        handleFileChange2={handleFileChange2}
        submitHandler={submitHandler}
        submitHandler2={submitHandler2}
        descriptionRef={descriptionRef}
        descriptionRef2={descriptionRef2}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => push("/profile/" + user.username)}
      >
        go back
      </Button>
    </Box>
  );
}

export default EditUser;
