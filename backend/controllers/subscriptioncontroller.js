const Membership = require('../Model/membership'); // Assuming Membership schema is located in `models/Membership`

class SubscriptionController {
  // Method to subscribe or update user membership
  async subscribeUser(req, res) {
    try {
      const { userId } = req.body;

      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Check if membership already exists for the given userId
      let membership = await Membership.findOne({ userId });

      if (membership) {
        // If membership already exists, update it (e.g., reset the createdAt to extend the expiration)
        membership.createdAt = Date.now(); // Optionally, reset the expiration date
        await membership.save();
        return res.status(200).json({ message: "Membership updated successfully", membership });
      }

      // If no membership found, create a new one
      membership = new Membership({
        userId,
      });

      await membership.save(); // Save the new membership

      res.status(201).json({ message: "User subscribed successfully", membership });
    } catch (error) {
      console.error("Error in subscribing user:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async getsubscriber(req,res){ 
    try {
      const { userId } = req.body;

      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Check if membership already exists for the given userId
      let membership = await Membership.findOne({ userId });

      if (!membership) {
        return res.status(200).json({ message: "Not a member"});
      }

      res.status(201).json({ message: "premium member", membership });
    } catch (error) {
      console.error("Error in subscribing user:", error);
      res.status(500).json({ message: "Server error" });
    }

  }
}

module.exports = new SubscriptionController(); // Export a single instance of the class