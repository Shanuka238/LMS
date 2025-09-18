import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudentProgress = ({ students, onSendMessage, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('progress');
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  const filteredStudents = students?.filter(student => 
      student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )?.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b?.progress - a?.progress;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'lastActive':
          return new Date(b.lastActive) - new Date(a.lastActive);
        case 'enrollDate':
          return new Date(b.enrollDate) - new Date(a.enrollDate);
        default:
          return 0;
      }
    });

  const toggleStudentSelection = (studentId) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected?.has(studentId)) {
      newSelected?.delete(studentId);
    } else {
      newSelected?.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const selectAllStudents = () => {
    if (selectedStudents?.size === filteredStudents?.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-primary';
    if (progress >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-muted text-muted-foreground border-border';
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Student Progress</h2>
          <p className="text-sm text-muted-foreground">
            {students?.length} students enrolled • {selectedStudents?.size} selected
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="search"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-64"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="progress">Sort by Progress</option>
            <option value="name">Sort by Name</option>
            <option value="lastActive">Sort by Last Active</option>
            <option value="enrollDate">Sort by Enroll Date</option>
          </select>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedStudents?.size > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border-b border-border">
          <span className="text-sm text-foreground">
            {selectedStudents?.size} student{selectedStudents?.size > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendMessage(Array.from(selectedStudents))}
              iconName="Mail"
              iconPosition="left"
            >
              Send Message
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStudents(new Set())}
              iconName="X"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
      {/* Students List */}
      <div className="divide-y divide-border">
        {/* Header Row */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground bg-muted/30">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={selectedStudents?.size === filteredStudents?.length && filteredStudents?.length > 0}
              onChange={selectAllStudents}
              className="rounded border-border"
            />
          </div>
          <div className="col-span-4">Student</div>
          <div className="col-span-2">Progress</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last Active</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Student Rows */}
        {filteredStudents?.map((student) => (
          <div key={student?.id} className="p-4 hover:bg-muted/30 transition-colors duration-300">
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={selectedStudents?.has(student?.id)}
                  onChange={() => toggleStudentSelection(student?.id)}
                  className="rounded border-border"
                />
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{student?.name}</p>
                  <p className="text-sm text-muted-foreground">{student?.email}</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(student?.progress)}`}
                      style={{ width: `${student?.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-foreground">{student?.progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {student?.completedLessons}/{student?.totalLessons} lessons
                </p>
              </div>
              <div className="col-span-2">
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student?.status)}`}>
                  {student?.status?.charAt(0)?.toUpperCase() + student?.status?.slice(1)}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-foreground">{getTimeAgo(student?.lastActive)}</p>
                <p className="text-xs text-muted-foreground">Enrolled {formatDate(student?.enrollDate)}</p>
              </div>
              <div className="col-span-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewDetails(student)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Eye" size={16} />
                </Button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents?.has(student?.id)}
                    onChange={() => toggleStudentSelection(student?.id)}
                    className="rounded border-border"
                  />
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{student?.name}</p>
                    <p className="text-sm text-muted-foreground">{student?.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewDetails(student)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Eye" size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(student?.progress)}`}
                        style={{ width: `${student?.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-foreground">{student?.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {student?.completedLessons}/{student?.totalLessons} lessons completed
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student?.status)}`}>
                  {student?.status?.charAt(0)?.toUpperCase() + student?.status?.slice(1)}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Last active: {getTimeAgo(student?.lastActive)}</span>
                <span>Enrolled: {formatDate(student?.enrollDate)}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredStudents?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'Students will appear here once they enroll'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;