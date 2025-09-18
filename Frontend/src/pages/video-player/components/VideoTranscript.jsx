import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const VideoTranscript = ({ currentTime = 0, onSeekTo = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [highlightedSegments, setHighlightedSegments] = useState([]);
  const transcriptRef = useRef(null);

  const transcriptSegments = [
    {
      id: 1,
      startTime: 0,
      endTime: 15,
      text: "Welcome to this comprehensive tutorial on React Hooks. In this lesson, we'll explore the fundamental concepts that will revolutionize how you write React components."
    },
    {
      id: 2,
      startTime: 15,
      endTime: 35,
      text: "React Hooks were introduced in React 16.8 and they allow you to use state and other React features without writing a class component."
    },
    {
      id: 3,
      startTime: 35,
      endTime: 55,
      text: "The most commonly used hook is useState. This hook allows you to add state to functional components, making them much more powerful and flexible."
    },
    {
      id: 4,
      startTime: 55,
      endTime: 80,
      text: "Let's start with a simple example. When you call useState, it returns an array with two elements: the current state value and a function to update it."
    },
    {
      id: 5,
      startTime: 80,
      endTime: 105,
      text: "The syntax is straightforward: const [count, setCount] = useState(0). Here, count is our state variable and setCount is the function to update it."
    },
    {
      id: 6,
      startTime: 105,
      endTime: 130,
      text: "One important thing to remember is that the state setter function should always be used to update state. Never modify state directly."
    },
    {
      id: 7,
      startTime: 130,
      endTime: 155,
      text: "Next, let's talk about useEffect. This hook lets you perform side effects in functional components, similar to componentDidMount and componentDidUpdate combined."
    },
    {
      id: 8,
      startTime: 155,
      endTime: 180,
      text: "useEffect takes two arguments: a function that contains the side effect logic, and an optional dependency array that controls when the effect runs."
    },
    {
      id: 9,
      startTime: 180,
      endTime: 205,
      text: "If you don't provide a dependency array, the effect runs after every render. If you provide an empty array, it runs only once after the initial render."
    },
    {
      id: 10,
      startTime: 205,
      endTime: 230,
      text: "The cleanup function is crucial for preventing memory leaks. You can return a function from useEffect that will be called when the component unmounts."
    },
    {
      id: 11,
      startTime: 230,
      endTime: 255,
      text: "Custom hooks are another powerful feature. They allow you to extract component logic into reusable functions that can be shared across components."
    },
    {
      id: 12,
      startTime: 255,
      endTime: 280,
      text: "The naming convention for custom hooks is important - they should always start with \'use\'. This tells React that it\'s a hook and enables the rules of hooks."
    },
    {
      id: 13,
      startTime: 280,
      endTime: 305,
      text: "In the next section, we'll dive deeper into more advanced hooks like useContext, useReducer, and useMemo. These hooks provide even more powerful patterns for state management."
    },
    {
      id: 14,
      startTime: 305,
      endTime: 325,
      text: "Thank you for watching this introduction to React Hooks. Make sure to practice these concepts and experiment with different use cases to fully understand their power."
    }
  ];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getCurrentSegment = () => {
    return transcriptSegments?.find(segment => 
      currentTime >= segment?.startTime && currentTime < segment?.endTime
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term?.trim()) {
      setIsSearching(true);
      const matches = transcriptSegments?.filter(segment =>
        segment?.text?.toLowerCase()?.includes(term?.toLowerCase())
      );
      setHighlightedSegments(matches?.map(m => m?.id));
      setIsSearching(false);
    } else {
      setHighlightedSegments([]);
    }
  };

  const handleSegmentClick = (startTime) => {
    onSeekTo(startTime);
  };

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-warning/30 text-warning-foreground rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  // Auto-scroll to current segment
  useEffect(() => {
    const currentSegment = getCurrentSegment();
    if (currentSegment && transcriptRef?.current) {
      const segmentElement = transcriptRef?.current?.querySelector(`[data-segment-id="${currentSegment?.id}"]`);
      if (segmentElement) {
        segmentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime]);

  const currentSegment = getCurrentSegment();

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Transcript</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search transcript..."
            value={searchTerm}
            onChange={(e) => handleSearch(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Search Results Summary */}
        {searchTerm && highlightedSegments?.length > 0 && (
          <div className="mt-2 text-sm text-muted-foreground">
            Found {highlightedSegments?.length} result{highlightedSegments?.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      {/* Transcript Content */}
      <div ref={transcriptRef} className="max-h-96 overflow-y-auto">
        <div className="p-4 space-y-4">
          {transcriptSegments?.map((segment) => {
            const isCurrentSegment = currentSegment?.id === segment?.id;
            const isHighlighted = highlightedSegments?.includes(segment?.id);
            
            return (
              <div
                key={segment?.id}
                data-segment-id={segment?.id}
                className={`group p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  isCurrentSegment 
                    ? 'bg-primary/10 border-primary/30 shadow-soft' 
                    : isHighlighted
                    ? 'bg-warning/10 border-warning/30' :'bg-background border-border hover:border-primary/20 hover:bg-muted/50'
                }`}
                onClick={() => handleSegmentClick(segment?.startTime)}
              >
                <div className="flex items-start space-x-3">
                  <button className="flex-shrink-0 flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-300 mt-0.5">
                    <Icon name="Play" size={12} />
                    <span className="text-xs font-mono font-medium">
                      {formatTime(segment?.startTime)}
                    </span>
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isCurrentSegment ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>
                      {highlightSearchTerm(segment?.text, searchTerm)}
                    </p>
                  </div>

                  {isCurrentSegment && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {transcriptSegments?.length} segments
          </span>
          <span className="text-muted-foreground">
            Total duration: {formatTime(transcriptSegments?.[transcriptSegments?.length - 1]?.endTime || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoTranscript;