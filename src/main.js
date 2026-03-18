import './style.css'

const links = {
  form: 'https://docs.google.com/forms/d/e/1FAIpQLSdF-cZ9FO45KtenzhERzZpSnEwC-zr1NdwhWgdCETu9UoOZYw/viewform',
  whatsapp: 'https://wa.me/971589120603',
  email: 'mailto:info@globalgreenconsults.com',
  brochure: '/brochure.pdf',
}

function initCarbonCalculator() {
  const form = document.querySelector('.carbon-form')
  if (!form) return

  const totalEl = form.querySelector('[data-carbon-total]')
  const reductionEl = form.querySelector('[data-carbon-reduction]')
  const valueEl = form.querySelector('[data-carbon-value]')
  const result = form.querySelector('.carbon-result')

  const unitFactors = { kwh: 0.00042, liter: 0.00268, ton: 0.31 }
  const sectorFactors = { manufacturing: 1.16, logistics: 1.08, food: 0.94, realestate: 0.72 }

  const formatNumber = (value, digits = 1) =>
    new Intl.NumberFormat(state.lang === 'ar' ? 'ar' : 'en-US', { maximumFractionDigits: digits }).format(value)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const consumption = Number(form.consumption.value || 0)
    const unit = form.unit.value
    const sector = form.sector.value
    if (!consumption || !unitFactors[unit] || !sectorFactors[sector]) return

    const annualEmission = consumption * unitFactors[unit] * sectorFactors[sector]
    const potentialReduction = annualEmission * 0.18
    const estimatedValue = potentialReduction * 110

    totalEl.textContent = `${formatNumber(annualEmission)} ${state.lang === 'ar' ? 'طن CO₂e/سنة' : 'tCO₂e/year'}`
    reductionEl.textContent = `${formatNumber(potentialReduction)} ${state.lang === 'ar' ? 'طن' : 'tons'}`
    valueEl.textContent = `${formatNumber(estimatedValue, 0)} ${state.lang === 'ar' ? 'درهم' : 'AED'}`
    result.classList.add('is-visible')
  })
}

const serviceIcons = [
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="14" width="28" height="20" rx="3"/><path d="M6 20h28M14 14V8a6 6 0 0 1 12 0v6"/></svg>`,
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="20" r="14"/><path d="M14 20l4 4 8-8"/></svg>`,
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 32V16l12-8 12 8v16"/><path d="M16 32v-8h8v8"/></svg>`,
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 8h24v24H8z"/><path d="M8 16h24M16 8v24"/></svg>`,
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6v28M12 12l8-6 8 6M10 34h20"/><circle cx="20" cy="20" r="4"/></svg>`,
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 30l8-8 6 6 8-12 6 6"/><rect x="6" y="6" width="28" height="28" rx="3"/></svg>`,
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 34V18l10-12 10 12v16"/><circle cx="20" cy="24" r="4"/></svg>`,
  `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="12" r="6"/><path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12"/></svg>`,
]

