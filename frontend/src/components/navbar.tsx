"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  BriefcaseBusiness, 
  User as UserIcon, 
  LogOut,
  ChevronDown
} from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { useAppData } from "@/context/AppContext";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuth, user, setIsAuth, setUser } = useAppData();

  const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "عروض شغل", href: "/jobs" },
    { name: "مهن حرة", href: "/freelance" },
    { name: "احنا شكون", href: "/about" }, // التصليح هنا: احنا شكون
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
    window.location.href = "/";
  };

  const arabicFont = { fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif" };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm" dir="rtl" style={arabicFont}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-600 p-1.5 rounded-xl shadow-md">
                <BriefcaseBusiness className="text-white" size={20} />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white font-sans tracking-tighter">
                5addem<span className="text-blue-600">ni</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-[15px] font-bold rounded-xl transition-all ${
                    pathname === item.href 
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40" 
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            
            <div className="flex items-center">
              {isAuth ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 p-1 pl-4 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all outline-none">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="hidden sm:flex flex-col items-start leading-tight">
                        <span className="text-[14px] font-black text-slate-900 dark:text-white">{user?.name || "خويا"}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">حسابي</span>
                      </div>
                      <ChevronDown size={14} className="text-slate-400" />
                    </button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent align="start" className="w-52 mt-2 p-2 rounded-2xl shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-right" style={arabicFont}>
                    <DropdownMenuItem asChild className="cursor-pointer rounded-xl py-3 focus:bg-blue-50 dark:focus:bg-blue-800/30">
                      <Link href="/account" className="flex items-center justify-end gap-3 font-bold w-full">
                        <span className="text-[14px]">إعدادات الحساب</span>
                        <UserIcon size={18} className="text-blue-600" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-xl py-3 text-red-600 font-black">
                      <div className="flex items-center justify-end gap-3 w-full">
                        <span className="text-[14px]">خروج</span>
                        <LogOut size={18} />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  {/* أزرار مصلحة بألوان قوية */}
                  <Button asChild variant="ghost" className="hidden sm:inline-flex font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl">
                    <Link href="/login">دخول</Link>
                  </Button>
                  
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-black px-5 rounded-xl shadow-md shadow-blue-500/30 transition-all active:scale-95">
                    <Link href="/register">سجّل توّة</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-white">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-[110] animate-in slide-in-from-top duration-200">
          <div className="px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsOpen(false)} 
                className={`block px-4 py-4 text-lg font-bold rounded-2xl text-right ${
                  pathname === item.href ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40" : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {!isAuth && (
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 mt-4">
                <Button asChild variant="outline" className="rounded-xl font-bold border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                  <Link href="/login" onClick={() => setIsOpen(false)}>دخول</Link>
                </Button>
                <Button asChild className="bg-blue-600 text-white font-black rounded-xl">
                  <Link href="/register" onClick={() => setIsOpen(false)}>سجّل توّة</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;