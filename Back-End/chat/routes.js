import express from "express";
import {
    saveMessage,
    getChatHistory,
    getSession,
    getUserList,
    updateInteraction
} from './controller.js';

const router = express.Router();

router.post("/session", getSession);
router.post("/messages", saveMessage);
router.post("/session/update-interaction", updateInteraction);
router.post("/userlist", getUserList);
router.get("/messages/:session_id", getChatHistory);

export default router;