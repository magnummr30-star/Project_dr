"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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

const emailOptions = [
  "info@company.com",
  "sales@company.com",
  "projects@company.com",
  "admin@company.com",
  "operations@company.com",
  "ceo@company.com"
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

export function ServicesShowcasePage() {
  const [activeServiceNeed, setActiveServiceNeed] = useState("all");
  const [consultationStatus, setConsultationStatus] = useState("idle");
  const [selectedConsultationNeed, setSelectedConsultationNeed] = useState("not-sure");
  const [selectedConsultationSlug, setSelectedConsultationSlug] = useState("recommend-service");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showAllConsultationServices, setShowAllConsultationServices] = useState(false);

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

  const featuredServices = services.filter((service) => [1, 11, 15, 18].includes(service.id));
  const heroService = services.find((service) => service.id === 15);
  const selectedNeed = consultationNeedOptions.find((option) => option.value === selectedConsultationNeed);
  const consultationServiceChoices = useMemo(() => {
    if (showAllConsultationServices) return services;

    return (selectedNeed?.serviceIds ?? [])
      .map((serviceId) => services.find((service) => service.id === serviceId))
      .filter(Boolean);
  }, [selectedNeed, showAllConsultationServices]);

  async function handleConsultationSubmit(event) {
    event.preventDefault();
    setConsultationStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

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

  function handleConsultationNeedChange(needValue) {
    const nextNeed = consultationNeedOptions.find((option) => option.value === needValue);
    const firstService = nextNeed?.serviceIds?.[0]
      ? services.find((service) => service.id === nextNeed.serviceIds[0])
      : null;

    setSelectedConsultationNeed(needValue);
    setShowAllConsultationServices(false);
    setSelectedConsultationSlug(firstService?.slug ?? "recommend-service");
  }

  return (
    <main className="green-showcase" dir="rtl">
      <header className="showcase-nav">
        <Link className="showcase-brand" href="/" aria-label="الشركة الدولية لخبراء التطوير الصناعي والاستشارات الخضراء">
          <img src="/images/logo.jpeg" alt="" />
          <span>
            <strong>خبراء التطوير الصناعي</strong>
            <small>والاستشارات الخضراء</small>
          </span>
        </Link>
        <nav className="showcase-links" aria-label="روابط الصفحة">
          <a href="#top">الرئيسية</a>
          <a href="#services">الخدمات</a>
          <a href="#path">المنهجية</a>
          <a href="#consultation">استشارة مجانية</a>
          <a href="#contact">تواصل</a>
        </nav>
        <div className="showcase-nav-actions">
          <Link className="showcase-client-login" href="/clients/login" aria-label="دخول العملاء" title="دخول العملاء">
            <i className="fa-solid fa-user-lock" aria-hidden="true" />
            <span>دخول العملاء</span>
          </Link>
          <a className="showcase-nav-cta" href="tel:0556260392">
            <i className="fa-solid fa-phone" aria-hidden="true" />
            <span>اتصل الآن</span>
          </a>
        </div>
      </header>

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
              <a className="showcase-button showcase-button--primary" href="#services">
                استعرض الخدمات
                <span aria-hidden="true">↓</span>
              </a>
              <a className="showcase-button showcase-button--ghost" href="mailto:info@globalgreenconsults.com">
                ابدأ مشروعك
              </a>
              <a className="showcase-button showcase-button--ghost" href="#consultation">
                اطلب استشارة مجانية
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
                    اطلب استشارة مجانية
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
                    استشارة مجانية
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-proof" aria-label="ملخص الخدمات">
        <div className="showcase-container showcase-proof__grid">
          <div>
            <strong>18</strong>
            <span>صفحة خدمة مستقلة</span>
          </div>
          <div>
            <strong>7</strong>
            <span>تصنيفات حسب الاحتياج</span>
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

      <section className="service-gallery" id="services" aria-labelledby="services-title">
        <div className="showcase-container">
          <div className="section-heading section-heading--split">
            <div>
              <span>كتالوج الخدمات</span>
              <h2 id="services-title">حلول متخصصة تدعم قرارك الاستثماري من البداية.</h2>
            </div>
            <p>اختر نفس تصنيف الاحتياج الموجود في نموذج الاستشارة، وستظهر لك الخدمات المسجلة المناسبة لهذا المسار مباشرة.</p>
          </div>

          <div className="service-filters service-filters--needs" role="tablist" aria-label="تصنيف الخدمات حسب الاحتياج">
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
          </div>

          <div className="service-grid">
            {visibleServices.map((service) => {
              const imageElements = serviceImageElements[service.id] ?? service.highlights;

              return (
              <article className="service-tile service-product-card" data-service-id={service.id} key={service.id}>
                <Link className="service-product-card__image" href={`/services/${service.slug}`}>
                  <img src={service.image} alt={service.title} loading="lazy" />
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
                      <span className="service-product-card__consult-text" data-text="اطلب استشارة مجانية">اطلب استشارة مجانية</span>
                    </a>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="consultation-section" id="consultation" aria-labelledby="consultation-title">
        <div className="showcase-container consultation-shell">
          <div className="consultation-intro">
            <span className="showcase-kicker">استشارة مجانية لمشروعك</span>
            <h2 id="consultation-title">اطلب استشارة مجانية</h2>
            <p>
              نصيحة: قبل أن تبدأ في الترخيص أو التمويل أو اختيار الخدمة، اترك لنا بياناتك لنحدد لك المسار الأنسب والخطوة التالية بوضوح.
            </p>
          </div>

          <div className="consultation-registration-layout">
            <aside className="consultation-side-benefits consultation-side-benefits--right" aria-label="فوائد الاستشارة المجانية">
              {consultationBenefits.slice(0, 2).map((benefit, index) => (
                <article key={benefit.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </aside>

          <form className="consultation-form" id="consultation-form" onSubmit={handleConsultationSubmit}>
            <div className="consultation-form__header">
              <span>استشارة مجانية</span>
              <h3>دعنا نحدد لك المسار الأنسب</h3>
              <p>اختر ما يناسب مشروعك خلال لحظات، وسيتواصل معك فريقنا بخطوة واضحة تساعدك على البدء بثقة.</p>
            </div>

            <div className="consultation-form__promise" aria-label="مزايا الاستشارة المجانية">
              <span>بدون رسوم</span>
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
              <label className="consultation-field consultation-field--wide-half">
                الاسم الكامل
                <input name="fullName" type="text" placeholder="اكتب اسمك لنتواصل معك" required />
              </label>
              <label className="consultation-field consultation-field--wide-half">
                رقم الجوال
                <input name="phone" type="tel" placeholder="05xxxxxxxx - للتواصل السريع" required />
              </label>
              <div className="consultation-field consultation-field--wide-half consultation-field--email">
                <label className="consultation-field__label" htmlFor="consultation-email">البريد الإلكتروني</label>
                <input
                  id="consultation-email"
                  name="email"
                  onChange={(event) => setSelectedEmail(event.target.value)}
                  placeholder="name@example.com"
                  type="email"
                  value={selectedEmail}
                />
                <div className="consultation-email-suggestions" aria-label="اقتراحات البريد الإلكتروني">
                  {emailOptions.map((email) => (
                    <button
                      className={selectedEmail === email ? "is-active" : ""}
                      key={email}
                      onClick={() => setSelectedEmail(email)}
                      type="button"
                    >
                      {email}
                    </button>
                  ))}
                </div>
              </div>
              <div className="consultation-field consultation-field--wide-half consultation-field--location">
                <label className="consultation-field__label" htmlFor="consultation-location">المدينة / الدولة</label>
                <input
                  id="consultation-location"
                  name="location"
                  onChange={(event) => setSelectedLocation(event.target.value)}
                  placeholder="مثال: دبي، الإمارات"
                  type="text"
                  value={selectedLocation}
                />
                <div className="consultation-location-suggestions" aria-label="اقتراحات المدينة">
                  {locationOptions.map((location) => (
                    <button
                      className={selectedLocation === location ? "is-active" : ""}
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      type="button"
                    >
                      {location}
                    </button>
                  ))}
                </div>
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
                <div className="consultation-choice-grid consultation-choice-grid--needs">
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
                </div>
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
                <div className="consultation-choice-grid consultation-choice-grid--services">
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
                </div>
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

            <div className="consultation-form__footer">
              <button className="showcase-button showcase-button--primary" type="submit" disabled={consultationStatus === "sending"}>
                {consultationStatus === "sending" ? "جاري إرسال الطلب..." : "أرسل الطلب واحصل على توجيه مجاني"}
              </button>
              {consultationStatus === "success" ? <p className="consultation-alert is-success">تم تسجيل طلب الاستشارة المجانية بنجاح.</p> : null}
              {consultationStatus === "error" ? <p className="consultation-alert is-error">تعذر تسجيل الطلب، حاول مرة أخرى.</p> : null}
            </div>
          </form>

            <aside className="consultation-side-benefits consultation-side-benefits--left" aria-label="فوائد إضافية للاستشارة المجانية">
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
          <div>
            <span>جاهزون للعرض النهائي</span>
            <h2 id="contact-title">ابدأ بخطوة واضحة نحو مشروع صناعي أقوى وأكثر استدامة.</h2>
          </div>
          <div className="contact-actions">
            <a className="showcase-button showcase-button--primary" href="tel:0556260392">0556260392</a>
            <a className="showcase-button showcase-button--light" href="mailto:info@globalgreenconsults.com">
              info@globalgreenconsults.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
