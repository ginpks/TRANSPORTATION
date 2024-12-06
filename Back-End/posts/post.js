// import { Sequelize, DataTypes } from "sequelize";
const { Sequelize, DataTypes } = require('sequelize');

// Create a new instance of Sequelize using sqlite as our database
// and storing it in posts.sqlite
const postDatabase = new Sequelize({
    dialect: 'sqlite',
    storage: 'posts.sqlite',
});

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

module.exports = { postDatabase, Post };