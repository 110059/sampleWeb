const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  isActive: { type: Boolean, default: false },

   // Additional details in profile model
   profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" } // Reference to Profile

 
});

module.exports = mongoose.model("User", UserSchema);
