import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Play';
      case 'quiz':
        return 'FileQuestion';
      case 'certificate':
        return 'Award';
      case 'enrollment':
        return 'BookOpen';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-primary bg-primary/10';
      case 'quiz':
        return 'text-accent bg-accent/10';
      case 'certificate':
        return 'text-warning bg-warning/10';
      case 'enrollment':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleActivityClick = (activity) => {
    switch (activity?.type) {
      case 'video': navigate('/video-player');
        break;
      case 'quiz': navigate('/quiz-interface');
        break;
      case 'certificate':
      case 'enrollment': navigate('/course-details');
        break;
      default:
        navigate('/student-dashboard');
    }
  };

  const handleViewAll = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          iconName="MoreHorizontal"
        />
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div 
            key={activity?.id}
            className="flex items-start space-x-4 p-3 hover:bg-muted/30 rounded-lg transition-colors duration-300 cursor-pointer group"
            onClick={() => handleActivityClick(activity)}
          >
            {/* Activity Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                {activity?.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity?.description}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-muted-foreground">{activity?.course}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
              </div>
            </div>

            {/* Activity Status */}
            {activity?.status && (
              <div className="flex-shrink-0">
                {activity?.status === 'completed' && (
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
                {activity?.status === 'in-progress' && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={12} className="text-white" />
                  </div>
                )}
                {activity?.status === 'pending' && (
                  <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                    <Icon name="AlertCircle" size={12} className="text-white" />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/video-player')}
            iconName="Play"
            iconPosition="left"
            className="justify-start"
          >
            Resume Video
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/quiz-interface')}
            iconName="FileQuestion"
            iconPosition="left"
            className="justify-start"
          >
            Take Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;