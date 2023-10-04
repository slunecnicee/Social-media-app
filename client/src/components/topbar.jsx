import React, { useContext, useEffect, useState } from "react";
import { Search, Person, Chat, Notifications, Menu } from "@mui/icons-material";
import noavatar from "../images/noAvatar.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import baseUrl from "../axiosConfig";
import Sidebar from "./sidebar";
import {
  AppBar,
  Toolbar,
  InputBase,
  Badge,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    baseUrl
      .get("/users")
      .then((res) => {
        const filteredUser = res.data.filter(
          (u) => u.username === user.username
        );
        setAllUsers(filteredUser);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [user]);

  useEffect(() => {
    baseUrl
      .get("/users")
      .then((res) => {
        const filteredSearch = res.data.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredSearch);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const topbarContainerStyle = {
    backgroundColor: "#1976D2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    position: "fixed",
    top: 0,
    zIndex: 3,
  };

  const humbStyle = {
    marginRight: "16px",
    cursor: "pointer",
  };

  const topbarLeftStyle = {
    flex: 1,
  };

  const logoStyle = {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textDecoration: "none",
    color: "#fff",
  };

  const topbarCenterStyle = {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  };

  const searchbarStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginLeft: "16px",
    width: isSmallScreen ? "200px" : "300px",
  };

  const searchIconStyle = {
    padding: "8px",
    pointerEvents: "none",
  };

  const searchInputStyle = {
    flex: 1,
    padding: "6px",
    color: "#fff",
  };

  const searchResultsStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    zIndex: 1,
    backgroundColor: "#fff",
    maxHeight: "200px",
    overflowY: "auto",
    borderRadius: "4px",
    display: searchResults.length > 0 ? "block" : "none",
  };

  const searchResultItemStyle = {
    padding: "8px 16px",
    borderBottom: "1px solid #ccc",
    textDecoration: "none",
    color: "#333",
    display: "flex",
    alignItems: "center",
  };

  const resultProfilePictureStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  };

  const topbarRightStyle = {
    display: "flex",
    alignItems: "center",
    marginLeft: "16px",
  };

  const topbarIconsStyle = {
    display: "flex",
  };

  const topbarIconItemStyle = {
    marginRight: "16px",
    position: "relative",
  };

  const topbarIconBadgeStyle = {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#f50057",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "0.8rem",
  };

  const topbarImgStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
  };

  return (
    <AppBar position="static" style={topbarContainerStyle}>
      <Toolbar>
        <IconButton style={humbStyle} onClick={() => setModalOpen(!modalOpen)}>
          <Menu />
        </IconButton>
        {modalOpen && <Sidebar setModalOpen={setModalOpen} />}
        <div style={topbarLeftStyle}>
          <Link to="/" style={logoStyle}>
            SLAY
          </Link>
        </div>
        <div style={topbarCenterStyle}>
          <Paper style={searchbarStyle}>
            <IconButton style={searchIconStyle}>
              <Search />
            </IconButton>
            <InputBase
              placeholder="Search..."
              style={searchInputStyle}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {searchQuery.length > 0 && (
              <Paper style={searchResultsStyle}>
                {searchResults.map((result) => (
                  <Link
                    to={`/profile/${result.username}`}
                    style={searchResultItemStyle}
                    key={result.id}
                  >
                    <img
                      src={
                        result.profilePicture
                          ? `https://social-media-back-end-936o.onrender.com/imagesProfile/${result.profilePicture}`
                          : noavatar
                      }
                      alt="profilepic"
                      style={resultProfilePictureStyle}
                    />
                    {result.username}
                  </Link>
                ))}
              </Paper>
            )}
          </Paper>
        </div>
        <div style={topbarRightStyle}>
          <div style={topbarIconsStyle}>
            {!isSmallScreen && (
              <>
                <div style={topbarIconItemStyle}>
                  <Person />
                  <Badge badgeContent={1} color="secondary">
                    <span style={topbarIconBadgeStyle}></span>
                  </Badge>
                </div>
                <div style={topbarIconItemStyle}>
                  <Chat />
                  <Badge badgeContent={2} color="secondary">
                    <span style={topbarIconBadgeStyle}></span>
                  </Badge>
                </div>
                <div style={topbarIconItemStyle}>
                  <Notifications />
                  <Badge badgeContent={1} color="secondary">
                    <span style={topbarIconBadgeStyle}></span>
                  </Badge>
                </div>
              </>
            )}
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                allUsers[0]?.profilePicture
                  ? `https://social-media-back-end-936o.onrender.com/imagesProfile/${allUsers[0]?.profilePicture}`
                  : noavatar
              }
              alt="profilepic"
              style={topbarImgStyle}
            />
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
