import { Sequelize, DataTypes } from "@sequelize/core";

const chatDatabase = new Sequelize({
    dialect: "sqlite", 
    storage: "chat.sqlite", 
    logging: console.log,
  });

  // Define the Session model
  const Session = chatDatabase.define("Session", {
    user1_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false },

    user2_id: { 
        type: DataTypes.INTEGER, 
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
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