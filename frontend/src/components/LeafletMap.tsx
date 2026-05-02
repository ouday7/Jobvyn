"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { getDelegationCoordinates, getSpecialtyIcon } from "@/lib/tunisiaData";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const getMarkerColor = (specialty: string): string => {
  const s = specialty?.toLowerCase() || "";
  if (s.includes("مهندس") || s.includes("فلاح")) return "#2E7D32";
  if (s.includes("نجار")) return "#8B4513";
  if (s.includes("حداد")) return "#4A4A4A";
  if (s.includes("كهرب")) return "#F9A825";
  if (s.includes("سباك") || s.includes("بلومبي")) return "#1E88E5";
  if (s.includes("بناء")) return "#D2691E";
  if (s.includes("دهان")) return "#E91E63";
  if (s.includes("سيراميك") || s.includes("تبليط")) return "#00ACC1";
  if (s.includes("خياط")) return "#AB47BC";
  if (s.includes("كوافير")) return "#F48FB1";
  if (s.includes("طباخ")) return "#FF6D00";
  if (s.includes("ميكانيكي")) return "#7B1FA2";
  if (s.includes("سائق")) return "#1565C0";
  if (s.includes("طبيب")) return "#00ACC1";
  if (s.includes("مدرس") || s.includes("أستاذ")) return "#FF9800";
  if (s.includes("مطور")) return "#4CAF50";
  return "#2563eb";
};

const createCustomIcon = (specialty: string) => {
  const iconEmoji = getSpecialtyIcon(specialty);
  const color = getMarkerColor(specialty);

  const iconHtml = `
    <div style="
      background: ${color};
      color: white;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      cursor: pointer;
    ">
      ${iconEmoji}
    </div>
  `;
  return L.divIcon({
    html: iconHtml,
    className: "custom-div-icon",
    iconSize: [48, 48],
    popupAnchor: [0, -24],
  });
};

export default function LeafletMap({ center, freelancers }: any) {
  if (!freelancers || freelancers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <p className="text-slate-500">لا توجد مواقع لعرضها</p>
      </div>
    );
  }

  const validFreelancers = freelancers.filter((f: any) => {
    const coords = getDelegationCoordinates(f.wilaya, f.moatmadia);
    return coords !== null;
  });

  if (validFreelancers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <p className="text-slate-500">لم يتم تحديد مواقع دقيقة لهؤلاء المستقلين</p>
      </div>
    );
  }

  return (
    <MapContainer center={center} zoom={8.5} style={{ height: "100%", width: "100%" }} className="z-0">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {validFreelancers.map((freelancer: any, index: number) => {
        const coords = getDelegationCoordinates(freelancer.wilaya, freelancer.moatmadia);
        if (!coords) return null;
        const offset = (index % 5) * 0.0008;
        const finalCoords: [number, number] = [coords[0] + offset, coords[1] + offset];

        return (
          <Marker
            key={`${freelancer.freelancer_id}-${index}`}
            position={finalCoords}
            icon={createCustomIcon(freelancer.specialty)}
          >
            <Popup>
              <div dir="rtl" className="text-right p-2 min-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl">{getSpecialtyIcon(freelancer.specialty)}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{freelancer.full_name}</h4>
                    <p className="text-xs text-blue-600 font-semibold">{freelancer.specialty}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-2">📍 {freelancer.wilaya} - {freelancer.moatmadia}</p>
                {freelancer.hourly_rate && (
                  <p className="text-xs text-green-600 mb-2">💰 {freelancer.hourly_rate} د.ت/ساعة</p>
                )}
                <div className="flex gap-3 mt-2 pt-2 border-t border-slate-100">
                  <a href={`tel:${freelancer.phone_number}`} className="text-green-600 text-sm hover:underline">
                    📞 اتصال
                  </a>
                  <Link href={`/freelance/${freelancer.freelancer_id}`} className="text-blue-600 text-sm hover:underline">
                    👤 ملف
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}