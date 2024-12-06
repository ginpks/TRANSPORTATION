import express from "express";
import {
    saveMessage,
    getChatHistory
} from './controller.js';

const router = express.Router();

router.post("/messages", saveMessage);
router.get("/messages/:session_id", getChatHistory);


export default router;