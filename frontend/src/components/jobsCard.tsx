/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppData } from "@/context/AppContext";
import { jobs } from "@/type";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  Banknote,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: jobs;
}

const JobsCard: React.FC<JobCardProps> = ({ job }) => {
  const { user, applyJob, application } = useAppData();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (application && job.job_id && Array.isArray(application)) {
      const hasApplied = application.some(
        (item: any) => item.job_id === job.job_id,
      );
      setIsApplied(hasApplied);
    }
  }, [application, job.job_id]);

  const handleApply = async () => {
    if (isApplied || isApplying) return;
    setIsApplying(true);
    try {
      await applyJob(job.job_id);
      setIsApplied(true);
    } catch (error) {
      console.error("Application error:", error);
    } finally {
      setIsApplying(false);
    }
  };

  const formatSalary = (salary: any) => {
    if (!salary) return "Salary Negotiable";
    return `${salary} TND / Month`; // Baddelt-ha l-TND kima t-ji f-Khademni
  };

  const isPositionClosed = job.is_active === false;
  const isRemote = job.location?.toLowerCase().includes("remote");

  return (
    <Card className="group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-900 overflow-hidden bg-white dark:bg-slate-900 h-full flex flex-col">
      <CardContent className="p-6 grow">
        {/* Status Tag */}
        <div className="mb-4 flex justify-between items-start">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isPositionClosed
                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            }`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${isPositionClosed ? "bg-red-500" : "bg-blue-500 animate-pulse"}`}
            />
            {isPositionClosed ? "Closed" : "Hiring Now"}
          </div>
          
          <span className="text-[10px] text-slate-400 font-medium uppercase">
            {job.job_type || "Full Time"}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <Building2 className="h-4 w-4 text-blue-500" />
              <span className="truncate">{job.company_name}</span>
            </div>
          </div>

          <Link
            href={`/company/${job.company_id}`}
            className="shrink-0 hover:scale-105 transition-transform"
          >
            <div className="relative w-12 h-12 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50 shadow-sm">
              <Image
                src={job.company_logo || "/placeholder-company.png"}
                alt={job.company_name}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
          </Link>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-md">
              <MapPin className="h-4 w-4 text-blue-500" />
            </div>
            <span>{job.location}</span>
            {isRemote && (
              <span className="ml-auto px-2 py-0.5 text-[10px] rounded bg-green-50 dark:bg-green-900/20 text-green-600 font-bold uppercase">
                Remote
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-md">
              <Banknote className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-slate-900 dark:text-slate-100 font-bold">{formatSalary(job.salary)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="flex gap-3 w-full">
          <Link href={`/jobs/${job.job_id}`} className="flex-[0.5]">
            <Button
              variant="outline"
              className="w-full gap-2 h-11 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200"
            >
              Details
            </Button>
          </Link>

          {user?.role === "jobseeker" && !isPositionClosed && (
            <div className="flex-1">
              {isApplied ? (
                <div className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-bold">Applied</span>
                </div>
              ) : (
                <Button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full gap-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                  {isApplying ? (
                    <Clock className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-current" />
                      Quick Apply
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {(!user || user.role !== "jobseeker") && !isPositionClosed && (
            <Link href={`/jobs/${job.job_id}`} className="flex-1">
               <Button className="w-full gap-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20">
                View Job
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobsCard;