import React, { useState, useEffect, useContext } from "react";
import { ExitToApp } from "@mui/icons-material";
import { Divider, Typography, Button } from "@mui/material";
import CloseFriend from "./CloseFriend";
import baseUrl from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    baseUrl
      .get("/users")
      .then((res) => {
        const filteredUsers = res.data.filter((u) => u._id !== user.user._id);
        setAllUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [user]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/login");
  };

  const sidebarStyle = {
    width: "250px",
    flexShrink: 0,
    backgroundColor: "whitesmoke",
    zIndex: 3,
    paddingTop: "10px",
    paddingBottom: "10px",
    position: "fixed",
    top: "84px",
    left: "0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  };

  const sidebarWrapperStyle = {
    padding: "0 10px",
  };

  const sidebarButtonStyle = {
    width: "100%",
    backgroundColor: "#1976D2",
    color: "#fff",
  };

  const sidebarHrStyle = {
    margin: "15px 0",
  };

  const findFriendsHeaderStyle = {
    marginBottom: "10px",
    color: "black",
  };

  const sidebarFriendListStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    height: "73vh",
    overflow: "scroll",
  };

  return (
    <div style={sidebarStyle}>
      <div style={sidebarWrapperStyle}>
        <Typography variant="h6" style={findFriendsHeaderStyle}>
          Find Friends
        </Typography>
        <ul style={sidebarFriendListStyle}>
          {allUsers.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
        <Divider style={sidebarHrStyle} />
        <Button
          variant="contained"
          onClick={handleLogOut}
          style={sidebarButtonStyle}
          startIcon={<ExitToApp />}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
