"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const contactItems = [
  {
    label: "رقم الاتصال",
    value: "05013646355",
    href: "tel:05013646355",
    icon: "fa-solid fa-phone",
    type: "phone",
    order: 1
  },
  {
    label: "رقم الواتساب",
    value: "0556260392",
    href: "https://wa.me/971556260392",
    icon: "fa-brands fa-whatsapp",
    type: "whatsapp",
    order: 2
  },
  {
    label: "رقم الشركة",
    value: "065613114",
    href: "tel:065613114",
    icon: "fa-solid fa-building",
    type: "company",
    order: 3
  },
  {
    label: "بريد الشركة",
    value: "info@globalgreenconsults.com",
    href: "mailto:info@globalgreenconsults.com",
    icon: "fa-solid fa-envelope",
    type: "email",
    order: 4
  }
];

export function FloatingContactBanner() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

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

  const closeBanner = () => {
    setIsOpen(false);
  };

  if (isClientPortal) {
    return null;
  }

  return (
    <div
      className={`floating-contact-widget${isOpen ? " floating-contact-widget--open" : ""}`}
      dir="ltr"
      ref={widgetRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeBanner();
        }
      }}
    >
      <aside
        className="floating-contact-banner"
        dir="rtl"
        id="floating-contact-panel"
        aria-label="تواصل معنا"
        aria-hidden={!isOpen}
      >
        <div className="floating-contact-banner__title">
          <span>تواصل معنا</span>
          <strong>اختر طريقة التواصل المناسبة</strong>
        </div>
        <div className="floating-contact-banner__actions">
          {contactItems.map((item) => (
            <a
              className={`floating-contact-banner__link floating-contact-banner__link--${item.type}`}
              href={item.href}
              key={item.label}
              style={{ order: item.order }}
              target={item.type === "whatsapp" ? "_blank" : undefined}
              rel={item.type === "whatsapp" ? "noopener noreferrer" : undefined}
              tabIndex={isOpen ? undefined : -1}
              aria-label={`${item.label}: ${item.value}`}
            >
              <i className={item.icon} aria-hidden="true" />
              <span>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </span>
            </a>
          ))}
        </div>
      </aside>
      <button
        className="floating-contact-toggle"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-controls="floating-contact-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? "إخفاء بيانات التواصل" : "إظهار بيانات التواصل"}
      >
        <i className="fa-solid fa-headset" aria-hidden="true" />
        <span>تواصل معنا</span>
      </button>
    </div>
  );
}
