const Course = require('../models/Course');

//Get all courses
exports.getCourses = async (req, res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Add a new course
exports.addCourse = async (req, res) => {
    try{
        const course  = new Course(req.body);
        await course.save();
        res.status(201).json(course)
    }catch(err){
        res.status(400).json({message: err.message});
    }
}