import express from 'express';
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
} from '../Controllers/userController.mjs';

const router = express.Router();

// Create a new user
router.post('/users', createUser);

// Retrieve all users
router.get('/users', getAllUsers);

// Retrieve a single user by id
router.get('/users/:userId', getUser);

// Update a user by id
router.patch('/users/:userId', updateUser);

// Delete a user by id
router.delete('/users/:userId', deleteUser);

export default router;