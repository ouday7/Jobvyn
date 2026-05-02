"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Phone, MapPin, Mail, User, ArrowRight } from "lucide-react";

export default function RegisterFreelancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    wilaya: "",
    moatmadia: "",
    address: "",
    activity: "",
    description: "",
    has_permis: "no",
    permis_type: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8001/api/freelance/register", formData);
      toast.success("✅ تم تسجيلك كـ مستقل بنجاح!");
      router.push("/freelance");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل التسجيل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-10 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-black">سجل كـ مستقل</CardTitle>
            <p className="text-sm text-slate-500">للحرفيين والصناعيين وأصحاب المهن الحرة</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>الاسم واللقب *</Label>
                  <Input required value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
                </div>
                <div>
                  <Label>رقم الهاتف *</Label>
                  <Input required type="tel" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
                </div>
              </div>

              <div>
                <Label>البريد الإلكتروني *</Label>
                <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>الولاية *</Label>
                  <Input required value={formData.wilaya} onChange={(e) => setFormData({...formData, wilaya: e.target.value})} />
                </div>
                <div>
                  <Label>المعتمدية *</Label>
                  <Input required value={formData.moatmadia} onChange={(e) => setFormData({...formData, moatmadia: e.target.value})} />
                </div>
              </div>

              <div>
                <Label>العنوان التفصيلي</Label>
                <Input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>

              <div>
                <Label>النشاط (مهنتك) *</Label>
                <Input required placeholder="مثال: نجار، بلومبي، كهربائي..." value={formData.activity} onChange={(e) => setFormData({...formData, activity: e.target.value})} />
              </div>

              <div>
                <Label>وصف الخبرات</Label>
                <textarea rows={3} className="w-full rounded-lg border p-3 text-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="عندي 10 سنين خبرة..." />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                {loading ? "جاري التسجيل..." : "سجل الآن"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}