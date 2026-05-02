"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const inquiryTopics = [
  "اختيار الخدمة المناسبة",
  "استشارة مشروع جديد",
  "متطلبات التراخيص",
  "تمويل أو قرض",
  "دراسة جدوى",
  "موعد مع مستشار"
];

export function FloatingInquiryWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const widgetRef = useRef(null);
  const textareaRef = useRef(null);
  const isClientPortal = pathname?.startsWith("/clients");

  useEffect(() => {
    if (isClientPortal && isOpen) {
      setIsOpen(false);
    }
  }, [isClientPortal, isOpen]);

  useEffect(() => {
    if (!isOpen || isClientPortal) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!widgetRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isOpen, isClientPortal]);

  useEffect(() => {
    if (isClientPortal) {
      return undefined;
    }

    const handleWidgetOpen = (event) => {
      if (event.detail !== "inquiry") {
        setIsOpen(false);
      }
    };

    window.addEventListener("green-floating-widget-open", handleWidgetOpen);

    return () => {
      window.removeEventListener("green-floating-widget-open", handleWidgetOpen);
    };
  }, [isClientPortal]);

  const closeWidget = () => {
    setIsOpen(false);
  };

  const toggleWidget = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    window.dispatchEvent(new CustomEvent("green-floating-widget-open", { detail: "inquiry" }));
  };

  const resizeTextarea = (element) => {
    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextarea(textareaRef.current);
  }, [inquiryText]);

  if (isClientPortal) {
    return null;
  }

  const handleInquiryTextChange = (event) => {
    resizeTextarea(event.currentTarget);
    setInquiryText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!phone.trim() || !inquiryText.trim()) {
      setSubmitState("error");
      setSubmitMessage("فضلاً أدخل رقم الهاتف ونص الاستفسار.");
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic: selectedInquiryTopic,
          phone,
          message: inquiryText
        })
      });

      if (!response.ok) {
        throw new Error("Unable to send inquiry");
      }

      setSubmitState("success");
      setSubmitMessage("تم إرسال الاستفسار بنجاح، سنتواصل معك قريباً.");
      setSelectedInquiryTopic("");
      setPhone("");
      setInquiryText("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage("تعذر إرسال الاستفسار الآن، حاول مرة أخرى.");
    }
  };

  return (
    <div
      className={`floating-inquiry-widget${isOpen ? " floating-inquiry-widget--open" : ""}`}
      dir="ltr"
      ref={widgetRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeWidget();
        }
      }}
    >
      <button
        className="floating-inquiry-toggle"
        type="button"
        onClick={toggleWidget}
        aria-controls="floating-inquiry-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? "إخفاء نموذج الاستفسار" : "إظهار نموذج الاستفسار"}
      >
        <i className="fa-solid fa-message" aria-hidden="true" />
        <span>استفسار</span>
      </button>
      <aside
        className="floating-inquiry-panel"
        dir="rtl"
        id="floating-inquiry-panel"
        aria-label="استفسار سريع"
        aria-hidden={!isOpen}
      >
        <div className="floating-inquiry-panel__title">
          <span>استفسار سريع</span>
          <strong>اختر موضوعًا واكتب رسالتك</strong>
        </div>
        <form className="floating-inquiry-panel__form" onSubmit={handleSubmit}>
          <p className="floating-inquiry-panel__hint">اقتراحات تساعدك تبدأ الاستفسار بسرعة</p>
          <div className="floating-inquiry-panel__topics" aria-label="اقتراحات مواضيع الاستفسار">
            {inquiryTopics.map((topic) => (
              <button
                className={`floating-inquiry-panel__topic${selectedInquiryTopic === topic ? " is-active" : ""}`}
                type="button"
                key={topic}
                onClick={() => setSelectedInquiryTopic(topic)}
                aria-pressed={selectedInquiryTopic === topic}
                tabIndex={isOpen ? undefined : -1}
              >
                {topic}
              </button>
            ))}
          </div>
          <label className="floating-inquiry-panel__label" htmlFor="floating-inquiry-phone">
            رقم الهاتف
          </label>
          <input
            id="floating-inquiry-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="مثال: 0556260392"
            autoComplete="tel"
            inputMode="tel"
            required
            tabIndex={isOpen ? undefined : -1}
          />
          <label className="floating-inquiry-panel__label" htmlFor="floating-inquiry-text">
            نص الاستفسار
          </label>
          <textarea
            id="floating-inquiry-text"
            ref={textareaRef}
            value={inquiryText}
            onChange={handleInquiryTextChange}
            onInput={(event) => resizeTextarea(event.currentTarget)}
            placeholder="اكتب استفسارك هنا..."
            rows={3}
            required
            tabIndex={isOpen ? undefined : -1}
          />
          {submitMessage ? (
            <p className={`floating-inquiry-panel__notice floating-inquiry-panel__notice--${submitState}`}>
              {submitMessage}
            </p>
          ) : null}
          <button
            className="floating-inquiry-panel__send"
            type="submit"
            disabled={submitState === "loading"}
            tabIndex={isOpen ? undefined : -1}
          >
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            {submitState === "loading" ? "جار الإرسال..." : "إرسال"}
          </button>
        </form>
      </aside>
    </div>
  );
}
