"use client";
import React, { useState } from "react";
import {
  Briefcase, Calendar, Clock, MapPin, Users, FileText,
  ExternalLink, Download, CheckCircle, XCircle, AlertCircle,
  Home, Search, Filter, ChevronLeft, ChevronRight, Eye, Building2,
  Award, GraduationCap, DollarSign, Globe, Phone, Mail, Link as LinkIcon
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
  },
  {
    id: 5,
    title: "نتائج مناظرة الانتداب بوزارة التربية (أساتذة)",
    organization: "وزارة التربية",
    type: "public",
    category: "نتائج",
    level: "أستاذية",
    locations: ["تونس", "سوسة", "صفاقس"],
    deadline: null,
    status: "closed",
    positions: 0,
    registrationLink: null,
    results: {
      pdfLink: "#",
      date: "2026-04-15",
      summary: "تم قبول 1200 مترشح من بين 5000 مترشح",
      topScore: "17.75/20"
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
  },
  {
    id: 8,
    title: "مناظرة انتداب أعوان إدارة وتسويق بشركة التونسية للبنك",
    organization: "البنك التونسي (BT)",
    type: "private",
    category: "قطاع خاص",
    level: "شهادة ليسانس فما فوق",
    locations: ["تونس", "سوسة", "صفاقس", "نابل"],
    deadline: "2026-06-10",
    status: "open",
    positions: 35,
    registrationLink: "#",
    results: null,
    salary: "1200-1700 دينار",
    benefits: "تأمين صحي، منحة السفر"
  },
  {
    id: 9,
    title: "نتائج مناظرة الانتداب بشركة تونس للكهرباء والغاز (STEG)",
    organization: "شركة تونس للكهرباء والغاز (STEG)",
    type: "private",
    category: "نتائج",
    level: "مهندسين وتقنيين",
    locations: ["تونس", "سوسة", "صفاقس", "باجة"],
    deadline: null,
    status: "closed",
    positions: 0,
    registrationLink: null,
    results: {
      pdfLink: "#",
      date: "2026-04-10",
      summary: "تم قبول 120 مترشح من بين 3500 مترشح",
      topScore: "19.00/20"
    }
  },
  {
    id: 10,
    title: "نتائج مناظرة الانتداب بشركة الخطوط التونسية",
    organization: "الخطوط التونسية (TUNISAIR)",
    type: "private",
    category: "نتائج",
    level: "مضيفين، تقنيين، محللين",
    locations: ["تونس"],
    deadline: null,
    status: "closed",
    positions: 0,
    registrationLink: null,
    results: {
      pdfLink: "#",
      date: "2026-04-05",
      summary: "تم قبول 80 مترشح من بين 1800 مترشح",
      topScore: "18.50/20"
    }
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
  return <Briefcase className="h-5 w-5 text-purple-600" />;
};

export default function CareerNewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filterItems = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || 
                           (filterType === "open" && item.status === "open") ||
                           (filterType === "closed" && item.status === "closed");
      return matchesSearch && matchesFilter;
    });
  };

  const filteredPublic = filterItems(concoursPublics);
  const filteredPrivate = filterItems(concoursPrives);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <Award className="h-8 w-8 text-gold-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
            آخر <span className="text-blue-600">المستجدات الوظيفية</span>
          </h1>
          <p className="text-orange-500 dark:text-orange-400 font-medium max-w-2xl mx-auto">
            ⚠️ خاص بالمناظرات العمومية والخاصة في تونس ⚠️
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-blue-100 text-blue-700">🏛️ قطاع عام (وزارات، ديوانة، صحة...)</Badge>
            <Badge className="bg-purple-100 text-purple-700">🏢 قطاع خاص (شركات، بنوك، STEG...)</Badge>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-s top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="ابحث بمنصب، مؤسسة، وزارة..."
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

        <Tabs defaultValue="public" className="w-full" dir="rtl">
          <TabsList className="grid grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            <TabsTrigger value="public" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Building2 className="h-4 w-4" /> مناظرات القطاع العام
            </TabsTrigger>
            <TabsTrigger value="private" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Briefcase className="h-4 w-4" /> مناظرات القطاع الخاص
            </TabsTrigger>
          </TabsList>

          {/* TAB: القطاع العام */}
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

          {/* TAB: القطاع الخاص */}
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