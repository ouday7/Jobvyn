"use client";
import React, { useState } from "react";
import {
  Briefcase, Calendar, Clock, MapPin, Users, FileText,
  ExternalLink, Download, CheckCircle, XCircle, AlertCircle,
  Home, Search, Filter, ChevronLeft, ChevronRight, Eye, Building2,
  Award, GraduationCap, DollarSign, Globe, Phone, Mail, Link as LinkIcon,
  Plane, Sun, Snowflake, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// بيانات المناظرات العامة (ministères, fonctions publiques)
const concoursPublics = [
  {
    id: 1,
    title: "مناظرة انتداب أعوان مراقبة مساعدين بالديوانة التونسية",
    organization: "وزارة المالية - الديوانة التونسية",
    type: "public",
    category: "وظائف عمومية",
    level: "شهادة البكالوريا فما فوق",
    locations: ["تونس", "سوسة", "صفاقس", "قابس", "بنزرت"],
    deadline: "2026-06-15",
    status: "open",
    positions: 150,
    registrationLink: "#",
    results: null,
    salary: "800-1200 دينار",
    benefits: "تغطية صحية، منحة السفر، تقدم مهني"
  },
  {
    id: 2,
    title: "مناظرة انتداب أساتذة التعليم الثانوي",
    organization: "وزارة التربية",
    type: "public",
    category: "وظائف عمومية",
    level: "شهادة الأستاذية فما فوق",
    locations: ["جميع الولايات"],
    deadline: "2026-05-20",
    status: "open",
    positions: 800,
    registrationLink: "#",
    results: null,
    salary: "1000-1500 دينار",
    benefits: "تسوية وضعية، ترقية مهنية"
  },
  {
    id: 3,
    title: "مناظرة انتداب مهندسين وتقنيين بوزارة الصحة",
    organization: "وزارة الصحة",
    type: "public",
    category: "وظائف عمومية",
    level: "مهندس، تقني سامي",
    locations: ["تونس", "سوسة", "صفاقس"],
    deadline: "2026-06-30",
    status: "open",
    positions: 200,
    registrationLink: "#",
    results: null,
    salary: "1200-1800 دينار",
    benefits: "تغطية صحية، منحة المسؤولية"
  },
  {
    id: 4,
    title: "نتائج مناظرة الانتداب بوزارة الداخلية (أعوان أمن)",
    organization: "وزارة الداخلية",
    type: "public",
    category: "نتائج",
    level: "بكالوريا فما فوق",
    locations: ["تونس", "سوسة", "صفاقس", "القيروان"],
    deadline: null,
    status: "closed",
    positions: 0,
    registrationLink: null,
    results: {
      pdfLink: "#",
      date: "2026-04-20",
      summary: "تم قبول 850 مترشح من بين 12000 مترشح",
      topScore: "18.50/20"
    }
  }
];

// بيانات المناظرات الخاصة (entreprises, sociétés)
const concoursPrives = [
  {
    id: 6,
    title: "مناظرة انتداب أعوان تنفيذيين ومتقنين بشركة فسفاط قفصة",
    organization: "شركة فسفاط قفصة (CPG)",
    type: "private",
    category: "قطاع خاص",
    level: "شهادة التبريز أو ما يعادلها",
    locations: ["قفصة"],
    deadline: "2026-06-01",
    status: "open",
    positions: 45,
    registrationLink: "#",
    results: null,
    salary: "1300-2000 دينار",
    benefits: "نقل، سكن، تأمين صحي"
  },
  {
    id: 7,
    title: "مناظرة انتداب مهندسين وتقنيين بشركة اتصالات تونس",
    organization: "اتصالات تونس (TT)",
    type: "private",
    category: "قطاع خاص",
    level: "مهندس، تقني سامي",
    locations: ["تونس", "سوسة", "صفاقس"],
    deadline: "2026-05-25",
    status: "open",
    positions: 60,
    registrationLink: "#",
    results: null,
    salary: "1500-2200 دينار",
    benefits: "تأمين صحي، منحة النقل، هاتف"
  }
];

// ========== فرص العمل بالخارج ==========
const jobsAbroad = [
  {
    id: 101,
    title: "ممرضين وممرضات بالمستشفيات السعودية",
    country: "المملكة العربية السعودية",
    cities: ["الرياض", "جدة", "الدمام"],
    organization: "وزارة الصحة السعودية",
    level: "شهادة في التمريض + 2 سنوات خبرة",
    deadline: "2026-06-20",
    status: "open",
    positions: 500,
    salary: "4000-6000 ريال سعودي",
    benefits: "سكن، تذاكر سفر، تأمين صحي، إقامة",
    contract: "عقد سنوي قابل للتجديد",
    requirements: ["بطاقة تعريف وطنية", "جواز سفر ساري المفعول", "شهادة التمريض", "شهادة خبرة"],
    registrationLink: "#"
  },
  {
    id: 102,
    title: "تقنيين في الإعلامية والبرمجة بشركات ألمانية",
    country: "ألمانيا",
    cities: ["برلين", "ميونخ", "فرانكفورت"],
    organization: "برنامج التوظيف الألماني (Make it in Germany)",
    level: "شهادة ليسانس في الإعلامية + مستوى B1 ألماني",
    deadline: "2026-07-15",
    status: "open",
    positions: 300,
    salary: "3500-5000 يورو",
    benefits: "سكن، تكوين في اللغة، مساعدة في الإجراءات الإدارية",
    contract: "عقد عمل مباشر",
    requirements: ["شهادة ليسانس", "شهادة لغة ألمانية B1", "جواز سفر"],
    registrationLink: "#"
  },
  {
    id: 103,
    title: "عمال فلاحة وموسميين بجنوب فرنسا (قطف العنب والزيتون)",
    country: "فرنسا",
    cities: ["بروفانس", "بوردو", "أفينيون"],
    organization: "الوكالة الوطنية للتشغيل بالشراكة مع مكاتب التشغيل الفرنسية",
    level: "شهادة إتمام التعليم الأساسي",
    deadline: "2026-08-10",
    status: "open",
    positions: 1000,
    salary: "11.65 يورو/ساعة (SMIC الفرنسي)",
    benefits: "سكن متوفر (مقابل كراء رمزي)، وجبات متكاملة",
    contract: "عقد موسمي (3-6 أشهر)",
    requirements: ["بطاقة تعريف وطنية", "جواز سفر ساري المفعول", "شهادة صحية"],
    registrationLink: "#"
  },
  {
    id: 104,
    title: "سياحي وفندقي بمنتجعات دبي والإمارات",
    country: "الإمارات العربية المتحدة",
    cities: ["دبي", "أبوظبي", "الشارقة"],
    organization: "مجموعة فنادق إماراتية",
    level: "شهادة في السياحة والفندقة (أو تكوين مهني)",
    deadline: "2026-07-01",
    status: "open",
    positions: 200,
    salary: "4000-7000 درهم إماراتي",
    benefits: "سكن، تأمين صحي، تذاكر سفر سنوية",
    contract: "عقد سنوي",
    requirements: ["شهادة سياحة وفندقة", "بطاقة تعريف", "جواز سفر"],
    registrationLink: "#"
  },
  {
    id: 105,
    title: "حرفيين (كهربائيين، سباكين، بنائين) بدولة قطر",
    country: "قطر",
    cities: ["الدوحة", "الوكرة", "الخور"],
    organization: "مشاريع البنية التحتية القطرية",
    level: "شهادة تكوين مهني + خبرة 3 سنوات",
    deadline: "2026-09-30",
    status: "open",
    positions: 500,
    salary: "3000-5000 ريال قطري",
    benefits: "سكن، نقل، تأمين صحي",
    contract: "عقد سنوي قابل للتجديد",
    requirements: ["شهادة تكوين مهني", "خبرة عملية", "جواز سفر"],
    registrationLink: "#"
  },
  {
    id: 106,
    title: "نتائج انتداب مهندسين بشركة طيران قطر",
    country: "قطر",
    organization: "الخطوط الجوية القطرية",
    level: "مهندسين في الطيران",
    status: "closed",
    results: {
      pdfLink: "#",
      date: "2026-05-01",
      summary: "تم قبول 150 مهندساً من بين 4000 مترشح",
      topScore: "19.25/20"
    }
  }
];

// ========== خدمات موسمية ==========
const seasonalJobs = [
  {
    id: 201,
    title: "خدمات الصيف - منشطين وأعوان حماية ومراقبة بشواطئ سوسة والمنستير",
    season: "صيف 2026",
    organization: "الديوان الوطني للسياحة",
    period: "جوان - أوت 2026",
    deadline: "2026-05-30",
    status: "open",
    positions: 800,
    salary: "600-900 دينار/شهر",
    regions: ["سوسة", "المنستير", "المهدية", "نابل", "حمامات"],
    requirements: ["بطاقة تعريف وطنية", "شهادة صحية", "تكوين في السلامة (لأعوان الحماية)"],
    benefits: "تغطية صحية، وجبات متكاملة، سكن لبعض المناطق",
    registrationLink: "#"
  },
  {
    id: 202,
    title: "خدمات الحصاد - عمال فلاحة لجني الحبوب بولاية باجة وجندوبة",
    season: "موسم الحصاد 2026",
    organization: "الاتحاد التونسي للفلاحة والصيد البحري",
    period: "ماي - جويلية 2026",
    deadline: "2026-05-20",
    status: "open",
    positions: 1500,
    salary: "250 دينار/أسبوع (حوالي 35 دينار/يوم)",
    regions: ["باجة", "جندوبة", "الكاف", "سليانة"],
    requirements: ["بطاقة تعريف وطنية", "شهادة صحية"],
    benefits: "وجبات متكاملة، نقل من وإلى مكان العمل",
    registrationLink: "#"
  },
  {
    id: 203,
    title: "خدمات الزيتون - عمال جني الزيتون بولاية صفاقس وسيدي بوزيد",
    season: "موسم الزيتون 2026/2027",
    organization: "الغرفة الوطنية للفلاحة",
    period: "أكتوبر - ديسمبر 2026",
    deadline: "2026-09-15",
    status: "open",
    positions: 3000,
    salary: "40 دينار/يوم + نسبة من المحصول",
    regions: ["صفاقس", "سيدي بوزيد", "القيروان", "المهدية"],
    requirements: ["بطاقة تعريف وطنية", "شهادة صحية"],
    benefits: "وجبات متكاملة، سكن متوفر",
    registrationLink: "#"
  },
  {
    id: 204,
    title: "خدمات العيد - منشطين وباعة في الأسواق والمجمعات التجارية",
    season: "عيد الأضحى 2026",
    organization: "الغرفة الوطنية للتجارة",
    period: "جوان - جويلية 2026",
    deadline: "2026-06-10",
    status: "open",
    positions: 500,
    salary: "500-700 دينار/شهر + عمولة",
    regions: ["جميع الولايات"],
    requirements: ["بطاقة تعريف وطنية", "شهابة صحية"],
    benefits: "تكوين سريع في البيع والمنشطات",
    registrationLink: "#"
  },
  {
    id: 205,
    title: "خدمات موسم الصيف - مرشدين سياحيين وأعوان استقبال بجربة وطبرقة",
    season: "صيف 2026",
    organization: "وزارة السياحة",
    period: "جوان - سبتمبر 2026",
    deadline: "2026-06-05",
    status: "open",
    positions: 400,
    salary: "700-1000 دينار/شهر",
    regions: ["جربة", "طبرقة", "حمامات", "سوسة"],
    requirements: ["شهادة سياحة (يفضل)", "بطاقة تعريف", "معرفة لغة أجنبية"],
    benefits: "سكن متوفر، وجبات متكاملة، تأمين صحي",
    registrationLink: "#"
  }
];

// دالة للحصول على لون الحالة
const getStatusBadge = (status: string) => {
  if (status === "open") return <Badge className="bg-green-100 text-green-700">✅ مفتوحة للتسجيل</Badge>;
  return <Badge className="bg-red-100 text-red-700">❌ مغلقة - النتائج منشورة</Badge>;
};

// دالة للحصول على أيقونة النوع
const getTypeIcon = (type: string) => {
  if (type === "public") return <Building2 className="h-5 w-5 text-blue-600" />;
  if (type === "private") return <Briefcase className="h-5 w-5 text-purple-600" />;
  if (type === "abroad") return <Globe className="h-5 w-5 text-emerald-600" />;
  return <Sun className="h-5 w-5 text-amber-600" />;
};

// دالة للحصول على أيقونة الموسم
const getSeasonIcon = (season: string) => {
  if (season.includes("صيف")) return <Sun className="h-5 w-5 text-amber-500" />;
  if (season.includes("الحصاد")) return <TrendingUp className="h-5 w-5 text-green-600" />;
  if (season.includes("الزيتون")) return <Award className="h-5 w-5 text-emerald-600" />;
  return <Calendar className="h-5 w-5 text-blue-600" />;
};

export default function CareerNewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("public");

  const filterItems = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.regions?.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterType === "all" || 
                           (filterType === "open" && item.status === "open") ||
                           (filterType === "closed" && item.status === "closed");
      return matchesSearch && matchesFilter;
    });
  };

  const filteredPublic = filterItems(concoursPublics);
  const filteredPrivate = filterItems(concoursPrives);
  const filteredAbroad = filterItems(jobsAbroad);
  const filteredSeasonal = filterItems(seasonalJobs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <Award className="h-8 w-8 text-gold-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
            <span className="text-blue-600">آخر المستجدات الوظيفية
</span>
          </h1>
          <p className="text-orange-500 dark:text-orange-400 font-medium max-w-2xl mx-auto">
            ⚠️ مناظرات ووظائف عمومية وخاصة - فرص عمل بالخارج - خدمات موسمية ⚠️
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-blue-100 text-blue-700">🏛️ قطاع عام (وزارات، ديوانة...)</Badge>
            <Badge className="bg-purple-100 text-purple-700">🏢 قطاع خاص (شركات، بنوك...)</Badge>
            <Badge className="bg-emerald-100 text-emerald-700">🌍 فرص بالخارج</Badge>
            <Badge className="bg-amber-100 text-amber-700">☀️ خدمات موسمية</Badge>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="ابحث في كل الأقسام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 h-11 bg-white dark:bg-slate-900 rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={filterType === "all" ? "default" : "outline"} onClick={() => setFilterType("all")} className="gap-2 bg-blue-600">📋 الكل</Button>
            <Button variant={filterType === "open" ? "default" : "outline"} onClick={() => setFilterType("open")} className="gap-2 bg-green-600">✅ مفتوحة</Button>
            <Button variant={filterType === "closed" ? "default" : "outline"} onClick={() => setFilterType("closed")} className="gap-2 bg-red-600">📄 النتائج</Button>
          </div>
        </div>

        <Tabs defaultValue="public" className="w-full" dir="rtl" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            <TabsTrigger value="public" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Building2 className="h-4 w-4" /> قطاع عام
            </TabsTrigger>
            <TabsTrigger value="private" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Briefcase className="h-4 w-4" /> قطاع خاص
            </TabsTrigger>
            <TabsTrigger value="abroad" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Globe className="h-4 w-4" /> فرص بالخارج
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Sun className="h-4 w-4" /> خدمات موسمية
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: القطاع العام */}
          <TabsContent value="public" className="space-y-6">
            {filteredPublic.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl">
                <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">لا توجد نتائج مطابقة لبحثك</p>
              </div>
            ) : (
              filteredPublic.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-24 h-24 lg:h-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline">{item.level}</Badge>
                        {item.salary && <Badge variant="secondary" className="bg-green-50 text-green-700"><DollarSign className="h-3 w-3 inline ml-1" /> {item.salary}</Badge>}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h2>
                      <p className="text-sm text-slate-500 mb-3">{item.organization}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> آخر موعد: {item.deadline ? new Date(item.deadline).toLocaleDateString("ar-TN") : "انتهى"}</span>
                        {item.positions > 0 && <span className="flex items-center gap-1"><Users className="h-4 w-4" /> عدد المناصب: {item.positions}</span>}
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.locations.join(" - ")}</span>
                      </div>
                      {item.benefits && (
                        <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg"><span className="font-bold">🎁 الامتيازات:</span> {item.benefits}</p>
                      )}
                      {item.results && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                          <p className="text-sm font-medium">{item.results.summary}</p>
                          <p className="text-xs text-slate-500 mt-1">تاريخ الإعلان: {new Date(item.results.date).toLocaleDateString("ar-TN")}</p>
                          {item.results.topScore && <p className="text-xs text-green-600 mt-1">🏆 أعلى معدل: {item.results.topScore}</p>}
                        </div>
                      )}
                      <div className="flex gap-3 mt-4">
                        {item.registrationLink && (
                          <a href={item.registrationLink} target="_blank" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                            <ExternalLink className="h-4 w-4" /> التقدم للمناظرة
                          </a>
                        )}
                        {item.results?.pdfLink && (
                          <a href={item.results.pdfLink} target="_blank" className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline">
                            <Download className="h-4 w-4" /> تحميل النتائج
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* TAB 2: القطاع الخاص */}
          <TabsContent value="private" className="space-y-6">
            {filteredPrivate.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl">
                <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">لا توجد نتائج مطابقة لبحثك</p>
              </div>
            ) : (
              filteredPrivate.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-24 h-24 lg:h-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline">{item.level}</Badge>
                        {item.salary && <Badge variant="secondary" className="bg-green-50 text-green-700"><DollarSign className="h-3 w-3 inline ml-1" /> {item.salary}</Badge>}
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h2>
                      <p className="text-sm text-slate-500 mb-3">{item.organization}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> آخر موعد: {item.deadline ? new Date(item.deadline).toLocaleDateString("ar-TN") : "انتهى"}</span>
                        {item.positions > 0 && <span className="flex items-center gap-1"><Users className="h-4 w-4" /> عدد المناصب: {item.positions}</span>}
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.locations.join(" - ")}</span>
                      </div>
                      {item.benefits && (
                        <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg"><span className="font-bold">🎁 الامتيازات:</span> {item.benefits}</p>
                      )}
                      {item.results && (
                        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                          <p className="text-sm font-medium">{item.results.summary}</p>
                          <p className="text-xs text-slate-500 mt-1">تاريخ الإعلان: {new Date(item.results.date).toLocaleDateString("ar-TN")}</p>
                          {item.results.topScore && <p className="text-xs text-green-600 mt-1">🏆 أعلى معدل: {item.results.topScore}</p>}
                        </div>
                      )}
                      <div className="flex gap-3 mt-4">
                        {item.registrationLink && (
                          <a href={item.registrationLink} target="_blank" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                            <ExternalLink className="h-4 w-4" /> التقدم للمناظرة
                          </a>
                        )}
                        {item.results?.pdfLink && (
                          <a href={item.results.pdfLink} target="_blank" className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline">
                            <Download className="h-4 w-4" /> تحميل النتائج
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* TAB 3: فرص العمل بالخارج */}
          <TabsContent value="abroad" className="space-y-6">
            {filteredAbroad.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl">
                <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">لا توجد نتائج مطابقة لبحثك</p>
              </div>
            ) : (
              filteredAbroad.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-24 h-24 lg:h-auto bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 flex items-center justify-center">
                      <Globe className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">{item.country}</Badge>
                        <Badge variant="outline">{item.level}</Badge>
                        <Badge variant="secondary" className="bg-green-50 text-green-700"><DollarSign className="h-3 w-3 inline ml-1" /> {item.salary}</Badge>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h2>
                      <p className="text-sm text-slate-500 mb-3">{item.organization}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.cities?.join(" - ") || item.country}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> آخر موعد: {item.deadline ? new Date(item.deadline).toLocaleDateString("ar-TN") : "انتهى"}</span>
                        {item.positions && <span className="flex items-center gap-1"><Users className="h-4 w-4" /> عدد المناصب: {item.positions}</span>}
                        {item.contract && <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {item.contract}</span>}
                      </div>
                      <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg"><span className="font-bold">🎁 الامتيازات:</span> {item.benefits}</p>
                      {item.requirements && (
                        <div className="mt-2">
                          <p className="text-sm font-bold">📋 الشروط المطلوبة:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.requirements.map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{req}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.results && (
                        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                          <p className="text-sm font-medium">{item.results.summary}</p>
                          <p className="text-xs text-slate-500 mt-1">تاريخ الإعلان: {new Date(item.results.date).toLocaleDateString("ar-TN")}</p>
                          {item.results.topScore && <p className="text-xs text-green-600 mt-1">🏆 أعلى معدل: {item.results.topScore}</p>}
                        </div>
                      )}
                      <div className="flex gap-3 mt-4">
                        {item.registrationLink && (
                          <a href={item.registrationLink} target="_blank" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                            <ExternalLink className="h-4 w-4" /> التقدم للفرصة
                          </a>
                        )}
                        {item.results?.pdfLink && (
                          <a href={item.results.pdfLink} target="_blank" className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline">
                            <Download className="h-4 w-4" /> تحميل النتائج
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* TAB 4: خدمات موسمية */}
          <TabsContent value="seasonal" className="space-y-6">
            {filteredSeasonal.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl">
                <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">لا توجد نتائج مطابقة لبحثك</p>
              </div>
            ) : (
              filteredSeasonal.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-24 h-24 lg:h-auto bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 flex items-center justify-center">
                      {getSeasonIcon(item.season)}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {getStatusBadge(item.status)}
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">{item.season}</Badge>
                        <Badge variant="outline">{item.period}</Badge>
                        <Badge variant="secondary" className="bg-green-50 text-green-700"><DollarSign className="h-3 w-3 inline ml-1" /> {item.salary}</Badge>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h2>
                      <p className="text-sm text-slate-500 mb-3">{item.organization}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.regions.join(" - ")}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> آخر موعد: {new Date(item.deadline).toLocaleDateString("ar-TN")}</span>
                        {item.positions && <span className="flex items-center gap-1"><Users className="h-4 w-4" /> عدد المناصب: {item.positions}</span>}
                      </div>
                      <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg"><span className="font-bold">🎁 الامتيازات:</span> {item.benefits}</p>
                      {item.requirements && (
                        <div className="mt-2">
                          <p className="text-sm font-bold">📋 الشروط المطلوبة:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.requirements.map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{req}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3 mt-4">
                        {item.registrationLink && (
                          <a href={item.registrationLink} target="_blank" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                            <ExternalLink className="h-4 w-4" /> التقدم للخدمة
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" /> العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}