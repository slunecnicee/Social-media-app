import { Link } from "react-router-dom";
import noavatar from "../images/noAvatar.png";

const CloseFriend = ({ user }) => {
  return (
    <Link to={`/profile/${user.username}`}>
      <li className="sidebarFriend">
        <img
          className="sidebarFriendImg"
          src={
            `https://social-media-back-end-936o.onrender.com/imagesProfile/${user.profilePicture}` ||
            noavatar
          }
          alt=""
        />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </Link>
  );
};

export default CloseFriend;
