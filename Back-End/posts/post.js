import { Sequelize, DataTypes } from "sequelize";
// const { Sequelize, DataTypes } = require('sequelize');

// Create a new instance of Sequelize using sqlite as our database
// and storing it in posts.sqlite
const postDatabase = new Sequelize({
    dialect: 'sqlite',
    storage: 'posts.sqlite',
});

// Defining the Post model
const Post = postDatabase.define('Post', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    luggage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    extraInfo: {
        type: DataTypes.STRING,
        defaultValue: 'No additional comment'
    }
});

// Create the table if it doesn't exist or update existing table to match model definition above
await postDatabase.sync();

// Export the User model to make database accessible for other components of our app.
// module.exports = { postDatabase, Post };
export { postDatabase, Post }; //ES Module