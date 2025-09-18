import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentStructure = ({ 
  modules, 
  onAddModule, 
  onAddVideo, 
  onAddQuiz, 
  onEditContent, 
  onDeleteContent,
  onReorderContent 
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set([1]));
  const [draggedItem, setDraggedItem] = useState(null);

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded?.has(moduleId)) {
      newExpanded?.delete(moduleId);
    } else {
      newExpanded?.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleDragStart = (e, item, moduleId) => {
    setDraggedItem({ ...item, moduleId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetModuleId, targetIndex) => {
    e?.preventDefault();
    if (draggedItem) {
      onReorderContent(draggedItem, targetModuleId, targetIndex);
      setDraggedItem(null);
    }
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Play';
      case 'quiz':
        return 'FileQuestion';
      case 'reading':
        return 'BookOpen';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-success';
      case 'draft':
        return 'text-warning';
      case 'hidden':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Course Content</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onAddModule} iconName="Plus" iconPosition="left">
            Add Module
          </Button>
        </div>
      </div>
      {/* Content Tree */}
      <div className="p-4 space-y-4">
        {modules?.map((module, moduleIndex) => (
          <div key={module.id} className="border border-border rounded-lg">
            {/* Module Header */}
            <div className="flex items-center justify-between p-4 bg-muted/50">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="p-1 hover:bg-background rounded transition-colors duration-300"
                >
                  <Icon 
                    name={expandedModules?.has(module.id) ? "ChevronDown" : "ChevronRight"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </button>
                <div>
                  <h3 className="font-medium text-foreground">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {module.lessons?.length} lessons • {module.duration} min
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddVideo(module.id)}
                  iconName="Video"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Add Video
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddQuiz(module.id)}
                  iconName="FileQuestion"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Add Quiz
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditContent('module', module)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Edit" size={16} />
                </Button>
              </div>
            </div>

            {/* Module Content */}
            {expandedModules?.has(module.id) && (
              <div className="border-t border-border">
                {module.lessons?.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Icon name="Plus" size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No content added yet</p>
                    <p className="text-sm">Add videos or quizzes to get started</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {module.lessons?.map((lesson, lessonIndex) => (
                      <div
                        key={lesson?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lesson, module.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, module.id, lessonIndex)}
                        className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors duration-300 cursor-move group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name="GripVertical" size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            lesson?.type === 'video' ? 'bg-primary/10' : 'bg-accent/10'
                          }`}>
                            <Icon 
                              name={getContentIcon(lesson?.type)} 
                              size={16} 
                              className={lesson?.type === 'video' ? 'text-primary' : 'text-accent'}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-foreground">{lesson?.title}</h4>
                              <Icon 
                                name={lesson?.status === 'published' ? 'Eye' : lesson?.status === 'draft' ? 'Edit' : 'EyeOff'} 
                                size={14} 
                                className={getStatusColor(lesson?.status)}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {lesson?.duration} • {lesson?.views || 0} views
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditContent('lesson', lesson)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteContent('lesson', lesson?.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-error"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {modules?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No modules created yet</h3>
            <p className="text-muted-foreground mb-4">Start building your course by adding your first module</p>
            <Button variant="default" onClick={onAddModule} iconName="Plus" iconPosition="left">
              Create First Module
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentStructure;