import express from 'express';
import { signupUser, loginUser, logoutUser, viewUserProfile, editUserProfile, forgotPassword } from '../controllers/authControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Endpoint for registering a user / signup
router.post('/signup', signupUser);

// Endpoint for authenticating in a user / login
router.post('/login', loginUser);

// Endpoint for logging out a user / logout
router.post('/logout', logoutUser);

// Endpoint for viewing and editing user profile
router.route('/profile').get(protect, viewUserProfile).put(protect, editUserProfile);

router.put('/forgotpass', forgotPassword);

export default router;