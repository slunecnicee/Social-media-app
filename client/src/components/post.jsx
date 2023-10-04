import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import likee from "../images/like.png";
import heart from "../images/heart.png";
import { useEffect, useContext } from "react";
import baseUrl from "../axiosConfig";
import noavatar from "../images/noAvatar.png";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommentSection from "./commentSection";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editedDesc, setEditedDesc] = useState(post.desc);
  const [isEditing, setIsEditing] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await baseUrl.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      baseUrl.put(`/post/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: enUS,
  });

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        baseUrl.delete(`/post/${post._id}`, {
          data: { userId: currentUser._id },
        });
        window.location.reload();
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      await baseUrl.put(`/post/${post._id}`, { desc: editedDesc });
      post.desc = editedDesc;

      setIsEditing(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  `https://social-media-back-end-936o.onrender.com/imagesProfile/${user.profilePicture}` ||
                  noavatar
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{timeAgo}</span>
          </div>
          {currentUser._id === post.userId && (
            <div className="postTopRight">
              <MoreVert onClick={() => setIsMenuOpen(!isMenuOpen)} />
              {isMenuOpen && (
                <div className="postMenu">
                  <p onClick={handleEditClick}>Edit Post</p>
                  <p onClick={handleDeleteClick}>Delete Post</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="postCenter">
          {isEditing ? (
            <div className="editing">
              <textarea
                rows="4"
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
              />
              <button
                style={{ backgroundColor: "green", right: "40px" }}
                onClick={handleSaveClick}
              >
                V
              </button>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => setIsEditing(false)}
              >
                X
              </button>
            </div>
          ) : (
            <span className="postText">{post.desc}</span>
          )}
          {post.img.length > 0 && (
            <img
              className="postImg"
              src={
                post.img.length > 25
                  ? post.img
                  : `https://social-media-back-end-936o.onrender.com/images/${post.img}`
              }
              alt=""
            />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={likee}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={heart}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span
              onClick={() => setCommentsOpen(!commentsOpen)}
              className="postCommentText"
            >
              comments
            </span>
          </div>
        </div>
      </div>
      {commentsOpen && <CommentSection postId={post._id} />}
    </div>
  );
};

export default Post;
