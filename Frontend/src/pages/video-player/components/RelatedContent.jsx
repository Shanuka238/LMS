import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RelatedContent = ({ courseId = 1, currentVideoId = 1 }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('videos');

  const relatedVideos = [
    {
      id: 2,
      title: "useEffect Hook Deep Dive",
      description: "Master the useEffect hook with practical examples and common patterns",
      duration: "22:15",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      isCompleted: false,
      difficulty: "Intermediate",
      views: "12.5k"
    },
    {
      id: 3,
      title: "Custom Hooks Patterns",
      description: "Learn to create reusable custom hooks for common use cases",
      duration: "18:30",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      isCompleted: false,
      difficulty: "Advanced",
      views: "8.2k"
    },
    {
      id: 4,
      title: "State Management with useReducer",
      description: "Complex state management using the useReducer hook",
      duration: "25:45",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
      isCompleted: true,
      difficulty: "Advanced",
      views: "15.1k"
    }
  ];

  const relatedQuizzes = [
    {
      id: 1,
      title: "React Hooks Fundamentals Quiz",
      description: "Test your understanding of useState and useEffect hooks",
      questions: 15,
      duration: "20 min",
      difficulty: "Beginner",
      attempts: 2,
      bestScore: 85,
      isCompleted: true
    },
    {
      id: 2,
      title: "Advanced Hooks Patterns",
      description: "Challenge yourself with complex hook scenarios",
      questions: 20,
      duration: "30 min",
      difficulty: "Advanced",
      attempts: 0,
      bestScore: null,
      isCompleted: false
    },
    {
      id: 3,
      title: "Custom Hooks Practice",
      description: "Apply your knowledge of custom hooks creation",
      questions: 12,
      duration: "15 min",
      difficulty: "Intermediate",
      attempts: 1,
      bestScore: 92,
      isCompleted: true
    }
  ];

  const supplementaryMaterials = [
    {
      id: 1,
      title: "React Hooks Cheat Sheet",
      type: "PDF",
      description: "Quick reference guide for all React hooks",
      size: "2.5 MB",
      downloadUrl: "#",
      icon: "FileText"
    },
    {
      id: 2,
      title: "Hook Examples Repository",
      type: "GitHub",
      description: "Complete code examples from this lesson",
      size: "15 files",
      downloadUrl: "#",
      icon: "Github"
    },
    {
      id: 3,
      title: "Interactive Hook Playground",
      type: "CodeSandbox",
      description: "Practice hooks in an interactive environment",
      size: "Online",
      downloadUrl: "#",
      icon: "Code"
    },
    {
      id: 4,
      title: "Hooks Best Practices Guide",
      type: "Article",
      description: "Industry best practices for using React hooks",
      size: "8 min read",
      downloadUrl: "#",
      icon: "BookOpen"
    }
  ];

  const handleVideoClick = (videoId) => {
    // In a real app, this would update the current video
    console.log(`Switching to video ${videoId}`);
  };

  const handleQuizClick = (quizId) => {
    navigate('/quiz-interface', { state: { quizId } });
  };

  const handleResourceClick = (resourceUrl) => {
    window.open(resourceUrl, '_blank');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const tabs = [
    { id: 'videos', label: 'Related Videos', icon: 'Play', count: relatedVideos?.length },
    { id: 'quizzes', label: 'Quizzes', icon: 'FileQuestion', count: relatedQuizzes?.length },
    { id: 'resources', label: 'Resources', icon: 'Download', count: supplementaryMaterials?.length }
  ];

  return (
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
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab?.id ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {/* Related Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Up Next</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/course-details')}
                iconName="ExternalLink"
                iconPosition="right"
              >
                View All
              </Button>
            </div>

            {relatedVideos?.map((video) => (
              <div
                key={video?.id}
                className="group flex space-x-4 p-3 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/50 transition-all duration-300 cursor-pointer"
                onClick={() => handleVideoClick(video?.id)}
              >
                <div className="relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={video?.thumbnail}
                    alt={video?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-primary/80 transition-colors duration-300">
                      <Icon name="Play" size={14} color="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {video?.duration}
                  </div>
                  {video?.isCompleted && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-1">
                    {video?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {video?.description}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(video?.difficulty)}`}>
                      {video?.difficulty}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{video?.views}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Practice Quizzes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/quiz-interface')}
                iconName="ExternalLink"
                iconPosition="right"
              >
                View All
              </Button>
            </div>

            {relatedQuizzes?.map((quiz) => (
              <div
                key={quiz?.id}
                className="group p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{quiz?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{quiz?.description}</p>
                  </div>
                  {quiz?.isCompleted && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="FileQuestion" size={14} />
                      <span>{quiz?.questions} questions</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{quiz?.duration}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz?.difficulty)}`}>
                      {quiz?.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {quiz?.bestScore && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Best: </span>
                        <span className="font-mono font-medium text-foreground">{quiz?.bestScore}%</span>
                      </div>
                    )}
                    <Button
                      variant={quiz?.isCompleted ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleQuizClick(quiz?.id)}
                      iconName={quiz?.isCompleted ? "RotateCcw" : "Play"}
                      iconPosition="left"
                    >
                      {quiz?.isCompleted ? "Retake" : "Start Quiz"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Supplementary Materials</h3>
            </div>

            {supplementaryMaterials?.map((resource) => (
              <div
                key={resource?.id}
                className="group flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={resource?.icon} size={20} className="text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{resource?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{resource?.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded-full font-medium">
                      {resource?.type}
                    </span>
                    <span>{resource?.size}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResourceClick(resource?.downloadUrl)}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedContent;