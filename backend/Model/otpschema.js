const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Ensures unique OTP per email
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 }, // OTP expires in 10 minutes
});

module.exports = mongoose.model("OTP", otpSchema);
