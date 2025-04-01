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
import { styled } from "@mui/material/styles";

import useUserProfiles from "./UserProfiles";
import AadharSubmissions from "./AadharSubmission";
import axios from "axios";
import verified from "./Verified";
import rejected from "./Rejected";
import Logout from "./logout";
import { useNavigate } from "react-router-dom";

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

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)",
    color: "white",
    borderRight: "none",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
}));

const NavItem = styled(ListItem)(({ theme, selected }) => ({
  borderRadius: 8,
  margin: theme.spacing(1),
  transition: "all 0.3s ease",
  backgroundColor: selected ? "rgba(255,255,255,0.2)" : "transparent",
  '&:hover': {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  '& .MuiListItemText-primary': {
    fontWeight: selected ? 700 : 400,
  },
}));



const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState("verified");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const userProfiles = useUserProfiles();
  const AadharProfiles=AadharSubmissions();
  const verifiedProfiles=verified();
  const rejectedProfiles=rejected();
  const navigate=useNavigate();
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

  const handleLogout=()=>{
    // <Logout />
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/register');
  }

  return (
    <Box sx={{ 
      display: "flex", 
      height: "100vh", 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" 
    }}>
      {/* Sidebar */}
      <StyledDrawer variant="permanent">
        <Box sx={{ 
          p: 3, 
          textAlign: "center", 
          background: "rgba(0,0,0,0.1)" 
        }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
            Eternal Bond
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Admin Panel
          </Typography>
        </Box>
        <List>
          {[
            { key: "verified", label: "✅ Verified Profiles" },
            { key: "aadhar", label: "📄 Aadhar Submissions" },
            { key: "users", label: "👤 User Profiles" },
            { key: "rejected", label: "❌ Rejected Profiles" }
          ].map((category) => (
            <NavItem 
              key={category.key}
              selected={selectedCategory === category.key}
              onClick={() => handleCategoryChange(category.key)}
            >
              <ListItemText primary={category.label} />
            </NavItem>
          ))}
        </List>
        <Box sx={{ p: 2, mt: "auto" }}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            onClick={handleLogout}
            sx={{ 
              borderRadius: 2,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              '&:hover': {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 8px rgba(0,0,0,0.2)"
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </StyledDrawer>

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