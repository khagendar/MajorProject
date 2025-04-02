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
  const [membership, setMembership] = useState("free");

  useEffect(() => {
    const fetchData = async () => {
      if (auth?.user?.id) {
        try {
          // Fetch user data and subscription status in one call
          const userResponse = await axios.get(`http://localhost:5000/user/${auth?.user?.id}`);
          console.log("User Data:", userResponse.data);
          setMembership(userResponse.data.membership);

          // Check subscription status
          const subResponse = await axios.post("http://localhost:5000/getsubscriber", { userId: auth?.user?.id });
          if (subResponse.status === 201) {
            setMembership("premium");
          } else {
            setMembership("free");
          }

          // Set up socket connection
          socket.emit("addUser", auth?.user?.id);
          socket.on("getUsers", (data) => {
            setOnline(data);
            console.log("Online Users:", data);
          });

        } catch (error) {
          console.error("Error fetching user data or subscription status:", error);
        }
      } else {
        console.log("No user found or user ID is undefined");
      }
    };

    fetchData();

    // Cleanup socket listeners
    return () => {
      socket.off("getUsers");
    };
  }, [auth?.user?.id]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1, position: "relative" }}>
        <Chatlist />
        <Chat online={online} />

        {membership === "free" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.81)",
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
