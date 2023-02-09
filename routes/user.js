const express = require('express');
const router = express.Router();
const passport = require("passport");

const userController = require('../controllers/user_controller');


// Rendering login page
router.get('/login', userController.loginForm);

// Rendering signup page
router.get('/signup', userController.signupForm);

// Adding new user to database
router.post('/signup', userController.signUp);

// Create new session after login
router.post(
   '/create-session', 
   passport.authenticate("local", { failureRedirect: '/user/signup' }),
   userController.createSession
);

// Log out
router.get("/logout", userController.logOut);



module.exports = router;