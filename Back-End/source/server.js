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
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
console.log('Socket.IO initialized');

app.use(express.static(path.join(__dirname, "../../Front-End")));

console.log("Serving static files from:", path.join(__dirname, "../../Front-End"));


// serve Front-End files
// app.use(express.static('Front-End'));



// Middleware setup
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

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
app.use('/api/posts', postRoutes);
app.use("/api/chat", chatRoutes); //for testing stage, exclude isAuthenticated now

//Sync Databases and start server
Promise.all([
  postDatabase.sync({ force: false }),
  chatDatabase.sync({ force: false })
])
  .then(() => {
    console.log("All databases synced successfully!");
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync databases or start the server:", error);
    process.exit(1);
  });

// Socket.io connection
io.on('connection', (socket) => { 
  socket.on('joinSession', (sessionId) => { 
    socket.join(sessionId); 
    console.log(`User joined session: ${sessionId}`);
  }); 
  
  socket.on('sendMessage', (data) => { 
    const { sessionId, message, senderId } = data; 
    io.to(sessionId).emit('receiveMessage', { message, senderId });
  }); 
  
  socket.on('disconnect', () => { 
    console.log('user disconnected'); 
  }); 
});


  // Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong with the server!' });
  if(!req.session){
    return res.status(401).json({ error: "Session timed out or expired. Reload or Log in again."})
  }

  app.post('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});
});