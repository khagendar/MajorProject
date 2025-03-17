const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  gender: { type: String, enum: ["Groom", "Bride"], default: null },
  ageRange: { type: [String], default: [] },
  height: { type: [String], default: [] },
  maritalStatus: { type: [String], default: [] },
  motherTongue: { type: [String], default: [] },
  physicalStatus: { type: [String], default: [] },
  eatingHabits: { type: [String], default: [] },
  religion: { type: [String], default: [] },
  caste: { type: String, default: null },
  subcaste: { type: String, default: null },
  education: { type: [String], default: [] },
  profession: { type: [String], default: [] },
  employedIn: { type: [String], default: [] },
  annualIncome: { type: [String], default: [] },
  location: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("preference", preferenceSchema);
