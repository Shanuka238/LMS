import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CourseProgressSidebar from '../../components/ui/CourseProgressSidebar';
import CourseHeader from './components/CourseHeader';
import CourseContent from './components/CourseContent';
import RelatedCourses from './components/RelatedCourses';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProgressSidebarOpen, setIsProgressSidebarOpen] = useState(false);
  const [currentUser] = useState({
    role: 'student',
    name: 'John Doe',
    id: 1
  });

  // Mock course data - in real app this would come from API based on courseId
  const [courseData] = useState({
    id: 1,
    title: "Complete React Development Course 2024",
    shortDescription: "Master React from basics to advanced concepts with hands-on projects and real-world applications. Build modern web applications with confidence.",
    description: `This comprehensive React course takes you from complete beginner to advanced developer. You'll learn React fundamentals, hooks, state management, routing, and much more through practical, hands-on projects. The course is structured to provide you with both theoretical knowledge and practical skills. Each section builds upon the previous one, ensuring a smooth learning progression. By the end of this course, you'll be able to build complex, production-ready React applications.

Whether you're looking to start a career in web development or enhance your existing skills, this course provides everything you need to become proficient in React development.`,
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Senior React Developer & Instructor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.8,
      studentsCount: 15420,
      coursesCount: 12,
      bio: "Dr. Sarah Johnson is a seasoned React developer with over 8 years of experience building production applications. She has worked with companies like Google and Facebook, and now dedicates her time to teaching the next generation of developers."
    },
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 2847,
    enrolledCount: 12543,
    price: 79.99,
    originalPrice: 129.99,
    duration: "18 hours",
    lessonsCount: 156,
    level: "Beginner",
    language: "English",
    progress: 35, // For enrolled students
    completedLessons: 54,
    features: [
      "18 hours of on-demand video",
      "45 downloadable resources",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion",
      "30-day money-back guarantee"
    ],
    learningObjectives: [
      "Build modern React applications from scratch",
      "Understand React hooks and functional components",
      "Master state management with Redux and Context API",
      "Implement routing with React Router",
      "Create responsive and interactive user interfaces",
      "Deploy React applications to production",
      "Write clean, maintainable React code",
      "Debug and optimize React applications"
    ],
    prerequisites: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with ES6+ JavaScript features",
      "Understanding of web development concepts",
      "No prior React experience required"
    ],
    modules: [
      {
        id: 1,
        title: "Getting Started with React",
        duration: "2.5 hours",
        progress: 100,
        lessons: [
          {
            id: 1,
            title: "Course Introduction and Overview",
            type: "video",
            duration: "8:30",
            completed: true,
            preview: true
          },
          {
            id: 2,
            title: "Setting Up Development Environment",
            type: "video",
            duration: "15:45",
            completed: true,
            preview: false
          },
          {
            id: 3,
            title: "Your First React Component",
            type: "video",
            duration: "12:20",
            completed: true,
            preview: true
          },
          {
            id: 4,
            title: "Knowledge Check: React Basics",
            type: "quiz",
            duration: "10 min",
            completed: true,
            score: 95,
            preview: false
          }
        ]
      },
      {
        id: 2,
        title: "React Fundamentals",
        duration: "4 hours",
        progress: 60,
        lessons: [
          {
            id: 5,
            title: "Understanding JSX",
            type: "video",
            duration: "18:30",
            completed: true,
            preview: false
          },
          {
            id: 6,
            title: "Props and Component Communication",
            type: "video",
            duration: "22:15",
            completed: true,
            preview: false
          },
          {
            id: 7,
            title: "State and Event Handling",
            type: "video",
            duration: "25:40",
            completed: false,
            preview: false
          },
          {
            id: 8,
            title: "Conditional Rendering",
            type: "video",
            duration: "16:20",
            completed: false,
            preview: false
          },
          {
            id: 9,
            title: "Practice Quiz: Components & State",
            type: "quiz",
            duration: "15 min",
            completed: false,
            preview: false
          }
        ]
      },
      {
        id: 3,
        title: "Advanced React Concepts",
        duration: "5.5 hours",
        progress: 0,
        lessons: [
          {
            id: 10,
            title: "React Hooks Deep Dive",
            type: "video",
            duration: "28:45",
            completed: false,
            preview: false
          },
          {
            id: 11,
            title: "Custom Hooks",
            type: "video",
            duration: "20:30",
            completed: false,
            preview: false
          },
          {
            id: 12,
            title: "Context API and State Management",
            type: "video",
            duration: "32:15",
            completed: false,
            preview: false
          },
          {
            id: 13,
            title: "Performance Optimization",
            type: "video",
            duration: "24:50",
            completed: false,
            preview: false
          },
          {
            id: 14,
            title: "Final Assessment",
            type: "quiz",
            duration: "30 min",
            completed: false,
            preview: false
          }
        ]
      }
    ],
    ratingDistribution: {
      5: 68,
      4: 22,
      3: 7,
      2: 2,
      1: 1
    },
    reviews: [
      {
        id: 1,
        studentName: "Michael Rodriguez",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent course! The instructor explains complex concepts in a very clear and understandable way. The hands-on projects really helped me grasp the material.",
        helpfulCount: 24
      },
      {
        id: 2,
        studentName: "Emily Chen",
        rating: 5,
        date: "1 month ago",
        comment: "This course exceeded my expectations. I went from knowing nothing about React to building my own applications. Highly recommended!",
        helpfulCount: 18
      },
      {
        id: 3,
        studentName: "David Thompson",
        rating: 4,
        date: "3 weeks ago",
        comment: "Great content and well-structured lessons. Some sections could use more examples, but overall a solid course for learning React.",
        helpfulCount: 12
      },
      {
        id: 4,
        studentName: "Lisa Wang",
        rating: 5,
        date: "1 week ago",
        comment: "The best React course I've taken! The instructor's teaching style is engaging and the projects are practical and relevant.",
        helpfulCount: 31
      }
    ]
  });

  // Check if user is enrolled (mock logic)
  const [isEnrolled] = useState(true); // In real app, check user's enrollment status

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleEnroll = () => {
    // Handle enrollment logic
    console.log('Enrolling in course:', courseData?.title);
    // In real app, this would make API call and redirect to payment
  };

  const handleStartLearning = () => {
    navigate('/video-player', { 
      state: { 
        courseId: courseData?.id,
        lessonId: getNextLesson()?.id 
      } 
    });
  };

  const handleVideoSelect = (lesson) => {
    navigate('/video-player', { 
      state: { 
        courseId: courseData?.id,
        lessonId: lesson?.id 
      } 
    });
  };

  const handleQuizSelect = (lesson) => {
    navigate('/quiz-interface', { 
      state: { 
        courseId: courseData?.id,
        quizId: lesson?.id 
      } 
    });
  };

  const handleLessonSelect = (lesson) => {
    if (lesson?.type === 'quiz') {
      handleQuizSelect(lesson);
    } else {
      handleVideoSelect(lesson);
    }
  };

  const getNextLesson = () => {
    for (const module of courseData?.modules) {
      for (const lesson of module.lessons) {
        if (!lesson?.completed) {
          return lesson;
        }
      }
    }
    return courseData?.modules?.[0]?.lessons?.[0]; // Return first lesson if all completed
  };

  const toggleProgressSidebar = () => {
    setIsProgressSidebarOpen(!isProgressSidebarOpen);
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/student-dashboard', icon: 'Home' },
    { label: 'Courses', path: '/course-catalog', icon: 'BookOpen' },
    { label: courseData?.title, path: '/course-details', icon: 'Info', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={currentUser?.role} 
        userName={currentUser?.name}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Course Header */}
          <div className="mb-8">
            <CourseHeader
              course={courseData}
              isEnrolled={isEnrolled}
              onEnroll={handleEnroll}
              onStartLearning={handleStartLearning}
              onSave={() => {}}
              onPreview={() => {}}
              onPublish={() => {}}
              isEditing={false}
              onEditToggle={() => {}}
            />
          </div>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Content */}
            <div className="lg:col-span-2">
              <CourseContent
                course={courseData}
                isEnrolled={isEnrolled}
                onVideoSelect={handleVideoSelect}
                onQuizSelect={handleQuizSelect}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Progress Tracking for Enrolled Students */}
                {isEnrolled && (
                  <div className="bg-card rounded-lg border border-border shadow-soft p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Your Progress</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="BarChart3"
                        onClick={toggleProgressSidebar}
                      >
                        Details
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Overall Progress</span>
                          <span className="text-sm font-mono text-foreground">{courseData?.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full transition-all duration-300"
                            style={{ width: `${courseData?.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold text-foreground">{courseData?.completedLessons}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold text-foreground">{courseData?.lessonsCount - courseData?.completedLessons}</div>
                          <div className="text-xs text-muted-foreground">Remaining</div>
                        </div>
                      </div>

                      <Button
                        variant="default"
                        fullWidth
                        iconName="Play"
                        iconPosition="left"
                        onClick={handleStartLearning}
                      >
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-card rounded-lg border border-border shadow-soft p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Share"
                      iconPosition="left"
                    >
                      Share Course
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Resources
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Ask Question
                    </Button>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="bg-card rounded-lg border border-border shadow-soft p-6">
                  <h3 className="font-semibold text-foreground mb-4">Course Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Students</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{courseData?.enrolledCount?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Star" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Rating</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{courseData?.rating}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Duration</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{courseData?.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Lessons</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{courseData?.lessonsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          <div className="mt-12">
            <RelatedCourses currentCourseId={courseData?.id} />
          </div>
        </div>
      </main>
      {/* Course Progress Sidebar */}
      <CourseProgressSidebar
        isOpen={isProgressSidebarOpen}
        onToggle={toggleProgressSidebar}
        courseData={courseData}
        currentLessonId={getNextLesson()?.id}
        onLessonSelect={handleLessonSelect}
      />
    </div>
  );
};

export default CourseDetails;