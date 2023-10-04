import Topbar from "../components/topbar";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import { useState, useEffect, useContext } from "react";
import axiosInterface from "../axiosConfig";
import { useParams } from "react-router";
import noavatar from "../images/noAvatar.png";
import nocover from "../images/noCover.png";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const push = useNavigate();
  const [user, setUser] = useState({});
  const username = useParams();
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInterface.get(`/user/${username.username}`);

      setUser(res.data);
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <Grid container sx={{ marginTop: "90px" }}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ marginLeft: "20px", marginRight: "20px", marginTop: "10px" }}
          >
            <img
              className="profileCoverImg"
              src={
                user.coverPicture
                  ? `https://social-media-back-end-936o.onrender.com/imagesCover/${user.coverPicture}`
                  : nocover
              }
              alt="cover pic"
            />
            <img
              className="profileUserImg"
              src={
                user.profilePicture
                  ? `https://social-media-back-end-936o.onrender.com/imagesProfile/${user.profilePicture}`
                  : noavatar
              }
              alt="profile pic"
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ marginLeft: "20px", marginRight: "20px" }}>
            <Typography sx={{ marginLeft: "20px" }} variant="h4">
              {user.username}
            </Typography>
            <Typography sx={{ marginLeft: "20px" }} variant="body1">
              {user.description}
            </Typography>
            {currentUser.username === username.username && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => push("/edit")}
                sx={{ marginTop: "5px" }}
              >
                Edit Profile
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Feed username={username} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Rightbar user={user} />
        </Grid>
      </Grid>
    </>
  );
};
export default Profile;
