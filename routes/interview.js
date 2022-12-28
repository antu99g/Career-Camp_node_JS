const express = require('express');
const router = express.Router();
const passport = require("passport");

const interviewController = require('../controllers/interview_controller');


// Interview page route
router.get('/', passport.checkAuthentication, interviewController.interviewPage);

// Creating new interview
router.post('/create', interviewController.createInterview);

// Setting interview status for a student
router.post('/set-status', interviewController.setInterviewStatus);

// Adding new student to an interview
router.post('/add-student', interviewController.addNewStudent);

// Downloading all interview details as csv
router.get('/get-interview-details', interviewController.downloadInterviewLog);


module.exports = router;