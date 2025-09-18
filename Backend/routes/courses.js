const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

//Get all courses
router.get('/', courseController.getCourses);

//Add a new course
router.post('/', courseController.addCourse);

module.exports = router;