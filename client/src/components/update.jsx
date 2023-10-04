import React from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  Box,
} from "@mui/material";

const Update = ({
  handleFileChange,
  handleFileChange2,
  submitHandler,
  submitHandler2,
  descriptionRef,
  descriptionRef2,
}) => {
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center">
        <FormControl>
          <InputLabel htmlFor="profile-picture"></InputLabel>
          <Input
            type="file"
            id="profile-picture"
            name="profile-picture"
            accept=".png,.jpeg,.jpg"
            onChange={handleFileChange}
            inputRef={descriptionRef}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler}
          style={{ marginTop: "16px" }}
        >
          Upload Profile Picture
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <FormControl>
          <InputLabel htmlFor="cover-picture"></InputLabel>
          <Input
            type="file"
            id="cover-picture"
            name="cover-picture"
            accept=".png,.jpeg,.jpg"
            onChange={handleFileChange2}
            inputRef={descriptionRef2}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={submitHandler2}
          style={{ marginTop: "16px" }}
        >
          Upload Cover Picture
        </Button>
      </Box>
    </Container>
  );
};

export default Update;
