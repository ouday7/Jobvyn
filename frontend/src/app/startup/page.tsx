"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award, 
  Calendar,
  ChevronLeft,
  ExternalLink,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Building2,
  Target,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Newspaper,
  FileText
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// البيانات (مؤقتة - يمكن جلبها من API لاحقاً)
const newsData = [
  {
    id: 1,
    title: "إطلاق برنامج 216 Capital Venture Accelerator",
    summary: "برنامج تسريع جديد بالشراكة مع Plug and Play لدعم 20 شركة ناشئة تونسية بتمويل 50,000 أورو لكل منها.",
    date: "2025-09-12",
    source: "Ilboursa",
    category: "تمويل",
    link: "#"
  },
  {
    id: 2,
    title: "تونس في Top 20 عالمي للأنظمة البيئية للشركات الناشئة",
    summary: "حسب تقرير Startup Genome 2025، النظام البيئي التونسي للشركات الناشئة حقق قيمة 113 مليار دولار.",
    date: "2025-06-16",
    source: "WMC",
    category: "إنجاز",
    link: "#"
  },
  {
    id: 3,
    title: "أكثر من 1450 شركة ناشئة في تونس",
    summary: "منها 1165 شركة حاصلة على علامة 'Startup' و17 شركة في مرحلة التوسع (Scale-ups).",
    date: "2026-04-10",
    source: "CEPEX",
    category: "إحصائيات",
    link: "#"
  },
  {
    id: 4,
    title: "إطلاق منصة Auto-entrepreneur قريباً",
    summary: "منصة إلكترونية تعمل 24/7 تسمح للشباب التونسي بممارسة الأنشطة الفردية في مختلف القطاعات.",
    date: "2024-10-21",
    source: "WMC",
    category: "إعلان",
    link: "#"
  },
  {
    id: 5,
    title: "تونس تشارك في قمة Africa Forward 2026",
    summary: "التركيز على دور الشركات الناشئة والذكاء الاصطناعي كرافعات اقتصادية.",
    date: "2026-05-12",
    source: "WMC",
    category: "حدث",
    link: "#"
  },
  {
    id: 6,
    title: "Orange Digital Center يدعم 162 شركة ناشئة تونسية",
    summary: "مركز incubation يوفر برامج مجانية وخدمات متنوعة للشباب التونسي.",
    date: "2026-04-06",
    source: "WMC",
    category: "دعم",
    link: "#"
  }
];

const fundingPrograms = [
  {
    name: "216 Capital Venture Accelerator",
    amount: "50,000 أورو",
    description: "برنامج تسريع مدته 6 أشهر بالشراكة مع Plug and Play، يشمل تدريب وتوجيه وإمكانية تمويل إضافي.",
    deadline: "2025",
    link: "#"
  },
  {
    name: "Tamweel by Tasweeq",
    amount: "تمويل مخصص",
    description: "تمويل لتمويل حملات التسويق والإعلان للشركات الناشئة والـ PME، على 24 شهر بدون فوائد.",
    deadline: "مستمر",
    link: "#"
  },
  {
    name: "Fonds de Garantie Startups (SOTUGAR)",
    amount: "ضمان 30%",
    description: "ضمان الاستثمارات في الشركات الناشئة بنسبة 30% من قيمة المشاركة.",
    deadline: "مستمر",
    link: "#"
  }
];

const incubators = [
  {
    name: "Orange Digital Center",
    location: "تونس",
    description: "مركز incubation يضم مدرسة برمجة، مختبر FabLab، ومسرع للشركات الناشئة.",
    startups: 162,
    link: "#"
  },
  {
    name: "ActinCube",
    location: "أريانة",
    description: "برنامج incubation متخصص في التصنيع والنمذجة والتسويق، بدعم من ACTIA وExpertise France.",
    startups: 9,
    link: "#"
  }
];

const ressources = [
  {
    title: "Startup Act",
    description: "القانون التونسي لدعم الشركات الناشئة: إعفاءات ضريبية، تغطية اجتماعية، إجراءات مبسطة.",
    icon: <FileText className="h-8 w-8" />,
    link: "#"
  },
  {
    title: "Auto-entrepreneur",
    description: "منصة قادمة للأفراد الراغبين في ممارسة نشاط تجاري أو خدمي بشكل قانوني ومبسط.",
    icon: <Users className="h-8 w-8" />,
    link: "#"
  },
  {
    title: "ANETI",
    description: "وكالة التشغيل: برامج دعم للمشاريع الصغرى والمتوسطة وتكوين.",
    icon: <GraduationCap className="h-8 w-8" />,
    link: "#"
  },
  {
    title: "CEPEX",
    description: "مركز ترويج الصادرات: دعم للشركات الناشئة المصدرة والمشاركة في المعارض الدولية.",
    icon: <Building2 className="h-8 w-8" />,
    link: "#"
  }
];

