import React from 'react';
import CourseCard from './CourseCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseGrid = ({ 
  courses = [], 
  loading = false, 
  userRole = 'student',
  onLoadMore = () => {},
  hasMore = false,
  currentPage = 1,
  totalPages = 1
}) => {
  
  if (loading && courses?.length === 0) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg shadow-soft overflow-hidden animate-pulse">
              <div className="h-48 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-8 bg-muted rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (courses?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
        </p>
        <Button variant="outline" iconName="RotateCcw" iconPosition="left">
          Reset Filters
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center flex-row">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {courses?.length?.toLocaleString()} Course{courses?.length !== 1 ? 's' : ''} Available
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
      {/* Course Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses?.map((course) => (
          <CourseCard
            key={course?.id}
            course={course}
            userRole={userRole}
          />
        ))}
      </div>
      {/* Load More / Pagination */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            iconName="ChevronDown"
            iconPosition="right"
            size="lg"
          >
            {loading ? 'Loading...' : 'Load More Courses'}
          </Button>
        </div>
      )}
      {/* Pagination Info */}
      {!hasMore && totalPages > 1 && (
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing all {courses?.length?.toLocaleString()} courses
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;