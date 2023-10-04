import { Link } from "react-router-dom";
import noavatar from "../images/noAvatar.png";

const Online = ({ user }) => {
  return (
    <li className="rightbarFriend">
      <Link to={`/profile/${user.username}`}>
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={
              user.profilePicture
                ? `https://social-media-back-end-936o.onrender.com/imagesProfile/${user.profilePicture}`
                : noavatar
            }
            alt="profilepicture"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </Link>
    </li>
  );
};

export default Online;
