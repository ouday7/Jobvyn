"use client";
import React, { useState, useEffect } from "react";
import { User as UserType } from "@/type";
import { useAppData } from "@/context/AppContext"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  MapPin, GraduationCap, Car, Briefcase, Phone, 
  Pencil, Settings, Mail, Camera, User as UserIcon,
  Quote, Globe
} from "lucide-react";
import Image from "next/image";

const Info = ({ user, isYourAccount }: { user: UserType, isYourAccount: boolean }) => {
  const { updateUser, btnLoading, updateProfilePic } = useAppData();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "", phone_number: "", wilaya: "", moatmadia: "", 
    education_type: "", permis_type: "", bio: "", specialty: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "", phone_number: user.phone_number || "",
        wilaya: user.wilaya || "", moatmadia: user.moatmadia || "",
        education_type: user.education_type || "", permis_type: user.permis_type || "",
        bio: user.bio || "", specialty: user.specialty || ""
      });
    }
  }, [user]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileData = new FormData();
      fileData.append("image", e.target.files[0]);
      updateProfilePic(fileData);
    }
  };

  const handleSave = async () => {
    const success = await updateUser(formData);
    if (success) setIsOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-700" dir="rtl">
      
      {/* --- Profile Card --- */}
      <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
        
        {/* Cover with Gradient Mesh */}
        <div className="h-32 w-full bg-gradient-to-l from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,1),transparent)]"></div>
        </div>

        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end gap-6 -mt-12 mb-8">
            
            {/* Profile Image / Default Icon */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] border-4 border-white dark:border-slate-950 overflow-hidden shadow-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                {user?.profile_pic ? (
                  <Image src={user.profile_pic} alt="User" fill className="object-cover" />
                ) : (
                  <UserIcon size={48} className="text-slate-300 dark:text-slate-700" />
                )}
              </div>
              {isYourAccount && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer rounded-[2rem] backdrop-blur-sm">
                  <Camera className="text-white" size={24} />
                  <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                </label>
              )}
            </div>

            <div className="flex-1 pb-1 text-center md:text-right">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {user?.name || "بدون اسم"}
                </h1>
                <p className="text-blue-600 font-extrabold text-sm flex items-center justify-center md:justify-start gap-1">
                    <Globe size={14} /> {user?.specialty || "Software Engineer"}
                </p>
            </div>

            {isYourAccount && (
              <Button onClick={() => setIsOpen(true)} className="rounded-2xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 px-6 h-11 text-xs font-bold gap-2">
                <Settings size={16} /> تعديل الحساب
              </Button>
            )}
          </div>

          {/* Bio Section - Enhanced Visibility */}
          <div className="bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] relative">
            <Quote className="absolute top-4 left-4 text-slate-200 dark:text-slate-800" size={32} />
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">النبذة الشخصية</h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium relative z-10">
              {user?.bio || "هوني تنجم تكتب شويا على روحك، خبراتك، وأهم المشاريع اللي خدمت عليها..."}
            </p>
          </div>
        </div>
      </div>

      {/* --- Detailed Info Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
          <div className="space-y-6">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest border-r-4 border-blue-600 pr-3">بيانات التواصل</h3>
            <div className="grid gap-5">
              <InfoItem icon={<MapPin size={18}/>} label="الولاية والمعتمدية" value={`${user?.wilaya || "---"}، ${user?.moatmadia || "---"}`} />
              <InfoItem icon={<Phone size={18}/>} label="الهاتف" value={user?.phone_number} />
              <InfoItem icon={<Mail size={18}/>} label="البريد الإلكتروني" value={user?.email} />
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
          <div className="space-y-6">
            <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-r-4 border-indigo-600 pr-3">المسار المهني</h3>
            <div className="grid gap-5">
              <InfoItem icon={<GraduationCap size={18}/>} label="المستوى التعليمي" value={user?.education_type} />
              <InfoItem icon={<Briefcase size={18}/>} label="التخصص" value={user?.specialty} />
              <InfoItem icon={<Car size={18}/>} label="رخصة السياقة" value={user?.permis_type} />
            </div>
          </div>
        </div>
      </div>

      {/* --- Popup Edit --- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl" dir="rtl">
          <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl"><Settings size={18}/></div>
            <DialogTitle className="text-lg font-bold">تحديث معلوماتك</DialogTitle>
          </div>
          
          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <EditField label="الاسم الكامل" value={formData.name} onChange={(v)=>setFormData({...formData, name:v})} />
               <EditField label="رقم الهاتف" value={formData.phone_number} onChange={(v)=>setFormData({...formData, phone_number:v})} />
               <EditField label="الولاية" value={formData.wilaya} onChange={(v)=>setFormData({...formData, wilaya:v})} />
               <EditField label="المعتمدية" value={formData.moatmadia} onChange={(v)=>setFormData({...formData, moatmadia:v})} />
               <EditField label="المستوى التعليمي" value={formData.education_type} onChange={(v)=>setFormData({...formData, education_type:v})} />
               <EditField label="التخصص" value={formData.specialty} onChange={(v)=>setFormData({...formData, specialty:v})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase mr-1">النبذة الشخصية (Bio)</label>
              <textarea 
                className="w-full p-5 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none text-right min-h-[120px] text-sm font-medium transition-all"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-900 flex gap-4">
            <Button onClick={handleSave} disabled={btnLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/20">
              {btnLoading ? "قاعدين نسيفوا..." : "حفظ التغييرات"}
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)} className="px-8 h-14 rounded-2xl text-slate-500 font-bold">إلغاء</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Sub-Components
const InfoItem = ({ icon, label, value }: { icon: any, label: string, value: any }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-all">
      {icon}
    </div>
    <div className="space-y-0.5">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</span>
      <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{value || "غير متوفر"}</p>
    </div>
  </div>
);

const EditField = ({ label, value, onChange }: { label:string, value:string, onChange:(v:string)=>void }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase mr-1">{label}</label>
    <Input 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="h-12 rounded-[1.2rem] border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 font-bold text-sm transition-all shadow-sm" 
    />
  </div>
);

export default Info;