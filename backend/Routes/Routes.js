const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require ('jsonwebtoken');
const UserModel = require('../models/UserModels');
const ArtModels = require('../models/ArtModels');
require('dotenv').config();

const secretkey=process.env.JWT_SECRET_KEY;

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate user input and handle errors
    if (!firstname ||!lastname || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email or contact is already taken
    const existingUser = await UserModel.findOne({email:email});

    if (existingUser) {
      return res.status(400).json({ message: 'Email or Contact is already in use' });
      
    }

    // Create a new user document with the hashed password
    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
    console.log("User Registered succefully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
  
});

// Middleware to verify and refresh tokens
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  jwt.verify(token, secretkey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    req.userId = user.id;
    next();
  });
};

// Get user information
router.get('/users', verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId, '-password');
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: 'User not found. Please sign up.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

   
const token = jwt.sign({ id: existingUser._id }, secretkey, {
  expiresIn: '1h',
});


    console.log("Generate token", token)

    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true for HTTPS environments
      maxAge: 60 * 60 * 1000, // Token expiration time in milliseconds
      sameSite: 'lax',
    });

    res.status(200).json({ message: 'Successfully Logged In', user: existingUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Define a route to save an item
router.post('/art', async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    // Create a new item using the Mongoose model
    const newArt = new ArtModels({ name, description, imageUrl });

    // Save the item to the database
    const savedArt = await newArt.save();

    res.status(201).json(savedArt);
  } catch (error) {
    console.error('Error saving Art:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Define a route to get all items
router.get('/getarts', async (req, res) => {
  try {
    const arts = await ArtModels.find();
    res.status(200).json(arts);
  } catch (error) {
    console.error('Error retrieving Art items:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});


// // Report Form
// router.post('/add', async (req, res) => {
//   try {
//     const data = req.body;
//     const newReport = new ReportModel(data);
//     await newReport.save();
//     res.status(200).json({ message: 'Report added successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error adding report' });
//   }
// });

// // Get Report Form Data
// router.get('/allreports', async (req, res) => {
//   try {
//     const reports = await ReportModel.find({});
//     res.status(200).json(reports);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching reports' });
//   }
// });

module.exports = router;
