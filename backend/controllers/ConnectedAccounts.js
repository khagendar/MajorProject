
const express = require("express");
const Notification = require("../Model/NotificationSchema");
const User = require("../Model/loginschema");
const Connection =require("../Model/ConnectedSchema");


class MessageController {

// Create a connection when a request is accepted
async CreateConnection (req, res) {
    try {
      const { user1, user2 } = req.body;
  
      if (!user1 || !user2) {
        return res.status(400).json({ error: "User IDs are required" });
      }
  
      // Check if connection already exists
      const existingConnection = await Connection.findOne({
        $or: [
          { user1, user2 },
          { user1: user2, user2: user1 },
        ],
      });
  
      if (existingConnection) {
        return res.status(400).json({ message: "Users are already connected" });
      }
  
      // Create new connection
      const newConnection = new Connection({ user1, user2 });
      await newConnection.save();
  
      res.status(201).json({ message: "Users connected successfully", newConnection });
    } catch (error) {
      console.error("Error creating connection:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  // Fetch all connected users for a given user
   async Connected (req, res){
    try {
      const { userId } = req.params;
  
      const connections = await Connection.find({
        $or: [{ user1: userId }, { user2: userId }],
      }).populate("user1 user2", "name email");
  
      // Extract connected user details
      const connectedUsers = connections.map((conn) =>
        conn.user1._id.toString() === userId ? conn.user2 : conn.user1
      );
  
      res.status(200).json({ connectedUsers });
    } catch (error) {
      console.error("Error fetching connections:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async Disconnect(req, res)  {
    const { userId1, userId2 } = req.params;
  
    try {
      // Find and delete the connection where user1 and user2 are connected (either way)
      const connection = await Connection.findOneAndDelete({
        $or: [
          { user1: userId1, user2: userId2 },
          { user1: userId2, user2: userId1 },
        ],
      });
  
      if (!connection) {
        return res.status(404).json({ message: "Connection not found" });
      }
  
      res.status(200).json({ message: "Connection removed successfully" });
    } catch (error) {
      console.error("Error removing connection:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}  

module.exports = new MessageController();

// Send connection request