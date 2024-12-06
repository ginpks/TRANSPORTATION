import express from 'express';
import session from "express-session";
import authRoutes from '../authentication/routes.js'; // Adjust the path as needed
import chatDatabase from '../chat/chatDB.js';
import postRoutes from '../posts/routes.js';
import { postDatabase } from '../posts/post.js';
import chatRoutes from '../chat/routes.js';
import cors from 'cors';

const app = express();

// serve Front-End files
app.use(express.static('Front-End'));

//Authentication System 
// Use authentication routes
app.use('/api/auth', authRoutes);

// Middleware setup
app.use(express.json());


app.use(cors());
// Set up post-related routes
app.use('/api/posts', postRoutes);
// app.use("/api/chat", chatRoutes);

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
