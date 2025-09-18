import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoData = null, 
  onProgressUpdate = () => {}, 
  onVideoComplete = () => {},
  onNext = () => {},
  onPrevious = () => {}
}) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('720p');
  const [showSettings, setShowSettings] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  const defaultVideoData = {
    id: 1,
    title: "Introduction to React Hooks",
    description: "Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks. This comprehensive tutorial covers practical examples and best practices for modern React development.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "18:45",
    currentPosition: "05:30",
    progress: 30,
    course: "React Development Fundamentals",
    module: "Module 2: React Hooks",
    lessonNumber: 5,
    totalLessons: 12,
    isCompleted: false,
    hasNext: true,
    hasPrevious: true,
    nextVideo: { id: 2, title: "useEffect Hook Deep Dive" },
    previousVideo: { id: 4, title: "Component State Management" },
    captions: true,
    transcript: `Welcome to this comprehensive tutorial on React Hooks.\n\nIn this lesson, we'll explore the fundamental concepts of React Hooks and how they revolutionize the way we write React components.\n\nWe'll start with useState, the most commonly used hook for managing component state.`
  };

  const video = videoData || defaultVideoData;

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const qualityOptions = ['360p', '480p', '720p', '1080p'];

  useEffect(() => {
    const videoElement = videoRef?.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement?.currentTime);
      const progress = (videoElement?.currentTime / videoElement?.duration) * 100;
      onProgressUpdate(progress);

      // Mark as complete when 90% watched
      if (progress >= 90 && !video?.isCompleted) {
        onVideoComplete();
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(videoElement?.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onVideoComplete();
    };

    videoElement?.addEventListener('timeupdate', handleTimeUpdate);
    videoElement?.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement?.addEventListener('ended', handleEnded);

    return () => {
      videoElement?.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement?.removeEventListener('ended', handleEnded);
    };
  }, [video?.isCompleted, onProgressUpdate, onVideoComplete]);

  const togglePlay = () => {
    const videoElement = videoRef?.current;
    if (isPlaying) {
      videoElement?.pause();
    } else {
      videoElement?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef?.current?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const videoElement = videoRef?.current;
    videoElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const changeQuality = (newQuality) => {
    setQuality(newQuality);
    setShowQualityMenu(false);
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef?.current?.parentElement;
    if (!isFullscreen) {
      if (videoContainer?.requestFullscreen) {
        videoContainer?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const skipTime = (seconds) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
      {/* Video Container */}
      <div 
        className="relative bg-black aspect-video group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={video?.videoUrl}
          poster="/assets/images/video-poster.jpg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Video Controls Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white border-2 border-white/20 hover:border-white/40 rounded-full"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
            </Button>
          </div>

          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-black/50 rounded px-2 py-1">
                <span className="text-white text-sm font-medium">{video?.course}</span>
              </div>
              <div className="bg-primary/90 rounded px-2 py-1">
                <span className="text-white text-xs font-medium">
                  {video?.lessonNumber}/{video?.totalLessons}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Settings Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <Icon name="Settings" size={18} />
                </Button>

                {showSettings && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-soft-lg z-50">
                    <div className="py-2">
                      {/* Speed Control */}
                      <div className="relative">
                        <button
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-300"
                        >
                          <span>Speed</span>
                          <div className="flex items-center space-x-1">
                            <span className="font-mono">{playbackRate}x</span>
                            <Icon name="ChevronRight" size={14} />
                          </div>
                        </button>

                        {showSpeedMenu && (
                          <div className="absolute left-full top-0 ml-1 w-20 bg-popover border border-border rounded-lg shadow-soft-lg">
                            <div className="py-1">
                              {playbackSpeeds?.map((speed) => (
                                <button
                                  key={speed}
                                  onClick={() => changePlaybackRate(speed)}
                                  className={`w-full px-3 py-1 text-sm text-left hover:bg-muted transition-colors duration-300 ${
                                    playbackRate === speed ? 'bg-primary text-primary-foreground' : 'text-popover-foreground'
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quality Control */}
                      <div className="relative">
                        <button
                          onClick={() => setShowQualityMenu(!showQualityMenu)}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-300"
                        >
                          <span>Quality</span>
                          <div className="flex items-center space-x-1">
                            <span className="font-mono">{quality}</span>
                            <Icon name="ChevronRight" size={14} />
                          </div>
                        </button>

                        {showQualityMenu && (
                          <div className="absolute left-full top-0 ml-1 w-20 bg-popover border border-border rounded-lg shadow-soft-lg">
                            <div className="py-1">
                              {qualityOptions?.map((q) => (
                                <button
                                  key={q}
                                  onClick={() => changeQuality(q)}
                                  className={`w-full px-3 py-1 text-sm text-left hover:bg-muted transition-colors duration-300 ${
                                    quality === q ? 'bg-primary text-primary-foreground' : 'text-popover-foreground'
                                  }`}
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-4 group/progress"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 group-hover/progress:h-1.5"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skipTime(-10)}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <Icon name="RotateCcw" size={18} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skipTime(10)}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <Icon name="RotateCw" size={18} />
                </Button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <Icon name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} size={18} />
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-full appearance-none slider"
                  />
                </div>

                <div className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="w-10 h-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Video Information */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">{video?.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{video?.duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="BookOpen" size={16} />
                <span>{video?.module}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>Lesson {video?.lessonNumber} of {video?.totalLessons}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {video?.isCompleted && (
              <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {video?.description}
        </p>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            {video?.hasPrevious && (
              <Button
                variant="outline"
                onClick={onPrevious}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous: {video?.previousVideo?.title}
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {!video?.isCompleted && (
              <Button
                variant="outline"
                onClick={onVideoComplete}
                iconName="Check"
                iconPosition="left"
              >
                Mark Complete
              </Button>
            )}

            {video?.hasNext && (
              <Button
                variant="default"
                onClick={onNext}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next: {video?.nextVideo?.title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;