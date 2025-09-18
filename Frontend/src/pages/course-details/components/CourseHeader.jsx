import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseHeader = ({ 
  course, 
  isEnrolled = false, 
  onEnroll = () => {}, 
  onStartLearning = () => {} 
}) => {
  if (!course) return null;

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
      {/* Course Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Course Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            course?.level === 'Beginner' ? 'bg-success/20 text-success border border-success/30' :
            course?.level === 'Intermediate'? 'bg-warning/20 text-warning border border-warning/30' : 'bg-error/20 text-error border border-error/30'
          }`}>
            {course?.level}
          </div>
        </div>

        {/* Course Stats Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{course?.rating}</span>
                <span className="text-xs opacity-80">({course?.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span className="text-sm">{course?.enrolledCount} students</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${course?.price}</div>
              {course?.originalPrice && (
                <div className="text-sm opacity-80 line-through">${course?.originalPrice}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Course Info */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {course?.title}
            </h1>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {course?.shortDescription}
            </p>

            {/* Course Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course?.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course?.lessonsCount} lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Certificate included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course?.language}</span>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={course?.instructor?.avatar}
                  alt={course?.instructor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{course?.instructor?.name}</p>
                <p className="text-sm text-muted-foreground">{course?.instructor?.title}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs text-muted-foreground">{course?.instructor?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{course?.instructor?.studentsCount} students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Panel */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-muted rounded-lg p-6 sticky top-24">
              {/* Progress for Enrolled Students */}
              {isEnrolled && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Your Progress</span>
                    <span className="text-sm font-mono text-foreground">{course?.progress}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course?.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {course?.completedLessons} of {course?.lessonsCount} lessons completed
                  </p>
                </div>
              )}

              {/* Action Button */}
              <div className="space-y-3">
                {isEnrolled ? (
                  <Button
                    variant="default"
                    fullWidth
                    iconName="Play"
                    iconPosition="left"
                    onClick={onStartLearning}
                  >
                    Continue Learning
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="default"
                      fullWidth
                      iconName="ShoppingCart"
                      iconPosition="left"
                      onClick={onEnroll}
                    >
                      Enroll Now - ${course?.price}
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Heart"
                      iconPosition="left"
                    >
                      Add to Wishlist
                    </Button>
                  </>
                )}
              </div>

              {/* Course Features */}
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-foreground">This course includes:</h4>
                <div className="space-y-2">
                  {course?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-6 p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;