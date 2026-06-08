"use client";
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// استخدم الملف المحلي
const TUNISIA_GEOJSON = "/tunisia.geojson";

// ربط أسماء الولايات
const wilayaNameMapping: Record<string, string> = {
  "Tunis": "تونس",
  "Ariana": "أريانة",
  "Ben Arous": "بن عروس",
  "Manouba": "منوبة",
  "Nabeul": "نابل",
  "Zaghouan": "زغوان",
  "Bizerte": "بنزرت",
  "Beja": "باجة",
  "Jendouba": "جندوبة",
  "Kef": "الكاف",
  "Siliana": "سليانة",
  "Sousse": "سوسة",
  "Monastir": "المنستير",
  "Mahdia": "المهدية",
  "Sfax": "صفاقس",
  "Gabes": "قابس",
  "Medenine": "مدنين",
  "Tataouine": "تطاوين",
  "Gafsa": "قفصة",
  "Tozeur": "توزر",
  "Kairouan": "القيروان",
  "Kasserine": "القصرين",
  "Sidi Bouzid": "سيدي بوزيد"
};

interface TunisiaInteractiveMapProps {
  onSelectWilaya: (wilaya: string) => void;
  selectedWilaya: string;
}

export default function TunisiaInteractiveMap({ onSelectWilaya, selectedWilaya }: TunisiaInteractiveMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [geographyData, setGeographyData] = useState<any>(null);

  useEffect(() => {
    fetch(TUNISIA_GEOJSON)
      .then(res => res.json())
      .then(data => setGeographyData(data))
      .catch(err => console.error("Error loading map:", err));
  }, []);

  const getWilayaName = (geoName: string): string => {
    return wilayaNameMapping[geoName] || geoName;
  };

  if (!geographyData) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-slate-500">جاري تحميل الخريطة...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-800">
      <h3 className="text-center text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
        🗺️ إضغط على أي ولاية لتحديدها
      </h3>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2500,
          center: [9.5, 34.5]
        }}
        className="w-full h-auto cursor-pointer"
      >
        <Geographies geography={geographyData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoName = geo.properties.name || geo.properties.NAME_1 || "";
              const wilayaName = getWilayaName(geoName);
              const isSelected = selectedWilaya === wilayaName;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelectWilaya(wilayaName)}
                  onMouseEnter={() => setHovered(wilayaName)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    default: {
                      fill: isSelected ? "#3b82f6" : (hovered === wilayaName ? "#60a5fa" : "#e2e8f0"),
                      stroke: "#475569",
                      strokeWidth: 0.8,
                      outline: "none",
                    },
                    hover: {
                      fill: "#60a5fa",
                      stroke: "#1e293b",
                      strokeWidth: 0.8,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#2563eb",
                      stroke: "#1e293b",
                      strokeWidth: 0.8,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {selectedWilaya && (
        <p className="mt-4 text-center text-sm text-green-600 font-bold">
          ✅ تم الاختيار: {selectedWilaya}
        </p>
      )}
      <p className="mt-2 text-center text-xs text-slate-400">
        📍 إضغط على أي ولاية لتحديدها
      </p>
    </div>
  );
}