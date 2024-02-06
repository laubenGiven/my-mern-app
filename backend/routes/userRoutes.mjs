
// /backend/routes/userRoutes.js
import express from 'express';

import { registerUser, getUser, getAllUsers, updateUser,uploadUserPhoto, deleteUser, checkEmail } from '../controllers/userController.mjs';


const router = express.Router();

// Create a new user
router.post('/register',uploadUserPhoto, registerUser);

// Retrieve all users
router.get('/showall', getAllUsers);

// Retrieve a single user by id
router.get('/show/:userId', getUser);

// Update a user by id
router.patch('/edit/:userId', updateUser);

// Delete a user by id
router.delete('/delete/:userId', deleteUser);
// Endpoint to check if the email already exists
router.get('/check-email/:email', checkEmail);

export default router;