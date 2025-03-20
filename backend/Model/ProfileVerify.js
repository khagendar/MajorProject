const mongoose = require("mongoose");

const AadhaarVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // URL or Base64 string of the user's profile image
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{12}$/, // Ensures exactly 12 digits
  },
  aadhaarPhoto: {
    type: String, // Aadhaar card image as Base64 or URL
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AadhaarVerification = mongoose.model("AadhaarVerification", AadhaarVerificationSchema);
module.exports = AadhaarVerification;
