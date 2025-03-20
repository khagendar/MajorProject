import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import Navbar from "./Navbar";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";
const ProfileVerification = () => {
  const auth=useAuth();
  const [userData, setUserData] = useState(null);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Simulating fetching userId (Replace with actual authentication context)
  // const userId = "1234567890abcdef"; // Replace with actual userId from authentication

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-form/${auth.user.id}`);
        // if (!response.ok) throw new Error("Failed to fetch user data");
       console.log(response.data);
     
        setUserData(response.data);
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchUserData();
  }, [auth.user.id]);

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaarNumber(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed!");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAadhaarPhoto(reader.result);
        setPreview(reader.result);
        setError("");
      };
    }
  };

  const handleRemovePhoto = () => {
    setAadhaarPhoto(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!userData) {
      setError("User data not loaded. Please refresh the page.");
      return;
    }

    if (aadhaarNumber.length !== 12) {
      setError("Aadhaar number must be 12 digits long.");
      return;
    }

    if (!aadhaarPhoto) {
      setError("Please upload an Aadhaar photo.");
      return;
    }

    setError("");
    setSubmitting(true);

    const formData = {
      userId: userData.data.userId,
      name: userData.data.name,
      profileImage: userData.data.image,
      aadhaarNumber,
      aadhaarPhoto, // Sending Base64 string
    };

    try {
      const response = await fetch("http://localhost:5000/verify-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setSubmitting(false);

      if (response.ok) {
        alert("Profile verification submitted successfully!");
        setAadhaarNumber("");
        setAadhaarPhoto(null);
        setPreview(null);
        setError("");
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (error) {
      setError("Error submitting verification. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          mt: 5,
          p: 3,
          bgcolor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Profile Verification
        </Typography>

        {/* Show Loading State */}
        {/* {loading && <CircularProgress sx={{ my: 3 }} />} */}

        {/* Show Error if User Data Fails */}
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        {/* Show User Info When Loaded */}
        {userData && (
          <>
          {userData.data.image && (
              <Box >
                <Typography variant="subtitle2">Profile Image:</Typography>
                <img
                  src={userData.data.image}
                  alt="Profile"
                  width={120}
                  height={120}
                  style={{ borderRadius: "50%", border: "1px solid #ddd" }}
                />
              </Box>
            )}
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Name:</strong> {userData.data.name}
            </Typography>
            {/* <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>User ID:</strong> {userData.data.userId}
            </Typography> */}
            

            {/* Aadhaar Number Input */}
            <TextField
              fullWidth
              label="Aadhaar Number"
              variant="outlined"
              value={aadhaarNumber}
              onChange={handleAadhaarChange}
              inputProps={{ maxLength: 12 }}
              sx={{ mb: 2 }}
            />

            {/* Aadhaar Photo Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="aadhaar-upload"
            />
            <label htmlFor="aadhaar-upload">
              <Button variant="contained" component="span">
                Upload Aadhaar Photo
              </Button>
            </label>

            {/* Image Preview */}
            {preview && (
              <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                <Typography variant="subtitle2">Preview:</Typography>
                <img src={preview} alt="Aadhaar Preview" width={200} style={{ borderRadius: 5 }} />
                <Button variant="outlined" color="error" onClick={handleRemovePhoto} sx={{ mt: 2 }}>
                  Remove Photo
                </Button>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProfileVerification;
