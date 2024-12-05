import express from "express";
import {
    login,
    logout,
  } from "../Back-End/authentication/controllers.js";

 const router = express.Router();

 
// Routes for registration, login, and logout
router.post("/login", login);
router.get("/logout", logout);