import {React,useEffect} from "react";
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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";
import { useState } from "react";

import { io } from "socket.io-client";

import socket from "../socket";
const ProfileCard = () => {
  const { userId } = useParams(); 
  const [useDetails,setUseDetails]=useState('');
  const auth=useAuth();
  console.log(userId);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-form/${userId}`);
        console.log("API Response:", response); // Check the response
  
        if (response.data) {
          setUseDetails(response.data);
        } else {
          console.error("Data is empty");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    if (userId) {
      fetchUserData();
    } else {
      console.error("userId is undefined");
    }
  }, [userId]);

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
  

  const handleSendInterest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-interest", {
        senderId: auth?.user?.id, 
        receiverId: userId,
        senderName:auth?.user?.name
      });
      console.log(response);
      
    
  
      if (response.status === 201) {
        socket.emit("sendRequest", {
          receiverId: userId,
        });
      }
    } catch (error) {
      console.error("Error sending interest:", error);
    }
  };

  
  
  console.log(useDetails);
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
        {/* Profile Card */}
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
              {useDetails?.data?.age} Yrs, {useDetails?.data?.familyDetails?.height?.feet}'{useDetails?.data?.familyDetails?.height?.inches}"
            </Typography>
            <Typography variant="body2" color="textSecondary">
            {useDetails?.data?.caste}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            {useDetails?.data?.professionalDetails.highestEducation}, {useDetails?.data?.professionalDetails.occupation}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            {useDetails?.data?.professionalDetails.workLocation}, {useDetails?.data?.professionalDetails.state}
            </Typography>

            {/* Icons */}
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
          {/* <Button variant="outlined" color="secondary">
            Don't Show
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            endIcon={<SendIcon />}
            onClick={handleSendInterest}
          >
            Send Interest
          </Button>
        </Box>

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
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <PersonIcon fontSize="small" /> Marital Status: {useDetails?.data?.familyDetails?.martialStatus}
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

        {/* Shortlist and Favorites */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
            Like
          </Button>
          <Button variant="contained" color="primary">
            View Similar Profiles
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
