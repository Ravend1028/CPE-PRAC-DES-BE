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
      vitalStatistics: {
        height: user.vitalStatistics.height,
        weight: user.vitalStatistics.weight,
        bodyTemperature: user.vitalStatistics.bodyTemperature,
        pulseRate: user.vitalStatistics.pulseRate,
        bloodPressure: user.vitalStatistics.bloodPressure,
        respiratoryRate: user.vitalStatistics.respiratoryRate,
        bloodOxygenLevel: user.vitalStatistics.bloodOxygenLevel,
        BMI: user.vitalStatistics.BMI,
        waist: user.vitalStatistics.waist,
        hips: user.vitalStatistics.hips,
        vice: user.vitalStatistics.smokerOrNo
      }
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: 'User Logged Out' });
});

// Unused Controller
const viewUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ 
    _id: req.user.id,
    name: req.user.name,
    age: req.user.age,
    email: req.user.email,
    phone: req.user.phone,
    gender: req.user.gender,
    username: req.user.username,
    vitalStatistics: {
      height: req.user.vitalStatistics.height,
      weight: req.user.vitalStatistics.weight,
      bodyTemperature: req.user.vitalStatistics.bodyTemperature,
      pulseRate: req.user.vitalStatistics.pulseRate,
      bloodPressure: req.user.vitalStatistics.bloodPressure,
      respiratoryRate: req.user.vitalStatistics.respiratoryRate,
      bloodOxygenLevel: req.user.vitalStatistics.bloodOxygenLevel,
      BMI: req.user.vitalStatistics.BMI,
      waist: user.vitalStatistics.waist,
      hips: user.vitalStatistics.hips,
      vice: user.vitalStatistics.smokerOrNo
    }
   });
});

const editUserProfile = asyncHandler(async (req, res) => {
  const { name, age, email, phone, gender } = req.body;
  const id = req.user._id;

  const user = await User.findById(id);

  if (user) {
    user.name = name || user.name;
    user.age = age || user.age;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;

    const updatedUser = await user.save();

    res.status(200).json({ 
      _id: updatedUser._id ,
      name: updatedUser.name,
      age: updatedUser.age,
      email: updatedUser.email,
      phone: updatedUser.phone,
      gender: updatedUser.gender,
      vitalStatistics: {
        height: updatedUser.vitalStatistics.height,
        weight: updatedUser.vitalStatistics.weight,
        bodyTemperature: updatedUser.vitalStatistics.bodyTemperature,
        pulseRate: updatedUser.vitalStatistics.pulseRate,
        bloodPressure: updatedUser.vitalStatistics.bloodPressure,
        respiratoryRate: updatedUser.vitalStatistics.respiratoryRate,
        bloodOxygenLevel: updatedUser.vitalStatistics.bloodOxygenLevel,
        BMI: updatedUser.vitalStatistics.BMI,
        waist: user.vitalStatistics.waist,
        hips: user.vitalStatistics.hips,
        vice: user.vitalStatistics.smokerOrNo
      }
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { username, password, retypePassword } = req.body;

  const user = await User.findOne({ username });

  if (password !== retypePassword) {
    res.status(401);
    throw new Error('Passwords do not match');
  }

  if (!user) {
    res.status(401);
    throw new Error('Username not exists');
  } else {
    user.password = password;
    const updatedUser = await user.save();

    res.status(200).json({ message: 'Password updated succesfully' });
  }
});

const updateVitals = asyncHandler(async (req, res) => {
  const { _id, vitalStatistics } = req.body;

  const user = await User.findById(_id);

  if (user) {
    user.vitalStatistics = vitalStatistics || user.vitalStatistics;
    await user.save();
    res.status(200).json({
      message: 'Vital sign readings have been saved succesfully'
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { signupUser, loginUser, logoutUser, viewUserProfile, editUserProfile, forgotPassword, updateVitals };
