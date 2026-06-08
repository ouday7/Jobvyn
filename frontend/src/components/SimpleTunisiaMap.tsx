"use client";
import { useState } from "react";

// إحداثيات الولايات على خريطة SVG مبسطة
const wilayaCoordinates: Record<string, { path: string; x: number; y: number }> = {
  "تونس": { path: "M 45,22 L 52,20 L 55,26 L 48,28 Z", x: 50, y: 24 },
  "أريانة": { path: "M 38,15 L 45,13 L 48,19 L 41,21 Z", x: 43, y: 17 },
  "بن عروس": { path: "M 48,30 L 55,28 L 58,34 L 51,36 Z", x: 53, y: 32 },
  "منوبة": { path: "M 32,20 L 39,18 L 42,24 L 35,26 Z", x: 37, y: 22 },
  "نابل": { path: "M 70,32 L 77,30 L 80,36 L 73,38 Z", x: 75, y: 34 },
  "زغوان": { path: "M 58,38 L 65,36 L 68,42 L 61,44 Z", x: 63, y: 40 },
  "بنزرت": { path: "M 22,8 L 29,6 L 32,12 L 25,14 Z", x: 27, y: 10 },
  "باجة": { path: "M 18,25 L 25,23 L 28,29 L 21,31 Z", x: 23, y: 27 },
  "جندوبة": { path: "M 10,18 L 17,16 L 20,22 L 13,24 Z", x: 15, y: 20 },
  "الكاف": { path: "M 6,35 L 13,33 L 16,39 L 9,41 Z", x: 11, y: 37 },
  "سليانة": { path: "M 26,38 L 33,36 L 36,42 L 29,44 Z", x: 31, y: 40 },
  "سوسة": { path: "M 66,45 L 73,43 L 76,49 L 69,51 Z", x: 71, y: 47 },
  "المنستير": { path: "M 74,48 L 81,46 L 84,52 L 77,54 Z", x: 79, y: 50 },
  "المهدية": { path: "M 78,55 L 85,53 L 88,59 L 81,61 Z", x: 83, y: 57 },
  "صفاقس": { path: "M 62,60 L 69,58 L 72,64 L 65,66 Z", x: 67, y: 62 },
  "قابس": { path: "M 52,70 L 59,68 L 62,74 L 55,76 Z", x: 57, y: 72 },
  "مدنين": { path: "M 64,75 L 71,73 L 74,79 L 67,81 Z", x: 69, y: 77 },
  "تطاوين": { path: "M 58,82 L 65,80 L 68,86 L 61,88 Z", x: 63, y: 84 },
  "قفصة": { path: "M 38,65 L 45,63 L 48,69 L 41,71 Z", x: 43, y: 67 },
  "توزر": { path: "M 28,58 L 35,56 L 38,62 L 31,64 Z", x: 33, y: 60 },
  "القيروان": { path: "M 43,48 L 50,46 L 53,52 L 46,54 Z", x: 48, y: 50 },
  "القصرين": { path: "M 30,50 L 37,48 L 40,54 L 33,56 Z", x: 35, y: 52 },
  "سيدي بوزيد": { path: "M 36,58 L 43,56 L 46,62 L 39,64 Z", x: 41, y: 60 }
};

const wilayaList = Object.keys(wilayaCoordinates);

interface SimpleTunisiaMapProps {
  onSelectWilaya: (wilaya: string) => void;
  selectedWilaya: string;
}

export default function SimpleTunisiaMap({ onSelectWilaya, selectedWilaya }: SimpleTunisiaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClick = (wilaya: string) => {
    onSelectWilaya(wilaya);
  };

  const getFillColor = (wilaya: string) => {
    if (selectedWilaya === wilaya) return "#3b82f6";
    if (hovered === wilaya) return "#60a5fa";
    return "#94a3b8";
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center">
      <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3">🗺️ إختر ولايتك من الخريطة</h3>
      <svg viewBox="0 0 100 100" className="w-full max-w-[350px] h-auto cursor-pointer">
        {wilayaList.map((wilaya) => (
          <path
            key={wilaya}
            d={wilayaCoordinates[wilaya].path}
            fill={getFillColor(wilaya)}
            stroke="#1e293b"
            strokeWidth="0.8"
            className="transition-all duration-200"
            onMouseEnter={() => setHovered(wilaya)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(wilaya)}
          />
        ))}
      </svg>
      {selectedWilaya && (
        <p className="mt-3 text-xs text-green-600 font-bold">✅ تم الاختيار: {selectedWilaya}</p>
      )}
      <p className="mt-2 text-xs text-slate-400 text-center">📍 إضغط على أي منطقة لتحديد الولاية</p>
    </div>
  );
}