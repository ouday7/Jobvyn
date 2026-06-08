"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ArrowLeft, 
  Rocket, 
  Zap, 
  ShieldCheck, 
  Users, 
  Globe2, 
  Banknote, 
  Clock, 
  GraduationCap, 
  Store, 
  Briefcase, 
  CheckCircle2,
  MapPin,
  Building2,
  Landmark,
  ShoppingBag
} from "lucide-react";

const HeroSection = () => {
  // قائمة الصور (يمكنك إضافة المزيد)
  const images = [
    { src: "/hero-v2.png", alt: "خدّمني - صورة 1" },
    { src: "/split4.png", alt: "خدّمني - صورة 2" },
    { src: "/split3.png", alt: "خدّمني - صورة 3" },
    { src: "/split2.png", alt: "خدّمني - صورة 4" },
    { src: "/split1.png", alt: "خدّمني - صورة 5" }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // تغيير الصورة كل 4 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, 500); // نصف ثانية لمدة الانتقال
    }, 4000); // 4 ثواني

    return () => clearInterval(interval);
  }, [images.length]);

  const targets = [
    { label: "أصحاب الشهائد العليا", icon: <GraduationCap size={14} /> },
    { label: "أصحاب المشاريع الصغرى ", icon: <Store size={14} /> },
    { label: "أصحاب المشاريع الكبرى", icon: <Building2 size={14} /> },
    { label: "الشركات والمؤسسات", icon: <Landmark size={14} /> },
    { label: "العمال والمهنيين والحرفيين", icon: <Briefcase size={14} /> },
    { label: " العمال في الوسط الريفي", icon: <CheckCircle2 size={14} /> }
  ];

  const features = [
    { title: "صنايعية وشهائد", sub: "إنتداب مباشر", icon: <Users size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "عروفات وشركات", sub: "مسجلة رسمياً", icon: <Building2 size={20} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "اشتراك رمزي", sub: "جدّية اكثر ", icon: <Banknote size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "ربح الوقت", sub: "إجابة حينية", icon: <Clock size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "ثقة كاملة", sub: "موثوق %100", icon: <ShieldCheck size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "عروض متنوعة", sub: "شغل بجميع المجالات", icon: <ShoppingBag size={20} />, color: "text-pink-600", bg: "bg-pink-50" }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-[#FDFDFD] dark:bg-slate-950 overflow-hidden text-right py-16" dir="rtl">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-blue-50/30 dark:bg-blue-900/10 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="container relative mx-auto px-6 lg:px-16 z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* قسم الصور المتغيرة */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 z-10 transition-all duration-700 ease-in-out ${
                    idx === currentImageIndex
                      ? "opacity-100 scale-100 translate-x-0"
                      : idx < currentImageIndex
                      ? "opacity-0 -translate-x-10 scale-95 pointer-events-none"
                      : "opacity-0 translate-x-10 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-2 border border-slate-100 dark:border-slate-800 group transition-all duration-500 hover:shadow-3xl">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover rounded-[2.6rem] transition-transform duration-700 group-hover:scale-105"
                      priority={idx === 0}
                      unoptimized
                    />
                  </div>
                </div>
              ))}

              {/* Badges تبقى ثابتة فوق الصور */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 z-20 animate-bounce">
                <Rocket size={16} className="animate-pulse" />
                <span className="text-xs font-bold text-white leading-none">تكنولوجيا تونسية 🇹🇳</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 z-20 border border-slate-100 dark:border-slate-700 animate-pulse">
                <Zap size={16} className="text-orange-500 fill-orange-500 animate-spin" style={{ animationDuration: "3s" }} />
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-none">عروض حينية</span>
              </div>

              {/* مؤشرات الصور (نقاط صغيرة) */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentImageIndex
                        ? "w-8 h-2 bg-blue-600"
                        : "w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-blue-400"
                    }`}
                    aria-label={`الانتقال إلى الصورة ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* باقي المحتوى (نفس الكود القديم) */}
          <div className="w-full lg:w-1/2 space-y-8 animate-fade-in-up animation-delay-200">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/50 hover:scale-105 transition-transform duration-300">
                <Globe2 size={14} className="animate-spin-slow" />
                <span className="text-[11px] font-bold uppercase tracking-widest leading-none">
فضاءُ الوصل، حيث تلتقي المهارات بالفرص.
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-bold text-sm px-1">
                <MapPin size={16} className="text-red-500 animate-pulse" />
                <span>فرصتك أقرب ملّي تتصور.. خاطر تونس تجمعنا. </span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight animate-fade-in-up">
              خدّمني.. خطوة ذكية، <br />
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-gradient">لفرصة حقيقية.</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl animate-fade-in-up animation-delay-400">
              <span className="text-slate-900 dark:text-white font-bold italic">"خدّمني"</span> هو الجسر الرقمي الأول في تونس الذي يربط الكفاءات وأصحاب المهن بالمشغلين مباشرة، بكل بساطة وشفافية لضمان مستقبل مهني مستدام.
            </p>

            <div className="flex flex-wrap gap-2 animate-fade-in-up animation-delay-600">
              {targets.map((t, idx) => (
                <span key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 cursor-default">
                  <span className="text-blue-600 transition-transform">{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-800">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 leading-none">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up animation-delay-1000">
              <Link href="/jobs" className="flex-[1.3] h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 group hover:shadow-xl hover:-translate-y-0.5">
                ألقى خدمتك 
                <Search size={20} className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </Link>
              <Link href="/register" className="flex-1 h-14 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 group hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5">
                سجّل كفاءتك باش تفك بلاصتك 
                <ArrowLeft size={20} className="rotate-180 group-hover:-translate-x-1 transition-all duration-300" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;