const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/loginschema");
const Person =require("../Model/Form");

const router = express.Router();

class ProfileDetailsController {
    async  PersonalBio(req, res) {
        try {
            const { userId } = req.params;
            const { bio } = req.body;
        
            if (!userId) {
              return res.status(400).json({ message: "User ID is required" });
            }
        
            const updatedUser = await Person.findOneAndUpdate(
              { userId },
              { bio },
              { new: true }
            );
        
            if (!updatedUser) {
              return res.status(404).json({ message: "User profile not found" });
            }
        
            res.status(200).json({ success: true, message: "Bio updated successfully", data: updatedUser });
          } catch (error) {
            console.error("Error updating bio:", error);
            res.status(500).json({ success: false, message: "Server error" });
          }
      }

      async BasicDetails(req, res) {
        try {
          const { userId } = req.params;
          const { familyDetails, motherTongue } = req.body;
        // console.log(familyDetails);
          if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
          }
      
          const updatedUser = await Person.findOneAndUpdate(
            { userId },
            {
              $set: {
                "familyDetails.height.feet": familyDetails?.height?.feet || 0,
                "familyDetails.height.inches": familyDetails?.height?.inches || 0,
                "familyDetails.maritalStatus": familyDetails?.maritalStatus || "Single",
                motherTongue: motherTongue || "",
              },
            },
            { new: true }
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User profile not found" });
          }
      
          res.status(200).json({ success: true, message: "User details updated successfully", data: updatedUser });
        } catch (error) {
          console.error("Error updating user data:", error);
          res.status(500).json({ success: false, message: "Server error" });
        }
    }

    async UpdatePhoto(req, res)  {
      try {
        const { userId } = req.params;
        const { image } = req.body; 
          //  console.log(image,userId);
        if (!image) {
          return res.status(400).json({ success: false, message: "No image provided" });
        }
    
        const updatedPerson = await Person.findOneAndUpdate(
          { userId },
          { image },
          { new: true }
        );
    
        if (!updatedPerson) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
    
        res.json({ success: true, image, message: "Photo uploaded successfully" });
      } catch (error) {
        console.error("Error uploading photo:", error);
        res.status(500).json({ success: false, message: "Error uploading photo" });
      }
    }

    async UpdateReligion(req, res)  {
      try {
        const { userId } = req.params;
        const { religion, caste, subCaste } = req.body;
    
        // Find the person by userId and update the fields
        const updatedPerson = await Person.findOneAndUpdate(
          { userId },
          { $set: { religion, caste, subCaste } },
          { new: true, runValidators: true }
        );
    
        if (!updatedPerson) {
          return res.status(404).json({ message: "Person not found" });
        }
    
        res.status(200).json({ message: "Religion details updated successfully", updatedPerson });
      } catch (error) {
        console.error("Error updating religion details:", error);
        res.status(500).json({ message: "Internal server error", error });
      }
    }

    async UpdateLocation(req, res){
      try {
        const { userId } = req.params;
        const { country, state, city,  } = req.body;
    
        const updatedPerson = await Person.findOneAndUpdate(
          { userId },
          {
            $set: {
              "professionalDetails.country": country,
              "professionalDetails.state": state,
              "professionalDetails.workLocation": city,
              
            },
          },
          { new: true, runValidators: true }
        );
    
        if (!updatedPerson) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({ message: "Groom location updated successfully", updatedPerson });
      } catch (error) {
        console.error("Error updating groom location:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

    async UpdateProfessional(req, res) {
      try {
        const { userId } = req.params;
        const { highestEducation, employed, occupation, annualIncome } = req.body;
    
        // Validate userId
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //   return res.status(400).json({ error: "Invalid user ID" });
        // }
    
        // Find and update the user's professional details
        const updatedPerson = await Person.findOneAndUpdate(
          { userId },
          {
            $set: {
              "professionalDetails.highestEducation": highestEducation,
              "professionalDetails.employed": employed,
              "professionalDetails.occupation": occupation,
              "professionalDetails.annualIncome": annualIncome,
             
            },
          },
          { new: true, runValidators: true }
        );
    
        if (!updatedPerson) {
          return res.status(404).json({ error: "User not found" });
        }
    
        res.json({ message: "Professional information updated successfully", professionalDetails: updatedPerson.professionalDetails });
      } catch (error) {
        console.error("Error updating professional information:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
}

module.exports = new ProfileDetailsController();
