import React, { useState } from "react";
import { Container, Typography, FormControl, InputLabel, MenuItem, Checkbox, ListItemText, Button, Box, Divider, TextField, Select } from "@mui/material";
import Navbar from "./Navbar";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";

const GroomBridePreferences = () => {
  const auth=useAuth();

  const [preferences, setPreferences] = useState({
    userId:auth?.user?.id,
    gender: auth?.user?.gender==="Male" ? "Bride":"Groom",
    ageRange: [],
    height: [],
    maritalStatus: [],
    motherTongue: [],
    physicalStatus: [],
    eatingHabits: [],
    religion: [],
    caste: "",
    subcaste: "",
    education: [],
    profession: [],
    employedIn: [],
    annualIncome: "",
    location: [],
  });
  const options = {
    gender: ["Groom", "Bride"],
    ageRange: ["18-22", "23-27", "28-32", "33-40"],
    height: ["Any","5'0'' - 5'5''", "5'6'' - 6'0''", "6'1'' - 6'5''"],
    maritalStatus: [
      "Any",
      "Never Married",
      "Widowed",
      "Divorced",
      "Awaiting Divorce"
    ],
    motherTongue: [
      "Any", "Angika", "Arunachali", "Assamese", "Awadhi", "Bengali", "Bhojpuri", "Brij", "Bihari", "Badaga", "Chatisgarhi", "Dogri", "English", "French", "Garhwali", "Garo", "Gujarati", "Haryanvi", "Himachali/Pahari", "Hindi", "Kanauji", "Kannada", "Kashmiri", "Khandesi", "Khasi", "Konkani", "Koshali", "Kumaoni", "Kutchi", "Lepcha", "Ladacki", "Magahi", "Maithili", "Malayalam", "Manipuri", "Marathi", "Marwari", "Miji", "Mizo", "Monpa", "Nicobarese", "Nepali", "Oriya", "Punjabi", "Rajasthani", "Sanskrit", "Santhali", "Sindhi", "Sourashtra", "Tamil", "Telugu", "Tripuri", "Tulu", "Urdu", "Bagri Rajasthani", "Dhundhari/Jaipuri", "Gujari/Gojari", "Harauti", "Lambadi", "Malvi", "Mewari", "Mewati/Ahirwati", "Nimadi", "Shekhawati", "Wagdi"
    ],
    physicalStatus: ["Any","Normal", "Physically challenged", "Doesn't matter"],
    eatingHabits: ["Any","Doesn't matter", "Vegetarian", "Non Vegetarian"],
    religion: ["Any","Hindu", "Muslim", "Christian", "Sikh", "Others"],
    education: [
      "Any",
      "Primary School (1st - 5th grade)",
      "Middle School (6th - 8th grade)",
      "High School (9th - 10th grade)",
      "Higher Secondary - Science (Physics, Chemistry, Mathematics, Biology)",
      "Higher Secondary - Commerce (Accountancy, Economics, Business Studies)",
      "Higher Secondary - Arts / Humanities (History, Political Science, Sociology)",
      "Higher Secondary - Vocational (Hotel Management, IT, Automobile)",
      "Diploma in Engineering (Polytechnic)",
      "Diploma in Nursing",
      "Diploma in Education (D.Ed.)",
      "Diploma in Hotel Management",
      "Diploma in Computer Applications (DCA)",
      "Diploma in Pharmacy (D.Pharm)",
      "ITI (Industrial Training Institute)",
      "Vocational Training Certificates",
      "Bachelor of Arts (BA)",
      "Bachelor of Social Work (BSW)",
      "Bachelor of Science (BSc)",
      "Bachelor of Computer Applications (BCA)",
      "Bachelor of Commerce (BCom)",
      "Bachelor of Business Administration (BBA)",
      "Bachelor of Engineering (BE)",
      "Bachelor of Technology (BTech)",
      "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
      "Bachelor of Dental Surgery (BDS)",
      "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
      "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
      "Bachelor of Pharmacy (B.Pharm)",
      "Bachelor of Laws (LLB)",
      "Bachelor of Fine Arts (BFA)",
      "Bachelor of Journalism & Mass Communication (BJMC)",
      "Master of Arts (MA)",
      "Master of Social Work (MSW)",
      "Master of Science (MSc)",
      "Master of Computer Applications (MCA)",
      "Master of Commerce (MCom)",
      "Master of Business Administration (MBA)",
      "Master of Engineering (ME)",
      "Master of Technology (MTech)",
      "Doctor of Medicine (MD)",
      "Master of Surgery (MS)",
      "Master of Pharmacy (MPharm)",
      "Master of Laws (LLM)",
      "Master of Fine Arts (MFA)",
      "Master of Journalism & Mass Communication (MJMC)",
      "Doctor of Philosophy (PhD)",
      "Doctor of Science (DSc)",
      "Doctor of Literature (DLitt)",
      "Doctor of Medicine (DM)",
      "Master of Chirurgiae (MCh)",
      "Doctor of Law (LLD)",
      "Chartered Accountant (CA)",
      "Company Secretary (CS)",
      "Cost and Management Accountant (CMA)",
      "Certified Financial Planner (CFP)"
    ],
    profession: ["Any", "Administration", "Agriculture", "Airline", "Architecture & design", "Banking & finance", "Beauty & fashion", "BPO & customer service", "Civil services", "Corporate professionals", "Defence", "Doctor", "Education & training", "Engineering", "Hospitality", "IT & software", "Legal", "Media & entertainment", "Medical & healthcare-others", "Merchant navy", "Others", "Police / law enforcement", "Scientist", "Senior management"],
    employedIn: ["Any", "Private", "Government/PSU", "Business", "Defence", "Self Employed", "Not Working"],
    annualIncome: ["Less than Rs.50 thousand", "Rs.50 thousand", "Rs.1 Lakh", "Rs.2 Lakhs", "Rs.3 Lakhs", "Rs.4 Lakhs", "Rs.5 Lakhs", "Rs.6 Lakhs", "Rs.7 Lakhs", "Rs.8 Lakhs", "Rs.9 Lakhs", "Rs.10 Lakhs", "Rs.12 Lakhs", "Rs.14 Lakhs", "Rs.16 Lakhs", "Rs.18 Lakhs", "Rs.20 Lakhs", "Rs.25 Lakhs", "Rs.30 Lakhs", "Rs.35 Lakhs", "Rs.40 Lakhs", "Rs.45 Lakhs", "Rs.50 Lakhs", "Rs.60 Lakhs", "Rs.70 Lakhs", "Rs.80 Lakhs", "Rs.90 Lakhs", "Rs.1 Crore", "Rs.1 Crore & Above"],
    location: [
      "Any",
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
      "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
      "Uttar Pradesh", "Uttarakhand", "West Bengal", 
      "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
      "Lakshadweep", "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
    ],
  };

  const handleDropdownChange = (category) => (event) => {
    const value = event.target.value;
    const allOptions = options[category];
    const anyOption = allOptions.find(opt => opt === "Any");
    const regularOptions = allOptions.filter(opt => opt !== "Any");
  
    // If "Any" is being selected
    if (value.includes("Any") && !preferences[category].includes("Any")) {
      setPreferences((prev) => ({
        ...prev,
        [category]: ["Any"],
      }));
    } 
    // If "Any" is being deselected
    else if (!value.includes("Any") && preferences[category].includes("Any")) {
      setPreferences((prev) => ({
        ...prev,
        [category]: [],
      }));
    }
    // If all regular options are selected
    else if (!value.includes("Any") && value.length === regularOptions.length) {
      setPreferences((prev) => ({
        ...prev,
        [category]: ["Any"],
      }));
    }
    // If a regular option is being selected while "Any" is already selected
    else if (value.length > 1 && value.includes("Any")) {
      // Keep only the selected regular options
      const selectedRegularOptions = value.filter(opt => opt !== "Any");
      setPreferences((prev) => ({
        ...prev,
        [category]: selectedRegularOptions,
      }));
    } 
    // Default case: just update with the selected values
    else {
      setPreferences((prev) => ({
        ...prev,
        [category]: value,
      }));
    }
  };
  

  const handleTextFieldChange = (category) => (event) => {
    const value = event.target.value;
    setPreferences((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(auth?.user)
    console.log("Preferences Submitted:", preferences);
    updatePreferences(preferences);
    // You can add API call here
  };

  const updatePreferences = async (preferences) => {
    try {
        console.log("Updating preferences:", preferences);

        const response = await axios.post("http://localhost:5000/setPreference", preferences);

        if (response.status === 200) {
            console.log("✅ Preferences updated successfully:", response.data);
        } else {
            console.error("⚠️ Error updating preferences:", response.data.message);
        }
    } catch (error) {
        console.error("❌ Request failed:", error.response?.data || error.message);
    }
};


  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", backgroundColor: "white" }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Box backgroundColor="white" p={2} borderRadius={2} boxShadow={2}>
          <Typography variant="h5" gutterBottom>
            Groom/Bride Preferences
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            {/* Gender Preference */}
            <Typography variant="h6">Basic Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                    name="gender"
                    value={preferences.gender}
                    onChange={handleDropdownChange("gender")}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select Gender</MenuItem>
                    {options.gender.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Age Range */}
             <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
              displayEmpty
                multiple
                value={preferences.ageRange}
                onChange={handleDropdownChange("ageRange")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Age Range</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Age Range</MenuItem>
                {options.ageRange.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.ageRange.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Height Preference */}
            <FormControl fullWidth sx={{ mb: 2 }}>
  <Select
    displayEmpty
    multiple
    value={preferences.height}
    onChange={handleDropdownChange("height")}
    renderValue={(selected) =>
      selected.length === 0 ? <em>Height</em> : selected.join(", ")
    }
  >
    {options.height.map((option) => (
      <MenuItem key={option} value={option}>
        <Checkbox checked={preferences.height.includes(option)} />
        <ListItemText primary={option} />
      </MenuItem>
    ))}
  </Select>
</FormControl>


            {/* Marital Status */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <InputLabel>Marital Status</InputLabel> */}
              <Select
                multiple
                displayEmpty
                value={preferences.maritalStatus}
                onChange={handleDropdownChange("maritalStatus")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Marital Status</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Marital Status</MenuItem>
                {options.maritalStatus.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.maritalStatus.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Mother Tongue */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <InputLabel>Mother Tongue</InputLabel> */}
              <Select
                multiple
                displayEmpty
                value={preferences.motherTongue}
                onChange={handleDropdownChange("motherTongue")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Mother Tongue</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Mother Tongue</MenuItem>
                {options.motherTongue.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.motherTongue.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Physical Status */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <InputLabel>Physical Status</InputLabel> */}
              <Select
                multiple
                displayEmpty
                value={preferences.physicalStatus}
                onChange={handleDropdownChange("physicalStatus")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Physical Status</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Physical Status</MenuItem>
                {options.physicalStatus.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.physicalStatus.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Eating Habits */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <InputLabel>Eating Habits</InputLabel> */}
              <Select
                multiple
                displayEmpty
                value={preferences.eatingHabits}
                onChange={handleDropdownChange("eatingHabits")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Eating Habits</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Eating Habits</MenuItem>
                {options.eatingHabits.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.eatingHabits.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Religion Preference */}
            <Typography variant="h6">Religious Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
             <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <InputLabel>Religion</InputLabel> */}
              <Select
                multiple
                displayEmpty
                value={preferences.religion}
                onChange={handleDropdownChange("religion")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Religion</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Religion</MenuItem>
                {options.religion.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.religion.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Caste Input */}
            <TextField
            sx={{mb: 1}}
              fullWidth
              label="Caste"
              name="caste"
              value={preferences.caste}
              onChange={handleTextFieldChange("caste")}
              margin="normal"
            />

            {/* Subcaste Input */}
            <TextField
              fullWidth
              sx={{mb: 1}}
              label="Subcaste"
              name="subcaste"
              value={preferences.subcaste}
              onChange={handleTextFieldChange("subcaste")}
              margin="normal"
            />

            {/* Education Preference */}
            <Typography variant="h6">Education Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
             <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <InputLabel>Education</InputLabel> */}
              <Select
                multiple
                displayEmpty
                value={preferences.education}
                onChange={handleDropdownChange("education")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Education</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Education</MenuItem>
                {options.education.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.education.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Employment Type */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                multiple
                displayEmpty
                value={preferences.employedIn || []}
                onChange={handleDropdownChange("employedIn")}
                renderValue={(selected) =>
                  selected.length === 0 ? <em>Employed In</em> : selected.join(", ")
                }
              >
                <MenuItem value="" disabled>Employed In</MenuItem>
                {options.employedIn.map((option) => ( // FIXED: Use options.employedIn
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.employedIn.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Profession Selection */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                multiple
                displayEmpty
                value={preferences.profession || []}
                onChange={handleDropdownChange("profession")}
                renderValue={(selected) =>
                  selected.length === 0 ? <em>Profession</em> : selected.join(", ")
                }
              >
                <MenuItem value="" disabled>Profession</MenuItem>
                {options.profession.map((option) => ( // FIXED: Use options.profession
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.profession.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            {/* Annual Income */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                displayEmpty
                value={preferences.annualIncome || []}
                onChange={handleDropdownChange("annualIncome")}
                renderValue={(selected) =>
                  selected.length === 0 ? <em>Annual Income</em> : selected
                }
              >
                <MenuItem value="" disabled>Annual Income</MenuItem>
                {options.annualIncome.map((option) => ( // FIXED: Use options.annualIncome
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.annualIncome.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Location Preference */}
            <Typography variant="h6">Location Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
             <FormControl fullWidth sx={{ mb: 2 }}>
              {/* <InputLabel>Location</InputLabel> */}
              <Select
                multiple
                displayEmpty
                value={preferences.location}
                onChange={handleDropdownChange("location")}
                renderValue={(selected) => 
                  selected.length === 0 ? <em>Location</em> : selected.join(", ")
              }
          >
              <MenuItem value="" disabled>Location</MenuItem>
                {options.location.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={preferences.location.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" type="submit">
              Submit Preferences
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GroomBridePreferences;
