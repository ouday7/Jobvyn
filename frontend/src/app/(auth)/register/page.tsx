/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { auth_service_url, useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
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
  UserCircle,
  MapPin,
  GraduationCap,
  Car,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Tag
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

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

  // JobSeeker Specific
  const [educationType, setEducationType] = useState(""); 
  const [hasPermis, setHasPermis] = useState<string>("");
  const [permisType, setPermisType] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const { isAuth, setUser, loading, setIsAuth } = useAppData();

  if (loading) return <Loading />;
  if (isAuth) return redirect("/");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) return toast.error("بالله اختار صفتك");
    
    // Validation: Phone Number must be 8 digits (Tunisian format)
    if (phoneNumber.length !== 8) {
      return toast.error("رقم الهاتف لازم يكون فيه 8 أرقام");
    }

    if (role === "jobseeker" && educationType === "fac" && !resume) {
      return toast.error("بما أنك قاري في الجامعة، الـ CV إجباري");
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
    formData.append("specialty", specialty);

    if (role === "jobseeker") {
      formData.append("educationType", educationType);
      formData.append("hasPermis", hasPermis);
      formData.append("permisType", permisType);
      formData.append("bio", bio);
      if (resume) formData.append("file", resume);
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
      
      {/* Background Decor */}
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
            
            <div className="space-y-3">
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-1">بصفتك: *</Label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setRole("jobseeker")} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === "jobseeker" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 dark:border-slate-800"}`}>
                  <User size={24} className={role === "jobseeker" ? "text-blue-600" : "text-slate-400"} />
                  <span className="text-sm font-bold">نلوّج على خدمة</span>
                </button>
                <button type="button" onClick={() => setRole("recruiter")} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === "recruiter" ? "border-blue-600 bg-blue-50/50" : "border-slate-100 dark:border-slate-800"}`}>
                  <Briefcase size={24} className={role === "recruiter" ? "text-blue-600" : "text-slate-400"} />
                  <span className="text-sm font-bold">صاحب مؤسسة</span>
                </button>
              </div>
            </div>

            {role && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">{role === "jobseeker" ? "الإسم واللقب *" : "إسم الشركة / صاحب العمل *"}</Label>
                    <div className="relative"><User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input value={name} onChange={(e) => setName(e.target.value)} required className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">رقم الهاتف *</Label>
                    <div className="relative">
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        {/* Modified: Type Number + pattern for better validation */}
                        <Input 
                            type="number" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            required 
                            placeholder="مثلا: 22111333"
                            className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                        />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-600">{role === "jobseeker" ? "الاختصاص متاعك *" : "اختصاص الشركة / مجال النشاط *"}</Label>
                  <div className="relative">
                    <Tag className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder={role === "jobseeker" ? "مثلا: نجار، مطور ويب..." : "مثلا: بناء، إعلامية..."} value={specialty} onChange={(e) => setSpecialty(e.target.value)} required className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">الولاية *</Label>
                    <div className="relative"><MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="الولاية" value={wilaya} onChange={(e) => setWilaya(e.target.value)} required className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">المعتمدية *</Label>
                    <div className="relative"><MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input placeholder="المعتمدية" value={moatmadia} onChange={(e) => setMoatmadia(e.target.value)} required className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">الإيميل *</Label>
                    <div className="relative"><Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">كلمة السر *</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10 pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                    </div>
                  </div>
                </div>

                {role === "jobseeker" && (
                  <div className="pt-4 border-t border-slate-100 space-y-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold flex items-center gap-2"><BookOpen size={18} className="text-blue-600" /> المستوى الدراسي / التكويني:</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "fac", label: "جامعي (Fac)" },
                          { id: "formation", label: "تكوين (Formation)" },
                          { id: "none", label: "آخر / بدون" }
                        ].map((opt) => (
                          <label key={opt.id} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${educationType === opt.id ? "border-blue-600 bg-blue-50" : "border-slate-100"}`}>
                            <input type="radio" className="hidden" name="edu" value={opt.id} onChange={(e) => setEducationType(e.target.value)} />
                            <span className="text-[11px] font-bold">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-bold flex items-center gap-2"><Car size={18} className="text-blue-600" /> عندك رخصة سياقة؟</Label>
                      <div className="flex gap-4">
                        {["yes", "no"].map((opt) => (
                          <label key={opt} className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${hasPermis === opt ? "border-blue-600 bg-blue-50" : "border-slate-100"}`}>
                            <input type="radio" className="hidden" name="permis" value={opt} onChange={(e) => setHasPermis(e.target.value)} />
                            <span className="text-sm font-bold">{opt === "yes" ? "نعم" : "لا"}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {hasPermis === "yes" && (
                      <Input placeholder="أذكر صنف رخصة السياقة" value={permisType} onChange={(e) => setPermisType(e.target.value)} className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                    )}

                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600 mr-1">تعريف قصير (Bio) *</Label>
                      <textarea value={bio} onChange={(e) => setBio(e.target.value)} required rows={3} placeholder="أحكيلنا على خبراتك..." className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none text-right resize-none" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">
                        تحميل السيرة الذاتية (PDF) {educationType === "fac" ? " * (إجباري)" : "(اختياري)"}
                      </Label>
                      <div className="relative">
                        <FileText className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="file" accept=".pdf" onChange={(e) => e.target.files && setResume(e.target.files[0])} required={educationType === "fac"} className="pr-10 py-2 h-12 bg-slate-50 border-slate-200 rounded-xl file:bg-blue-600 file:text-white file:border-0 file:rounded-lg file:px-3 file:ml-4 file:text-xs file:font-bold cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" disabled={btnLoading} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-200 font-bold text-lg transition-all active:scale-95 gap-3 mt-4">
                  {btnLoading ? <><Loader size={20} className="animate-spin" /> لحظة... </> : <><span className="text-xl">إنشاء الحساب</span> <ArrowRight size={20} className="rotate-180" /></>}
                </Button>
              </div>
            )}

            <div className="pt-6 text-center border-t border-slate-50">
              <p className="text-sm text-slate-500 font-medium">عندك حساب ديجا؟ <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4">سجل دخولك توّة</Link></p>
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