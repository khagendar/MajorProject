const express = require("express");
const router = express.Router();
const AadhaarVerification = require("../Model/ProfileVerify");

class Profileverify {

    // Route to verify Aadhaar profile
    async VerifyProfile(req, res) {
      try {
        const { userId, name, profileImage, aadhaarNumber, aadhaarPhoto } = req.body;
  
        if (!userId || !name || !profileImage || !aadhaarNumber || !aadhaarPhoto) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        // Check if Aadhaar number already exists
        const existingRecord = await AadhaarVerification.findOne({ aadhaarNumber });
        if (existingRecord) {
          return res.status(400).json({ message: "Aadhaar number already submitted for verification" });
        }
  
        // Save to database
        const newVerification = new AadhaarVerification({
          userId,
          name,
          profileImage,
          aadhaarNumber,
          aadhaarPhoto,
        });
  
        await newVerification.save();
        res.status(201).json({ message: "Aadhaar verification submitted successfully", data: newVerification });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }

     // Route to get all verification requests (Admin usage)
      async Verification(req, res)  {
        try {
          const verifications = await AadhaarVerification.find();
          res.status(200).json(verifications);
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
        }
      }

      // Route to update verification status
      async verificationStatus(req, res) {
        try {
          const { status } = req.body; // Get status from request body
      
          // Validate status
          if (!["pending", "verified", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
          }
      
          // Update status in database
          const updatedVerification = await AadhaarVerification.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
          );
      
          if (!updatedVerification) {
            return res.status(404).json({ message: "Verification request not found" });
          }
      
          res.status(200).json({ message: `Aadhaar ${status} successfully!`, updatedVerification });
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
        }
      }
      
}

module.exports = new Profileverify();
