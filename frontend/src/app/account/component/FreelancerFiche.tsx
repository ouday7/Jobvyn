"use client";
import React, { useState, useEffect } from "react";
import { 
  Settings, DollarSign, Calendar, Clock, Languages, Globe, 
  Facebook, Linkedin, Instagram, Save, X, Edit, Loader2,
  Award, TrendingUp, Briefcase, MapPin, Phone, Mail, User,
  Sun, Moon, Heart, ShieldCheck, Truck, Home, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppData } from "@/context/AppContext";
import { languagesList, workDaysList } from "@/lib/tunisiaData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

interface FreelancerFicheProps {
  user: any;
}

export default function FreelancerFiche({ user }: FreelancerFicheProps) {
  const { updateUser, btnLoading } = useAppData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    years_experience: 0,
    available_now: true,
    hourly_rate: "",
    work_radius: 20,
    languages: [] as string[],
    portfolio: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    work_days: [] as string[],
    work_start: "08:00",
    work_end: "17:00",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    if (user) {
      // معالجة social_media
      let socialMedia = {};
      if (user.social_media) {
        socialMedia = typeof user.social_media === "object" 
          ? user.social_media 
          : (typeof user.social_media === "string" ? JSON.parse(user.social_media) : {});
      }
      
      // معالجة work_days
      let workDays = [];
      if (user.work_days) {
        workDays = Array.isArray(user.work_days) 
          ? user.work_days 
          : (typeof user.work_days === "string" ? JSON.parse(user.work_days) : []);
      }
      
      // معالجة work_hours
      let workHours = { start: "08:00", end: "17:00" };
      if (user.work_hours) {
        workHours = typeof user.work_hours === "object" 
          ? user.work_hours 
          : (typeof user.work_hours === "string" ? JSON.parse(user.work_hours) : { start: "08:00", end: "17:00" });
      }
      
      // معالجة languages
      let languages = [];
      if (user.languages) {
        languages = Array.isArray(user.languages) 
          ? user.languages 
          : (typeof user.languages === "string" ? JSON.parse(user.languages) : []);
      }

      setFormData({
        years_experience: user.years_experience || 0,
        available_now: user.available_now ?? true,
        hourly_rate: user.hourly_rate || "",
        work_radius: user.work_radius || 20,
        languages: languages,
        portfolio: user.portfolio || "",
        facebook: socialMedia.facebook || "",
        linkedin: socialMedia.linkedin || "",
        instagram: socialMedia.instagram || "",
        work_days: workDays,
        work_start: workHours.start || "08:00",
        work_end: workHours.end || "17:00",
      });
    }
  }, [user]);

  const addLanguage = () => {
    if (selectedLanguage && !formData.languages.includes(selectedLanguage)) {
      setFormData({ ...formData, languages: [...formData.languages, selectedLanguage] });
      setSelectedLanguage("");
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData({ ...formData, languages: formData.languages.filter(l => l !== lang) });
  };

  const toggleWorkDay = (day: string) => {
    if (formData.work_days.includes(day)) {
      setFormData({ ...formData, work_days: formData.work_days.filter(d => d !== day) });
    } else {
      setFormData({ ...formData, work_days: [...formData.work_days, day] });
    }
  };

  const handleSave = async () => {
    // معالجة البيانات قبل الإرسال
    const processedHourlyRate = formData.hourly_rate === "" ? null : parseFloat(formData.hourly_rate);
    
    const payload = {
      years_experience: formData.years_experience,
      available_now: formData.available_now,
      hourly_rate: processedHourlyRate,
      work_radius: formData.work_radius,
      languages: formData.languages,
      portfolio: formData.portfolio === "" ? null : formData.portfolio,
      social_media: {
        facebook: formData.facebook === "" ? null : formData.facebook,
        linkedin: formData.linkedin === "" ? null : formData.linkedin,
        instagram: formData.instagram === "" ? null : formData.instagram,
      },
      work_days: formData.work_days,
      work_hours: {
        start: formData.work_start,
        end: formData.work_end,
      },
    };
    
    const success = await updateUser(payload);
    if (success) {
      setIsEditing(false);
      toast.success("تم تحديث الملف التقني بنجاح");
    }
  };

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <CardTitle className="text-xl font-black flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          ملفي التقني
        </CardTitle>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
            <Edit className="h-4 w-4" /> تعديل
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="gap-2 text-red-500">
              <X className="h-4 w-4" /> إلغاء
            </Button>
            <Button size="sm" onClick={handleSave} disabled={btnLoading} className="gap-2 bg-blue-600">
              {btnLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              حفظ
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* سنوات الخبرة */}
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <Award className="h-4 w-4 text-yellow-500" /> سنوات الخبرة
          </Label>
          {isEditing ? (
            <Select value={formData.years_experience.toString()} onValueChange={(v) => setFormData({ ...formData, years_experience: parseInt(v) })}>
              <SelectTrigger className="h-11 bg-slate-50 rounded-xl">
                <SelectValue placeholder="اختر عدد السنوات" />
              </SelectTrigger>
              <SelectContent>
                {[0,1,2,3,4,5,6,7,8,9,10,12,15,20].map(y => (
                  <SelectItem key={y} value={y.toString()}>{y === 0 ? "أقل من سنة" : y + " سنوات"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="font-medium text-slate-800 dark:text-white">{formData.years_experience === 0 ? "أقل من سنة" : formData.years_experience + " سنوات"}</p>
          )}
        </div>

        {/* متاح حالياً */}
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-500" /> متاح حالياً؟
          </Label>
          {isEditing ? (
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.available_now ? "border-green-500 bg-green-50 text-green-700" : "border-slate-200"}`}>
                <input type="radio" className="hidden" checked={formData.available_now} onChange={() => setFormData({ ...formData, available_now: true })} /> ✅ نعم
              </label>
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${!formData.available_now ? "border-red-500 bg-red-50 text-red-700" : "border-slate-200"}`}>
                <input type="radio" className="hidden" checked={!formData.available_now} onChange={() => setFormData({ ...formData, available_now: false })} /> ⏸ لا
              </label>
            </div>
          ) : (
            <Badge className={formData.available_now ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
              {formData.available_now ? "متاح حالياً" : "غير متاح حالياً"}
            </Badge>
          )}
        </div>

        {/* السعر بالساعة */}
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" /> السعر بالساعة (د.ت)
          </Label>
          {isEditing ? (
            <Input 
              type="number" 
              value={formData.hourly_rate} 
              onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })} 
              className="h-11 bg-slate-50 rounded-xl" 
              placeholder="مثال: 25"
            />
          ) : (
            <p className="font-medium text-slate-800 dark:text-white">{formData.hourly_rate ? formData.hourly_rate + " د.ت" : "غير محدد"}</p>
          )}
        </div>

        {/* نصف قطر العمل */}
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" /> نصف قطر العمل (كلم)
          </Label>
          {isEditing ? (
            <Select value={formData.work_radius.toString()} onValueChange={(v) => setFormData({ ...formData, work_radius: parseInt(v) })}>
              <SelectTrigger className="h-11 bg-slate-50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5,10,15,20,30,40,50,60,70,80,90,100].map(r => (
                  <SelectItem key={r} value={r.toString()}>{r} كم</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="font-medium text-slate-800 dark:text-white">{formData.work_radius} كم</p>
          )}
        </div>

        {/* اللغات */}
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <Languages className="h-4 w-4 text-indigo-500" /> اللغات التي تتقنها
          </Label>
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="flex-1 h-11 bg-slate-50 rounded-xl">
                    <SelectValue placeholder="اختر لغة" />
                  </SelectTrigger>
                  <SelectContent>
                    {languagesList.map((lang) => (
                      <SelectItem key={lang.id} value={lang.name}>{lang.flag} {lang.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addLanguage} className="h-11 px-6 bg-blue-600">إضافة</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map((lang) => (
                  <Badge key={lang} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
                    {lang}
                    <button onClick={() => removeLanguage(lang)} className="mr-2 text-red-500 hover:text-red-700">✕</button>
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.languages.length > 0 ? (
                formData.languages.map((lang) => <Badge key={lang} variant="secondary">{lang}</Badge>)
              ) : (
                <span className="text-slate-400 text-sm">لم يتم إضافة لغات</span>
              )}
            </div>
          )}
        </div>

        {/* Portfolio */}
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <Globe className="h-4 w-4 text-purple-500" /> Portfolio / موقع شخصي
          </Label>
          {isEditing ? (
            <Input 
              value={formData.portfolio} 
              onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })} 
              className="h-11 bg-slate-50 rounded-xl" 
              placeholder="https://..."
              dir="ltr"
            />
          ) : (
            formData.portfolio && (
              <a href={formData.portfolio} target="_blank" className="text-blue-600 hover:underline break-all">
                {formData.portfolio}
              </a>
            )
          )}
        </div>

        {/* شبكات التواصل */}
        <div className="space-y-3">
          <Label className="text-sm font-bold flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" /> وسائل التواصل الاجتماعية
          </Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Facebook className="h-4 w-4 text-blue-700" />
              <span className="text-sm w-20">Facebook</span>
              {isEditing ? (
                <Input value={formData.facebook} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })} className="flex-1 h-10 bg-slate-50 rounded-xl" placeholder="رابط الصفحة الشخصية" />
              ) : (
                formData.facebook ? <a href={formData.facebook} target="_blank" className="text-blue-600 text-sm hover:underline">رابط</a> : <span className="text-slate-400 text-sm">غير مضاف</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-blue-700" />
              <span className="text-sm w-20">LinkedIn</span>
              {isEditing ? (
                <Input value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="flex-1 h-10 bg-slate-50 rounded-xl" placeholder="رابط الملف المهني" />
              ) : (
                formData.linkedin ? <a href={formData.linkedin} target="_blank" className="text-blue-600 text-sm hover:underline">رابط</a> : <span className="text-slate-400 text-sm">غير مضاف</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-pink-600" />
              <span className="text-sm w-20">Instagram</span>
              {isEditing ? (
                <Input value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="flex-1 h-10 bg-slate-50 rounded-xl" placeholder="رابط الحساب" />
              ) : (
                formData.instagram ? <a href={formData.instagram} target="_blank" className="text-pink-600 text-sm hover:underline">رابط</a> : <span className="text-slate-400 text-sm">غير مضاف</span>
              )}
            </div>
          </div>
        </div>

        {/* أيام العمل */}
        <div className="space-y-2">
          <Label className="text-sm font-bold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-500" /> أيام العمل في الأسبوع
          </Label>
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              {workDaysList.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleWorkDay(day)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                    formData.work_days.includes(day) 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.work_days.length > 0 ? (
                formData.work_days.map((day) => <Badge key={day} variant="secondary">{day}</Badge>)
              ) : (
                <span className="text-slate-400 text-sm">لم يتم تحديد أيام العمل</span>
              )}
            </div>
          )}
        </div>

        {/* ساعات العمل */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-bold flex items-center gap-2">
              <Sun className="h-4 w-4 text-orange-500" /> من
            </Label>
            {isEditing ? (
              <Input type="time" value={formData.work_start} onChange={(e) => setFormData({ ...formData, work_start: e.target.value })} className="h-11 bg-slate-50 rounded-xl" />
            ) : (
              <p className="font-medium text-slate-800 dark:text-white">{formData.work_start}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-bold flex items-center gap-2">
              <Moon className="h-4 w-4 text-indigo-500" /> إلى
            </Label>
            {isEditing ? (
              <Input type="time" value={formData.work_end} onChange={(e) => setFormData({ ...formData, work_end: e.target.value })} className="h-11 bg-slate-50 rounded-xl" />
            ) : (
              <p className="font-medium text-slate-800 dark:text-white">{formData.work_end}</p>
            )}
          </div>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-slate-400">
            * يمكنك تحديث ملفك التقني في أي وقت
          </p>
        </div>
      </CardContent>
    </Card>
  );
}