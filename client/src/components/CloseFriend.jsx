import { Link } from "react-router-dom";
import noavatar from "../images/noAvatar.png";

const CloseFriend = ({ user }) => {
  return (
    <Link to={`/profile/${user.username}`}>
      <li className="sidebarFriend">
        <img
          className="sidebarFriendImg"
          src={
            `http://localhost:5000/imagesProfile/${user.profilePicture}` ||
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
