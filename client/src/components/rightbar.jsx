import gift from "../images/gift.png";
import supernatural from "../images/supernatural.jpeg";
import noavatar from "../images/noAvatar.png";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import baseUrl from "../axiosConfig";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  useMediaQuery,
} from "@mui/material";

const isUserFollowed = (userId) => {
  const followedUsers = JSON.parse(localStorage.getItem("user")) || {};
  return followedUsers.followings.includes(userId);
};

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const userIdToFollow = user?._id;

  useEffect(() => {
    setFollowed(isUserFollowed(userIdToFollow));
  }, [userIdToFollow]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user !== undefined) {
          const friendList = await baseUrl.get(`/user/friends/${user?._id}`);
          setFriends(friendList.data);
        } else {
          const friendlist2 = await baseUrl.get(
            `/user/friends/${currentUser?._id}`
          );
          setFriends(friendlist2.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, currentUser]);

  const handleClick = async () => {
    try {
      if (followed) {
        await baseUrl.put(`/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        setFollowed(false);
        dispatch({ type: "UNFOLLOW", payload: user._id });

        const followedUsers = JSON.parse(localStorage.getItem("user")) || {};
        const updatedFollowedUsers = followedUsers.followings.filter(
          (id) => id !== userIdToFollow
        );
        localStorage.setItem("user", JSON.stringify(updatedFollowedUsers));
      } else {
        await baseUrl.put(`/user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        setFollowed(true);
        dispatch({ type: "FOLLOW", payload: user._id });

        const followedUsers = JSON.parse(localStorage.getItem("user")) || {};
        followedUsers.followings.push(userIdToFollow);
        localStorage.setItem("user", JSON.stringify(followedUsers));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    if (isSmallScreen) {
      return null;
    }

    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          p={2}
          borderBottom="1px solid #ccc"
        >
          <img
            src={gift}
            alt=""
            style={{ marginRight: "10px", width: "24px", height: "24px" }}
          />
          <Typography variant="body1">
            <strong>Sami </strong> and <strong>3 others</strong> started
            watching Supernatural.
          </Typography>
        </Box>
        <img
          src={supernatural}
          alt=""
          style={{ width: "100%", marginTop: "10px" }}
        />
        <Typography variant="h6" sx={{ mt: 2, marginLeft: 2 }}>
          Your Friends
        </Typography>
        <List>
          {friends?.map((f) => (
            <Link key={f._id} to={`/profile/${f.username}`}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={
                      f.profilePicture
                        ? `https://social-media-back-end-936o.onrender.com/imagesProfile/${f.profilePicture}`
                        : noavatar
                    }
                    alt=""
                  />
                </ListItemAvatar>
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {f.username}
                </Typography>
              </ListItem>
            </Link>
          ))}
        </List>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "In a relationship"
                : "compicated"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? `https://social-media-back-end-936o.onrender.com/imagesProfile/${friend.profilePicture}`
                      : noavatar
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
