import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    if (course?.nextAction === 'video') {
      navigate('/video-player');
    } else if (course?.nextAction === 'quiz') {
      navigate('/quiz-interface');
    } else {
      navigate('/course-details');
    }
  };

  const handleViewDetails = () => {
    navigate('/course-details');
  };

  const getNextActionText = () => {
    switch (course?.nextAction) {
      case 'video':
        return 'Continue Video';
      case 'quiz':
        return 'Take Quiz';
      case 'completed':
        return 'View Certificate';
      default:
        return 'Continue Learning';
    }
  };

  const getNextActionIcon = () => {
    switch (course?.nextAction) {
      case 'video':
        return 'Play';
      case 'quiz':
        return 'FileQuestion';
      case 'completed':
        return 'Award';
      default:
        return 'BookOpen';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden group">
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden h-48 bg-muted">
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Progress Badge */}
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-mono font-medium text-foreground">{course?.progress}%</span>
        </div>

        {/* Status Badge */}
        {course?.status && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
            course?.status === 'completed' 
              ? 'bg-success text-success-foreground' 
              : course?.status === 'in-progress' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
          }`}>
            {course?.status === 'completed' ? 'Completed' : 
             course?.status === 'in-progress' ? 'In Progress' : 'Not Started'}
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

        {/* Course Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{course?.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{course?.enrolledStudents} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} />
            <span>{course?.rating}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-mono text-foreground">{course?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${course?.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{course?.completedLessons} of {course?.totalLessons} lessons</span>
            <span>{course?.totalLessons - course?.completedLessons} remaining</span>
          </div>
        </div>

        {/* Next Lesson Info */}
        {course?.nextLesson && (
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Next Lesson</p>
            <p className="text-sm font-medium text-foreground truncate">{course?.nextLesson}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleContinueLearning}
            iconName={getNextActionIcon()}
            iconPosition="left"
            className="flex-1"
          >
            {getNextActionText()}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            iconName="Info"
            className="px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;