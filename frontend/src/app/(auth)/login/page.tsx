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
  ShieldCheck,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth, setUser, loading, setIsAuth, fetchApplication } = useAppData();

  if (loading) {
    return <Loading />;
  }
  
  if (isAuth) return redirect("/");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${auth_service_url}/api/auth/login`, {
        email,
        password,
      });

      toast.success("مرحباً بك مجدداً!");

      Cookies.set("token", data.token, {
        expires: 15,
        secure: false, 
        path: "/",
      });
      setUser(data.userObject);
      setIsAuth(true);
      fetchApplication();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "ثبت في الإيميل أو كلمة السر");
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#FDFDFD] dark:bg-slate-950 relative overflow-hidden" dir="rtl">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-50/50 dark:bg-blue-900/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-50/50 dark:bg-indigo-900/10 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none group-hover:scale-110 transition-transform">
              <BriefcaseBusiness size={28} className="text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
              خدّمن<span className="text-blue-600">ي</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            مرحباً بيك من جديد
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            سجّل دخولك باش تكمل تلوّج على فرصتك
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 pr-1">
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pr-10 h-13 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-2xl text-right"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  كلمة السر
                </Label>
                <Link href="/forgot" className="text-xs text-blue-600 hover:underline font-bold">
                  نسيت كلمة السر؟
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 pl-10 h-13 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-2xl text-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={btnLoading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none font-bold text-lg transition-all active:scale-[0.98] gap-3"
            >
              {btnLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  لحظة بركة...
                </>
              ) : (
                <>
                  <span>دخول</span>
                  <ArrowRight size={20} className="rotate-180" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              مازلت ما سجلتش؟
            </span>
          </div>

          {/* Register Link - Enhanced Style */}
          <Link 
            href="/register" 
            className="w-full h-14 flex items-center justify-center relative group overflow-hidden rounded-2xl transition-all"
          >
            <div className="absolute inset-0 border-2 border-blue-600/20 dark:border-blue-400/20 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-all rounded-2xl" />
            
            <div className="relative flex items-center gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-black text-lg tracking-tight group-hover:translate-x-1 transition-transform">
                حل حساب جديد توّة
              </span>
              <Users size={20} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Footer Trust */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} />
          <span className="text-xs font-medium">معطياتك الشخصية آمنة 100%</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;