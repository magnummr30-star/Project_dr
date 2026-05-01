"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ClientLoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const clientName = String(formData.get("clientName") || "عميل الشركة").trim();
    const projectCode = String(formData.get("projectCode") || "").trim();

    setIsSubmitting(true);

    window.sessionStorage.setItem(
      "greenClientPortal",
      JSON.stringify({
        clientName: clientName || "عميل الشركة",
        projectCode: projectCode || "GG-2026",
        loggedAt: new Date().toISOString()
      })
    );

    window.setTimeout(() => {
      router.push("/clients/dashboard");
    }, 420);
  }

  return (
    <main className="green-showcase client-portal-page client-login-page" dir="rtl">
      <header className="showcase-nav client-portal-nav">
        <Link className="showcase-brand" href="/" aria-label="العودة إلى الرئيسية">
          <img src="/images/logo.jpeg" alt="" />
          <span>
            <strong>بوابة العملاء</strong>
            <small>متابعة الطلبات والمشاريع</small>
          </span>
        </Link>
        <nav className="showcase-links" aria-label="روابط بوابة العملاء">
          <Link href="/">الرئيسية</Link>
          <Link href="/#services">الخدمات</Link>
          <Link href="/#contact">تواصل</Link>
        </nav>
        <div className="showcase-nav-actions">
          <Link className="showcase-client-login" href="/clients/dashboard" aria-label="لوحة العملاء" title="لوحة العملاء">
            <i className="fa-solid fa-table-columns" aria-hidden="true" />
            <span>لوحة العملاء</span>
          </Link>
        </div>
      </header>

      <section className="client-login-hero" aria-labelledby="client-login-title">
        <div className="client-login-hero__visual" aria-hidden="true" />
        <div className="showcase-container client-login-hero__inner">
          <div className="client-login-copy">
            <span className="showcase-kicker">دخول العملاء</span>
            <h1 id="client-login-title">تابع طلباتك وملفات مشروعك من مكان واحد.</h1>
            <p>
              ادخل إلى لوحة العملاء لمراجعة حالة الطلب، المستندات المطلوبة، الرسائل، والخطوة التالية مع فريق الاستشارات.
            </p>
            <div className="client-login-copy__badges" aria-label="مميزات بوابة العملاء">
              <span>
                <i className="fa-solid fa-folder-open" aria-hidden="true" />
                ملفات المشروع
              </span>
              <span>
                <i className="fa-solid fa-list-check" aria-hidden="true" />
                حالة الطلب
              </span>
              <span>
                <i className="fa-solid fa-comments" aria-hidden="true" />
                رسائل المتابعة
              </span>
            </div>
          </div>

          <form className="client-login-card" onSubmit={handleSubmit}>
            <div className="client-login-card__header">
              <i className="fa-solid fa-user-shield" aria-hidden="true" />
              <div>
                <span>دخول آمن</span>
                <h2>بيانات العميل</h2>
              </div>
            </div>

            <label>
              <span>اسم العميل أو الشركة</span>
              <input name="clientName" type="text" placeholder="مثال: شركة المستقبل الصناعية" required />
            </label>

            <label>
              <span>رقم المشروع أو الهاتف</span>
              <input name="projectCode" type="text" placeholder="مثال: GG-2026 أو رقم الهاتف" required />
            </label>

            <label>
              <span>كلمة المرور</span>
              <input name="password" type="password" placeholder="أدخل كلمة المرور" required />
            </label>

            <button className="client-login-card__submit" type="submit" disabled={isSubmitting}>
              <i className="fa-solid fa-arrow-left-long" aria-hidden="true" />
              {isSubmitting ? "جاري الدخول..." : "الدخول إلى لوحة العملاء"}
            </button>

            <p className="client-login-card__note">
              هذه واجهة دخول جاهزة للربط لاحقًا بنظام العملاء الحقيقي وقاعدة بيانات الحسابات.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
