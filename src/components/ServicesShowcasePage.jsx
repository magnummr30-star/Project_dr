"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { MobileAppNavigation } from "@/components/MobileAppNavigation";
import { categoryNames, pathSteps, services } from "@/data/services";

const serviceImageElements = {
  1: ["تقديم الخرائط والمخططات", "مراجعة المتطلبات البيئية", "استيفاء شروط الدفاع المدني", "إعداد ملف فني متكامل"],
  2: ["دراسة الموقع والمساحة", "تصميم محطة الطاقة", "حساب العائد والتكلفة", "تجهيز مسار الترخيص"],
  3: ["تحديد مواصفات خط الإنتاج", "مطابقة الموردين الألمان", "خطة التركيب والتشغيل", "تدريب الفريق الفني"],
  4: ["تقييم فجوات الاستدامة", "إعداد ملف الاعتماد", "تطبيق معايير التصنيف", "خطة تحسين قابلة للقياس"],
  5: ["بلورة فكرة المشروع", "دراسة السوق والطلب", "نموذج تشغيل أولي", "خارطة طريق للتنفيذ"],
  6: ["فرز الفرص الاستثمارية", "تحليل العائد والمخاطر", "ربط الفرصة بالأثر البيئي", "عرض استثماري مختصر"],
  7: ["حصر المتطلبات الحكومية", "تجهيز الملفات والنماذج", "متابعة التصاريح خطوة بخطوة", "إغلاق الملاحظات حتى الاعتماد"],
  8: ["تحليل احتياج التدريب", "برنامج عملي للفنيين", "مواد تدريب وتشغيل", "تقييم جاهزية الفريق"],
  9: ["تجهيز ملف التمويل", "بناء العرض المالي", "مؤشرات العائد والسداد", "دعم التفاوض مع الجهات"],
  10: ["تقييم قابلية التسجيل", "جمع بيانات المشروع", "اختيار المنهجية المناسبة", "متابعة مسار الاعتماد"],
  11: ["قياس خط الأساس", "مبادرات خفض الانبعاثات", "تعويض الكربون عند الحاجة", "خارطة طريق زمنية"],
  12: ["جمع بيانات الانبعاثات", "حساب البصمة الكربونية", "تقرير تنفيذي واضح", "توصيات خفض عملية"],
  13: ["تشخيص فني وإداري", "تحليل تحديات التشغيل", "توصيات قابلة للتنفيذ", "متابعة التحسين"],
  14: ["تقييم وضع المصنع", "فرص خفض الهدر والطاقة", "تحسين كفاءة التشغيل", "خطة تحول مستدام"],
  15: ["دراسة الفكرة وتقييم الجدوى", "التصميم الهندسي والتخطيط", "التراخيص والموافقات", "التنفيذ والإشراف", "التشغيل والتسليم"],
  16: ["مبادئ البنية الخضراء", "كفاءة الطاقة والمواد", "حلول هندسية عملية", "قابلية التوسع والتشغيل"],
  17: ["تحليل السوق والتكلفة", "الدراسة الفنية للمشروع", "سيناريوهات العائد والمخاطر", "قرار استثماري أوضح"],
  18: ["بحث وفرز المواقع", "مطابقة الأرض مع المشروع", "تحليل البنية والطاقة", "خطة توسع مستقبلية"]
};

const consultationBenefits = [
  {
    title: "تشخيص الخدمة الأنسب",
    text: "نقرأ فكرة مشروعك ونحدد لك المسار الأقرب بدل البحث العشوائي بين الخدمات."
  },
  {
    title: "قائمة متطلبات أولية",
    text: "تعرف منذ البداية ما الذي تحتاجه من دراسات، تراخيص، ملفات، أو شركاء تنفيذ."
  },
  {
    title: "توجيه عملي سريع",
    text: "تحصل على خطوة تالية واضحة تساعدك على اتخاذ قرار بثقة قبل أي التزام."
  },
  {
    title: "فرصة أوضح للتمويل",
    text: "نوضح طريقة تجهيز مشروعك ليكون أكثر قابلية للعرض على الجهات والممولين."
  }
];

const consultationSteps = ["سجّل بياناتك", "نراجع احتياجك", "نتواصل معك بالتوجيه المناسب"];

const investorTypeOptions = [
  { value: "investor", label: "مستثمر", note: "أبحث عن فرصة أو مسار مشروع" },
  { value: "factory-owner", label: "مالك مصنع", note: "أريد تطوير أو اعتماد مصنع قائم" },
  { value: "developer", label: "مطور مشروع", note: "أجهز مشروعًا للتنفيذ" },
  { value: "company", label: "شركة قائمة", note: "أحتاج توسعًا أو امتثالًا" }
];

const projectStageOptions = [
  { value: "idea", label: "فكرة أولية", note: "أحتاج معرفة أين أبدأ" },
  { value: "study", label: "دراسة جدوى", note: "أريد أرقامًا وقرارًا أوضح" },
  { value: "licensing", label: "تراخيص ومعاملات", note: "أحتاج تجهيز الملفات والمتابعة" },
  { value: "operation", label: "تشغيل أو تطوير قائم", note: "أريد تحسين أو اعتماد أو توسع" }
];

const contactWindowOptions = [
  { value: "morning", label: "صباحًا" },
  { value: "afternoon", label: "بعد الظهر" },
  { value: "evening", label: "مساءً" }
];

const locationOptions = ["دبي", "أبوظبي", "الشارقة", "عجمان", "رأس الخيمة", "العين", "الفجيرة", "خارج الإمارات"];

const footerContactLinks = [
  {
    label: "واتساب",
    value: "0556260392",
    href: "https://wa.me/971556260392",
    icon: "fa-brands fa-whatsapp"
  },
  {
    label: "رقم الجوال",
    value: "0503646355",
    href: "tel:0503646355",
    icon: "fa-solid fa-mobile-screen-button"
  },
  {
    label: "هاتف المكتب",
    value: "065613114",
    href: "tel:065613114",
    icon: "fa-solid fa-phone-volume"
  },
  {
    label: "البريد الإلكتروني",
    value: "info@globalgreenconsults.com",
    href: "mailto:info@globalgreenconsults.com",
    icon: "fa-solid fa-envelope"
  }
];

const footerSocialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/globalgreenconsults/", icon: "fa-brands fa-instagram" },
  { label: "Facebook", href: "https://www.facebook.com/globalgreenconsults", icon: "fa-brands fa-facebook-f" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/globalgreenconsults", icon: "fa-brands fa-linkedin-in" },
  { label: "X", href: "https://x.com/globalgreenconsults", icon: "fa-brands fa-x-twitter" },
  { label: "YouTube", href: "https://www.youtube.com/@globalgreenconsults", icon: "fa-brands fa-youtube" },
  { label: "TikTok", href: "https://www.tiktok.com/@globalgreenconsults", icon: "fa-brands fa-tiktok" }
];

const consultationNeedOptions = [
  {
    value: "not-sure",
    label: "لست متأكدًا",
    note: "اترك لنا ترشيح الخدمة المناسبة",
    serviceIds: []
  },
  {
    value: "new-project",
    label: "تأسيس مشروع جديد",
    note: "من الفكرة إلى خطة التشغيل",
    serviceIds: [15, 5, 17, 13]
  },
  {
    value: "feasibility",
    label: "دراسة وجدوى",
    note: "أرقام أوضح قبل القرار",
    serviceIds: [17, 5, 6, 13]
  },
  {
    value: "licensing",
    label: "تراخيص ومعاملات",
    note: "ملفات واعتمادات ومتابعة",
    serviceIds: [7, 1, 18, 16]
  },
  {
    value: "finance",
    label: "تمويل وقروض",
    note: "تجهيز المشروع للعرض",
    serviceIds: [9, 17, 6, 7]
  },
  {
    value: "sustainability",
    label: "استدامة وتطوير",
    note: "تحسين الطاقة والتصنيفات",
    serviceIds: [14, 4, 2, 16]
  },
  {
    value: "carbon",
    label: "كربون وانبعاثات",
    note: "حياد وبصمة وأرصدة",
    serviceIds: [11, 12, 10, 14]
  },
  {
    value: "land-operation",
    label: "أرض أو تشغيل",
    note: "موقع، معدات، وفريق جاهز",
    serviceIds: [18, 3, 8, 13]
  }
];

const parallelHeroSlides = [
  {
    title: "فكرة مشروع",
    text: "تحويل الفكرة إلى تصور قابل للدراسة والتمويل والتنفيذ.",
    image: "/images/img/5.png",
    tag: "بداية"
  },
  {
    title: "دراسة موقع المشروع",
    text: "قراءة الموقع والتكلفة والاشتراطات قبل قرار الاستثمار.",
    image: "/images/img/16.png",
    tag: "هندسة"
  },
  {
    title: "دراسة الجدوى",
    text: "ترتيب السوق والتشغيل والملف المالي قبل بدء التنفيذ.",
    image: "/images/img/17.png",
    tag: "جدوى"
  },
  {
    title: "مشروع صناعي",
    text: "من اختيار النشاط إلى خطوط الإنتاج والتشغيل.",
    image: "/images/img/15.png",
    tag: "تنفيذ"
  },
  {
    title: "مشروع تجاري",
    text: "قراءة السوق وتقدير العائد ومراحل الانطلاق.",
    image: "/images/img/6.png",
    tag: "استثمار"
  },
  {
    title: "تمويل المشروع",
    text: "تجهيز الدراسة والعرض المالي واحتياج التمويل.",
    image: "/images/img/9.png",
    tag: "تمويل"
  },
  {
    title: "استشارة هندسية",
    text: "ربط التصميم بمتطلبات التشغيل والطاقة والتراخيص.",
    image: "/images/img/18.png",
    tag: "موقع"
  },
  {
    title: "استشارة صناعية",
    text: "توصيات عملية للمصنع أو المشروع القائم.",
    image: "/images/img/13.png",
    tag: "خبرة"
  },
  {
    title: "تحويل المصنع",
    text: "رفع الكفاءة وتقليل الهدر وتحسين الاستدامة.",
    image: "/images/img/14.png",
    tag: "تحول"
  },
  {
    title: "تأسيس متكامل",
    text: "دراسة، تصميم، تراخيص، تمويل، تنفيذ، وتسليم.",
    image: "/images/all.png",
    tag: "مسار كامل"
  }
];

const parallelAboutStats = [
  { value: "30+", label: "عاماً من الخبرة المحلية والدولية" },
  { value: "3", label: "محاور رئيسية صناعية وتجارية واستثمارية" },
  { value: "1", label: "جهة متابعة واحدة من الدراسة إلى التشغيل" }
];

const parallelAboutHighlights = [
  {
    title: "تحويل الفكرة إلى ملف استثماري",
    text: "نرتب الفكرة، السوق، التكلفة، ونقاط القوة حتى تصبح قابلة للعرض والقرار."
  },
  {
    title: "دراسات وتمويل وتراخيص",
    text: "نجهز الدراسات المالية والفنية ونساعد في مسار التمويل والمتطلبات الرسمية."
  },
  {
    title: "استشارات هندسية وصناعية",
    text: "نربط احتياج المشروع بالتصميم، المعدات، التشغيل، والطاقة بصورة عملية."
  },
  {
    title: "متابعة تنفيذ وتشغيل",
    text: "ننسق بين الأطراف ونحول الخطة إلى خطوات واضحة قابلة للمتابعة والتسليم."
  }
];

const parallelDashboardSteps = [
  { number: "01", title: "استقبال الفكرة", text: "نحدد نوع المشروع ومرحلته وما يحتاجه قبل أي التزام كبير." },
  { number: "02", title: "تكوين الملف", text: "نرتب دراسة الجدوى والملف المالي والمتطلبات الفنية." },
  { number: "03", title: "ربط الأطراف", text: "ننسق بين الاستشاريين والموردين وجهات الترخيص والتمويل." },
  { number: "04", title: "متابعة التنفيذ", text: "نحول الخطة إلى خطوات عملية قابلة للقياس والمتابعة." }
];

const parallelServiceNotes = [
  {
    icon: "fa-solid fa-chart-line",
    title: "دراسات جدوى استثمارية دقيقة",
    text: "قراءة السوق والتكلفة والعائد والمخاطر قبل قرار الاستثمار."
  },
  {
    icon: "fa-solid fa-building-columns",
    title: "دراسات مالية معتمدة",
    text: "تجهيز ملف التمويل والعرض المالي للجهات المناسبة."
  },
  {
    icon: "fa-solid fa-sitemap",
    title: "ترتيب التخصصات",
    text: "تحديد ما يحتاجه المشروع من هندسة وتشغيل وتراخيص وموردين."
  },
  {
    icon: "fa-solid fa-helmet-safety",
    title: "الاستشارات الهندسية",
    text: "تصور هندسي عملي يراعي الموقع والطاقة والتوسع المستقبلي."
  },
  {
    icon: "fa-solid fa-industry",
    title: "الاستشارات الصناعية",
    text: "حلول للمصانع والمشاريع القائمة والجديدة من التشخيص إلى التحسين."
  },
  {
    icon: "fa-solid fa-recycle",
    title: "تحويل المصنع",
    text: "تحسين الكفاءة وتقليل الهدر ورفع جاهزية الاستدامة."
  },
  {
    icon: "fa-solid fa-layer-group",
    title: "تأسيس المشاريع",
    text: "مسار يبدأ بالفكرة وينتهي بخطة تنفيذ وتشغيل واضحة."
  },
  {
    icon: "fa-solid fa-handshake-angle",
    title: "الاستشارات والجدوى",
    text: "توجيه متخصص يساعد العميل على اختيار الخطوة الأنسب."
  }
];

const consultationRequiredFields = [
  { name: "fullName", label: "الاسم الكامل" },
  { name: "mobilePhone", label: "رقم الجوال" },
  { name: "phone", label: "رقم الواتساب" },
  { name: "email", label: "البريد الإلكتروني" },
  { name: "location", label: "المدينة / الدولة" }
];

const consultationPhoneFields = [
  { name: "mobilePhone", label: "رقم الجوال" },
  { name: "phone", label: "رقم الواتساب" }
];

function normalizePhoneDigits(value) {
  return String(value ?? "")
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 1776));
}

function formatPhoneInputValue(value) {
  return normalizePhoneDigits(value)
    .replace(/[^\d+\s().-]/g, "")
    .replace(/(?!^)\+/g, "")
    .replace(/\s{2,}/g, " ");
}

function getPhoneValidationMessage(value, label) {
  const phoneValue = formatPhoneInputValue(value).trim();
  const digitCount = phoneValue.replace(/\D/g, "").length;

  if (!phoneValue) return `${label} غير مسجل. يرجى تعبئة هذا الحقل بوضوح.`;
  if (!/^\+?[\d\s().-]+$/.test(phoneValue) || digitCount < 7 || digitCount > 15) {
    return `${label} يجب أن يكون بصيغة رقم هاتف صحيحة بدون حروف.`;
  }

  return "";
}

function ScrollChoiceRail({ children, className, label, ...props }) {
  const railRef = useRef(null);
  const railLabel = label ?? props["aria-label"] ?? "الخيارات";

  function scrollRail(direction) {
    const rail = railRef.current;

    if (!rail) return;

    const distance = Math.max(180, Math.round(rail.clientWidth * 0.72));
    const isRtl = window.getComputedStyle(rail).direction === "rtl";
    const left = direction === "next" ? (isRtl ? -distance : distance) : isRtl ? distance : -distance;

    rail.scrollBy({ left, behavior: "smooth" });
  }

  return (
    <div className="scroll-choice-rail">
      <button
        aria-label={`عرض الخيارات السابقة في ${railLabel}`}
        className="scroll-choice-button scroll-choice-button--previous"
        onClick={() => scrollRail("previous")}
        type="button"
      >
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
      <div className={className} ref={railRef} {...props}>
        {children}
      </div>
      <button
        aria-label={`عرض الخيارات التالية في ${railLabel}`}
        className="scroll-choice-button scroll-choice-button--next"
        onClick={() => scrollRail("next")}
        type="button"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>
    </div>
  );
}

export function ServicesShowcasePage({ showParallelAdditions = false } = {}) {
  const [activeServiceNeed, setActiveServiceNeed] = useState("all");
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [serviceGridColumns, setServiceGridColumns] = useState("2");
  const [isServiceToolsFixed, setIsServiceToolsFixed] = useState(false);
  const [serviceToolsHeight, setServiceToolsHeight] = useState(0);
  const [consultationStatus, setConsultationStatus] = useState("idle");
  const [selectedConsultationNeed, setSelectedConsultationNeed] = useState("not-sure");
  const [selectedConsultationSlug, setSelectedConsultationSlug] = useState("recommend-service");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [consultationValidationErrors, setConsultationValidationErrors] = useState({});
  const [activeNavigationHref, setActiveNavigationHref] = useState("#top");
  const [showAllConsultationServices, setShowAllConsultationServices] = useState(false);
  const [isConsultationFooterFixed, setIsConsultationFooterFixed] = useState(false);
  const [consultationFooterWidth, setConsultationFooterWidth] = useState(0);
  const [consultationFooterHeight, setConsultationFooterHeight] = useState(0);
  const servicesSectionRef = useRef(null);
  const serviceToolsRef = useRef(null);
  const consultationSectionRef = useRef(null);
  const consultationFormRef = useRef(null);
  const consultationFooterRef = useRef(null);

  const serviceNeedFilters = useMemo(() => {
    const allServicesFilter = {
      value: "all",
      label: "كل الخدمات",
      note: "عرض كامل للخدمات المسجلة",
      serviceIds: services.map((service) => service.id)
    };

    return [
      allServicesFilter,
      ...consultationNeedOptions.filter((option) => option.serviceIds.length > 0)
    ];
  }, []);

  const visibleServices = useMemo(() => {
    const activeFilter = serviceNeedFilters.find((filter) => filter.value === activeServiceNeed);

    if (!activeFilter || activeFilter.value === "all") return services;

    return activeFilter.serviceIds
      .map((serviceId) => services.find((service) => service.id === serviceId))
      .filter(Boolean);
  }, [activeServiceNeed, serviceNeedFilters]);

  const searchedServices = useMemo(() => {
    const query = serviceSearchQuery.trim().toLowerCase();

    if (!showParallelAdditions || !query) return visibleServices;

    return visibleServices.filter((service) => {
      const imageElements = serviceImageElements[service.id] ?? [];
      const searchContent = [
        service.title,
        service.summary,
        service.description,
        service.tag,
        categoryNames[service.category],
        ...(service.highlights ?? []),
        ...imageElements
      ]
        .join(" ")
        .toLowerCase();

      return searchContent.includes(query);
    });
  }, [serviceSearchQuery, showParallelAdditions, visibleServices]);

  useEffect(() => {
    if (!showParallelAdditions) return undefined;

    let animationFrame = 0;

    const updateServiceToolsPosition = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const section = servicesSectionRef.current;
        const tools = serviceToolsRef.current;

        if (!section || !tools) return;

        const showcaseRoot = section.closest(".green-showcase") ?? document.documentElement;
        const navHeight =
          Number.parseFloat(window.getComputedStyle(showcaseRoot).getPropertyValue("--showcase-nav-height")) || 82;
        const topOffset = navHeight + 12;
        const sectionRect = section.getBoundingClientRect();
        const toolsHeight = tools.offsetHeight;
        const shouldFix = sectionRect.top <= topOffset && sectionRect.bottom > topOffset + toolsHeight + 48;

        setServiceToolsHeight(toolsHeight);
        setIsServiceToolsFixed(shouldFix);
      });
    };

    updateServiceToolsPosition();
    window.addEventListener("scroll", updateServiceToolsPosition, { passive: true });
    window.addEventListener("resize", updateServiceToolsPosition);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateServiceToolsPosition);
      window.removeEventListener("resize", updateServiceToolsPosition);
    };
  }, [searchedServices.length, serviceGridColumns, showParallelAdditions]);

  useEffect(() => {
    if (!showParallelAdditions || serviceGridColumns !== "3") return undefined;

    const tabletColumnsQuery = window.matchMedia("(min-width: 540px) and (max-width: 1099px)");
    const keepTabletColumnsCompact = () => {
      if (tabletColumnsQuery.matches) setServiceGridColumns("2");
    };

    keepTabletColumnsCompact();
    tabletColumnsQuery.addEventListener("change", keepTabletColumnsCompact);

    return () => {
      tabletColumnsQuery.removeEventListener("change", keepTabletColumnsCompact);
    };
  }, [serviceGridColumns, showParallelAdditions]);

  useEffect(() => {
    let animationFrame = 0;

    const updateConsultationFooterPosition = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const section = consultationSectionRef.current;
        const form = consultationFormRef.current;
        const footer = consultationFooterRef.current;

        if (!section || !form || !footer) return;

        const sectionRect = section.getBoundingClientRect();
        const formRect = form.getBoundingClientRect();
        const footerHeight = footer.offsetHeight;
        const shouldFix =
          sectionRect.top <= window.innerHeight * 0.58 &&
          sectionRect.bottom >= window.innerHeight - Math.min(footerHeight, 120);

        setConsultationFooterWidth(Math.round(formRect.width));
        setConsultationFooterHeight(footerHeight);
        setIsConsultationFooterFixed(shouldFix);
      });
    };

    updateConsultationFooterPosition();
    window.addEventListener("scroll", updateConsultationFooterPosition, { passive: true });
    window.addEventListener("resize", updateConsultationFooterPosition);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateConsultationFooterPosition);
      window.removeEventListener("resize", updateConsultationFooterPosition);
    };
  }, [consultationStatus, consultationValidationErrors]);

  const featuredServices = services.filter((service) => [1, 11, 15, 18].includes(service.id));
  const heroService = services.find((service) => service.id === 15);
  const selectedNeed = consultationNeedOptions.find((option) => option.value === selectedConsultationNeed);
  const pageMenuLinks = showParallelAdditions
    ? [
        { href: "#top", label: "الرئيسية", icon: "fa-solid fa-house" },
        { href: "#about-us", label: "من نحن", icon: "fa-solid fa-building" },
        { href: "#audiences", label: "مجالات العمل", icon: "fa-solid fa-images" },
        { href: "#consultation", label: "استشارة", navLabel: "استشارة متخصصة", icon: "fa-solid fa-clipboard-list" },
        { href: "#one-company", label: "شركة واحدة", icon: "fa-solid fa-sitemap" },
        { href: "#path", label: "المنهجية", icon: "fa-solid fa-route" },
        { href: "#services", label: "الخدمات", icon: "fa-solid fa-layer-group" },
        { href: "#requested-services", label: "محاور الخدمة", icon: "fa-solid fa-list-check" },
        { href: "#contact", label: "تواصل", icon: "fa-solid fa-headset" }
      ]
    : [
        { href: "#top", label: "الرئيسية", icon: "fa-solid fa-house" },
        { href: "#path", label: "المنهجية", icon: "fa-solid fa-route" },
        { href: "#services", label: "الخدمات", icon: "fa-solid fa-layer-group" },
        { href: "#consultation", label: "استشارة", navLabel: "استشارة متخصصة", icon: "fa-solid fa-clipboard-list" },
        { href: "#contact", label: "تواصل", icon: "fa-solid fa-headset" }
      ];
  const mobileMenuLinks = [
    ...pageMenuLinks,
    { href: "/clients/login", label: "دخول العملاء", icon: "fa-solid fa-user-lock" }
  ];
  const mobileBottomLinks = showParallelAdditions
    ? [
        { href: "#top", label: "الرئيسية", icon: "fa-solid fa-house" },
        { href: "#consultation", label: "استشارة", icon: "fa-solid fa-clipboard-check" },
        { href: "#services", label: "الخدمات", icon: "fa-solid fa-grid-2" },
        { href: "#contact", label: "تواصل", icon: "fa-solid fa-headset" }
      ]
    : [
        { href: "#top", label: "الرئيسية", icon: "fa-solid fa-house" },
        { href: "#path", label: "المنهجية", icon: "fa-solid fa-route" },
        { href: "#services", label: "الخدمات", icon: "fa-solid fa-grid-2" },
        { href: "#consultation", label: "استشارة", icon: "fa-solid fa-clipboard-check" },
        { href: "#contact", label: "تواصل", icon: "fa-solid fa-headset" }
      ];
  const sectionNavigationHrefs = pageMenuLinks.map((link) => link.href).filter((href) => href.startsWith("#"));
  const sectionNavigationKey = sectionNavigationHrefs.join("|");
  const duplicatedParallelSlides = [...parallelHeroSlides, ...parallelHeroSlides];
  const consultationServiceChoices = useMemo(() => {
    if (showAllConsultationServices) return services;

    return (selectedNeed?.serviceIds ?? [])
      .map((serviceId) => services.find((service) => service.id === serviceId))
      .filter(Boolean);
  }, [selectedNeed, showAllConsultationServices]);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveNavigation = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const sections = sectionNavigationHrefs
          .map((href) => ({ href, element: document.getElementById(href.slice(1)) }))
          .filter((section) => section.element);

        if (sections.length === 0) return;

        const showcaseRoot = document.querySelector(".green-showcase") ?? document.documentElement;
        const navHeight =
          Number.parseFloat(window.getComputedStyle(showcaseRoot).getPropertyValue("--showcase-nav-height")) || 82;
        const activationLine = navHeight + Math.min(220, window.innerHeight * 0.32);
        let nextActiveHref = sections[0].href;

        sections.forEach((section) => {
          if (section.element.getBoundingClientRect().top <= activationLine) {
            nextActiveHref = section.href;
          }
        });

        const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

        if (window.scrollY + window.innerHeight >= documentHeight - 6) {
          nextActiveHref = sections[sections.length - 1].href;
        }

        setActiveNavigationHref((currentHref) => (currentHref === nextActiveHref ? currentHref : nextActiveHref));
      });
    };

    updateActiveNavigation();
    window.addEventListener("scroll", updateActiveNavigation, { passive: true });
    window.addEventListener("resize", updateActiveNavigation);
    window.addEventListener("hashchange", updateActiveNavigation);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateActiveNavigation);
      window.removeEventListener("resize", updateActiveNavigation);
      window.removeEventListener("hashchange", updateActiveNavigation);
    };
  }, [sectionNavigationKey]);

  async function handleConsultationSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    consultationPhoneFields.forEach((field) => {
      payload[field.name] = formatPhoneInputValue(payload[field.name]).trim();
    });

    const nextValidationErrors = consultationRequiredFields.reduce((errors, field) => {
      if (!String(payload[field.name] ?? "").trim()) {
        errors[field.name] = `${field.label} غير مسجل. يرجى تعبئة هذا الحقل بوضوح.`;
      }

      return errors;
    }, {});
    const emailValue = String(payload.email ?? "").trim();

    consultationPhoneFields.forEach((field) => {
      const phoneValidationMessage = getPhoneValidationMessage(payload[field.name], field.label);

      if (phoneValidationMessage) nextValidationErrors[field.name] = phoneValidationMessage;
    });

    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextValidationErrors.email = "البريد الإلكتروني غير صحيح. يرجى كتابته بصيغة واضحة.";
    }

    if (Object.keys(nextValidationErrors).length > 0) {
      setConsultationValidationErrors(nextValidationErrors);
      setConsultationStatus("validation-error");

      const firstInvalidField = consultationRequiredFields.find((field) => nextValidationErrors[field.name]);
      const firstInvalidElement = firstInvalidField ? form.elements.namedItem(firstInvalidField.name) : null;

      if (firstInvalidElement instanceof HTMLElement) {
        firstInvalidElement.focus({ preventScroll: true });
        firstInvalidElement.closest(".consultation-field")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    setConsultationValidationErrors({});
    setConsultationStatus("sending");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.status === 409) {
        setConsultationStatus("duplicate");
        return;
      }

      if (response.status === 422) {
        setConsultationStatus("whatsapp-invalid");
        return;
      }

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setSelectedConsultationNeed("not-sure");
      setSelectedConsultationSlug("recommend-service");
      setSelectedEmail("");
      setSelectedLocation("");
      setShowAllConsultationServices(false);
      setConsultationStatus("success");
    } catch (error) {
      setConsultationStatus("error");
    }
  }

  function handleConsultationChoice(serviceSlug) {
    const service = services.find((item) => item.slug === serviceSlug);
    const matchingNeed = consultationNeedOptions.find((option) => option.serviceIds.includes(service?.id));

    if (matchingNeed) {
      setSelectedConsultationNeed(matchingNeed.value);
      setShowAllConsultationServices(false);
    }

    setSelectedConsultationSlug(serviceSlug);
    setConsultationStatus("idle");
  }

  function handleConsultationFormInput(event) {
    const fieldName = event.target?.name;

    if (!fieldName) return;

    setConsultationValidationErrors((currentErrors) => {
      if (!currentErrors[fieldName]) return currentErrors;

      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  }

  function handlePhoneFieldInput(event) {
    const nextValue = formatPhoneInputValue(event.currentTarget.value);

    if (event.currentTarget.value !== nextValue) {
      event.currentTarget.value = nextValue;
    }
  }

  function handleConsultationNeedChange(needValue) {
    const nextNeed = consultationNeedOptions.find((option) => option.value === needValue);
    const firstService = nextNeed?.serviceIds?.[0]
      ? services.find((service) => service.id === nextNeed.serviceIds[0])
      : null;

    setSelectedConsultationNeed(needValue);
    setShowAllConsultationServices(false);
    setSelectedConsultationSlug(firstService?.slug ?? "recommend-service");
  }

  function handleInstantAnchorNavigation(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const anchor = event.target.closest?.('a[href^="#"]');
    const href = anchor?.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.getElementById(href.slice(1));

    if (!target) return;

    event.preventDefault();

    const showcaseRoot = target.closest(".green-showcase") ?? document.documentElement;
    const navHeight =
      Number.parseFloat(window.getComputedStyle(showcaseRoot).getPropertyValue("--showcase-nav-height")) || 82;
    const topOffset = target.id === "top" ? 0 : Math.max(0, window.scrollY + target.getBoundingClientRect().top - navHeight - 12);
    const htmlScrollBehavior = document.documentElement.style.scrollBehavior;
    const bodyScrollBehavior = document.body.style.scrollBehavior;

    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
    document.documentElement.scrollTop = topOffset;
    document.body.scrollTop = topOffset;
    window.scrollTo({ left: 0, top: topOffset, behavior: "auto" });
    window.history.pushState(null, "", href);
    setActiveNavigationHref(href);
    window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = htmlScrollBehavior;
      document.body.style.scrollBehavior = bodyScrollBehavior;
    });
  }

  const parallelAboutSection = showParallelAdditions ? (
    <section className="parallel-section parallel-about" id="about-us" aria-labelledby="parallel-about-title">
      <div className="showcase-container parallel-about__grid">
        <div className="section-heading parallel-about__content">
          <span className="parallel-about__label">من نحن</span>
          <h2 id="parallel-about-title">مجموعة استشارية تساعد المستثمر على بناء مشروع واضح وقابل للتنفيذ.</h2>
          <p>
            نعمل مع المستثمرين وملاك المشاريع لتحويل الأفكار إلى ملفات استثمارية متكاملة تشمل
            دراسة الجدوى، التمويل، التراخيص، الاستشارات الهندسية والصناعية، وخطة التشغيل.
          </p>
          <p>
            دورنا هو تنسيق الصورة كاملة: قراءة الفرصة، تحديد المتطلبات، ترتيب المختصين،
            ومتابعة المسار حتى يصبح المشروع جاهزاً للقرار والتنفيذ.
          </p>

          <div className="parallel-about__stats" aria-label="أرقام مختصرة عن المجموعة">
            {parallelAboutStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="parallel-note-stack" aria-label="محاور عمل المجموعة">
          {parallelAboutHighlights.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  ) : null;

  return (
    <main
      className={`green-showcase${showParallelAdditions ? " parallel-showcase green-showcase--parallel" : ""}`}
      dir="rtl"
      onClick={handleInstantAnchorNavigation}
    >
      <header className="showcase-nav">
        <Link className="showcase-brand" href="/" aria-label="الشركة الدولية لخبراء التطوير الصناعي والاستشارات الخضراء">
          <img src="/images/logo.jpeg" alt="" />
          <span>
            <strong>خبراء التطوير الصناعي</strong>
            <small>والاستشارات الخضراء</small>
          </span>
        </Link>
        <nav className="showcase-links" aria-label="روابط الصفحة">
          {pageMenuLinks.map((link) => (
            <a
              aria-current={activeNavigationHref === link.href ? "location" : undefined}
              className={activeNavigationHref === link.href ? "is-active" : undefined}
              href={link.href}
              key={link.href}
            >
              {link.navLabel ?? link.label}
            </a>
          ))}
        </nav>
        <div className="showcase-nav-actions">
          {!showParallelAdditions ? (
            <Link className="showcase-client-login" href="/clients/login" aria-label="دخول العملاء" title="دخول العملاء">
              <i className="fa-solid fa-user-lock" aria-hidden="true" />
              <span>دخول العملاء</span>
            </Link>
          ) : null}
          <a className="showcase-nav-cta" href={showParallelAdditions ? "#consultation" : "tel:0556260392"}>
            <i className={showParallelAdditions ? "fa-solid fa-clipboard-check" : "fa-solid fa-phone"} aria-hidden="true" />
            <span>{showParallelAdditions ? "اطلب استشارة" : "اتصل الآن"}</span>
          </a>
        </div>
        <MobileAppNavigation
          title="خبراء التطوير الصناعي"
          subtitle={showParallelAdditions ? "استشارات وتمويل وتنفيذ المشاريع" : "تنقل سريع كواجهة تطبيق"}
          activeHref={activeNavigationHref}
          links={mobileMenuLinks}
          onNavigate={handleInstantAnchorNavigation}
        />
      </header>

      <nav className="mobile-app-bottom-nav" dir="rtl" aria-label="تنقل سريع">
        {mobileBottomLinks.map((link) => (
          <a
            aria-current={activeNavigationHref === link.href ? "location" : undefined}
            className={activeNavigationHref === link.href ? "is-active" : undefined}
            href={link.href}
            key={`${link.href}-${link.label}`}
          >
            <i className={link.icon} aria-hidden="true" />
            <span>{link.label}</span>
          </a>
        ))}
      </nav>

      <section className="showcase-hero" id="top" aria-labelledby="hero-title">
        <div className="showcase-hero__bg" aria-hidden="true" />
        <div className="showcase-container showcase-hero__inner">
          <div className="showcase-hero__content">
            <span className="showcase-kicker">من الفكرة إلى المصنع المستدام</span>
            <h1 id="hero-title">شريكك لتأسيس وتطوير المشاريع الصناعية والمستدامة.</h1>
            <p>
              نرتب لك مسار المشروع من الفكرة والدراسة والتراخيص إلى التمويل والتشغيل، مع حلول استشارية تجمع بين
              الخبرة الصناعية والاستدامة العملية.
            </p>
            <div className="showcase-actions">
              <a className="showcase-button showcase-button--primary" href={showParallelAdditions ? "#consultation" : "#services"}>
                {showParallelAdditions ? "اطلب استشارة" : "استعرض الخدمات"}
                <span aria-hidden="true">↓</span>
              </a>
              <a className="showcase-button showcase-button--ghost" href="mailto:info@globalgreenconsults.com">
                ابدأ مشروعك
              </a>
              <a className="showcase-button showcase-button--ghost" href="#consultation">
                اطلب استشارة
              </a>
            </div>
          </div>

          <div className="hero-board" aria-label="نماذج من صفحات الخدمات">
            {heroService ? (
              <article className="hero-board__main hero-board__card">
                <Link className="hero-board__image" href={`/services/${heroService.slug}`}>
                  <img src={heroService.image} alt={heroService.title} />
                </Link>
                <div className="hero-board__content">
                  <span>{heroService.tag}</span>
                  <a className="hero-board__consult" href="#consultation" onClick={() => handleConsultationChoice(heroService.slug)}>
                    اطلب استشارة
                    <span aria-hidden="true">←</span>
                  </a>
                </div>
              </article>
            ) : null}
            <div className="hero-board__side">
              {featuredServices.slice(1).map((service) => (
                <article className="hero-board__side-card" key={service.id}>
                  <Link className="hero-board__image" href={`/services/${service.slug}`}>
                    <img src={service.image} alt={service.title} />
                  </Link>
                  <span className="hero-board__tag">{service.tag}</span>
                  <a className="hero-board__consult hero-board__consult--small" href="#consultation" onClick={() => handleConsultationChoice(service.slug)}>
                    استشارة
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {parallelAboutSection}

      <section className="showcase-proof" aria-label="ملخص الخدمات">
        <div className="showcase-container showcase-proof__grid">
          <div>
            <strong>18</strong>
            <span>{showParallelAdditions ? "خدمة متخصصة" : "صفحة خدمة مستقلة"}</span>
          </div>
          <div>
            <strong>7</strong>
            <span>{showParallelAdditions ? "مجالات احتياج" : "تصنيفات حسب الاحتياج"}</span>
          </div>
          <div>
            <strong>360°</strong>
            <span>من الجدوى إلى التشغيل</span>
          </div>
          <div>
            <strong>UAE + DE</strong>
            <span>ربط محلي وخبرة ألمانية</span>
          </div>
        </div>
      </section>

      {showParallelAdditions ? (
        <>
          <section className="parallel-section parallel-command parallel-audiences" id="audiences" aria-labelledby="parallel-audiences-title">
            <div className="showcase-container parallel-command__grid">
              <div className="parallel-command__copy">
                <span className="showcase-kicker">استعراض خدمات الشركة</span>
                <h2 id="parallel-audiences-title">خدمات أعمال واستثمار تقود مشروعك من القرار إلى التنفيذ.</h2>
                <p>
                  نرتب خدمات الشركة حسب احتياج المستثمر ومالك المشروع: دراسة جدوى، تمويل، تراخيص،
                  استشارات هندسية وصناعية، توريد وتشغيل. كل خدمة تساعدك على اتخاذ قرار عملي
                  وتحويل الفكرة إلى ملف مشروع قابل للتنفيذ.
                </p>
                <div className="parallel-showcase-metrics" aria-label="ملخص استعراض خدمات الشركة">
                  <article>
                    <i className="fa-solid fa-layer-group" aria-hidden="true" />
                    <strong>18</strong>
                    <span>خدمة متخصصة</span>
                  </article>
                  <article>
                    <i className="fa-solid fa-route" aria-hidden="true" />
                    <strong>7</strong>
                    <span>مسارات احتياج</span>
                  </article>
                  <article>
                    <i className="fa-solid fa-compass-drafting" aria-hidden="true" />
                    <strong>360°</strong>
                    <span>من التشخيص للتشغيل</span>
                  </article>
                </div>
                <div className="parallel-showcase-actions">
                  <a href="#consultation">ابدأ بتحديد المسار</a>
                  <a href="#services">عرض كل الخدمات</a>
                </div>
              </div>

              <div className="parallel-slider" aria-label="مجالات المشاريع والخدمات">
                <div className="parallel-slider__head">
                  <span>عرض مباشر</span>
                  <strong>نماذج من خدمات الشركة</strong>
                </div>
                <div className="parallel-slide-viewport">
                  <div className="parallel-slide-track">
                    {duplicatedParallelSlides.map((slide, index) => (
                      <article
                        className="parallel-slide-card"
                        key={`${slide.title}-${index}`}
                        aria-hidden={index >= parallelHeroSlides.length}
                      >
                        <img src={slide.image} alt="" />
                        <div>
                          <span>{slide.tag}</span>
                          <h2>{slide.title}</h2>
                          <p>{slide.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="parallel-section parallel-command" id="one-company" aria-labelledby="parallel-one-company-title">
            <div className="showcase-container parallel-command__grid">
              <div className="parallel-command__copy">
                <span className="showcase-kicker">شركة واحدة تدير المسار</span>
                <h2 id="parallel-one-company-title">بدل تعدد الموردين، يكون التعامل من خلال مسار منظم واحد.</h2>
                <p>
                  نربط بين الاستشاري، الجهة المالية، المورد، الجهة الحكومية، وفريق التنفيذ ضمن خطة متابعة
                  واضحة تقلل التشتت وتدعم اتخاذ القرار.
                </p>
              </div>

              <div className="parallel-command__steps">
                {parallelDashboardSteps.map((step) => (
                  <article key={step.number}>
                    <span>{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <section className="showcase-path" id="path" aria-labelledby="path-title">
        <div className="showcase-container">
          <div className="path-intro">
            <div className="section-heading">
              <span>منهجية العمل</span>
              <h2 id="path-title">نحوّل الفكرة إلى ملف استثماري جاهز للحركة.</h2>
              <p>
                نأخذ مشروعك خطوة بخطوة: نفهم الفكرة، نحدد المتطلبات، نبني الملف الفني والمالي، ثم نرسم مسار التنفيذ
                مع الجهات والموردين والشركاء المناسبين.
              </p>
            </div>
            <div className="path-insight" aria-label="ملخص المنهجية">
              <span>من أول جلسة</span>
              <strong>تخرج بصورة أوضح عن المتطلبات، المخاطر، والقرار التالي.</strong>
              <small>تشخيص عملي، وليس كلامًا عامًا.</small>
            </div>
          </div>
          <div className="path-grid">
            {pathSteps.map((step) => (
              <article className="path-step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-gallery" id="services" aria-labelledby="services-title" ref={showParallelAdditions ? servicesSectionRef : undefined}>
        <div className="showcase-container">
          <div className="section-heading section-heading--split">
            <div>
              <span>خدماتنا المتخصصة</span>
              <h2 id="services-title">حلول متخصصة تدعم قرارك الاستثماري من البداية.</h2>
            </div>
            <p>اختر مجال الاحتياج الأقرب لمشروعك، وستظهر لك الخدمات المناسبة لهذا المسار بشكل مباشر.</p>
          </div>

          <ScrollChoiceRail className="service-filters service-filters--needs" role="tablist" aria-label="تصنيف الخدمات حسب الاحتياج">
            {serviceNeedFilters.map((filter) => (
              <button
                aria-selected={activeServiceNeed === filter.value}
                className={activeServiceNeed === filter.value ? "is-active" : ""}
                key={filter.value}
                onClick={() => setActiveServiceNeed(filter.value)}
                role="tab"
                type="button"
              >
                <span>{filter.label}</span>
                <small>{filter.note}</small>
                <strong>{filter.serviceIds.length}</strong>
              </button>
            ))}
          </ScrollChoiceRail>

          {showParallelAdditions ? (
            <div
              className={`service-gallery-tools-shell${isServiceToolsFixed ? " is-fixed" : ""}`}
              style={{ "--service-tools-height": `${serviceToolsHeight}px` }}
            >
              <div className="service-gallery-tools" ref={serviceToolsRef}>
                <label className="service-search">
                  <span>بحث الخدمات</span>
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                  <input
                    onChange={(event) => setServiceSearchQuery(event.target.value)}
                    placeholder="ابحث باسم الخدمة أو وصفها"
                    type="search"
                    value={serviceSearchQuery}
                  />
                  {serviceSearchQuery ? (
                    <button
                      aria-label="مسح البحث"
                      className="service-search__clear"
                      onClick={() => setServiceSearchQuery("")}
                      type="button"
                    >
                      <i className="fa-solid fa-xmark" aria-hidden="true" />
                    </button>
                  ) : null}
                </label>

                <div className="service-layout-toggle" aria-label="طريقة عرض الخدمات">
                  {[
                    { value: "1", label: "عرض عمود واحد", icon: "fa-solid fa-table-list" },
                    { value: "2", label: "عرض عمودين", icon: "fa-solid fa-table-cells-large" },
                    { value: "3", label: "عرض ثلاثة أعمدة", icon: "fa-solid fa-grip" }
                  ].map((option) => (
                    <button
                      aria-label={option.label}
                      aria-pressed={serviceGridColumns === option.value}
                      className={serviceGridColumns === option.value ? "is-active" : ""}
                      key={option.value}
                      onClick={() => setServiceGridColumns(option.value)}
                      title={option.label}
                      type="button"
                    >
                      <i className={option.icon} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className={`service-grid${showParallelAdditions ? ` service-grid--columns-${serviceGridColumns}` : ""}`}>
            {searchedServices.map((service) => {
              const imageElements =
                showParallelAdditions && service.id === 7
                  ? ["حصر المتطلبات الحكومية", "تجهيز الملفات والنماذج", "متابعة التصاريح خطوة بخطوة", "استكمال المتطلبات حتى الاعتماد"]
                  : serviceImageElements[service.id] ?? service.highlights;

              return (
              <article className="service-tile service-product-card" data-service-id={service.id} key={service.id}>
                <Link className="service-product-card__image" href={`/services/${service.slug}`}>
                  <picture>
                    <img src={service.image} alt={service.title} loading="lazy" />
                  </picture>
                  <span>{String(service.id).padStart(2, "0")}</span>
                </Link>
                <div className="service-product-card__body">
                  <div className="service-product-card__meta">
                    <span>{service.tag}</span>
                    <span>{categoryNames[service.category]}</span>
                  </div>
                  <h3>
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </h3>
                  <p className="service-product-card__summary">{service.summary}</p>
                  <div className="service-product-card__details">
                    <span>العناصر الرئيسية</span>
                    <ul className="service-product-card__elements-list">
                      {imageElements.map((element, index) => (
                        <li key={element}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{element}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="service-product-card__result">
                    <span>النتيجة</span>
                    <strong>تحديد المتطلبات والمسار العملي المناسب لمرحلة مشروعك.</strong>
                  </div>
                  <div className="service-product-card__actions">
                    <Link className="service-product-card__cta" href={`/services/${service.slug}`}>
                      تفاصيل الخدمة
                      <span aria-hidden="true">←</span>
                    </Link>
                    <a className="service-product-card__consult" href="#consultation" onClick={() => handleConsultationChoice(service.slug)}>
                      <span className="service-product-card__consult-text" data-text="اطلب استشارة">اطلب استشارة</span>
                    </a>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
          {showParallelAdditions && searchedServices.length === 0 ? (
            <p className="service-search-empty">لا توجد خدمات مطابقة للبحث الحالي.</p>
          ) : null}
        </div>
      </section>

      {showParallelAdditions ? (
        <>
          <section className="parallel-section parallel-services" id="requested-services" aria-labelledby="parallel-services-title">
            <div className="showcase-container">
              <div className="parallel-section__head section-heading">
                <span>محاور الخدمة</span>
                <h2 id="parallel-services-title">من الجدوى والتمويل إلى التأسيس والتحويل الصناعي.</h2>
                <p>
                  نوفر محاور عمل مترابطة تساعد المستثمر ومالك المشروع على الانتقال من الفكرة إلى ملف جاهز
                  للتنفيذ والمتابعة.
                </p>
              </div>

              <div className="parallel-service-grid">
                {parallelServiceNotes.map((service) => (
                  <article className="parallel-service-card" key={service.title}>
                    <i className={service.icon} aria-hidden="true" />
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

        </>
      ) : null}

      <section className="consultation-section" id="consultation" aria-labelledby="consultation-title" ref={consultationSectionRef}>
        <div className="showcase-container consultation-shell">
          <div className="consultation-intro">
            <span className="showcase-kicker">استشارة متخصصة لمشروعك</span>
            <h2 id="consultation-title">اطلب استشارة متخصصة</h2>
            <p>
              نصيحة: قبل أن تبدأ في الترخيص أو التمويل أو اختيار الخدمة، اترك لنا بياناتك لنحدد لك المسار الأنسب والخطوة التالية بوضوح.
            </p>
          </div>

          <div className="consultation-registration-layout">
            <aside className="consultation-side-benefits consultation-side-benefits--right" aria-label="فوائد الاستشارة المتخصصة">
              {consultationBenefits.slice(0, 2).map((benefit, index) => (
                <article key={benefit.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </aside>

          <form
            aria-busy={consultationStatus === "sending"}
            className={`consultation-form${consultationStatus === "sending" ? " consultation-form--saving" : ""}`}
            id="consultation-form"
            noValidate
            onInput={handleConsultationFormInput}
            onSubmit={handleConsultationSubmit}
            ref={consultationFormRef}
          >
            <div className="consultation-form__header">
              <span>استشارة متخصصة</span>
              <h3>دعنا نحدد لك المسار الأنسب</h3>
              <p>اختر ما يناسب مشروعك خلال لحظات، وسيتواصل معك فريقنا بخطوة واضحة تساعدك على البدء بثقة.</p>
            </div>

            <div className="consultation-form__promise" aria-label="مزايا الاستشارة المتخصصة">
              <span>تقييم أولي</span>
              <span>رد سريع</span>
              <span>توجيه مناسب للمرحلة</span>
              <span>خطوة تالية واضحة</span>
            </div>

            <div className="consultation-steps" aria-label="طريقة التسجيل">
              {consultationSteps.map((step, index) => (
                <span key={step}>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  {step}
                </span>
              ))}
            </div>

            <div className="consultation-form__grid">
              <label className={`consultation-field consultation-field--wide-half${consultationValidationErrors.fullName ? " is-invalid" : ""}`}>
                الاسم الكامل
                <input
                  aria-describedby={consultationValidationErrors.fullName ? "consultation-fullName-error" : undefined}
                  aria-invalid={Boolean(consultationValidationErrors.fullName)}
                  name="fullName"
                  type="text"
                  placeholder="اكتب اسمك لنتواصل معك"
                  required
                />
                {consultationValidationErrors.fullName ? (
                  <small className="consultation-field__error" id="consultation-fullName-error">
                    {consultationValidationErrors.fullName}
                  </small>
                ) : null}
              </label>
              <label className={`consultation-field consultation-field--wide-half${consultationValidationErrors.mobilePhone ? " is-invalid" : ""}`}>
                رقم الجوال
                <input
                  aria-describedby={consultationValidationErrors.mobilePhone ? "consultation-mobilePhone-error" : undefined}
                  aria-invalid={Boolean(consultationValidationErrors.mobilePhone)}
                  inputMode="tel"
                  name="mobilePhone"
                  onInput={handlePhoneFieldInput}
                  pattern="[0-9+\\s().-]*"
                  type="tel"
                  placeholder="رقم الجوال"
                  required
                />
                {consultationValidationErrors.mobilePhone ? (
                  <small className="consultation-field__error" id="consultation-mobilePhone-error">
                    {consultationValidationErrors.mobilePhone}
                  </small>
                ) : null}
              </label>
              <label className={`consultation-field consultation-field--wide-half${consultationValidationErrors.phone ? " is-invalid" : ""}`}>
                رقم الواتساب
                <input
                  aria-describedby={consultationValidationErrors.phone ? "consultation-phone-error consultation-phone-hint" : "consultation-phone-hint"}
                  aria-invalid={Boolean(consultationValidationErrors.phone)}
                  inputMode="tel"
                  name="phone"
                  onInput={handlePhoneFieldInput}
                  pattern="[0-9+\\s().-]*"
                  type="tel"
                  placeholder="رقم الواتساب"
                  required
                />
                {consultationValidationErrors.phone ? (
                  <small className="consultation-field__error" id="consultation-phone-error">
                    {consultationValidationErrors.phone}
                  </small>
                ) : null}
                <small className="consultation-field__hint" id="consultation-phone-hint">يجب أن يكون هذا الرقم مسجلاً في واتساب.</small>
              </label>
              <div className={`consultation-field consultation-field--wide-half consultation-field--email${consultationValidationErrors.email ? " is-invalid" : ""}`}>
                <label className="consultation-field__label" htmlFor="consultation-email">البريد الإلكتروني</label>
                <input
                  aria-describedby={consultationValidationErrors.email ? "consultation-email-error" : undefined}
                  aria-invalid={Boolean(consultationValidationErrors.email)}
                  id="consultation-email"
                  name="email"
                  onChange={(event) => setSelectedEmail(event.target.value)}
                  placeholder="name@example.com"
                  type="email"
                  value={selectedEmail}
                />
                {consultationValidationErrors.email ? (
                  <small className="consultation-field__error" id="consultation-email-error">
                    {consultationValidationErrors.email}
                  </small>
                ) : null}
              </div>
              <div className={`consultation-field consultation-field--wide-half consultation-field--location${consultationValidationErrors.location ? " is-invalid" : ""}`}>
                <label className="consultation-field__label" htmlFor="consultation-location">المدينة / الدولة</label>
                <input
                  aria-describedby={consultationValidationErrors.location ? "consultation-location-error" : undefined}
                  aria-invalid={Boolean(consultationValidationErrors.location)}
                  id="consultation-location"
                  name="location"
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  placeholder="مثال: دبي، الإمارات"
                  type="text"
                  value={selectedLocation}
                />
                {consultationValidationErrors.location ? (
                  <small className="consultation-field__error" id="consultation-location-error">
                    {consultationValidationErrors.location}
                  </small>
                ) : null}
                <ScrollChoiceRail className="consultation-location-suggestions" aria-label="اقتراحات المدينة">
                  {locationOptions.map((location) => (
                    <button
                      className={selectedLocation === location ? "is-active" : ""}
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        setConsultationValidationErrors((currentErrors) => {
                          if (!currentErrors.location) return currentErrors;

                          const nextErrors = { ...currentErrors };
                          delete nextErrors.location;
                          return nextErrors;
                        });
                      }}
                      type="button"
                    >
                      {location}
                    </button>
                  ))}
                </ScrollChoiceRail>
              </div>

              <fieldset className="consultation-choice-group consultation-form__wide">
                <legend>صفة مقدم الطلب</legend>
                <div className="consultation-choice-grid consultation-choice-grid--four">
                  {investorTypeOptions.map((option) => (
                    <label className="consultation-choice-card" key={option.value}>
                      <input name="investorType" type="radio" value={option.value} defaultChecked={option.value === "investor"} />
                      <span>{option.label}</span>
                      <small>{option.note}</small>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="consultation-choice-group consultation-form__wide consultation-need-picker">
                <legend>ما الذي تحتاجه الآن؟</legend>
                <ScrollChoiceRail className="consultation-choice-grid consultation-choice-grid--needs" aria-label="اختيارات الاحتياج">
                  {consultationNeedOptions.map((option) => (
                    <label className="consultation-choice-card consultation-choice-card--need" key={option.value}>
                      <input
                        checked={selectedConsultationNeed === option.value}
                        name="consultationNeed"
                        onChange={() => handleConsultationNeedChange(option.value)}
                        type="radio"
                        value={option.value}
                      />
                      <span>{option.label}</span>
                      <small>{option.note}</small>
                    </label>
                  ))}
                </ScrollChoiceRail>
              </fieldset>

              <fieldset className="consultation-choice-group consultation-form__wide consultation-service-picker">
                <legend>{showAllConsultationServices ? "كل الخدمات المتاحة" : "الخدمات المقترحة لك"}</legend>
                <div className="consultation-choice-group__tools">
                  <p>
                    {showAllConsultationServices
                      ? "يمكنك اختيار أي خدمة من القائمة الكاملة."
                      : selectedConsultationNeed === "not-sure"
                        ? "اترك الاختيار لنا، أو اعرض كل الخدمات إذا كنت تريد تحديد خدمة بنفسك."
                        : `اقتراحات سريعة بناءً على اختيارك: ${selectedNeed?.label}.`}
                  </p>
                  <button
                    onClick={() => {
                      setShowAllConsultationServices((currentValue) => !currentValue);
                      setSelectedConsultationSlug("recommend-service");
                    }}
                    type="button"
                  >
                    {showAllConsultationServices ? "الرجوع للاقتراحات" : `عرض كل الخدمات (${services.length})`}
                  </button>
                </div>
                <ScrollChoiceRail className="consultation-choice-grid consultation-choice-grid--services" aria-label="اختيارات الخدمات">
                  <label className="consultation-choice-card consultation-choice-card--service consultation-choice-card--recommend">
                    <input
                      checked={selectedConsultationSlug === "recommend-service"}
                      name="serviceSlug"
                      onChange={(event) => setSelectedConsultationSlug(event.target.value)}
                      type="radio"
                      value="recommend-service"
                    />
                    <span>لست متأكدًا، رشّحوا لي الخدمة المناسبة</span>
                    <small>نراجع احتياجك ونوجهك للخدمة الأقرب.</small>
                  </label>
                  {consultationServiceChoices.map((service) => (
                    <label className="consultation-choice-card consultation-choice-card--service" key={service.slug}>
                      <input
                        checked={selectedConsultationSlug === service.slug}
                        name="serviceSlug"
                        onChange={(event) => setSelectedConsultationSlug(event.target.value)}
                        type="radio"
                        value={service.slug}
                      />
                      <span>{service.title}</span>
                      <small>{service.tag}</small>
                    </label>
                  ))}
                </ScrollChoiceRail>
              </fieldset>

              <fieldset className="consultation-choice-group consultation-form__wide">
                <legend>مرحلة المشروع</legend>
                <div className="consultation-choice-grid consultation-choice-grid--four">
                  {projectStageOptions.map((option) => (
                    <label className="consultation-choice-card" key={option.value}>
                      <input name="projectStage" type="radio" value={option.value} defaultChecked={option.value === "idea"} />
                      <span>{option.label}</span>
                      <small>{option.note}</small>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="consultation-choice-group consultation-choice-group--inline consultation-form__wide">
                <legend>الوقت المناسب للتواصل</legend>
                <div className="consultation-choice-grid consultation-choice-grid--three">
                  {contactWindowOptions.map((option) => (
                    <label className="consultation-choice-card consultation-choice-card--time" key={option.value}>
                      <input name="contactWindow" type="radio" value={option.value} defaultChecked={option.value === "morning"} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="consultation-field consultation-form__wide">
                ملاحظة اختيارية
                <textarea name="message" placeholder="إذا لديك معلومة مهمة، اكتبها هنا. يمكنك تركها فارغة وسنتواصل معك لتوضيح التفاصيل." rows="3" />
              </label>
            </div>

            <div
              className={`consultation-form__footer-shell${isConsultationFooterFixed ? " is-fixed" : ""}`}
              style={{
                "--consultation-footer-height": `${consultationFooterHeight}px`,
                "--consultation-footer-width": `${consultationFooterWidth}px`
              }}
            >
              <div className="consultation-form__footer" ref={consultationFooterRef}>
                <button className="showcase-button showcase-button--primary" type="submit" disabled={consultationStatus === "sending"}>
                  {consultationStatus === "sending" ? "جاري إرسال الطلب..." : "أرسل الطلب واحصل على توجيه متخصص"}
                </button>
                {consultationStatus === "success" ? <p className="consultation-alert is-success">تم تسجيل طلب الاستشارة بنجاح.</p> : null}
                {consultationStatus === "duplicate" ? <p className="consultation-alert is-warning">تم تسجيل البيانات من قبل.</p> : null}
                {consultationStatus === "whatsapp-invalid" ? <p className="consultation-alert is-error">رقم الواتساب غير مسجل في واتساب.</p> : null}
                {consultationStatus === "error" ? <p className="consultation-alert is-error">تعذر تسجيل الطلب، حاول مرة أخرى.</p> : null}
              </div>
            </div>

            {consultationStatus === "sending" ? (
              <div className="consultation-saving-screen" role="status" aria-live="polite">
                <span className="consultation-saving-screen__spinner" aria-hidden="true" />
                <strong>جاري حفظ بيانات الاستشارة</strong>
                <p>يرجى الانتظار لحظات، نقوم بتسجيل الطلب بأمان.</p>
              </div>
            ) : null}
          </form>

            <aside className="consultation-side-benefits consultation-side-benefits--left" aria-label="فوائد الاستشارة المتخصصة">
              {consultationBenefits.slice(2).map((benefit, index) => (
                <article key={benefit.title}>
                  <span>{String(index + 3).padStart(2, "0")}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="showcase-contact" id="contact" aria-labelledby="contact-title">
        <div className="showcase-container showcase-contact__inner">
          <div className="showcase-contact__content">
            <span>روابط التواصل</span>
            <h2 id="contact-title">تواصل معنا بالطريقة الأنسب، وسنساعدك في تحديد الخطوة التالية لمشروعك.</h2>
            <p>
              أرقام مباشرة، واتساب، بريد إلكتروني، وروابط التواصل الاجتماعي في مكان واحد لسهولة المتابعة.
            </p>

            <div className="contact-link-grid" aria-label="أرقام ووسائل التواصل">
              {footerContactLinks.map((item) => (
                <a className="contact-link-card" href={item.href} key={item.label}>
                  <i className={item.icon} aria-hidden="true" />
                  <span>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                </a>
              ))}
            </div>

            <div className="contact-social-block" aria-label="روابط التواصل الاجتماعي">
              <strong>تابعنا على منصات التواصل</strong>
              <div className="contact-social-links">
                {footerSocialLinks.map((item) => (
                  <a href={item.href} key={item.label} target="_blank" rel="noreferrer" aria-label={item.label} title={item.label}>
                    <i className={item.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-map-card">
            <div className="contact-map-card__head">
              <span>
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                موقعنا على الخريطة
              </span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Global%20Experts%20for%20Industrial%20Development%20%26%20Green%20Consultations%20UAE"
                target="_blank"
                rel="noreferrer"
              >
                فتح الخريطة
              </a>
            </div>
            <iframe
              title="موقع خبراء التطوير الصناعي والاستشارات الخضراء على الخريطة"
              src="https://www.google.com/maps?q=Global%20Experts%20for%20Industrial%20Development%20%26%20Green%20Consultations%20UAE&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {consultationStatus === "success" ? (
        <div className="consultation-success-modal" role="dialog" aria-modal="true" aria-labelledby="consultation-success-title">
          <div className="consultation-success-modal__panel">
            <span className="consultation-success-modal__icon" aria-hidden="true">
              <i className="fa-solid fa-check" />
            </span>
            <h3 id="consultation-success-title">تم اعتماد الاستشارة</h3>
            <p>تم حفظ بياناتك بنجاح، وسيتم التواصل معك خلال 24 ساعة.</p>
            <button type="button" onClick={() => setConsultationStatus("idle")}>
              <i className="fa-solid fa-check" aria-hidden="true" />
              تم
            </button>
          </div>
        </div>
      ) : null}

      {consultationStatus === "duplicate" ? (
        <div className="consultation-success-modal consultation-success-modal--warning" role="dialog" aria-modal="true" aria-labelledby="consultation-duplicate-title">
          <div className="consultation-success-modal__panel">
            <span className="consultation-success-modal__icon" aria-hidden="true">
              <i className="fa-solid fa-circle-info" />
            </span>
            <h3 id="consultation-duplicate-title">تم تسجيل البيانات من قبل</h3>
            <p>رقم الهاتف أو البريد الإلكتروني مستخدم في طلب سابق. يمكنكم تسجيل الدخول من شاشة دخول العميل، وفي حالة نسيان الرقم السري يمكن استرجاعه من نفس الشاشة.</p>
            <button type="button" onClick={() => setConsultationStatus("idle")}>
              <i className="fa-solid fa-pen" aria-hidden="true" />
              تعديل البيانات
            </button>
          </div>
        </div>
      ) : null}

      {consultationStatus === "whatsapp-invalid" ? (
        <div className="consultation-success-modal consultation-success-modal--error" role="dialog" aria-modal="true" aria-labelledby="consultation-whatsapp-title">
          <div className="consultation-success-modal__panel">
            <span className="consultation-success-modal__icon" aria-hidden="true">
              <i className="fa-solid fa-triangle-exclamation" />
            </span>
            <h3 id="consultation-whatsapp-title">رقم الواتساب غير مسجل في واتساب</h3>
            <p>يرجى إدخال رقم واتساب صحيح حتى نستطيع التواصل معك.</p>
            <button type="button" onClick={() => setConsultationStatus("idle")}>
              <i className="fa-solid fa-pen" aria-hidden="true" />
              تعديل رقم الواتساب
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
