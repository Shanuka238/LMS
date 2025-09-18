import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentUploadModal = ({ 
  isOpen, 
  onClose, 
  type, 
  moduleId, 
  onUpload 
}) => {
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null,
    duration: '',
    status: 'draft',
    allowDownload: false,
    autoPlay: false,
    questions: []
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'hidden', label: 'Hidden' }
  ];

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'true-false', label: 'True/False' },
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'essay', label: 'Essay' }
  ];

  const handleInputChange = (field, value) => {
    setUploadData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (file) => {
    setUploadData(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelect(e?.target?.files?.[0]);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    };
    setUploadData(prev => ({
      ...prev,
      questions: [...prev?.questions, newQuestion]
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setUploadData(prev => ({
      ...prev,
      questions: prev?.questions?.map(q => 
        q?.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const removeQuestion = (questionId) => {
    setUploadData(prev => ({
      ...prev,
      questions: prev?.questions?.filter(q => q?.id !== questionId)
    }));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpload({
            ...uploadData,
            moduleId,
            type,
            id: Date.now()
          });
          onClose();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetForm = () => {
    setUploadData({
      title: '',
      description: '',
      file: null,
      duration: '',
      status: 'draft',
      allowDownload: false,
      autoPlay: false,
      questions: []
    });
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {type === 'video' ? 'Upload Video' : 'Create Quiz'}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <Input
              label="Title"
              value={uploadData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              placeholder={`Enter ${type} title`}
              required
            />
            
            <Input
              label="Description"
              value={uploadData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder={`Enter ${type} description`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Status"
                options={statusOptions}
                value={uploadData?.status}
                onChange={(value) => handleInputChange('status', value)}
              />
              
              {type === 'video' && (
                <Input
                  label="Duration (minutes)"
                  type="number"
                  value={uploadData?.duration}
                  onChange={(e) => handleInputChange('duration', e?.target?.value)}
                  placeholder="0"
                />
              )}
            </div>
          </div>

          {/* File Upload for Video */}
          {type === 'video' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">Video File</label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
                  dragActive 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadData?.file ? (
                  <div className="space-y-2">
                    <Icon name="FileVideo" size={32} className="mx-auto text-primary" />
                    <p className="font-medium text-foreground">{uploadData?.file?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadData?.file?.size / (1024 * 1024))?.toFixed(2)} MB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileSelect(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Icon name="Upload" size={32} className="mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-foreground font-medium">Drop your video file here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileInput}
                      className="hidden"
                      id="video-upload"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('video-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              {/* Video Options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowDownload"
                    checked={uploadData?.allowDownload}
                    onChange={(e) => handleInputChange('allowDownload', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <label htmlFor="allowDownload" className="text-sm text-foreground">
                    Allow students to download this video
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoPlay"
                    checked={uploadData?.autoPlay}
                    onChange={(e) => handleInputChange('autoPlay', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <label htmlFor="autoPlay" className="text-sm text-foreground">
                    Auto-play next video
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Questions */}
          {type === 'quiz' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Questions</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addQuestion}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Question
                </Button>
              </div>

              {uploadData?.questions?.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-border rounded-lg">
                  <Icon name="FileQuestion" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No questions added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadData?.questions?.map((question, index) => (
                    <div key={question?.id} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">Question {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(question?.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-error"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      
                      <Select
                        label="Question Type"
                        options={questionTypes}
                        value={question?.type}
                        onChange={(value) => updateQuestion(question?.id, 'type', value)}
                      />
                      
                      <Input
                        label="Question"
                        value={question?.question}
                        onChange={(e) => updateQuestion(question?.id, 'question', e?.target?.value)}
                        placeholder="Enter your question"
                      />

                      {question?.type === 'multiple-choice' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Options</label>
                          {question?.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${question?.id}`}
                                checked={question?.correctAnswer === optionIndex}
                                onChange={() => updateQuestion(question?.id, 'correctAnswer', optionIndex)}
                                className="text-primary"
                              />
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...question?.options];
                                  newOptions[optionIndex] = e?.target?.value;
                                  updateQuestion(question?.id, 'options', newOptions);
                                }}
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Uploading...</span>
                <span className="font-mono text-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={handleClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleUpload}
            disabled={!uploadData?.title || isUploading || (type === 'video' && !uploadData?.file)}
            loading={isUploading}
          >
            {type === 'video' ? 'Upload Video' : 'Create Quiz'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentUploadModal;