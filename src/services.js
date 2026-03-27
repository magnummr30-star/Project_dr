import './services.css'
import { buildServiceUrl, inferServiceFromText, pathMeta, servicesByPath } from './service-data.js'

const links = {
  home: '/',
  journey: '/client-journey.html',
}

const root = document.querySelector('#app')
let sceneRuntime = { cleanup: () => {} }
let promptRuntime = { cleanup: () => {} }

const copy = {
  ar: {
    direction: 'rtl',
    metaTitle: 'المستشار الذكي للخدمات | Global Experts AFZ',
    metaDescription: 'واجهة تشخيص ذكية مرسومة بصريًا بأسلوب حديث وتقود العميل مباشرة إلى الخدمة المناسبة.',
    languageLabel: 'EN',
    languageSwitchLabel: 'Switch to English',
    brand: {
      title: 'الخبراء العالميون',
      subtitle: 'AI Service Concierge',
    },
    topbar: {
      home: 'الرئيسية',
      journey: 'رحلة العميل',
      start: 'ابدأ التشخيص',
      reset: 'إعادة',
    },
    hero: {
      badge: 'منصة تشخيص ذكية',
      title: 'حدد ما يحتاجه مشروعك أو مصنعك خلال ثوانٍ',
      body: 'اكتب هدفك بلغتك العادية أو اختر من الإشارات الجاهزة، وسنقودك مباشرة إلى الخدمة الأنسب بدون تصفح مرهق.',
      tags: ['المصانع القائمة', 'الاستثمار الأخضر', 'تقارير الكربون', 'التمويل والإجراءات'],
    },
    prompt: {
      title: 'ماذا تريد أن ننجزه لك؟',
      subtitle: 'اكتب احتياجك أو التقط أحد المسارات الذكية الجاهزة',
      placeholder: 'مثال: عندي مصنع موجود وأبي أطورّه أو أحتاج تقرير كربون قبل التوسع',
      button: 'ابحث عن الخدمة المناسبة',
      tools: ['ملف', 'بيانات', 'صوت'],
      suggestions: 'إشارات سريعة',
      liveLabel: 'بدائل ذكية أثناء الكتابة',
      suggestionChip: 'اختيار مباشر',
      suggestionAction: 'اختر هذا المسار',
      routeTitle: 'الخدمات الأقرب لطلبك',
      routeHint: 'اختر خدمة واحدة فقط وسأفتح لك صفحتها مباشرة.',
    },
    flow: {
      noMatch: 'لم أحدد خدمة دقيقة من النص بعد. اختر أقرب إشارة وسأكمل معك مباشرة.',
      detectedPathPrefix: 'أفهم من وصفك أنك أقرب إلى مسار:',
      back: 'رجوع',
      redirectTitle: 'نجهز صفحة الخدمة المناسبة لك',
      redirectBody: 'سيتم تحويلك الآن إلى صفحة الخدمة مع الشرح المختصر والمستندات المطلوبة ومكان الفيديو التوضيحي.',
      openService: 'فتح صفحة الخدمة',
    },
    quickOptions: [
      { path: 'launch', label: 'أبدأ مشروعًا جديدًا' },
      { path: 'upgrade', label: 'أطور مصنعًا قائمًا' },
      { path: 'carbon', label: 'أحتاج تقريرًا أو اعتمادًا' },
      { path: 'support', label: 'أبحث عن تمويل أو إجراءات' },
    ],
    footer: 'واجهة واحدة للتشخيص، ثم صفحة مستقلة لكل خدمة.',
  },
  en: {
    direction: 'ltr',
    metaTitle: 'AI Service Concierge | Global Experts AFZ',
    metaDescription: 'A radically redesigned AI diagnosis page with a full canvas-driven visual system.',
    languageLabel: 'AR',
    languageSwitchLabel: 'Switch to Arabic',
    brand: {
      title: 'Global Experts',
      subtitle: 'AI Service Concierge',
    },
    topbar: {
      home: 'Home',
      journey: 'Client Journey',
      start: 'Start Diagnosis',
      reset: 'Reset',
    },
    hero: {
      badge: 'AI Diagnosis Platform',
      title: 'Identify what your project or factory needs in seconds',
      body: 'Describe your goal in plain language or use one of the smart signals below, and we will route you directly to the right service.',
      tags: ['Existing factories', 'Green investment', 'Carbon reports', 'Finance and procedures'],
    },
    prompt: {
      title: 'What should we solve for you?',
      subtitle: 'Type your need or choose one of the ready smart routes',
      placeholder: 'Example: I have an existing factory and want to upgrade it or need a carbon report before expansion',
      button: 'Find the right service',
      tools: ['File', 'Data', 'Voice'],
      suggestions: 'Quick signals',
      liveLabel: 'Smart alternatives while typing',
      suggestionChip: 'Direct pick',
      suggestionAction: 'Choose this route',
      routeTitle: 'Closest matching services',
      routeHint: 'Choose one service only and I will open its page directly.',
    },
    flow: {
      noMatch: 'I do not have a precise service from the text yet. Choose the closest signal and I will continue from there.',
      detectedPathPrefix: 'From your description, you seem closest to:',
      back: 'Back',
      redirectTitle: 'Preparing the right service page',
      redirectBody: 'You are now being routed to the service page with the short explanation, required documents, and video area.',
      openService: 'Open service page',
    },
    quickOptions: [
      { path: 'launch', label: 'Start a new project' },
      { path: 'upgrade', label: 'Upgrade an existing factory' },
      { path: 'carbon', label: 'Need a report or certification' },
      { path: 'support', label: 'Need finance or procedures' },
    ],
    footer: 'One diagnosis interface, then one dedicated page for every service.',
  },
}

