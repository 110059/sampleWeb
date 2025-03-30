require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging


const createSuperUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existingSuperUser = await User.findOne({ role: "superadmin" });

  if (!existingSuperUser) {
    const hashedPassword = await bcrypt.hash("VedTry@123", 12);

    const superUser = new User({
      name: "Super Admin",
      username: "superadmin",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
      isActive: true
    });

    await superUser.save();
    console.log("Superuser created successfully!");
  } else {
    console.log("Superuser already exists.");
  }

  mongoose.connection.close();
};

createSuperUser();