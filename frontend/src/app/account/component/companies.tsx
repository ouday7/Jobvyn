/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { job_service_url, useAppData } from "@/context/AppContext";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Eye, 
  Globe, 
  Plus, 
  Trash2, 
  ExternalLink, 
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company } from "@/type";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Companies = () => {
  const addRef = useRef<HTMLButtonElement | null>(null);
  const openDialog = () => addRef.current?.click();
  
  const { loading } = useAppData();
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyLoading, setCompanyLoading] = useState(true);

  const clearData = () => {
    setName("");
    setDiscription("");
    setWebsite("");
    setLogo(null);
  };

  const token = Cookies.get("token");

  async function fetchCompanies() {
    setCompanyLoading(true);
    try {
      const { data } = await axios.get(`${job_service_url}/api/job/company/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // تصليح: نثبتوا إذا البيانات في data.companies أو data مباشرة
      setCompanies(data.companies || data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setCompanyLoading(false);
    }
  }

  async function addCompaniesHandler() {
    if (!name || !description || !website || !logo) {
      toast.error("يرجى إكمال جميع البيانات");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("file", logo);

    try {
      setBtnLoading(true);
      await axios.post(`${job_service_url}/api/job/company/new`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        },
      });
      toast.success("تمت إضافة الشركة بنجاح");
      clearData();
      fetchCompanies();
      addRef.current?.click(); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل في الإضافة");
    } finally {
      setBtnLoading(false);
    }
  }

  async function deleteCompaniesHandler(id: string) {
    if (confirm("هل أنت متأكد من حذف هذه الشركة؟")) {
      try {
        setBtnLoading(true);
        const { data } = await axios.delete(`${job_service_url}/api/job/company/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(data.message || "تم الحذف بنجاح");
        fetchCompanies();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "فشل الحذف");
      } finally {
        setBtnLoading(false);
      }
    }
  }

  useEffect(() => {
    if (token) fetchCompanies();
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-slate-50/50 dark:bg-transparent min-h-screen">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Building2 className="text-blue-600" size={32} />
            شركاتي
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
             لقد قمت بتسجيل <span className="text-blue-600 font-bold">{companies.length}</span> من أصل <span className="font-bold">4</span> شركات مسموحة.
          </p>
        </div>
        
        {companies.length < 4 && (
          <Button
            onClick={openDialog}
            className="rounded-2xl bg-blue-600 hover:bg-blue-700 h-12 px-6 font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:scale-105"
          >
            <Plus className="mr-2" size={20} /> إضافة شركة جديدة
          </Button>
        )}
      </div>

      {companyLoading ? (
        <div className="flex justify-center py-20"><Loading /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.length > 0 ? (
            companies.map((c) => (
              <Card
                key={c.company_id}
                className="group relative border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden transition-all hover:-translate-y-1"
              >
                <div className="p-6 sm:p-8 flex items-start gap-6">
                  <div className="relative h-20 w-20 shrink-0 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 p-2 overflow-hidden shadow-inner">
                    <Image
                      src={c.logo}
                      alt={c.name}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                        {c.name}
                      </h3>
                      <ShieldCheck size={16} className="text-blue-500 shrink-0" />
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {c.description}
                    </p>

                    <div className="pt-2 flex items-center gap-4">
                      <Link
                        href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                      >
                        <Globe size={14} />
                        {c.website.replace(/^https?:\/\//, "")}
                        <ExternalLink size={12} className="opacity-50" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href={`/company/${c.company_id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600"
                      >
                        <Eye size={18} />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCompaniesHandler(c.company_id)}
                      className="rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-600 dark:text-slate-400 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                <Briefcase size={40} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">لا توجد شركات مسجلة</h3>
              <p className="text-slate-500 mt-2 max-w-xs">ابدأ بإضافة شركتك الأولى لتتمكن من نشر الوظائف.</p>
            </div>
          )}
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" ref={addRef}></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8 border-none bg-white dark:bg-slate-900 shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-black text-right flex items-center gap-3 justify-end">
              إضافة شركة جديدة
              <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Plus size={24} className="text-blue-600" />
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 py-2" dir="rtl">
            <div className="space-y-2">
              <Label className="text-sm font-bold pr-1 text-right block">اسم الشركة</Label>
              <Input
                placeholder="مثلاً: شركة آبل تونس"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500 text-right"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold pr-1 text-right block">وصف الشركة</Label>
              <textarea
                placeholder="اكتب نبذة مختصرة عن نشاط الشركة..."
                value={description}
                onChange={(e) => setDiscription(e.target.value)}
                className="w-full min-h-[100px] px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none text-right"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold pr-1 text-right block">الموقع الإلكتروني</Label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500 text-right"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold pr-1 text-right block">شعار الشركة (Logo)</Label>
              <div className="relative group border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-colors hover:border-blue-400">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLogo(e.target.files?.[0] || null)
                  }
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Plus className="text-slate-400" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {logo ? logo.name : "اضغط هنا لرفع الشعار"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8 flex gap-3">
             <Button
              variant="ghost"
              onClick={clearData}
              className="flex-1 h-12 rounded-xl font-bold"
            >
              مسح البيانات
            </Button>
            <Button
              disabled={btnLoading}
              onClick={addCompaniesHandler}
              className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-200 dark:shadow-none transition-all"
            >
              {btnLoading ? "جاري الحفظ..." : "تأكيد الإضافة"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Companies;