/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Application } from "@/type";
import {
  Briefcase,
  ArrowRight,
  Circle,
  DownloadCloud,
  Layers,
  Banknote,
  Building2
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface AppliedJobsProps {
  applications: Application[] | null;
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ applications }) => {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case "hired":
        return {
          label: "مقبول",
          color: "text-emerald-500",
          bg: "bg-emerald-500/10",
        };
      case "rejected":
        return {
          label: "مرفوض",
          color: "text-rose-500",
          bg: "bg-rose-500/10",
        };
      case "submitted":
        return {
          label: "قيد المراجعة",
          color: "text-blue-500",
          bg: "bg-blue-500/10",
        };
      default:
        return {
          label: status || "Pending",
          color: "text-slate-400",
          bg: "bg-slate-400/10",
        };
    }
  };

  const formatSalary = (salary: number | string | null | undefined) => {
    if (!salary) return "راتب تنافسي";
    const val = typeof salary === "string" ? parseFloat(salary) : salary;
    return `${val.toLocaleString()} DT`;
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        
        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black dark:text-white uppercase tracking-tight">الوظائف المقدمة</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {applications?.length || 0} Total Applications
              </p>
            </div>
          </div>
          
          {applications && applications.length > 0 && (
            <button className="hidden sm:flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900">
              <DownloadCloud size={14} /> سجل التوظيف
            </button>
          )}
        </div>

        {/* List Section */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {applications && applications.length > 0 ? (
            applications.map((a: any) => {
              const status = getStatusConfig(a.status);
              const appIdString = String(a.application_id);
              
              return (
                <div key={a.application_id} className="p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Job & Company Details */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Company Logo or Icon */}
                      <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden group-hover:border-blue-500/50 transition-all shadow-sm shrink-0">
                        {a.company_logo ? (
                          <img 
                            src={a.company_logo} 
                            alt={a.company_name} 
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <Building2 size={24} className="text-slate-400" />
                        )}
                      </div>

                      <div className="space-y-1 truncate text-right sm:text-left" dir="rtl">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">
                          {a.title || "عنوان الوظيفة"}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-2 justify-end sm:justify-start">
                           <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                             {a.company_name || "اسم الشركة"}
                           </span>
                           <span className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                             ID: {appIdString.length > 6 ? appIdString.slice(-6) : appIdString}
                           </span>
                           <span className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />
                           <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
                            <Banknote size={12} />
                            {a.salary || a.job_salary || "راتب تنافسي"}
                           </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.bg}`}>
                        <Circle size={6} className={`fill-current ${status.color}`} />
                        <span className={`text-[10px] font-black uppercase tracking-tight ${status.color}`}>
                          {status.label}
                        </span>
                      </div>

                      <Link href={`/jobs/${a.job_id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                        >
                          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-24 text-center space-y-4">
               <div className="h-16 w-16 rounded-3xl bg-slate-50 dark:bg-slate-900 mx-auto flex items-center justify-center text-slate-200 dark:text-slate-800 border-2 border-dashed border-slate-100 dark:border-slate-800">
                  <Briefcase size={32} />
               </div>
               <div className="space-y-1">
                 <h3 className="text-sm font-black dark:text-white">لم تقدم على أي وظيفة بعد</h3>
                 <p className="text-[11px] text-slate-400 font-bold max-w-[200px] mx-auto uppercase">ابدأ رحلتك الآن وتصفح الوظائف المتاحة</p>
               </div>
               <Link href="/jobs">
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-[11px] font-black uppercase px-6 h-10 tracking-widest">
                    تصفح الوظائف
                </Button>
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;