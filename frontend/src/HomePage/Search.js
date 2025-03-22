import React, { useState } from "react";
import axios from "axios";
import {
  Box, Button, TextField, Select, MenuItem, FormControl, Divider, Checkbox, ListItemText,
  InputLabel, RadioGroup, FormControlLabel, Radio, Typography
} from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import ProfileSearchMatches from './ProfileSearchMatches';

const SearchForm = () => {
  const [searchType, setSearchType] = useState("profile"); // "profiles" (default) or "profile"
  const [profileSuggestions, setProfileSuggestions] = useState([]);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    gender: "",
    ageMin: "",
    ageMax: "",
    religion: "",
    caste: "",
    subCaste: "",
    motherTongue: "",
    eatingHabits: "",
    familyDetails: {
      maritalStatus: "",
      height: {
        feet: "",
        inches: "",
      },
      familyStatus: "",
      familyType: "",
      familyValues: "",
      anyDisability: "",
    },
    professionalDetails: {
      highestEducation: "",
      employed: "",
      occupation: "",
      annualIncome: "",
      state: "",
    },
    profileId: "",
  });

  // Handle Input Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name]: value });

    if (name === "profileId") {
      setProfileSuggestions(
        ["P1234", "P5678", "P91011"].filter((id) => id.includes(value))
      );
    }
  };

  // Reset Form
  const handleReset = () => {
    setSearchParams({
      gender: "Bride",
      ageMin: "",
      ageMax: "",
      religion: "",
      caste: "",
      subCaste: "",
      motherTongue: "",
      eatingHabits: "",
      familyDetails: {
        maritalStatus: "",
        height: {
          feet: "",
          inches: "",
        },
        familyStatus: "",
        familyType: "",
        familyValues: "",
        anyDisability: "",
      },
      professionalDetails: {
        highestEducation: "",
        employed: "",
        occupation: "",
        annualIncome: "",
        state: "",
      },
      profileId: "",
    });
    setProfileSuggestions([]);
  };

  // Handle Search Request
  const handleSearch = async () => {
    try {
      if (searchType === "profile") {
        // Search by Profile ID
        const response = await axios.get(
          `http://localhost:5000/search/${searchParams.profileId}`
        );
        navigate(`/profile/${response?.data?.id}`);
      } else {
        // console.log(searchParams)
        // Filtered Profile Search
        const response = await axios.post("http://localhost:5000/searchmatches", {
          searchParams
        });
        console.log(response.data);
        setSearchResults(response.data);
        navigate("/Search/Matches", { state: { searchResults: response.data } });
      }
    } catch (error) {
      console.error("Error searching profiles:", error);
    }
  };

  const options = {
    gender: ["Groom", "Bride"],
    ageRange: ["18-22", "23-27", "28-32", "33-40"],
    height: ["5'0'' - 5'5''", "5'6'' - 6'0''", "6'1'' - 6'5''"],
    maritalStatus: [
      "Never Married",
      "Widowed",
      "Divorced",
      "Awaiting Divorce"
    ],
    motherTongue: [
      "Angika", "Arunachali", "Assamese", "Awadhi", "Bengali", "Bhojpuri", "Brij", "Bihari", "Badaga", "Chatisgarhi", "Dogri", "English", "French", "Garhwali", "Garo", "Gujarati", "Haryanvi", "Himachali/Pahari", "Hindi", "Kanauji", "Kannada", "Kashmiri", "Khandesi", "Khasi", "Konkani", "Koshali", "Kumaoni", "Kutchi", "Lepcha", "Ladacki", "Magahi", "Maithili", "Malayalam", "Manipuri", "Marathi", "Marwari", "Miji", "Mizo", "Monpa", "Nicobarese", "Nepali", "Oriya", "Punjabi", "Rajasthani", "Sanskrit", "Santhali", "Sindhi", "Sourashtra", "Tamil", "Telugu", "Tripuri", "Tulu", "Urdu", "Bagri Rajasthani", "Dhundhari/Jaipuri", "Gujari/Gojari", "Harauti", "Lambadi", "Malvi", "Mewari", "Mewati/Ahirwati", "Nimadi", "Shekhawati", "Wagdi"
    ],
    physicalStatus: ["None", "Physically challenged"],
    eatingHabits: ["Vegetarian", "Non Vegetarian"],
    religion: ["Hindu", "Muslim", "Christian", "Sikh", "Others"],
    familyStatus: ["Middle Class", "Upper Middle Class", "High Class", "Rich/Affluent"],
    familyType: ["Nuclear", "Joint", "Extended"],
    familyValues: ["Orthodox", "Traditional", "Moderate", "Liberal"],
    education: [
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
    occupation: ["Administration", "Agriculture", "Airline", "Architecture & design", "Banking & finance", "Beauty & fashion", "BPO & customer service", "Civil services", "Corporate professionals", "Defence", "Doctor", "Education & training", "Engineering", "Hospitality", "IT & software", "Legal", "Media & entertainment", "Medical & healthcare-others", "Merchant navy", "Others", "Police / law enforcement", "Scientist", "Senior management"],
    employed: ["Private", "Government/PSU", "Business", "Defence", "Self Employed", "Not Working"],
    annualIncome: ["Less than Rs.50 thousand", "Rs.50 thousand", "Rs.1 Lakh", "Rs.2 Lakhs", "Rs.3 Lakhs", "Rs.4 Lakhs", "Rs.5 Lakhs", "Rs.6 Lakhs", "Rs.7 Lakhs", "Rs.8 Lakhs", "Rs.9 Lakhs", "Rs.10 Lakhs", "Rs.12 Lakhs", "Rs.14 Lakhs", "Rs.16 Lakhs", "Rs.18 Lakhs", "Rs.20 Lakhs", "Rs.25 Lakhs", "Rs.30 Lakhs", "Rs.35 Lakhs", "Rs.40 Lakhs", "Rs.45 Lakhs", "Rs.50 Lakhs", "Rs.60 Lakhs", "Rs.70 Lakhs", "Rs.80 Lakhs", "Rs.90 Lakhs", "Rs.1 Crore", "Rs.1 Crore & Above"],
    location: [
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

  const handleSearchParamsChange = (field, subField = null) => (event) => {
    const { value } = event.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: subField 
        ? { ...prevParams[field], [subField]: value } 
        : value,
    }));
  };
  const handleHeightChange = (field) => (event) => {
    const { value } = event.target;
  
    setSearchParams((prevParams) => ({
      ...prevParams,
      familyDetails: {
        ...prevParams.familyDetails,
        height: {
          ...prevParams.familyDetails.height,
          [field]: value, // Update only 'feet' or 'inches'
        },
      },
    }));
  };
  

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3, maxWidth: 500, mx: "auto", marginTop: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
          Search Profiles
        </Typography>

        {/* Search Type Selection */}
        <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
          <Typography variant="body1">Search Type:</Typography>
          <RadioGroup row value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <FormControlLabel value="profile" control={<Radio />} label="Profile Search By ID" />
            <FormControlLabel value="profiles" control={<Radio />} label="Profiles Search" />
          </RadioGroup>
        </FormControl>

        {/* Profile Search (by ID) */}
        {searchType === "profile" ? (
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <TextField
              label="Profile ID"
              name="profileId"
              value={searchParams.profileId}
              onChange={handleChange}
            />
            {profileSuggestions.length > 0 && (
              <Box sx={{ bgcolor: "#f1f1f1", mt: 1, p: 1, borderRadius: 1 }}>
                {profileSuggestions.map((suggestion) => (
                  <Typography
                    key={suggestion}
                    sx={{ cursor: "pointer", "&:hover": { bgcolor: "#ddd" }, p: 1 }}
                    onClick={() => setSearchParams({ ...searchParams, profileId: suggestion })}
                  >
                    {suggestion}
                  </Typography>
                ))}
              </Box>
            )}
          </FormControl>
        ) : (
          <>
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Typography variant="body1">Looking for:</Typography>
              <RadioGroup row name="gender" value={searchParams.gender} onChange={handleChange}>
                <FormControlLabel value="Bride" control={<Radio />} label="Bride" />
                <FormControlLabel value="Groom" control={<Radio />} label="Groom" />
              </RadioGroup>
            </FormControl>

            {/* Age Range */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>

              <FormControl fullWidth>
                <InputLabel>Min Age</InputLabel>
                <Select name="ageMin" value={searchParams.ageMin} onChange={handleChange}>
                  {[...Array(41)].map((_, i) => (
                    <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Max Age</InputLabel>
                <Select name="ageMax" value={searchParams.ageMax} onChange={handleChange}>
                  {[...Array(41)].map((_, i) => (
                    <MenuItem key={i} value={i + 18}>{i + 18}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <Select
                  name="heightFeet"
                  value={searchParams.familyDetails.height.feet || ""}
                  onChange={handleHeightChange("feet")}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Feet</MenuItem>
                  {[...Array(8)].map((_, i) => (
                    <MenuItem key={i} value={i + 3}>{i + 3} ft</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <Select
                  name="heightInches"
                  value={searchParams.familyDetails.height.inches || ""}
                  onChange={handleHeightChange("inches")}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Inches</MenuItem>
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i} value={i}>{i} in</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>


            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.familyDetails.maritalStatus}
                onChange={handleSearchParamsChange("familyDetails", "maritalStatus")}
                renderValue={(selected) => selected === "" ? <em>Marital Status</em> : selected}
              >
                <MenuItem value="" disabled>Marital Status</MenuItem>
                {options.maritalStatus.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem> 
                ))}
              </Select>
            </FormControl>

            {/* Mother Tongue */}
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.motherTongue}
                onChange={handleSearchParamsChange("motherTongue")}
                renderValue={(selected) => selected === "" ? <em>Mother Tongue</em> : selected}
              >
                <MenuItem value="" disabled>Mother Tongue</MenuItem>
                {options.motherTongue.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Physical Status */}
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.familyDetails.anyDisability}
                onChange={handleSearchParamsChange("familyDetails","anyDisability")}
                renderValue={(selected) => selected === "" ? <em>Physical Status</em> : selected}
              >
                <MenuItem value="" disabled>Physical Status</MenuItem>
                {options.physicalStatus.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Eating Habits */}
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.eatingHabits}
                onChange={handleSearchParamsChange("eatingHabits")}
                renderValue={(selected) => selected === "" ? <em>Eating Habits</em> : selected}
              >
                <MenuItem value="" disabled>Eating Habits</MenuItem>
                {options.eatingHabits.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Religion Preference */}
            <Typography variant="h6">Religious Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.religion}
                onChange={handleSearchParamsChange("religion")}
                renderValue={(selected) => selected === "" ? <em>Religion</em> : selected}
              >
                <MenuItem value="" disabled>Religion</MenuItem>
                {options.religion.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Caste Input */}
            <TextField
              fullWidth
              label="Caste"
              name="caste"
              value={searchParams.caste}
              onChange={handleChange}  
              margin="normal"
            />

            <TextField
              fullWidth
              label="Subcaste"
              name="subCaste"
              value={searchParams.subCaste}
              onChange={handleChange}  
              margin="normal"
            />

            {/* Family Preference */}
            <Typography variant="h6">Family Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.familyDetails.familyStatus}
                onChange={handleSearchParamsChange("familyDetails", "familyStatus")}
                renderValue={(selected) => selected === "" ? <em>Family Status</em> : selected}
              >
                <MenuItem value="" disabled>Family Status</MenuItem>
                {options.familyStatus.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.familyDetails.familyType}
                onChange={handleSearchParamsChange("familyDetails", "familyType")}
                renderValue={(selected) => selected === "" ? <em>Family Type</em> : selected}
              >
                <MenuItem value="" disabled>Family Type</MenuItem>
                {options.familyType.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.familyDetails.familyValues}
                onChange={handleSearchParamsChange("familyDetails", "familyValues")}
                renderValue={(selected) => selected === "" ? <em>Family Values</em> : selected}
              >
                <MenuItem value="" disabled>Family Values</MenuItem>
                {options.familyValues.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Education Preference */}
            <Typography variant="h6">Education Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.professionalDetails.highestEducation}
                onChange={handleSearchParamsChange("professionalDetails", "highestEducation")}
                renderValue={(selected) => selected === "" ? <em>Education</em> : selected}
              >
                <MenuItem value="" disabled>Education</MenuItem>
                {options.education.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Employment Type */}
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.professionalDetails.employed}
                onChange={handleSearchParamsChange("professionalDetails", "employed")}
                renderValue={(selected) => selected === "" ? <em>Employed In</em> : selected}
              >
                <MenuItem value="" disabled>Employed In</MenuItem>
                {options.employed.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> 

            {/* Profession Selection */}
            <TextField
              fullWidth
              label="Occupation"
              name="occupation"
              value={searchParams.professionalDetails.occupation}
              onChange={handleSearchParamsChange("professionalDetails", "occupation")} 
              margin="normal"
            />

            {/* Annual Income */}
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.professionalDetails.annualIncome}
                onChange={handleSearchParamsChange("professionalDetails", "annualIncome")}
                renderValue={(selected) => selected === "" ? <em>Annual Income</em> : selected}
              >
                <MenuItem value="" disabled>Annual Income</MenuItem>
                {options.annualIncome.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Location Preference */}
            <Typography variant="h6">Location Preference</Typography>
            <Divider sx={{ borderBottomWidth: 2 }} />
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                displayEmpty
                value={searchParams.professionalDetails.state}
                onChange={handleSearchParamsChange("professionalDetails","state")}
                renderValue={(selected) => selected === "" ? <em>Location</em> : selected}
              >
                <MenuItem value="" disabled>Location</MenuItem>
                {options.location.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" sx={{ px: 4 }} onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchForm;
