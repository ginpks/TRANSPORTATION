import express from 'express';
import authRoutes from '../auth/routes.js'; // Adjust the path as needed

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

