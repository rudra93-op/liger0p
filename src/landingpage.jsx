 import React, { useState, useRef } from 'react';
import { Play, Music, Users, Award, Star, Check, Menu, X, Upload, Pause, Volume2, Home, Settings, LogOut, Link, MessageCircle, Send } from 'lucide-react';

export default function AarohAILandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Feedback states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    liked: '',
    confused: '',
    suggestions: ''
  });
  
  // Upload page states
  const [uploadedSong, setUploadedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chords, setChords] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [onlineUrl, setOnlineUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // Feedback handlers
  const handleFeedbackChange = (field, value) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedbackData);
    alert('Thank you for your feedback! We appreciate your input.');
    setShowFeedbackModal(false);
    setFeedbackData({
      rating: 0,
      liked: '',
      confused: '',
      suggestions: ''
    });
  };

  // Feedback Modal Component
  const FeedbackModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="px-8 pt-8 pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Session Feedback</h2>
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Accuracy Display */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">94%</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Accuracy - 94%</h3>
            <p className="text-gray-600">Great job! You're improving steadily.</p>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How would you rate this session?
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleFeedbackChange('rating', star)}
                  className={`w-10 h-10 rounded-full transition-colors ${
                    star <= feedbackData.rating 
                      ? 'text-yellow-400 hover:text-yellow-500' 
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* What did you like? */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What did you like?
            </label>
            <textarea
              value={feedbackData.liked}
              onChange={(e) => handleFeedbackChange('liked', e.target.value)}
              placeholder="Tell us what you enjoyed about this session..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900"
              rows="3"
            />
          </div>

          {/* What confused you? */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What confused you?
            </label>
            <textarea
              value={feedbackData.confused}
              onChange={(e) => handleFeedbackChange('confused', e.target.value)}
              placeholder="Let us know if anything was unclear or confusing..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900"
              rows="3"
            />
          </div>

          {/* Additional suggestions */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Any suggestions for improvement?
            </label>
            <textarea
              value={feedbackData.suggestions}
              onChange={(e) => handleFeedbackChange('suggestions', e.target.value)}
              placeholder="Share your ideas to help us improve..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleFeedbackSubmit}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Guitar tablature data
  const guitarTab = {
    strings: ['E', 'B', 'G', 'D', 'A', 'E'],
    frets: [
      { beat: 1, notes: [{ string: 0, fret: 5 }, { string: 1, fret: 3 }] },
      { beat: 2, notes: [{ string: 2, fret: 3 }, { string: 3, fret: 1 }] },
      { beat: 3, notes: [{ string: 4, fret: 2 }, { string: 5, fret: 0 }] },
      { beat: 4, notes: [{ string: 1, fret: 4 }, { string: 2, fret: 0 }] },
      { beat: 5, notes: [{ string: 0, fret: 5 }, { string: 3, fret: 2 }] },
      { beat: 6, notes: [{ string: 2, fret: 2 }] },
      { beat: 7, notes: [{ string: 1, fret: 3 }] },
      { beat: 8, notes: [{ string: 4, fret: 0 }] },
      { beat: 9, notes: [{ string: 0, fret: 2 }] },
      { beat: 10, notes: [{ string: 5, fret: 2 }] },
      { beat: 11, notes: [{ string: 2, fret: 1 }] },
      { beat: 12, notes: [{ string: 1, fret: 0 }] }
    ]
  };

  const sampleChords = [
    { chord: 'G', time: 0, duration: 2 },
    { chord: 'A', time: 2, duration: 2 },
    { chord: 'C', time: 4, duration: 2 },
    { chord: 'G', time: 6, duration: 2 }
  ];

  // All your existing functions remain the same...
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setUploadedSong({
        name: file.name,
        url: url,
        file: file,
        type: 'file'
      });
      setIsAnalyzing(true);
      setShowUrlInput(false);
      
      setTimeout(() => {
        setChords(sampleChords);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const handleUrlSubmit = () => {
    if (onlineUrl.trim()) {
      setUploadedSong({
        name: 'Online Song',
        url: onlineUrl,
        type: 'url'
      });
      setIsAnalyzing(true);
      setShowUrlInput(false);
      
      setTimeout(() => {
        setChords(sampleChords);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      const newBeat = Math.floor(currentTime * 2) + 1;
      setCurrentBeat(newBeat);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const getCurrentChord = () => {
    return chords.find(chord => 
      currentTime >= chord.time && currentTime < chord.time + chord.duration
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    setCurrentUser({
      name: formData.fullName || 'User',
      email: formData.email
    });
    setIsAuthenticated(true);
    setShowAuthModal(false);
    
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    setCurrentUser({
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`
    });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUploadedSong(null);
    setChords([]);
    setIsPlaying(false);
  };

  // Guitar Tab Component
  const GuitarTab = () => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">🎸 Guitar Tab Live!</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlayPause}
              className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <span className="text-sm text-gray-600">Tempo: 0.5x</span>
            <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">1x</button>
            <span className="text-sm text-gray-600">1.5x</span>
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg p-4 overflow-x-auto">
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 transition-all duration-100"
            style={{ left: `${20 + (currentBeat - 1) * 40}px` }}
          ></div>
          
          <div className="relative" style={{ minWidth: '600px', height: '300px' }}>
            <div className="flex absolute bottom-0 left-5 right-0">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="w-10 text-center text-xs text-gray-600">
                  {i + 1}
                </div>
              ))}
            </div>

            {guitarTab.strings.map((string, stringIndex) => (
              <div key={stringIndex} className="relative mb-8">
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-700">
                  {string}
                </div>
                
                <div className="h-0.5 bg-gray-400 relative">
                  {guitarTab.frets.map((fret, beatIndex) => {
                    const note = fret.notes.find(n => n.string === stringIndex);
                    if (!note) return null;
                    
                    const isActive = currentBeat === fret.beat;
                    
                    return (
                      <div
                        key={beatIndex}
                        className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-200 ${
                          isActive 
                            ? 'bg-red-500 scale-125 shadow-lg' 
                            : note.fret === 0 
                              ? 'bg-blue-500' 
                              : stringIndex < 2 
                                ? 'bg-red-400'
                                : stringIndex < 4
                                  ? 'bg-orange-500'
                                  : 'bg-green-500'
                        }`}
                        style={{ left: `${(fret.beat - 1) * 40}px` }}
                      >
                        {note.fret}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Guitar Tab Live!</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            🎵 Audio converted to guitar tablature - 0 notes detected
          </p>
          <p className="text-sm text-orange-600 mt-1">
            🎸 Current notes: {getCurrentChord()?.chord || 'G(3), A(5), C(1)'}
          </p>
          <p className="text-sm text-yellow-600 mt-1">
            ⚡ Playing at 1x speed on 6-string guitar
          </p>
          <p className="text-sm text-blue-600 mt-1">
            🎯 Press frets when notes reach the red line!
          </p>
        </div>
      </div>
    );
  };

  const features = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "Upload Any Song",
      description: "Upload your own MP3 song and learn to play them at your own pace. No limitations on what you can learn."
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Automatic Chord Detection",
      description: "Our AI automatically detects chords and creates a visual timeline, making it easy to follow along."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-time Feedback",
      description: "Get instant feedback on your chord transitions and strumming accuracy as you play along."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Scrolling UI",
      description: "Play along with our intuitive scrolling interface that's perfectly synced to the song's tempo."
    }
  ];

  const testimonials = [
    {
      name: "Upload Your Song",
      role: "Upload your own MP3 song and let our AI analyze it.",
      content: "AAROH AI made learning guitar so much easier! The AI feedback is incredibly accurate.",
      rating: 5
    },
    {
      name: "Play Along",
      role: "Play along with scrolling UI synced to the song.",
      content: "The real-time feedback helps me improve my timing and accuracy.",
      rating: 5
    },
    {
      name: "Get Feedback",
      role: "Receive real-time feedback on chords and strumming accuracy",
      content: "I use this with my students. The progress tracking feature is fantastic.",
      rating: 5
    }
  ];

  // If user is authenticated, show the upload page
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh', width: '100vw' }}>
        {/* Header for authenticated user */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/logo.jpg" 
                    alt="AAROH AI Logo" 
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AAROHAI</h1>
                  <p className="text-xs text-gray-600">Guitar Learning Platform</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Feedback Button */}
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Feedback</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {currentUser?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{currentUser?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white bg-blue-600 hover:text-gray-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {currentUser?.name}! 🎸
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to learn your favorite songs? Upload an MP3 or paste an online link to get started.
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your Song</h2>
                <p className="text-gray-600">
                  Choose an MP3 file from your device or paste an online link
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Upload className="w-5 h-5" />
                    Upload File
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Supports MP3, WAV, M4A files up to 50MB
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <button
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Link className="w-5 h-5" />
                    Online Link
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Paste direct link to MP3 file
                  </p>
                </div>
              </div>

              {showUrlInput && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={onlineUrl}
                      onChange={(e) => setOnlineUrl(e.target.value)}
                      placeholder="https://example.com/song.mp3"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    />
                    <button
                      onClick={handleUrlSubmit}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Load Song
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Example: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Song Player Section */}
          {uploadedSong && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Now Playing</h3>
                <p className="text-gray-600">{uploadedSong.name}</p>
                <p className="text-sm text-gray-500">
                  {uploadedSong.type === 'file' ? '📁 Local File' : '🌐 Online Link'}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <button
                  onClick={togglePlayPause}
                  className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <div className="flex-1 max-w-md">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <Volume2 className="w-5 h-5 text-gray-400" />
              </div>

              <audio
                ref={audioRef}
                src={uploadedSong.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                crossOrigin="anonymous"
              />

              {isAnalyzing ? (
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 text-blue-600">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-lg">AI analyzing chords...</span>
                  </div>
                  <p className="text-gray-500 mt-2">This usually takes a few seconds</p>
                </div>
              ) : chords.length > 0 && (
                <div className="mt-8">
                  <GuitarTab />
                </div>
              )}
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Quick Tips</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Best Audio Quality</h4>
                  <p className="text-gray-600 text-sm">Use high-quality MP3 files for better chord detection</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Online Links</h4>
                  <p className="text-gray-600 text-sm">Use direct MP3 links for best compatibility</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Practice Mode</h4>
                  <p className="text-gray-600 text-sm">Play along with the detected chords for better learning</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Feedback Modal */}
        {showFeedbackModal && <FeedbackModal />}
      </div>
    );
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-white" style={{ minHeight: '100vh', width: '100vw' }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/logo.jpg" 
                  alt="AAROH AI Logo" 
                  className="w-10 h-10 object-contain rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AAROHAI</h1>
                <p className="text-xs text-gray-600">Guitar Learning Platform</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#demo" className="text-gray-600 hover:text-blue-600 font-medium">Demo</a>
              <button
                onClick={() => {setShowAuthModal(true); setIsLogin(true);}}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Learning Now
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="space-y-4">
                <a href="#features" className="block text-gray-600 hover:text-blue-600">Features</a>
                <a href="#testimonials" className="block text-gray-600 hover:text-blue-600">How It Works</a>
                <a href="#demo" className="block text-gray-600 hover:text-blue-600">Demo</a>
                <button
                  onClick={() => {setShowAuthModal(true); setIsLogin(true); setMobileMenuOpen(false);}}
                  className="block w-full text-left text-gray-600 hover:text-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => {setShowAuthModal(true); setIsLogin(false); setMobileMenuOpen(false);}}
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20" style={{ minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 160px)' }}>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Your Favorite Songs
              <span className="text-blue-600"> With Feedback.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learning guitar should be fun — not frustrating. Aaroh gives you real-time feedback and 
              helps you learn your favorite songs, one chord at a time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {setShowAuthModal(true); setIsLogin(false);}}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Learning Now
              </button>
               
              <button 
                onClick={() => setShowDemo(!showDemo)}
                className="border border-gray-300 bg-white text-gray-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why AAROHAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlike other apps, Aaroh lets you upload any song—not just a fixed library—and guides you 
              with personalized feedback in real time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start learning your favorite songs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Aaroh in Action
            </h2>
            <p className="text-xl text-gray-600">
              Watch how Aaroh AI helps you learn your favorite songs with real-time feedback.
            </p>
            
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {showDemo ? 'Hide Demo' : 'Watch Demo'}
            </button>
          </div>
          
          {showDemo && (
            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-black rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Demo Video</p>
                    <p className="text-sm text-gray-300">Click to play demo</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Experience Real-time Learning
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Upload Any Song</h4>
                        <p className="text-gray-600">See how easily you can upload your favorite MP3</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">AI Chord Detection</h4>
                        <p className="text-gray-600">Watch our AI automatically detect chords</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Real-time Feedback</h4>
                        <p className="text-gray-600">Experience instant feedback on your playing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Guitar Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of guitar enthusiasts who are learning their favorite songs with personalized feedback.
          </p>
          <button
            onClick={() => {setShowAuthModal(true); setIsLogin(false);}}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Learning Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/logo.jpg" 
                    alt="AAROH AI Logo" 
                    className="w-8 h-8 object-contain rounded"
                  />
                </div>
                <span className="font-bold text-lg">AAROHAI</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing guitar learning with AI-powered personalized lessons.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Lessons</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 AAROH AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal - Updated with white background for text inputs */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-8 pt-8 pb-4 text-center relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center shadow-lg rounded-2xl bg-white">
                  <img 
                    src="/logo.jpg" 
                    alt="AAROH AI Logo" 
                    className="w-16 h-16 object-contain rounded-2xl"
                  />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AAROHAI</h1>
              <p className="text-gray-600 font-medium">Guitar Learning Platform</p>
              
              <div className="mt-8 mb-6">
                <div className="space-y-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-8 mb-6">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    isLogin 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-white text-blue-600 shadow-sm border-b-2 border-blue-500' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white  text-gray-900"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-700">Password</label>
                    {isLogin && (
                      <button type="button" className="text-sm text-blue-500 hover:text-blue-600 font-medium bg-transparent">
                        Forgot Password
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                    />
                  </div>
                )}

                {!isLogin && (
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the{' '}
                      <button type="button" className="text-blue-500 hover:text-blue-600 font-medium bg-transparent">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-blue-500 hover:text-blue-600 font-medium bg-transparent">
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLogin ? 'Log In' : 'Create Account'}
                </button>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or {isLogin ? 'continue' : 'sign up'} with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Twitter')}
                    className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  This is a demo interface. No data is being sent or stored.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
