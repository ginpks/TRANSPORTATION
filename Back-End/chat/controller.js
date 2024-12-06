import { Session, ChatMessage } from "./chatDB.js";


export const saveMessage = async (req, res) => {
    const { session_id, sender_id, receiver_id, message } = req.body;
    try {
      const newMessage = await ChatMessage.create({ session_id, sender_id, receiver_id, message });
      res.status(201).json({ success: true, message: "Message saved", data: newMessage });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

export const getChatHistory = async (req, res) => {
    const { session_id } = req.params;
    try {
      const messages = await ChatMessage.findAll({
        where: { session_id },
        order: [["timestamp", "ASC"]],
      });
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
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