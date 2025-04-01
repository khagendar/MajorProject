import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import closeIcon from "../chatApplication/images/close.png";
import { useAuth } from "../routes/AuthContex";

// Chat Account Component
const ChatAccounts = ({ user, onClick }) => {
  const [userSearchData, setUserSearchData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.userId) return;
        const res = await axios.get(`http://localhost:5000/get-form/${user?.userId}`);
        setUserSearchData(res.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user?.userId]);

  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: "#fff",
        "&:hover": { backgroundColor: "lightgray" },
        cursor: "pointer",
        mb: 1,
        p: 1,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Avatar src={userSearchData?.image} />
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{user?.name || "User"}</Typography>
            {/* <Typography variant="caption">{user?.username}</Typography> */}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

ChatAccounts.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Fetch or create a new chat
const fetchOrCreateChat = async (senderId, receiverId, fetchConversations) => {
  try {
    const res = await axios.get("http://localhost:5000/conversation", {
      params: { senderId, receiverId },
    });

    fetchConversations();

    if (res.data) {
      await axios.put(`http://localhost:5000/UpdateConversationDate/${res.data._id}`);
      return res.data;
    }
  } catch (error) {
    if (error.response?.status === 404) {
      // Create a new conversation if none exists
      const newConversation = await axios.post("http://localhost:5000/conversation", {
        senderId,
        receiverId,
      });
      fetchConversations();
      return newConversation.data;
    } else {
      console.error("Error fetching or creating conversation:", error);
    }
  }
};

// Search and Chat Component
const SearchAndChat = ({ handleClose, onSelectChat, fetchConversations }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const auth = useAuth();
  const currentUserId = auth?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentUserId) return;
        const res = await axios.get(`http://localhost:5000/Search/${currentUserId}`);
        setResults(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };
    fetchData();
  }, [currentUserId]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value) {
      const filtered = results.filter((user) => user?.name?.toLowerCase().includes(value.toLowerCase()));
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  const handleChatClick = async (receiverId) => {
    if (!currentUserId) {
      console.error("Current user ID is missing.");
      return;
    }

    if (receiverId === currentUserId) {
      alert("Cannot start a conversation with yourself.");
      return;
    }

    try {
      const conversation = await fetchOrCreateChat(currentUserId, receiverId, fetchConversations);
      if (conversation) {
        onSelectChat(conversation);
        handleClose();
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 90,
        left: 280,
        height: "490px",
        width: "390px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">New Chat</Typography>
        <img
          src={closeIcon}
          alt="Close"
          width="20px"
          height="20px"
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </Box>

      {/* Search Input */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search Users..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          color: "black",
        }}
      />

      {/* Search Results */}
      {input && (
        <Box
          sx={{
            maxHeight: "350px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((user) => (
              <Box key={user?.userId} onClick={() => handleChatClick(user?.userId)}>
                <ChatAccounts user={user} />
              </Box>
            ))
          ) : (
            <Typography
              sx={{
                padding: "10px",
                textAlign: "center",
                color: "#888",
              }}
            >
              No user found
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

SearchAndChat.propTypes = {
  handleClose: PropTypes.func.isRequired,
  onSelectChat: PropTypes.func.isRequired,
  fetchConversations: PropTypes.func.isRequired,
};

export default SearchAndChat;
