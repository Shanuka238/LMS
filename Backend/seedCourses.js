const mongoose = require('mongoose');
const Course = require('./models/Course');

const MONGO_URI = 'mongodb://localhost:27017/lms'; // Change if using Atlas

const allCourses = [
  {
    title: "Complete React Development Course",
    instructor: "Sarah Johnson",
    description: "Learn React from basics to advanced concepts with hands-on projects and real-world applications. Build modern web applications with confidence.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    rating: 4.8,
    students: 15420,
    price: 49,
    duration: "42 hours",
    difficulty: "Intermediate",
    category: "programming",
    tags: ["React", "JavaScript", "Web Development"]
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Michael Chen",
    description: "Master the principles of user interface and user experience design. Create beautiful, functional designs that users love.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    rating: 4.9,
    students: 8930,
    price: 39,
    duration: "28 hours",
    difficulty: "Beginner",
    category: "design",
    tags: ["UI Design", "UX Design", "Figma"]
  },
  {
    title: "JavaScript ES6+ Complete Guide",
    instructor: "David Rodriguez",
    description: "Deep dive into modern JavaScript features, async programming, and advanced concepts for professional development.",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    rating: 4.7,
    students: 22100,
    price: 0,
    duration: "35 hours",
    difficulty: "Intermediate",
    category: "programming",
    tags: ["JavaScript", "ES6", "Programming"]
  },
  {
    title: "Python Data Science Bootcamp",
    instructor: "Dr. James Liu",
    description: "Learn data analysis, visualization, and machine learning with Python. Perfect for aspiring data scientists.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    rating: 4.9,
    students: 18500,
    price: 79,
    duration: "48 hours",
    difficulty: "Advanced",
    category: "data-science",
    tags: ["Python", "Data Science", "Machine Learning"]
  },
  {
    title: "Advanced CSS & Animations",
    instructor: "Tom Wilson",
    description: "Master advanced CSS techniques, animations, and modern layout systems for stunning web interfaces.",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=300&fit=crop",
    rating: 4.8,
    students: 11200,
    price: 42,
    duration: "26 hours",
    difficulty: "Advanced",
    category: "programming",
    tags: ["CSS", "Animations", "Web Design"]
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://shanukaabey37_db_user:w3t49ND2XiQ2pXgG@lmscluster.1amqomm.mongodb.net/', 
    { useNewUrlParser: true, useUnifiedTopology: true, ssl: true, 
      tlsAllowInvalidCertificates: true })
  .then(async () => {
    await Course.deleteMany({});
    await Course.insertMany(allCourses);
    console.log('Courses seeded!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });

