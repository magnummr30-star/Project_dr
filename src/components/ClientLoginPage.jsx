"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getClientPortalSession, saveClientPortalSession } from "@/lib/clientPortalSession";

export function ClientLoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginStatus, setLoginStatus] = useState("idle");
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [recoveryStatus, setRecoveryStatus] = useState("idle");

  useEffect(() => {
    const savedClient = getClientPortalSession({ refreshActivity: true });

    if (savedClient) {
      router.replace("/clients/dashboard");
    }
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setLoginStatus("idle");

    try {
      const response = await fetch("/api/client-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.status === 401) {
        setLoginStatus("invalid");
        return;
      }

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();

      saveClientPortalSession(result.client);
      router.replace("/clients/dashboard");
    } catch (error) {
      setLoginStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordRecovery(event) {
    event.preventDefault();
    setRecoveryStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/client-password-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.status === 404) {
        setRecoveryStatus("not-found");
        return;
      }

      if (!response.ok) {
        throw new Error("Recovery request failed");
      }

      form.reset();
      setRecoveryStatus("success");
    } catch (error) {
      setRecoveryStatus("error");
    }
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
          <Link className="showcase-client-login" href="/clients/login" aria-label="دخول العملاء" title="دخول العملاء">
            <i className="fa-solid fa-user-shield" aria-hidden="true" />
            <span>دخول العملاء</span>
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

          <div className="client-login-card">
            <form className="client-login-card__form" onSubmit={handleSubmit}>
              <div className="client-login-card__header">
                <i className="fa-solid fa-user-shield" aria-hidden="true" />
                <div>
                  <span>دخول آمن</span>
                  <h2>بيانات العميل</h2>
                </div>
              </div>

              <label>
                <span>رقم الهاتف</span>
                <input name="phone" type="tel" inputMode="tel" placeholder="رقم واتساب المسجل في الاستشارة" required />
              </label>

              <label>
                <span>الرقم السري</span>
                <input name="password" type="password" placeholder="أدخل الرقم السري" required />
              </label>

              {loginStatus === "invalid" ? (
                <p className="client-login-card__alert is-error">رقم الهاتف أو الرقم السري غير صحيح.</p>
              ) : null}

              {loginStatus === "error" ? (
                <p className="client-login-card__alert is-error">تعذر تسجيل الدخول الآن، حاول مرة أخرى.</p>
              ) : null}

              <button className="client-login-card__submit" type="submit" disabled={isSubmitting}>
                <i className="fa-solid fa-arrow-left-long" aria-hidden="true" />
                {isSubmitting ? "جاري الدخول..." : "الدخول إلى لوحة العملاء"}
              </button>
            </form>

            <button
              className="client-login-card__forgot"
              type="button"
              onClick={() => {
                setIsRecoveryOpen((currentValue) => !currentValue);
                setRecoveryStatus("idle");
              }}
            >
              نسيت الرقم السري؟
            </button>

            {isRecoveryOpen ? (
              <form className="client-password-recovery" onSubmit={handlePasswordRecovery}>
                <strong>استرجاع الرقم السري</strong>
                <p>أدخل رقم الهاتف المسجل، وسيتم إرسال بيانات الحساب على واتساب.</p>
                <label>
                  <span>رقم الهاتف</span>
                  <input name="phone" type="tel" inputMode="tel" placeholder="رقم واتساب المسجل في الاستشارة" required />
                </label>
                <button className="client-login-card__submit" type="submit" disabled={recoveryStatus === "sending"}>
                  <i className="fa-solid fa-key" aria-hidden="true" />
                  {recoveryStatus === "sending" ? "جاري إرسال البيانات..." : "إرسال بيانات الحساب"}
                </button>
                {recoveryStatus === "success" ? <p className="client-login-card__alert is-success">تم إرسال بيانات الحساب على واتساب.</p> : null}
                {recoveryStatus === "not-found" ? <p className="client-login-card__alert is-error">لا يوجد حساب مسجل بهذا الرقم.</p> : null}
                {recoveryStatus === "error" ? <p className="client-login-card__alert is-error">تعذر إرسال بيانات الحساب، حاول مرة أخرى.</p> : null}
              </form>
            ) : null}

            <p className="client-login-card__note">
              في حالة نسيان الرقم السري يمكن طلب استرجاعه من هذه الشاشة.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
