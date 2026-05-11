/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";
import React from "react";
import Info from "./component/info";
import Skills from "./component/skills";
import Companies from "./component/companies";
import { redirect } from "next/navigation";
import AppliedJobs from "./component/appliedJobs";
import FreelancerFiche from "./component/FreelancerFiche";
import { Settings, ShieldCheck, Layout, Zap, User, Briefcase, GraduationCap } from "lucide-react";

const Accountpage = () => {
  const { isAuth, user, loading, application } = useAppData();

  if (loading) return <Loading />;
  if (!isAuth) redirect("/");

  const isJobseeker = user?.role === "jobseeker";
  const isRecruiter = user?.role === "recruiter";
  const isFreelancer = user?.role === "freelancer";

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] py-10 px-4 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Navigation / Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <User size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight dark:text-white">التحكم في الحساب</h1>
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={12} /> 
                {isJobseeker && "باحث عن عمل"}
                {isRecruiter && "صاحب مؤسسة"}
                {isFreelancer && "مستقل"}
              </p>
            </div>
          </div>
          <button className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 transition-all">
            <Settings size={20} className="text-slate-500" />
          </button>
        </div>

        {user && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1. Main Info Card (الكل) */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
              <div className="p-1">
                <Info user={user} isYourAccount={true} />
              </div>
            </section>

            {/* 2. Skills Section (Job Seeker فقط) */}
            {isJobseeker && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-4">
                  <Zap size={16} className="text-amber-500 fill-amber-500" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic">Technical Stack</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                  <Skills user={user} isYourAccount={true} />
                </div>
              </section>
            )}

            {/* 3. Fiche Technique (Freelancer فقط) */}
            {isFreelancer && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-4">
                  <Settings size={16} className="text-blue-500" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic">Mon Profil Technique</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-2 shadow-sm">
                  <FreelancerFiche user={user} />
                </div>
              </section>
            )}

            {/* 4. Applications / Companies Section (Job Seeker فقط يظهر له طلباته، Recruiter يظهر له شركته) */}
            {(isJobseeker || isRecruiter) && (
              <section className="space-y-4">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <Layout size={16} className="text-blue-500" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic">
                      {isJobseeker && "Candidatures"}
                      {isRecruiter && "Mes Entreprises"}
                    </h3>
                  </div>
                  {isJobseeker && (
                    <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                      {application?.length || 0} Offres
                    </span>
                  )}
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  {isRecruiter ? (
                    <div className="p-2"><Companies /></div>
                  ) : isJobseeker ? (
                    <AppliedJobs applications={application} />
                  ) : null}
                </div>
              </section>
            )}

          </div>
        )}
        
        {/* Footer */}
        <div className="pt-10 pb-6 text-center space-y-2">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
           </p>
           <p className="text-[12px] text-slate-500 font-medium font-arabic">
             معطيات مؤمنة ومشفرة بالكامل
           </p>
        </div>
      </div>
    </div>
  );
};

export default Accountpage;