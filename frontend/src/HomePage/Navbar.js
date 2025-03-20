import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../routes/AuthContex";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [selected, setSelected] = useState(() => localStorage.getItem("selectedIcon") || "");
  const [user, setUser] = useState({ name: "", avatar: "" });
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-form/${auth?.user?.id}`);
        setUser({
          name: response?.data?.data?.name,
          avatar: response?.data?.data?.image,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/${auth?.user?.id}/pending`);
        setNotifications(response.data.receivedRequests);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        let totalCount = 0;
        for (const notification of notifications) {
          const response = await axios.get(`http://localhost:5000/notification/notificationsCount/${notification.receiver}`);
          totalCount += response.data.count || 0;
        }
        setNotificationCount(totalCount);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    if (notifications.length > 0) {
      fetchNotificationCount();
    }
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("selectedIcon", selected);
  }, [selected]);

  const handleIconClick = (icon, path) => {
    setSelected(icon);
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#ff5722", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          EternalBond
        </Typography>

        <Box sx={{ display: "flex", gap: 2.5 }}>
          {[
            { icon: <HomeIcon />, name: "home", path: "/Home" },
            { icon: <GroupIcon />, name: "group", path: "/Matches" },
            { icon: <MessageIcon />, name: "chat", path: "/chat" },
            { icon: <SearchIcon />, name: "search", path: "/Search" },
            { icon: <FavoriteBorderIcon />, name: "favorite", path: "/Favorites" },
          ].map(({ icon, name, path }) => (
            <IconButton
              key={name}
              onClick={() => handleIconClick(name, path)}
              sx={{
                border: selected === name ? "2px solid black" : "none",
                borderRadius: "50%",
                backgroundColor: selected === name ? "rgba(0, 0, 0, 0.1)" : "transparent",
                width: "45px",
                height: "45px",
              }}
            >
              {React.cloneElement(icon, { sx: { color: "#fff", fontSize: "24px" } })}
            </IconButton>
          ))}

          <IconButton
            onClick={() => handleIconClick("notifications", "/Notification")}
            sx={{
              border: selected === "notifications" ? "2px solid black" : "none",
              borderRadius: "50%",
              backgroundColor: selected === "notifications" ? "rgba(0, 0, 0, 0.1)" : "transparent",
              width: "45px",
              height: "45px",
            }}
          >
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon sx={{ color: "#fff", fontSize: "24px" }} />
            </Badge>
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
            {user.name || "Loading..."}
          </Typography>
          <Avatar
            src={user.avatar}
            sx={{
              bgcolor: user.avatar ? "transparent" : "#ffcc80",
              cursor: "pointer",
              border: selected === "avatar" ? "2px solid black" : "none",
            }}
            onClick={() => handleIconClick("avatar", "/MyProfile")}
          >
            {!user.avatar ? user.name : null}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
