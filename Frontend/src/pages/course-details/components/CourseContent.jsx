import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseContent = ({ 
  course, 
  isEnrolled = false, 
  onVideoSelect = () => {}, 
  onQuizSelect = () => {} 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState(new Set([1])); // First module expanded by default

  if (!course) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'curriculum', label: 'Curriculum', icon: 'BookOpen' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded?.has(moduleId)) {
      newExpanded?.delete(moduleId);
    } else {
      newExpanded?.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Play';
      case 'quiz':
        return 'FileQuestion';
      case 'reading':
        return 'BookOpen';
      default:
        return 'Circle';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Course Description */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">About This Course</h3>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="mb-4">{course?.description}</p>
          <p>
            This comprehensive course is designed to take you from beginner to advanced level. 
            You'll learn through hands-on projects, real-world examples, and interactive exercises 
            that reinforce key concepts.
          </p>
        </div>
      </div>

      {/* Learning Objectives */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">What You'll Learn</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {course?.learningObjectives?.map((objective, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{objective}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Prerequisites</h3>
        <div className="space-y-2">
          {course?.prerequisites?.map((prerequisite, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Dot" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{prerequisite}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor Details */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">About the Instructor</h3>
        <div className="bg-muted rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={course?.instructor?.avatar}
                alt={course?.instructor?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{course?.instructor?.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{course?.instructor?.title}</p>
              <p className="text-sm text-muted-foreground mb-3">{course?.instructor?.bio}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                  <span>{course?.instructor?.rating} rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{course?.instructor?.studentsCount} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="BookOpen" size={12} />
                  <span>{course?.instructor?.coursesCount} courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurriculum = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Course Curriculum</h3>
        <div className="text-sm text-muted-foreground">
          {course?.lessonsCount} lessons • {course?.duration}
        </div>
      </div>

      <div className="space-y-3">
        {course?.modules?.map((module) => (
          <div key={module.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors duration-300"
            >
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{module.title}</h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span>{module.lessons?.length} lessons</span>
                  <span>{module.duration}</span>
                  {isEnrolled && (
                    <div className="flex items-center space-x-1">
                      <div className="w-16 bg-background rounded-full h-1">
                        <div 
                          className="bg-accent h-1 rounded-full transition-all duration-300"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs">{module.progress}%</span>
                    </div>
                  )}
                </div>
              </div>
              <Icon 
                name={expandedModules?.has(module.id) ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </button>

            {expandedModules?.has(module.id) && (
              <div className="border-t border-border bg-muted/30">
                {module.lessons?.map((lesson) => (
                  <div
                    key={lesson?.id}
                    className="flex items-center justify-between p-4 hover:bg-muted transition-colors duration-300 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isEnrolled && lesson?.completed 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-background text-muted-foreground'
                      }`}>
                        {isEnrolled && lesson?.completed ? (
                          <Icon name="Check" size={14} />
                        ) : (
                          <Icon name={getLessonIcon(lesson?.type)} size={14} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{lesson?.title}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-muted-foreground font-mono">{lesson?.duration}</span>
                          {lesson?.type === 'quiz' && lesson?.score && (
                            <span className="text-xs text-success">Score: {lesson?.score}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!isEnrolled && lesson?.preview && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => onVideoSelect(lesson)}
                        >
                          Preview
                        </Button>
                      )}
                      {isEnrolled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={lesson?.type === 'quiz' ? "FileQuestion" : "Play"}
                          onClick={() => lesson?.type === 'quiz' ? onQuizSelect(lesson) : onVideoSelect(lesson)}
                        >
                          {lesson?.type === 'quiz' ? 'Take Quiz' : 'Watch'}
                        </Button>
                      )}
                      {!isEnrolled && !lesson?.preview && (
                        <Icon name="Lock" size={16} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Student Reviews</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
          <span className="font-semibold text-foreground">{course?.rating}</span>
          <span className="text-muted-foreground">({course?.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-muted rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">{course?.rating}</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={16}
                  className={`${
                    star <= Math.floor(course?.rating)
                      ? 'text-yellow-400 fill-current' :'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Course Rating</p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground w-4">{rating}</span>
                <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                <div className="flex-1 bg-background rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course?.ratingDistribution?.[rating] || 0}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">
                  {course?.ratingDistribution?.[rating] || 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {course?.reviews?.map((review) => (
          <div key={review?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">
                  {review?.studentName?.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{review?.studentName}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={12}
                            className={`${
                              star <= review?.rating
                                ? 'text-yellow-400 fill-current' :'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review?.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{review?.comment}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
                    <Icon name="ThumbsUp" size={12} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center">
        <Button variant="outline">
          Load More Reviews
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" aria-label="Course content tabs">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-300 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'curriculum' && renderCurriculum()}
        {activeTab === 'reviews' && renderReviews()}
      </div>
    </div>
  );
};

export default CourseContent;