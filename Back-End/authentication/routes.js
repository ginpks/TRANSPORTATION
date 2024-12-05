import express from "express";
import {
    login,
    logout,
    registerUser
  } from "../Back-End/authentication/controllers.js";

 const router = express.Router();

// Routes for registration, login, and logout
router.post('/register', registerUser);
router.post("/login", login);
router.get("/logout", logout);

export default router;
