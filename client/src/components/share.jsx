import { PermMedia, Cancel } from "@mui/icons-material";
import noavatar from "../images/noAvatar.png";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import baseUrl from "../axiosConfig";
import {
  Paper,
  Input,
  Button,
  IconButton,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [allUserss, setAllUserss] = useState([]);

  useEffect(() => {
    baseUrl
      .get("/users")
      .then((res) => {
        const fileted = res.data.filter((u) => u.username === user.username);
        setAllUserss(fileted);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await baseUrl.post("/upload", data);
      } catch (err) {}
    }
    try {
      await baseUrl.post("/post", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container>
        <Grid item xs={2}>
          <Avatar
            src={
              allUserss[0]?.profilePicture
                ? `https://social-media-back-end-936o.onrender.com/imagesProfile/${allUserss[0]?.profilePicture}`
                : noavatar
            }
            alt=""
            className="shareProfileImg"
          />
        </Grid>
        <Grid item xs={10}>
          <Input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            inputRef={desc}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      {file && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          <IconButton className="shareCancelImg" onClick={() => setFile(null)}>
            <Cancel />
          </IconButton>
        </div>
      )}
      <form
        className="shareBottom"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <Input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ backgroundColor: "green" }}
          className="shareButton"
        >
          Share
        </Button>
      </form>
    </Paper>
  );
};

export default Share;
