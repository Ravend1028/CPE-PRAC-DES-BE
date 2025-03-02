import asyncHandler from "express-async-handler";

const signupUser = asyncHandler(async (req, res) => {
  console.log('Signup Route');
});

const loginUser = asyncHandler(async (req, res) => {
  console.log('Login Route');
});

const logoutUser = asyncHandler(async (req, res) => {
  console.log('Logout Route');
});

const viewUserProfile = asyncHandler(async (req, res) => {
  console.log('View Route');
});

const editUserProfile = asyncHandler(async (req, res) => {
  console.log('Update Route');
});

export { signupUser, loginUser, logoutUser, viewUserProfile, editUserProfile };
