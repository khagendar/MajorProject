import React, { useState } from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";

const ProfilePhotoUpload = ({ user, setUser }) => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user?.image || "");

  // Handle file selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedImage) return;
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
  
      try {
        const response = await axios.put(
          `http://localhost:5000/update-photo/${auth?.user?.id}`, // Make sure this is correct!
          { image: base64Image },
          { headers: { "Content-Type": "application/json" } }
        );
  
        if (response?.data?.success) {
          setUser((prevUser) => ({ ...prevUser, image: response?.data?.image }));
          setOpen(false);
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    };
  
    reader.readAsDataURL(selectedImage);
  };
  

  return (
    <Box textAlign="center">
      <Box display={"grid"} justifyContent={"center"}>
        <Avatar src={preview} sx={{ width: 80, height: 80, mt: 2, ml: 5.8 }} />
        <Button variant="contained" startIcon={<PhotoCamera />} sx={{ mt: 2 }} onClick={() => setOpen(true)}>
          Add/Edit Photo
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload Profile Photo</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar src={preview} sx={{ width: 120, height: 120, mb: 2 }} />
            <input type="file" accept="image/*" onChange={handleImageChange} hidden id="file-upload" />
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              <IconButton component="span" color="primary">
                <PhotoCamera fontSize="large" />
              </IconButton>
              <Typography variant="body2">Choose a photo</Typography>
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpload} color="primary" disabled={!selectedImage}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePhotoUpload;
