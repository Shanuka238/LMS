import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedCourses = ({ currentCourseId = null }) => {
  const navigate = useNavigate();

  const relatedCourses = [
    {
      id: 2,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      rating: 4.7,
      reviewCount: 892,
      price: 89.99,
      originalPrice: 129.99,
      duration: "8 hours",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      enrolledCount: 2341,
      description: "Master advanced React patterns and techniques used in production applications."
    },
    {
      id: 3,
      title: "JavaScript ES6+ Masterclass",
      instructor: "Mike Chen",
      rating: 4.6,
      reviewCount: 1205,
      price: 69.99,
      originalPrice: 99.99,
      duration: "12 hours",
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
      enrolledCount: 3567,
      description: "Deep dive into modern JavaScript features and best practices."
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      instructor: "Alex Rodriguez",
      rating: 4.8,
      reviewCount: 756,
      price: 94.99,
      originalPrice: 139.99,
      duration: "15 hours",
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      enrolledCount: 1876,
      description: "Build scalable backend applications with Node.js and Express."
    },
    {
      id: 5,
      title: "Full Stack Web Development",
      instructor: "Emma Wilson",
      rating: 4.9,
      reviewCount: 2134,
      price: 149.99,
      originalPrice: 199.99,
      duration: "25 hours",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      enrolledCount: 4523,
      description: "Complete full stack development course from frontend to backend."
    }
  ];

  const filteredCourses = relatedCourses?.filter(course => course?.id !== currentCourseId);

  const handleCourseClick = (courseId) => {
    navigate('/course-details', { state: { courseId } });
  };

  const handleEnrollClick = (e, course) => {
    e?.stopPropagation();
    // Handle enrollment logic
    console.log('Enrolling in course:', course?.title);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Related Courses</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Students who viewed this course also looked at
        </p>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCourses?.slice(0, 4)?.map((course) => (
            <div
              key={course?.id}
              onClick={() => handleCourseClick(course?.id)}
              className="group cursor-pointer bg-background rounded-lg border border-border hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300"
            >
              {/* Course Thumbnail */}
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Level Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    course?.level === 'Beginner' ? 'bg-success/90 text-white' :
                    course?.level === 'Intermediate'? 'bg-warning/90 text-white' : 'bg-error/90 text-white'
                  }`}>
                    {course?.level}
                  </div>
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-primary/90 text-white px-2 py-1 rounded text-sm font-semibold">
                    ${course?.price}
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {course?.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course?.description}
                </p>

                {/* Instructor */}
                <p className="text-sm text-muted-foreground mb-3">
                  By {course?.instructor}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-foreground">{course?.rating}</span>
                      <span className="text-xs text-muted-foreground">({course?.reviewCount})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{course?.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{course?.enrolledCount}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-foreground">${course?.price}</span>
                    {course?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${course?.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    onClick={(e) => handleEnrollClick(e, course)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Enroll
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/course-catalog')}
          >
            View All Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedCourses;