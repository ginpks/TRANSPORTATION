import {Sequelize, DataTypes} from '@sequelize/core';
import {SqliteDialect} from '@sequelize/sqlite3';

// Create a new instance of Sequelize using sqlite as our database
// and storing it in a authentication.sqlite
const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: 'authentication.sqlite',
});

// Defining the user model
const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING },
    googleId: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue:"user"},
});

// Create the table if ti doesn't exist or update existing table to match model definition above
await sequelize.sync();

// Export the User model to make the database accessible for other components of our app.
export default User;