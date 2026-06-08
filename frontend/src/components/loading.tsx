import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-950 z-[9999]">
      <div className="flex flex-col items-center justify-center gap-6">
        
        {/* Animated Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulse Rings */}
          <div className="absolute w-32 h-32 bg-blue-500/20 rounded-full animate-ping"></div>
          <div className="absolute w-28 h-28 bg-blue-600/10 rounded-full animate-pulse delay-75"></div>
          
          {/* Main Spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-t-4 border-r-4 border-blue-600 border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-b-4 border-l-4 border-slate-200 dark:border-slate-800 border-transparent rounded-full animate-spin [animation-duration:1.5s]"></div>
            
            {/* Center Logo Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-blue-500/30 p-1">
                <Image 
                  src="/logo.jpg" 
                  alt="5addemni" 
                  width={55} 
                  height={55}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Text & Progress */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
              5<span className="text-blue-600">addemni</span>
            </span>
          </div>
          
          {/* Subtle Progress Bar */}
          <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-[loading-bar_1.5s_infinite_ease-in-out]"></div>
          </div>
          
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
            جاري تجهيز المنصة...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Loading;