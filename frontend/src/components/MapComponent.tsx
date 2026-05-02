"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-800 rounded-2xl">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="mr-3 text-slate-500">جاري تحميل الخريطة...</span>
    </div>
  ),
});

export default function MapComponent(props: any) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="mr-3 text-slate-500">جاري التحميل...</span>
      </div>
    );
  }
  return <LeafletMap {...props} />;
}