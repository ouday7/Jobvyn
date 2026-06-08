// إحداثيات تقريبية للولايات على خريطة SVG (100x100)
export const tunisiaWilayaSVG: Record<string, { path: string; coordinates: { x: number; y: number } }> = {
  "تونس": { path: "M 48,22 L 55,20 L 58,26 L 52,28 Z", coordinates: { x: 53, y: 24 } },
  "أريانة": { path: "M 40,15 L 48,13 L 50,19 L 42,21 Z", coordinates: { x: 45, y: 17 } },
  "بن عروس": { path: "M 52,30 L 60,28 L 62,34 L 54,36 Z", coordinates: { x: 57, y: 32 } },
  "منوبة": { path: "M 35,20 L 42,18 L 44,24 L 37,26 Z", coordinates: { x: 39, y: 22 } },
  "نابل": { path: "M 75,32 L 82,30 L 84,36 L 77,38 Z", coordinates: { x: 79, y: 34 } },
  "زغوان": { path: "M 62,38 L 69,36 L 71,42 L 64,44 Z", coordinates: { x: 66, y: 40 } },
  "بنزرت": { path: "M 25,8 L 32,6 L 34,12 L 27,14 Z", coordinates: { x: 29, y: 10 } },
  "باجة": { path: "M 20,25 L 27,23 L 29,29 L 22,31 Z", coordinates: { x: 24, y: 27 } },
  "جندوبة": { path: "M 12,18 L 19,16 L 21,22 L 14,24 Z", coordinates: { x: 16, y: 20 } },
  "الكاف": { path: "M 8,35 L 15,33 L 17,39 L 10,41 Z", coordinates: { x: 12, y: 37 } },
  "سليانة": { path: "M 28,38 L 35,36 L 37,42 L 30,44 Z", coordinates: { x: 32, y: 40 } },
  "سوسة": { path: "M 70,45 L 77,43 L 79,49 L 72,51 Z", coordinates: { x: 74, y: 47 } },
  "المنستير": { path: "M 78,48 L 85,46 L 87,52 L 80,54 Z", coordinates: { x: 82, y: 50 } },
  "المهدية": { path: "M 82,55 L 89,53 L 91,59 L 84,61 Z", coordinates: { x: 86, y: 57 } },
  "صفاقس": { path: "M 65,60 L 72,58 L 74,64 L 67,66 Z", coordinates: { x: 69, y: 62 } },
  "قابس": { path: "M 55,70 L 62,68 L 64,74 L 57,76 Z", coordinates: { x: 59, y: 72 } },
  "مدنين": { path: "M 68,75 L 75,73 L 77,79 L 70,81 Z", coordinates: { x: 72, y: 77 } },
  "تطاوين": { path: "M 60,82 L 67,80 L 69,86 L 62,88 Z", coordinates: { x: 64, y: 84 } },
  "قفصة": { path: "M 40,65 L 47,63 L 49,69 L 42,71 Z", coordinates: { x: 44, y: 67 } },
  "توزر": { path: "M 30,58 L 37,56 L 39,62 L 32,64 Z", coordinates: { x: 34, y: 60 } },
  "القيروان": { path: "M 45,48 L 52,46 L 54,52 L 47,54 Z", coordinates: { x: 49, y: 50 } },
  "القصرين": { path: "M 32,50 L 39,48 L 41,54 L 34,56 Z", coordinates: { x: 36, y: 52 } },
  "سيدي بوزيد": { path: "M 38,58 L 45,56 L 47,62 L 40,64 Z", coordinates: { x: 42, y: 60 } }
};

// الحصول على الولاية من الإحداثيات (للنقر على الخريطة)
export const getWilayaFromClick = (x: number, y: number): string => {
  for (const [wilaya, data] of Object.entries(tunisiaWilayaSVG)) {
    const cx = data.coordinates.x;
    const cy = data.coordinates.y;
    const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    if (distance < 12) return wilaya;
  }
  return "";
};

// قائمة الولايات
export const wilayaSVGList = Object.keys(tunisiaWilayaSVG);