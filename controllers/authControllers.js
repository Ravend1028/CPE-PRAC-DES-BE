import asyncHandler from "express-async-handler";
import User from "../models/authModel.js";

const signupUser = asyncHandler(async (req, res) => {
  const { name, age, email, phone, gender, username, password } = req.body; 
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    age,
    email,
    phone,
    gender,
    username,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      username: user.username
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // Algo:
  // Get user submitted data
  // Check if user exists
  // Get the hashed db password 
  // Compare pws -- current and hashed
  // if match then generate jwt in httponlycookie
});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout Route" });
});

const viewUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "View Route" });
});

const editUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update Route" });
});

export { signupUser, loginUser, logoutUser, viewUserProfile, editUserProfile };
