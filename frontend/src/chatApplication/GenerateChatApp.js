import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Chatlist from "./chatList";
import Navbar from "../HomePage/Navbar";
import Chat from "./chat";
import socket from "../socket";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";

export default function GenerateChatApp() {
  const auth = useAuth();
  const [online, setOnline] = useState([]);
  const [membership, setMembership] = useState(null); // Store membership status

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth?.user?.id) {
        try {
          const res = await axios.get(`http://localhost:5000/user/${auth?.user?.id}`);
          console.log("User Data:", res.data);
          setMembership(res.data.membership); // Store membership status
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [auth?.user?.id]);

  useEffect(() => {
    if (auth?.user?.id) {
      console.log("User ID:", auth?.user?.id); // Debugging log
      socket.emit("addUser", auth?.user?.id);
      socket.on("getUsers", (data) => {
        setOnline(data);
        console.log("Online Users:", data);
      });
    } else {
      console.log("No user found or user ID is undefined"); // Debugging log
    }
  }, [auth?.user?.id]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1, position: "relative" }}>
        <Chatlist />
        <Chat online={online} />

        {/* Lock the chat if membership is 'free' */}
        {membership === "free" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.81)", // Medium dark overlay // Completely dark overlay
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <Typography variant="h5" color="white" fontWeight="bold" marginBottom={15}>
              🔒 Chat is locked. Upgrade to Premium to access!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
