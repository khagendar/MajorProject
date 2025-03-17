const express = require("express");
const mongoose = require("mongoose");
const Person = require("../Model/Form");
const PreferenceModel = require("../Model/preference");

const router = express.Router();

class PreferenceController {
    constructor() {}

    async setPreference(req, res) {
        try {
            console.log("Request received:", req.body);
            let { userId, gender, ...preferences } = req.body;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid User ID format" });
            }

            // ✅ Convert `userId` to ObjectId
            const objectId = new mongoose.Types.ObjectId(userId);

            // ✅ Check if user exists in Person collection
            const userExists = await Person.findOne({ userId: objectId });
            if (!userExists) {
                return res.status(404).json({ message: "User not found in Person collection" });
            }

            // Ensure gender is an array (if needed)
            // Ensure gender is always an array
            if (Array.isArray(gender)) {
                gender = gender[0] || ""; // Take first value or set empty string
            }

            // Only update fields present in the request body
            const updatedPreference = await PreferenceModel.findOneAndUpdate(
                { userId: objectId },
                { $set: { gender, ...preferences } },
                { new: true, upsert: true }
            );

            return res.status(200).json({
                message: "Preferences updated successfully",
                preference: updatedPreference
            });

        } catch (error) {
            console.error("❌ Error updating preferences:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

// Initialize preference controller
const preferenceController = new PreferenceController();

module.exports = preferenceController;
