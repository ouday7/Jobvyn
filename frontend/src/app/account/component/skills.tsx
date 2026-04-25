"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import { Award, Plus, Sparkles, X, Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Skills: React.FC<AccountProps> = ({ isYourAccount, user }) => {
  const [skill, setSkill] = useState("");
  const { addSkill, btnLoading, removeSkill } = useAppData();

  const addSkillHandler = () => {
    if (!skill.trim()) {
      toast.error("أكتب المهارة قبل ما تزيدها");
      return;
    }
    if (user?.skills?.includes(skill.trim())) {
      toast.error("المهارة هذي موجودة ديجا");
      return;
    }
    addSkill(skill.trim(), setSkill);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkillHandler();
    }
  };

  const removeSkillHandler = (skillToRemove: string) => {
    // حذف مباشر لتسريع التجربة (UX)
    removeSkill(skillToRemove);
  };

  return (
    <Card className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
              <Award size={22} />
            </div>
            <div>
              <CardTitle className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {isYourAccount ? "المهارات متاعك" : "المهارات"}
              </CardTitle>
              {isYourAccount && (
                <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  بيّن للشركات شنوّة تنجم تعمل
                </CardDescription>
              )}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800 text-xs font-black text-slate-500">
            {user?.skills?.length || 0}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-8 pb-8">
        {/* Add Skills Input */}
        {isYourAccount && (
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <div className="relative flex-1">
              <Sparkles
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 opacity-50"
              />
              <Input
                type="text"
                placeholder="زيد مهارة (مثال: React, C#...)"
                className="h-12 pr-11 text-sm font-bold bg-white dark:bg-slate-950 border-none rounded-2xl shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 transition-all text-right"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyUp={handleKeyPress}
                dir="rtl"
              />
            </div>
            <Button
              onClick={addSkillHandler}
              className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              disabled={!skill.trim() || btnLoading}
            >
              {btnLoading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} className="ml-2" />}
              إضافة
            </Button>
          </div>
        )}

        {/* Skills display */}
        <div className="min-h-[60px]">
          {user?.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-start">
              {user.skills.map((e, i) => (
                <div
                  key={i}
                  className="group relative inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-sm"
                >
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {e}
                  </span>
                  {isYourAccount && (
                    <button
                      title="فسخ"
                      className="h-5 w-5 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all cursor-pointer"
                      onClick={() => removeSkillHandler(e)}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 bg-slate-50/50 dark:bg-slate-900/30 rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                <Award className="h-6 w-6 text-slate-300" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {isYourAccount ? "ابدا زيد مهاراتك توّة" : "لا توجد مهارات"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;