import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VideoNotes = ({ videoId = 1, currentTime = 0 }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      timestamp: 125,
      content: "Important concept about useState hook - remember to always use the setter function",
      createdAt: new Date(Date.now() - 3600000),
      isBookmark: true
    },
    {
      id: 2,
      timestamp: 340,
      content: "useEffect cleanup function is crucial for preventing memory leaks",
      createdAt: new Date(Date.now() - 1800000),
      isBookmark: false
    },
    {
      id: 3,
      timestamp: 567,
      content: "Custom hooks naming convention - always start with \'use'",
      createdAt: new Date(Date.now() - 900000),
      isBookmark: true
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const formatTimestamp = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      const note = {
        id: Date.now(),
        timestamp: Math.floor(currentTime),
        content: newNote?.trim(),
        createdAt: new Date(),
        isBookmark: false
      };
      setNotes([note, ...notes]);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes?.filter(note => note?.id !== noteId));
  };

  const toggleBookmark = (noteId) => {
    setNotes(notes?.map(note => 
      note?.id === noteId ? { ...note, isBookmark: !note?.isBookmark } : note
    ));
  };

  const handleJumpToTime = (timestamp) => {
    // This would integrate with the video player to jump to specific time
    console.log(`Jumping to ${timestamp} seconds`);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Video Notes</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingNote(!isAddingNote)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Note
          </Button>
        </div>

        {/* Add Note Form */}
        {isAddingNote && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>At {formatTimestamp(currentTime)}</span>
            </div>
            <Input
              type="text"
              placeholder="Add your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e?.target?.value)}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleAddNote}
                disabled={!newNote?.trim()}
              >
                Save Note
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Notes List */}
      <div className="max-h-96 overflow-y-auto">
        {notes?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notes yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add notes to remember important points from this video
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {notes?.map((note) => (
              <div
                key={note?.id}
                className="group p-4 bg-background rounded-lg border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <button
                    onClick={() => handleJumpToTime(note?.timestamp)}
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    <Icon name="Play" size={14} />
                    <span className="text-sm font-mono font-medium">
                      {formatTimestamp(note?.timestamp)}
                    </span>
                  </button>

                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(note?.id)}
                      className="h-8 w-8"
                    >
                      <Icon 
                        name={note?.isBookmark ? "Bookmark" : "BookmarkPlus"} 
                        size={14} 
                        className={note?.isBookmark ? "text-warning" : "text-muted-foreground"}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteNote(note?.id)}
                      className="h-8 w-8 text-error hover:text-error/80"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>

                <p className="text-foreground text-sm leading-relaxed mb-2">
                  {note?.content}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(note?.createdAt)}
                  </span>
                  {note?.isBookmark && (
                    <div className="flex items-center space-x-1 text-warning">
                      <Icon name="Bookmark" size={12} />
                      <span className="text-xs font-medium">Bookmarked</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Notes Summary */}
      {notes?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {notes?.length} note{notes?.length !== 1 ? 's' : ''}
            </span>
            <span className="text-muted-foreground">
              {notes?.filter(note => note?.isBookmark)?.length} bookmarked
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoNotes;