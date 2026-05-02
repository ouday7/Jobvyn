// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin, Briefcase, Phone, Loader2, Layers, Wrench, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSpecialtyIcon, specialtiesList } from "@/lib/tunisiaData";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-800 rounded-2xl">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <span className="mr-3 text-slate-500">جاري تحميل الخريطة...</span>
    </div>
  ),
});

// قائمة الفئات للفلترة من specialtiesList
const categories = [
  { id: "all", name: "الكل", icon: "🔧" },
  ...specialtiesList.map(s => ({ id: s.name, name: s.name, icon: s.icon }))
];

const tunisianWilayas = [
  "كل الولايات", "تونس", "أريانة", "بن عروس", "منوبة", "نابل", "زغوان", "بنزرت", "باجة",
  "جندوبة", "الكاف", "سليانة", "سوسة", "المنستير", "المهدية", "صفاقس",
  "قابس", "مدنين", "تطاوين", "قفصة", "توزر", "القيروان", "القصرين", "سيدي بوزيد"
];

const wilayaCoordinates: Record<string, [number, number]> = {
  "تونس": [36.8065, 10.1815], "أريانة": [36.8625, 10.1955], "بن عروس": [36.7385, 10.2215],
  "منوبة": [36.8075, 10.0995], "نابل": [36.4565, 10.7375], "زغوان": [36.4025, 10.1425],
  "بنزرت": [37.2745, 9.8735], "باجة": [36.7255, 9.1815], "جندوبة": [36.5015, 8.7805],
  "الكاف": [36.1825, 8.7145], "سليانة": [36.0825, 9.3735], "سوسة": [35.8255, 10.6365],
  "المنستير": [35.7775, 10.8265], "المهدية": [35.5045, 11.0625], "صفاقس": [34.7395, 10.7605],
  "قابس": [33.8815, 10.0985], "مدنين": [33.3545, 10.5055], "تطاوين": [32.9345, 10.4515],
  "قفصة": [34.4215, 8.7845], "توزر": [33.9195, 8.1335], "القيروان": [35.6775, 10.1015],
  "القصرين": [35.1725, 8.8285], "سيدي بوزيد": [35.0385, 9.4855]
};

export default function FreelancePage() {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWilaya, setSelectedWilaya] = useState("كل الولايات");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [mapCenter, setMapCenter] = useState([34.0, 9.5]);

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedWilaya !== "كل الولايات") params.append("wilaya", selectedWilaya);
      if (selectedCategory !== "all") params.append("specialty", selectedCategory);
      if (searchTerm) params.append("search", searchTerm);

      const { data } = await axios.get(
        `http://localhost:4002/api/user/freelancers/all?${params.toString()}`
      );
      setFreelancers(data.freelancers || []);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...freelancers];
    if (selectedCategory !== "all") {
      filtered = filtered.filter(f => f.specialty === selectedCategory);
    }
    if (selectedWilaya !== "كل الولايات") {
      filtered = filtered.filter(f => f.wilaya === selectedWilaya);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(f => 
        f.full_name?.toLowerCase().includes(term) || 
        f.specialty?.toLowerCase().includes(term)
      );
    }
    setFilteredFreelancers(filtered);
  }, [selectedCategory, selectedWilaya, searchTerm, freelancers]);

  useEffect(() => {
    fetchFreelancers();
  }, [selectedWilaya, selectedCategory]);

  useEffect(() => {
    if (selectedWilaya !== "كل الولايات" && wilayaCoordinates[selectedWilaya]) {
      setMapCenter(wilayaCoordinates[selectedWilaya]);
    } else {
      setMapCenter([34.0, 9.5]);
    }
  }, [selectedWilaya]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedWilaya("كل الولايات");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedWilaya !== "كل الولايات" || searchTerm !== "";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-6 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
            <span className="text-blue-600">الحرفيين والمستقلين</span> في تونس
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            ألقي أقرب حرفي ليك حسب الولاية أو المجال
          </p>
        </div>

        {/* فلترات البحث */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 mb-8 border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory} dir="rtl">
              <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-right">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedWilaya} onValueChange={setSelectedWilaya} dir="rtl">
              <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl text-right">
                <SelectValue placeholder="اختر الولاية" />
              </SelectTrigger>
              <SelectContent>
                {tunisianWilayas.map((wilaya) => (
                  <SelectItem key={wilaya} value={wilaya}>
                    {wilaya}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="بحث بالاسم أو الاختصاص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-12 bg-slate-50 border-slate-200 rounded-xl text-right"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button variant="ghost" onClick={clearFilters} className="text-red-500 hover:text-red-700 gap-2 text-sm">
                <X className="h-4 w-4" /> مسح الفلاتر
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs value={viewMode} onValueChange={setViewMode}>
            <TabsList className="bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="list" className="gap-2"><Layers size={16} /> قائمة</TabsTrigger>
              <TabsTrigger value="map" className="gap-2"><MapPin size={16} /> خريطة</TabsTrigger>
            </TabsList>
          </Tabs>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">{filteredFreelancers.length} مستقل(ة)</Badge>
        </div>

        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="h-10 w-10 animate-spin text-blue-600" /></div>
        ) : filteredFreelancers.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-3xl border">
            <Wrench className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">ما لقيتش حرفيين بهذه المعايير</p>
            <Button onClick={clearFilters} variant="outline" className="mt-4 rounded-xl">مسح الفلاتر</Button>
          </div>
        ) : viewMode === "map" ? (
          <div className="rounded-2xl overflow-hidden border shadow-xl h-[500px]">
            <MapComponent center={mapCenter} freelancers={filteredFreelancers} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <Link key={freelancer.freelancer_id} href={`/freelance/${freelancer.freelancer_id}`}>
                <Card className="group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full border border-slate-200 dark:border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center text-3xl shadow-inner">
                        {getSpecialtyIcon(freelancer.specialty)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {freelancer.full_name}
                        </h3>
                        <Badge className="mt-1 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                          {freelancer.specialty}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{freelancer.wilaya}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span dir="ltr">{freelancer.phone_number}</span>
                      </div>
                    </div>
                    {freelancer.description && (
                      <p className="mt-3 text-sm text-slate-500 line-clamp-2">{freelancer.description}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="fixed bottom-6 right-6 z-50">
          <Link href="/register?role=freelancer">
            <Button className="rounded-full h-14 w-14 shadow-2xl bg-blue-600 hover:bg-blue-700 text-white text-2xl">+</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}