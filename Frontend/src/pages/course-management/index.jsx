import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CourseHeader from './components/CourseHeader';
import ContentStructure from './components/ContentStructure';
import StudentProgress from './components/StudentProgress';
import ContentUploadModal from './components/ContentUploadModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CourseManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadModalType, setUploadModalType] = useState('video');
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [isEditingCourse, setIsEditingCourse] = useState(false);

  // Mock course data
  const [courseData, setCourseData] = useState({
    id: 1,
    title: "Advanced React Development",
    description: "Master modern React development with hooks, context, and advanced patterns. Build production-ready applications with best practices.",
    status: "published",
    difficulty: "advanced",
    price: 149.99,
    duration: 24,
    enrolledStudents: 156,
    totalLessons: 32,
    completionRate: 78,
    averageRating: 4.8,
    totalRevenue: "$23,384",
    instructor: "Sarah Johnson",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    createdAt: "2024-01-15",
    updatedAt: "2024-09-10"
  });

  // Mock modules data
  const [modulesData, setModulesData] = useState([
    {
      id: 1,
      title: "Getting Started with Advanced React",
      duration: 120,
      lessons: [
        {
          id: 1,
          title: "Course Introduction",
          type: "video",
          duration: "8:30",
          status: "published",
          views: 142,
          uploadDate: "2024-09-01"
        },
        {
          id: 2,
          title: "Environment Setup",
          type: "video",
          duration: "12:45",
          status: "published",
          views: 138,
          uploadDate: "2024-09-01"
        },
        {
          id: 3,
          title: "Knowledge Check",
          type: "quiz",
          duration: "10 min",
          status: "published",
          views: 134,
          uploadDate: "2024-09-01"
        }
      ]
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      duration: 180,
      lessons: [
        {
          id: 4,
          title: "useState and useEffect",
          type: "video",
          duration: "15:20",
          status: "published",
          views: 129,
          uploadDate: "2024-09-03"
        },
        {
          id: 5,
          title: "Custom Hooks",
          type: "video",
          duration: "18:30",
          status: "published",
          views: 125,
          uploadDate: "2024-09-03"
        },
        {
          id: 6,
          title: "useContext and useReducer",
          type: "video",
          duration: "22:15",
          status: "draft",
          views: 0,
          uploadDate: "2024-09-05"
        },
        {
          id: 7,
          title: "Hooks Practice Quiz",
          type: "quiz",
          duration: "15 min",
          status: "draft",
          views: 0,
          uploadDate: "2024-09-05"
        }
      ]
    },
    {
      id: 3,
      title: "Performance Optimization",
      duration: 150,
      lessons: [
        {
          id: 8,
          title: "React.memo and useMemo",
          type: "video",
          duration: "16:45",
          status: "draft",
          views: 0,
          uploadDate: "2024-09-08"
        },
        {
          id: 9,
          title: "Code Splitting",
          type: "video",
          duration: "14:30",
          status: "draft",
          views: 0,
          uploadDate: "2024-09-08"
        }
      ]
    }
  ]);

  // Mock students data
  const studentsData = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      progress: 85,
      completedLessons: 27,
      totalLessons: 32,
      status: "active",
      lastActive: "2024-09-13T10:30:00Z",
      enrollDate: "2024-08-15T09:00:00Z",
      totalTimeSpent: "18h 45m",
      averageScore: 92
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      progress: 92,
      completedLessons: 29,
      totalLessons: 32,
      status: "active",
      lastActive: "2024-09-13T08:15:00Z",
      enrollDate: "2024-08-20T14:30:00Z",
      totalTimeSpent: "22h 15m",
      averageScore: 96
    },
    {
      id: 3,
      name: "David Chen",
      email: "david.chen@email.com",
      progress: 45,
      completedLessons: 14,
      totalLessons: 32,
      status: "inactive",
      lastActive: "2024-09-10T16:20:00Z",
      enrollDate: "2024-09-01T11:00:00Z",
      totalTimeSpent: "8h 30m",
      averageScore: 78
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      progress: 100,
      completedLessons: 32,
      totalLessons: 32,
      status: "completed",
      lastActive: "2024-09-12T19:45:00Z",
      enrollDate: "2024-08-10T10:15:00Z",
      totalTimeSpent: "28h 20m",
      averageScore: 94
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.wilson@email.com",
      progress: 67,
      completedLessons: 21,
      totalLessons: 32,
      status: "active",
      lastActive: "2024-09-13T12:00:00Z",
      enrollDate: "2024-08-25T16:45:00Z",
      totalTimeSpent: "15h 10m",
      averageScore: 88
    }
  ];

  const tabs = [
    { id: 'content', label: 'Course Content', icon: 'BookOpen' },
    { id: 'students', label: 'Student Progress', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleSaveCourse = (updatedCourse) => {
    setCourseData(updatedCourse);
    // Here you would typically make an API call to save the course
    console.log('Saving course:', updatedCourse);
  };

  const handlePreviewCourse = () => {
    navigate('/course-details');
  };

  const handlePublishCourse = () => {
    setCourseData(prev => ({ ...prev, status: 'published' }));
    // Here you would typically make an API call to publish the course
    console.log('Publishing course');
  };

  const handleAddModule = () => {
    const newModule = {
      id: Date.now(),
      title: "New Module",
      duration: 0,
      lessons: []
    };
    setModulesData(prev => [...prev, newModule]);
  };

  const handleAddVideo = (moduleId) => {
    setSelectedModuleId(moduleId);
    setUploadModalType('video');
    setIsUploadModalOpen(true);
  };

  const handleAddQuiz = (moduleId) => {
    setSelectedModuleId(moduleId);
    setUploadModalType('quiz');
    setIsUploadModalOpen(true);
  };

  const handleEditContent = (type, content) => {
    console.log('Editing content:', type, content);
    // Here you would open an edit modal or navigate to edit page
  };

  const handleDeleteContent = (type, contentId) => {
    if (type === 'lesson') {
      setModulesData(prev => 
        prev?.map(module => ({
          ...module,
          lessons: module.lessons?.filter(lesson => lesson?.id !== contentId)
        }))
      );
    }
  };

  const handleReorderContent = (draggedItem, targetModuleId, targetIndex) => {
    console.log('Reordering content:', draggedItem, targetModuleId, targetIndex);
    // Here you would implement the reordering logic
  };

  const handleContentUpload = (uploadData) => {
    const newLesson = {
      id: Date.now(),
      title: uploadData?.title,
      type: uploadData?.type,
      duration: uploadData?.type === 'video' ? `${uploadData?.duration}:00` : `${uploadData?.questions?.length * 2} min`,
      status: uploadData?.status,
      views: 0,
      uploadDate: new Date()?.toISOString()?.split('T')?.[0]
    };

    setModulesData(prev => 
      prev?.map(module => 
        module.id === uploadData?.moduleId 
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module
      )
    );
  };

  const handleSendMessage = (studentIds) => {
    console.log('Sending message to students:', studentIds);
    // Here you would open a message composer or send notification
  };

  const handleViewStudentDetails = (student) => {
    console.log('Viewing student details:', student);
    // Here you would open student detail modal or navigate to student profile
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="teacher" userName="Sarah Johnson" />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Course Header */}
          <CourseHeader
            course={courseData}
            onSave={handleSaveCourse}
            onPreview={handlePreviewCourse}
            onPublish={handlePublishCourse}
            isEditing={isEditingCourse}
            onEditToggle={() => setIsEditingCourse(!isEditingCourse)}
          />

          {/* Tabs */}
          <div className="flex items-center space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === tab?.id
                    ? 'bg-background text-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'content' && (
              <ContentStructure
                modules={modulesData}
                onAddModule={handleAddModule}
                onAddVideo={handleAddVideo}
                onAddQuiz={handleAddQuiz}
                onEditContent={handleEditContent}
                onDeleteContent={handleDeleteContent}
                onReorderContent={handleReorderContent}
              />
            )}

            {activeTab === 'students' && (
              <StudentProgress
                students={studentsData}
                onSendMessage={handleSendMessage}
                onViewDetails={handleViewStudentDetails}
              />
            )}

            {activeTab === 'analytics' && (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium text-foreground mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed analytics and insights about your course performance will be displayed here.
                </p>
                <Button variant="outline" iconName="TrendingUp" iconPosition="left">
                  View Full Analytics
                </Button>
              </div>
            )}
          </div>

          {/* Quick Actions - Mobile */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            <div className="flex flex-col space-y-3">
              <Button
                variant="default"
                size="icon"
                onClick={() => handleAddVideo(1)}
                className="h-12 w-12 rounded-full shadow-lg"
              >
                <Icon name="Video" size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAddQuiz(1)}
                className="h-12 w-12 rounded-full shadow-lg bg-card"
              >
                <Icon name="FileQuestion" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Upload Modal */}
      <ContentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        type={uploadModalType}
        moduleId={selectedModuleId}
        onUpload={handleContentUpload}
      />
    </div>
  );
};

export default CourseManagement;