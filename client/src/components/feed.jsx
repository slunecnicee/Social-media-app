import Post from "./post";
import Share from "./share";
import { useEffect, useState } from "react";
import baseUrl from "../axiosConfig";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Grid } from "@mui/material";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await baseUrl.get(`/post/profile/${username.username}`)
        : await baseUrl.get(`post/timeline/${user._id}`);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className="feed">
          <div className="feedWrapper">
            {(username === undefined ||
              username.username === user.username) && <Share />}
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Feed;
