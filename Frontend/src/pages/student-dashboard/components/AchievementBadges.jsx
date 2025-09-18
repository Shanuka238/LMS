import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const getBadgeIcon = (type) => {
    switch (type) {
      case 'first-course':
        return 'BookOpen';
      case 'quiz-master':
        return 'Brain';
      case 'speed-learner':
        return 'Zap';
      case 'consistent-learner':
        return 'Calendar';
      case 'video-champion':
        return 'Play';
      case 'certificate-collector':
        return 'Award';
      default:
        return 'Trophy';
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'first-course':
        return 'from-blue-400 to-blue-600';
      case 'quiz-master':
        return 'from-purple-400 to-purple-600';
      case 'speed-learner':
        return 'from-yellow-400 to-orange-500';
      case 'consistent-learner':
        return 'from-green-400 to-green-600';
      case 'video-champion':
        return 'from-red-400 to-red-600';
      case 'certificate-collector':
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Achievement Badges</h2>
      {achievements?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No achievements yet</p>
          <p className="text-sm text-muted-foreground mt-1">Complete courses and quizzes to earn badges!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements?.map((achievement) => (
            <div 
              key={achievement?.id}
              className="group relative"
            >
              {/* Badge */}
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${getBadgeColor(achievement?.type)} flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all duration-300 group-hover:scale-105`}>
                <Icon 
                  name={getBadgeIcon(achievement?.type)} 
                  size={28} 
                  className="text-white drop-shadow-sm" 
                />
              </div>

              {/* Badge Info */}
              <div className="text-center mt-3">
                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                  {achievement?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement?.earnedDate}
                </p>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-soft-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-48">
                <p className="text-sm font-medium text-popover-foreground">
                  {achievement?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement?.description}
                </p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Progress to Next Achievement */}
      {achievements?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Next Achievement</h3>
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center opacity-50">
              <Icon name="Target" size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Course Completionist</p>
              <p className="text-xs text-muted-foreground">Complete 5 courses</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">3 of 5 courses completed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;