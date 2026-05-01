"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const scripts = [
  "/assets/js/jquery.min.js",
  "/assets/js/bootstrap.bundle.min.js",
  "/assets/js/gsap.min.js",
  "/assets/js/ScrollSmoother.js",
  "/assets/js/gsap-scroll-to-plugin.min.js",
  "/assets/js/gsap-scroll-trigger.min.js",
  "/assets/js/gsap-split-text.min.js",
  "/assets/js/jquery.nice-select.min.js",
  "/assets/js/jquery-knob.js",
  "/assets/js/swiper.min.js",
  "/assets/js/odometer.min.js",
  "/assets/js/venobox.min.js",
  "/assets/js/appear.min.js?v=20260428-appear-guard",
  "/assets/js/wow.min.js",
  "/assets/js/meanmenu.js",
  "/assets/js/main.js?v=20260428-scroll-start"
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-bexon-src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.bexonSrc = src;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", reject, { once: true });
    document.body.appendChild(script);
  });
}

function resetInitialScrollState() {
  if (typeof window === "undefined") return;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  document.querySelectorAll(".header-sticky.sticky").forEach((element) => {
    element.classList.remove("sticky");
  });

  const backToTop = document.getElementById("tj-back-to-top");
  const backToTopPercentage = document.getElementById("tj-back-to-top-percentage");
  backToTop?.classList.remove("active");
  backToTop?.style.removeProperty("background");
  if (backToTopPercentage) {
    backToTopPercentage.innerHTML = "";
  }
}

export function BexonAssets() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    resetInitialScrollState();

    async function run() {
      for (const src of scripts) {
        if (cancelled) return;
        await loadScript(src);
      }
      window.dispatchEvent(new CustomEvent("bexon:assets-loaded"));
      window.requestAnimationFrame(resetInitialScrollState);
    }

    run().catch((error) => {
      console.error("Bexon asset loading failed", error);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
