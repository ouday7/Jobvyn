import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/context/AppContext";
import RadioPlayer from "@/components/RadioPlayer";

export const metadata: Metadata = {
  title: "خدّمني - منصة التوظيف التونسية",
  description: "المنصة الأولى في تونس التي تربط أصحاب العمل وطالبي الشغل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <RadioPlayer />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}