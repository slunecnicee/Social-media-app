import noavatar from "../images/noAvatar.png";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Typography,
  TextField,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cancel as CancelIcon,
  CheckCircle as SaveIcon,
} from "@mui/icons-material";
import { useState } from "react";
import baseUrl from "../axiosConfig";

const Comment = ({ comment, allUsers, userId }) => {
  const [like, setLike] = useState(comment.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.desc);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleEditSubmit = async (e) => {
    try {
      await baseUrl.put(`/comment/${comment._id}`, { desc: editedComment });
      comment.desc = editedComment;

      setEditOpen(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        baseUrl.delete(`/comment/${comment._id}`, {
          data: { userId: userId },
        });
        window.location.reload();
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  };

  const likeHandler = () => {
    try {
      baseUrl.put(`/comment/${comment._id}/like`, {
        userId: userId,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <ListItem key={comment._id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          src={`https://social-media-back-end-936o.onrender.com/imagesProfile/${
            allUsers[comment.userId]?.profilePicture || noavatar
          }`}
          alt="Profile"
        />
      </ListItemAvatar>
      <ListItemText
        secondary={allUsers[comment.userId]?.username || "Unknown User"}
        primary={
          editOpen ? (
            <>
              <TextField
                fullWidth
                variant="outlined"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <IconButton onClick={() => setEditOpen(false)}>
                <CancelIcon sx={{ "&:hover": { color: "red" } }} />
              </IconButton>
              <IconButton onClick={handleEditSubmit}>
                <SaveIcon sx={{ "&:hover": { color: "green" } }} />
              </IconButton>
            </>
          ) : (
            comment.desc
          )
        }
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton aria-label="Like" onClick={likeHandler}>
          <FavoriteIcon sx={{ color: isLiked ? "red" : "" }} />
        </IconButton>
        <Typography variant="body2" style={{ marginLeft: "4px" }}>
          {like} {like === 1 ? "Like" : "Likes"}
        </Typography>
      </div>
      {userId === comment.userId && (
        <IconButton aria-label="More" onClick={() => setAnchorEl(!anchorEl)}>
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(false)}
      >
        <MenuItem onClick={() => setEditOpen(true)}>
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
      <Divider />
    </ListItem>
  );
};

export default Comment;