const state = {
  lang: localStorage.getItem('ge-lang') || 'ar',
  stage: 'initial',
  pathId: '',
  input: '',
  notice: '',
  redirectTimer: null,
}

const examplePrompts = {
  ar: [
    'عندي مصنع موجود وأبي أطورّه بشكل مستدام',
    'أحتاج تقرير بصمة كربونية قبل التوسع',
    'أبي تمويل ودراسة جدوى للمشروع',
    'أبي رخص وإجراءات حكومية للمصنع',
  ],
  en: [
    'I have an existing factory and want to upgrade it sustainably',
    'I need a carbon footprint report before expansion',
    'I need financing and a feasibility study for the project',
    'I need licenses and government procedures for the factory',
  ],
}

const livePromptSuggestions = {
  generic: {
    ar: ['أبي أطور مصنع قائم', 'أحتاج تقرير كربون', 'أبي تمويل للمشروع'],
    en: ['Upgrade an existing factory', 'Need a carbon report', 'Need financing for the project'],
  },
  paths: {
    launch: {
      ar: ['عندي فكرة مشروع وأبي أحولها لخطة واضحة', 'أبحث عن أرض صناعية مناسبة', 'أبي أعرف هل المشروع مجدي'],
      en: ['I have a project idea and want a clear launch plan', 'I need a suitable industrial land option', 'I want to know if the project is feasible'],
    },
    upgrade: {
      ar: ['عندي مصنع موجود وأبي أطورّه', 'أبي أخلي المصنع أكثر استدامة', 'أحتاج تدريب عمال وكوادر للمصنع'],
      en: ['I have an existing factory and want to upgrade it', 'I want to make the factory more sustainable', 'I need workforce training and qualified staff'],
    },
    carbon: {
      ar: ['أحتاج تقرير بصمة كربونية', 'أبي حياد كربوني وخطة واضحة', 'أحتاج اعتماد أو تقرير ESG'],
      en: ['I need a carbon footprint report', 'I need a net-zero roadmap', 'I need an ESG or certification report'],
    },
    support: {
      ar: ['أبي تمويل للمشروع', 'أحتاج دراسة جدوى فنية واقتصادية', 'أبي رخص وإجراءات حكومية'],
      en: ['I need financing for the project', 'I need a technical and economic feasibility study', 'I need licenses and government procedures'],
    },
  },
  services: {
    'sustainability-conversion': {
      ar: ['أبي أخلي المصنع قائمًا لكن أكثر استدامة', 'أحتاج تحسين كفاءة المصنع وخفض الانبعاثات', 'أريد تحويل المصنع إلى نموذج مستدام'],
      en: ['I want the factory to stay operational but become more sustainable', 'I need to improve factory efficiency and reduce emissions', 'I want to convert the factory into a sustainable operation'],
    },
    'carbon-footprint': {
      ar: ['أبي تقرير بصمة كربونية واضح', 'أحتاج قياس الانبعاثات الحالية', 'أريد أعرف أين مصادر الكربون عندي'],
      en: ['I need a clear carbon footprint report', 'I need to measure current emissions', 'I want to know where the carbon sources are'],
    },
    'net-zero-report': {
      ar: ['أحتاج خارطة طريق للحياد الكربوني', 'أبي تقرير فني للوصول إلى نت زيرو', 'أريد خطة عملية للحياد الكربوني'],
      en: ['I need a net-zero roadmap', 'I need a technical report to reach net zero', 'I want a practical carbon neutrality plan'],
    },
    'green-financing': {
      ar: ['أبي تمويل للمصنع أو المشروع', 'أحتاج قرض أو تمويل أخضر', 'أريد تمويل للتوسع أو التطوير'],
      en: ['I need financing for the factory or project', 'I need a loan or green financing', 'I want funding for expansion or development'],
    },
    'feasibility-study': {
      ar: ['أبي أعرف هل المشروع يسوى', 'أحتاج دراسة جدوى فنية ومالية', 'أريد تقييم العائد المتوقع للمشروع'],
      en: ['I want to know if the project is worth it', 'I need a technical and financial feasibility study', 'I want to assess the expected return on the project'],
    },
    'government-transactions': {
      ar: ['أبي رخص وموافقات للمصنع', 'أحتاج تخليص الإجراءات الحكومية', 'أريد إنهاء المعاملات الرسمية للمشروع'],
      en: ['I need licenses and approvals for the factory', 'I need help completing government procedures', 'I want to finalize the project official transactions'],
    },
  },
}

