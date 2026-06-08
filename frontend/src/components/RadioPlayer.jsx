"use client";
import React, { useState, useRef, useEffect } from "react";
import { Radio, Play, Pause, Volume2, VolumeX, X, Loader2, SkipForward, SkipBack } from "lucide-react";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStation, setCurrentStation] = useState(0);
  const [volume, setVolume] = useState(70);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const stations = [
    { name: "موزاييك FM", url: "https://mosaiquefm.net/live", icon: "🎵", color: "#FF6B6B", isIframe: true },
    { name: "شمس FM", url: "https://www.shemsfm.net/live", icon: "☀️", color: "#F9A825", isIframe: true },
    { name: "جوهرة FM", url: "https://www.jawharafm.net/live", icon: "💎", color: "#9C27B0", isIframe: true },
    { name: "الوطنية", url: "http://www.radiotunisienne.tn/live/rtci", icon: "🇹🇳", color: "#E53935", isIframe: true },
    { name: "إي أف أم", url: "https://www.ifm.tn/live", icon: "📻", color: "#1E88E5", isIframe: true },
    { name: "الثقافية", url: "https://streaming.radiotunisienne.tn/rtci", icon: "🎙️", color: "#43A047", isIframe: false },
    { name: "القرآن الكريم", url: "https://quran-radio.tn/live", icon: "📖", color: "#2E7D32", isIframe: true },
    { name: "ديوان FM", url: "https://diwanfm.net/live", icon: "🎭", color: "#FB8C00", isIframe: true },
  ];

  const [useIframe, setUseIframe] = useState(stations[currentStation].isIframe || false);

  useEffect(() => {
    if (audioRef.current && !useIframe) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, useIframe]);

  const togglePlay = () => {
    if (useIframe) return;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setLoading(true);
        audioRef.current.play()
          .then(() => {
            setLoading(false);
            setIsPlaying(true);
          })
          .catch(err => {
            console.log("خطأ في التشغيل:", err);
            setError(true);
            setLoading(false);
          });
      }
    }
  };

  const nextStation = () => {
    const nextIndex = (currentStation + 1) % stations.length;
    changeStation(nextIndex);
  };

  const prevStation = () => {
    const prevIndex = (currentStation - 1 + stations.length) % stations.length;
    changeStation(prevIndex);
  };

  const changeStation = (index) => {
    setLoading(true);
    setError(false);
    setIsPlaying(false);
    setCurrentStation(index);
    setUseIframe(stations[index].isIframe || false);
    
    if (!stations[index].isIframe && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = stations[index].url;
      audioRef.current.load();
      
      audioRef.current.addEventListener('canplay', () => {
        setLoading(false);
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("خطأ:", err));
      }, { once: true });
      
      setTimeout(() => setLoading(false), 5000);
    } else {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const toggleMute = () => {
    if (useIframe) return;
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    if (useIframe) return;
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (newVolume === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* زر فتح الراديو المحسن */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="فتح الراديو"
      >
        <div className="relative">
          {/* خلفية متدرجة مع تأثير glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-5 shadow-2xl transition-all duration-300 group-hover:scale-110">
            <div className="relative">
              <span className="text-3xl filter drop-shadow-lg">📻</span>
              {loading && (
                <div className="absolute -top-2 -right-2">
                  <Loader2 size={16} className="text-yellow-300 animate-spin" />
                </div>
              )}
            </div>
            {isOpen && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse shadow-lg" />
            )}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-pulse shadow-lg" />
            )}
          </div>
        </div>
      </button>

      {/* نافذة الراديو المحسنة */}
      {isOpen && (
        <div className="fixed bottom-28 left-6 z-50 w-[95vw] max-w-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-sm">
          
          {/* Header مع تأثير متدرج */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                  <span className="text-xl">📻</span>
                </div>
                <div>
                  <span className="font-bold text-sm">راديو خدّمني</span>
                  <p className="text-[10px] opacity-80">استمع لأحدث البرامج</p>
                </div>
              </div>
              <button
                onClick={toggleOpen}
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:scale-110"
                aria-label="إغلاق الراديو"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-5">
            
            {/* Station info avec animation */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div 
                  className="text-6xl mb-3 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                  style={{ textShadow: `0 0 20px ${stations[currentStation].color}80` }}
                >
                  {stations[currentStation].icon}
                </div>
                {loading && (
                  <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Loader2 size={32} className="animate-spin text-blue-600" />
                  </div>
                )}
              </div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                {stations[currentStation].name}
              </h3>
              <div className="flex justify-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {useIframe ? "🔗 بث مباشر" : (isPlaying ? "🟢 يبث الآن" : "⏸ متوقف")}
                </span>
                {loading && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                    <Loader2 size={10} className="animate-spin" /> جاري التحميل
                  </span>
                )}
              </div>
              {error && (
                <p className="text-xs text-red-500 mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                  ⚠️ تعذر التشغيل، جرب محطة أخرى
                </p>
              )}
            </div>

            {useIframe ? (
              <div className="mb-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
                <iframe
                  src={stations[currentStation].url}
                  className="w-full h-[280px] border-0"
                  title={stations[currentStation].name}
                  allow="autoplay"
                />
              </div>
            ) : (
              <>
                <audio
                  ref={audioRef}
                  src={stations[currentStation].url}
                  preload="auto"
                  onEnded={() => setIsPlaying(false)}
                  onError={() => { setIsPlaying(false); setError(true); setLoading(false); }}
                  onCanPlay={() => { setError(false); setLoading(false); }}
                  onWaiting={() => setLoading(true)}
                  onPlaying={() => { setLoading(false); setIsPlaying(true); }}
                />

                {/* Contrôles améliorés */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <button 
                    onClick={prevStation} 
                    disabled={loading}
                    className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 disabled:opacity-50"
                  >
                    <SkipBack size={20} />
                  </button>

                  <button 
                    onClick={togglePlay} 
                    disabled={loading}
                    className={`p-6 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110 active:scale-95 ${isPlaying ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/30" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/30"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loading ? <Loader2 size={28} className="animate-spin" /> : (isPlaying ? <Pause size={28} /> : <Play size={28} className="mr-0.5" />)}
                  </button>

                  <button 
                    onClick={nextStation} 
                    disabled={loading}
                    className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 disabled:opacity-50"
                  >
                    <SkipForward size={20} />
                  </button>
                </div>

                {/* Volume control */}
                <div className="flex items-center justify-center gap-3 mb-5 px-4">
                  <button onClick={toggleMute} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                    {isMuted ? <VolumeX size={18} className="text-slate-500" /> : <Volume2 size={18} className="text-slate-500" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange}
                    className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-xs text-slate-500 w-8">{volume}%</span>
                </div>
              </>
            )}

            {/* Liste des stations améliorée */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-[11px] font-bold text-slate-400 mb-3 text-center flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-slate-300 dark:bg-slate-600"></span>
                📻 اختر محطتك المفضلة
                <span className="w-8 h-px bg-slate-300 dark:bg-slate-600"></span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {stations.map((station, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => changeStation(idx)} 
                    disabled={loading}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-right transition-all duration-200 ${
                      currentStation === idx 
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 border border-blue-200 dark:border-blue-800 shadow-md" 
                        : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    } ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                  >
                    <span className="text-xl">{station.icon}</span>
                    <span className="text-[11px] font-bold truncate flex-1">{station.name}</span>
                    {currentStation === idx && (
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                    )}
                    {loading && currentStation === idx && (
                      <Loader2 size={12} className="animate-spin text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[9px] text-slate-400 text-center mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              {useIframe ? "🔊 يتم التشغيل عبر الموقع الرسمي للإذاعة" : "⏳ قد يستغرق التشغيل بضع ثوانٍ حسب سرعة الاتصال"}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-from-bottom-5 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-bottom-5 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default RadioPlayer;