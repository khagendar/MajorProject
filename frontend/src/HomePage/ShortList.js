import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Pagination,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Navbar from "./Navbar";

const profiles = [
  { id: 1, name: "Aisha Sharma", age: 29, height: "5'7", gender: "Female", languages: "Hindi, English, Tamil", location: "Chennai", photo: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Pooja Verma", age: 27, height: "5'6", gender: "Female", languages: "Hindi, English, Kannada", location: "Hyderabad", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Neha Kapoor", age: 31, height: "6'2", gender: "Female", languages: "Hindi, French", location: "Paris", photo: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "Riya Singh", age: 24, height: "5'4", gender: "Female", languages: "Hindi, English, Spanish", location: "Barcelona", photo: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const profilesPerPage = 4;

const MatrimonialProfiles = () => {
  const [page, setPage] = useState(1);
  const [likedProfiles, setLikedProfiles] = useState({}); // Track liked status per profile

  const startIndex = (page - 1) * profilesPerPage;
  const selectedProfiles = profiles.slice(startIndex, startIndex + profilesPerPage);
  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  // Function to toggle like for a specific profile
  const toggleLike = (profileId) => {
    setLikedProfiles((prev) => ({
      ...prev,
      [profileId]: !prev[profileId],
    }));
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "white", maxHeight: "160vh", margin: 4, borderRadius: 5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}>
        <Grid container spacing={3} justifyContent="space-evenly" alignItems="stretch">
          {selectedProfiles.map((profile) => (
            <Grid item sm={4} lg={3} key={profile.id}>
              <Box sx={{ maxWidth: 200, minHeight: 200, boxShadow: 3, borderRadius: 2, textAlign: "center", position: "relative", bgcolor: "white", p: 2 }}>
                <Box component="img" src={profile.photo} alt={profile.name} sx={{ width: "80%", height: 150, borderRadius: 2 }} />
                
                {/* Like Button */}
                <IconButton 
                  onClick={() => toggleLike(profile.id)}
                  sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "white" }}
                >
                  {likedProfiles[profile.id] ? (
                     <FavoriteBorderIcon sx={{ color: "gray" }} />
                  ) : (
                  
                    <FavoriteIcon sx={{ color: "red" }} />
                  )}
                </IconButton>

                <Typography variant="subtitle2" color="textSecondary">
                  Matrimonial ID: {profile.id}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.age} yrs • {profile.height} inch
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.gender}: {profile.languages}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
                  <LocationOnIcon color="error" fontSize="small" />
                  <Typography variant="body2" color="textSecondary">
                    {profile.location}
                  </Typography>
                </Box>
                <Button variant="contained" sx={{ mt: 2, background: "linear-gradient(45deg, #FF4081, #FF9800)" }}>
                  View Profile
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default MatrimonialProfiles;
