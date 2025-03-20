import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";
import socket from "../socket";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("pending");
  const auth = useAuth();
  const [receiverId, setReceiverId] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    socket.on("NotificationReceived", (receiverId) => {
      setReceiverId(receiverId);
      console.log("New notification received for user:", receiverId);
    });

    return () => {
      socket.off("NotificationReceived");
    };
  }, []);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        if (!auth?.user?.id) return;

        let endpoint = `http://localhost:5000/requests/${auth?.user?.id}/${selectedMenu}`;
        if (selectedMenu === "Connected") {
          endpoint = `http://localhost:5000/connections/${auth?.user?.id}`;
        } else if (selectedMenu === "sent") {
          endpoint = `http://localhost:5000/requests/${auth?.user?.id}/pending`;
        }

        const response = await axios.get(endpoint);
        console.log(`Fetched ${selectedMenu}:`, response.data);

        setConnections(response.data.receivedRequests || response.data.connectedUsers || []);
        setSentRequests(response.data.sentRequests || []);
        setConnectedUsers(response.data.connectedUsers || []);
      } catch (error) {
        console.error(`Error fetching ${selectedMenu}:`, error);
      }
    };

    fetchConnections();
  }, [selectedMenu, auth?.user?.id]);

  // Accept request
  const handleAccept = async (id, sender) => {
    try {
      const response = await axios.put(`http://localhost:5000/accept/${id}`);
      if (response.status === 200) {
        setConnections((prev) => prev.filter((conn) => conn._id !== id));
        setSelectedMenu("accepted");
      }

      const res = await axios.post("http://localhost:5000/connected", {
        user1: auth?.user?.id,
        user2: sender?._id,
      });

      console.log(res.data);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Cancel sent request
  const handleCancelRequest = async (id,receiver) => {
    try {
      // console.log(auth.user.id,receiver);
      const response=await axios.delete("http://localhost:5000/connections/remove", {
        data: { 
          sender: auth?.user?.id, 
          receiver: receiver?._id,
        }
      });
      if (response.status === 200) {
        setSentRequests((prev) => prev.filter((req) => req._id !== id));
      }
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  // Reject request
  const handleReject = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/reject/${id}`);
      if (response.status === 200) {
        setConnections((prev) => prev.filter((conn) => conn._id !== id));
        setSelectedMenu("rejected");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // Remove connected user
  const handleRemoveConnection = async (sender,id,receiver) => {
    
    try {
      const response = await axios.delete(`http://localhost:5000/disconnect/${auth?.user?.id}/${sender}`);
      if (response.status === 200) {
        setConnectedUsers((prev) => prev.filter((user) => user._id !== id));
      }
      await axios.delete("http://localhost:5000/connections/remove", {
        data: { 
          sender: sender,
          receiver: auth?.user?.id, 
        }
      });
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  const renderContent = () => {
    if (selectedMenu === "sent") {
      return (
        <List>
          {sentRequests.length > 0 ? (
            sentRequests.map(({ _id, receiver }) => (
              <ListItem key={_id} divider>
                <ListItemText primary={receiver?.name} />
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => handleCancelRequest(_id,receiver)}
                    variant="contained"
                    color="error"
                  >
                    Cancel Request
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              No sent requests found
            </Typography>
          )}
        </List>
      );
    }

    if (selectedMenu === "Connected") {
      return (
        <List>
          {connectedUsers.length > 0 ? (
            connectedUsers.map(({ _id, name,sender,receiver }) => (
              <ListItem key={_id} divider>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => handleRemoveConnection(_id,sender,receiver)}
                    variant="contained"
                    color="error"
                  >
                    Remove
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              No connected users found
            </Typography>
          )}
        </List>
      );
    }

    return (
      <List>
        {connections.length > 0 ? (
          connections.map(({ _id, sender }) => (
            <ListItem key={_id} divider>
              <ListItemText primary={sender?.name} />
              {selectedMenu === "pending" && (
                <ListItemSecondaryAction>
                  <Button
                    onClick={() => handleAccept(_id, sender)}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Accept
                  </Button>
                  <Button onClick={() => handleReject(_id)} variant="contained" color="error">
                    Reject
                  </Button>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            No {selectedMenu} requests found
          </Typography>
        )}
      </List>
    );
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: "row", minHeight: "90vh" }}>
        {/* Sidebar (30%) */}
        <Box sx={{ flex: 2, bgcolor: "#ffffff", borderRight: "1px solid #ddd", p: 2 }}>
          <Typography fontSize={23} marginLeft={3} marginBottom={2}>
            Connections
          </Typography>
          <List>
            {["pending", "accepted", "rejected", "Connected", "sent"].map((menu) => (
              <ListItem
                key={menu}
                button
                onClick={() => setSelectedMenu(menu)}
                sx={{
                  cursor: "pointer",
                  bgcolor: selectedMenu === menu ? "#d1e0ff" : "transparent",
                  borderRadius: "5px",
                  margin: "5px 10px",
                }}
              >
                <ListItemText primary={menu.charAt(0).toUpperCase() + menu.slice(1)} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content (70%) */}
        <Box sx={{ flex: 8, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)} Requests
          </Typography>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Connections;
