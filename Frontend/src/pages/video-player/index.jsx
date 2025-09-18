import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CourseProgressSidebar from '../../components/ui/CourseProgressSidebar';
import VideoPlayer from './components/VideoPlayer';
import VideoNotes from './components/VideoNotes';
import VideoTranscript from './components/VideoTranscript';
import RelatedContent from './components/RelatedContent';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VideoPlayerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isProgressSidebarOpen, setIsProgressSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  const [userRole] = useState('student');
  const [userName] = useState('John Doe');

  // Mock video data
  const videoData = {
    id: 1,
    title: "Introduction to React Hooks",
    description: "Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks. This comprehensive tutorial covers practical examples and best practices for modern React development. We'll explore how hooks revolutionize the way we write React components and make functional components more powerful than ever before.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "18:45",
    currentPosition: "05:30",
    progress: 30,
    course: {
      id: 1,
      title: "React Development Fundamentals",
      instructor: "Sarah Johnson",
      totalLessons: 24,
      completedLessons: 8
    },
    module: {
      id: 2,
      title: "Module 2: React Hooks",
      lessonNumber: 5,
      totalLessons: 12
    },
    isCompleted: false,
    hasNext: true,
    hasPrevious: true,
    nextVideo: { 
      id: 2, 
      title: "useEffect Hook Deep Dive",
      duration: "22:15"
    },
    previousVideo: { 
      id: 4, 
      title: "Component State Management",
      duration: "16:30"
    },
    captions: true,
    bookmarks: [
      { id: 1, time: 125, title: "useState Introduction" },
      { id: 2, time: 340, title: "useEffect Basics" },
      { id: 3, time: 567, title: "Custom Hooks" }
    ]
  };

  // Initialize current video
  useEffect(() => {
    // In a real app, this would fetch video data based on URL params
    const videoId = location?.state?.videoId || 1;
    setCurrentVideo(videoData);
  }, [location?.state]);

  // Custom breadcrumb items
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'Home' },
    { label: 'Courses', path: '/course-catalog', icon: 'BookOpen' },
    { label: currentVideo?.course?.title || 'Course', path: '/course-details', icon: 'Info' },
    { label: 'Video Player', path: '/video-player', icon: 'Play', isLast: true }
  ];

  // Event handlers
  const handleProgressUpdate = (progress) => {
    // Update video progress in backend
    console.log(`Video progress: ${progress}%`);
  };

  const handleVideoComplete = () => {
    if (currentVideo) {
      setCurrentVideo(prev => ({ ...prev, isCompleted: true }));
      // Update completion status in backend
      console.log('Video marked as complete');
    }
  };

  const handleNextVideo = () => {
    if (currentVideo?.hasNext) {
      // Navigate to next video
      navigate('/video-player', { 
        state: { videoId: currentVideo?.nextVideo?.id },
        replace: true 
      });
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideo?.hasPrevious) {
      // Navigate to previous video
      navigate('/video-player', { 
        state: { videoId: currentVideo?.previousVideo?.id },
        replace: true 
      });
    }
  };

  const handleSeekTo = (time) => {
    setCurrentTime(time);
    // This would integrate with the video player to seek to specific time
  };

  const handleLessonSelect = (lesson) => {
    // Navigate to selected lesson
    navigate('/video-player', { 
      state: { videoId: lesson?.id },
      replace: true 
    });
    setIsProgressSidebarOpen(false);
  };

  const tabs = [
    { id: 'notes', label: 'Notes', icon: 'FileText' },
    { id: 'transcript', label: 'Transcript', icon: 'MessageSquare' },
    { id: 'related', label: 'Related', icon: 'Grid3x3' }
  ];

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} userName={userName} />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading video...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName={userName} />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Video Section */}
            <div className="xl:col-span-3 space-y-6">
              {/* Video Player */}
              <VideoPlayer
                videoData={currentVideo}
                onProgressUpdate={handleProgressUpdate}
                onVideoComplete={handleVideoComplete}
                onNext={handleNextVideo}
                onPrevious={handlePreviousVideo}
              />

              {/* Mobile Course Progress Toggle */}
              <div className="xl:hidden">
                <Button
                  variant="outline"
                  onClick={() => setIsProgressSidebarOpen(true)}
                  iconName="List"
                  iconPosition="left"
                  fullWidth
                >
                  Course Progress ({currentVideo?.course?.completedLessons}/{currentVideo?.course?.totalLessons})
                </Button>
              </div>

              {/* Secondary Content Tabs */}
              <div className="bg-card rounded-lg border border-border shadow-soft">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <div className="flex overflow-x-auto">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${
                          activeTab === tab?.id
                            ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-0">
                  {activeTab === 'notes' && (
                    <div className="p-4">
                      <VideoNotes 
                        videoId={currentVideo?.id}
                        currentTime={currentTime}
                      />
                    </div>
                  )}
                  
                  {activeTab === 'transcript' && (
                    <div className="p-4">
                      <VideoTranscript 
                        currentTime={currentTime}
                        onSeekTo={handleSeekTo}
                      />
                    </div>
                  )}
                  
                  {activeTab === 'related' && (
                    <div className="p-4">
                      <RelatedContent 
                        courseId={currentVideo?.course?.id}
                        currentVideoId={currentVideo?.id}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Course Progress Sidebar */}
            <div className="hidden xl:block">
              <div className="sticky top-20">
                <div className="bg-card rounded-lg border border-border shadow-soft p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Course Progress</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate('/course-details')}
                      className="h-8 w-8"
                    >
                      <Icon name="ExternalLink" size={16} />
                    </Button>
                  </div>

                  {/* Course Info */}
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                      {currentVideo?.course?.title}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-mono text-foreground">
                          {Math.round((currentVideo?.course?.completedLessons / currentVideo?.course?.totalLessons) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(currentVideo?.course?.completedLessons / currentVideo?.course?.totalLessons) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{currentVideo?.course?.completedLessons} of {currentVideo?.course?.totalLessons} lessons</span>
                        <span>{currentVideo?.course?.totalLessons - currentVideo?.course?.completedLessons} remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* Current Module */}
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Play" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-primary">Currently Watching</span>
                    </div>
                    <h5 className="font-medium text-foreground text-sm mb-1">
                      {currentVideo?.module?.title}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      Lesson {currentVideo?.module?.lessonNumber} of {currentVideo?.module?.totalLessons}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/course-details')}
                      iconName="BookOpen"
                      iconPosition="left"
                      fullWidth
                    >
                      View Course Details
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/quiz-interface')}
                      iconName="FileQuestion"
                      iconPosition="left"
                      fullWidth
                    >
                      Take Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Course Progress Sidebar for Mobile */}
      <CourseProgressSidebar
        isOpen={isProgressSidebarOpen}
        onToggle={() => setIsProgressSidebarOpen(!isProgressSidebarOpen)}
        courseData={{
          title: currentVideo?.course?.title,
          progress: Math.round((currentVideo?.course?.completedLessons / currentVideo?.course?.totalLessons) * 100),
          totalLessons: currentVideo?.course?.totalLessons,
          completedLessons: currentVideo?.course?.completedLessons,
          modules: [
            {
              id: 1,
              title: "Getting Started",
              progress: 100,
              lessons: [
                { id: 1, title: "Course Introduction", duration: "5:30", completed: true, type: "video" },
                { id: 2, title: "Setup Environment", duration: "12:45", completed: true, type: "video" }
              ]
            },
            {
              id: 2,
              title: "React Hooks",
              progress: 60,
              lessons: [
                { id: 4, title: "Component State Management", duration: "16:30", completed: true, type: "video" },
                { id: 5, title: "Introduction to React Hooks", duration: "18:45", completed: false, type: "video" },
                { id: 6, title: "useEffect Hook Deep Dive", duration: "22:15", completed: false, type: "video" }
              ]
            }
          ]
        }}
        currentLessonId={currentVideo?.id}
        onLessonSelect={handleLessonSelect}
      />
    </div>
  );
};

export default VideoPlayerPage;