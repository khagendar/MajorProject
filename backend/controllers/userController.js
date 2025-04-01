const UserModel = require("../Model/loginschema"); // Ensure the path to your model is correct
const ConnectedModel = require("../Model/ConnectedSchema"); 
const Person = require("../Model/Form");
class UserController {
  // Get User by ID
  async getUserById(req, res) {
    const { id } = req.params; // Extract 'id' from URL params
    try {
      // Find the user by ID
      const user = await UserModel.findById(id); // Use findById for ObjectId
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  }
  // Assuming you have an Express app and a UserModel for MongoDB
  async getAllUsers (req, res) {
  try {
    const { currentUserId } = req.params; // Get current user ID from request params

    if (!currentUserId) {
      return res.status(400).json({ message: "Current user ID is required" });
    }

    // Find all connections where the current user is either user1 or user2
    const connections = await ConnectedModel.find({
      $or: [{ user1: currentUserId }, { user2: currentUserId }],
    });

    if (!connections || connections.length === 0) {
      return res.status(404).json({ message: "No connected users found" });
    }

    // Extract the connected user IDs (excluding the current user)
    const connectedUserIds = connections.map((connection) =>
      connection.user1.toString() === currentUserId
        ? connection.user2.toString()
        : connection.user1.toString()
    );

    // Fetch full profile details of connected users
    const connectedUsersProfiles = await Person.find({
      userId: { $in: connectedUserIds },
    });

    res.status(200).json(connectedUsersProfiles);
  } catch (error) {
    console.error("Error retrieving connected users' profiles:", error);
    res.status(500).json({ message: "Error retrieving connected users", error });
  }
}
  
  
 async Location (req, res){
  const { id } = req.params;
  const { longitude, latitude } = req.body;

  if (!longitude || !latitude) {
      return res.status(400).json({ error: "Longitude and latitude are required." });
  }

  try {
      // Find user by ID and update location
      const user = await UserModel.findByIdAndUpdate(
          id,
          { location: { longitude, latitude } },
          { new: true, runValidators: true }
      );

      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json({ message: "Location updated successfully.", user });
  } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({ error: "Internal server error." });
  }
};

}

module.exports = new UserController();
