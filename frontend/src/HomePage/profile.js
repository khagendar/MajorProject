import { React, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";
import socket from "../socket";

const ProfileCard = () => {
  const { userId } = useParams(); 
  const [useDetails, setUseDetails] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);
  const [ConnectedUsers, setConnectedUsers] = useState([]);
  const auth = useAuth();
  const [preference,setPreference]=useState({});
  const [matches,setMatch]=useState([]);
  console.log(userId)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-form/${userId}`);
        if (response.data) {
          setUseDetails(response.data);
        }
        else {
          console.error("Data is empty");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchscore = async () => {
      try {
          const cur = auth?.user?.id;
          const view = userId;
          console.log(cur,view)
  
          const response = await axios.get("http://localhost:5000/matchPreference", {
              params: { cur, view }
          });
          
          if (response.data) {
              console.log("Preferences:", response.data.preference);
              setPreference(response.data.preference)
              console.log("User Data:", response.data.userdt);
              console.log("Match Data:", response.data.matches);
              setMatch(response.data.matches)
          } else {
              console.error("Data is empty");
          }
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };

    const fetchConnectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/connections/${auth?.user?.id}`);
        console.log(response?.data?.connectedUsers);
        
        setConnectedUsers(response?.data?.connectedUsers || []);
      } catch (error) {
        console.error("Error fetching connection data:", error);
      }
    };

    const checkRequestStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/${auth?.user?.id}/pending`);
        console.log(response.data);

        const { sentRequests, receivedRequests } = response.data;

        const existingSentRequest = sentRequests.find(req => req.receiver._id === userId);
        const existingReceivedRequest = receivedRequests.find(req => req.sender._id === userId);

        if (existingSentRequest) {
          setRequestStatus("pending-sent");
        } else if (existingReceivedRequest) {
          setRequestStatus("pending-received");
        } else {
          setRequestStatus("none");
        }
      } catch (error) {
        console.error("Error checking request status:", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchscore();
      checkRequestStatus();
      fetchConnectionData();
    }
  }, [userId, auth?.user?.id]);

  const fetchConnectionData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/connections/${auth?.user?.id}`);
      console.log(response?.data);
      
      setConnectedUsers(response?.data?.connectedUsers || []);
    } catch (error) {
      console.error("Error fetching connection data:", error);
    }
  };
  const checkRequestStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/requests/${auth?.user?.id}/pending`);
      console.log(response.data);

      const { sentRequests, receivedRequests } = response.data;

      const existingSentRequest = sentRequests.find(req => req.receiver._id === userId);
      const existingReceivedRequest = receivedRequests.find(req => req.sender._id === userId);

      if (existingSentRequest) {
        setRequestStatus("pending-sent");
      } else if (existingReceivedRequest) {
        setRequestStatus("pending-received");
      } else {
        setRequestStatus("none");
      }
    } catch (error) {
      console.error("Error checking request status:", error);
    }
  };
  const handleSendInterest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/requestSend", {
        sender: auth?.user?.id, 
        receiver: userId,
        senderName: auth?.user?.name,
      });

      setRequestStatus("pending");
      
      socket.emit("sendRequest", { receiverId: userId });
      fetchConnectionData();
      checkRequestStatus();
      console.log("Request Sent Successfully:", response.data);
    } catch (error) {
      console.error("Error sending interest:", error.response?.data || error.message);
    }
  };

  const handleCancelRequest = async () => {
    try {
      if (!auth?.user?.id || !userId) {
        console.error("Missing sender or receiver ID");
        return;
      }
  
      await axios.delete("http://localhost:5000/connections/remove", {
        data: { 
          sender: auth.user.id, 
          receiver: userId 
        }
      });
  
      console.log(auth.user.id, userId);
      setRequestStatus("none");
      console.log("Request Canceled");
    } catch (error) {
      console.error("Error canceling request:", error.response?.data || error.message);
    }
  };
  



  

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
        <Card sx={{ display: "flex", p: 2, alignItems: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150, borderRadius: "50%" }}
            image={useDetails?.data?.image}
            alt="Profile"
          />
          <CardContent sx={{ flex: 1, ml: 2 }}>
            <Typography variant="h6">{useDetails?.data?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {useDetails?.data?.age} Yrs, {useDetails?.data?.familyDetails?.height?.feet}'
              {useDetails?.data?.familyDetails?.height?.inches}"
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {useDetails?.data?.caste}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {useDetails?.data?.professionalDetails.highestEducation},{" "}
              {useDetails?.data?.professionalDetails.occupation}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {useDetails?.data?.professionalDetails.workLocation},{" "}
              {useDetails?.data?.professionalDetails.state}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <IconButton color="primary">
                <CallIcon />
              </IconButton>
              <IconButton color="success">
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Interest Section */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
        {ConnectedUsers.some(user => user._id === userId) ? (
            <Typography variant="h6" color="green">
              You are Connected with this profile.
            </Typography>
          ) : requestStatus === "pending-sent" ? (
            <Button variant="outlined" color="secondary" onClick={handleCancelRequest}>
              Cancel Request
            </Button>
          ) : requestStatus === "pending-received" ? (
            <Button variant="contained" disabled>
              Request is Sent to You
            </Button>
          ) : requestStatus === "accepted" ? (
            <Button variant="contained" disabled>
              Connected
            </Button>
          ) : (
            <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleSendInterest}>
              Send Interest
            </Button>
          )}
        </Box>

        {/* Basic Details */}
        {/* Basic Details */}
        <Box sx={{ mt: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
          <Typography variant="h6">Her Basic Details</Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                <PersonIcon fontSize="small" /> Age:  {useDetails?.data?.age} Years
              </Typography>
              <Typography>
                <PersonIcon fontSize="small" /> Height: {useDetails?.data?.familyDetails?.height?.feet}'{useDetails?.data?.familyDetails?.height?.inches}" | Normal
              </Typography>
              <Typography>
                <PersonIcon fontSize="small" /> Language: {useDetails?.data?.motherTongue}  (Mother Tongue)
              </Typography>
              <Typography>
                <PersonIcon fontSize="small" /> Marital Status: {useDetails?.data?.familyDetails?.maritalStatus}
              </Typography>
              <Typography>
                <PersonIcon fontSize="small" /> Lives in:{useDetails?.data?.professionalDetails.workLocation} , {useDetails?.data?.professionalDetails.state}
              </Typography>
              <Typography>
                <PersonIcon fontSize="small" /> Citizenship: {useDetails?.data?.professionalDetails.country}
              </Typography>
            </Grid>
          </Grid>
        </Box>


        {
          matches?.length > 0 && (
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
               {} Basic Preferences
              </Typography>
              <Grid container spacing={2}>
                {matches.map((match, index) => (
                  <Grid
                    container
                    key={index}
                    sx={{
                      marginBottom: 1,
                      alignItems: "center",
                      borderBottom: "1px solid #ddd",
                      paddingBottom: 1,
                    }}
                  >
                    {/* Label */}
                    <Grid item xs={4}>
                      <Typography sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>
                        {match.label}
                      </Typography>
                    </Grid>
      
                    {/* Value (Wrapped for long text) */}
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {Array.isArray(match.value) ? match.value.join(", ") : match.value}
                      </Typography>
                    </Grid>
      
                    {/* Match Icon */}
                    <Grid item xs={2} sx={{ textAlign: "right" }}>
                      {match.match === "green" ? (
                        <CheckCircle sx={{ color: "green" }} />
                      ) : (
                        <Cancel sx={{ color: "red" }} />
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )
        }
      </Box>
    </Box>
  );
};

export default ProfileCard;
