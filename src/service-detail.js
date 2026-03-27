import './service-detail.css'
import { pathMeta, serviceMap, services } from './service-data.js'

const root = document.querySelector('#app')

const links = {
  home: '/',
  journey: '/client-journey.html',
  ai: '/services.html',
  form: 'https://docs.google.com/forms/d/e/1FAIpQLSdF-cZ9FO45KtenzhERzZpSnEwC-zr1NdwhWgdCETu9UoOZYw/viewform',
  whatsapp: 'https://wa.me/971589120603',
}

const copy = {
  ar: {
    direction: 'rtl',
    fallbackTitle: 'الخدمة غير موجودة',
    fallbackBody: 'لم نتمكن من العثور على الخدمة المطلوبة. يمكنك العودة إلى شاشة التشخيص الذكي واختيار الخدمة من جديد.',
    metaSuffix: 'تفاصيل الخدمة',
    languageLabel: 'EN',
    languageSwitchLabel: 'Switch to English',
    nav: {
      ai: 'التشخيص الذكي',
      home: 'الرئيسية',
      journey: 'رحلة العميل',
    },
    labels: {
      back: 'العودة للتشخيص',
      explainer: 'شرح الخدمة',
      when: 'متى تحتاج هذه الخدمة؟',
      gain: 'ماذا ستحصل منها؟',
      next: 'ما الخطوة التالية؟',
      video: 'الفيديو التوضيحي',
      documents: 'المستندات المطلوبة',
      docsNote:
        'هذه قائمة أولية للمراجعة السريعة. قد يطلب الفريق مستندات إضافية حسب طبيعة المشروع أو الجهة المالكة.',
      primary: 'ابدأ الطلب الآن',
      secondary: 'تواصل واتساب',
      related: 'رابط مباشر لهذه الخدمة',
    },
  },
  en: {
    direction: 'ltr',
    fallbackTitle: 'Service Not Found',
    fallbackBody: 'We could not find the requested service. You can return to the AI diagnosis screen and select the service again.',
    metaSuffix: 'Service Detail',
    languageLabel: 'AR',
    languageSwitchLabel: 'Switch to Arabic',
    nav: {
      ai: 'AI Diagnosis',
      home: 'Home',
      journey: 'Client Journey',
    },
    labels: {
      back: 'Back to diagnosis',
      explainer: 'Service Overview',
      when: 'When do you need this service?',
      gain: 'What do you gain from it?',
      next: 'What is the next step?',
      video: 'Explainer Video',
      documents: 'Required Documents',
      docsNote:
        'This is an initial checklist for fast review. The team may request more documents depending on the project and ownership structure.',
      primary: 'Start the request',
      secondary: 'WhatsApp',
      related: 'Direct link for this service',
    },
  },
}

const state = {
  lang: localStorage.getItem('ge-lang') || 'ar',
}

function getCopy() {
  return copy[state.lang]
}

function getService() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('service')
  return serviceMap[id] || services[0]
}

function renderVideo(service, langCopy) {
  if (service.video.embed) {
    return `
      <div class="video-frame">
        <iframe
          src="${service.video.embed}"
          title="${service.video.title[state.lang]}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `
  }

  return `
    <div class="video-frame video-frame-placeholder" style="background-image: url('${service.video.poster}')">
      <div class="video-overlay">
        <div class="play-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="video-copy">
          <strong>${service.video.title[state.lang]}</strong>
          <p>${service.video.hint[state.lang]}</p>
        </div>
      </div>
    </div>
  `
}

function bindEvents() {
  document.querySelectorAll('.lang-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar'
      localStorage.setItem('ge-lang', state.lang)
      render()
    })
  })

  document.querySelector('.js-copy-link')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      const button = document.querySelector('.js-copy-link')
      if (button) {
        button.dataset.done = 'true'
        setTimeout(() => {
          button.dataset.done = 'false'
        }, 1400)
      }
    } catch {
      // ignore clipboard failures
    }
  })
}

function render() {
  const langCopy = getCopy()
  const service = getService()
  const path = pathMeta[service.path][state.lang]

  document.documentElement.lang = state.lang
  document.documentElement.dir = langCopy.direction
  document.body.className = state.lang === 'ar' ? 'is-rtl' : 'is-ltr'
  document.title = `${service.title[state.lang]} | ${langCopy.metaSuffix}`
  document.querySelector('meta[name="description"]')?.setAttribute('content', service.short[state.lang])

  root.innerHTML = `
    <div class="service-page">
      <div class="service-orb service-orb-a" aria-hidden="true"></div>
      <div class="service-orb service-orb-b" aria-hidden="true"></div>

      <header class="service-topbar">
        <div class="topbar-start">
          <a class="brand-link" href="${links.home}">
            <img src="/logo.png" alt="Logo" />
            <span>
              <strong>${state.lang === 'ar' ? 'الخبراء العالميون' : 'Global Experts'}</strong>
              <small>${path.label}</small>
            </span>
          </a>
        </div>
        <nav class="topbar-actions" aria-label="Quick links">
          <a class="topbar-link" href="${links.ai}">${langCopy.nav.ai}</a>
          <a class="topbar-link" href="${links.home}">${langCopy.nav.home}</a>
          <a class="topbar-link" href="${links.journey}">${langCopy.nav.journey}</a>
          <button class="lang-toggle" type="button" aria-label="${langCopy.languageSwitchLabel}">
            <span>${langCopy.languageLabel}</span>
          </button>
        </nav>
      </header>

      <main class="service-main">
        <section class="service-hero panel">
          <div class="service-copy">
            <a class="back-link" href="${links.ai}">${langCopy.labels.back}</a>
            <div class="service-badges">
              <span class="service-num">${service.num}</span>
              <span class="service-path">${path.label}</span>
            </div>
            <h1>${service.title[state.lang]}</h1>
            <p>${service.short[state.lang]}</p>

            <div class="service-facts">
              <article class="fact-card">
                <small>${langCopy.labels.when}</small>
                <strong>${service.when[state.lang]}</strong>
              </article>
              <article class="fact-card">
                <small>${langCopy.labels.gain}</small>
                <strong>${service.gain[state.lang]}</strong>
              </article>
              <article class="fact-card">
                <small>${langCopy.labels.next}</small>
                <strong>${service.nextStep[state.lang]}</strong>
              </article>
            </div>

            <div class="service-actions">
              <a class="button primary" href="${links.form}" target="_blank" rel="noreferrer">${langCopy.labels.primary}</a>
              <a class="button secondary" href="${links.whatsapp}" target="_blank" rel="noreferrer">${langCopy.labels.secondary}</a>
            </div>
          </div>

          <div class="service-video-card">
            <span class="section-kicker">${langCopy.labels.video}</span>
            ${renderVideo(service, langCopy)}
          </div>
        </section>

        <section class="docs-panel panel">
          <div class="docs-head">
            <div>
              <span class="section-kicker">${langCopy.labels.documents}</span>
              <h2>${service.title[state.lang]}</h2>
            </div>
            <button class="copy-link js-copy-link" type="button" data-done="false">
              <span>${langCopy.labels.related}</span>
            </button>
          </div>

          <div class="docs-grid">
            ${service.documents[state.lang]
              .map(
                (item, index) => `
                  <article class="doc-card">
                    <span class="doc-num">${index + 1}</span>
                    <p>${item}</p>
                  </article>
                `,
              )
              .join('')}
          </div>

          <p class="docs-note">${langCopy.labels.docsNote}</p>
        </section>
      </main>
    </div>
  `

  bindEvents()
}

render()
