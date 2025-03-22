const express = require("express");
const mongoose = require("mongoose");
const User = require("../Model/loginschema");
const Person = require("../Model/Form"); // Ensure Profile is correctly imported
const router = express.Router();

class Search {
  async SearchById(req, res) {
    try {
      const { accId } = req.params;

      if (!accId) {
        return res.status(400).json({ error: "accId is required" });
      }

      const user = await User.findOne({ accId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        accId: user.accId,
      });
    } catch (error) {
      console.error("Error searching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async SearchProfiles(req, res) {
    try {
        console.log("Full request body:", req.body);

        let filters = {};
        const { searchParams } = req.body; // Extract searchParams

        console.log("searchParams:", searchParams);

        if (!searchParams) {
            return res.status(400).json({ message: "Missing searchParams in request body" });
        }

        // Extract age filters properly
        const { ageMin, ageMax } = searchParams;

        // ✅ Direct string matches
        if (searchParams.gender) filters.gender = searchParams.gender === "Bride" ? "Female" : "Male";
        if (searchParams.religion) filters.religion = searchParams.religion;
        if (searchParams.caste) filters.caste = searchParams.caste;
        if (searchParams.subCaste) filters.subCaste = searchParams.subCaste;
        if (searchParams.motherTongue) filters.motherTongue = searchParams.motherTongue;
        if (searchParams.eatingHabits) filters.eatingHabits = searchParams.eatingHabits;

        console.log("Filter 1:", filters);

        // ✅ Family details (Using optional chaining to avoid errors)
        if (searchParams.familyDetails?.maritalStatus) filters["familyDetails.maritalStatus"] = searchParams.familyDetails.maritalStatus;
        if (searchParams.familyDetails?.familyStatus) filters["familyDetails.familyStatus"] = searchParams.familyDetails.familyStatus;
        if (searchParams.familyDetails?.familyType) filters["familyDetails.familyType"] = searchParams.familyDetails.familyType;
        if (searchParams.familyDetails?.familyValues) filters["familyDetails.familyValues"] = searchParams.familyDetails.familyValues;
        if (searchParams.familyDetails?.anyDisability) filters["familyDetails.anyDisability"] = searchParams.familyDetails.anyDisability;

        // ✅ Height filtering (Using optional chaining)
        if (searchParams.familyDetails?.height?.feet) filters["familyDetails.height.feet"] = searchParams.familyDetails.height.feet;
        if (searchParams.familyDetails?.height?.inches) filters["familyDetails.height.inches"] = searchParams.familyDetails.height.inches;

        console.log("Filter 2:", filters);

        // ✅ Professional details (Using optional chaining)
        if (searchParams.professionalDetails?.highestEducation) filters["professionalDetails.highestEducation"] = searchParams.professionalDetails.highestEducation;
        if (searchParams.professionalDetails?.employed) filters["professionalDetails.employed"] = searchParams.professionalDetails.employed;
        if (searchParams.professionalDetails?.occupation) filters["professionalDetails.occupation"] = searchParams.professionalDetails.occupation;
        if (searchParams.professionalDetails?.annualIncome) filters["professionalDetails.annualIncome"] = searchParams.professionalDetails.annualIncome;
        if (searchParams.professionalDetails?.state) filters["professionalDetails.state"] = searchParams.professionalDetails.state;

        console.log("Filter 3:", filters);

        // ✅ Age Range Filter (Ensuring numeric conversion)
        if (ageMin || ageMax) {
            filters.age = {};
            if (ageMin) filters.age.$gte = parseInt(ageMin, 10); // Greater than or equal to ageMin
            if (ageMax) filters.age.$lte = parseInt(ageMax, 10); // Less than or equal to ageMax
        }

        console.log("Applied Filters:", filters);

        // ✅ Search database with filters
        const profiles = await Person.find(filters).select(
            "_id name age gender religion caste motherTongue professionalDetails familyDetails bio image userId"
        );

        console.log("Profiles Found:", profiles);
        res.json(profiles);
    } catch (error) {
        console.error("Error searching profiles:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
  
}

module.exports = new Search();
