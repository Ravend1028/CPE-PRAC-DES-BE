import asyncHandler from "express-async-handler";
import User from "../models/authModel.js";
import generateToken from "../utils/generateToken.js";

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
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    
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
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: 'User Logged Out' });
});

const viewUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: res.user.id,
    name: res.user.name,
    age: res.user.age,
    email: res.user.email,
    phone: res.user.phone,
    gender: res.user.gender,
    username: res.user.username
  };

  // Add vital signs readings here

  res.status(200).json({ user });
});

const editUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update Route" });
});

export { signupUser, loginUser, logoutUser, viewUserProfile, editUserProfile };
