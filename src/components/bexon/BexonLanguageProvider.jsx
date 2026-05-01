"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MAIN_STYLE = "/assets/css/main.css";
const RTL_STYLE = "/assets/css/main-rtl.css";
const ARABIC_FONT_STACK = '"Cairo", Tahoma, Arial, sans-serif';

const AR_TRANSLATIONS = {
  "Loading...": "جاري التحميل...",
  Home: "الرئيسية",
  About: "من نحن",
  "About us": "من نحن",
  Services: "الخدمات",
  "Our Solutions": "حلولنا",
  "Service details": "تفاصيل الخدمة",
  Portfolio: "الأعمال",
  "Portfolio Details": "تفاصيل الأعمال",
  "Portfolio details": "تفاصيل الأعمال",
  Pages: "الصفحات",
  "Main Pages": "الصفحات الرئيسية",
  "Other Pages": "صفحات أخرى",
  Blog: "المدونة",
  "Blog Details": "تفاصيل المقال",
  "Blog details": "تفاصيل المقال",
  "Blog Grid": "شبكة المقالات",
  "Blog grid": "شبكة المقالات",
  "Blog Right Sidebar": "مدونة مع شريط جانبي",
  "Blog standard": "المدونة القياسية",
  Contact: "اتصل بنا",
  "Contact us": "تواصل معنا",
  "Contact Info": "معلومات التواصل",
  Phone: "الهاتف",
  Email: "البريد الإلكتروني",
  Location: "الموقع",
  "Follow Us": "تابعنا",
  "Search Now!": "ابحث الآن",
  "Search here...": "ابحث هنا...",
  "Type Words and Hit Enter": "اكتب كلمات البحث ثم اضغط إدخال",
  "Solutions That Deliver": "حلول تحقق النتائج",
  "Empowering Your Business with Smart Solutions.": "نمكّن أعمالك بحلول ذكية.",
  "Get Started": "ابدأ الآن",
  "Committed to delivering innovative solutions that drive success. With a focus": "ملتزمون بتقديم حلول مبتكرة تدفع النجاح مع تركيز",
  quality: "على الجودة.",
  "Global rating based on 20k+ reviews": "تقييم عالمي بناءً على أكثر من 20 ألف مراجعة",
  "Choose the": "اختر",
  "Best": "الأفضل",
  "with stakeholders, investors.": "مع الشركاء والمستثمرين.",
  "Excellence across projects.": "تميز عبر المشاريع.",
  "Unlock tailored solutions without the wasted effort.": "اكتشف حلولًا مخصصة بلا جهد ضائع.",
  "Get to Know": "تعرف على",
  Us: "فريقنا",
  "Tailor Business Solutions for Corporates.": "حلول أعمال مصممة للشركات.",
  "Through a combination of data-driven insights and innovative approaches, we work": "من خلال الجمع بين الرؤى المبنية على البيانات والأساليب المبتكرة، نعمل",
  "closely with you to develop customized.": "معك عن قرب لتطوير حلول مخصصة.",
  "We have": "لدينا",
  "happy": "عملاء",
  "customer.": "سعداء.",
  "Innovative Solutions": "حلول مبتكرة",
  "Dedicated Support": "دعم مخصص",
  "Advanced Business Services": "خدمات أعمال متقدمة",
  "Complete Business Solutions": "حلول أعمال متكاملة",
  "Customer Experience Solutions": "حلول تجربة العملاء",
  "Customer Experience Solutions are designed to enhance every touchpoint of your": "صُممت حلول تجربة العملاء لتحسين كل نقطة تواصل في",
  "customer journey, from first interaction.": "رحلة العميل من أول تفاعل.",
  "Marketing Strategy & Campaigns": "استراتيجية التسويق والحملات",
  "Training and Development Programs": "برامج التدريب والتطوير",
  "Sustainability and ESG Consulting": "استشارات الاستدامة والحوكمة البيئية والاجتماعية",
  "OUR FUN FACT": "أرقامنا",
  "Numbers and facts that define performance.": "أرقام وحقائق تعكس الأداء.",
  "Projects Completed.": "مشاريع مكتملة.",
  "Reach Worldwide": "وصول عالمي",
  "Co. Founder": "مؤسس مشارك",
  "Client Feedback (4.8": "تقييمات العملاء (4.8",
  "/out of 200": "/من 200",
  "Increased revenue in the last 6 months.": "زيادة في الإيرادات خلال آخر 6 أشهر.",
  "Proud Projects": "مشاريع نفخر بها",
  "Breaking Boundaries, Building Dreams.": "نتجاوز الحدود ونبني الطموحات.",
  "Event Management Platform": "منصة إدارة الفعاليات",
  "Rebranding Strategy for a Growing": "استراتيجية إعادة هوية لشركة نامية",
  "Home Makeover": "تجديد الهوية",
  "Our Pricing Plan.": "خطط الأسعار.",
  "Basic Plan": "الخطة الأساسية",
  "Standard Plan": "الخطة القياسية",
  "Premium Plan": "الخطة المتقدمة",
  "Essential Business Services": "خدمات أعمال أساسية",
  "Flexible": "مرنة",
  "Business Services": "خدمات الأعمال",
  "Modern": "حديثة",
  "Business Solution": "حلول الأعمال",
  "/per month": "/شهريًا",
  "Access to core services": "الوصول إلى الخدمات الأساسية",
  "Limited customer support (email)": "دعم محدود عبر البريد الإلكتروني",
  "Basic reporting and analytics": "تقارير وتحليلات أساسية",
  "1 project per month": "مشروع واحد شهريًا",
  "Basic performance tracking": "تتبع أساسي للأداء",
  "All features in Basic Plan": "كل مزايا الخطة الأساسية",
  "Priority customer support": "دعم عملاء بأولوية",
  "Monthly performance reviews": "مراجعات أداء شهرية",
  "Up to 3 projects per month": "حتى 3 مشاريع شهريًا",
  "Standard templates and tools": "قوالب وأدوات قياسية",
  "All features in Standard Plan": "كل مزايا الخطة القياسية",
  "Dedicated account manager": "مدير حساب مخصص",
  "24/7 emergency service": "خدمة طوارئ 24/7",
  "Quarterly performance audits": "تدقيق أداء ربع سنوي",
  "Collaboration tools for team": "أدوات تعاون للفريق",
  "Chose Plan": "اختر الخطة",
  "More Pricing": "المزيد من الأسعار",
  "Drop us a Line Here.": "راسلنا من هنا.",
  "Talk to us today": "تحدث معنا اليوم",
  "Get in Touch": "تواصل معنا",
  "Full Name *": "الاسم الكامل *",
  "Email Address *": "البريد الإلكتروني *",
  "Phone number *": "رقم الهاتف *",
  "Chose a option": "اختر خيارًا",
  "Message here... *": "اكتب رسالتك هنا... *",
  "Send Message": "إرسال الرسالة",
  "Read Blogs": "اقرأ المدونة",
  "Strategies and Insights.": "استراتيجيات ورؤى.",
  Business: "الأعمال",
  "By": "بواسطة",
  "Read More": "اقرأ المزيد",
  "Harnessing Digital Transform a Roadmap": "استثمار التحول الرقمي كخارطة طريق",
  "Mastering Change Management Lessons for": "إتقان إدارة التغيير ودروسها لـ",
  Businesses: "الشركات.",
  "Let’s Build Future Together?": "هل نبني المستقبل معًا؟",
  "Lets Talk": "لنتحدث",
  "Let’s Talk": "لنتحدث",
  "Subscribe to Our Newsletter.": "اشترك في نشرتنا البريدية.",
  Subscribe: "اشتراك",
  "Enter email": "أدخل البريد الإلكتروني",
  "Agree to our": "أوافق على",
  "Terms &": "الشروط و",
  "Condition?": "الأحكام؟",
  "Our Company": "شركتنا",
  "Developing personalze our customer journeys to increase satisfaction & loyalty of our expansion.": "نطوّر رحلات عملاء مخصصة لرفع الرضا والولاء ودعم توسعنا.",
  "Developing personalize our customer journeys to increase satisfaction & loyalty of our expansion recognized": "نطوّر رحلات عملاء مخصصة لرفع الرضا والولاء في توسعنا المعترف به",
  "by industry leaders.": "من قادة القطاع.",
  "Customer Experience": "تجربة العملاء",
  "Training Programs": "برامج التدريب",
  "Business Strategy": "استراتيجية الأعمال",
  "Training Program": "برنامج التدريب",
  "ESG Consulting": "استشارات ESG",
  "Development Hub": "مركز التطوير",
  Resources: "الموارد",
  "Team Member": "أعضاء الفريق",
  Recognitions: "الاعتمادات",
  Careers: "الوظائف",
  News: "الأخبار",
  Feedback: "التقييمات",
  "Our Office": "مكتبنا",
  "993 Renner Burg, West Rond, MT 94251-030, USA.": "993 رينر بيرغ، ويست روند، MT 94251-030، الولايات المتحدة.",
  "993 Renner Burg, West Rond, MT 94251-030": "993 رينر بيرغ، ويست روند، MT 94251-030",
  "Mon-Fri 10am-10pm": "من الاثنين إلى الجمعة، 10 صباحًا - 10 مساءً",
  "Privacy Policy": "سياسة الخصوصية",
  "Terms & Condition": "الشروط والأحكام",
  "All right reserved": "جميع الحقوق محفوظة",
  "View demo": "عرض النموذج",
  Homepage: "الصفحة الرئيسية",
  "Coming soon": "قريبًا",
  NEW: "جديد",
  New: "جديد",
  HOT: "مميز",
  Faq: "الأسئلة الشائعة",
  "Our history": "تاريخنا",
  "Meet Teams": "فريق العمل",
  "Careers details": "تفاصيل الوظيفة",
  "Error 404": "خطأ 404",
  Login: "تسجيل الدخول",
  Registration: "التسجيل",
  "Term & conditions": "الشروط والأحكام",
  Shop: "المتجر",
  "Shop Pages": "صفحات المتجر",
  "Shop details": "تفاصيل المنتج",
  Cart: "السلة",
  Checkout: "الدفع",
  Wishlist: "المفضلة",
  "Order confirm": "تأكيد الطلب",
  "Award-Winning Expertise": "خبرة حائزة على جوائز",
  "Measurable Results and Building from the": "نتائج قابلة للقياس وبناء من",
  "Lasting": "علاقات مستدامة",
  "Relationships": "العلاقات",
  "through trust and innovation": "عبر الثقة والابتكار",
  "Recognized by industry leaders, our award-winning team has a proven record of": "يعترف بنا قادة القطاع، ويمتلك فريقنا الحائز على جوائز سجلًا مثبتًا في",
  "delivering": "تقديم",
  "success industries Experts.": "نجاحات بخبرة متخصصة.",
  "Provide tailored strategies that not only drive long-term value but also build": "نقدم استراتيجيات مخصصة لا تحقق قيمة طويلة المدى فقط، بل تبني أيضًا",
  trust: "الثقة",
  "and": "و",
  "Learn More": "اعرف المزيد",
  "Solutions Built for Business.": "حلول مصممة للأعمال.",
  "Business Strategy Development": "تطوير استراتيجية الأعمال",
  "Marketing Strategy": "استراتيجية التسويق",
  "Training and Development": "التدريب والتطوير",
  "IT Support & Maintenance": "الدعم التقني والصيانة",
  "Sustainability and ESG": "الاستدامة وESG",
  "Faster Growth": "نمو أسرع",
  "Tracking": "تتبع",
  "Expert Team": "فريق خبير",
  "Feedbacks": "التقييمات",
  "The results we’ve seen after partnering with Bexon are beyond our expectations. They not": "النتائج التي حققناها بعد الشراكة مع بيكسون تجاوزت توقعاتنا. فهم لم",
  "only": "يكتفوا",
  "understood our vision but also brought new ideas to the table that have taken our business": "بفهم رؤيتنا، بل قدموا أفكارًا جديدة نقلت أعمالنا",
  "to": "إلى",
  "the next level. Their expertise and commitment to success make them a trusted.": "مستوى أعلى. خبرتهم والتزامهم بالنجاح جعلاهم شريكًا موثوقًا.",
  "Working with Bexon has been a game-changer for our business. Their team's": "كان العمل مع بيكسون نقطة تحول لأعمالنا. فقد ساعدتنا",
  professionalism: "احترافية فريقهم",
  "attention to detail, and innovative solutions have helped us streamline operations and": "واهتمامه بالتفاصيل وحلوله المبتكرة على تبسيط العمليات و",
  achieve: "تحقيق",
  "our goals faster than we imagined. We truly feel like a valued partner. The results we’ve": "أهدافنا أسرع مما تخيلنا. نشعر حقًا أننا شريك ذو قيمة. النتائج التي",
  seen: "رأيناها",
  "after partnering.": "بعد الشراكة.",
  "Their team is proactive, responsive, and always goes the extra mile to ensure our needs": "فريقهم مبادر وسريع الاستجابة ويبذل جهدًا إضافيًا دائمًا لضمان تلبية احتياجاتنا",
  are: "تكون",
  "met. They’ve become a key contributor to our growth and success that really help us\"": "ملبّاة. لقد أصبحوا مساهمًا رئيسيًا في نمونا ونجاحنا.",
  "We’ve been working with Bexonfor years, and they continue to deliver outstanding results.": "نعمل مع بيكسون منذ سنوات، وما زالوا يحققون نتائج ممتازة.",
  "Our team is always available to address your concerns, providing quick and solution.": "فريقنا متاح دائمًا لمعالجة استفساراتك وتقديم حلول سريعة.",
  "Our team is always available to address your concerns, providing quick and effective": "فريقنا متاح دائمًا لمعالجة استفساراتك وتقديم دعم سريع وفعّال",
  solution: "حل",
  "to keep your business.": "للحفاظ على أعمالك.",
  "We stay ahead of the curve, leveraging cutting-edge technologies and strategies to": "نبقى في المقدمة عبر توظيف أحدث التقنيات والاستراتيجيات لـ",
  keep: "إبقاء",
  "you competitive in a marketplace.": "قدرتك التنافسية في السوق.",
  "you competitive in marketplace.": "قدرتك التنافسية في السوق.",
  "Our team is always available to address your concerns, providing quick.": "فريقنا متاح دائمًا لمعالجة استفساراتك بسرعة.",
  "shared for": "مخصصة لـ",
  "Feb": "فبراير",
  "Devon Lane": "ديفون لين",
  "Ralph Edwards": "رالف إدواردز",
  "Guy Hawkins": "غاي هوكينز",
  "Ellinien Loma": "إيلينيين لوما",
  "info@bexon.com": "info@bexon.com",
  "support@bexon.com": "support@bexon.com",
  "P: +1 (009) 544-7818": "هاتف: +1 (009) 544-7818",
  "M: support@bexon.com": "بريد: support@bexon.com",
  "$": "$",
  "X": "X"
};

const PLACEHOLDER_TRANSLATIONS = {
  "Search here...": "ابحث هنا...",
  "Type Words and Hit Enter": "اكتب كلمات البحث ثم اضغط إدخال",
  "Full Name *": "الاسم الكامل *",
  "Email Address *": "البريد الإلكتروني *",
  "Phone number *": "رقم الهاتف *",
  "Message here... *": "اكتب رسالتك هنا... *",
  "Enter email": "أدخل البريد الإلكتروني"
};

const EN_BY_AR = new Map(Object.entries(AR_TRANSLATIONS).map(([en, ar]) => [normalizeText(ar), en]));
let isApplyingLocale = false;

function normalizeText(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function getPreferredLocale() {
  const saved = window.localStorage.getItem("bexon-locale");
  if (saved === "ar" || saved === "en") return saved;

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
  return languages.some((language) => /^ar\b/i.test(language)) ? "ar" : "en";
}

function getTranslationKey(value) {
  const normalized = normalizeText(value);
  if (!normalized) return null;
  if (Object.hasOwn(AR_TRANSLATIONS, normalized)) return normalized;
  return EN_BY_AR.get(normalized) ?? null;
}

function localizeTextNode(node, locale) {
  const key = getTranslationKey(node.nodeValue);
  if (!key) return;

  const leading = node.nodeValue.match(/^\s*/)?.[0] ?? "";
  const trailing = node.nodeValue.match(/\s*$/)?.[0] ?? "";
  node.nodeValue = `${leading}${locale === "ar" ? AR_TRANSLATIONS[key] : key}${trailing}`;
}

function localizeAttributes(root, locale) {
  const placeholders = root.querySelectorAll("[placeholder]");

  placeholders.forEach((element) => {
    const key = getTranslationKey(element.getAttribute("placeholder"));
    if (!key) return;
    element.setAttribute("placeholder", locale === "ar" ? PLACEHOLDER_TRANSLATIONS[key] ?? AR_TRANSLATIONS[key] : key);
  });
}

function localizeDom(locale) {
  if (typeof document === "undefined" || !document.body) return;

  isApplyingLocale = true;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script, style, .bexon-language-switcher")) return NodeFilter.FILTER_REJECT;
      return normalizeText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => localizeTextNode(node, locale));
  localizeAttributes(document.body, locale);

  window.setTimeout(() => {
    isApplyingLocale = false;
  }, 0);
}

function applyLocale(locale) {
  const isArabic = locale === "ar";
  const mainStyle = document.getElementById("bexon-main-style");
  let rtlStyle = document.getElementById("bexon-rtl-style");

  document.documentElement.lang = locale;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.documentElement.dataset.locale = locale;
  document.body.classList.toggle("bexon-rtl", isArabic);
  document.body.classList.toggle("bexon-ltr", !isArabic);

  if (isArabic) {
    document.documentElement.style.setProperty("--tj-ff-body", ARABIC_FONT_STACK);
    document.documentElement.style.setProperty("--tj-ff-heading", ARABIC_FONT_STACK);
  } else {
    document.documentElement.style.removeProperty("--tj-ff-body");
    document.documentElement.style.removeProperty("--tj-ff-heading");
  }

  if (mainStyle && !mainStyle.href.endsWith(MAIN_STYLE)) {
    mainStyle.setAttribute("href", MAIN_STYLE);
  }

  if (isArabic) {
    if (!rtlStyle) {
      rtlStyle = document.createElement("link");
      rtlStyle.id = "bexon-rtl-style";
      rtlStyle.rel = "stylesheet";
      rtlStyle.href = RTL_STYLE;
      mainStyle?.after(rtlStyle) ?? document.head.appendChild(rtlStyle);
    }
  } else if (rtlStyle) {
    rtlStyle.remove();
  }

  document.title = isArabic
    ? "الشركة الدولية لخبراء التطوير الصناعي والإستشارات الخضراء"
    : "Global Experts for Industrial Development and Green Consultations";
  localizeDom(locale);
}

export function BexonLanguageProvider() {
  const [locale, setLocale] = useState("en");
  const [slots, setSlots] = useState([]);
  const localeRef = useRef("en");

  useEffect(() => {
    const updateSlots = () => {
      setSlots(Array.from(document.querySelectorAll("[data-bexon-language-slot]")));
    };

    const preferredLocale = getPreferredLocale();
    localeRef.current = preferredLocale;
    setLocale(preferredLocale);
    applyLocale(preferredLocale);
    updateSlots();

    const onAssetsLoaded = () => {
      localizeDom(localeRef.current);
      updateSlots();
    };

    const observer = new MutationObserver(() => {
      if (isApplyingLocale) return;
      window.clearTimeout(observer.timer);
      observer.timer = window.setTimeout(() => {
        localizeDom(localeRef.current);
        updateSlots();
      }, 30);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    window.addEventListener("bexon:assets-loaded", onAssetsLoaded);

    return () => {
      observer.disconnect();
      window.removeEventListener("bexon:assets-loaded", onAssetsLoaded);
    };
  }, []);

  const chooseLocale = (nextLocale) => {
    if (nextLocale === localeRef.current) return;

    localeRef.current = nextLocale;
    window.localStorage.setItem("bexon-locale", nextLocale);
    setLocale(nextLocale);
    applyLocale(nextLocale);
    window.setTimeout(() => window.location.reload(), 40);
  };

  const switcher = (slotName = "fallback") => (
    <div className="bexon-language-switcher" role="group" aria-label="Language selector" data-slot={slotName}>
      <span className="language-mark" aria-hidden="true">
        <span>A</span>
        <span>ع</span>
      </span>
      <button type="button" aria-pressed={locale === "ar"} aria-label="Switch to Arabic" onClick={() => chooseLocale("ar")}>
        <span className="language-code">AR</span>
        <span className="language-label">عربي</span>
      </button>
      <button type="button" aria-pressed={locale === "en"} aria-label="Switch to English" onClick={() => chooseLocale("en")}>
        <span className="language-code">EN</span>
        <span className="language-label">English</span>
      </button>
    </div>
  );

  if (!slots.length) {
    return null;
  }

  return (
    <>
      {slots.map((slot, index) =>
        createPortal(switcher(slot.dataset.bexonLanguageSlot), slot, `${slot.dataset.bexonLanguageSlot}-${index}`)
      )}
    </>
  );
}