const translations = {
  ar: {
    direction: 'rtl',
    languageLabel: 'EN',
    languageSwitchLabel: 'Switch to English',
    metaTitle: 'Global Experts AFZ | الاستشارات الخضراء والتنمية الصناعية',
    metaDescription:
      'موقع احترافي لشركة Global Experts for Industrial Development and Green Consultations AFZ يبرز الحلول الصناعية الخضراء، الحياد الكربوني، والتقارير والاستشارات التنفيذية.',
    brand: {
      arabic: 'الخبراء العالميون للتنمية الصناعية والاستشارات الخضراء',
      english: 'Global Experts for Industrial Development and Green Consultations AFZ',
      tagline: 'هندسة المستقبل الأخضر حيث تلتقي الكفاءة الألمانية بالريادة الخليجية.',
    },
    nav: {
      services: 'الخدمات',
      journey: 'الرحلة',
      impact: 'الأثر',
      contact: 'التواصل',
    },
    hero: {
      eyebrow: 'German Technology Transfer | Carbon Neutrality | ESG Ratings | UAE & GCC',
      title: 'نحو صناعة خضراء أكثر ربحية وأعلى جاهزية عالميًا',
      description:
        'نحوّل متطلبات الاستدامة والحياد الكربوني إلى قيمة استثمارية ملموسة من خلال حلول صناعية متكاملة، نقل وتوطين التكنولوجيا الألمانية، وتمكين المشاريع من الاستفادة من الحوافز المالية وحوافز الكربون.',
      primaryCta: 'ابدأ طلبك الآن',
      secondaryCta: 'واتساب مباشر',
      tertiaryCta: 'تنزيل الدليل',
      notes: ['تقنيات ألمانية', 'ESG & Carbon', 'جاهزية للتصدير'],
      stats: [
        { value: '150+', label: 'مشروع تم تنفيذه بنجاح' },
        { value: '24h', label: 'مراجعة أولية خلال يوم عمل واحد' },
        { value: '12+', label: 'سنة خبرة في القطاع الأخضر' },
      ],
      trust: ['تمويل مرن', 'أرصدة كربون', 'حلول تشغيلية', 'تقارير دولية'],
    },
    about: {
      kicker: 'من نحن',
      title: 'شريك تنفيذي واستشاري يقود التحول الأخضر من الفرصة إلى العائد',
      description:
        'نقدّم حلولًا شاملة للمشاريع العقارية والتجارية والصناعية في الإمارات ودول الخليج، وندير المسار بالكامل من تحديد الفرصة والجدوى واختيار التكنولوجيا والأرض المناسبة، حتى التنفيذ والتقارير والجاهزية التصديرية.',
    },
    pillars: [
      {
        title: 'حلول تنفيذية متكاملة',
        description: 'ندير المشروع كمنظومة واحدة: دراسة، تصميم، تمويل، تشغيل، وقياس أثر.',
      },
      {
        title: 'امتياز لنقل التكنولوجيا الألمانية',
        description: 'شبكة خبراء وتقنيات صناعية متقدمة تمنح المشروع جودة أعلى وتسريعًا في التنفيذ.',
      },
      {
        title: 'ربحية الاستدامة',
        description: 'الامتثال البيئي هنا ليس تكلفة فقط، بل باب لتحسين الربحية وخفض الهدر وفتح الحوافز.',
      },
      {
        title: 'اعتمادات وتقارير عالمية',
        description: 'تقارير كربون وESG وشهادات ترفع الثقة، الجاهزية التنظيمية، والوصول إلى الأسواق.',
      },
    ],
    services: {
      kicker: 'الخدمات الأساسية',
      title: 'خدمات مصممة للمستثمرين والمصانع والمشاريع التي تستهدف الاستدامة المربحة',
      description:
        'اعتمدنا على نموذج التسجيل الرسمي لتصميم هيكل خدمات واضح يترجم احتياجات العميل إلى مسار تنفيذي قابل للقياس.',
      cards: [
        { title: 'أراضٍ صناعية متوافقة', description: 'تحديد وترتيب أراضٍ مناسبة للمنشآت الخضراء المتوافقة مع معايير الحياد الكربوني.' },
        { title: 'تحويل رأس المال إلى مشروع', description: 'بناء مشروع أخضر قابل للتنفيذ انطلاقًا من رأس المال المتاح والفرصة الاستثمارية المناسبة.' },
        { title: 'من الرؤية إلى المصنع', description: 'تحويل رؤية المشروع إلى دراسة وخطة تقنية وتشغيلية واضحة من الصفر.' },
        { title: 'تحويل المصانع القائمة', description: 'تحديث المصانع العاملة لتصبح أكثر استدامة وكفاءة وربحية وامتثالًا للأسواق الحديثة.' },
        { title: 'تقارير الكربون وESG', description: 'إعداد تقارير البصمة الكربونية والحياد الكربوني والحوكمة البيئية والاجتماعية.' },
        { title: 'تمويلات وحوافز', description: 'الوصول إلى قروض وتمويلات بشروط ميسرة لتحديث المعدات أو التوسع الصناعي.' },
        { title: 'جدوى فنية واقتصادية', description: 'دراسات جدوى وحلول هندسية وخطوط إنتاج تراعي متطلبات الاستدامة والامتثال.' },
        { title: 'تدريب وتأهيل الكفاءات', description: 'تدريب العمال والفنيين وتوفير الكفاءات الإدارية والتشغيلية المتوافقة مع المعايير.' },
      ],
      extras: [
        'تسجيل أرصدة الكربون',
        'المعاملات الحكومية',
        'استشارات متخصصة',
        'تطوير المعدات',
        'حلول الامتثال',
        'التوسع منخفض الانبعاثات',
      ],
    },
    ticker: [
      'German Technology', 'Carbon Credits', 'Industrial Land', 'ESG Ratings',
      'Green Factory', 'Export Readiness', 'Operational Efficiency', 'Government Transactions',
    ],
    showcase: {
      kicker: 'مشاهد من المنظومة',
      title: 'صور أكثر ارتباطًا بالمجال نفسه وبنمط العرض التنفيذي',
      description:
        'أضفنا مشاهد بصرية تعرض القيمة التشغيلية والتجارية للمجال: الكربون، التدريب، وسلاسل الإمداد، حتى يشعر الزائر بأن الموقع يتحدث لغة الصناعة فعلًا.',
      items: [
        { image: '/carbon-credit-exchange.svg', title: 'قيمة الكربون والحوافز', description: 'عرض بصري يربط بين البصمة الكربونية، التسجيل، والحوافز المالية وفرص التداول.' },
        { image: '/smart-training-lab.svg', title: 'تدريب وتشغيل وتحديث', description: 'مشهد يوضح جاهزية المصنع والكوادر وخطوط التشغيل ضمن بيئة أكثر تطورًا واستدامة.' },
        { image: '/green-logistics-network.svg', title: 'الوصول إلى الأسواق', description: 'صورة تربط الامتثال والكفاءة بالجاهزية التصديرية وسلاسل الإمداد وثقة السوق.' },
      ],
    },
    innovation: {
      kicker: 'أفكار عرض مبهرة',
      title: 'أفكار جديدة تجعل التجربة أقرب إلى منصة استشارية واستثمارية متقدمة',
      description:
        'لم نكتفِ بإضافة صور فقط، بل أضفنا أفكار عرض تجعل الصفحة أكثر حيوية وتميزًا من مواقع الشركات التقليدية.',
      items: [
        { title: 'شريط قدرات متحرك', description: 'شريط بصري يعرض الكلمات المفتاحية والقوة التشغيلية للمجال بطريقة حية ومستمرة.' },
        { title: 'معرض بصري للمجال', description: 'بدل الاقتصار على صورة واحدة، أصبح هناك معرض يشرح زوايا متعددة من النشاط الصناعي الأخضر.' },
        { title: 'فواصل قصصية بين الأقسام', description: 'كل قسم أصبح يحمل فكرة عرض مختلفة تمنح الصفحة إيقاعًا أقوى وتمنع الإحساس بالتكرار.' },
      ],
    },
    sectors: {
      kicker: 'الفئات المستهدفة',
      title: 'نخدم حالات استثمارية وتشغيلية متعددة داخل دورة الاقتصاد الأخضر',
      items: [
        { title: 'المستثمرون', description: 'لمن يمتلك رأس مال ويبحث عن مشروع أخضر مجدٍ أو شراكة صناعية ذات عائد واضح.' },
        { title: 'المصانع القائمة', description: 'لمن يريد خفض الاستهلاك والانبعاثات ورفع كفاءة المصنع مع الحفاظ على الجدوى التشغيلية.' },
        { title: 'المطورون والمناطق الصناعية', description: 'لمشاريع الأراضي والمنشآت التي تحتاج مواءمة مع المعايير البيئية والتقنية الحديثة.' },
        { title: 'المؤسسات الباحثة عن الاستدامة', description: 'للجهات التي تريد تقارير، تصنيفات ESG، أو مسارًا عمليًا نحو الحياد الكربوني.' },
      ],
    },
    journey: {
      kicker: 'رحلة التنفيذ',
      title: 'من تسجيل الطلب إلى التقارير النهائية: رحلة منظمة وواضحة للعميل',
      items: [
        { step: '01', title: 'التسجيل والاكتشاف', description: 'جمع بيانات العميل والمشروع والخدمة المطلوبة لتأسيس مسار العمل الصحيح منذ البداية.' },
        { step: '02', title: 'التحليل والتشخيص', description: 'فهم الوضع الحالي، المشكلة الرئيسية، فرص التطوير، ومدى جاهزية المشروع للتنفيذ.' },
        { step: '03', title: 'الدراسة والتصميم', description: 'إعداد الدراسة التفصيلية والحلول المقترحة والتقنيات وخطوط العمل المناسبة للمشروع.' },
        { step: '04', title: 'العرض والتنفيذ والمتابعة', description: 'تقديم العرض، بدء التنفيذ، متابعة التقدم، وقياس الإنجاز والتحديات مرحليًا.' },
        { step: '05', title: 'التقارير والشهادات', description: 'إصدار تقارير الاستدامة والكربون وESG والشهادات والنتائج النهائية للمشروع.' },
      ],
    },
    impact: {
      kicker: 'الأثر المتوقع',
      title: 'ماذا يكسب العميل عندما تصبح الاستدامة جزءًا من نموذج الأعمال؟',
      items: [
        { title: 'كفاءة تشغيلية أعلى', description: 'خفض استهلاك الطاقة وتحسين الأداء التشغيلي وتقليل الهدر والانبعاثات.' },
        { title: 'عائد مالي إضافي', description: 'الاستفادة من الحوافز المالية وقنوات التمويل المرنة وفرص الكربون المتاحة.' },
        { title: 'وصول أفضل للأسواق', description: 'رفع الجاهزية لسلاسل التوريد العالمية والأسواق التصديرية ومتطلبات الامتثال الحديثة.' },
        { title: 'ثقة أعلى لدى الشركاء', description: 'تحسين التصنيفات البيئية والاجتماعية وتعزيز صورة الشركة أمام المستثمرين والعملاء.' },
      ],
    },
    testimonials: {
      kicker: 'ماذا يقول عملاؤنا',
      title: 'تجارب حقيقية من شركاء النجاح',
      items: [
        { name: 'أحمد المنصوري', role: 'مدير عام، مصنع الخليج للبلاستيك', text: 'بفضل فريق Global Experts تمكنا من خفض انبعاثات الكربون بنسبة 40% مع تحسين الكفاءة التشغيلية بشكل ملموس.' },
        { name: 'سارة الحمادي', role: 'مديرة الاستدامة، مجموعة الإمارات الصناعية', text: 'حصلنا على تصنيف ESG متقدم وأصبحنا مؤهلين لتمويلات خضراء لم تكن متاحة لنا سابقًا.' },
        { name: 'خالد العتيبي', role: 'مستثمر، قطاع الطاقة المتجددة', text: 'من دراسة الجدوى إلى التشغيل الفعلي، كانت الرحلة واضحة ومنظمة بفضل الفريق الاستشاري.' },
      ],
    },
    faq: {
      kicker: 'أسئلة شائعة',
      title: 'إجابات على أكثر الأسئلة تكرارًا',
      items: [
        { q: 'ما هي المدة المتوقعة لتنفيذ مشروع متكامل؟', a: 'تعتمد المدة على حجم وطبيعة المشروع. عادةً تتراوح بين 3 إلى 12 شهرًا، ونقدم جدولًا زمنيًا واضحًا بعد المراجعة الأولية.' },
        { q: 'هل تقدمون خدماتكم خارج الإمارات؟', a: 'نعم، نعمل في جميع دول مجلس التعاون الخليجي ونستطيع تقديم استشارات عن بعد للمشاريع في مناطق أخرى.' },
        { q: 'ما هي تكلفة المراجعة الأولية؟', a: 'المراجعة الأولية مجانية. نقوم بتقييم احتياجاتكم وتقديم خارطة طريق مبدئية دون أي التزام مالي.' },
        { q: 'كيف يمكنني الاستفادة من أرصدة الكربون؟', a: 'نساعدكم في قياس البصمة الكربونية، تسجيل الأرصدة في الأسواق المعتمدة، وتحويلها إلى قيمة مالية فعلية.' },
        { q: 'هل تتعاملون مع المشاريع الصغيرة والمتوسطة؟', a: 'بالتأكيد. لدينا حزم مصممة خصيصًا للمشاريع الصغيرة والمتوسطة تتناسب مع ميزانياتها واحتياجاتها.' },
      ],
    },
    partners: {
      kicker: 'شركاؤنا',
      title: 'نتعاون مع أبرز الجهات في القطاع',
      items: ['Siemens Energy', 'TUV Rheinland', 'German Industry & Commerce', 'Abu Dhabi Chamber', 'UAE Ministry of Industry', 'GCC Standardization Org'],
    },
    brochure: {
      kicker: 'Profitable Sustainability',
      title: 'الامتثال البيئي يمكن أن يتحول إلى رافعة مالية حقيقية',
      description:
        'استلهمنا من الدليل المرفق فكرة محورية: الاستدامة عندما تُدار استراتيجيًا لا تضيف عبئًا، بل تصنع كفاءة أعلى، وصولًا أفضل للتمويل، وفرصًا أقوى للكربون والاعتمادات الدولية.',
      bullets: [
        'خفض كثافة الطاقة يرفع كفاءة الوحدة الإنتاجية.',
        'مواءمة المشروع مع الأنظمة يسهّل الوصول إلى تمويلات ومزايا تنافسية.',
        'تسجيل أرصدة الكربون يفتح بابًا إضافيًا للقيمة.',
        'الجاهزية البيئية تعزز فرص التصدير والتعامل مع الأسواق العالمية.',
      ],
      cta: 'حمّل النسخة التعريفية',
    },
    contact: {
      kicker: 'ابدأ الآن',
      title: 'ابدأ شراكة استراتيجية خلال يوم عمل واحد',
      description:
        'استخدم نموذج التسجيل الرسمي أو تواصل مباشرة مع فريقنا في الإمارات لبدء دراسة احتياجك وتحديد المسار الأنسب لمشروعك.',
      responseTitle: 'ماذا يحدث بعد التسجيل؟',
      responseBody:
        'يتم استلام الطلب، مراجعته من الفريق المختص خلال يوم عمل واحد، ثم التواصل معك لتأكيد الخطوات التالية أو طلب معلومات إضافية.',
      confidentialityTitle: 'سرية البيانات',
      confidentialityBody: 'جميع البيانات تُعامل بسرية تامة وتُستخدم فقط للتواصل بخصوص الخدمات والحلول المناسبة.',
      fieldTitle: 'البيانات الأولية المطلوبة',
      fields: ['الاسم الكامل', 'اسم الشركة', 'نوع النشاط والخطة المستدامة', 'رقم الهاتف', 'البريد الإلكتروني', 'الخدمة المطلوبة', 'كيف تعرفت علينا', 'تاريخ التسجيل'],
      primaryCta: 'فتح نموذج التسجيل',
      secondaryCta: 'مراسلة عبر البريد',
      details: [
        { label: 'البريد الإلكتروني', value: 'info@globalgreenconsults.com', href: 'mailto:info@globalgreenconsults.com' },
        { label: 'الهاتف', value: '+971 0503646355', href: 'tel:+971503646355' },
        { label: 'واتساب', value: '+971 589 120 603', href: 'https://wa.me/971589120603' },
        { label: 'الموقع', value: 'United Arab Emirates', href: null },
      ],
    },
    darkToggle: 'الوضع الداكن',
    scrollTop: 'العودة للأعلى',
    footer: {
      note: 'بوابتكم إلى مستقبل صناعي مستدام ومزدهر.',
      rights: 'Global Experts for Industrial Development and Green Consultations AFZ',
    },
  },
  en: {
    direction: 'ltr',
    languageLabel: 'AR',
    languageSwitchLabel: 'التحويل إلى العربية',
    metaTitle: 'Global Experts AFZ | Industrial Development & Green Consultations',
    metaDescription:
      'Professional bilingual website for Global Experts for Industrial Development and Green Consultations AFZ, focused on profitable sustainability, carbon neutrality, and turnkey industrial transformation.',
    brand: {
      arabic: 'الخبراء العالميون للتنمية الصناعية والاستشارات الخضراء',
      english: 'Global Experts for Industrial Development and Green Consultations AFZ',
      tagline: 'Engineering the green future where German efficiency meets Gulf leadership.',
    },
    nav: {
      services: 'Services',
      journey: 'Journey',
      impact: 'Impact',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'German Technology Transfer | Carbon Neutrality | ESG Ratings | UAE & GCC',
      title: 'Building greener industries with stronger profitability and global readiness',
      description:
        'We turn sustainability and carbon-neutrality requirements into measurable investment value through turnkey industrial solutions, German technology transfer, and structured access to financial and carbon incentives.',
      primaryCta: 'Start Your Request',
      secondaryCta: 'WhatsApp',
      tertiaryCta: 'Download Guide',
      notes: ['German Tech', 'ESG & Carbon', 'Export Ready'],
      stats: [
        { value: '150+', label: 'Projects successfully delivered' },
        { value: '24h', label: 'Initial review within one business day' },
        { value: '12+', label: 'Years of green sector expertise' },
      ],
      trust: ['Flexible finance', 'Carbon credits', 'Operational upgrades', 'Global reports'],
    },
    about: {
      kicker: 'Who We Are',
      title: 'An execution-driven advisory partner for profitable green transformation',
      description:
        'We deliver integrated solutions for real estate, commercial, and industrial projects across the UAE and the Gulf, managing the full path from opportunity discovery and feasibility through technology selection, implementation, reporting, and export readiness.',
    },
    pillars: [
      { title: 'Integrated turnkey delivery', description: 'We manage the project as one system: strategy, design, finance, implementation, and measurable outcomes.' },
      { title: 'German technology transfer', description: 'Advanced industrial expertise and technology access that improves project quality and execution speed.' },
      { title: 'Profitable sustainability', description: 'Environmental compliance is treated as a driver of efficiency, financing access, and new value creation.' },
      { title: 'Global reporting and certifications', description: 'Carbon, ESG, and certification pathways that strengthen trust, regulatory readiness, and market access.' },
    ],
    services: {
      kicker: 'Core Solutions',
      title: 'Services shaped around investor needs, operating factories, and green growth projects',
      description:
        'The official registration form was used as the foundation for a clear service architecture that turns client intent into an actionable delivery path.',
      cards: [
        { title: 'Carbon-ready industrial land', description: 'Identify and coordinate industrial land suitable for green facilities aligned with carbon-neutrality requirements.' },
        { title: 'Capital-to-project structuring', description: 'Turn available green investment capital into an executable project with a clear opportunity framework.' },
        { title: 'Vision-to-venture development', description: 'Translate a project vision into a grounded technical, commercial, and operational launch plan.' },
        { title: 'Factory sustainability transformation', description: 'Upgrade operating factories into more efficient, compliant, and commercially resilient assets.' },
        { title: 'Carbon and ESG reporting', description: 'Prepare carbon footprint, carbon-neutrality, and ESG-alignment reports for strategic decision-making.' },
        { title: 'Finance and incentives access', description: 'Support flexible loans, equipment-upgrade funding, and incentives that accelerate growth.' },
        { title: 'Technical and economic feasibility', description: 'Deliver feasibility studies, engineering pathways, and production-line strategies aligned with sustainability goals.' },
        { title: 'Training and workforce enablement', description: 'Train workers and technicians while supporting compliant administrative and operational staffing.' },
      ],
      extras: ['Carbon credit registration', 'Government transactions', 'Specialized consulting', 'Equipment modernization', 'Compliance solutions', 'Low-emission expansion'],
    },
    ticker: [
      'German Technology', 'Carbon Credits', 'Industrial Land', 'ESG Ratings',
      'Green Factory', 'Export Readiness', 'Operational Efficiency', 'Government Transactions',
    ],
    showcase: {
      kicker: 'Inside the Platform',
      title: 'More visuals that actually belong to the industry and the executive story',
      description: 'New visual scenes were added to represent operational and commercial value directly: carbon, training, and market access, so the website speaks the language of the sector more convincingly.',
      items: [
        { image: '/carbon-credit-exchange.svg', title: 'Carbon value and incentives', description: 'A visual storyline connecting carbon footprint, registration, incentives, and trading potential.' },
        { image: '/smart-training-lab.svg', title: 'Training, operations, and upgrade readiness', description: 'A scene that communicates workforce enablement, production setup, and operational modernization.' },
        { image: '/green-logistics-network.svg', title: 'Market access and logistics readiness', description: 'A visual link between compliance, efficiency, export readiness, and supply-chain trust.' },
      ],
    },
    innovation: {
      kicker: 'New Signature Ideas',
      title: 'Fresh presentation ideas that make the site feel more advanced and memorable',
      description: 'The upgrade is not only about adding more images, but also about introducing more dynamic and differentiated presentation concepts.',
      items: [
        { title: 'Animated capability ribbon', description: 'A live capability strip that keeps the sector vocabulary and strategic strengths visible throughout the experience.' },
        { title: 'Industry visual gallery', description: 'Instead of relying on one hero image, the site now presents multiple visual windows into the business domain.' },
        { title: 'Section-by-section storytelling', description: 'Different presentation rhythms between sections reduce repetition and make the experience feel more premium.' },
      ],
    },
    sectors: {
      kicker: 'Target Segments',
      title: 'Serving multiple investment and operating scenarios across the green economy',
      items: [
        { title: 'Investors', description: 'For capital owners seeking viable green projects or structured industrial opportunities with clear return logic.' },
        { title: 'Operating factories', description: 'For manufacturers aiming to reduce energy intensity, emissions, and operating friction without losing commercial focus.' },
        { title: 'Developers and industrial zones', description: 'For land-based or facility-led projects that need stronger environmental and technical alignment.' },
        { title: 'Institutions pursuing sustainability', description: 'For organizations seeking ESG ratings, technical reports, or a practical carbon-neutrality path.' },
      ],
    },
    journey: {
      kicker: 'Delivery Journey',
      title: 'From registration to final reports: a clear and structured client journey',
      items: [
        { step: '01', title: 'Registration and discovery', description: 'Capture client, project, and service data to establish the right engagement path from day one.' },
        { step: '02', title: 'Diagnosis and assessment', description: 'Understand the current condition, key challenge, opportunity set, and implementation readiness.' },
        { step: '03', title: 'Study and solution design', description: 'Build the detailed study, proposed solutions, technical stack, and execution logic for the project.' },
        { step: '04', title: 'Proposal, execution, and monitoring', description: 'Present the offer, launch execution, monitor progress, and manage delivery milestones and constraints.' },
        { step: '05', title: 'Reporting and certification', description: 'Issue sustainability, carbon, ESG, and final outcome reports together with certification pathways.' },
      ],
    },
    impact: {
      kicker: 'Expected Outcomes',
      title: 'What clients gain when sustainability becomes part of the business model',
      items: [
        { title: 'Higher operating efficiency', description: 'Lower energy intensity, tighter operations, and measurable reductions in waste and emissions.' },
        { title: 'Additional financial upside', description: 'Access flexible finance, incentive structures, and carbon-linked value opportunities.' },
        { title: 'Stronger market access', description: 'Improve readiness for export markets, modern compliance expectations, and global supply chains.' },
        { title: 'Greater stakeholder confidence', description: 'Strengthen ESG standing and corporate credibility with investors, clients, and institutional partners.' },
      ],
    },
    testimonials: {
      kicker: 'What Our Clients Say',
      title: 'Real experiences from our success partners',
      items: [
        { name: 'Ahmed Al Mansouri', role: 'GM, Gulf Plastics Factory', text: 'Thanks to Global Experts, we reduced carbon emissions by 40% while significantly improving operational efficiency.' },
        { name: 'Sara Al Hammadi', role: 'Sustainability Director, Emirates Industrial Group', text: 'We achieved an advanced ESG rating and became eligible for green financing that was previously unavailable to us.' },
        { name: 'Khaled Al Otaibi', role: 'Investor, Renewable Energy Sector', text: 'From feasibility study to actual operations, the journey was clear and organized thanks to the advisory team.' },
      ],
    },
    faq: {
      kicker: 'FAQ',
      title: 'Answers to the most frequently asked questions',
      items: [
        { q: 'What is the expected timeline for a full project?', a: 'The timeline depends on project size and nature. Typically it ranges from 3 to 12 months, and we provide a clear schedule after the initial review.' },
        { q: 'Do you offer services outside the UAE?', a: 'Yes, we operate across all GCC countries and can provide remote consulting for projects in other regions.' },
        { q: 'What is the cost of the initial review?', a: 'The initial review is free. We assess your needs and provide a preliminary roadmap with no financial commitment.' },
        { q: 'How can I benefit from carbon credits?', a: 'We help you measure your carbon footprint, register credits in accredited markets, and convert them into actual financial value.' },
        { q: 'Do you work with small and medium enterprises?', a: 'Absolutely. We have packages specifically designed for SMEs that fit their budgets and needs.' },
      ],
    },
    partners: {
      kicker: 'Our Partners',
      title: 'Collaborating with leading organizations in the sector',
      items: ['Siemens Energy', 'TUV Rheinland', 'German Industry & Commerce', 'Abu Dhabi Chamber', 'UAE Ministry of Industry', 'GCC Standardization Org'],
    },
    brochure: {
      kicker: 'Profitable Sustainability',
      title: 'Environmental compliance can become a real financial lever',
      description: 'The supporting guide reinforces a central idea: when sustainability is managed strategically, it does not add friction, it creates efficiency, financing access, carbon value, and stronger positioning for international markets.',
      bullets: [
        'Lower energy intensity improves unit economics.',
        'Regulatory alignment supports financing access and competitiveness.',
        'Carbon credit registration can create an additional value stream.',
        'Environmental readiness strengthens export and procurement potential.',
      ],
      cta: 'Download company guide',
    },
    contact: {
      kicker: 'Start Now',
      title: 'Begin a strategic partnership within one business day',
      description: 'Use the official registration form or contact the UAE-based team directly to start a focused review of your project opportunity.',
      responseTitle: 'What happens after registration?',
      responseBody: 'The request is received, reviewed by the specialist team within one business day, and followed by direct contact to confirm the next steps or request additional information.',
      confidentialityTitle: 'Data confidentiality',
      confidentialityBody: 'All submitted information is treated confidentially and used only to respond to your service requirements.',
      fieldTitle: 'Initial data requested',
      fields: ['Full name', 'Company name', 'Activity type and sustainable plan', 'Contact phone number', 'Email', 'Service required', 'Referral source', 'Registration date'],
      primaryCta: 'Open Registration Form',
      secondaryCta: 'Send an Email',
      details: [
        { label: 'Email', value: 'info@globalgreenconsults.com', href: 'mailto:info@globalgreenconsults.com' },
        { label: 'Phone', value: '+971 0503646355', href: 'tel:+971503646355' },
        { label: 'WhatsApp', value: '+971 589 120 603', href: 'https://wa.me/971589120603' },
        { label: 'Base', value: 'United Arab Emirates', href: null },
      ],
    },
    darkToggle: 'Dark Mode',
    scrollTop: 'Back to top',
    footer: {
      note: 'Your gateway to a more sustainable and more prosperous industrial future.',
      rights: 'Global Experts for Industrial Development and Green Consultations AFZ',
    },
  },
}

const state = { lang: localStorage.getItem('ge-lang') || 'ar', dark: false, menuOpen: false }
const root = document.querySelector('#app')

function cards(items, className = 'info-card') {
  return items
    .map(
      (item, i) => `
        <article class="${className}" data-reveal>
          ${item.step ? `<span class="step-pill">${item.step}</span>` : ''}
          ${className === 'service-card' && serviceIcons[i] ? `<span class="service-icon">${serviceIcons[i]}</span>` : ''}
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `,
    )
    .join('')
}

function chips(items) {
  return items.map((item) => `<span class="chip">${item}</span>`).join('')
}

function stats(items) {
  return items
    .map(
      (item) => `
        <article class="stat-card" data-reveal data-count-value="${item.value}">
          <strong class="count-up">${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `,
    )
    .join('')
}

function detailCards(items) {
  return items
    .map((item) => {
      const value = item.href
        ? `<a href="${item.href}" target="_blank" rel="noreferrer">${item.value}</a>`
        : `<span>${item.value}</span>`
      return `
        <article class="detail-card" data-reveal>
          <small>${item.label}</small>
          ${value}
        </article>
      `
    })
    .join('')
}

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join('')
}

function tickerItems(items) {
  const doubled = [...items, ...items]
  return doubled.map((item) => `<span class="ticker-pill">${item}</span>`).join('')
}

