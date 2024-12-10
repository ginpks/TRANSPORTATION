import passport from "passport";
import express from "express";
import {
    login,
    logout,
    registerUser
  } from "../authentication/controller.js";

 const router = express.Router();

// Routes for registration, login, and logout
router.post('/register', registerUser);

// router.post("/login", login);

// Using middleware-passport
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user-profile-page/index.html',
  failureRedirect: '/login/LoginPage.html',
  failureMessage: true
}),
(req, res) => {
  // Check if authentication was successful
  if (!req.user) {
    return res.status(401).json({ error: 'Login failed.' });
  }
  // Login successful
  res.status(200).json({ message: 'Login successful', user: req.user });
});
// router.post('/login', passport.authenticate('local'), (req, res) => {
//   // Check if authentication was successful
//   if (!req.user) {
//     return res.status(401).json({ error: 'Login failed.' });
//   }
//   // Login successful
//   res.status(200).json({ message: 'Login successful', user: req.user });
// });


router.get("/logout", logout);

export default router;
