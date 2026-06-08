/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { auth_service_url, useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Badge } from "@/components/ui/badge";  // 👈 أضف هذا السطر

import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Loader,
  Lock,
  Mail,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  User,
  Phone,
  FileText,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Tag,
  Wrench,
  DollarSign,
  Globe,
  Facebook,
  Linkedin,
  Instagram
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { wilayasList, getDelegationsByWilaya, categoriesList, subCategoriesList, languagesList, workDaysList } from "@/lib/tunisiaData";

// إنشاء tunisiaData للتوافق مع الكود القديم
const tunisiaData: Record<string, string[]> = {};
wilayasList.forEach(wilaya => {
  tunisiaData[wilaya] = getDelegationsByWilaya(wilaya);
});

const RegisterPage = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Common Fields
  const [wilaya, setWilaya] = useState("");
  const [moatmadia, setMoatmadia] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hasPermis, setHasPermis] = useState<string>("");
  const [permisType, setPermisType] = useState("");
  const [moatmadiaOptions, setMoatmadiaOptions] = useState<string[]>([]);

  // Category & SubCategory
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState<string[]>([]);

  // JobSeeker Specific
  const [educationType, setEducationType] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // Freelancer Specific
  const [activity, setActivity] = useState("");
  
  // Freelancer Additional Fields
  const [yearsExperience, setYearsExperience] = useState(0);
  const [availableNow, setAvailableNow] = useState("true");
  const [hourlyRate, setHourlyRate] = useState("");
  const [workRadius, setWorkRadius] = useState(20);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [workDays, setWorkDays] = useState<string[]>(["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]);
  const [workStartTime, setWorkStartTime] = useState("08:00");
  const [workEndTime, setWorkEndTime] = useState("17:00");

  // Fonctions
  const addLanguage = () => {
    if (selectedLanguage && !languages.includes(selectedLanguage)) {
      setLanguages([...languages, selectedLanguage]);
      setSelectedLanguage("");
    }
  };
  const removeLanguage = (lang: string) => setLanguages(languages.filter(l => l !== lang));

  const { isAuth, setUser, loading, setIsAuth } = useAppData();

  useEffect(() => {
    if (wilaya && tunisiaData[wilaya]) {
      setMoatmadiaOptions(tunisiaData[wilaya]);
      setMoatmadia("");
    } else {
      setMoatmadiaOptions([]);
    }
  }, [wilaya]);

  useEffect(() => {
    if (selectedCategory && subCategoriesList[selectedCategory]) {
      setSubCategoryOptions(subCategoriesList[selectedCategory]);
      setSelectedSubCategory("");
    } else {
      setSubCategoryOptions([]);
    }
  }, [selectedCategory]);

  if (loading) return <Loading />;
  if (isAuth) return redirect("/");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) return toast.error("بالله اختار صفتك");
    
    if (phoneNumber.length !== 8) {
      return toast.error("رقم الهاتف لازم يكون فيه 8 أرقام");
    }

    if (role === "jobseeker" && educationType === "fac" && !resume) {
      return toast.error("بما أنك قاري في الجامعة، الـ CV إجباري");
    }

    if (role === "freelancer" && !activity) {
      return toast.error("أذكر نشاطك المهني (نجار، بلومبي، كهربائي...)");
    }

    setBtnLoading(true);
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("wilaya", wilaya);
    formData.append("moatmadia", moatmadia);
    
    const finalSpecialty = selectedSubCategory || specialty;
    formData.append("specialty", finalSpecialty);
    formData.append("hasPermis", hasPermis);
    formData.append("permisType", permisType);

    if (role === "jobseeker") {
      formData.append("educationType", educationType);
      formData.append("bio", bio);
      if (resume) formData.append("file", resume);
    }

    if (role === "freelancer") {
      formData.append("activity", activity);
      formData.append("bio", bio);
      formData.append("yearsExperience", yearsExperience.toString());
      formData.append("availableNow", availableNow);
      formData.append("hourlyRate", hourlyRate);
      formData.append("workRadius", workRadius.toString());
      formData.append("languages", JSON.stringify(languages));
      formData.append("portfolio", portfolio);
      formData.append("socialMedia", JSON.stringify({ facebook, linkedin, instagram }));
      formData.append("workDays", JSON.stringify(workDays));
      formData.append("workHours", JSON.stringify({ start: workStartTime, end: workEndTime }));
    }

    try {
      const { data } = await axios.post(`${auth_service_url}/api/auth/register`, formData);
      toast.success("تم إنشاء الحساب بنجاح!");
      Cookies.set("token", data.token, { expires: 15, secure: false, path: "/" });
      setUser(data.registeredUser);
      setIsAuth(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "ثبت في معطياتك");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#FDFDFD] dark:bg-slate-950 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 dark:bg-blue-900/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100 dark:bg-purple-900/10 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg transition-transform group-hover:scale-110">
              <BriefcaseBusiness size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">خدّمن<span className="text-blue-600">ي</span></span>
          </Link>
          
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">أعمل حساب جديد</h1>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-slate-100 dark:border-slate-800">
          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-1">بصفتك: *</Label>
              <div className="grid grid-cols-3 gap-3">
                <button type="button" onClick={() => setRole("jobseeker")} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === "jobseeker" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 dark:border-slate-800"}`}>
                  <User size={24} className={role === "jobseeker" ? "text-blue-600" : "text-slate-400"} />
                  <span className="text-xs font-bold">نلوّج على خدمة</span>
                </button>
                <button type="button" onClick={() => setRole("recruiter")} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === "recruiter" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 dark:border-slate-800"}`}>
                  <Briefcase size={24} className={role === "recruiter" ? "text-blue-600" : "text-slate-400"} />
                  <span className="text-xs font-bold">صاحب مؤسسة</span>
                </button>
                <button type="button" onClick={() => setRole("freelancer")} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === "freelancer" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 dark:border-slate-800"}`}>
                  <Wrench size={24} className={role === "freelancer" ? "text-blue-600" : "text-slate-400"} />
                  <span className="text-xs font-bold">حرفي/مستقل</span>
                </button>
              </div>
            </div>

            {role && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">
                      {role === "recruiter" ? "إسم الشركة / صاحب العمل *" : "الإسم واللقب *"}
                    </Label>
                    <div className="relative"><User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input value={name} onChange={(e) => setName(e.target.value)} required className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">رقم الهاتف *</Label>
                    <div className="relative"><Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="مثلا: 22111333" className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                  </div>
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-600">
                    {role === "recruiter" ? "مجال نشاط الشركة *" : role === "freelancer" ? "مجال نشاطك *" : "مجالك المهني *"}
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} dir="rtl">
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-right"><SelectValue placeholder="اختر المجال الرئيسي" /></SelectTrigger>
                    <SelectContent>{categoriesList.map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>

                {/* SubCategory Dropdown */}
                {selectedCategory && subCategoryOptions.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">{role === "freelancer" ? "حرفتك بالتفصيل *" : "اختصاصك بالتفصيل *"}</Label>
                    <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory} dir="rtl">
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-right"><SelectValue placeholder="اختر اختصاصك بالتفصيل" /></SelectTrigger>
                      <SelectContent>{subCategoryOptions.map((sub) => (<SelectItem key={sub} value={sub}>{sub}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                )}

                {/* Custom Specialty Input */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-600">{selectedSubCategory ? "اختصاص إضافي (اختياري)" : "أذكر اختصاصك *"}</Label>
                  <div className="relative"><Tag className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder={role === "recruiter" ? "مثلا: برمجيات، مقاولات..." : role === "freelancer" ? "مثلا: نجارة تفصيل..." : "مثلا: React، محاسبة..."} value={specialty} onChange={(e) => setSpecialty(e.target.value)} required={!selectedSubCategory} className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                </div>

                {/* Freelancer specific activity */}
                {role === "freelancer" && (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">تفصيل النشاط *</Label>
                    <div className="relative"><Wrench className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="مثال: أعمال خشب، سباكة عامة..." value={activity} onChange={(e) => setActivity(e.target.value)} required className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                  </div>
                )}

                {/* Wilaya & Moatmadia */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">الولاية *</Label>
                    <Select value={wilaya} onValueChange={setWilaya} dir="rtl">
                      <SelectTrigger className="h-12 bg-slate-50 rounded-xl text-right"><SelectValue placeholder="اختر الولاية" /></SelectTrigger>
                      <SelectContent>{wilayasList.map((w) => (<SelectItem key={w} value={w}>{w}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">المعتمدية *</Label>
                    <Select value={moatmadia} onValueChange={setMoatmadia} disabled={!wilaya} dir="rtl">
                      <SelectTrigger className="h-12 bg-slate-50 rounded-xl text-right"><SelectValue placeholder={wilaya ? "اختر المعتمدية" : "إختر الولاية أولاً"} /></SelectTrigger>
                      <SelectContent>{moatmadiaOptions.map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Email & Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-xs font-bold text-slate-600">الإيميل *</Label><div className="relative"><Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pr-10 h-12 bg-slate-50 rounded-xl" /></div></div>
                  <div className="space-y-2"><Label className="text-xs font-bold text-slate-600">كلمة السر *</Label><div className="relative"><Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10 pl-10 h-12 bg-slate-50 rounded-xl" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <Eye size={18} /> : <EyeOff size={18} />}</button></div></div>
                </div>

                {/* Permis */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2"><Wrench size={18} className="text-blue-600" /><Label className="text-sm font-bold">عندك رخصة سياقة؟</Label></div>
                  <div className="flex gap-4">{["yes", "no"].map((opt) => (<label key={opt} className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${hasPermis === opt ? "border-blue-600 bg-blue-50" : "border-slate-100"}`}><input type="radio" className="hidden" name="permis" value={opt} onChange={(e) => setHasPermis(e.target.value)} /><span className="text-sm font-bold">{opt === "yes" ? "نعم" : "لا"}</span></label>))}</div>
                </div>
                {hasPermis === "yes" && (<Input placeholder="أذكر صنف رخصة السياقة" value={permisType} onChange={(e) => setPermisType(e.target.value)} className="h-12 bg-slate-50 rounded-xl" />)}

                {/* Bio */}
                <div className="space-y-2"><Label className="text-xs font-bold text-slate-600 mr-1">تعريف قصير (Bio) {role !== "recruiter" ? "*" : "(اختياري)"}</Label><textarea value={bio} onChange={(e) => setBio(e.target.value)} required={role !== "recruiter"} rows={3} placeholder={role === "freelancer" ? "أحكيلنا على خبراتك ومجالات خدمتك..." : "أحكيلنا على خبراتك..."} className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none text-right resize-none" /></div>

                {/* Freelancer Additional Fields */}
                {role === "freelancer" && (
                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <div className="space-y-2"><Label className="text-sm font-bold">🎓 سنوات الخبرة</Label><Select value={yearsExperience.toString()} onValueChange={(v) => setYearsExperience(parseInt(v))}><SelectTrigger className="h-12 bg-slate-50 rounded-xl"><SelectValue placeholder="اختر عدد سنوات الخبرة" /></SelectTrigger><SelectContent>{[0,1,2,3,4,5,6,7,8,9,10,12,15,20].map(y => (<SelectItem key={y} value={y.toString()}>{y === 0 ? "أقل من سنة" : y + " سنوات"}</SelectItem>))}</SelectContent></Select></div>
                    <div className="space-y-2"><Label className="text-sm font-bold">⏰ متاح حالياً؟</Label><div className="flex gap-4"><label className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer ${availableNow === "true" ? "border-green-600 bg-green-50" : "border-slate-200"}`}><input type="radio" className="hidden" name="available" value="true" onChange={(e) => setAvailableNow(e.target.value)} /> ✅ نعم</label><label className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer ${availableNow === "false" ? "border-red-600 bg-red-50" : "border-slate-200"}`}><input type="radio" className="hidden" name="available" value="false" onChange={(e) => setAvailableNow(e.target.value)} /> ⏸ لا</label></div></div>
                    <div className="space-y-2"><Label className="text-sm font-bold">💰 السعر بالساعة (د.ت) - اختياري</Label><div className="relative"><DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input type="number" placeholder="مثلاً: 25" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="pr-10 h-12 bg-slate-50 rounded-xl" /></div></div>
                    <div className="space-y-2"><Label className="text-sm font-bold">📍 نصف قطر العمل (كلم)</Label><Select value={workRadius.toString()} onValueChange={(v) => setWorkRadius(parseInt(v))}><SelectTrigger className="h-12 bg-slate-50 rounded-xl"><SelectValue placeholder="اختر المسافة" /></SelectTrigger><SelectContent>{[5,10,15,20,30,40,50,60,70,80,90,100].map(r => (<SelectItem key={r} value={r.toString()}>{r} كم</SelectItem>))}</SelectContent></Select></div>
                    
                    {/* Languages - Dropdown */}
                    <div className="space-y-2">
                      <Label className="text-sm font-bold">🗣️ اللغات</Label>
                      <div className="flex gap-2">
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage} dir="rtl">
                          <SelectTrigger className="flex-1 h-12 bg-slate-50 rounded-xl text-right"><SelectValue placeholder="اختر لغة" /></SelectTrigger>
                          <SelectContent>
                            {languagesList.map((lang) => (<SelectItem key={lang.id} value={lang.name}>{lang.flag} {lang.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                        <Button type="button" onClick={addLanguage} className="h-12 px-6 bg-blue-600">إضافة</Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">{languages.map(lang => (<Badge key={lang} className="bg-blue-100 text-blue-700 px-3 py-1.5">{lang}<button type="button" onClick={() => removeLanguage(lang)} className="mr-2 text-red-500">✕</button></Badge>))}</div>
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-2"><Label className="text-sm font-bold">🖼️ Portfolio / موقع شخصي - اختياري</Label><div className="relative"><Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="https://example.com" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="pr-10 h-12 bg-slate-50 rounded-xl" /></div></div>
                    
                    {/* Social Media */}
                    <div className="space-y-3 pt-2">
                      <Label className="text-sm font-bold">🌐 وسائل التواصل - اختياري</Label>
                      <div className="relative"><Facebook className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" /><Input placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="pr-10 h-12 bg-slate-50 rounded-xl" /></div>
                      <div className="relative"><Linkedin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-700" /><Input placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="pr-10 h-12 bg-slate-50 rounded-xl" /></div>
                      <div className="relative"><Instagram className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-600" /><Input placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="pr-10 h-12 bg-slate-50 rounded-xl" /></div>
                    </div>

                    {/* Work Days */}
                    <div className="space-y-2"><Label className="text-sm font-bold">📅 أيام العمل</Label><div className="flex flex-wrap gap-2">{workDaysList.map(day => (<button type="button" key={day} onClick={() => setWorkDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])} className={`px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${workDays.includes(day) ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-200 text-slate-600"}`}>{day}</button>))}</div></div>
                    
                    {/* Work Hours */}
                    <div className="space-y-2"><Label className="text-sm font-bold">⏰ ساعات العمل</Label><div className="grid grid-cols-2 gap-4"><div><Label className="text-xs">من</Label><Input type="time" value={workStartTime} onChange={(e) => setWorkStartTime(e.target.value)} className="h-12 bg-slate-50 rounded-xl" /></div><div><Label className="text-xs">إلى</Label><Input type="time" value={workEndTime} onChange={(e) => setWorkEndTime(e.target.value)} className="h-12 bg-slate-50 rounded-xl" /></div></div></div>

                  </div>
                )}

                {role === "jobseeker" && (
                  <div className="pt-4 border-t border-slate-100 space-y-6">
                    <div className="space-y-3"><Label className="text-sm font-bold flex items-center gap-2"><BookOpen size={18} className="text-blue-600" /> المستوى الدراسي / التكويني:</Label><div className="grid grid-cols-3 gap-3">{[{ id: "fac", label: "جامعي (Fac)" }, { id: "formation", label: "تكوين (Formation)" }, { id: "none", label: "آخر / بدون" }].map((opt) => (<label key={opt.id} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${educationType === opt.id ? "border-blue-600 bg-blue-50" : "border-slate-100"}`}><input type="radio" className="hidden" name="edu" value={opt.id} onChange={(e) => setEducationType(e.target.value)} /><span className="text-[11px] font-bold">{opt.label}</span></label>))}</div></div>
                    <div className="space-y-2"><Label className="text-xs font-bold text-slate-600">تحميل السيرة الذاتية (PDF) {educationType === "fac" ? " * (إجباري)" : "(اختياري)"}</Label><div className="relative"><FileText className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input type="file" accept=".pdf" onChange={(e) => e.target.files && setResume(e.target.files[0])} required={educationType === "fac"} className="pr-10 py-2 h-12 bg-slate-50 rounded-xl file:bg-blue-600 file:text-white file:border-0 file:rounded-lg file:px-3 file:ml-4 file:text-xs file:font-bold cursor-pointer" /></div></div>
                  </div>
                )}

                <Button type="submit" disabled={btnLoading} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-200 font-bold text-lg transition-all active:scale-95 gap-3 mt-4">
                  {btnLoading ? <><Loader size={20} className="animate-spin" /> لحظة... </> : <><span className="text-xl">إنشاء الحساب</span> <ArrowRight size={20} className="rotate-180" /></>}
                </Button>
              </div>
            )}

            <div className="pt-6 text-center border-t border-slate-50">
              <p className="text-sm text-slate-500 font-medium">عندك حساب ديجا؟ <Link href="/login" className="text-blue-600 font-black hover:underline">سجل دخولك توّة</Link></p>
            </div>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} />
          <span className="text-xs font-medium">معطياتك الشخصية محمية وآمنة 100%</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;