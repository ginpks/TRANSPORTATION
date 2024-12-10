import { Sequelize, DataTypes } from "@sequelize/core";

// Solving db path issue
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatDatabase = new Sequelize({
    dialect: "sqlite", 
    // storage: "chat.sqlite", 
    storage: path.resolve(__dirname, '../source/chat.sqlite'), // Solving db path issue
    logging: console.log,
  });

  // Define the Session model
  const Session = chatDatabase.define("Session", {
    user1_id: { 
        type: DataTypes.STRING, 
        allowNull: false },

    user2_id: { 
        type: DataTypes.STRING, 
        allowNull: false },
        
    last_interaction: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  const ChatMessage = chatDatabase.define("ChatMessage", {
    session_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Session,
        key: "id",
      },
    },
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });


//test database connection
chatDatabase.authenticate().then(() => {
    console.log("Connection for chatpage databse has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the chatpage database:", error);
  });

export default chatDatabase;
export {ChatMessage, Session};