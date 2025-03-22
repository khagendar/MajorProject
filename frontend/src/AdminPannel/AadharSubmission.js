import { useState, useEffect } from "react";
import axios from "axios";

const usePendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/verifications"); // Replace with actual API URL
        const filteredUsers = response.data.filter(user => user.status === "pending");
        setPendingUsers(filteredUsers);
        console.log(filteredUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  return pendingUsers; // Return the array of pending users
};

export default usePendingUsers;
