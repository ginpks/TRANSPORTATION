import express from "express";
import {
    saveMessage,
    getChatHistory,
    getSession,
    getUserList
} from './controller.js';

const router = express.Router();

router.post("/session", getSession);
router.post("/messages", saveMessage);
router.post("/userlist", getUserList)
router.get("/messages/:session_id", getChatHistory);

export default router;