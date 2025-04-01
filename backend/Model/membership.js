const mongoose = require("mongoose");

const membership = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Ensures unique OTP per email
    createdAt: { type: Date, default: Date.now, expires: 2592000  }, // OTP expires in 10 minutes
});

module.exports = mongoose.model("Membership", membership);