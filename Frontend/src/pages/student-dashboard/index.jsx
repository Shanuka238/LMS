import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CourseCard from './components/CourseCard';
import LearningStats from './components/LearningStats';
import RecentActivity from './components/RecentActivity';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const [currentUser] = useState({});
  const enrolledCourses = [];
  const learningStats = {};
  const recentActivity = [];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={currentUser?.role} 
        userName={currentUser?.name}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Welcome back, {currentUser?.name}! 👋
                  </h1>
                  <p className="text-muted-foreground">
                    Continue your learning journey. You're doing great!
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="GraduationCap" size={32} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Action Menu removed */}
              {/* Enrolled Courses Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
                  <Button
                    variant="outline"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => window.location.href = '/course-catalog'}
                  >
                    Browse Courses
                  </Button>
                </div>
                {/* Course Cards Grid */}
                <div className={enrolledCourses?.length === 0 ? "flex justify-center items-center w-full min-h-[200px]" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                  {enrolledCourses?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Icon name="BookOpen" size={40} className="mb-4 text-primary" />
                      <span className="text-lg font-semibold text-muted-foreground mb-2">No enrolled courses</span>
                      <span className="text-sm text-muted-foreground mb-4">You haven't enrolled in any courses yet.</span>
                      <Button
                        variant="default"
                        iconName="Plus"
                        iconPosition="left"
                        onClick={() => window.location.href = '/course-catalog'}
                        className="mt-2"
                      >
                        Browse Courses
                      </Button>
                    </div>
                  ) : (
                    enrolledCourses.map((course) => (
                      <CourseCard key={course?.id} course={course} />
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Learning Statistics */}
              <LearningStats stats={{
                coursesEnrolled: enrolledCourses?.length || 0,
                coursesCompleted: enrolledCourses?.filter(c => c?.completed)?.length || 0,
                overallProgress: learningStats?.overallProgress || 0
              }} />
              {/* Recent Activity */}
              {recentActivity?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 bg-card rounded-lg border border-border">
                  <Icon name="Clock" size={32} className="mb-3 text-muted-foreground" />
                  <span className="text-lg font-semibold text-muted-foreground mb-1">No recent activities</span>
                  <span className="text-sm text-muted-foreground">You have no recent activity yet.</span>
                </div>
              ) : (
                <RecentActivity activities={recentActivity} />
              )}
            </div>
          </div>
          {/* Mobile-Optimized Bottom Section */}
          <div className="lg:hidden mt-8 space-y-6">
            {/* Mobile Stats Summary */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary font-mono">{learningStats?.coursesEnrolled}</p>
                  <p className="text-sm text-muted-foreground">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent font-mono">{learningStats?.overallProgress}%</p>
                  <p className="text-sm text-muted-foreground">Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;