import React, { useState, useEffect, useContext } from "react";
import baseUrl from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { Button, TextareaAutosize, List, Typography } from "@mui/material";

import Comment from "./comment";

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await baseUrl.get("/users");
        const usersData = response.data;
        const usersDictionary = {};
        usersData.forEach((user) => {
          usersDictionary[user._id] = user;
        });
        setAllUsers(usersDictionary);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await baseUrl.get(`/comment/post/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = {
      userId: user._id,
      postId: postId,
      desc: newComment,
    };
    try {
      await baseUrl.post("/comment", newCommentData);
      window.location.reload();
      setNewComment("");
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  return (
    <div>
      <Typography variant="h5">Comments</Typography>
      <form onSubmit={handleCommentSubmit}>
        <TextareaAutosize
          style={{
            width: "93%",
            padding: "8px",
            marginBottom: "8px",
            minHeight: "36px",
          }}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          minRows={3}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <List>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            allUsers={allUsers}
            userId={user._id}
          />
        ))}
      </List>
    </div>
  );
};

export default CommentSection;
