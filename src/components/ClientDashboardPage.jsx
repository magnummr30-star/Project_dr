"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearClientPortalSession,
  getClientPortalSession,
  refreshClientPortalActivity,
  saveClientPortalSession
} from "@/lib/clientPortalSession";

const defaultClient = {
  clientName: "عميل الشركة",
  projectCode: "",
  phone: "",
  email: "",
  location: "",
  investorType: "",
  consultationNeed: "",
  serviceTitle: "استشارة متخصصة",
  projectStage: "",
  contactWindow: "",
  message: "",
  requestStatus: "new",
  consultationStatus: "جاري الاتصال",
  consultationDate: "",
  uploadedDocumentsCount: 0,
  uploadedDocuments: [],
  lastDocumentsUploadedAt: "",
  createdAt: ""
};

const consultationValueLabels = {
  investorType: {
    investor: "مستثمر",
    "factory-owner": "مالك مصنع",
    developer: "مطور مشروع",
    company: "شركة قائمة"
  },
  consultationNeed: {
    "not-sure": "لست متأكدًا",
    "new-project": "تأسيس مشروع جديد",
    feasibility: "دراسة وجدوى",
    licensing: "تراخيص ومعاملات",
    finance: "تمويل وقروض",
    sustainability: "استدامة وتطوير",
    carbon: "كربون وانبعاثات",
    "land-operation": "أرض أو تشغيل"
  },
  projectStage: {
    idea: "فكرة أولية",
    study: "دراسة جدوى",
    licensing: "تراخيص ومعاملات",
    operation: "تشغيل أو تطوير قائم"
  },
  contactWindow: {
    morning: "صباحًا",
    afternoon: "بعد الظهر",
    evening: "مساءً"
  },
  requestStatus: {
    new: "جديد",
    active: "نشط",
    completed: "مكتمل",
    pending: "قيد المتابعة"
  }
};

function getDisplayValue(value) {
  return value ? value : "غير محدد";
}

function getArabicValue(field, value) {
  if (!value) {
    return "";
  }

  return consultationValueLabels[field]?.[value] || value;
}