function showcaseCards(items) {
  return items
    .map(
      (item) => `
        <article class="showcase-card" data-reveal>
          <figure class="showcase-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </figure>
          <div class="showcase-copy">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `,
    )
    .join('')
}

function sectionHeading(kicker, title, description = '') {
  return `
    <div class="section-heading" data-reveal>
      <span class="section-kicker">${kicker}</span>
      <h2>${title}</h2>
      ${description ? `<p>${description}</p>` : ''}
    </div>
  `
}

function testimonialCards(items) {
  return items
    .map(
      (item) => `
        <article class="testimonial-card" data-reveal>
          <div class="testimonial-quote">
            <svg viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><path d="M6 18h6l-4 8H4l4-8H4V10h8v8H6zm16 0h6l-4 8h-4l4-8h-4V10h8v8h-6z"/></svg>
          </div>
          <p class="testimonial-text">${item.text}</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${item.name.charAt(0)}</div>
            <div>
              <strong>${item.name}</strong>
              <small>${item.role}</small>
            </div>
          </div>
        </article>
      `,
    )
    .join('')
}

function faqItems(items) {
  return items
    .map(
      (item, i) => `
        <details class="faq-item" data-reveal>
          <summary class="faq-question">
            <span>${item.q}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="faq-answer"><p>${item.a}</p></div>
        </details>
      `,
    )
    .join('')
}

function partnerItems(items) {
  const doubled = [...items, ...items]
  return doubled.map((item) => `<span class="partner-pill">${item}</span>`).join('')
}

function revealElements() {
  const items = document.querySelectorAll('[data-reveal]')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced) {
    items.forEach((item) => item.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16 },
  )

  items.forEach((item) => observer.observe(item))
}

function initCounters() {
  const counters = document.querySelectorAll('.count-up')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          const raw = el.textContent.trim()
          const numMatch = raw.match(/(\d+)/)
          if (numMatch) {
            const target = parseInt(numMatch[1])
            const suffix = raw.replace(numMatch[1], '')
            let current = 0
            const step = Math.max(1, Math.floor(target / 40))
            const interval = setInterval(() => {
              current += step
              if (current >= target) {
                current = target
                clearInterval(interval)
              }
              el.textContent = current + suffix
            }, 30)
          }
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.5 },
  )
  counters.forEach((c) => observer.observe(c))
}

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress-bar')
  if (!bar) return
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    bar.style.width = progress + '%'
  }, { passive: true })
}

function initScrollToTop() {
  const btn = document.querySelector('.scroll-top-btn')
  if (!btn) return
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500)
  }, { passive: true })
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function initDarkMode() {
  const saved = localStorage.getItem('ge-dark')
  if (saved === 'true') {
    state.dark = true
    document.documentElement.classList.add('dark')
  }
  const btn = document.querySelector('.dark-toggle')
  if (!btn) return
  btn.addEventListener('click', () => {
    state.dark = !state.dark
    document.documentElement.classList.toggle('dark', state.dark)
    localStorage.setItem('ge-dark', state.dark)
    btn.setAttribute('aria-pressed', state.dark)
  })
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle')
  const nav = document.querySelector('.mobile-nav')
  const closeBtn = document.querySelector('.mobile-nav-close')
  if (!toggle || !nav) return

  function closeMenu() {
    state.menuOpen = false
    nav.style.display = 'none'
    toggle.classList.remove('is-active')
    toggle.setAttribute('aria-expanded', false)
  }

  toggle.addEventListener('click', () => {
    state.menuOpen = !state.menuOpen
    if (state.menuOpen) {
      nav.style.display = 'flex'
    } else {
      nav.style.display = 'none'
    }
    toggle.classList.toggle('is-active', state.menuOpen)
    toggle.setAttribute('aria-expanded', state.menuOpen)
  })

  if (closeBtn) closeBtn.addEventListener('click', closeMenu)

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu)
  })
}

function hideLoadingScreen() {
  const loader = document.getElementById('loading-screen')
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded')
      setTimeout(() => loader.remove(), 600)
    }, 2500)
  }
}

const catalogData = {
  ar: [
    { num: '01', cat: 'أراضٍ ومواقع', title: 'طلب أرض صناعية متوافقة مع الحياد الكربوني', desc: 'تحديد وترتيب أراضٍ صناعية مناسبة لإقامة منشآت خضراء تتوافق مع معايير الحياد الكربوني، مع التحقق من الاشتراطات البيئية والفنية وضمان جاهزية الموقع للاعتمادات الدولية.' },
    { num: '02', cat: 'استثمار', title: 'استثمار رأس مال في الاقتصاد الأخضر', desc: 'تحليل الفرص الاستثمارية وتقييم الجدوى وبناء مشروع أخضر قابل للتنفيذ يحقق عوائد مالية واضحة مع الاستفادة من الحوافز المالية وحوافز الكربون.' },
    { num: '03', cat: 'تطوير', title: 'تحويل رؤية مشروع إلى واقع ملموس', desc: 'تحويل الفكرة إلى خطة تقنية وتشغيلية واضحة تشمل دراسة الجدوى والتصميم الهندسي واختيار التكنولوجيا الألمانية وتحديد خطوط الإنتاج حتى التشغيل الفعلي.' },
    { num: '04', cat: 'تمويل', title: 'قروض وتمويلات بشروط ميسرة', desc: 'تسهيل الوصول إلى تمويلات خضراء من مؤسسات مثل بنك التنمية الألماني (KfW)، مع إعفاءات ضريبية وتعريفات جمركية تفضيلية لتحديث المعدات أو التوسع الصناعي.' },
    { num: '05', cat: 'تطوير', title: 'دعم المشاريع في مرحلة التطوير', desc: 'استشارات فنية وهندسية للمشاريع التي لا تزال في مرحلة التخطيط لضمان سيرها في المسار الصحيح نحو الامتثال للمعايير العالمية وتحقيق أعلى كفاءة تشغيلية.' },
    { num: '06', cat: 'تحويل', title: 'تحويل مشروع قائم إلى مستدام', desc: 'تحديث المصانع والمنشآت العاملة (Retrofitting) لتصبح أكثر استدامة وكفاءة، مع تأهيل المنشأة لشهادات ISO 14001 وتصنيفات ESG العالية.' },
    { num: '07', cat: 'استشارات', title: 'خدمات استشارية متخصصة', desc: 'استشارات استراتيجية في الاستدامة والطاقة المتجددة والهندسة الصناعية والسلامة المهنية وتوطين التكنولوجيا، تشمل تحليل العمليات والصيانة التنبؤية بالذكاء الاصطناعي.' },
    { num: '08', cat: 'تقارير', title: 'تقرير البصمة الكربونية', desc: 'إعداد تقرير شامل لقياس البصمة الكربونية وفق المعايير الدولية يوضح حجم الانبعاثات ومصادرها وخارطة طريق لتقليلها واستثمارها في أرصدة كربون قابلة للتداول.' },
    { num: '09', cat: 'تقارير', title: 'تقرير فني لتحقيق الحياد الكربوني', desc: 'دراسة فنية معمقة تحدد المسار الكامل للوصول إلى Net-Zero تشمل الحلول التقنية والجدول الزمني والتكاليف والعوائد المالية من الحوافز وأرصدة الكربون.' },
    { num: '10', cat: 'تدريب', title: 'تدريب العمال والفنيين', desc: 'برامج تدريب في المهارات الخضراء (Green Skills) تشمل إدارة الطاقة والسلامة المهنية (ISO 45001) وتشغيل المعدات الألمانية وبناء ثقافة الاستدامة المؤسسية.' },
    { num: '11', cat: 'دراسات', title: 'دراسات الجدوى الاقتصادية والفنية', desc: 'دراسات جدوى شاملة تتضمن التحليل الاقتصادي (ROI) والتقييم الفني للتكنولوجيا وتحليل المخاطر وتحديد مصادر الطاقة المتجددة الأنسب لقرارات استثمارية مستنيرة.' },
    { num: '12', cat: 'موارد بشرية', title: 'توفير كفاءات مدربة ومؤهلة', desc: 'سد فجوة المهارات من خلال استقطاب وتأهيل كوادر إدارية وفنية وتشغيلية متوافقة مع المعايير الدولية قادرة على إدارة وتشغيل المصانع الخضراء.' },
    { num: '13', cat: 'كربون', title: 'تسجيل أرصدة الكربون للتداول', desc: 'تسجيل أرصدة الكربون في الأسواق المعتمدة مثل Verra و Gold Standard وتحويل خفض الانبعاثات إلى قيمة مالية فعلية قابلة للبيع والتداول عالمياً.' },
    { num: '14', cat: 'حكومي', title: 'إتمام المعاملات الحكومية', desc: 'معالجة وإتمام جميع المعاملات الحكومية من تراخيص وموافقات بيئية وتسجيل منشآت والتنسيق مع الجهات الرسمية لضمان الامتثال والحصول على كافة الحوافز.' },
  ],
  en: [
    { num: '01', cat: 'Land & Sites', title: 'Carbon-neutral compliant industrial land', desc: 'Identify and coordinate industrial land suitable for green facilities aligned with carbon-neutrality requirements, ensuring environmental compliance and readiness for international certifications.' },
    { num: '02', cat: 'Investment', title: 'Green economy capital investment', desc: 'Analyze investment opportunities, evaluate feasibility, and build an executable green project that delivers clear financial returns with financial and carbon incentives.' },
    { num: '03', cat: 'Development', title: 'Vision-to-venture development', desc: 'Transform a project vision into a grounded technical and operational plan including feasibility studies, engineering design, German technology selection, and production line planning.' },
    { num: '04', cat: 'Finance', title: 'Flexible green financing access', desc: 'Facilitate access to green loans from institutions like KfW, with tax exemptions and preferential tariffs for equipment upgrades or industrial expansion at minimal capital cost.' },
    { num: '05', cat: 'Development', title: 'Development-phase project support', desc: 'Technical and engineering consultancy for projects still in planning phase, ensuring proper trajectory toward global compliance and maximum operational efficiency.' },
    { num: '06', cat: 'Conversion', title: 'Existing project sustainability conversion', desc: 'Retrofit operating factories to become more sustainable and efficient, qualifying for ISO 14001 certifications and high ESG ratings with energy management systems.' },
    { num: '07', cat: 'Consulting', title: 'Specialized consulting services', desc: 'Strategic consulting in sustainability, renewable energy, industrial engineering, occupational safety, and technology localization including AI-powered predictive maintenance.' },
    { num: '08', cat: 'Reports', title: 'Carbon footprint report', desc: 'Comprehensive carbon footprint measurement report per international standards, showing emission levels, sources, and a roadmap for reduction and carbon credit trading.' },
    { num: '09', cat: 'Reports', title: 'Carbon neutrality technical report', desc: 'In-depth technical study defining the complete Net-Zero pathway including technical solutions, timeline, costs, and financial returns from incentives and carbon credits.' },
    { num: '10', cat: 'Training', title: 'Worker and technician training', desc: 'Green Skills training programs covering energy management, occupational safety (ISO 45001), German equipment operation, and institutional sustainability culture building.' },
    { num: '11', cat: 'Studies', title: 'Economic and technical feasibility', desc: 'Comprehensive feasibility studies with economic analysis (ROI), technology assessment, risk analysis, and renewable energy source identification for informed investment decisions.' },
    { num: '12', cat: 'HR', title: 'Qualified workforce provision', desc: 'Bridge the skills gap by recruiting and qualifying administrative, technical, and operational staff aligned with international standards for green factory management.' },
    { num: '13', cat: 'Carbon', title: 'Carbon credit registration for trading', desc: 'Register carbon credits in accredited markets like Verra and Gold Standard, converting emission reductions into actual tradeable financial value globally.' },
    { num: '14', cat: 'Government', title: 'Government transactions processing', desc: 'Handle all government transactions including licenses, environmental approvals, facility registration, and coordination with authorities for full compliance and incentive access.' },
  ],
}

function catalogFilterBtns(lang) {
  const cats = [...new Set(catalogData[lang].map(item => item.cat))]
  const allLabel = lang === 'ar' ? 'الكل' : 'All'
  const btns = cats.map(cat => `<button class="catalog-filter-btn" data-cat="${cat}" type="button">${cat}</button>`).join('')
  return `<button class="catalog-filter-btn is-active" data-cat="all" type="button">${allLabel}</button>${btns}`
}

function catalogItems(lang) {
  return catalogData[lang].map((item) => `
    <article class="catalog-card" data-reveal data-cat="${item.cat}">
      <div class="catalog-card-top">
        <span class="catalog-num">${item.num}</span>
        <span class="catalog-cat">${item.cat}</span>
      </div>
      <h3 class="catalog-title">${item.title}</h3>
      <p class="catalog-desc">${item.desc}</p>
    </article>
  `).join('')
}

function render() {
  const copy = translations[state.lang]
  document.documentElement.lang = state.lang
  document.documentElement.dir = copy.direction
  document.body.className = state.lang === 'ar' ? 'is-rtl' : 'is-ltr'
  document.title = copy.metaTitle
  document.querySelector('meta[name="description"]')?.setAttribute('content', copy.metaDescription)

  root.innerHTML = `
    <div class="ambient-bg" aria-hidden="true">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    <div class="noise-overlay" aria-hidden="true"></div>
    <div class="scroll-progress"><div class="scroll-progress-bar"></div></div>

    <div class="site-shell">
      <aside class="sidebar" role="banner">
        <a class="sidebar-brand" href="#top" aria-label="${copy.brand.english}">
          <img src="/logo.png" alt="Logo" class="sidebar-logo" />
          <span class="sidebar-brand-name">
            <strong>${state.lang === 'ar' ? 'الخبراء العالميون' : 'Global Experts'}</strong>
            <small>AFZ</small>
          </span>
        </a>

        <nav class="sidebar-nav" role="navigation" aria-label="Main navigation">
          <a href="#top" class="sidebar-link" data-label="${state.lang === 'ar' ? 'الرئيسية' : 'Home'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span class="sidebar-link-label">${state.lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </a>
          <a href="/client-journey.html" class="sidebar-link sidebar-link-journey" data-label="${state.lang === 'ar' ? 'رحلة العميل' : 'Client Journey'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span class="sidebar-link-label">${state.lang === 'ar' ? 'الرحلة' : 'Journey'}</span>
          </a>
          <a href="#platform" class="sidebar-link" data-label="${copy.nav.services}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <span class="sidebar-link-label">${copy.nav.services}</span>
          </a>
          <a href="#catalog" class="sidebar-link" data-label="${state.lang === 'ar' ? 'الكتالوج' : 'Catalog'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span class="sidebar-link-label">${state.lang === 'ar' ? 'الكتالوج' : 'Catalog'}</span>
          </a>
          <a href="#solutions" class="sidebar-link" data-label="${copy.nav.journey}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span class="sidebar-link-label">${copy.nav.journey}</span>
          </a>
          <a href="#impact" class="sidebar-link" data-label="${copy.nav.impact}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span class="sidebar-link-label">${copy.nav.impact}</span>
          </a>
          <a href="#testimonials" class="sidebar-link" data-label="${state.lang === 'ar' ? 'الشهادات' : 'Reviews'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span class="sidebar-link-label">${state.lang === 'ar' ? 'الشهادات' : 'Reviews'}</span>
          </a>
          <a href="#faq" class="sidebar-link" data-label="${state.lang === 'ar' ? 'الأسئلة' : 'FAQ'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span class="sidebar-link-label">${state.lang === 'ar' ? 'الأسئلة' : 'FAQ'}</span>
          </a>
          <a href="#contact" class="sidebar-link" data-label="${copy.nav.contact}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span class="sidebar-link-label">${copy.nav.contact}</span>
          </a>
        </nav>

        <div class="sidebar-bottom">
          <button class="sidebar-btn dark-toggle" type="button" aria-label="${copy.darkToggle}" aria-pressed="${state.dark}">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button class="sidebar-btn lang-toggle" type="button" aria-label="${copy.languageSwitchLabel}">
            <span>${copy.languageLabel}</span>
          </button>
          <a class="sidebar-cta" href="${links.form}" target="_blank" rel="noreferrer" aria-label="${copy.contact.primaryCta}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10.5V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5"/><polyline points="12 3 17 3 17 8"/><line x1="17" y1="3" x2="9" y2="11"/></svg>
          </a>
        </div>
      </aside>

      <div class="mobile-topbar">
        <a class="brand" href="#top">
          <img src="/logo.png" alt="Logo" class="brand-mark" />
          <span class="brand-copy">
            <strong>${state.lang === 'ar' ? 'الخبراء العالميون' : 'Global Experts'}</strong>
            <small>AFZ · UAE & GCC</small>
          </span>
        </a>
        <div class="topbar-actions">
          <button class="dark-toggle sidebar-btn" type="button" aria-label="${copy.darkToggle}" aria-pressed="${state.dark}">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button class="lang-toggle sidebar-btn" type="button" aria-label="${copy.languageSwitchLabel}">
            <span>${copy.languageLabel}</span>
          </button>
          <button class="menu-toggle" type="button" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <nav class="mobile-nav" role="navigation">
        <button class="mobile-nav-close" type="button" aria-label="${state.lang === 'ar' ? 'إغلاق القائمة' : 'Close menu'}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <a href="/client-journey.html">${state.lang === 'ar' ? 'رحلة العميل' : 'Client Journey'}</a>
        <a href="#top">${state.lang === 'ar' ? 'الرئيسية' : 'Home'}</a>
        <a href="#platform">${copy.nav.services}</a>
        <a href="#catalog">${state.lang === 'ar' ? 'الكتالوج' : 'Catalog'}</a>
        <a href="#solutions">${copy.nav.journey}</a>
        <a href="#impact">${copy.nav.impact}</a>
        <a href="#testimonials">${state.lang === 'ar' ? 'الشهادات' : 'Reviews'}</a>
        <a href="#faq">${state.lang === 'ar' ? 'الأسئلة' : 'FAQ'}</a>
        <a href="#contact">${copy.nav.contact}</a>
      </nav>

      <main id="main-content">
        <section class="section hero" id="top">
          <div class="hero-shell hero-animated-border">
            <div class="hero-visual" id="heroVisual">
              <div class="hero-mosaic">
                <div class="mosaic-item mosaic-main">
                  <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80" alt="Wind turbines green energy" />
                  <div class="mosaic-overlay"></div>
                  <div class="mosaic-label mosaic-label-lg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    ${state.lang === 'ar' ? 'الطاقة المتجددة' : 'Renewable Energy'}
                  </div>
                </div>
                <div class="mosaic-item mosaic-top-right">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt="Smart factory technology" />
                  <div class="mosaic-overlay"></div>
                  <div class="mosaic-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    ${state.lang === 'ar' ? 'تكنولوجيا ألمانية' : 'German Tech'}
                  </div>
                </div>
                <div class="mosaic-item mosaic-bottom-right">
                  <img src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80" alt="Green industrial plant" />
                  <div class="mosaic-overlay"></div>
                  <div class="mosaic-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    ${state.lang === 'ar' ? 'حياد كربوني' : 'Carbon Neutral'}
                  </div>
                </div>
                <div class="mosaic-item mosaic-corner">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80" alt="ESG reporting consultation" />
                  <div class="mosaic-overlay"></div>
                  <div class="mosaic-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    ESG
                  </div>
                </div>
              </div>
              <canvas class="hero-particles" id="heroParticles"></canvas>
              <div class="hero-floating-text">
                <div class="hero-float-track">
                  <span>CARBON NEUTRALITY</span>
                  <span>NET ZERO 2050</span>
                  <span>GREEN FACTORY</span>
                  <span>ESG RATINGS</span>
                  <span>GERMAN TECHNOLOGY</span>
                  <span>CARBON CREDITS</span>
                  <span>SUSTAINABILITY</span>
                  <span>CARBON NEUTRALITY</span>
                  <span>NET ZERO 2050</span>
                  <span>GREEN FACTORY</span>
                  <span>ESG RATINGS</span>
                  <span>GERMAN TECHNOLOGY</span>
                  <span>CARBON CREDITS</span>
                  <span>SUSTAINABILITY</span>
                </div>
                <div class="hero-float-track hero-float-track-reverse">
                  <span>ISO 14001</span>
                  <span>EXPORT READINESS</span>
                  <span>TURNKEY SOLUTIONS</span>
                  <span>CLEAN ENERGY</span>
                  <span>GREEN HYDROGEN</span>
                  <span>COMPLIANCE</span>
                  <span>INDUSTRIAL DEVELOPMENT</span>
                  <span>ISO 14001</span>
                  <span>EXPORT READINESS</span>
                  <span>TURNKEY SOLUTIONS</span>
                  <span>CLEAN ENERGY</span>
                  <span>GREEN HYDROGEN</span>
                  <span>COMPLIANCE</span>
                  <span>INDUSTRIAL DEVELOPMENT</span>
                </div>
              </div>
              <div class="hero-visual-content" data-reveal>
                <div class="hero-visual-badge">
                  <span class="hvb-pulse"></span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  ${state.lang === 'ar' ? 'ترخيص حصري للتكنولوجيا الألمانية' : 'Exclusive German Technology License'}
                </div>
                <div class="hero-visual-stats">
                  <div class="hvs-item">
                    <strong>150+</strong>
                    <span>${state.lang === 'ar' ? 'مشروع' : 'Projects'}</span>
                  </div>
                  <div class="hvs-divider"></div>
                  <div class="hvs-item">
                    <strong>12+</strong>
                    <span>${state.lang === 'ar' ? 'سنة خبرة' : 'Years'}</span>
                  </div>
                  <div class="hvs-divider"></div>
                  <div class="hvs-item">
                    <strong>GCC</strong>
                    <span>${state.lang === 'ar' ? 'تغطية إقليمية' : 'Coverage'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="hero-body">
              <div class="hero-copy" data-reveal>
                <span class="section-kicker">${copy.hero.eyebrow}</span>
                <h1>${copy.hero.title}</h1>
                <p class="hero-description">${copy.hero.description}</p>

                <div class="cta-group">
                  <a class="button primary" href="${links.form}" target="_blank" rel="noreferrer">${copy.hero.primaryCta}</a>
                  <a class="button secondary" href="${links.whatsapp}" target="_blank" rel="noreferrer">${copy.hero.secondaryCta}</a>
                  <a class="button ghost" href="${links.brochure}" target="_blank" rel="noreferrer">${copy.hero.tertiaryCta}</a>
                </div>

                <div class="hero-chips">${chips(copy.hero.trust)}</div>
              </div>

              <div class="hero-features" data-reveal>
                <article class="hero-insight-card">
                  <span class="story-kicker">${copy.about.kicker}</span>
                  <h2>${copy.brand.tagline}</h2>
                  <p>${copy.about.description}</p>
                </article>
                <div class="hero-stats-mini">
                  <div class="hero-mini-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>ISO 14001</span>
                  </div>
                  <div class="hero-mini-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <span>UAE + GCC</span>
                  </div>
                  <div class="hero-mini-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${state.lang === 'ar' ? 'تكنولوجيا ألمانية' : 'German Tech'}</span>
                  </div>
                  <div class="hero-mini-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span>${state.lang === 'ar' ? 'أرصدة كربون' : 'Carbon Credits'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="hero-stat-grid" data-reveal>${stats(copy.hero.stats)}</div>
          </div>
        </section>

        <section class="section journey-banner-section" data-reveal>
          <a href="/client-journey.html" class="journey-banner">
            <div class="journey-banner-bg"></div>
            <div class="journey-banner-content">
              <div class="journey-banner-text">
                <span class="journey-banner-badge">${state.lang === 'ar' ? 'رحلة العميل' : 'Client Journey'}</span>
                <h2>${state.lang === 'ar' ? 'من أول تواصل إلى مشروع أخضر مربح' : 'From first contact to a profitable green project'}</h2>
                <p>${state.lang === 'ar' ? '11 مرحلة منظمة تنقل مشروعك من الفكرة إلى التنفيذ والاعتمادات الدولية' : '11 structured stages taking your project from idea to execution and international certifications'}</p>
              </div>
              <div class="journey-banner-steps">
                <div class="jb-step"><span class="jb-num">01</span><span>${state.lang === 'ar' ? 'التسجيل' : 'Register'}</span></div>
                <div class="jb-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${state.lang === 'ar' ? 'M19 12H5M12 5l-7 7 7 7' : 'M5 12h14M12 5l7 7-7 7'}"/></svg></div>
                <div class="jb-step"><span class="jb-num">05</span><span>${state.lang === 'ar' ? 'الدراسة' : 'Study'}</span></div>
                <div class="jb-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${state.lang === 'ar' ? 'M19 12H5M12 5l-7 7 7 7' : 'M5 12h14M12 5l7 7-7 7'}"/></svg></div>
                <div class="jb-step"><span class="jb-num">08</span><span>${state.lang === 'ar' ? 'التنفيذ' : 'Execute'}</span></div>
                <div class="jb-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${state.lang === 'ar' ? 'M19 12H5M12 5l-7 7 7 7' : 'M5 12h14M12 5l7 7-7 7'}"/></svg></div>
                <div class="jb-step jb-step-gold"><span class="jb-num">11</span><span>${state.lang === 'ar' ? 'العوائد' : 'Returns'}</span></div>
              </div>
              <div class="journey-banner-cta">
                <span>${state.lang === 'ar' ? 'استكشف الرحلة الكاملة' : 'Explore Full Journey'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="${state.lang === 'ar' ? 'M19 12H5M12 5l-7 7 7 7' : 'M5 12h14M12 5l7 7-7 7'}"/></svg>
              </div>
            </div>
          </a>
        </section>

        <section class="section ticker-section">
          <div class="ticker-shell" data-reveal>
            <div class="ticker-track">${tickerItems(copy.ticker)}</div>
          </div>
        </section>

        <section class="section partners-section">
          <div class="partners-shell">
            ${sectionHeading(copy.partners.kicker, copy.partners.title)}
            <div class="partners-track-wrap" data-reveal>
              <div class="partners-track">${partnerItems(copy.partners.items)}</div>
            </div>
          </div>
        </section>

        <section class="section overview-section" id="platform">
          <div class="overview-layout">
            <article class="overview-copy panel">
              ${sectionHeading(copy.about.kicker, copy.about.title, copy.about.description)}
              <div class="overview-grid">${cards(copy.pillars, 'overview-card')}</div>
            </article>
            <aside class="overview-aside panel" data-reveal>
              <span class="story-kicker">${copy.brochure.kicker}</span>
              <h2>${copy.brochure.title}</h2>
              <p>${copy.brochure.description}</p>
              <ul class="content-list">${listItems(copy.brochure.bullets)}</ul>
              <a class="button primary" href="${links.brochure}" target="_blank" rel="noreferrer">${copy.brochure.cta}</a>
            </aside>
          </div>
        </section>

        <section class="section solutions-section" id="solutions">
          <div class="story-layout">
            <div class="story-media" data-reveal>
              <img src="/carbon-control-room.svg" alt="Carbon reporting and ESG operations illustration" loading="lazy" />
            </div>
            <div class="story-copy">
              ${sectionHeading(copy.services.kicker, copy.services.title, copy.services.description)}
              <div class="story-chip-row" data-reveal>${chips(copy.services.extras)}</div>
            </div>
          </div>
          <div class="services-grid">${cards(copy.services.cards, 'service-card')}</div>
        </section>

        <section class="section catalog-section" id="catalog">
          <div class="catalog-shell panel">
            <div class="catalog-header" data-reveal>
              <div class="catalog-header-text">
                <span class="section-kicker">${state.lang === 'ar' ? 'كتالوج الخدمات' : 'Service Catalog'}</span>
                <h2>${state.lang === 'ar' ? 'الخدمات التفصيلية المتاحة للتسجيل' : 'Detailed Services Available for Registration'}</h2>
                <p>${state.lang === 'ar' ? '14 خدمة متكاملة تغطي كامل دورة التحول الأخضر، من الفكرة إلى التنفيذ والاعتمادات الدولية' : '14 integrated services covering the full green transformation cycle, from concept to execution and international certifications'}</p>
              </div>
              <a class="button primary" href="${links.form}" target="_blank" rel="noreferrer">${state.lang === 'ar' ? 'سجل الآن' : 'Register Now'}</a>
            </div>
            <div class="catalog-filters" data-reveal>
              ${catalogFilterBtns(state.lang)}
            </div>
            <div class="catalog-grid">
              ${catalogItems(state.lang)}
            </div>
          </div>
        </section>

        <section class="section showcase-section">
          ${sectionHeading(copy.showcase.kicker, copy.showcase.title, copy.showcase.description)}
          <div class="showcase-grid">${showcaseCards(copy.showcase.items)}</div>
        </section>

        <section class="section process-section">
          <div class="process-layout">
            <div class="process-copy" id="journey">
              ${sectionHeading(copy.journey.kicker, copy.journey.title)}
              <div class="timeline">${cards(copy.journey.items, 'timeline-card')}</div>
            </div>
            <div class="process-side panel" data-reveal>
              <span class="story-kicker">${copy.sectors.kicker}</span>
              <h2>${copy.sectors.title}</h2>
              <div class="audience-grid">${cards(copy.sectors.items, 'audience-card')}</div>
            </div>
          </div>
        </section>

        <section class="section results-section" id="impact">
          <div class="results-shell">
            <div class="results-copy">
              ${sectionHeading(copy.impact.kicker, copy.impact.title)}
              <div class="results-grid">${cards(copy.impact.items, 'result-card')}</div>
            </div>
            <div class="results-media" data-reveal>
              <img src="/export-market-readiness.svg" alt="Export readiness and market access illustration" loading="lazy" />
            </div>
          </div>
        </section>

        <section class="section calculator-section" id="carbon-estimator">
          <div class="calculator-shell panel">
            <div class="calculator-copy" data-reveal>
              <span class="section-kicker">${state.lang === 'ar' ? 'تقدير فوري' : 'Instant Estimation'}</span>
              <h2>${state.lang === 'ar' ? 'حاسبة البصمة الكربونية التقديرية' : 'Estimated Carbon Footprint Calculator'}</h2>
              <p>${state.lang === 'ar' ? 'أدخل بيانات تشغيلية أولية للحصول على تقدير مبدئي للانبعاثات وفرصة الخفض السنوية. النتيجة إرشادية وتحتاج مراجعة فنية تفصيلية.' : 'Enter basic operational inputs to get an initial estimate of annual emissions and reduction potential. This is an indicative result pending technical review.'}</p>
            </div>
            <form class="carbon-form panel" data-reveal>
              <div class="carbon-grid">
                <label class="carbon-field">
                  <span>${state.lang === 'ar' ? 'نوع النشاط' : 'Activity Type'}</span>
                  <select name="sector" required>
                    <option value="manufacturing">${state.lang === 'ar' ? 'تصنيع' : 'Manufacturing'}</option>
                    <option value="logistics">${state.lang === 'ar' ? 'لوجستيات' : 'Logistics'}</option>
                    <option value="food">${state.lang === 'ar' ? 'غذائي' : 'Food Processing'}</option>
                    <option value="realestate">${state.lang === 'ar' ? 'عقاري/مبانٍ' : 'Real Estate / Buildings'}</option>
                  </select>
                </label>
                <label class="carbon-field">
                  <span>${state.lang === 'ar' ? 'الاستهلاك السنوي' : 'Annual Consumption'}</span>
                  <input type="number" name="consumption" min="1" step="0.1" placeholder="${state.lang === 'ar' ? 'مثال: 125000' : 'Example: 125000'}" required />
                </label>
                <label class="carbon-field">
                  <span>${state.lang === 'ar' ? 'وحدة القياس' : 'Measurement Unit'}</span>
                  <select name="unit" required>
                    <option value="kwh">${state.lang === 'ar' ? 'كيلوواط ساعة (kWh)' : 'Kilowatt-hour (kWh)'}</option>
                    <option value="liter">${state.lang === 'ar' ? 'لتر وقود (Diesel/Fuel)' : 'Fuel Liter (Diesel/Fuel)'}</option>
                    <option value="ton">${state.lang === 'ar' ? 'طن مواد/منتج' : 'Ton of Material/Product'}</option>
                  </select>
                </label>
              </div>
              <button class="button primary carbon-submit" type="submit">${state.lang === 'ar' ? 'احسب الآن' : 'Calculate Now'}</button>
              <div class="carbon-result" aria-live="polite">
                <article>
                  <small>${state.lang === 'ar' ? 'الانبعاثات التقديرية السنوية' : 'Estimated Annual Emissions'}</small>
                  <strong data-carbon-total>—</strong>
                </article>
                <article>
                  <small>${state.lang === 'ar' ? 'فرصة خفض سنوي محتملة' : 'Potential Annual Reduction'}</small>
                  <strong data-carbon-reduction>—</strong>
                </article>
                <article>
                  <small>${state.lang === 'ar' ? 'قيمة كربونية تقديرية' : 'Estimated Carbon Value'}</small>
                  <strong data-carbon-value>—</strong>
                </article>
              </div>
            </form>
          </div>
        </section>

        <section class="section certifications-section">
          <div class="certifications-shell panel">
            ${sectionHeading(
              state.lang === 'ar' ? 'الاعتمادات' : 'Certifications',
              state.lang === 'ar' ? 'معايير واعتمادات دولية ضمن المسار التنفيذي' : 'International standards integrated in the execution path',
              state.lang === 'ar' ? 'نعمل على مواءمة المشاريع مع أنظمة الإدارة والاستدامة المعترف بها دوليًا لرفع الجاهزية التنظيمية والتمويلية.' : 'We align projects with globally recognized sustainability and management standards to improve regulatory and financial readiness.',
            )}
            <div class="certifications-grid">
              <article class="cert-card" data-reveal><span>ISO 14001</span><p>${state.lang === 'ar' ? 'نظام الإدارة البيئية' : 'Environmental Management System'}</p></article>
              <article class="cert-card" data-reveal><span>ISO 50001</span><p>${state.lang === 'ar' ? 'إدارة الطاقة ورفع الكفاءة' : 'Energy management and efficiency'}</p></article>
              <article class="cert-card" data-reveal><span>ISO 45001</span><p>${state.lang === 'ar' ? 'السلامة والصحة المهنية' : 'Occupational health and safety'}</p></article>
              <article class="cert-card" data-reveal><span>ESG</span><p>${state.lang === 'ar' ? 'الحوكمة البيئية والاجتماعية' : 'Environmental, social and governance rating'}</p></article>
            </div>
          </div>
        </section>

        <section class="section testimonials-section" id="testimonials">
          ${sectionHeading(copy.testimonials.kicker, copy.testimonials.title)}
          <div class="testimonials-grid">${testimonialCards(copy.testimonials.items)}</div>
        </section>

        <section class="section innovation-section">
          <div class="innovation-shell">
            <div class="innovation-copy">
              ${sectionHeading(copy.innovation.kicker, copy.innovation.title, copy.innovation.description)}
            </div>
            <div class="innovation-grid">${cards(copy.innovation.items, 'innovation-card')}</div>
          </div>
        </section>

        <section class="section faq-section" id="faq">
          <div class="faq-shell">
            ${sectionHeading(copy.faq.kicker, copy.faq.title)}
            <div class="faq-list">${faqItems(copy.faq.items)}</div>
          </div>
        </section>

        <section class="section contact-section" id="contact">
          <div class="contact-shell">
            <div class="contact-main">
              ${sectionHeading(copy.contact.kicker, copy.contact.title, copy.contact.description)}
              <div class="detail-grid">${detailCards(copy.contact.details)}</div>
              <div class="contact-actions">
                <a class="button primary" href="${links.form}" target="_blank" rel="noreferrer">${copy.contact.primaryCta}</a>
                <a class="button secondary" href="${links.whatsapp}" target="_blank" rel="noreferrer">${copy.hero.secondaryCta}</a>
                <a class="button ghost" href="${links.email}">${copy.contact.secondaryCta}</a>
              </div>
            </div>
            <div class="contact-side">
              <article class="contact-panel" data-reveal>
                <h3>${copy.contact.responseTitle}</h3>
                <p>${copy.contact.responseBody}</p>
              </article>
              <article class="contact-panel" data-reveal>
                <h3>${copy.contact.confidentialityTitle}</h3>
                <p>${copy.contact.confidentialityBody}</p>
              </article>
              <article class="contact-panel" data-reveal>
                <h3>${copy.contact.fieldTitle}</h3>
                <ul class="content-list compact">${listItems(copy.contact.fields)}</ul>
              </article>
            </div>
          </div>
        </section>
      </main>

      <div class="sticky-cta" id="stickyCta">
        <div class="sticky-cta-inner">
          <p class="sticky-cta-label">${state.lang === 'ar' ? 'جاهز لتحويل مشروعك إلى مستقبل أخضر مربح؟' : 'Ready to transform your project into a profitable green future?'}</p>
          <div class="sticky-cta-btns">
            <a class="sticky-cta-primary" href="${links.form}" target="_blank" rel="noreferrer">${copy.contact.primaryCta}</a>
            <a class="sticky-cta-wa" href="${links.whatsapp}" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.12.553 4.114 1.518 5.846L4 29l8.39-1.472A11.94 11.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm6.07 16.897c-.254.714-1.48 1.367-2.04 1.44-.535.07-1.21.1-1.95-.122a17.8 17.8 0 0 1-1.766-.653c-3.108-1.34-5.138-4.48-5.294-4.69-.156-.21-1.276-1.7-1.276-3.243s.808-2.302 1.094-2.616c.286-.314.624-.393.832-.393s.416.006.598.01c.192.008.45-.073.704.537.262.63.89 2.17.968 2.327.078.157.13.34.026.55-.104.21-.156.34-.312.524-.156.183-.33.41-.47.55-.157.156-.32.326-.137.64.183.313.814 1.342 1.748 2.174 1.2 1.068 2.21 1.398 2.523 1.555.314.157.497.13.68-.078.183-.21.784-.914.994-1.228.21-.314.418-.262.704-.157.286.105 1.814.856 2.126 1.012.312.157.52.235.598.366.078.13.078.758-.176 1.473z"/></svg>
              ${state.lang === 'ar' ? 'واتساب' : 'WhatsApp'}
            </a>
          </div>
        </div>
      </div>

      <a class="floating-whatsapp" href="${links.whatsapp}" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.12.553 4.114 1.518 5.846L4 29l8.39-1.472A11.94 11.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm6.07 16.897c-.254.714-1.48 1.367-2.04 1.44-.535.07-1.21.1-1.95-.122a17.8 17.8 0 0 1-1.766-.653c-3.108-1.34-5.138-4.48-5.294-4.69-.156-.21-1.276-1.7-1.276-3.243s.808-2.302 1.094-2.616c.286-.314.624-.393.832-.393s.416.006.598.01c.192.008.45-.073.704.537.262.63.89 2.17.968 2.327.078.157.13.34.026.55-.104.21-.156.34-.312.524-.156.183-.33.41-.47.55-.157.156-.32.326-.137.64.183.313.814 1.342 1.748 2.174 1.2 1.068 2.21 1.398 2.523 1.555.314.157.497.13.68-.078.183-.21.784-.914.994-1.228.21-.314.418-.262.704-.157.286.105 1.814.856 2.126 1.012.312.157.52.235.598.366.078.13.078.758-.176 1.473z"/></svg>
        <span>WhatsApp</span>
      </a>

      <button class="scroll-top-btn" aria-label="${copy.scrollTop}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      <footer class="footer" role="contentinfo">
        <p>${copy.footer.note}</p>
        <small>${copy.footer.rights}</small>
      </footer>
    </div>
  `

  document.querySelectorAll('.lang-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar'
      localStorage.setItem('ge-lang', state.lang)
      render()
    })
  })

  revealElements()
  initCounters()
  initScrollProgress()
  initScrollToTop()
  initDarkMode()
  initMobileMenu()
  initStickyCta()
  initCatalogFilter()
  initCarbonCalculator()
  initActiveNav()
  initTopbarScroll()
  initHeroParticles()
  initHeroParallax()
  initHeroTypewriter()
  hideLoadingScreen()
}

