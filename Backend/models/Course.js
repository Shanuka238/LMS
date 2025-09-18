const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    instructor: String,
    description: String,
    thumbnail: String,
    rating: Number,
    students: Number,
    price: Number,
    duration: String,
    difficulty: String,
    category: String,
    tags: [String]
})

module.exports = mongoose.model('Course', courseSchema);