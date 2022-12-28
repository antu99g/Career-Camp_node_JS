const express = require('express');
const router = express.Router();
const passport = require("passport");

const userController = require('../controllers/user_controller');


// Rendering login page
router.get('/log-in', userController.loginForm);

// Rendering signup page
router.get('/sign-up', userController.signupForm);

// Adding new user to database
router.post('/sign-up', userController.signUp);

// Create new session after login
router.post(
   '/create-session', 
   passport.authenticate("local", { failureRedirect: '/user/sign-up' }),
   userController.createSession
);

// Log out
router.get("/log-out", userController.logOut);



module.exports = router;