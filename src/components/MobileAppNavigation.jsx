"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function MobileAppNavigation({ title, subtitle, links }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.classList.add("mobile-app-menu-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("mobile-app-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const portalContent = (
    <div className={`mobile-app-menu${isOpen ? " is-open" : ""}`} aria-hidden={!isOpen}>
      <button className="mobile-app-menu__backdrop" type="button" onClick={closeMenu} aria-label="إغلاق القائمة" />
      <aside className="mobile-app-menu__drawer" dir="rtl" role="dialog" aria-modal="true" aria-label="قائمة الموقع">
        <div className="mobile-app-menu__head">
          <img src="/images/logo.jpeg" alt="" />
          <div>
            <strong>{title}</strong>
            {subtitle ? <span>{subtitle}</span> : null}
          </div>
          <button type="button" onClick={closeMenu} aria-label="إغلاق القائمة">
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <nav className="mobile-app-menu__links" aria-label="روابط التطبيق">
          {links.map((link) => (
            <a href={link.href} key={`${link.href}-${link.label}`} onClick={closeMenu}>
              <i className={link.icon} aria-hidden="true" />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );

  return (
    <>
      <button
        className="mobile-app-menu-button"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="فتح قائمة الموقع"
        aria-expanded={isOpen}
      >
        <i className="fa-solid fa-bars" aria-hidden="true" />
      </button>
      {isMounted ? createPortal(portalContent, document.body) : null}
    </>
  );
}
