import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Stack, Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Navbar from "./Navbar";
import { useAuth } from "../routes/AuthContex";
import socket from "../socket";
const NotificationCard = ({ notification, onRead, onDelete }) => {
  return (
    <Card
      sx={{
        width: 600,
        p: 2,
        boxShadow: 3,
        mb: 2,
        bgcolor: notification.isRead ? "white" : "#f0f8ff",
        cursor: "pointer",
      }}
      onClick={() => onRead(notification._id)}
    >
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="body1">{notification.senderName} has sent you a request.</Typography>
          <IconButton color="error" onClick={(e) => { e.stopPropagation();  onDelete(notification?._id, notification?.sender?._id);; }}>
            <Delete />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

const NotificationList = () => {
  const auth = useAuth();
  const userId = auth?.user?.id;
  const [notifications, setNotifications] = useState([]);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/notificationUser/${userId}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications(); // Initial fetch
    }

    // Listen for real-time notifications
    socket.on("NotificationReceived", (receiverId) => {
      if (receiverId === userId) {
        fetchNotifications(); // Re-fetch notifications when a new one is received
      }
    });

    // Cleanup socket listener on unmount
    return () => {
      socket.off("NotificationReceived");
    };
  }, [userId]);

  const handleReadNotification = async (notificationId) => {
    try {
      await axios.put(`http://localhost:5000/${notificationId}/read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId, receiverId) => {
    console.log(receiverId);
    try {
      await axios.delete(`http://localhost:5000/notification/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n._id !== notificationId)
      );
      const response=await axios.delete("http://localhost:5000/connections/remove", {
        data: { 
          sender: auth?.user?.id, 
          receiver: receiverId,
        }})
        console.log(response.data);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    if (auth?.user?.id) {
      // Emit addUser event when the user connects
      socket.emit("addUser", auth.user.id);

      // Cleanup: Remove user when disconnecting
      return () => {
        socket.emit("removeUser", auth.user.id);
      };
    }
  }, [auth?.user?.id]);

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          mt: 5,
          p: 3,
          boxShadow: 3,
          bgcolor: "white",
          borderRadius: 2,
          width: 620,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notifications
        </Typography>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            onRead={handleReadNotification}
            onDelete={handleDeleteNotification}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NotificationList;
