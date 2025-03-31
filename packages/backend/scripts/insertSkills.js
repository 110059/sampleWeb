const mongoose = require("mongoose");
const fs = require("fs").promises; // Use promise-based fs
require("dotenv").config();

// Import models
const Skill = require("../models/Skill");
const User = require("../models/User");
const Category = require("../models/Category"); // Import Category model

// MongoDB Connection URI
const MONGO_URI = process.env.MONGO_URI;
console.log("MongoDB URI:", MONGO_URI); // Debugging

const createCategorySkills = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

  // Read and insert categories first
  const categoriesData = await fs.readFile(`${__dirname}/../data/skillsCategories.json` , "utf8");
  const categories = JSON.parse(categoriesData);

  // Check if categories already exist
  const existingCategories = await Category.countDocuments();
  if (existingCategories === 0) {
    await Category.insertMany(categories);
    console.log("Categories inserted successfully!");
  } else {
    console.log("Categories already exist. Skipping insertion.");
  }

    // Check if skills are already present in DB
    const skillCount = await Skill.countDocuments();
    if (skillCount > 0) {
      console.log("Skills already exist in the database. Skipping insertion.");
      return;
    }

    console.log("No skills found. Inserting skills...");

    // Read JSON File (Promisified)
    const filePath = `${__dirname}/../data/skillsData.json`; // Ensure correct path
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    let skillsArray = [];

    // Convert JSON structure into an array of skill objects
    jsonData.skills.forEach(categoryObj => {
      categoryObj.skills.forEach(skill => {
        skillsArray.push({
          category: categoryObj.category,
          name: skill.name,
          version: skill.version || "",
        });
      });
    });

    // Insert into MongoDB
    await Skill.insertMany(skillsArray);
    console.log("Skills inserted successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

// Run the function
createCategorySkills();
