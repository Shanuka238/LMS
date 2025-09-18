import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, userRole = 'student', enrolledCourses = [] }) => {
  const navigate = useNavigate();
  
  const isEnrolled = enrolledCourses?.some(enrolled => enrolled?.id === course?.id);
  
  const handleCourseClick = () => {
    navigate('/course-details', { state: { courseId: course?.id } });
  };
  
  const handleEnrollClick = (e) => {
    e?.stopPropagation();
    if (isEnrolled) {
      navigate('/video-player', { state: { courseId: course?.id } });
    } else {
      navigate('/course-details', { state: { courseId: course?.id } });
    }
  };
  
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-warning" />
      );
    }
    
    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-warning opacity-50" />
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }
    
    return stars;
  };
  
  return (
    <div 
      className="bg-card border border-border rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer group overflow-hidden w-full"
      onClick={handleCourseClick}
    >
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(course?.difficulty)}`}>
            {course?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-medium">{course?.duration}</span>
        </div>
        {isEnrolled && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-primary/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} className="text-white" />
              <span className="text-white text-xs font-medium">Enrolled</span>
            </div>
          </div>
        )}
      </div>
      {/* Course Content */}
      <div className="p-4">
        {/* Course Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {course?.title}
        </h3>
        
        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={12} className="text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">{course?.instructor}</span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course?.description}
        </p>
        
        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="PlayCircle" size={14} />
            <span>{course?.lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>Certificate</span>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {course?.originalPrice && course?.originalPrice !== course?.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${course?.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-foreground">
              {course?.price === 0 ? 'Free' : `$${course?.price}`}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleEnrollClick}
            iconName="Plus"
            iconPosition="left"
            className="flex-shrink-0"
          >
            Enroll
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;