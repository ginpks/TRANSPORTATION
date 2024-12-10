import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
import User from "../authentication/user.js";
import passport from 'passport';

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
      console.error('Registration Error:', error);
      if (error.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Internal Server Error' });
  }
  };
  

//login
export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json(factoryResponse(401, "Invalid credentials"));
        }
        req.login(user, (err) =>
            err ? next(err) : res.json(factoryResponse(200, "Login successful! Welcome!"))
        );
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

//logout
export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            res.json(factoryResponse(500, "Logout failed"));
            return;
        }
        res.json(factoryResponse(200, "Logout successful! See you."));
    });
};


