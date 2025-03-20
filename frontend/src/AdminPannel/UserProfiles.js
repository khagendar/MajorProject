import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../routes/AuthContex";
const UserProfiles = () => {
    const auth=useAuth();
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/AllProfiles`);
        console.log(response.data);
        setUserProfiles(response.data);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  return userProfiles; // Return profiles as an array
};

export default UserProfiles;
