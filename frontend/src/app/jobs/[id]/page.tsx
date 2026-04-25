/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { job_service_url, useAppData } from "@/context/AppContext";
import { Application, jobs } from "@/type";
import axios from "axios";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  MapPin,
  DollarSign,
  Users,
  FileText,
  UserCircle,
  Calendar,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Jobpage = () => {
  const { id } = useParams();
  const { user, applyJob, application, btnLoading } = useAppData();
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [job, setJob] = useState<jobs | null>(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const [filterStatus, setFilterStatus] = useState("All");
  const [jobApplication, setJobApplication] = useState<Application[] | null>(null);
  const [statusValue, setStatusValue] = useState("");

  const handleApply = async () => {
    if (isApplied || isApplying || !id) return;
    setIsApplying(true);
    try {
      await applyJob(Number(id));
      setIsApplied(true);
      toast.success("Mabrouk! El demande tba3thet");
    } catch (error) {
      toast.error("Mochkla sghira, ma tba3thetch");
    } finally {
      setIsApplying(false);
    }
  };

  const formatSalary = (salary: number | null | undefined) => {
    if (!salary) return "Négociable";
    return `${(salary / 1000).toFixed(0)}k DT / an`;
  };

  async function fetchJobApplications() {
    try {
      const { data } = await axios.get(`${job_service_url}/api/job/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobApplication(data);
    } catch (error) { console.log(error); }
  }

  async function fetchSingleJob() {
    try {
      const { data } = await axios.get(`${job_service_url}/api/job/${id}`);
      setJob(data);
    } catch (error) { console.log(error); } finally { setLoading(false); }
  }

  const filteredApplication = filterStatus === "All" 
    ? jobApplication 
    : jobApplication?.filter((app) => app.status === filterStatus);

  const updateApplicationHandler = async (applicationId: number) => {
    if (!statusValue) return toast.error("Ekhtar etat");
    try {
      await axios.put(`${job_service_url}/api/job/application/update/${applicationId}`, 
        { status: statusValue }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchJobApplications();
      toast.success("Tbadlet bnaje7");
      setStatusValue("");
    } catch (error) { toast.error("Erreur serveur"); }
  };

  useEffect(() => {
    if (application && id && Array.isArray(application)) {
      setIsApplied(application.some((item: any) => item.job_id.toString() === id));
    }
    fetchSingleJob();
  }, [application, id]);

  useEffect(() => {
    if (user && job && user.user_id === job.posted_by_recruiter_id) fetchJobApplications();
  }, [user, job]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]"><Loading /></div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] py-6 md:py-12 px-4 antialiased">
      {job && (
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Top Header Section */}
          <div className="flex items-center justify-between px-1">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-500 hover:text-blue-600" onClick={() => router.back()}>
              <ArrowLeft size={16} /> <span className="text-xs font-bold uppercase tracking-tight">Annonces</span>
            </Button>
            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              ID: #{id}
            </Badge>
          </div>

          {/* Compact Main Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 md:p-10 space-y-8">
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex gap-2">
                    <Badge className={job.is_active ? "bg-emerald-500/10 text-emerald-600 border-none" : "bg-red-500/10 text-red-600 border-none"}>
                      {job.is_active ? "Ouvert" : "Fermé"}
                    </Badge>
                    {job.location?.toLowerCase().includes("remote") && (
                      <Badge className="bg-blue-500/10 text-blue-600 border-none">Remote</Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-blue-500" />
                      <span className="text-sm font-bold">{job.company_name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                {user?.role === "jobseeker" && (
                  <div className="w-full md:w-auto">
                    {isApplied ? (
                      <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20 text-sm font-bold">
                        <CheckCircle2 size={18} /> Déjà Postulé
                      </div>
                    ) : job.is_active && (
                      <Button onClick={handleApply} disabled={btnLoading || isApplying} className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-lg shadow-blue-600/20">
                        {isApplying ? "Chargement..." : "Postuler"} <ChevronRight size={18} />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Stats Bar - Compact */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="text-center md:text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Salaire</p>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-200">{formatSalary(job.salary)}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Places</p>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-200">{job.openings} Postes</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Date</p>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-200">Aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
              <FileText size={16} /> Détails du poste
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Recruiter View: Applications */}
          {user && job && user.user_id === job.posted_by_recruiter_id && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-black dark:text-white">Candidatures reçues</h2>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px] h-9 text-xs font-bold rounded-lg border-slate-200 dark:border-slate-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">Tous</SelectItem>
                    <SelectItem value="Submitted">Nouveaux</SelectItem>
                    <SelectItem value="Rejected">Refusés</SelectItem>
                    <SelectItem value="Hired">Acceptés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredApplication && filteredApplication.length > 0 ? (
                  filteredApplication.map((app) => (
                    <Card key={app.applicant_id} className="p-4 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                            <UserCircle size={24} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black">Candidat #{app.applicant_id}</h4>
                            <p className="text-[10px] text-slate-500">{new Date(app.applied_at).toLocaleDateString()}</p>
                          </div>
                          <Badge className="text-[10px] h-5">{app.status}</Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link target="_blank" href={app.resume} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 hover:text-blue-600">
                            <FileText size={18} />
                          </Link>
                          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-800">
                            <Select value={statusValue} onValueChange={setStatusValue}>
                              <SelectTrigger className="h-8 w-[100px] text-[10px] font-bold border-none bg-transparent">
                                <SelectValue placeholder="Action" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Submitted">En cours</SelectItem>
                                <SelectItem value="Rejected">Refusé</SelectItem>
                                <SelectItem value="Hired">Accepté</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" onClick={() => updateApplicationHandler(app.application_id)} disabled={!statusValue} className="h-7 text-[10px] font-bold bg-slate-900 dark:bg-white dark:text-slate-900">
                              OK
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aucune candidature</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobpage;