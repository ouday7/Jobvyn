 "use client";
import React from "react";
import { 
  Scale, BookOpen, Users, Briefcase, FileText, ExternalLink, 
  Download, Shield, Building2, AlertCircle, CheckCircle, 
  Home, Link as LinkIcon, Calendar, Clock, Phone, Mail, 
  Award, Heart, ShieldCheck, Truck, GraduationCap, DollarSign,
  Globe, MapPin, Printer, Copy, ChevronLeft, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ResourcesPage() {
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
          <TabsList className="grid grid-cols-3 mb-8 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            <TabsTrigger value="laws" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Scale className="h-4 w-4" /> قوانين الشغل
            </TabsTrigger>
            <TabsTrigger value="rights" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <Users className="h-4 w-4" /> حقوق وواجبات
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
              <LinkIcon className="h-4 w-4" /> موارد مفيدة
            </TabsTrigger>
          </TabsList>

          {/* ========== TAB 1: قوانين الشغل (مفصلة) ========== */}
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

            {/* الفصول الهامة في مجلة الشغل - Accordion */}
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
                        <p className="text-sm">كل عامل كمل عام كامل في خدمته، عندو الحق في عطل مدفوعة الأجر تتراوح بين 15 و 30 يوم (حسب القطاع). في سياق الـ Salaire de base ma yetsalet.</p>
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

                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-right font-bold text-base">
                      📄 الفصل 251: الفصل التعسفي
                    </AccordionTrigger>
                    <AccordionContent className="text-right space-y-2">
                      <p>الفصل غير المسبب بمقتضى الفصل 251 من مجلة الشغل هو الفصل الذي لا يكون مستندًا على سبب حقيقي وجدي.</p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl mt-2">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">📝 شرح بالدارجة:</p>
                        <p className="text-sm">إذا طردك المصحف غير سبب (ما عندو حتى سبب حقيقي يفسر فيه)، هذا ليسمي "الفصل التعسفي"، وهنا تتحصل على تعويضات إضافية.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </CardContent>
            </Card>

            {/* المراسيم والأوامر الهامة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" /> 📜 أهم المراسيم والأوامر المنظمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "الأمر عدد 124 لسنة 2021", desc: "تنظيم عقود العمل الدائمة والمحددة المدة للقطاع الخاص", date: "2021", pdf: "#" },
                    { title: "الأمر عدد 245 لسنة 2020 (SMIG)", desc: "تحديد الحد الأدنى للأجر المهني المضمون (SMIG = 450 دينار)", date: "2020", pdf: "#", highlight: true },
                    { title: "الأمر عدد 89 لسنة 2019", desc: "تنظيم ساعات العمل الإضافية وأجرها", date: "2019", pdf: "#" },
                    { title: "القانون عدد 36 لسنة 2018", desc: "مكافحة التمييز في التوظيف والخدمة", date: "2018", pdf: "#" },
                    { title: "الاتفاقية الجماعية للقطاعات المشتركة", desc: "ينظم علاقة الشغل في الصناعات الميكانيكية والكهربائية", date: "2015", pdf: "#" },
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border ${item.highlight ? 'border-amber-200 bg-amber-50/50 dark:bg-amber-950/20' : 'border-slate-100 dark:border-slate-800'}`}>
                      <div className="flex-1">
                        <p className="font-bold text-base">{item.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                        <p className="text-xs text-slate-400 mt-1">📅 التاريخ: {item.date}</p>
                      </div>
                      <div className="flex gap-2 mt-3 md:mt-0">
                        <a href={item.pdf} className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition">📥 تحميل PDF</a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* القطاعات الخاصة */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" /> 🏗️ قوانين خاصة ببعض القطاعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl hover:shadow-md transition">
                    <p className="font-bold text-lg">🏗️ قطاع البناء والأشغال العمومية</p>
                    <p className="text-sm text-slate-500 mt-1">تنظيم السلامة المهنية والأجر في المنشآت العمومية</p>
                    <Badge variant="outline" className="mt-2">الأمر عدد 30 لسنة 1989</Badge>
                  </div>
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl hover:shadow-md transition">
                    <p className="font-bold text-lg">🎓 قطاع التعليم العالي</p>
                    <p className="text-sm text-slate-500 mt-1">القانون الأساسي للأساتذة الباحثين</p>
                    <Badge variant="outline" className="mt-2">القانون عدد 28 لسنة 2008</Badge>
                  </div>
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl hover:shadow-md transition">
                    <p className="font-bold text-lg">🏥 قطاع الصحة</p>
                    <p className="text-sm text-slate-500 mt-1">التنظيم الداخلي للمؤسسات الصحية العمومية</p>
                    <Badge variant="outline" className="mt-2">الأمر عدد 346 لسنة 2011</Badge>
                  </div>
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl hover:shadow-md transition">
                    <p className="font-bold text-lg">🌾 قطاع الفلاحة</p>
                    <p className="text-sm text-slate-500 mt-1">تنظيم عقود العمل الموسمي والفلاحي</p>
                    <Badge variant="outline" className="mt-2">القانون عدد 25 لسنة 2000</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB 2: حقوق وواجبات (مفصلة) ========== */}
          <TabsContent value="rights" className="space-y-6">
            
            {/* حقوق العامل */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" /> ✅ حقوق العامل (ما يتحقلك)
                </CardTitle>
                <CardDescription>
                  بالدارجة: هاذي أهم الحقوق اللي تحققلك كي تخدم في تونس
                </CardDescription>
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

            {/* واجبات العامل */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" /> ⚠️ واجبات العامل (اللي لازم تلتزم بيه)
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

            {/* حقوق وواجبات المشغل */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" /> 🏢 حقوق وواجبات المشغل (صاحب العمل)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-green-50 dark:bg-green-950/10 rounded-xl">
                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> ✅ حقوق المشغل:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• توجيه العمال وتقييم أدائهم</li>
                      <li>• وضع عقوبات تأديبية وفق القانون</li>
                      <li>• تنظيم ساعات العمل والإجازات</li>
                      <li>• طلب التعويض عن الأضرار</li>
                      <li>• فصل العامل لأسباب حقيقية وجدية</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-orange-50 dark:bg-orange-950/10 rounded-xl">
                    <h4 className="font-bold text-orange-700 mb-3 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> ❌ واجبات المشغل:</h4>
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

          {/* ========== TAB 3: موارد مفيدة ========== */}
          <TabsContent value="resources" className="space-y-6">

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
                    { name: "الوكالة الوطنية للتشغيل والعمل المستقل (ANETI)", url: "https://aneti.tn", desc: "عروض الشغل، برامج التكوين، مراكز الإرشاد المهني", icon: <Users className="h-4 w-4" /> },
                    { name: "الصندوق الوطني للضمان الاجتماعي (CNSS)", url: "https://cnss.tn", desc: "التصريح بالأجور، خدمات المؤمن لهم والمعاشات", icon: <Shield className="h-4 w-4" /> },
                    { name: "مركز الدراسات القانونية والقضائية", url: "https://cejl.tn", desc: "الدراسات والأبحاث القانونية", icon: <BookOpen className="h-4 w-4" /> },
                    { name: "بوابة القانون التونسي", url: "https://legislation.tn", desc: "مجلة الشغل والمراسيم المنظمة", icon: <Scale className="h-4 w-4" /> },
                    { name: "الصندوق الوطني للتأمين على المرض", url: "https://cnam.tn", desc: "التأمين الصحي للمستخدمين", icon: <Heart className="h-4 w-4" /> },
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
                    <p className="text-2xl font-mono mt-1 text-center">8010 0101</p>
                    <p className="text-xs text-slate-500 mt-1">خط أخضر مجاني</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <p className="font-bold text-red-700">📞 التبليغ عن العمل غير القانوني</p>
                    <p className="text-2xl font-mono mt-1 text-center">80 100 111</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <p className="font-bold text-purple-700">🔧 الدعم الفني للمنصة</p>
                    <p className="text-2xl font-mono mt-1 text-center">22 000 000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* مراكز التكوين والإرشاد المهني */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-amber-600" /> 📚 مراكز التكوين والإرشاد المهني
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { city: "تونس", address: "شارع خير الدين باشا", phone: "71 123 456" },
                    { city: "سوسة", address: "شارع الحبيب بورقيبة", phone: "73 123 456" },
                    { city: "صفاقس", address: "شارع الحبيب ثامر", phone: "74 123 456" },
                    { city: "بنزرت", address: "شارع فرحات حشاد", phone: "72 123 456" },
                    { city: "قابس", address: "شارع 2 مارس", phone: "75 123 456" },
                    { city: "القيروان", address: "شارع ابن خلدون", phone: "77 123 456" },
                  ].map((center, i) => (
                    <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl text-center hover:shadow-md transition">
                      <MapPin className="h-5 w-5 mx-auto text-blue-500 mb-2" />
                      <p className="font-bold">{center.city}</p>
                      <p className="text-xs text-slate-500 mt-1">{center.address}</p>
                      <p className="text-xs text-blue-600 mt-1">{center.phone}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* تذكير مهم */}
            <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-10 w-10 text-amber-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">⚠️ تذكير مهم</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  المعلومات الواردة في هذه الصفحة هي للإرشاد فقط. للاطلاع على النصوص القانونية الأصلية، يرجى الرجوع إلى موقع التشريع التونسي أو استشارة مختص في القانون.
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <Badge className="bg-amber-100 text-amber-700">آخر تحديث: ماي 2026</Badge>
                  <Badge variant="outline">المصدر: القانون التونسي</Badge>
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