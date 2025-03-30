const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// Get all active users (Admin only)
router.get("", authMiddleware(["admin"]), async (req, res) => {
  try {
    const users = await User.find({ }, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user details (Admin only)
router.put("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");
    res.json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Soft delete user (Admin only)
router.patch("/:id/disable", authMiddleware(["admin"]), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    console.log('user found:', user);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: `User ${user.isActive ? "enabled" : "disabled"} successfully!` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/role", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent role change if the user is a superadmin
    if (user.role === "superadmin") {
      return res.status(403).json({ message: "superadmin role cannot be changed" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.get("/profile", authMiddleware(["user", "admin", "superadmin"]), async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.put("/profile", authMiddleware(["user", "admin", "superadmin"]), async (req, res) => {
//   try {

//     console.log('request--> ', req)
//     let { experienceData, companyData } = req.body;

//     const experience = experienceData.map(exp => ({
//       skills: exp.skills,
//       years: exp.years,
//       lastWorked: exp.lastWorked ? new Date(exp.lastWorked) : null
//     }));

//     const companyDetails = companyData.map(company => ({
//       companyName: company.companyName,
//       startDate: new Date(company.startDate),
//       endDate: company.endDate ? new Date(company.endDate) : null,
//       isPresent: company.isPresent
//     }));

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { experience, companyDetails },
//       { new: true, runValidators: true }
//     ).select("-password");

//     console.log('updatedUser', updatedUser)

//     if (!updatedUser) return res.status(404).json({ message: "User not found" });

//     res.json({ message: "Profile updated successfully!", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });



module.exports = router;