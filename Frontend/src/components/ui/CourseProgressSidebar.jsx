import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CourseProgressSidebar = ({ 
  isOpen = false, 
  onToggle = () => {}, 
  courseData = null,
  currentLessonId = null,
  onLessonSelect = () => {}
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set());

  const defaultCourseData = {
    title: "Introduction to React Development",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    modules: [
      {
        id: 1,
        title: "Getting Started",
        progress: 100,
        lessons: [
          { id: 1, title: "Course Introduction", duration: "5:30", completed: true, type: "video" },
          { id: 2, title: "Setup Environment", duration: "12:45", completed: true, type: "video" },
          { id: 3, title: "Knowledge Check", duration: "10 min", completed: true, type: "quiz" }
        ]
      },
      {
        id: 2,
        title: "React Fundamentals",
        progress: 75,
        lessons: [
          { id: 4, title: "Components Overview", duration: "15:20", completed: true, type: "video" },
          { id: 5, title: "Props and State", duration: "18:30", completed: true, type: "video" },
          { id: 6, title: "Event Handling", duration: "14:15", completed: false, type: "video" },
          { id: 7, title: "Practice Quiz", duration: "15 min", completed: false, type: "quiz" }
        ]
      },
      {
        id: 3,
        title: "Advanced Concepts",
        progress: 25,
        lessons: [
          { id: 8, title: "Hooks Introduction", duration: "20:45", completed: true, type: "video" },
          { id: 9, title: "useEffect Hook", duration: "16:30", completed: false, type: "video" },
          { id: 10, title: "Custom Hooks", duration: "22:15", completed: false, type: "video" },
          { id: 11, title: "Final Assessment", duration: "30 min", completed: false, type: "quiz" }
        ]
      }
    ]
  };

  const course = courseData || defaultCourseData;

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded?.has(moduleId)) {
      newExpanded?.delete(moduleId);
    } else {
      newExpanded?.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleLessonClick = (lesson) => {
    onLessonSelect(lesson);
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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border transform transition-transform duration-300 ease-smooth z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Course Progress</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Course Info */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-2 line-clamp-2">{course?.title}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-mono text-foreground">{course?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course?.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{course?.completedLessons} of {course?.totalLessons} lessons</span>
                <span>{course?.totalLessons - course?.completedLessons} remaining</span>
              </div>
            </div>
          </div>

          {/* Modules List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {course?.modules?.map((module) => (
                <div key={module.id} className="border border-border rounded-lg">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-muted transition-colors duration-300 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">{module.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-16 bg-muted rounded-full h-1">
                          <div 
                            className="bg-accent h-1 rounded-full transition-all duration-300"
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{module.progress}%</span>
                      </div>
                    </div>
                    <Icon 
                      name={expandedModules?.has(module.id) ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground"
                    />
                  </button>

                  {expandedModules?.has(module.id) && (
                    <div className="border-t border-border">
                      {module.lessons?.map((lesson) => (
                        <button
                          key={lesson?.id}
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-muted transition-colors duration-300 ${
                            currentLessonId === lesson?.id ? 'bg-primary/10 border-l-2 border-l-primary' : ''
                          }`}
                        >
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            lesson?.completed 
                              ? 'bg-success text-success-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {lesson?.completed ? (
                              <Icon name="Check" size={12} />
                            ) : (
                              <Icon name={getLessonIcon(lesson?.type)} size={12} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{lesson?.title}</p>
                            <p className="text-xs text-muted-foreground font-mono">{lesson?.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Sheet */}
      <div className={`lg:hidden fixed inset-x-0 bottom-0 bg-card border-t border-border transform transition-transform duration-300 ease-smooth z-50 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`} style={{ height: '70vh' }}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Course Progress</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <Icon name="ChevronDown" size={16} />
            </Button>
          </div>

          {/* Mobile Course Info */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-2">{course?.title}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-mono text-foreground">{course?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course?.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Modules List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {course?.modules?.map((module) => (
                <div key={module.id} className="border border-border rounded-lg">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-muted transition-colors duration-300 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">{module.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-20 bg-muted rounded-full h-1">
                          <div 
                            className="bg-accent h-1 rounded-full transition-all duration-300"
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{module.progress}%</span>
                      </div>
                    </div>
                    <Icon 
                      name={expandedModules?.has(module.id) ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground"
                    />
                  </button>

                  {expandedModules?.has(module.id) && (
                    <div className="border-t border-border">
                      {module.lessons?.map((lesson) => (
                        <button
                          key={lesson?.id}
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-muted transition-colors duration-300 ${
                            currentLessonId === lesson?.id ? 'bg-primary/10 border-l-2 border-l-primary' : ''
                          }`}
                        >
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            lesson?.completed 
                              ? 'bg-success text-success-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {lesson?.completed ? (
                              <Icon name="Check" size={12} />
                            ) : (
                              <Icon name={getLessonIcon(lesson?.type)} size={12} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{lesson?.title}</p>
                            <p className="text-xs text-muted-foreground font-mono">{lesson?.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default CourseProgressSidebar;