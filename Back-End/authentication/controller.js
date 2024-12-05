
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../Back-End/authentication/user.js";


// Handle user registration
export const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const newUser = await User.create({ username, email, password: hashedPassword });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Handle user login
  export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Handle user logout 
const factoryResponse = (status, message) => ({ status, message });

export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            res.json(factoryResponse(500, "Logout failed"));
            return;
        }
        res.json(factoryResponse(200, "Logout successful"));
    });
};


