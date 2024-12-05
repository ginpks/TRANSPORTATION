import express from 'express';
import session from "express-session";
import authRoutes from '../Back-End/authentication/routes.js'; // Adjust the path as needed

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const app = express();
const postRoutes = require('../posts/routes');
const { sequelize } = require('../posts/post'); // Import sequelize instance

// Middleware setup
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Set up post-related routes
app.use('/api/posts', postRoutes);

// Sync database before starting the server
sequelize.sync({ force: false }) // Sync database
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start the server:', error);
  });
