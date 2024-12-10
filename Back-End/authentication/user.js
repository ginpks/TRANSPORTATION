import { Sequelize, DataTypes } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';

// Solving db path issue
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new instance of Sequelize using sqlite as our database
// and storing it in authentication.sqlite
const sequelize = new Sequelize({
  dialect: SqliteDialect,
  // storage: 'authentication.sqlite',
  storage: path.resolve(__dirname, '../source/authentication.sqlite'), // Solving db path issue
});

// Defining the User model
const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  googleId: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "user" }, // Roles: 'user', 'admin'
});

// Create the table if it doesn't exist or update existing table to match model definition above
await sequelize.sync();

// Export the User model to make database accessible for other components of our app.
export default User;