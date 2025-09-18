import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionMenu = ({ userRole = 'student', recentActivity = null }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultRecentActivity = {
    student: {
      recentCourses: [
        { id: 1, title: "React Development", progress: 65, lastAccessed: "2 hours ago", thumbnail: "/assets/images/course1.jpg" },
        { id: 2, title: "JavaScript Fundamentals", progress: 90, lastAccessed: "1 day ago", thumbnail: "/assets/images/course2.jpg" },
        { id: 3, title: "CSS Grid & Flexbox", progress: 45, lastAccessed: "3 days ago", thumbnail: "/assets/images/course3.jpg" }
      ],
      pendingQuizzes: [
        { id: 1, title: "React Hooks Quiz", course: "React Development", dueDate: "Tomorrow", difficulty: "Medium" },
        { id: 2, title: "ES6 Features Test", course: "JavaScript Fundamentals", dueDate: "In 3 days", difficulty: "Easy" }
      ],
      achievements: [
        { id: 1, title: "First Course Completed", icon: "Trophy", earned: "2 days ago" },
        { id: 2, title: "Quiz Master", icon: "Award", earned: "1 week ago" }
      ]
    },
    teacher: {
      recentCourses: [
        { id: 1, title: "React Development", students: 45, lastUpdated: "2 hours ago", status: "Active" },
        { id: 2, title: "JavaScript Fundamentals", students: 32, lastUpdated: "1 day ago", status: "Active" }
      ],
      pendingTasks: [
        { id: 1, title: "Grade Quiz Submissions", count: 12, priority: "High", dueDate: "Today" },
        { id: 2, title: "Review Course Content", count: 3, priority: "Medium", dueDate: "Tomorrow" }
      ],
      analytics: [
        { label: "Total Students", value: "156", change: "+12", trend: "up" },
        { label: "Course Completion", value: "78%", change: "+5%", trend: "up" }
      ]
    },
    admin: {
      systemStats: [
        { label: "Active Users", value: "1,234", change: "+56", trend: "up" },
        { label: "Course Completion", value: "82%", change: "+3%", trend: "up" },
        { label: "System Health", value: "99.9%", change: "0%", trend: "stable" }
      ],
      pendingActions: [
        { id: 1, title: "User Approvals", count: 8, priority: "High", type: "approval" },
        { id: 2, title: "Course Reviews", count: 5, priority: "Medium", type: "review" }
      ],
      recentAlerts: [
        { id: 1, title: "Server Maintenance", time: "2 hours ago", type: "info" },
        { id: 2, title: "New User Registrations", time: "4 hours ago", type: "success" }
      ]
    }
  };

  const activity = recentActivity || defaultRecentActivity?.[userRole];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getQuickActions = () => {
    switch (userRole) {
      case 'student':
        return [
          { label: 'Continue Learning', icon: 'Play', action: () => handleNavigation('/video-player'), variant: 'default' },
          { label: 'Browse Courses', icon: 'Search', action: () => handleNavigation('/course-catalog'), variant: 'outline' },
          { label: 'Take Quiz', icon: 'FileQuestion', action: () => handleNavigation('/quiz-interface'), variant: 'outline' },
          { label: 'View Progress', icon: 'BarChart3', action: () => setIsExpanded(!isExpanded), variant: 'ghost' }
        ];
      case 'teacher':
        return [
          { label: 'Manage Courses', icon: 'Settings', action: () => handleNavigation('/course-management'), variant: 'default' },
          { label: 'Grade Assignments', icon: 'CheckSquare', action: () => handleNavigation('/quiz-interface'), variant: 'outline' },
          { label: 'View Analytics', icon: 'BarChart3', action: () => setIsExpanded(!isExpanded), variant: 'outline' },
          { label: 'Create Content', icon: 'Plus', action: () => handleNavigation('/course-management'), variant: 'ghost' }
        ];
      case 'admin':
        return [
          { label: 'System Overview', icon: 'Monitor', action: () => setIsExpanded(!isExpanded), variant: 'default' },
          { label: 'User Management', icon: 'Users', action: () => handleNavigation('/course-management'), variant: 'outline' },
          { label: 'Course Approval', icon: 'CheckCircle', action: () => handleNavigation('/course-catalog'), variant: 'outline' },
          { label: 'Reports', icon: 'FileText', action: () => handleNavigation('/student-dashboard'), variant: 'ghost' }
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActions();

  const renderStudentContent = () => (
    <div className="space-y-6">
      {/* Recent Courses */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Continue Learning</h3>
        <div className="space-y-3">
          {activity?.recentCourses?.slice(0, 3)?.map((course) => (
            <div key={course?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-300 cursor-pointer"
                 onClick={() => handleNavigation('/course-details')}>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{course?.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-16 bg-background rounded-full h-1">
                    <div className="bg-accent h-1 rounded-full transition-all duration-300" style={{ width: `${course?.progress}%` }} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{course?.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Quizzes */}
      {activity?.pendingQuizzes?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Pending Quizzes</h3>
          <div className="space-y-2">
            {activity?.pendingQuizzes?.map((quiz) => (
              <div key={quiz?.id} className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg hover:bg-warning/20 transition-colors duration-300 cursor-pointer"
                   onClick={() => handleNavigation('/quiz-interface')}>
                <div>
                  <p className="text-sm font-medium text-foreground">{quiz?.title}</p>
                  <p className="text-xs text-muted-foreground">{quiz?.course} • Due {quiz?.dueDate}</p>
                </div>
                <Icon name="Clock" size={16} className="text-warning" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTeacherContent = () => (
    <div className="space-y-6">
      {/* Course Management */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Your Courses</h3>
        <div className="space-y-3">
          {activity?.recentCourses?.map((course) => (
            <div key={course?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-300 cursor-pointer"
                 onClick={() => handleNavigation('/course-management')}>
              <div>
                <p className="text-sm font-medium text-foreground">{course?.title}</p>
                <p className="text-xs text-muted-foreground">{course?.students} students • Updated {course?.lastUpdated}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                course?.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
              }`}>
                {course?.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Tasks */}
      {activity?.pendingTasks?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Pending Tasks</h3>
          <div className="space-y-2">
            {activity?.pendingTasks?.map((task) => (
              <div key={task?.id} className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors duration-300 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-foreground">{task?.title}</p>
                  <p className="text-xs text-muted-foreground">{task?.count} items • Due {task?.dueDate}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  task?.priority === 'High' ? 'bg-error/10 text-error' : 
                  task?.priority === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                }`}>
                  {task?.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderAdminContent = () => (
    <div className="space-y-6">
      {/* System Stats */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">System Overview</h3>
        <div className="grid grid-cols-1 gap-3">
          {activity?.systemStats?.map((stat, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat?.label}</p>
                <div className={`flex items-center space-x-1 text-xs ${
                  stat?.trend === 'up' ? 'text-success' : stat?.trend === 'down' ? 'text-error' : 'text-muted-foreground'
                }`}>
                  <span>{stat?.change}</span>
                  {stat?.trend === 'up' && <Icon name="TrendingUp" size={12} />}
                  {stat?.trend === 'down' && <Icon name="TrendingDown" size={12} />}
                </div>
              </div>
              <p className="text-lg font-semibold text-foreground font-mono">{stat?.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Actions */}
      {activity?.pendingActions?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Pending Actions</h3>
          <div className="space-y-2">
            {activity?.pendingActions?.map((action) => (
              <div key={action?.id} className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors duration-300 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-foreground">{action?.title}</p>
                  <p className="text-xs text-muted-foreground">{action?.count} pending</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  action?.priority === 'High' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                }`}>
                  {action?.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      {/* Quick Actions Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        
        {/* Action Buttons - Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-3">
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              onClick={action?.action}
              iconName={action?.icon}
              iconPosition="left"
              className="justify-start"
            >
              {action?.label}
            </Button>
          ))}
        </div>

        {/* Action Buttons - Mobile */}
        <div className="md:hidden flex overflow-x-auto space-x-3 pb-2">
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              size="sm"
              onClick={action?.action}
              iconName={action?.icon}
              className="flex-shrink-0"
            >
              {action?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Expandable Content */}
      <div className={`transition-all duration-300 ease-smooth ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="p-4">
          {userRole === 'student' && renderStudentContent()}
          {userRole === 'teacher' && renderTeacherContent()}
          {userRole === 'admin' && renderAdminContent()}
        </div>
      </div>
      {/* Recent Activity Summary */}
      {!isExpanded && (
        <div className="p-4">
          {userRole === 'student' && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {activity?.recentCourses?.length || 0} courses in progress
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                iconName="ChevronDown"
                iconPosition="right"
              >
                View Details
              </Button>
            </div>
          )}
          
          {userRole === 'teacher' && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {activity?.pendingTasks?.reduce((sum, task) => sum + task?.count, 0) || 0} pending tasks
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                iconName="ChevronDown"
                iconPosition="right"
              >
                View Details
              </Button>
            </div>
          )}
          
          {userRole === 'admin' && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                System running smoothly
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                iconName="ChevronDown"
                iconPosition="right"
              >
                View Details
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickActionMenu;