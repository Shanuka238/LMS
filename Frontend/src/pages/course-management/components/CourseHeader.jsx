import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CourseHeader = ({ 
  course, 
  onSave, 
  onPreview, 
  onPublish, 
  isEditing, 
  onEditToggle 
}) => {
  const [editedCourse, setEditedCourse] = useState(course);

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleInputChange = (field, value) => {
    setEditedCourse(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(editedCourse);
    onEditToggle();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success/10 text-success border-success/20';
      case 'draft':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'archived':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Course Info */}
        <div className="flex-1 space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Course Title"
                value={editedCourse?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                placeholder="Enter course title"
              />
              <Input
                label="Course Description"
                value={editedCourse?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Enter course description"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Status"
                  options={statusOptions}
                  value={editedCourse?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
                <Select
                  label="Difficulty Level"
                  options={difficultyOptions}
                  value={editedCourse?.difficulty}
                  onChange={(value) => handleInputChange('difficulty', value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Price (USD)"
                  type="number"
                  value={editedCourse?.price}
                  onChange={(e) => handleInputChange('price', e?.target?.value)}
                  placeholder="0.00"
                />
                <Input
                  label="Estimated Duration (hours)"
                  type="number"
                  value={editedCourse?.duration}
                  onChange={(e) => handleInputChange('duration', e?.target?.value)}
                  placeholder="0"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{course?.title}</h1>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(course?.status)}`}>
                  {course?.status?.charAt(0)?.toUpperCase() + course?.status?.slice(1)}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{course?.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  <span>{course?.enrolledStudents} students enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>{course?.duration} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="BarChart3" size={16} />
                  <span>{course?.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="DollarSign" size={16} />
                  <span>${course?.price}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
          {isEditing ? (
            <>
              <Button variant="default" onClick={handleSave} iconName="Save" iconPosition="left">
                Save Changes
              </Button>
              <Button variant="outline" onClick={onEditToggle} iconName="X" iconPosition="left">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="default" onClick={onEditToggle} iconName="Edit" iconPosition="left">
                Edit Course
              </Button>
              <Button variant="outline" onClick={onPreview} iconName="Eye" iconPosition="left">
                Preview
              </Button>
              {course?.status === 'draft' && (
                <Button variant="success" onClick={onPublish} iconName="Upload" iconPosition="left">
                  Publish
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground font-mono">{course?.totalLessons}</div>
          <div className="text-sm text-muted-foreground">Total Lessons</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground font-mono">{course?.completionRate}%</div>
          <div className="text-sm text-muted-foreground">Completion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground font-mono">{course?.averageRating}</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground font-mono">{course?.totalRevenue}</div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;