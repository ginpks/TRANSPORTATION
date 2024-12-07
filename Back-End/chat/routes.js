import express from "express";
import {
    saveMessage,
    getChatHistory,
    getSession
} from './controller.js';

const router = express.Router();

router.post("/session", getSession);
router.post("/messages", saveMessage);
router.get("/messages/:session_id", getChatHistory);

export default router;