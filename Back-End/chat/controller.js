import { Session, ChatMessage } from "./chatDB.js";
import { Op } from "@sequelize/core";

//get or create chat session between the users
export const getSession = async(req, res)=>{
  const{currentUserId, postOwnerId} = req.body;
  try{
    //find if there is already a session bewteen two users
    let session = await Session.findOne({
      where: {
        [Op.or]: [
          { user1_id: currentUserId, user2_id: postOwnerId },
          { user1_id: postOwnerId, user2_id: currentUserId },
        ],
      },
    });
    //if no session exist, create one
    if (!session) {
      session = await Session.create({
        user1_id: currentUserId,
        user2_id: postOwnerId,
        last_interaction: new Date(),
      });
      console.log('New session created:', session.toJSON());
    } else {
      console.log('Existing session found:', session.toJSON());
    }
    res.status(200).json({
      success: true,
      session_id: session.id,
    });
  }catch(error){
    console.error('Error in getSession:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

//save messages sent by the user 
export const saveMessage = async (req, res) => {
    const { session_id, sender_id, receiver_id, message } = req.body;
    try {
      const newMessage = await ChatMessage.create({ session_id, sender_id, receiver_id, message });
      res.status(200).json({ success: true, message: "Message saved", data: newMessage });
    } catch (error) {
      console.error('Error in saveMessage', error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

//retrieve chat history bewteen the users
export const getChatHistory = async (req, res) => {
    const { session_id } = req.params;
    try {
      const messages = await ChatMessage.findAll({
        where: { session_id },
        order: [["timestamp", "ASC"]],
      });
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      console.error('Error in getChatHistory', error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export const updateLastInteraction = async (session_id) => {
    try {
      await Session.update({ last_interaction: new Date() }, { where: { id: session_id } });
    } catch (error) {
      console.error("Error updating last interaction:", error.message);
    }
  };