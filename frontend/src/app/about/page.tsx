"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Users, 
  Rocket, 
  Globe, 
  ShieldCheck, 
  Heart,
  History,
  Lightbulb
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-right selection:bg-blue-100 dark:selection:bg-blue-900" dir="rtl">
      
      {/* --- الجزء الأول: الـ Hero الخاص بـ "عن المنصة" --- */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* خلفية ديناميكية مع Gradients متدرجة */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/80 via-transparent to-transparent dark:from-blue-950/20" />
        
        <div className="container relative mx-auto px-6 lg:px-12 z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            
            <div className="flex justify-center animate-fade-in">
              <Badge
                variant="outline"
                className="gap-2 rounded-full border-blue-200 bg-blue-50/50 px-5 py-2 text-sm font-bold text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300"
              >
                <Sparkles className="h-4 w-4 text-orange-400 fill-orange-400" />
                تكنولوجيا تونسية 🇹🇳 بنسبة 100%
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              أكثر من مجرد موقع شغل، <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                إحنا عائلتك المهنية.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              <span className="text-slate-900 dark:text-white font-bold">"خدّمني"</span> هو الجسر الرقمي الأول في تونس الذي يربط الكفاءات وأصحاب المهن بالمشغلين مباشرة، بكل بساطة وشفافية لضمان مستقبل مهني مستدام.
            </p>

            {/* إحصائيات سريعة ومبتكرة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-slate-100 dark:border-slate-800">
              {[
                { label: "ولاية تونسية", value: "24" },
                { label: "دعم فني", value: "24/7" },
                { label: "منصة ذكية", value: "100%" },
                { label: "فرص يومية", value: "+500" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- الجزء الثاني: الصورة الرئيسية للـ About --- */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="relative group max-w-6xl mx-auto">
            {/* إطار فني للصورة */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[4rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative h-[300px] md:h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900">
              <Image
                src="/AboutUs2.png" // تأكد من وجود الصورة في مجلد public
                alt="فريق خدّمني والكفاءات التونسية"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 right-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white max-w-xs shadow-2xl">
                  <div className="flex items-center gap-2 mb-2 font-bold text-blue-300">
                    <Globe size={18} />
                    رؤيتنا الشاملة
                  </div>
                  <p className="text-sm font-medium leading-relaxed italic">
                    "من بنزرت لـبن ڤردان، هدفنا توفير شغل كريم وقريب لكل تونسي وتونسية."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- الجزء الثالث: القيم والمبادئ (Cards) --- */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                علاش أحنا موجودين؟
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                في "خدّمني"، مقتنعين اللي الكفاءة التونسية تستحق منصة تليق بيها، تحترم مجهودها وتوصلها لهدفها بأقصر طريق.
              </p>
              <div className="flex gap-4">
                <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                <div className="h-1 w-8 bg-blue-300 rounded-full"></div>
              </div>
            </div>

            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: "شفافية كاملة", 
                  desc: "نأمنو بالشفافية المطلقة. المعلومة توصل صحيحة وبسرعة للمشغل وللباحث عن شغل، من غير وسائط.",
                  icon: <ShieldCheck className="text-green-500" />,
                  color: "bg-green-50 dark:bg-green-900/10"
                },
                { 
                  title: "إبداع مستمر", 
                  desc: "نستعملو أحدث خوارزميات الذكاء الاصطناعي باش نوصلو العرض المناسب للكفاءة المناسبة في وقت قياسي.",
                  icon: <Lightbulb className="text-orange-500" />,
                  color: "bg-orange-50 dark:bg-orange-900/10"
                },
                { 
                  title: "دعم الكفاءات", 
                  desc: "من صاحب الشهادة العليا للحرفي الموهوب، المنصة معمولة للناس الكل بلاش استثناء وبلاش تمييز.",
                  icon: <Users className="text-blue-500" />,
                  color: "bg-blue-50 dark:bg-blue-900/10"
                },
                { 
                  title: "نمو مهني", 
                  desc: "مهمتنا ما توفاش في الربط بين زوز أطراف، بل في مرافقتك لتطوير مسارك المهني بشكل مستمر.",
                  icon: <Rocket className="text-purple-500" />,
                  color: "bg-purple-50 dark:bg-purple-900/10"
                }
              ].map((item, i) => (
                <div key={i} className="group p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  <div className={`p-4 ${item.color} rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- الجزء الرابع: CTA الموحد مع الـ Hero الرئيسي --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto relative overflow-hidden bg-blue-600 rounded-[3.5rem] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
            {/* زخرفة الخلفية */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -ml-32 -mt-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 blur-[100px] rounded-full -mr-32 -mb-32"></div>

            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                حاضر باش تبدأ خطوتك الجاية؟
              </h2>
              <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                انضم لآلاف التونسيين اللي قاعدين يطورو في مسارهم المهني كل يوم مع منصة "خدّمني".
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
                <Link href="/jobs">
                  <Button size="lg" className="h-16 px-10 bg-white text-blue-600 hover:bg-blue-50 text-xl font-black rounded-2xl shadow-xl transition-all active:scale-95 group border-0">
                    ألقى خدمتك
                    <ArrowRight className="mr-2 h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="h-16 px-10 border-2 border-white/30 text-white hover:bg-white/10 text-xl font-black rounded-2xl transition-all">
                    سجّل كفاءتك
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;