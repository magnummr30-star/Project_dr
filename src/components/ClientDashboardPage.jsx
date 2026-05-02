"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearClientPortalSession,
  getClientPortalSession,
  refreshClientPortalActivity
} from "@/lib/clientPortalSession";

const projectSteps = [
  { title: "استلام الطلب", status: "completed", date: "28 أبريل 2026" },
  { title: "مراجعة المستندات", status: "active", date: "قيد التنفيذ" },
  { title: "تجهيز التوصية", status: "pending", date: "الخطوة التالية" },
  { title: "تسليم التقرير", status: "pending", date: "بعد الاعتماد" }
];

const documents = [
  { name: "الرخصة التجارية", state: "تم الاستلام", icon: "fa-solid fa-file-circle-check" },
  { name: "وصف المشروع", state: "بحاجة تحديث", icon: "fa-solid fa-file-pen" },
  { name: "بيانات الموقع", state: "بانتظار الرفع", icon: "fa-solid fa-cloud-arrow-up" }
];

const messages = [
  "تمت مراجعة بيانات المشروع الأولية.",
  "يرجى تحديث وصف النشاط والمساحة المتوقعة.",
  "سيتم إرسال قائمة المتطلبات النهائية بعد اكتمال الملفات."
];

const defaultClient = {
  clientName: "عميل الشركة",
  projectCode: "",
  phone: "",
  serviceTitle: "استشارة متخصصة",
  requestStatus: "new",
  createdAt: ""
};

export function ClientDashboardPage() {
  const router = useRouter();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const savedClient = getClientPortalSession({ refreshActivity: true });

    if (!savedClient) {
      router.replace("/clients/login");
      return undefined;
    }

    setClient({ ...defaultClient, ...savedClient });

    let lastActivitySync = Date.now();

    function handleActivity() {
      const now = Date.now();

      if (now - lastActivitySync < 60000) {
        return;
      }

      lastActivitySync = now;
      refreshClientPortalActivity();
    }

    function verifySession() {
      const activeClient = getClientPortalSession();

      if (!activeClient) {
        router.replace("/clients/login");
      }
    }

    const activityEvents = ["click", "keydown", "touchstart", "scroll"];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, handleActivity, { passive: true }));
    const sessionTimer = window.setInterval(verifySession, 60000);

    return () => {
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, handleActivity));
      window.clearInterval(sessionTimer);
    };
  }, [router]);

  function handleLogout() {
    clearClientPortalSession();
    router.replace("/clients/login");
  }

  if (!client) {
    return (
      <main className="green-showcase client-portal-page client-dashboard-page" dir="rtl">
        <section className="client-dashboard">
          <div className="showcase-container">
            <div className="client-dashboard__welcome">
              <div>
                <span className="showcase-kicker">جاري التحقق</span>
                <h1>الرجاء تسجيل الدخول</h1>
                <p>سيتم تحويلك إلى شاشة دخول العملاء للتحقق من رقم الهاتف والرقم السري.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="green-showcase client-portal-page client-dashboard-page" dir="rtl">
      <header className="showcase-nav client-portal-nav">
        <Link className="showcase-brand" href="/" aria-label="العودة إلى الرئيسية">
          <img src="/images/logo.jpeg" alt="" />
          <span>
            <strong>لوحة العملاء</strong>
            <small>{client.projectCode}</small>
          </span>
        </Link>
        <nav className="showcase-links" aria-label="روابط لوحة العملاء">
          <Link href="/">الرئيسية</Link>
          <Link href="/clients/login">دخول العملاء</Link>
          <Link href="/#contact">تواصل</Link>
        </nav>
        <div className="showcase-nav-actions">
          <button className="showcase-nav-cta" type="button" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
            <span>تسجيل خروج</span>
          </button>
        </div>
      </header>

      <section className="client-dashboard">
        <div className="showcase-container">
          <div className="client-dashboard__welcome">
            <div>
              <span className="showcase-kicker">مرحبًا بك</span>
              <h1>{client.clientName}</h1>
              <p>هنا تجد ملخص مشروعك، المستندات المطلوبة، رسائل الفريق، والخطوة التالية في مسار الخدمة.</p>
            </div>
            <div className="client-dashboard__status">
              <small>الخدمة المطلوبة</small>
              <strong>{client.serviceTitle || "استشارة متخصصة"}</strong>
              <span>{client.phone ? `رقم الهاتف: ${client.phone}` : `رقم الطلب: ${client.projectCode}`}</span>
            </div>
          </div>

          <div className="client-dashboard__stats" aria-label="ملخص لوحة العملاء">
            <article>
              <i className="fa-solid fa-briefcase" aria-hidden="true" />
              <span>01</span>
              <strong>مشروع نشط</strong>
            </article>
            <article>
              <i className="fa-solid fa-file-lines" aria-hidden="true" />
              <span>03</span>
              <strong>مستندات</strong>
            </article>
            <article>
              <i className="fa-solid fa-comments" aria-hidden="true" />
              <span>03</span>
              <strong>رسائل متابعة</strong>
            </article>
            <article>
              <i className="fa-solid fa-calendar-check" aria-hidden="true" />
              <span>48h</span>
              <strong>المراجعة القادمة</strong>
            </article>
          </div>

          <div className="client-dashboard__grid">
            <section className="client-dashboard-card client-dashboard-card--wide">
              <div className="client-dashboard-card__head">
                <span>مسار المشروع</span>
                <h2>خطوات المتابعة الحالية</h2>
              </div>
              <div className="client-project-steps">
                {projectSteps.map((step, index) => (
                  <article className={`client-project-step is-${step.status}`} key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <small>{step.date}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="client-dashboard-card">
              <div className="client-dashboard-card__head">
                <span>الملفات</span>
                <h2>المستندات المطلوبة</h2>
              </div>
              <div className="client-documents">
                {documents.map((document) => (
                  <article key={document.name}>
                    <i className={document.icon} aria-hidden="true" />
                    <div>
                      <strong>{document.name}</strong>
                      <small>{document.state}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="client-dashboard-card">
              <div className="client-dashboard-card__head">
                <span>الرسائل</span>
                <h2>آخر التحديثات</h2>
              </div>
              <div className="client-messages">
                {messages.map((message) => (
                  <p key={message}>{message}</p>
                ))}
              </div>
            </section>

            <section className="client-dashboard-card client-dashboard-card--action">
              <i className="fa-solid fa-headset" aria-hidden="true" />
              <h2>تحتاج مساعدة؟</h2>
              <p>يمكنك إرسال استفسار سريع أو التواصل مع فريقنا لمراجعة حالة مشروعك.</p>
              <Link className="showcase-button showcase-button--primary" href="/#contact">
                تواصل مع الفريق
              </Link>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
