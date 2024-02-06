import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import upload from '../config/multerConfig.mjs'


// Middleware for photo upload
export const uploadUserPhoto = upload.single('photo');

// Create a new user
export const registerUser = async (req, res,) => {
  try {
    const { firstName, lastName, email,role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
      photo: req.file ? req.file.path : ''
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        photo: newUser.photo
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Retrieve a single user by id
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Retrieve all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a user by id (including photo and password)
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email,role, password } = req.body;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email','role', 'password', 'photo'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }
    if (req.file) user.photo = req.file.path;

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user by id

export const deleteUser = async (req, res) => {
  // The isAdmin middleware will ensure this function only runs if the user is an admin
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User successfully deleted', userId: req.params.userId });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};


// Check if the email already exists
 export const checkEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    const exists = !!user;

    res.json({ exists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



