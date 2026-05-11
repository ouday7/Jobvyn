"use client";
import React from "react";
import { 
  Globe2, 
  Zap, 
  MousePointer2,
  TrendingUp,
  Award,
  Rocket,
  Target,
  Users,
  Briefcase,
  Building2,
  CheckCircle2
} from "lucide-react";

const KhaddemniLanding = () => {
  const partners = [
    { 
      name: "ANETI", 
      url: "https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/272327292_248682147437401_2838525502664882152_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=uogFl4VPEOAQ7kNvwHfPzd0&_nc_oc=Adpxsn0XoWfSA9rQ1wr9JIbGxG94-JTxBOlFpq4oR3QvznnuXwrkiWtRKODEjR6YW5w&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=dg9ufUUI1oWkeRRiiYOGhw&_nc_ss=7a3a8&oh=00_Af1w0QcMVXzWlmxhRs6Luazq9KUvFXO4G0XNV7Xiki7gGw&oe=69E569F1",
      label: "الشريك الوطني للتشغيل"
    },
    { 
      name: "AHK Tunisia", 
      url: "https://jamaity.org/wp-content/uploads/2016/03/logo_ahk.jpg",
      label: "الشريك الاستراتيجي الألماني"
    },
    { 
      name: "Amen Assurance", 
      url: "https://www.african-markets.com/images/markets/bvmt/amen-bank.jpg",
      label: "شريك الأمان والضمان المهني"
    }
  ];

  const objectives = [
    {
      title: "تسهيل الإدماج المهني",
      desc: "أداة رقمية بسيطة ومباشرة لربط طالبي الشغل بالمشغلين في أسرع وقت ممكن.",
      icon: <MousePointer2 size={24} />
    },
    {
      title: "تقليص الفوارق الجهوية",
      desc: "خلق فرص متساوية للتشغيل في كامل تراب الجمهورية والحد من التفاوت بين الفئات.",
      icon: <Globe2 size={24} />
    },
    {
      title: "هيكلة سوق الشغل",
      desc: "المساهمة في تنظيم القطاع غير الرسمي وخلق قاعدة بيانات حية للكفاءات التونسية.",
      icon: <TrendingUp size={24} />
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 selection:bg-blue-50" dir="rtl">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* --- Section 1: Introduction & Objectives --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          <div className="text-right space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/60 dark:border-blue-800/30 rounded-full transition-all duration-300 hover:border-blue-400 group">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                <Rocket size={14} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-blue-700 dark:text-blue-300 tracking-[0.05em]">
                  "خدمني"
                </span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">مشروع رقمي</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
              "خدمني" فضاء التلاقي
            </h1>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-700 dark:text-slate-300">
              بين <span className="text-blue-600">طالب الشغل</span> و <span className="text-blue-600">صاحب العمل</span>
            </h2>
            
            <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-2xl border-r-4 border-blue-500">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg font-medium">
                <span className="font-bold text-blue-700">فكرة جديدة ومشروع رقمي طموح</span> هدفه 
                خلق فرص جديدة وحقيقية ومباشرة بإشراف خبرات تونسية 100%. 
                نساهم في إعادة هيكلة سوق الشغل بطريقة عصرية.
              </p>
            </div>

            {/* Statistiques */}
            <div className="flex gap-16 pt-6 justify-start">
              <div className="text-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-slate-800 dark:text-white">12k</span>
                  <span className="text-3xl font-bold text-blue-600">+</span>
                </div>
                <p className="text-md font-bold text-slate-500 mt-2">فرصة شغل</p>
              </div>
              <div className="text-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-slate-800 dark:text-white">65k</span>
                  <span className="text-3xl font-bold text-blue-600">+</span>
                </div>
                <p className="text-md font-bold text-slate-500 mt-2">باحث عن عمل</p>
              </div>
            </div>

          </div>

          {/* Objectives Grid */}
          <div className="grid gap-5">
            {objectives.map((obj, idx) => (
              <div key={idx} className="group p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-6 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
                <div className="shrink-0 p-3 bg-blue-50 dark:bg-blue-950 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {obj.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{obj.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Section 2: Partenaires Stratégiques --- */}
        <div className="pt-24 border-t border-slate-100/60 dark:border-slate-800/60">
          
          {/* نص "خدمني ليس مجرد منصة..." */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white shadow-lg mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">
              "خدمني" ليس مجرد منصة، بل هو رؤية جديدة لسوق الشغل التونسي
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              نهدف إلى رقمنة سوق الشغل وتوفير فرص جديدة وحقيقية ومباشرة للجميع، 
              بإشراف خبرات تقنية تونسية 100%، وبشراكة مع المؤسسات الوطنية والدولية.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="flex items-center gap-1 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 size={16} /> فرص مباشرة
              </span>
              <span className="flex items-center gap-1 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 size={16} /> خبرات تونسية
              </span>
              <span className="flex items-center gap-1 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 size={16} /> رقمنة سوق الشغل
              </span>
            </div>
          </div>

          {/* شركاء استراتيجيين */}
          <div className="flex items-center justify-center gap-6 mb-24">
            <div className="hidden md:block h-[1px] w-24 bg-gradient-to-l from-blue-600/50 to-transparent"></div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative px-8 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span>شركاء</span>
                  <span className="text-blue-600 italic">النجاح</span>
                  <span>الاستراتيجيين</span>
                </h3>
              </div>
            </div>
            <div className="hidden md:block h-[1px] w-24 bg-gradient-to-r from-blue-600/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((p, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-1 scale-95 opacity-0 group-hover:opacity-5 group-hover:scale-100 transition-all duration-500"></div>
                
                <div className="relative flex flex-col items-center bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-100 group-hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.08)]">
                  
                  <div className="w-full h-32 flex items-center justify-center mb-6">
                    <img 
                      src={p.url} 
                      alt={p.name} 
                      className="max-h-full max-w-[180px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform group-hover:scale-110"
                    />
                  </div>

                  <div className="w-8 h-[2px] bg-slate-100 dark:bg-slate-800 group-hover:w-16 group-hover:bg-blue-600 transition-all duration-500 mb-4"></div>

                  <div className="text-center">
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] group-hover:text-blue-600 transition-colors">
                      {p.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default KhaddemniLanding;