function initActiveNav() {
  const sections = ['top', 'platform', 'catalog', 'solutions', 'impact', 'testimonials', 'faq', 'contact']
  const navLinks = document.querySelectorAll('.sidebar-link')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
          })
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  sections.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

function initTopbarScroll() {
  const topbar = document.querySelector('.topbar')
  if (!topbar) return
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('is-scrolled', window.scrollY > 20)
  }, { passive: true })
}

function initStickyCta() {
  const bar = document.getElementById('stickyCta')
  const hero = document.querySelector('.hero')
  if (!bar || !hero) return
  function update() {
    const visible = hero.getBoundingClientRect().bottom < 0
    bar.classList.toggle('is-visible', visible)
    document.body.classList.toggle('sticky-active', visible)
  }
  window.addEventListener('scroll', update, { passive: true })
}

function initCatalogFilter() {
  const filters = document.querySelectorAll('.catalog-filter-btn')
  if (!filters.length) return
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('is-active'))
      btn.classList.add('is-active')
      const cat = btn.dataset.cat
      document.querySelectorAll('.catalog-card[data-cat]').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none'
      })
    })
  })
}

function initHeroParticles() {
  const canvas = document.getElementById('heroParticles')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const visual = document.getElementById('heroVisual')
  if (!visual) return

  function resize() {
    canvas.width = visual.offsetWidth
    canvas.height = visual.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.3,
    o: Math.random() * 0.5 + 0.1,
  }))

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach((p) => {
      p.x += p.dx
      p.y += p.dy
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(77, 188, 138, ${p.o})`
      ctx.fill()
    })
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(77, 188, 138, ${0.06 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    requestAnimationFrame(draw)
  }
  draw()
}

function initHeroParallax() {
  const visual = document.getElementById('heroVisual')
  if (!visual) return
  window.addEventListener('scroll', () => {
    const rect = visual.getBoundingClientRect()
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = window.scrollY * 0.15
      const img = visual.querySelector('.hero-bg-img')
      if (img) img.style.transform = `scale(1.08) translateY(${offset}px)`
    }
  }, { passive: true })
}

function initHeroTypewriter() {
  const h1 = document.querySelector('.hero-copy h1')
  if (!h1) return
  const text = h1.textContent
  h1.innerHTML = ''
  h1.style.visibility = 'visible'
  let i = 0
  function type() {
    if (i <= text.length) {
      h1.innerHTML = text.slice(0, i) + '<span class="typewriter-cursor">|</span>'
      i++
      setTimeout(type, 40)
    } else {
      h1.innerHTML = text
    }
  }
  setTimeout(type, 600)
}

render()
