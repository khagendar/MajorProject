import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import useUserProfiles from "./UserProfiles";
import AadharSubmissions from "./AadharSubmission";
import axios from "axios";
import verified from "./Verified";
import rejected from "./Rejected";
// const verifiedProfiles = [
//   {
//     id: 1,
//     name: "Harshith Reddy",
//     profileImage: "https://via.placeholder.com/150",
//   },
// ];

// const AadharProfiles = [
//   {
//     id: 1,
//     name: "Harshith Reddy",
//     profileImage: "https://via.placeholder.com/150",
//     aadharPhoto: "https://via.placeholder.com/150",
//     aadharNumber: "1234-5678-9012",
//   },
// ];



const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState("verified");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const userProfiles = useUserProfiles();
  const AadharProfiles=AadharSubmissions();
  const verifiedProfiles=verified();
  const rejectedProfiles=rejected();
  const categories = {
    verified: verifiedProfiles,
    aadhar: AadharProfiles,
    users: userProfiles,
    rejected: rejectedProfiles,
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedProfile(null);
    setShowDetails(false);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowDetails(true);
  };

  const handleVerify = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/verify-profile/${id}`,{
        status: "verified", // Send "verified" status
      });
      alert(response.data.message);
      
      // Refresh UI after verification
      setSelectedProfile((prev) => ({ ...prev, status: "verified" }));
    } catch (error) {
      console.error("Error verifying Aadhar:", error);
      alert("Verification failed. Please try again.");
    }
  };
  const handleReject = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/verify-profile/${id}`, {
        status: "rejected", // Send "rejected" status
      });
      alert(response.data.message);
  
      // Refresh UI after rejection
      setSelectedProfile((prev) => ({ ...prev, status: "rejected" }));
    } catch (error) {
      console.error("Error rejecting Aadhaar:", error);
      alert("Rejection failed. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "#1976D2",
            color: "white",
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}>
          Admin Panel
        </Typography>
        <List>
          <ListItem button onClick={() => handleCategoryChange("verified")}>
            <ListItemText primary="✅ Verified Profiles" />
          </ListItem>
          <ListItem button onClick={() => handleCategoryChange("aadhar")}>
            <ListItemText primary="📄 Aadhar Submissions" />
          </ListItem>
          <ListItem button onClick={() => handleCategoryChange("users")}>
            <ListItemText primary="👤 User Profiles" />
          </ListItem>
          <ListItem button onClick={() => handleCategoryChange("rejected")}>
            <ListItemText primary="❌ Rejected Profiles" />
          </ListItem>
        </List>
        <Box sx={{ p: 1, pb: 2 }}>
          <Button variant="contained" color="warning" fullWidth>
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
      {showDetails && selectedCategory === "aadhar" && selectedProfile && (
        <Paper sx={{ p: 4, width: 500, mx: "auto", textAlign: "center", boxShadow: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {selectedProfile.name}
          </Typography>
          
          {/* Large Square Aadhar Photo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar
              src={selectedProfile.aadhaarPhoto}
              sx={{
                width: 300, // Increase width
                height: 300, // Ensure it's square
                borderRadius: 2, // Keep it square, not circular
                border: "2px solid #ccc",
              }}
            />
          </Box>

          <Typography variant="body1">
            <b>Aadhar Number:</b> {selectedProfile.aadhaarNumber}
          </Typography>

          <Button variant="contained" color="primary" sx={{ mt: 2 }}  onClick={() => handleVerify(selectedProfile._id)}>
            Verify
          </Button>
          <Button variant="contained" color="error" sx={{ mt: 2,ml:3 }} onClick={()=> handleReject(selectedProfile._id)}>
            Reject 
          </Button>
        </Paper>
      )}


{!showDetails ? (
  <Grid container spacing={2}>
    {categories[selectedCategory] && categories[selectedCategory].length > 0 ? (
      categories[selectedCategory].map((person) => (
        <Grid item xs={12} sm={6} md={4} key={person?.id}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
            onClick={() =>
              (selectedCategory === "users" || selectedCategory === "aadhar") &&
              handleProfileClick(person)
            }
          >
            <Avatar src={person?.image || person?.profileImage} sx={{ width: 80, height: 80, mb: 1, mx: "auto" }} />
            <Typography variant="h6">{person?.name}</Typography>

            {selectedCategory === "users" && (
              <>
                <Typography variant="body1"><b>Age:</b> {person?.age}</Typography>
                <Typography variant="body1"><b>Gender:</b> {person?.gender}</Typography>
              </>
            )}

            {selectedCategory === "verified" && (
              <Typography variant="body1" sx={{ color: "green", fontWeight: "bold" }}>
                Verified ✅
              </Typography>
            )}

            {selectedCategory === "aadhar" && (
              <>
                <Typography variant="body1">
                  <b>Aadhar Number:</b> {person.aadhaarNumber}
                </Typography>
                <Avatar src={person.aadhaarPhoto} sx={{ width: 200, height: 200, mt: 1, mx: "auto" }} />
              </>
            )}

            {selectedCategory === "rejected" && (
              <Typography variant="body1" sx={{ color: "red", fontWeight: "bold" }}>
                <b>Reason:</b> Aadhar number is Unmatched with Photo
              </Typography>
            )}
          </Paper>
        </Grid>
      ))
    ) : (
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>
          No Profiles Available
        </Typography>
      </Grid>
    )}
  </Grid>
) : (
          // Detailed User Profile View
          selectedCategory === "users" && selectedProfile && (
            <Paper sx={{ p: 4, width: 500, mx: "auto", textAlign: "center", boxShadow: 3 }}>
              <Avatar src={selectedProfile.image} sx={{ width: 150, height: 150, mb: 2, mx: "auto" }} />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{selectedProfile.name}</Typography>
              <Typography variant="body1"><b>DOB:</b> {selectedProfile.dob}</Typography>
              <Typography variant="body1"><b>Age:</b> {selectedProfile.age}</Typography>
              <Typography variant="body1"><b>Gender:</b> {selectedProfile.gender}</Typography>
              <Typography variant="body1"><b>Religion:</b> {selectedProfile.religion}</Typography>
              <Typography variant="body1"><b>Caste:</b> {selectedProfile.caste}</Typography>
              <Typography variant="body1"><b>Mother Tongue:</b> {selectedProfile.motherTongue}</Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Family Details</Typography>
              <Typography variant="body1"><b>Marital Status:</b> {selectedProfile.familyDetails.maritalStatus}</Typography>
              <Typography variant="body1"><b>Height:</b> {selectedProfile.familyDetails.height.feet} ft {selectedProfile.familyDetails.height.inches} in</Typography>
              <Typography variant="body1"><b>Family Type:</b> {selectedProfile.familyDetails.familyType}</Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Professional Details</Typography>
              <Typography variant="body1"><b>Occupation:</b> {selectedProfile.professionalDetails.occupation}</Typography>
              <Typography variant="body1"><b>Annual Income:</b> {selectedProfile.professionalDetails.annualIncome}</Typography>
              <Typography variant="body1"><b>Work Location:</b> {selectedProfile.professionalDetails.workLocation}</Typography>
            </Paper>
          )
        )}
      </Box>
    </Box>
  );
};

export default AdminPanel;
