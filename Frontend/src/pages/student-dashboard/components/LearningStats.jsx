import React from 'react';
import Icon from '../../../components/AppIcon';

const LearningStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Courses Enrolled',
      value: stats?.coursesEnrolled,
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Courses Completed',
      value: stats?.coursesCompleted,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Learning Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {statItems?.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">{item?.value}</p>
              <p className="text-sm text-muted-foreground">{item?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Overall Progress */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-mono text-foreground">{stats?.overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
            style={{ width: `${stats?.overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LearningStats;