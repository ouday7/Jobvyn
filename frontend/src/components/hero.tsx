"use client";
import React from "react";
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
  MapPin
} from "lucide-react";

const HeroSection = () => {
  const targets = [
    { label: "أصحاب الشهائد العليا", icon: <GraduationCap size={14} /> },
    { label: "أصحاب المشاريع الصغرى وPME", icon: <Store size={14} /> },
    { label: "العمال والمهنيين والحرفيين", icon: <Briefcase size={14} /> },
    { label: "النساء في الوسط الريفي", icon: <CheckCircle2 size={14} /> }
  ];

  const features = [
    { title: "سوم رمزي", sub: "إشتراك بسيط", icon: <Banknote size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "صنايعية وشهائد", sub: "إنتداب مباشر", icon: <Users size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "ربح الوقت", sub: "إجابة حينية", icon: <Clock size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "ثقة كاملة", sub: "موثوق %100", icon: <ShieldCheck size={20} />, color: "text-purple-600", bg: "bg-purple-50" }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-[#FDFDFD] dark:bg-slate-950 overflow-hidden text-right py-16" dir="rtl">
      
      {/* خلفية نظيفة */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-blue-50/30 dark:bg-blue-900/10 blur-3xl rounded-full" />
      </div>

      <div className="container relative mx-auto px-6 lg:px-16 z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* الصورة - تم تصغير الحجم والارتفاع */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square"> {/* رجعنا للـ 500px والـ aspect-square */}
              <div className="absolute inset-0 z-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-2 border border-slate-100 dark:border-slate-800">
                <Image
                  src="/hero-v2.png" 
                  alt="خدّمني"
                  fill 
                  className="object-cover rounded-[2.6rem]"
                  priority
                />
              </div>

              {/* Badges تفاعلية */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 z-20 animate-bounce">
                <Rocket size={16} />
                <span className="text-xs font-bold text-white leading-none">تكنولوجيا تونسية 🇹🇳</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 z-20 border border-slate-100 dark:border-slate-700">
                <Zap size={16} className="text-orange-500 fill-orange-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-none">عروض حينية</span>
              </div>
            </div>
          </div>

          {/* المحتوى */}
          <div className="w-full lg:w-1/2 space-y-8">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/50">
                <Globe2 size={14} />
                <span className="text-[11px] font-bold uppercase tracking-widest leading-none">المنصة الوطنية للتشغيل المباشر</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-bold text-sm px-1">
                <MapPin size={16} className="text-red-500" />
                <span>من بنزرت لـبن ڤردان.. يد وحدة للتشغيل</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
              خدّمني.. خطوة ذكية، <br />
              <span className="text-blue-600">لفرصة حقيقية.</span>
            </h1>

            {/* الوصف (Description) */}
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
              <span className="text-slate-900 dark:text-white font-bold italic">"خدّمني"</span> هو الجسر الرقمي الأول في تونس الذي يربط الكفاءات وأصحاب المهن بالمشغلين مباشرة، بكل بساطة وشفافية لضمان مستقبل مهني مستدام.
            </p>

            {/* الفئات المستهدفة (Tags) */}
            <div className="flex flex-wrap gap-2">
              {targets.map((t, idx) => (
                <span key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="text-blue-600">{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>

            {/* المميزات (Features) */}
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 leading-none">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* الأزرار (Buttons) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/jobs" className="flex-[1.3] h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-95 group">
                ألقى خدمتك <Search size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="/register" className="flex-1 h-14 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2 transition-transform active:scale-95">
                سجّل كفاءتك <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;