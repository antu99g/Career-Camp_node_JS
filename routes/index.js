const express = require('express');
const router = express.Router();
const passport = require("passport");

const studentsController = require('../controllers/students_controller');


// Home page route (students)
router.get("/", passport.checkAuthentication, studentsController.studentsPage);

// Adding new student
router.post('/add-student', studentsController.addStudent);

// Downloading all student details as csv
router.get("/get-student-details", studentsController.downloadStudentsLog);



router.use('/user', require('./user'));

router.use('/interview', require('./interview'));


module.exports = router;