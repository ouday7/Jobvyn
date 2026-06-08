"use client";
import React from "react";
import { 
  Scale, BookOpen, Users, Briefcase, FileText, ExternalLink, 
  Download, Shield, Building2, AlertCircle, CheckCircle, 
  Home, Link as LinkIcon, Calendar, Clock, Phone, Mail, 
  Award, Heart, ShieldCheck, Truck, GraduationCap, DollarSign,
  Globe, MapPin, Printer, Copy, ChevronLeft, ChevronRight,
  Lock, Flag
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ResourcesPage() {
  const tunisCities = [
    { name: "تونس", code: "01", address: "شارع خير الدين باشا", phone: "71 123 456", email: "tunis@emploi.gov.tn" },
    { name: "أريانة", code: "02", address: "شارع الحبيب بورقيبة", phone: "71 234 567", email: "ariana@emploi.gov.tn" },
    { name: "بن عروس", code: "03", address: "نهج الجمهورية", phone: "71 345 678", email: "benarous@emploi.gov.tn" },
    { name: "منوبة", code: "04", address: "شارع الاستقلال", phone: "71 456 789", email: "manouba@emploi.gov.tn" },
    { name: "نابل", code: "05", address: "نهج الحبيب ثامر", phone: "72 123 456", email: "nabeul@emploi.gov.tn" },
    { name: "زغوان", code: "06", address: "شارع فرحات حشاد", phone: "72 234 567", email: "zaghouan@emploi.gov.tn" },
    { name: "باجة", code: "07", address: "نهج 7 نوفمبر", phone: "72 345 678", email: "beja@emploi.gov.tn" },
    { name: "جندوبة", code: "08", address: "شارع الحرية", phone: "72 456 789", email: "jendouba@emploi.gov.tn" },
    { name: "الكاف", code: "09", address: "نهج قرطاج", phone: "72 567 890", email: "kef@emploi.gov.tn" },
    { name: "سليانة", code: "10", address: "شارع 23 جانفي", phone: "73 123 456", email: "siliana@emploi.gov.tn" },
    { name: "سوسة", code: "11", address: "نهج الحبيب بورقيبة", phone: "73 234 567", email: "sousse@emploi.gov.tn" },
    { name: "المنستير", code: "12", address: "شارع الكريم", phone: "73 345 678", email: "monastir@emploi.gov.tn" },
    { name: "المهدية", code: "13", address: "نهج فاطمة الزهراء", phone: "73 456 789", email: "mahdia@emploi.gov.tn" },
    { name: "صفاقس", code: "14", address: "شارع الحبيب ثامر", phone: "74 123 456", email: "sfax@emploi.gov.tn" },
    { name: "القيروان", code: "15", address: "نهج بورقيبة", phone: "77 123 456", email: "kairouan@emploi.gov.tn" },
    { name: "القصرين", code: "16", address: "شارع 20 مارس", phone: "77 234 567", email: "kasserine@emploi.gov.tn" },
    { name: "سيدي بوزيد", code: "17", address: "نهج الثورة", phone: "76 123 456", email: "sidibouzid@emploi.gov.tn" },
    { name: "تطاوين", code: "18", address: "شارع الجمهورية", phone: "75 123 456", email: "tataouine@emploi.gov.tn" },
    { name: "قبلي", code: "19", address: "نهج الاستقلال", phone: "75 234 567", email: "kebili@emploi.gov.tn" },
    { name: "قفصة", code: "20", address: "شارع فرحات حشاد", phone: "76 234 567", email: "gafsa@emploi.gov.tn" },
    { name: "توزر", code: "21", address: "نهج 7 نوفمبر", phone: "76 345 678", email: "tozeur@emploi.gov.tn" },
    { name: "مدنين", code: "22", address: "شارع الحبيب بورقيبة", phone: "75 345 678", email: "medenine@emploi.gov.tn" },
    { name: "قابس", code: "23", address: "نهج الجمهورية", phone: "75 456 789", email: "gabes@emploi.gov.tn" },
  ];

  const constitutionArticles = [
    { number: "الديباجة", title: "ديباجة الدستور", desc: "تحتوي على المبادئ العامة والقيم العليا للدولة التونسية." },
    { number: "الفصل 1", title: "نظام الدولة", desc: "تونس دولة حرة، مستقلة، ذات سيادة، الإسلام دينها، العربية لغتها، والجمهورية نظامها." },
    { number: "الفصل 2", title: "الجمهورية", desc: "الدولة القائمة على المواطنة وإرادة الشعب وسيادة القانون." },
    { number: "الفصل 3", title: "السيادة", desc: "الشعب مصدر السيادة يمارسها عن طريق الانتخاب والاستفتاء." },
    { number: "الفصل 4", title: "العلم والنشيد الوطني", desc: "العلم التونسي أحمر، يتوسطه دائرة بيضاء بها نجم وهلال كما يحدده القانون." },
    { number: "الفصل 5", title: "السلطة التشريعية", desc: "يمارس الشعب السلطة التشريعية عبر مجلس نواب الشعب والمجلس الوطني للجهات والأقاليم." },
    { number: "الفصل 6", title: "حرية المعتقد", desc: "حرية المعتقد والضمير مكفولة، والدولة تحترم المقدسات." },
    { number: "الفصل 7", title: "الحقوق والحريات", desc: "حقوق الإنسان مكفولة، والقانون يحدد ممارستها." },
    { number: "الفصل 8", title: "المساواة", desc: "المواطنون متساوون أمام القانون في الحقوق والواجبات." },
    { number: "الفصل 9", title: "الحق في العمل", desc: "العمل حق لكل مواطن، والدولة تتخذ التدابير اللازمة لتوفيره." },
    { number: "الفصل 10", title: "النقابات", desc: "الحق في تأسيس النقابات المهنية مكفول." },
    { number: "الفصل 11", title: "حرية التعبير", desc: "حرية التعبير والفكر والإبداع和信息 مكفولة." },
    { number: "الفصل 12", title: "الحق في التعليم", desc: "التعليم إجباري ومجاني في مراحله الأساسية." },
    { number: "الفصل 13", title: "الحق في الصحة", desc: "الحق في الصحة مكفول، والدولة تضمن الرعاية الصحية." },
    { number: "الفصل 14", title: "العدالة", desc: "السلطة القضائية مستقلة، وتكفل العدالة وحماية الحقوق." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <Scale className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
            قوانين <span className="text-blue-600">الشغل في تونس</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            تعرف على حقوقك وواجباتك كعامل أو مشغل، باش تخدم في أمان وتفهم القوانين اللي تحميك
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-amber-100 text-amber-700">📘 بالدارجة التونسية</Badge>
            <Badge className="bg-green-100 text-green-700">⚖️ محدث 2026</Badge>
            <Badge className="bg-blue-100 text-blue-700">🇹🇳 القانون التونسي</Badge>
          </div>
        </div>

        <Tabs defaultValue="laws" className="w-full" dir="rtl">
          <TabsList className="grid grid-cols-4 mb-8 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            <TabsTrigger value="laws" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Scale className="h-4 w-4" /> قوانين الشغل
            </TabsTrigger>
            <TabsTrigger value="rights" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Users className="h-4 w-4" /> حقوق وواجبات
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <LinkIcon className="h-4 w-4" /> موارد مفيدة
            </TabsTrigger>
            <TabsTrigger value="tunis" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <MapPin className="h-4 w-4" /> تونس وأقاليمها
            </TabsTrigger>
          </TabsList>

          {/* ========== TAB 1: قوانين الشغل ========== */}
          <TabsContent value="laws" className="space-y-6">
            {/* قانون الشغل التونسي - شرح بالدارجة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" /> 📖 مجلة الشغل التونسية (Code du Travail)
                </CardTitle>
                <CardDescription className="text-base">
                  القانون الأساسي اللي ينظم علاقة الشغل بين العامل والمشغل في تونس
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-2xl border-r-4 border-blue-500">
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    <span className="font-bold">شنو هو؟</span> مجلة الشغل التونسية هي القانون اللي يحكم كل ما يتعلق بالخدمة: 
                    كيفاش تتعاقد، شنو حقوقك، شنو واجباتك، الأجر، وقت الخدمة، الإجازات، 
                    السلامة المهنية، الضمان الاجتماعي، وكيفاش تخلص العلاقة الشغلية.
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  صدرت مجلة الشغل التونسية بمقتضى <strong>القانون عدد 17 لسنة 2020</strong> (مؤرخ في 8 جوان 2020)، 
                  وهي تنظم علاقات الشغل الفردية والجماعية، حقوق والتزامات الأطراف، عقود العمل، 
                  الأجر، وقت العمل، الإجازات، السلامة المهنية، والضمان الاجتماعي.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <a href="#" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-blue-50 transition group">
                    <Download className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">تحميل مجلة الشغل PDF</p>
                      <p className="text-xs text-slate-400">النسخة الكاملة - 250 صفحة</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-blue-50 transition group">
                    <ExternalLink className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">الاطلاع على الموقع الرسمي</p>
                      <p className="text-xs text-slate-400">www.iort.gov.tn</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* الفصول الهامة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-600" /> 📑 أهم الفصول اللي لازم تعرفها
                </CardTitle>
                <CardDescription>
                  فصول مختارة من مجلة الشغل التونسية مترجمة ومشرحة بالدارجة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 1: مجال تطبيق القانون
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>هذا القانون يطبق على كل علاقة شغل بين عامل ومشغل في القطاع الخاص والقطاع العمومي.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">كل خدمة تعملها باش تجي بأجر (سواء في شركة خاصة ولا مؤسسة حكومية) هي مشمولة بالقانون هذا.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 10: تعريف عقد العمل
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>عقد العمل هو اتفاق بين العامل والمشغل، يتعهد بمقتضاه العامل بتقديم خدمات تحت سلطة المشغل مقابل أجر.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">العقد هو ورقة توثق الاتفاق بينك وبين اللي خدمك، تحدد شنو باش تعمل واشنو باش تخلص.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 20: الأجر (Salaire)
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>الأجر هو كل ما يتلقاه العامل لقاء عمله، ويشمل الأجر الأساسي والزيادات والمنح والتعويضات.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">الأجر مش فقط الـ salaire de base، لكن حتى البونس، المنح، التعويضات... كل شيء تعطيه المؤسسة.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 48: ساعات العمل
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>مدة العمل القانونية هي 40 ساعة في الأسبوع، موزعة على 6 أيام كحد أقصى.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">الخدمة العادية ما تتعداش 40 ساعة في السمعة (تقريباً 8 ساعات في النهار)، وما تتعداش 6 أيام في السمعة.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 50: العمل الإضافي
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>يتم العمل الإضافي بأجر يضاف إلى الأجر العادي. وتم تحديد أسعار العمل الإضافي بالأمر عدد 89 لسنة 2019.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">كي تحب تخدم على حساب ساعات الخدمة العادية (زيادة في الليل ولا في weekend)، تحقلك أجر إضافي أعلى من الأجر العادي.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 77: الإجازة السنوية
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>لكل عامل له قدم سنة كاملة من العمل الفعلي لدى مشغل بعينه، حق في إجازة سنوية مدفوعة الأجر لا تقل عن 15 يوماً ولا تتجاوز 30 يوماً.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">كل عامل كمل عام كامل في خدمته، عندو الحق في عطل مدفوعة الأجر تتراوح بين 15 و 30 يوم (حسب القطاع).</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 121: الصحة والسلامة المهنية
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>يجب على المشغل اتخاذ جميع الاحتياطات اللازمة لحماية العمال من المخاطر المهنية.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">المشغل ملزم يوفّرلك ظروف خدمة آمنة، وتجهيزات الوقاية، ومخاطرش على صحتك.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 164: الراحة الأسبوعية
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>لكل عامل حق في راحة أسبوعية لا تقل عن 24 ساعة متصلة.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">كل أسبوع عندك الحق في يوم كامل (24 ساعة) راحة.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 204: التصريح بالمرض
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>على العامل إخطار المشغل خلال 48 ساعة من تاريخ التوقف عن العمل بسبب المرض.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">كي تتعطل بالمرض، لازم تخبر الـ service على روحك فماكسوم 48 ساعة ويعطيك شهادة مرض.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 250: إنهاء عقد العمل
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>ينتهي عقد العمل بالتراضي، أو بانتهاء المدة، أو بالإقالة، أو بالفصل.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">الخدمة تخلص باش بمخالفة: إما بالتراضي، وإلا كمل وقت العقد، وإلا إما هو طردك (بسباب مو لوجي)، وإلا استقلت أنت.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB 2: حقوق وواجبات ========== */}
          <TabsContent value="rights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" /> ✅ حقوق العامل (ما يتحقلك)
                </CardTitle>
                <CardDescription>بالدارجة: هاذي أهم الحقوق اللي تحققلك كي تخدم في تونس</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { text: "الحصول على عقد عمل مكتوب يوضح المهام والأجر والمدة", icon: <FileText className="h-4 w-4" /> },
                    { text: "أجر عادل ومطابق للقانون (ما لا يقل عن SMIG = 450 دينار)", icon: <DollarSign className="h-4 w-4" /> },
                    { text: "الانخراط في الضمان الاجتماعي (CNSS) وحماية صحية", icon: <Shield className="h-4 w-4" /> },
                    { text: "ساعات عمل لا تتجاوز 40 ساعة في الأسبوع (8 ساعات يومياً)", icon: <Clock className="h-4 w-4" /> },
                    { text: "إجازة سنوية مدفوعة الأجر (15 إلى 30 يوم)", icon: <Calendar className="h-4 w-4" /> },
                    { text: "أجر العمل الإضافي (زيادة في الأجور)", icon: <Award className="h-4 w-4" /> },
                    { text: "التعويض عن المرض والحوادث المهنية", icon: <Heart className="h-4 w-4" /> },
                    { text: "التكوين المستمر وتطوير المهارات", icon: <GraduationCap className="h-4 w-4" /> },
                    { text: "عدم التمييز في التوظيف بسبب الجنس أو العمر أو الأصل", icon: <ShieldCheck className="h-4 w-4" /> },
                    { text: "حق الإضراب وفق القانون", icon: <Users className="h-4 w-4" /> },
                    { text: "بيئة عمل آمنة (تجهيزات الوقاية)", icon: <Truck className="h-4 w-4" /> },
                    { text: "الراحة الأسبوعية (يوم كامل)", icon: <Heart className="h-4 w-4" /> },
                  ].map((right, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/10 rounded-xl hover:bg-green-100 transition">
                      <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{right.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" /> ⚠️ واجبات العامل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { text: "أداء العمل المتفق عليه بدقة وأمانة", icon: <Briefcase className="h-4 w-4" /> },
                    { text: "احترام ساعات العمل وعدم الغياب دون عذر", icon: <Clock className="h-4 w-4" /> },
                    { text: "الحفاظ على أدوات وممتلكات المؤسسة", icon: <Shield className="h-4 w-4" /> },
                    { text: "احترام التسلسل الهرمي وتنفيذ الأوامر المهنية", icon: <Users className="h-4 w-4" /> },
                    { text: "الحرص على السلامة والصحة المهنية", icon: <Heart className="h-4 w-4" /> },
                    { text: "حفظ أسرار المؤسسة التجارية والصناعية", icon: <Lock className="h-4 w-4" /> },
                  ].map((duty, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/10 rounded-xl">
                      <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{duty.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" /> 🏢 حقوق وواجبات المشغل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-green-50 dark:bg-green-950/10 rounded-xl">
                    <h4 className="font-bold text-green-700 mb-3"><CheckCircle className="h-4 w-4 inline ml-1" /> ✅ حقوق المشغل:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• توجيه العمال وتقييم أدائهم</li>
                      <li>• وضع عقوبات تأديبية وفق القانون</li>
                      <li>• تنظيم ساعات العمل والإجازات</li>
                      <li>• طلب التعويض عن الأضرار</li>
                      <li>• فصل العامل لأسباب حقيقية وجدية</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-orange-50 dark:bg-orange-950/10 rounded-xl">
                    <h4 className="font-bold text-orange-700 mb-3"><AlertCircle className="h-4 w-4 inline ml-1" /> ❌ واجبات المشغل:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• توفير ظروف عمل آمنة وصحية</li>
                      <li>• دفع الأجر في الآجال القانونية</li>
                      <li>• التصريح بالعمال لدى CNSS</li>
                      <li>• احترام عقود العمل والاتفاقيات</li>
                      <li>• منح الإجازات السنوية</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB 3: موارد مفيدة (مع الدستور) ========== */}
          <TabsContent value="resources" className="space-y-6">
            
            {/* الدستور التونسي الجديد */}
            <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Flag className="h-5 w-5 text-red-600" /> 🇹🇳 الدستور التونسي 2022
                </CardTitle>
                <CardDescription className="text-base">
                  دستور الجمهورية التونسية الصادر في 25 جويلية 2022 - القانون الأعلى للبلاد
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-2xl border-r-4 border-red-500">
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    <span className="font-bold">شنو هو؟</span> الدستور التونسي هو القانون الأعلى في البلاد، 
                    يحدد نظام الحكم، ويرسي مبادئ الجمهورية، ويكفل الحقوق والحريات الأساسية للمواطنين. 
                    صدر دستور 2022 بعد استفتاء شعبي يوم 25 جويلية 2022.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <a href="#" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-red-50 transition group">
                    <Download className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">تحميل الدستور التونسي PDF</p>
                      <p className="text-xs text-slate-400">النسخة الكاملة بالعربية</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-red-50 transition group">
                    <ExternalLink className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">الاطلاع على الدستور الرسمي</p>
                      <p className="text-xs text-slate-400">www.legislation.tn</p>
                    </div>
                  </a>
                </div>

                {/* أهم فصول الدستور */}
                <div className="mt-4">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-red-600" /> 📖 أهم فصول الدستور التونسي
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {constitutionArticles.map((article, i) => (
                      <AccordionItem key={i} value={`constitution-${i}`}>
                        <AccordionTrigger className="text-right font-bold text-base">
                          {article.number}: {article.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-right">
                          <p className="text-slate-600 dark:text-slate-400">{article.desc}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* المبادئ الأساسية */}
                <div className="bg-white dark:bg-slate-800/30 p-4 rounded-xl mt-3">
                  <h4 className="font-bold text-red-700 mb-2">⭐ المبادئ الأساسية للدستور التونسي:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> دولة القانون والمؤسسات</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> الفصل بين السلطات</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> سيادة الشعب</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> ضمان الحقوق والحريات</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> المساواة بين المواطنين</div>
                    <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-600" /> حماية المكاسب الوطنية</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* مواقع رسمية */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" /> 🌐 مواقع رسمية مفيدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "وزارة الشغل والتشغيل", url: "https://emploi.gov.tn", desc: "الإعلانات الرسمية، النصوص القانونية، والتشغيل", icon: <Building2 className="h-4 w-4" /> },
                    { name: "الوكالة الوطنية للتشغيل (ANETI)", url: "https://aneti.tn", desc: "عروض الشغل، برامج التكوين، مراكز الإرشاد المهني", icon: <Users className="h-4 w-4" /> },
                    { name: "الصندوق الوطني للضمان الاجتماعي (CNSS)", url: "https://cnss.tn", desc: "التصريح بالأجور، خدمات المؤمن لهم والمعاشات", icon: <Shield className="h-4 w-4" /> },
                    { name: "بوابة القانون التونسي", url: "https://legislation.tn", desc: "مجلة الشغل والمراسيم المنظمة والدستور التونسي", icon: <Scale className="h-4 w-4" /> },
                    { name: "هيئة الانتخابات (ISIE)", url: "https://isie.tn", desc: "الاستفتاءات والانتخابات", icon: <Flag className="h-4 w-4" /> },
                    { name: "مجلس نواب الشعب", url: "https://arp.tn", desc: "القوانين المصادق عليها", icon: <Building2 className="h-4 w-4" /> },
                  ].map((site, i) => (
                    <a key={i} href={site.url} target="_blank" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl hover:bg-blue-50 transition group">
                      <div className="flex items-center gap-3">
                        {site.icon}
                        <div>
                          <p className="font-medium">{site.name}</p>
                          <p className="text-xs text-slate-500">{site.desc}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* أرقام مفيدة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" /> 📞 أرقام مفيدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <p className="font-bold text-green-700">☎️ الخط الساخن للشغل</p>
                    <p className="text-2xl font-mono mt-1 text-center">1814</p>
                    <p className="text-xs text-slate-500 mt-1">من الإثنين إلى الجمعة 08:00-16:00</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="font-bold text-blue-700">🏛️ CNSS (الضمان الاجتماعي)</p>
                    <p className="text-2xl font-mono mt-1 text-center">111 100 80</p>
                    <p className="text-xs text-slate-500 mt-1">خط أخضر مجاني</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <p className="font-bold text-red-700">📞 التبليغ عن العمل غير القانوني</p>
                    <p className="text-2xl font-mono mt-1 text-center">111 100 80</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <p className="font-bold text-purple-700">⚖️ الاستشارات القانونية المجانية</p>
                    <p className="text-2xl font-mono mt-1 text-center">1813</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB 4: تونس وأقاليمها ========== */}
          <TabsContent value="tunis" className="space-y-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                تونس 🇹🇳 وأقاليمها
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                تعرف على مراكز التشغيل والخدمات المهنية في ولايات تونس الـ 24
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" /> 🏢 مراكز التشغيل في ولايات تونس
                </CardTitle>
                <CardDescription>
                  جميع ولايات الجمهورية التونسية مع عناوين وأرقام الاتصال
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tunisCities.map((city, i) => (
                    <div key={i} className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-md hover:border-emerald-200 transition-all group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold text-xs">
                          {city.code}
                        </div>
                        <h3 className="font-bold text-base text-gray-800 dark:text-gray-200">{city.name}</h3>
                      </div>
                      <div className="space-y-1 mt-3">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {city.address}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {city.phone}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {city.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" /> العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}