function getCopy() {
  return copy[state.lang]
}

function promptCount() {
  return `${Math.min(state.input.length, 500)}/500`
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeSuggestionText(value = '') {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenizeSuggestionText(value = '') {
  return normalizeSuggestionText(value)
    .split(' ')
    .filter((token) => token.length > 1)
}

function scoreSuggestionMatch(query, suggestion) {
  const normalizedQuery = normalizeSuggestionText(query)
  const normalizedSuggestion = normalizeSuggestionText(suggestion)

  if (!normalizedQuery || !normalizedSuggestion) {
    return 0
  }

  if (normalizedSuggestion.includes(normalizedQuery)) {
    return 8
  }

  const queryTokens = tokenizeSuggestionText(normalizedQuery)
  if (!queryTokens.length) {
    return 0
  }

  let score = 0
  queryTokens.forEach((token) => {
    if (normalizedSuggestion.includes(token)) {
      score += token.length > 3 ? 3 : 2
    }
  })

  return score
}

function uniqueSuggestions(items) {
  const seen = new Set()

  return items.filter((item) => {
    const key = normalizeSuggestionText(item)
    if (!key || seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

function getLiveSuggestions(text) {
  const lang = state.lang
  const cleanedText = normalizeSuggestionText(text)
  const result = text.trim() ? inferServiceFromText(text) : { type: 'none' }
  const suggestions = []

  if (result.type === 'service' && livePromptSuggestions.services[result.serviceId]) {
    suggestions.push(...livePromptSuggestions.services[result.serviceId][lang])
  } else if (result.type === 'path' && livePromptSuggestions.paths[result.pathId]) {
    suggestions.push(...livePromptSuggestions.paths[result.pathId][lang])
  }

  const smartPool = uniqueSuggestions([
    ...Object.values(livePromptSuggestions.paths).flatMap((entry) => entry[lang]),
    ...Object.values(livePromptSuggestions.services).flatMap((entry) => entry[lang]),
    ...livePromptSuggestions.generic[lang],
    ...examplePrompts[lang],
  ])

  if (cleanedText) {
    const scoredMatches = smartPool
      .map((item) => ({ item, score: scoreSuggestionMatch(cleanedText, item) }))
      .filter((item) => item.score > 0)
      .sort((left, right) => right.score - left.score)
      .map((item) => item.item)

    suggestions.push(...scoredMatches)
  }

  suggestions.push(...livePromptSuggestions.generic[lang], ...examplePrompts[lang])

  return uniqueSuggestions(suggestions)
    .filter((item) => normalizeSuggestionText(item) !== cleanedText)
    .slice(0, 4)
}

function getToneColors(tone) {
  const palette = {
    launch: { stroke: 'rgba(77, 166, 101, 0.85)', glow: 'rgba(77, 166, 101, 0.18)' },
    upgrade: { stroke: 'rgba(54, 132, 220, 0.85)', glow: 'rgba(54, 132, 220, 0.18)' },
    carbon: { stroke: 'rgba(208, 160, 81, 0.9)', glow: 'rgba(208, 160, 81, 0.22)' },
    support: { stroke: 'rgba(134, 92, 255, 0.86)', glow: 'rgba(134, 92, 255, 0.2)' },
  }
  return palette[tone] || palette.support
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + width - r, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + r)
  ctx.lineTo(x + width, y + height - r)
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  ctx.lineTo(x + r, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function setupCanvasScene(canvas, focusTarget) {
  sceneRuntime.cleanup()

  if (!canvas || !focusTarget) {
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  let width = 0
  let height = 0
  let dpr = 1
  let rafId = 0

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function getNodeElements() {
    return Array.from(document.querySelectorAll('.signal-card, .route-card'))
  }

  function drawBackground(time) {
    const bg = ctx.createLinearGradient(0, 0, 0, height)
    bg.addColorStop(0, '#fcfbf9')
    bg.addColorStop(0.6, '#f8f7f3')
    bg.addColorStop(1, '#f3f1ec')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    const topGlow = ctx.createRadialGradient(width * 0.5, height * 0.12, 20, width * 0.5, height * 0.12, width * 0.34)
    topGlow.addColorStop(0, 'rgba(134, 92, 255, 0.08)')
    topGlow.addColorStop(1, 'rgba(134, 92, 255, 0)')
    ctx.fillStyle = topGlow
    ctx.fillRect(0, 0, width, height * 0.38)

    const bottomGlow = ctx.createRadialGradient(width * 0.5, height * 1.02, 10, width * 0.5, height * 1.02, width * 0.42)
    bottomGlow.addColorStop(0, 'rgba(134, 92, 255, 0.16)')
    bottomGlow.addColorStop(0.5, 'rgba(134, 92, 255, 0.04)')
    bottomGlow.addColorStop(1, 'rgba(134, 92, 255, 0)')
    ctx.fillStyle = bottomGlow
    ctx.fillRect(0, height * 0.56, width, height * 0.44)

    const softShift = reduceMotion ? 0 : Math.sin(time * 0.22) * 36
    const leftGlow = ctx.createRadialGradient(width * 0.18 + softShift, height * 0.72, 12, width * 0.18 + softShift, height * 0.72, width * 0.22)
    leftGlow.addColorStop(0, 'rgba(61, 109, 88, 0.06)')
    leftGlow.addColorStop(1, 'rgba(61, 109, 88, 0)')
    ctx.fillStyle = leftGlow
    ctx.fillRect(0, height * 0.42, width, height * 0.5)
  }

  function drawPerspectiveGrid(time) {
    const centerX = width * 0.5
    const horizon = height * 0.63
    const rows = 10
    const cols = 14
    const drift = reduceMotion ? 0 : Math.sin(time * 0.5) * 10

    ctx.save()
    ctx.strokeStyle = 'rgba(18, 27, 43, 0.035)'
    ctx.lineWidth = 1

    for (let i = -cols; i <= cols; i += 1) {
      const bottomX = centerX + i * 98 + drift
      const topX = centerX + i * 26
      ctx.beginPath()
      ctx.moveTo(bottomX, height)
      ctx.lineTo(topX, horizon)
      ctx.stroke()
    }

    for (let row = 0; row < rows; row += 1) {
      const t = row / rows
      const y = horizon + (height - horizon) * t * t
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    ctx.fillStyle = 'rgba(61, 109, 88, 0.09)'
    for (let x = 0; x < width; x += 140) {
      for (let y = horizon + 26; y < height; y += 74) {
        ctx.beginPath()
        ctx.arc(x + ((y / 18) % 22), y, 1.1, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.restore()
  }

  function drawPromptHalo(rect, time) {
    const pad = 36
    const x = rect.left - pad
    const y = rect.top - pad
    const w = rect.width + pad * 2
    const h = rect.height + pad * 2

    const glow = ctx.createRadialGradient(x + w * 0.5, y + h * 0.5, 10, x + w * 0.5, y + h * 0.5, Math.max(w, h) * 0.78)
    glow.addColorStop(0, 'rgba(134, 92, 255, 0.09)')
    glow.addColorStop(0.55, 'rgba(54, 132, 220, 0.04)')
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(x - 120, y - 120, w + 240, h + 240)

    const beamX = reduceMotion ? x + w * 0.25 : x - w * 0.15 + ((Math.sin(time * 0.7) + 1) / 2) * w * 1.3
    const beam = ctx.createLinearGradient(beamX, y, beamX + w * 0.25, y)
    beam.addColorStop(0, 'rgba(255,255,255,0)')
    beam.addColorStop(0.45, 'rgba(134,92,255,0.18)')
    beam.addColorStop(0.7, 'rgba(96,145,255,0.1)')
    beam.addColorStop(1, 'rgba(255,255,255,0)')

    ctx.save()
    roundedRect(ctx, x, y, w, h, 40)
    ctx.clip()
    ctx.fillStyle = beam
    ctx.fillRect(x, y, w, h)
    ctx.restore()

    ctx.save()
    ctx.strokeStyle = 'rgba(18, 27, 43, 0.08)'
    ctx.lineWidth = 1
    roundedRect(ctx, x + 14, y + 14, w - 28, h - 28, 28)
    ctx.stroke()
    ctx.restore()

    const corners = [
      [x, y],
      [x + w, y],
      [x, y + h],
      [x + w, y + h],
    ]

    ctx.save()
    ctx.lineWidth = 3
    corners.forEach(([cx, cy], index) => {
      const isLeft = index % 2 === 0
      const isTop = index < 2
      const grad = ctx.createLinearGradient(cx, cy, cx + (isLeft ? 90 : -90), cy + (isTop ? 90 : -90))
      grad.addColorStop(0, 'rgba(208, 160, 81, 0.82)')
      grad.addColorStop(0.5, 'rgba(61, 109, 88, 0.64)')
      grad.addColorStop(1, 'rgba(134, 92, 255, 0.32)')
      ctx.strokeStyle = grad
      ctx.beginPath()
      ctx.moveTo(cx, cy + (isTop ? 34 : -34))
      ctx.lineTo(cx, cy)
      ctx.lineTo(cx + (isLeft ? 34 : -34), cy)
      ctx.stroke()
    })
    ctx.restore()
  }

  function drawConnections(rect, nodes, time) {
    const startX = rect.left + rect.width * 0.5
    const startY = rect.top + rect.height * 0.88

    nodes.forEach((node, index) => {
      const nodeRect = node.getBoundingClientRect()
      if (!nodeRect.width || !nodeRect.height) return

      const tone = node.dataset.tone || node.dataset.path || 'support'
      const colors = getToneColors(tone)
      const endX = nodeRect.left + nodeRect.width * 0.5
      const endY = nodeRect.top + nodeRect.height * 0.5
      const bendX = startX + (endX - startX) * 0.45
      const bendY = startY + (reduceMotion ? 0 : Math.sin(time * 1.2 + index) * 14)

      ctx.save()
      ctx.lineWidth = 1.6
      ctx.strokeStyle = colors.stroke.replace(/0\.85|0\.9|0\.86/, '0.22')
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(bendX, bendY, endX, endY)
      ctx.stroke()

      ctx.fillStyle = colors.glow
      ctx.beginPath()
      ctx.arc(endX, endY, 9, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = colors.stroke.replace(/0\.85|0\.9|0\.86/, '0.88')
      ctx.beginPath()
      ctx.arc(endX, endY, 3.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }

  function drawOrbitLines(rect, time) {
    const centerX = rect.left + rect.width * 0.5
    const centerY = rect.top + rect.height * 0.5
    const radiusX = rect.width * 0.62
    const radiusY = rect.height * 0.72

    ctx.save()
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(134, 92, 255, 0.08)'
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, Math.PI * 0.08, Math.PI * 0.92)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(centerX, centerY, radiusX * 0.82, radiusY * 0.48, 0, Math.PI * 1.08, Math.PI * 1.92)
    ctx.stroke()
    ctx.restore()

    const movingDotAngle = reduceMotion ? Math.PI * 0.22 : ((time * 0.38) % 1) * Math.PI * 0.84 + Math.PI * 0.08
    const dotX = centerX + Math.cos(movingDotAngle) * radiusX
    const dotY = centerY + Math.sin(movingDotAngle) * radiusY
    ctx.fillStyle = 'rgba(208, 160, 81, 0.78)'
    ctx.beginPath()
    ctx.arc(dotX, dotY, 3.4, 0, Math.PI * 2)
    ctx.fill()
  }

  function drawScene(time) {
    ctx.clearRect(0, 0, width, height)
    drawBackground(time)
    drawPerspectiveGrid(time)

    const rect = focusTarget.getBoundingClientRect()
    if (rect.width && rect.height) {
      drawOrbitLines(rect, time)
      drawPromptHalo(rect, time)
      drawConnections(rect, getNodeElements(), time)
    }
  }

  function resizeHandler() {
    resizeCanvas()
    drawScene(performance.now() / 1000)
  }

  function scrollHandler() {
    if (reduceMotion) {
      drawScene(performance.now() / 1000)
    }
  }

  function tick(timestamp) {
    drawScene(timestamp / 1000)
    if (!reduceMotion) {
      rafId = window.requestAnimationFrame(tick)
    }
  }

  resizeCanvas()
  drawScene(performance.now() / 1000)

  if (!reduceMotion) {
    rafId = window.requestAnimationFrame(tick)
  }

  window.addEventListener('resize', resizeHandler)
  window.addEventListener('scroll', scrollHandler, { passive: true })

  sceneRuntime.cleanup = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId)
    }
    window.removeEventListener('resize', resizeHandler)
    window.removeEventListener('scroll', scrollHandler)
    sceneRuntime = { cleanup: () => {} }
  }
}

function quickPathCards(langCopy) {
  return langCopy.quickOptions
    .map(({ path, label }) => {
      const meta = pathMeta[path][state.lang]

      return `
        <button class="signal-card" type="button" data-path="${path}" data-tone="${path}">
          <div class="signal-card-top">
            <span class="signal-chip">${langCopy.prompt.suggestionChip}</span>
            <span class="signal-arrow" aria-hidden="true">${state.lang === 'ar' ? '←' : '→'}</span>
          </div>
          <strong>${label}</strong>
          <small>${meta.short}</small>
          <b>${langCopy.prompt.suggestionAction}</b>
        </button>
      `
    })
    .join('')
}

function serviceChoiceCards(langCopy) {
  return servicesByPath[state.pathId]
    .map(
      (service) => `
        <button class="route-card" type="button" data-service="${service.id}" data-tone="${service.path}">
          <div class="route-card-top">
            <span class="route-card-num">${service.num}</span>
            <small>${pathMeta[service.path][state.lang].label}</small>
          </div>
          <strong>${service.title[state.lang]}</strong>
          <span>${service.short[state.lang]}</span>
          <b>${langCopy.flow.openService}</b>
        </button>
      `,
    )
    .join('')
}

function liveSuggestionCards(langCopy) {
  const suggestions = getLiveSuggestions(state.input)

  return `
    <div class="live-panel js-live-panel ${state.input.trim() ? 'is-live' : ''}">
      <div class="live-panel-head">
        <span class="live-panel-dot" aria-hidden="true"></span>
        <strong>${langCopy.prompt.liveLabel}</strong>
      </div>
      <div class="live-panel-grid js-live-suggestions">
        ${suggestions
          .map(
            (item) => `
              <button class="alt-chip" type="button" data-alt-prompt="${escapeHtml(item)}">
                <span class="alt-chip-label">${escapeHtml(item)}</span>
                <span class="alt-chip-arrow" aria-hidden="true">${state.lang === 'ar' ? '←' : '→'}</span>
              </button>
            `,
          )
          .join('')}
      </div>
    </div>
  `
}

function goToService(serviceId) {
  clearTimeout(state.redirectTimer)
  state.stage = 'redirecting'
  render()
  state.redirectTimer = setTimeout(() => {
    window.location.href = buildServiceUrl(serviceId)
  }, 700)
}

function setPath(pathId, notice = '') {
  state.stage = 'clarify'
  state.pathId = pathId
  state.notice = notice
  render()
}

function resetFlow() {
  clearTimeout(state.redirectTimer)
  state.stage = 'initial'
  state.pathId = ''
  state.input = ''
  state.notice = ''
  render()
}

function handleAnalysis() {
  const langCopy = getCopy()

  if (!state.input.trim()) {
    state.notice = langCopy.flow.noMatch
    render()
    return
  }

  const result = inferServiceFromText(state.input)

  if (result.type === 'service') {
    goToService(result.serviceId)
    return
  }

  if (result.type === 'path') {
    const notice = `${langCopy.flow.detectedPathPrefix} ${pathMeta[result.pathId][state.lang].label}`
    setPath(result.pathId, notice)
    return
  }

  state.notice = langCopy.flow.noMatch
  render()
}

function bindEvents() {
  document.querySelectorAll('.lang-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar'
      localStorage.setItem('ge-lang', state.lang)
      render()
    })
  })

  document.querySelector('.composer-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    handleAnalysis()
  })

  const input = document.querySelector('.composer-input')
  if (input) {
    input.value = state.input
    input.addEventListener('input', (event) => {
      state.input = event.target.value
      const counter = document.querySelector('.js-prompt-count')
      if (counter) {
        counter.textContent = promptCount()
      }
    })
  }

  document.querySelectorAll('[data-path]').forEach((button) => {
    button.addEventListener('click', () => {
      setPath(button.dataset.path)
    })
  })

  document.querySelectorAll('[data-service]').forEach((button) => {
    button.addEventListener('click', () => {
      goToService(button.dataset.service)
    })
  })

  document.querySelectorAll('.js-back').forEach((button) => {
    button.addEventListener('click', () => {
      state.stage = 'initial'
      state.pathId = ''
      state.notice = ''
      render()
    })
  })

  document.querySelectorAll('.js-reset').forEach((button) => {
    button.addEventListener('click', resetFlow)
  })
}

function renderInitialPanel(langCopy) {
  return `
    ${state.notice ? `<div class="signal-notice">${state.notice}</div>` : ''}
    <form class="composer-form">
      <div class="composer-shell">
        <div class="composer-ghost js-ghost-examples" aria-hidden="true">
          <span class="ghost-badge">${state.lang === 'ar' ? 'مثال حي' : 'Live example'}</span>
          <span class="ghost-text js-ghost-text"></span>
          <span class="ghost-cursor" aria-hidden="true"></span>
        </div>
        <textarea class="composer-input" rows="5" maxlength="500" placeholder="${langCopy.prompt.placeholder}"></textarea>
      </div>
      ${liveSuggestionCards(langCopy)}
      <div class="composer-actions">
        <div class="composer-tools" aria-hidden="true">
          ${langCopy.prompt.tools.map((item) => `<span class="tool-node">${item}</span>`).join('')}
          <span class="counter-node js-prompt-count">${promptCount()}</span>
        </div>
        <button class="search-button" type="submit">
          <span class="search-button-icon" aria-hidden="true">${state.lang === 'ar' ? '←' : '→'}</span>
          <span>${langCopy.prompt.button}</span>
        </button>
      </div>
    </form>
    <div class="signals-head">${langCopy.prompt.suggestions}</div>
    <div class="signals-grid">
      ${quickPathCards(langCopy)}
    </div>
  `
}

function setupPromptEnhancements() {
  promptRuntime.cleanup()

  if (state.stage !== 'initial') {
    return
  }

  const input = document.querySelector('.composer-input')
  const ghost = document.querySelector('.js-ghost-examples')
  const ghostText = document.querySelector('.js-ghost-text')
  const livePanel = document.querySelector('.js-live-panel')
  const liveGrid = document.querySelector('.js-live-suggestions')
  const counter = document.querySelector('.js-prompt-count')

  if (!input || !ghost || !ghostText || !livePanel || !liveGrid) {
    return
  }

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  const prompts = examplePrompts[state.lang]
  let typingTimer = 0
  let cycleTimer = 0
  let currentIndex = 0
  let disposed = false

  function clearTimers() {
    window.clearTimeout(typingTimer)
    window.clearTimeout(cycleTimer)
  }

  function renderLivePanel() {
    const suggestions = getLiveSuggestions(input.value)
    livePanel.classList.toggle('is-live', Boolean(input.value.trim()))
    liveGrid.innerHTML = suggestions
      .map(
        (item) => `
          <button class="alt-chip" type="button" data-alt-prompt="${escapeHtml(item)}">
            <span class="alt-chip-label">${escapeHtml(item)}</span>
            <span class="alt-chip-arrow" aria-hidden="true">${state.lang === 'ar' ? '←' : '→'}</span>
          </button>
        `,
      )
      .join('')
  }

  function syncGhostVisibility() {
    ghost.classList.toggle('is-hidden', Boolean(input.value.trim()))
  }

  function syncCounter() {
    if (counter) {
      counter.textContent = `${Math.min(input.value.length, 500)}/500`
    }
  }

  function typePrompt(promptText, charIndex = 0) {
    if (disposed || input.value.trim()) {
      syncGhostVisibility()
      return
    }

    ghost.classList.remove('is-hidden')

    if (prefersReducedMotion) {
      ghostText.textContent = promptText
      cycleTimer = window.setTimeout(() => {
        currentIndex = (currentIndex + 1) % prompts.length
        typePrompt(prompts[currentIndex], 0)
      }, 2600)
      return
    }

    ghostText.textContent = promptText.slice(0, charIndex)

    if (charIndex < promptText.length) {
      typingTimer = window.setTimeout(() => typePrompt(promptText, charIndex + 1), 34)
      return
    }

    cycleTimer = window.setTimeout(() => {
      if (disposed || input.value.trim()) {
        syncGhostVisibility()
        return
      }

      ghost.classList.add('is-fading')
      cycleTimer = window.setTimeout(() => {
        ghost.classList.remove('is-fading')
        ghostText.textContent = ''
        currentIndex = (currentIndex + 1) % prompts.length
        typePrompt(prompts[currentIndex], 0)
      }, 260)
    }, 1550)
  }

  function startGhostLoop() {
    clearTimers()
    if (input.value.trim()) {
      syncGhostVisibility()
      return
    }

    ghostText.textContent = ''
    currentIndex %= prompts.length
    typePrompt(prompts[currentIndex], 0)
  }

  function handleComposerInput() {
    state.input = input.value
    syncCounter()
    syncGhostVisibility()
    renderLivePanel()

    if (!input.value.trim()) {
      startGhostLoop()
    } else {
      clearTimers()
      ghost.classList.remove('is-fading')
    }
  }

  function handleSuggestionClick(event) {
    const button = event.target.closest('[data-alt-prompt]')
    if (!button) {
      return
    }

    const nextPrompt = button.dataset.altPrompt || ''
    input.value = nextPrompt
    state.input = nextPrompt
    syncCounter()
    syncGhostVisibility()
    renderLivePanel()
    clearTimers()
    ghost.classList.remove('is-fading')
    input.focus()
    input.setSelectionRange(nextPrompt.length, nextPrompt.length)
  }

  input.addEventListener('input', handleComposerInput)
  liveGrid.addEventListener('click', handleSuggestionClick)

  syncCounter()
  renderLivePanel()
  startGhostLoop()

  promptRuntime.cleanup = () => {
    disposed = true
    clearTimers()
    input.removeEventListener('input', handleComposerInput)
    liveGrid.removeEventListener('click', handleSuggestionClick)
    promptRuntime = { cleanup: () => {} }
  }
}

function renderClarifyPanel(langCopy) {
  return `
    <div class="routes-panel">
      <div class="routes-copy">
        <span class="routes-chip">${pathMeta[state.pathId][state.lang].label}</span>
        <strong>${langCopy.prompt.routeTitle}</strong>
        <p>${langCopy.prompt.routeHint}</p>
      </div>
      ${state.notice ? `<div class="signal-notice">${state.notice}</div>` : ''}
      <div class="routes-grid">
        ${serviceChoiceCards(langCopy)}
      </div>
      <div class="routes-actions">
        <button class="ghost-button js-back" type="button">${langCopy.flow.back}</button>
        <button class="ghost-button js-reset" type="button">${langCopy.topbar.reset}</button>
      </div>
    </div>
  `
}

function renderRedirectPanel(langCopy) {
  return `
    <div class="redirect-panel">
      <div class="redirect-core" aria-hidden="true"></div>
      <strong>${langCopy.flow.redirectTitle}</strong>
      <p>${langCopy.flow.redirectBody}</p>
    </div>
  `
}

function render() {
  const langCopy = getCopy()

  promptRuntime.cleanup()
  sceneRuntime.cleanup()

  document.documentElement.lang = state.lang
  document.documentElement.dir = langCopy.direction
  document.body.className = state.lang === 'ar' ? 'is-rtl' : 'is-ltr'
  document.title = langCopy.metaTitle
  document.querySelector('meta[name="description"]')?.setAttribute('content', langCopy.metaDescription)

  root.innerHTML = `
    <div class="canvas-page">
      <canvas class="scene-canvas" aria-hidden="true"></canvas>

      <div class="ui-layer">
        <header class="hud-bar">
          <div class="hud-start">
            <a class="hud-cta" href="#prompt-dock">${langCopy.topbar.start}</a>
            <button class="lang-toggle hud-pill" type="button" aria-label="${langCopy.languageSwitchLabel}">
              ${langCopy.languageLabel}
            </button>
          </div>

          <nav class="hud-nav" aria-label="Primary">
            <a href="${links.home}">${langCopy.topbar.home}</a>
            <a href="${links.journey}">${langCopy.topbar.journey}</a>
          </nav>

          <a class="brand-lockup" href="${links.home}">
            <img src="/logo.png" alt="Logo" />
            <span>
              <strong>${langCopy.brand.title}</strong>
              <small>${langCopy.brand.subtitle}</small>
            </span>
          </a>
        </header>

        <main class="hero-shell">
          <span class="hero-kicker">${langCopy.hero.badge}</span>
          <h1>${langCopy.hero.title}</h1>
          <p>${langCopy.hero.body}</p>

          <div class="hero-tags">
            ${langCopy.hero.tags.map((item) => `<span>${item}</span>`).join('')}
          </div>

          <section class="prompt-dock" id="prompt-dock">
            <div class="dock-head">
              <div class="dock-status">
                <span class="dock-status-dot"></span>
                <strong>${langCopy.prompt.title}</strong>
              </div>
              <button class="ghost-button js-reset" type="button">${langCopy.topbar.reset}</button>
            </div>
            <div class="dock-subtitle">${langCopy.prompt.subtitle}</div>

            ${
              state.stage === 'redirecting'
                ? renderRedirectPanel(langCopy)
                : state.stage === 'clarify'
                  ? renderClarifyPanel(langCopy)
                  : renderInitialPanel(langCopy)
            }
          </section>

          <footer class="hero-foot">
            <p>${langCopy.footer}</p>
          </footer>
        </main>
      </div>
    </div>
  `

  bindEvents()
  setupPromptEnhancements()
  setupCanvasScene(document.querySelector('.scene-canvas'), document.querySelector('.prompt-dock'))
}

render()
