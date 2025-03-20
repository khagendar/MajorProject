const express = require("express");
const Notification = require("../Model/NotificationSchema");
const User = require("../Model/loginschema");
const Connection =require("../Model/ConnectionSchema");


class MessageController {
  // Create a new message and update conversation's updatedAt field
  
  async SendRequest(req, res) {
    try {
      const { sender, receiver, senderName } = req.body;
  
      const existingRequest = await Connection.findOne({ sender, receiver });
  
      // ✅ If a request exists and is still pending or accepted, prevent sending a new one
      if (existingRequest && existingRequest.status !== "rejected") {
        return res.status(400).json({ message: "Request already sent or accepted" });
      }
  
      // ✅ If rejected, allow sending a new request by deleting the old one
      if (existingRequest && existingRequest.status === "rejected") {
        await Connection.deleteOne({ _id: existingRequest._id });
      }
  
      // ✅ Create a new request
      const newRequest = new Connection({ sender, receiver, status: "pending" });
      await newRequest.save();
  
      // ✅ Create a notification
      const notification = new Notification({
        sender,
        receiver,
        senderName,
        message: "sent you a connection request",
      });
      await notification.save();
  
      res.status(201).json(newRequest);
    } catch (error) {
      console.error("Connection message:", error.message);
      res.status(500).json({ message: error.message });
    }
  }
  
  
  // Get connection requests by status
   async Requests (req, res) {
    try {
      const { userId, status } = req.params;
  
      // Validate status input
      const validStatuses = ["pending", "accepted", "rejected"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status provided" });
      }
  
      // Fetch requests where user is the sender
      const sentRequests = await Connection.find({ sender: userId, status }).populate("receiver", "name");
  
      // Fetch requests where user is the receiver
      const receivedRequests = await Connection.find({ receiver: userId, status }).populate("sender", "name");
  
      res.json({ sentRequests, receivedRequests });
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // Accept connection request
 async Accept (req, res) {
    try {
      const request = await Connection.findByIdAndUpdate(req.params.id, { status: "accepted" }, { new: true });
      if (!request) return res.status(404).json({ message: "Request not found" });
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Reject connection request
   async Reject (req, res) {
    try {
      const request = await Connection.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
      if (!request) return res.status(404).json({ message: "Request not found" });
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async RemoveConnetion(req, res)  {
    try {
      const { sender, receiver } = req.body;
     console.log(req.body);
      if (!sender || !receiver) {
        return res.status(400).json({ message: "Sender and receiver IDs are required" });
      }
  
      const connection = await Connection.findOne({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
        status: { $in: ["pending", "accepted"] }
      });
  
      if (!connection) {
        return res.status(404).json({ message: "No pending connection found" });
      }
    // console.log(connection);
      await Connection.deleteOne({ _id: connection._id });
  
      res.status(200).json({ message: "Pending connection removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

}  

module.exports = new MessageController();

// Send connection request
