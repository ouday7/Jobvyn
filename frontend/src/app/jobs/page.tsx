/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { jobs } from "@/type";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { job_service_url } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Search, X, Sparkles, TrendingUp, Briefcase } from "lucide-react";
import Loading from "@/components/loading";
import JobsCard from "@/components/jobsCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const locations = [
  "Remote", "Tunis", "Sousse", "Sfax", "Nabeul", "Bizerte", "Monastir", "Gabes"
];

const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<jobs[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const token = Cookies.get("token");

  const hasActiveFilters = title || location;

  const clearFilters = () => {
    setTitle("");
    setLocation("");
    setActiveTab("all");
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${job_service_url}/api/job/all?title=${title}&location=${location}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [title, location]);

  const filteredJobs =
    activeTab === "remote"
      ? jobs.filter((job) => job.location?.toLowerCase().includes("remote"))
      : jobs;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 animate-in fade-in duration-700" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* --- Hero Header Section --- */}
        <div className="mb-12 text-right">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                لوّج على <span className="text-blue-600">فرصة أحلامك</span> توّة
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">أكثر من {jobs.length} عرض شغل يستنى فيك</p>
        </div>

        {/* --- Sticky Search & Filters --- */}
        <div className="sticky top-6 z-20 mb-10">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-2xl p-4 transition-all">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
                <Input
                  placeholder="لوّج بالوظيفة، الشركة، أو الـ Keywords..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pr-12 h-14 bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-[1.8rem] text-sm font-bold shadow-sm focus:ring-2 focus:ring-blue-500 transition-all text-right"
                />
              </div>

              {/* Filters Group */}
              <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <TabsList className="bg-transparent h-10">
                    <TabsTrigger value="all" className="rounded-xl px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">كل العروض</TabsTrigger>
                    <TabsTrigger value="remote" className="rounded-xl px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950">عن بُعد (Remote)</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-14 px-6 rounded-[1.8rem] border-slate-200 dark:border-slate-800 font-bold gap-2 hover:bg-slate-50">
                      <MapPin size={18} className="text-orange-500" />
                      {location || "الولايات"}
                      {location && <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl" dir="rtl">
                    <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
                        <MapPin className="text-orange-500" />
                        <DialogTitle className="text-lg font-bold">إختيار الولاية</DialogTitle>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                        {["All", ...locations].map((loc) => (
                          <button
                            key={loc}
                            onClick={() => setLocation(loc === "All" ? "" : loc)}
                            className={`p-4 rounded-2xl border-2 text-xs font-black transition-all ${
                              (location === loc || (loc === "All" && !location))
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                            }`}
                          >
                            {loc === "All" ? "كل تونس" : loc}
                          </button>
                        ))}
                      </div>
                      <Button onClick={() => setIsFilterOpen(false)} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-500/20">
                        تطبيق الفلتر
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Active Badges */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex flex-wrap gap-2">
                {title && <FilterBadge icon={<Search size={12}/>} text={title} onClear={() => setTitle("")} />}
                {location && <FilterBadge icon={<MapPin size={12}/>} text={location} onClear={() => setLocation("")} />}
              </div>
            )}
          </div>
        </div>

        {/* --- Stats & Clear --- */}
        <div className="flex items-center justify-between mb-8 px-4">
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-100 dark:border-green-900/30">
                <TrendingUp size={16} className="text-green-600" />
                <span className="text-sm font-black text-green-700 dark:text-green-400">{filteredJobs.length} فرصة عمل متاحة حالياً</span>
            </div>
            {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                    <X size={14} /> مسح كل الفلاتر
                </button>
            )}
        </div>

        {/* --- Content Grid --- */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <Loading />
            <p className="mt-6 text-slate-400 font-bold animate-pulse text-sm">قاعدين نلوجولك على أحسن العروض...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.job_id} className="transform hover:-translate-y-2 transition-transform duration-300">
                 <JobsCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-slate-50 dark:bg-slate-800 mb-6 text-slate-300">
              <Briefcase size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">مالقينا حتى شي!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">جرب بدل الكلمات اللي تلوج بيها أو نحي شويا فلاتر.</p>
            <Button onClick={clearFilters} variant="outline" className="rounded-2xl px-10 h-14 font-bold border-2">إعادة البحث</Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const FilterBadge = ({ icon, text, onClear }: { icon: any, text: string, onClear: () => void }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-800">
    {icon}
    {text}
    <button onClick={onClear} className="hover:text-red-500 transition-colors mr-1">
      <X size={14} />
    </button>
  </div>
);

export default JobsPage;