export default function StartupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <Rocket className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
            باش تبدأ <span className="text-blue-600">مشروعك</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            كل ما تحتاج لمعرفته لبدء مشروعك في تونس: الخطوات، التمويل، الحاضنات، وآخر أخبار ريادة الأعمال
          </p>
        </div>

        <Tabs defaultValue="howto" className="w-full" dir="rtl">
          <TabsList className="grid grid-cols-4 mb-8 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            <TabsTrigger value="howto" className="rounded-xl gap-2">📋 كيفاش تبدأ</TabsTrigger>
            <TabsTrigger value="finance" className="rounded-xl gap-2">💰 التمويل والاستثمار</TabsTrigger>
            <TabsTrigger value="incubators" className="rounded-xl gap-2">🏢 حاضنات ومسرعات</TabsTrigger>
            <TabsTrigger value="news" className="rounded-xl gap-2">📰 أخبار واستجدادات</TabsTrigger>
          </TabsList>

          {/* ========== TAB 1: كيفاش تبدأ مشروعك ========== */}
          <TabsContent value="howto" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Étapes */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-xl"><Lightbulb className="h-6 w-6 text-blue-600" /></div>
                    <h2 className="text-xl font-bold">الخطوات الأساسية</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: "تطوير الفكرة", desc: "حدد فكرة مشروعك وادرس السوق والمنافسين" },
                      { step: 2, title: "إنشاء خطة عمل", desc: "أعد دراسة جدوى وتوقعات مالية لمدة 3-5 سنوات" },
                      { step: 3, title: "اختيار الشكل القانوني", desc: "SAS, SARL,Auto entrepreneur" },
                      { step: 4, title: "التسجيل والإجراءات", desc: "سجل في السجل التجاري وخلص للضرائب والضمان الاجتماعي" },
                      { step: 5, title: "الحصول على علامة Startup", desc: "قدم ملفك للحصول على الإعفاءات والامتيازات" },
                      { step: 6, title: "البحث عن تمويل", desc: "تواصل مع المستثمرين وقدم طلبات للبرامج الحكومية" }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-bold">{item.title}</h3>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Startup Act */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-xl"><Award className="h-6 w-6 text-green-600" /></div>
                    <h2 className="text-xl font-bold">Startup Act: الامتيازات</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { text: "إعفاء من الضريبة على الشركات (IS) طيلة فترة التصنيف" },
                      { text: "تغطية الدولة للمساهمات الاجتماعية (CNSS)" },
                      { text: "منح Bourse de vie للمؤسسين (سنة أولى)" },
                      { text: "إجازة لإنشاء شركة ناشئة (سنة قابلة للتجديد)" },
                      { text: "إعفاء من إجراءات المراقبة الفنية عند الاستيراد" },
                      { text: "إمكانية فتح حساب بالعملة الصعبة" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">المزيد عن Startup Act</Button>
                </CardContent>
              </Card>
            </div>

            {/* Ressources */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" /> موارد مفيدة
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ressources.map((r, i) => (
                    <a key={i} href={r.link} className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl hover:shadow-md transition group">
                      <div className="text-blue-600 mb-2">{r.icon}</div>
                      <h3 className="font-bold text-base">{r.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{r.description}</p>
                      <ExternalLink className="h-3 w-3 mt-2 text-slate-400 group-hover:text-blue-600" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB 2: التمويل والاستثمار ========== */}
          <TabsContent value="finance" className="space-y-6">
            {/* Programmes de financement */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" /> برامج التمويل
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {fundingPrograms.map((p, i) => (
                    <div key={i} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <Badge className="mt-1 bg-green-200 text-green-800">{p.amount}</Badge>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{p.description}</p>
                      <p className="text-xs text-slate-400 mt-2">📅 {p.deadline}</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-blue-600">اطلب المزيد →</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistiques écosystème */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" /> النظام البيئي للشركات الناشئة في تونس
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                    <p className="text-3xl font-bold text-blue-600">+1,450</p>
                    <p className="text-sm">شركة ناشئة</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                    <p className="text-3xl font-bold text-blue-600">$113B</p>
                    <p className="text-sm">قيمة النظام البيئي</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                    <p className="text-3xl font-bold text-blue-600">#20</p>
                    <p className="text-sm">عالمياً حسب GSER 2025</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 text-center mt-4">
                  في 2024، جمعت الشركات الناشئة التونسية 24 مليون دولار من التمويل، بزيادة 56% في عدد المستثمرين النشطين[citation:2][citation:6].
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB 3: حاضنات ومسرعات ========== */}
          <TabsContent value="incubators" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {incubators.map((inc, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{inc.name}</h3>
                        <p className="text-sm text-slate-500">{inc.location}</p>
                        <p className="mt-2 text-slate-600">{inc.description}</p>
                        <Badge className="mt-3">{inc.startups} شركة ناشئة</Badge>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-500" />
                    </div>
                    <Button variant="outline" className="w-full mt-4">اطلب المعلومات →</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Appel à postuler */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">برنامج 216 Capital Venture Accelerator</h3>
                <p className="text-slate-600">برنامج تسريع مدته 6 شهور للشركات الناشئة التونسية، مع تمويل يصل إلى 50,000 أورو وإمكانية التوسع عالمياً.</p>
                <Button className="mt-4 bg-blue-600">تقدم الآن</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB 4: أخبار واستجدادات ========== */}
          <TabsContent value="news" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {newsData.map((news) => (
                <Card key={news.id} className="hover:shadow-md transition">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{news.category}</Badge>
                      <span className="text-xs text-slate-400">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mt-2">{news.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{news.summary}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-slate-400">المصدر: {news.source}</span>
                      <a href={news.link} className="text-blue-600 text-sm hover:underline">اقرأ المزيد →</a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" className="gap-2">
                <Newspaper className="h-4 w-4" /> جميع الأخبار
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}