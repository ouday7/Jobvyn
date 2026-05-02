"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MapPin, Phone, Mail, Briefcase, ArrowLeft, CheckCircle2, XCircle,
  Star, Award, Clock, ThumbsUp, MessageCircle, Share2,
  Wrench, Calendar, User, ShieldCheck, Truck, Heart,
  Globe, Facebook, Linkedin, Instagram, DollarSign, TrendingUp,
  Languages, GraduationCap
} from "lucide-react";
import { getSpecialtyIcon, languagesList } from "@/lib/tunisiaData";

export default function FreelancerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [freelancer, setFreelancer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4002/api/user/freelancers/${id}`);
        setFreelancer(data.freelancer);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-500 font-medium">جاري تحميل الملف الشخصي...</p>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950">
        <div className="text-center">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">المستقل غير موجود</p>
          <Link href="/freelance">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-xl">العودة للقائمة</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Parsing des données JSON
  const languages = freelancer.languages ? (Array.isArray(freelancer.languages) ? freelancer.languages : JSON.parse(freelancer.languages)) : [];
  const socialMedia = freelancer.social_media ? (typeof freelancer.social_media === 'object' ? freelancer.social_media : JSON.parse(freelancer.social_media)) : {};
  const workDays = freelancer.work_days ? (Array.isArray(freelancer.work_days) ? freelancer.work_days : JSON.parse(freelancer.work_days)) : [];
  const workHours = freelancer.work_hours ? (typeof freelancer.work_hours === 'object' ? freelancer.work_hours : JSON.parse(freelancer.work_hours)) : { start: "08:00", end: "17:00" };

  const yearsExp = freelancer.years_experience || 0;
  const niveauInfo = {
    name: yearsExp >= 15 ? "معلم" : yearsExp >= 10 ? "خبير" : yearsExp >= 5 ? "متمكن" : yearsExp >= 2 ? "متوسط" : "مبتدئ",
    stars: yearsExp >= 15 ? 5 : yearsExp >= 10 ? 4 : yearsExp >= 5 ? 3 : yearsExp >= 2 ? 2 : 1,
    color: yearsExp >= 15 ? "#F44336" : yearsExp >= 10 ? "#FF9800" : yearsExp >= 5 ? "#2196F3" : yearsExp >= 2 ? "#4CAF50" : "#9E9E9E"
  };

  const availabilityColor = freelancer.available_now ? "bg-green-500" : "bg-red-500";
  const availabilityText = freelancer.available_now ? "متاح حالياً ✅" : "غير متاح حالياً ⏸";

  const hasHourlyRate = freelancer.hourly_rate && freelancer.hourly_rate > 0;

  // عرض ساعات العمل بشكل صحيح (إذا كانت start > end نبدلهم)
  const displayStart = workHours.start && workHours.end && workHours.start > workHours.end ? workHours.end : workHours.start;
  const displayEnd = workHours.start && workHours.end && workHours.start > workHours.end ? workHours.start : workHours.end;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-8 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">

        {/* Bouton retour */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2 rounded-xl text-slate-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" /> رجوع
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* En-tête avec bannière */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">

          <div className="relative h-44 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute -bottom-12 right-8">
              <div className="h-28 w-28 rounded-2xl bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-6xl">{getSpecialtyIcon(freelancer.specialty)}</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-6 flex gap-2">
              <Badge className={`${availabilityColor} text-white shadow-md px-3 py-1.5 rounded-full text-xs font-bold`}>
                {availabilityText}
              </Badge>
            </div>
          </div>

          <div className="pt-16 p-8">

            {/* Nom et profession */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                  {freelancer.full_name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm px-4 py-1.5 rounded-full">
                    {getSpecialtyIcon(freelancer.specialty)} {freelancer.specialty}

                  </Badge>
                  <Badge className={`bg-${niveauInfo.color.slice(1)}/10 text-${niveauInfo.color.slice(1)}-600 border text-sm px-4 py-1.5 rounded-full`}>
                    <Award className="h-3 w-3 inline ml-1" /> {niveauInfo.name}
                  </Badge>
                  <Badge variant="outline" className="gap-1 px-3 py-1.5">
                    <Briefcase className="h-3 w-3" /> {yearsExp} {yearsExp <= 1 ? "سنة خبرة" : "سنوات خبرة"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-2xl">
                {[...Array(niveauInfo.stars)].map((_, i) => (
                  <Award key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>

            {/* Cartes de statistiques rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {freelancer.total_jobs_completed > 0 && (
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                  <Briefcase className="h-7 w-7 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{freelancer.total_jobs_completed}</p>
                  <p className="text-xs text-slate-500">مشروعات</p>
                </div>
              )}
              {hasHourlyRate && (
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                  <DollarSign className="h-7 w-7 text-green-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{freelancer.hourly_rate} د.ت</p>
                  <p className="text-xs text-slate-500">السعر/ساعة</p>
                </div>
              )}
              {workDays.length > 0 && (
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                  <Calendar className="h-7 w-7 text-purple-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{workDays.length}</p>
                  <p className="text-xs text-slate-500">أيام العمل</p>
                </div>
              )}
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                <Clock className="h-7 w-7 text-orange-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {displayStart && displayEnd ? `${displayStart} - ${displayEnd}` : "غير محدد"}
                </p>
                <p className="text-xs text-slate-500">ساعات العمل</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
              <TabsList className="grid grid-cols-4 mb-8 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
                <TabsTrigger value="info" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 gap-2">
                  <User className="h-4 w-4" /> معلومات
                </TabsTrigger>
                <TabsTrigger value="skills" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 gap-2">
                  <GraduationCap className="h-4 w-4" /> مهارات
                </TabsTrigger>
                <TabsTrigger value="services" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 gap-2">
                  <Calendar className="h-4 w-4" /> خدماتي
                </TabsTrigger>
                <TabsTrigger value="contact" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 gap-2">
                  <Phone className="h-4 w-4" /> تواصل
                </TabsTrigger>
              </TabsList>

              {/* Tab: معلومات */}
              <TabsContent value="info" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                        <User className="h-5 w-5" /> نبذة عني
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {freelancer.description || "لم تتم إضافة نبذة بعد"}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                        <MapPin className="h-5 w-5" /> معلومات الموقع
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-blue-500" /><span>{freelancer.wilaya} - {freelancer.moatmadia}</span></div>
                        <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-green-600" /><span>نصف قطر العمل: {freelancer.work_radius || 20} كم</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                        <Languages className="h-5 w-5" /> اللغات
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {languages.length > 0 ? languages.map((lang: string) => {
                          const langInfo = languagesList.find(l => l.name === lang);
                          return (
                            <Badge key={lang} className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 px-3 py-1.5 text-sm gap-1">
                              {langInfo?.flag} {lang}
                            </Badge>
                          );
                        }) : <span className="text-slate-400">لم يتم إضافة لغات</span>}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                        <ShieldCheck className="h-5 w-5" /> الشهادات والإضافات
                      </h3>
                      <div className="flex items-center gap-3">
                        {freelancer.has_permis ? (
                          <Badge className="bg-green-100 text-green-700"><CheckCircle2 className="h-3 w-3 inline ml-1" /> رخصة سياقة {freelancer.permis_type || "غير محدد"}</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 inline ml-1" /> ما عنديش رخصة سياقة</Badge>
                        )}
                      </div>
                    </div>

                    {freelancer.portfolio && (
                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                          <Globe className="h-5 w-5" /> Portfolio
                        </h3>
                        <a href={freelancer.portfolio} target="_blank" className="text-blue-600 hover:underline break-all">
                          {freelancer.portfolio}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Tab: مهارات */}
              <TabsContent value="skills" className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                    <Wrench className="h-5 w-5" /> اختصاصاتي
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200">
                      <span className="text-2xl">{getSpecialtyIcon(freelancer.specialty)}</span>
                      <span className="font-medium">{freelancer.specialty}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <span>{yearsExp} سنة خبرة</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                    <TrendingUp className="h-5 w-5" /> مستوى الخبرة
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>مبتدئ</span>
                      <span>خبير</span>
                    </div>
                    <Progress value={Math.min(yearsExp * 10, 100)} className="h-3 rounded-full" />
                    <p className="text-sm text-slate-500">{yearsExp} سنوات خبرة مهنية</p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab: خدماتي */}
              <TabsContent value="services" className="space-y-6">
                {hasHourlyRate && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-green-700">
                      <DollarSign className="h-5 w-5" /> السعر
                    </h3>
                    <p className="text-3xl font-black text-green-700">{freelancer.hourly_rate} <span className="text-lg">د.ت/ساعة</span></p>
                  </div>
                )}

                <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                    <Calendar className="h-5 w-5" /> أيام العمل
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {workDays.length > 0 ? workDays.map((day: string) => (
                      <Badge key={day} className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 px-4 py-2 text-sm rounded-xl">
                        {day}
                      </Badge>
                    )) : <span className="text-slate-400">لم يتم تحديد أيام العمل</span>}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                    <Clock className="h-5 w-5" /> ساعات العمل
                  </h3>
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl">
                    <Clock className="h-6 w-6 text-orange-500" />
                    <span className="text-lg font-bold">
                      {displayStart && displayEnd ? `${displayStart} - ${displayEnd}` : "غير محدد"}
                    </span>
                  </div>
                </div>
              </TabsContent>

              {/* Tab: تواصل */}
              <TabsContent value="contact" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                      <Phone className="h-5 w-5" /> اتصل بي
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl">
                        <Phone className="h-5 w-5 text-green-500" />
                        <span dir="ltr" className="font-mono">{freelancer.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl">
                        <Mail className="h-5 w-5 text-orange-500" />
                        <span>{freelancer.email}</span>
                      </div>
                    </div>
                  </div>

                  {(socialMedia.facebook || socialMedia.linkedin || socialMedia.instagram) && (
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                        <Globe className="h-5 w-5" /> وسائل التواصل
                      </h3>
                      <div className="flex gap-4">
                        {socialMedia.facebook && <a href={socialMedia.facebook} target="_blank" className="p-3 bg-white dark:bg-slate-900 rounded-xl hover:bg-blue-50"><Facebook className="h-6 w-6 text-blue-700" /></a>}
                        {socialMedia.linkedin && <a href={socialMedia.linkedin} target="_blank" className="p-3 bg-white dark:bg-slate-900 rounded-xl hover:bg-blue-50"><Linkedin className="h-6 w-6 text-blue-700" /></a>}
                        {socialMedia.instagram && <a href={socialMedia.instagram} target="_blank" className="p-3 bg-white dark:bg-slate-900 rounded-xl hover:bg-pink-50"><Instagram className="h-6 w-6 text-pink-600" /></a>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 gap-2 h-12 text-base rounded-xl" onClick={() => window.location.href = `tel:${freelancer.phone_number}`}>
                    <Phone className="h-5 w-5" /> اتصل بي الآن
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 h-12 text-base rounded-xl">
                    <MessageCircle className="h-5 w-5" /> راسلني
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 h-12 text-base rounded-xl">
                    <Heart className="h-5 w-5" /> أضف للمفضلة
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-6">
          <p>© 2026 Jobvyn - آخر تحديث : {new Date(freelancer.created_at).toLocaleDateString('ar-TN')}</p>
        </div>
      </div>
    </div>
  );
}