 import React, { useState, useRef, useEffect } from 'react';

function SongUploadPlayer() {
  const [uploadedSongs, setUploadedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          
          // Create audio URL and add to songs list
          const audioUrl = URL.createObjectURL(file);
          const newSong = {
            id: Date.now(),
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
            file: file,
            url: audioUrl,
            size: (file.size / (1024 * 1024)).toFixed(2), // Size in MB
            duration: 0,
            uploadDate: new Date().toLocaleDateString()
          };
          
          setUploadedSongs(prev => [...prev, newSong]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Play selected song
  const playSong = (song) => {
    if (currentSong?.id === song.id && isPlaying) {
      // Pause current song
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play new song
      setCurrentSong(song);
      if (audioRef.current) {
        audioRef.current.src = song.url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Audio control functions
  const togglePlayPause = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const deleteSong = (songId) => {
    setUploadedSongs(prev => prev.filter(song => song.id !== songId));
    if (currentSong?.id === songId) {
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (size) => {
    return `${size} MB`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🎵 Music Player & Uploader</h1>
        <p className="text-gray-600">Upload your favorite songs and play them online</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload New Song</h2>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          
          {!isUploading ? (
            <div>
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Drag & Drop your audio file here
              </h3>
              <p className="text-gray-500 mb-4">or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Choose Audio File
              </button>
              <p className="text-sm text-gray-400 mt-4">
                Supports MP3, WAV, OGG, M4A files
              </p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Uploading...</h3>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-600">{uploadProgress}% complete</p>
            </div>
          )}
        </div>
      </div>

      {/* Current Player */}
      {currentSong && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Now Playing</h2>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl text-white">
              🎵
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{currentSong.name}</h3>
              <p className="text-gray-600">Size: {formatFileSize(currentSong.size)}</p>
            </div>
          </div>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-gray-600 w-12">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-600 w-12">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl transition-colors"
            >
              ⏪
            </button>
            
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <button
              onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl transition-colors"
            >
              ⏩
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-600">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600 w-8">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}

      {/* Songs List */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Music Library ({uploadedSongs.length})</h2>
        
        {uploadedSongs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-xl">No songs uploaded yet</p>
            <p>Upload your first song to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {uploadedSongs.map((song) => (
              <div
                key={song.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-md ${
                  currentSong?.id === song.id 
                    ? 'bg-blue-50 border-2 border-blue-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {/* Song Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                  currentSong?.id === song.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentSong?.id === song.id && isPlaying ? '🎵' : '🎶'}
                </div>

                {/* Song Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{song.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Size: {formatFileSize(song.size)}</span>
                    <span>Uploaded: {song.uploadDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playSong(song)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentSong?.id === song.id && isPlaying
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {currentSong?.id === song.id && isPlaying ? 'Pause' : 'Play'}
                  </button>
                  
                  <button
                    onClick={() => deleteSong(song.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 rounded-r-xl p-6 mt-8">
        <h4 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
          💡 How to Use
        </h4>
        <div className="text-blue-700 space-y-2">
          <p>• Click "Choose Audio File" to upload songs from your device</p>
          <p>• Supported formats: MP3, WAV, OGG, M4A</p>
          <p>• Click "Play" on any song to start listening</p>
          <p>• Use the progress bar to seek through songs</p>
          <p>• Adjust volume with the volume slider</p>
          <p>• Delete songs you no longer want</p>
        </div>
      </div>
    </div>
  );
}

export default SongUploadPlayer;


