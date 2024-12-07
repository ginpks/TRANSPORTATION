//ES Module
import express from 'express';
import session from "express-session";
import authRoutes from '../authentication/routes.js'; // Adjust the path as needed
import chatDatabase from '../chat/chatDB.js';
import postRoutes from '../posts/routes.js';
import { postDatabase } from '../posts/post.js';
import chatRoutes from '../chat/routes.js';
import cors from 'cors';
import passport from 'passport';
import '../authentication/passport.js'; 
import {isAuthenticated} from '../authentication/authMiddleware.js'

const app = express();

// serve Front-End files
app.use(express.static('Front-End'));



// Middleware setup
app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initial Passport
app.use(passport.initialize());
app.use(passport.session());

//Authentication System 
// Use authentication routes
app.use('/api/auth', authRoutes);
// Set up post and chat related routes
app.use('/api/posts',isAuthenticated , postRoutes);
app.use("/api/chat", chatRoutes); //for testing stage, exclude isAuthenticated now

//Sync Databases and start server
Promise.all([
  postDatabase.sync({ force: false }),
  chatDatabase.sync({ force: false })
])
  .then(() => {
    console.log("All databases synced successfully!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync databases or start the server:", error);
    process.exit(1);
  });

  // Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong with the server!' });
  if(!req.session){
    return res.status(401).json({ error: "Session timed out or expired. Reload or Log in again."})
  }
});