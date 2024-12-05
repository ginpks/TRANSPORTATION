
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