function formatDashboardDate(value) {
  if (!value) {
    return "غير محدد";
  }

  try {
    return new Intl.DateTimeFormat("ar-AE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(value));
  } catch (error) {
    return "غير محدد";
  }
}

async function refreshClientServerSession(token) {
  if (!token) {
    return false;
  }

  try {
    const response = await fetch("/api/client-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

function clearClientServerSession() {
  return fetch("/api/client-session", {
    method: "DELETE",
    keepalive: true
  }).catch(() => {});
}

export function ClientDashboardPage() {
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [isConsultationDetailsOpen, setIsConsultationDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [documentsLoadStatus, setDocumentsLoadStatus] = useState("idle");
  const [documentsUploadStatus, setDocumentsUploadStatus] = useState("idle");

  useEffect(() => {
    let isMounted = true;
    let lastActivitySync = Date.now();

    function handleActivity() {
      const now = Date.now();

      if (now - lastActivitySync < 60000) {
        return;
      }

      lastActivitySync = now;
      const activeClient = refreshClientPortalActivity();

      if (activeClient?.clientPortalToken) {
        refreshClientServerSession(activeClient.clientPortalToken);
      }
    }

    function verifySession() {
      const activeClient = getClientPortalSession();

      if (!activeClient) {
        router.replace("/clients/login");
      }
    }

    async function restoreSession() {
      const savedClient = getClientPortalSession({ refreshActivity: true });

      if (!savedClient) {
        router.replace("/clients/login");
        return;
      }

      const isServerSessionReady = await refreshClientServerSession(savedClient.clientPortalToken);

      if (!isServerSessionReady) {
        clearClientPortalSession();
        router.replace("/clients/login");
        return;
      }

      if (!isMounted) {
        return;
      }

      const nextClient = { ...defaultClient, ...savedClient };
      setClient(nextClient);
      setUploadedDocuments(Array.isArray(nextClient.uploadedDocuments) ? nextClient.uploadedDocuments : []);
    }

    restoreSession();

    const activityEvents = ["click", "keydown", "touchstart", "scroll"];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, handleActivity, { passive: true }));
    const sessionTimer = window.setInterval(verifySession, 60000);

    return () => {
      isMounted = false;
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, handleActivity));
      window.clearInterval(sessionTimer);
    };
  }, [router]);

  useEffect(() => {
    if (!isConsultationDetailsOpen || !client?.projectCode || !client?.phone) {
      return undefined;
    }

    let isActive = true;

    async function loadUploadedDocuments() {
      setDocumentsLoadStatus("loading");

      try {
        const response = await fetch("/api/client-documents", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Documents load failed");
        }

        const result = await response.json();

        if (!isActive) {
          return;
        }

        const nextDocuments = result.documents || [];
        const nextClient = {
          ...client,
          uploadedDocuments: nextDocuments,
          uploadedDocumentsCount: nextDocuments.length
        };

        setUploadedDocuments(nextDocuments);
        setClient(nextClient);
        saveClientPortalSession(nextClient);
        setDocumentsLoadStatus("success");
      } catch (error) {
        if (isActive) {
          setDocumentsLoadStatus("error");
        }
      }
    }

    loadUploadedDocuments();

    return () => {
      isActive = false;
    };
  }, [isConsultationDetailsOpen, client?.projectCode, client?.phone]);

  function handleLogout() {
    clearClientServerSession();
    clearClientPortalSession();
    router.replace("/clients/login");
  }

  function handleDeleteFromDashboard() {
    clearClientServerSession();
    clearClientPortalSession();
    router.replace("/clients/login");
  }

  function handleDocumentSelection(event) {
    setSelectedDocuments(Array.from(event.currentTarget.files || []));
    setDocumentsUploadStatus("idle");
  }

  async function handleDocumentsUpload(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("consultationId", client.projectCode);
    formData.set("phone", client.phone);
    setDocumentsUploadStatus("sending");

    try {
      const response = await fetch("/api/client-documents", {
        method: "POST",
        body: formData
      });

      if (response.status === 415) {
        setDocumentsUploadStatus("invalid");
        return;
      }

      if (!response.ok) {
        throw new Error("Documents upload failed");
      }

      const result = await response.json();
      const nextDocuments = [...uploadedDocuments, ...result.documents];
      const nextClient = {
        ...client,
        uploadedDocuments: nextDocuments,
        uploadedDocumentsCount: nextDocuments.length,
        lastDocumentsUploadedAt: new Date().toISOString()
      };

      setClient(nextClient);
      setUploadedDocuments(nextDocuments);
      saveClientPortalSession(nextClient);
      form.reset();
      setSelectedDocuments([]);
      setDocumentsUploadStatus("success");
    } catch (error) {
      setDocumentsUploadStatus("error");
    }
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

  const consultationStatus = client.consultationStatus || "جاري الاتصال";
  const consultationDate = formatDashboardDate(client.consultationDate || client.createdAt);
  const clientInfoItems = [
    { icon: "fa-solid fa-user", label: "اسم العميل", value: client.clientName },
    { icon: "fa-solid fa-phone", label: "رقم الهاتف", value: client.phone },
    { icon: "fa-solid fa-envelope", label: "البريد الإلكتروني", value: client.email },
    { icon: "fa-solid fa-location-dot", label: "الموقع", value: client.location }
  ];
  const consultationSummaryCards = [
    {
      icon: "fa-solid fa-user-tie",
      label: "نوع المستثمر",
      value: getArabicValue("investorType", client.investorType)
    },
    {
      icon: "fa-solid fa-bullseye",
      label: "الاحتياج الاستشاري",
      value: getArabicValue("consultationNeed", client.consultationNeed)
    },
    {
      icon: "fa-solid fa-diagram-project",
      label: "مرحلة المشروع",
      value: getArabicValue("projectStage", client.projectStage)
    },
    {
      icon: "fa-solid fa-note-sticky",
      label: "ملاحظات",
      value: client.message
    },
    {
      icon: "fa-solid fa-folder-open",
      label: "عدد الملفات",
      value: `${Number(client.uploadedDocumentsCount || 0)} مستند`
    }
  ];

  return (
    <main className="green-showcase client-portal-page client-dashboard-page" dir="rtl">
      {documentsUploadStatus === "sending" || documentsLoadStatus === "loading" ? (
        <div className="consultation-saving-screen" role="status" aria-live="polite">
          <span className="consultation-saving-screen__spinner" aria-hidden="true" />
          <strong>{documentsUploadStatus === "sending" ? "جاري رفع المستندات" : "جاري تحميل الملفات"}</strong>
          <p>يرجى الانتظار قليلًا، يتم تجهيز بيانات الملفات الآن.</p>
        </div>
      ) : null}

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
              <span>حالة الاستشارة: {consultationStatus}</span>
            </div>
          </div>

          <section className="client-profile-panel" aria-labelledby="client-profile-title">
            <div className="client-profile-panel__head">
              <span className="client-profile-panel__icon">
                <i className="fa-solid fa-address-card" aria-hidden="true" />
              </span>
              <div>
                <small>بيانات العميل</small>
                <h2 id="client-profile-title">{client.clientName}</h2>
                <p>هذه البيانات المعتمدة من طلب الاستشارة المسجل لدينا.</p>
              </div>
            </div>
            <div className="client-profile-panel__items">
              {clientInfoItems.map((item) => (
                <article key={item.label}>
                  <i className={item.icon} aria-hidden="true" />
                  <div>
                    <span>{item.label}</span>
                    <strong>{getDisplayValue(item.value)}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="client-dashboard-card client-consultation-table-card" aria-labelledby="consultation-data-title">
            <div className="client-dashboard-card__head">
              <span>بيانات الاستشارة</span>
              <h2 id="consultation-data-title">الاستشارات المسجلة</h2>
            </div>
            <div className="client-consultation-table-wrap">
              <table className="client-consultation-table">
                <thead>
                  <tr>
                    <th scope="col">رقم الاستشارة</th>
                    <th scope="col">تاريخ الاستشارة</th>
                    <th scope="col">الخدمة المطلوبة</th>
                    <th scope="col">حالة الاستشارة</th>
                    <th scope="col">عرض / استكمال البيانات</th>
                    <th scope="col">حذف</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="رقم الاستشارة">{getDisplayValue(client.projectCode)}</td>
                    <td data-label="تاريخ الاستشارة">{consultationDate}</td>
                    <td data-label="الخدمة المطلوبة">{getDisplayValue(client.serviceTitle)}</td>
                    <td data-label="حالة الاستشارة">
                      <span className="client-consultation-status">{consultationStatus}</span>
                    </td>
                    <td data-label="عرض / استكمال البيانات">
                      <button
                        className="client-consultation-action"
                        type="button"
                        onClick={() => setIsConsultationDetailsOpen((currentValue) => !currentValue)}
                      >
                        <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                        {isConsultationDetailsOpen ? "إخفاء البيانات" : "عرض / استكمال"}
                      </button>
                    </td>
                    <td data-label="حذف">
                      <button
                        className="client-consultation-action client-consultation-action--danger"
                        type="button"
                        onClick={() => setIsDeleteConfirmOpen(true)}
                      >
                        <i className="fa-solid fa-trash-can" aria-hidden="true" />
                        حذف
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {isConsultationDetailsOpen ? (
              <div className="client-consultation-completion" aria-label="تفاصيل استكمال بيانات الاستشارة">
                <div className="client-consultation-details client-consultation-details--summary">
                  {consultationSummaryCards.map((item) => (
                    <article key={item.label}>
                      <i className={item.icon} aria-hidden="true" />
                      <div>
                        <span>{item.label}</span>
                        <strong>{getDisplayValue(item.value)}</strong>
                      </div>
                    </article>
                  ))}
                </div>

                <form className="client-document-upload" onSubmit={handleDocumentsUpload}>
                  <div className="client-document-upload__head">
                    <i className="fa-solid fa-file-arrow-up" aria-hidden="true" />
                    <div>
                      <strong>إرفاق ملفات ومستندات</strong>
                      <p>يمكنك رفع أكثر من ملف، ويقبل النظام ملفات PDF أو الصور فقط.</p>
                    </div>
                  </div>

                  <div className="client-document-upload__grid">
                    <label>
                      <span>نوع المستند</span>
                      <input name="documentType" type="text" placeholder="مثال: رخصة تجارية، هوية، مخطط" required />
                    </label>
                    <label className="client-document-upload__file">
                      <span>إرفاق الملفات</span>
                      <input
                        name="documents"
                        type="file"
                        accept="application/pdf,image/*,.pdf,.jpg,.jpeg,.png,.webp,.gif,.bmp"
                        multiple
                        onChange={handleDocumentSelection}
                        required
                      />
                      <small>الأنواع المقبولة: PDF، JPG، PNG، WebP، GIF أو أي صورة.</small>
                    </label>
                  </div>

                  {selectedDocuments.length ? (
                    <ul className="client-document-upload__files" aria-label="الملفات المختارة">
                      {selectedDocuments.map((file) => (
                        <li key={`${file.name}-${file.size}`}>
                          <i className="fa-solid fa-paperclip" aria-hidden="true" />
                          <span>{file.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <button className="client-document-upload__submit" type="submit" disabled={documentsUploadStatus === "sending"}>
                    <i className="fa-solid fa-cloud-arrow-up" aria-hidden="true" />
                    {documentsUploadStatus === "sending" ? "جاري رفع المستندات..." : "حفظ المستندات"}
                  </button>

                  {documentsUploadStatus === "success" ? (
                    <p className="client-document-upload__alert is-success">تم حفظ المستندات بنجاح.</p>
                  ) : null}
                  {documentsUploadStatus === "invalid" ? (
                    <p className="client-document-upload__alert is-error">يقبل النظام ملفات PDF أو الصور فقط.</p>
                  ) : null}
                  {documentsUploadStatus === "error" ? (
                    <p className="client-document-upload__alert is-error">تعذر رفع المستندات الآن، حاول مرة أخرى.</p>
                  ) : null}
                </form>

                <section className="client-uploaded-documents" aria-labelledby="uploaded-documents-title">
                  <div className="client-uploaded-documents__head">
                    <div>
                      <span>الملفات المرفقة</span>
                      <h3 id="uploaded-documents-title">جدول المستندات المحفوظة</h3>
                    </div>
                    <strong>{uploadedDocuments.length} ملف</strong>
                  </div>

                  {documentsLoadStatus === "error" ? (
                    <p className="client-document-upload__alert is-error">تعذر تحميل الملفات المرفقة، حاول فتح القسم مرة أخرى.</p>
                  ) : null}

                  {uploadedDocuments.length ? (
                    <div className="client-uploaded-documents__table-wrap">
                      <table className="client-uploaded-documents__table">
                        <thead>
                          <tr>
                            <th scope="col">نوع المستند</th>
                            <th scope="col">تاريخ الرفع</th>
                            <th scope="col">عرض الملف</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uploadedDocuments.map((document) => (
                            <tr key={document.fileId}>
                              <td data-label="نوع المستند">{document.documentType}</td>
                              <td data-label="تاريخ الرفع">{formatDashboardDate(document.uploadedAt)}</td>
                              <td data-label="عرض الملف">
                                <a className="client-uploaded-documents__view" href={document.viewUrl} target="_blank" rel="noreferrer">
                                  <i className="fa-solid fa-eye" aria-hidden="true" />
                                  عرض الملف
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="client-uploaded-documents__empty">لا توجد ملفات مرفقة حتى الآن.</p>
                  )}
                </section>
              </div>
            ) : null}

            {isDeleteConfirmOpen ? (
              <div className="client-consultation-delete">
                <div>
                  <strong>تأكيد حذف الاستشارة من لوحة العميل</strong>
                  <p>سيتم إزالة بيانات الدخول الحالية من هذا الجهاز، ولن يتم حذف الطلب من سجلات الشركة.</p>
                </div>
                <div>
                  <button type="button" onClick={() => setIsDeleteConfirmOpen(false)}>
                    إلغاء
                  </button>
                  <button type="button" onClick={handleDeleteFromDashboard}>
                    تأكيد الحذف
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}
