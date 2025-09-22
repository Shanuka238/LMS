import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { getCourses } from '../../utils/api';

const CourseDetails = () => {
  const location = useLocation();
  const { courseId } = location.state || {};
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      const courses = await getCourses();
      const found = courses.find(c => String(c._id ?? c.id) === String(courseId));
      setCourse(found);
      setLoading(false);
    }
    if (courseId) fetchCourse();
    else setLoading(false);
  }, [courseId]);

  if (!courseId) return <div>No course selected.</div>;
  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded mb-4" />
          <p className="mb-2 text-lg text-muted-foreground">Instructor: {course.instructor}</p>
          <p className="mb-4">{course.description}</p>
          <div className="mb-2">Category: {course.category}</div>
          <div className="mb-2">Difficulty: {course.difficulty}</div>
          <div className="mb-2">Duration: {course.duration}</div>
          <div className="mb-2">Price: {course.price === 0 ? 'Free' : `$${course.price}`}</div>
          <div className="mb-2">Tags: {course.tags?.join(', ')}</div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
