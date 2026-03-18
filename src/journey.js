import './journey.css'

const FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSdF-cZ9FO45KtenzhERzZpSnEwC-zr1NdwhWgdCETu9UoOZYw/viewform'
const WA = 'https://wa.me/971589120603'

const icons = {
  megaphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
  meeting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  study: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  design: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  contract: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  execute: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  training: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  cert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  profit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
}

const stages = [
  {
    num: '01',
    label: 'المرحلة الأولى',
    en: 'Discovery & Outreach',
    title: 'الاستقطاب والتواصل الأولي',
    icon: 'megaphone',
    desc: 'يتعرف العميل على الشركة ويبدأ أول تواصل للاستفسار عن الخدمات المتاحة.',
    steps: [
      '<strong>اكتشاف الشركة</strong> عبر الموقع الإلكتروني أو صفحة Facebook أو توصية من عميل سابق',
      '<strong>تحميل الدليل التعريفي</strong> (PDF) للاطلاع على الخدمات والقدرات',
      '<strong>تواصل مبدئي</strong> عبر WhatsApp (+971 5891 20603) أو البريد الإلكتروني',
      '<strong>استفسار أولي</strong> عن نوع الخدمة المطلوبة والجدول الزمني المتوقع',
    ],
    tags: ['الموقع الإلكتروني', 'WhatsApp', 'Facebook', 'الدليل التعريفي PDF'],
    output: 'فهم أولي لاحتياجات العميل وتوجيهه لملء نموذج التسجيل الرسمي',
  },
  {
    num: '02',
    label: 'المرحلة الثانية',
    en: 'Official Registration',
    title: 'التسجيل الرسمي وإدخال البيانات',
    icon: 'clipboard',
    desc: 'يقوم العميل بتعبئة نموذج Google Form الرسمي الذي يتضمن كافة البيانات الأساسية واختيار الخدمات المطلوبة من قائمة شاملة تغطي كامل دورة التحول الأخضر.',
    steps: [
      '<strong>البيانات الشخصية:</strong> الاسم الكامل، البريد الإلكتروني، رقم الهاتف، الهاتف الأرضي',
      '<strong>بيانات الشركة:</strong> اسم الشركة، نوع النشاط والخطة المستدامة',
      '<strong>اختيار الخدمات المطلوبة</strong> من القائمة التفصيلية أدناه (يمكن اختيار أكثر من خدمة)',
      '<strong>مصدر التعرف:</strong> كيف تعرفت علينا أو اسم مستشار المبيعات',
      '<strong>تاريخ التسجيل</strong> وتأكيد إرسال البيانات',
    ],
    services: [
      { num: '01', title: 'طلب أرض صناعية متوافقة مع الحياد الكربوني', desc: 'تحديد وترتيب أراضٍ صناعية مناسبة لإقامة منشآت خضراء تتوافق مع معايير الحياد الكربوني. يشمل ذلك التحقق من الاشتراطات البيئية والفنية وضمان جاهزية الموقع للحصول على الاعتمادات الدولية من اليوم الأول.' },
      { num: '02', title: 'استثمار رأس مال في الاقتصاد الأخضر', desc: 'لمن يمتلك رأس مال ويبحث عن مشروع مجدٍ في الاقتصاد الأخضر. نقوم بتحليل الفرص الاستثمارية، تقييم الجدوى، وبناء مشروع أخضر قابل للتنفيذ يحقق عوائد مالية واضحة مع الاستفادة من الحوافز المالية وحوافز الكربون.' },
      { num: '03', title: 'تحويل رؤية مشروع إلى مشروع ملموس', desc: 'تحويل فكرة أو رؤية مشروعية إلى خطة تقنية وتشغيلية واضحة من الصفر. يشمل دراسة الجدوى، التصميم الهندسي، اختيار التكنولوجيا الألمانية المناسبة، وتحديد خطوط الإنتاج حتى مرحلة التشغيل الفعلي.' },
      { num: '04', title: 'الحصول على قروض وتمويلات بشروط ميسرة', desc: 'تسهيل الوصول إلى قروض وتمويلات خضراء من مؤسسات مثل بنك التنمية الألماني (KfW)، مع إعفاءات ضريبية وتعريفات جمركية تفضيلية لتحديث المعدات أو التوسع الصناعي بأقل تكلفة رأسمالية.' },
      { num: '05', title: 'المشروع في مرحلة التطوير', desc: 'دعم المشاريع التي لا تزال في مرحلة التطوير والتخطيط. نوفر الاستشارات الفنية والهندسية لضمان أن المشروع يسير في المسار الصحيح نحو الامتثال للمعايير العالمية وتحقيق أعلى كفاءة تشغيلية ممكنة.' },
      { num: '06', title: 'تحويل مشروع قائم إلى مشروع مستدام', desc: 'تحديث المصانع والمنشآت العاملة (Retrofitting) لتصبح أكثر استدامة وكفاءة. يشمل تصميم أنظمة إدارة الطاقة، تقليل البصمة الكربونية، وتأهيل المنشأة للحصول على شهادات ISO 14001 وتصنيفات ESG العالية.' },
      { num: '07', title: 'خدمات استشارية متخصصة', desc: 'استشارات استراتيجية عالمية المستوى في مجالات الاستدامة، الطاقة المتجددة، الهندسة الصناعية، السلامة المهنية، وتوطين التكنولوجيا. تشمل تحليل العمليات، محاكاة الأنظمة، والصيانة التنبؤية بالذكاء الاصطناعي.' },
      { num: '08', title: 'تقرير البصمة الكربونية', desc: 'إعداد تقرير شامل لقياس البصمة الكربونية للمنشأة أو المشروع وفق المعايير الدولية. يوضح التقرير حجم الانبعاثات الحالية، مصادرها، وخارطة طريق واضحة لتقليلها واستثمارها في أرصدة كربون قابلة للتداول.' },
      { num: '09', title: 'تقرير فني شامل لتحقيق الحياد الكربوني', desc: 'دراسة فنية معمقة تحدد المسار الكامل للوصول إلى الحياد الكربوني (Net-Zero). يشمل تحليل الوضع الحالي، الحلول التقنية المقترحة، الجدول الزمني، التكاليف المتوقعة، والعوائد المالية من الحوافز وأرصدة الكربون.' },
      { num: '10', title: 'تدريب العمال والفنيين', desc: 'برامج تدريب متخصصة في المهارات الخضراء (Green Skills) لتأهيل العمال والفنيين على التقنيات الحديثة. يشمل التدريب على إدارة الطاقة، السلامة المهنية (ISO 45001)، تشغيل المعدات الألمانية، وبناء ثقافة الاستدامة المؤسسية.' },
      { num: '11', title: 'دراسات الجدوى الاقتصادية والفنية', desc: 'إعداد دراسات جدوى شاملة تتضمن التحليل الاقتصادي والمالي (ROI)، التقييم الفني للتكنولوجيا، تحليل المخاطر، وتحديد مصادر الطاقة المتجددة الأنسب. تضمن هذه الدراسات اتخاذ قرارات استثمارية مستنيرة.' },
      { num: '12', title: 'توفير أفراد مدربين ومؤهلين', desc: 'توفير كفاءات إدارية وفنية وتشغيلية متوافقة مع المعايير الدولية. نساعد في سد فجوة المهارات من خلال استقطاب وتأهيل الكوادر القادرة على إدارة وتشغيل المصانع الخضراء بأعلى كفاءة.' },
      { num: '13', title: 'تسجيل أرصدة الكربون للتداول', desc: 'تسجيل أرصدة الكربون (Carbon Credits) في الأسواق المحلية والدولية المعتمدة مثل Verra و Gold Standard. نتولى كامل عملية التوثيق والتسجيل وتحويل خفض الانبعاثات إلى قيمة مالية فعلية قابلة للبيع والتداول.' },
      { num: '14', title: 'إتمام المعاملات الحكومية', desc: 'معالجة وإتمام جميع المعاملات الحكومية للشركة أو المصنع في دولة الإمارات. يشمل التراخيص، الموافقات البيئية، تسجيل المنشآت، والتنسيق مع الجهات الرسمية لضمان الامتثال التام والحصول على كافة الحوافز المتاحة.' },
    ],
    tags: ['Google Form', '14 خدمة', 'بيانات إلزامية', 'تسجيل رسمي'],
    output: 'ملف عميل مكتمل البيانات جاهز للمراجعة من فريق الخبراء',
  },
  {
    num: '03',
    label: 'المرحلة الثالثة',
    en: 'Review & Classification',
    title: 'المراجعة والتصنيف الأولي',
    icon: 'search',
    desc: 'يقوم فريق الخبراء بمراجعة البيانات المقدمة خلال يوم عمل واحد وتصنيف العميل والمشروع.',
    steps: [
      '<strong>مراجعة البيانات</strong> والتحقق من اكتمالها ودقتها',
      '<strong>تصنيف العميل:</strong> مستثمر / مصنع قائم / مطور عقاري / مؤسسة باحثة عن الاستدامة',
      '<strong>تحديد المسار:</strong> مشروع جديد من الصفر أو تحويل مشروع قائم',
      '<strong>تقييم أولي للجدوى</strong> وتحديد الأولويات والمخاطر المبدئية',
    ],
    tags: ['خلال 24 ساعة', 'تصنيف العملاء', 'تقييم مبدئي'],
    output: 'تقرير تصنيف أولي وخارطة طريق مبدئية للمشروع',
  },
  {
    num: '04',
    label: 'المرحلة الرابعة',
    en: 'Free Consultation',
    title: 'الاستشارة المجانية والتشخيص',
    icon: 'meeting',
    desc: 'اجتماع مجاني وغير ملزم مع فريق الخبراء لفهم احتياجات العميل بعمق ووضع تصور أولي.',
    steps: [
      '<strong>عقد اجتماع أولي</strong> (حضوري أو عن بعد) مجاني وغير ملزم',
      '<strong>تحليل معمق</strong> للاحتياجات التشغيلية والموقع الجغرافي والظروف البيئية',
      '<strong>مناقشة الأهداف:</strong> خفض الانبعاثات، شهادات دولية، كفاءة تشغيلية، تمويل أخضر',
      '<strong>تقديم خارطة طريق أولية</strong> مع تقدير مبدئي للتكاليف والجدول الزمني',
    ],
    tags: ['مجاني', 'غير ملزم', 'خارطة طريق', 'GIZ'],
    output: 'خارطة طريق مبدئية واضحة مع التوصيات والخطوات التالية',
  },
  {
    num: '05',
    label: 'المرحلة الخامسة',
    en: 'Feasibility Study',
    title: 'الدراسة والتحليل التفصيلي',
    icon: 'study',
    desc: 'إعداد دراسات الجدوى الاقتصادية والفنية الشاملة وتحديد أفضل الحلول التقنية للمشروع.',
    steps: [
      '<strong>دراسة الجدوى الاقتصادية والمالية</strong> (Economic & Financial Feasibility Studies)',
      '<strong>تحليل العائد على الاستثمار</strong> (ROI) والمخاطر المالية والفنية',
      '<strong>تحديد مصادر الطاقة المتجددة</strong> الأنسب (شمسية، رياح، هيدروجين أخضر)',
      '<strong>فحص فني دقيق</strong> (Technical Due Diligence) لاختيار التكنولوجيا الألمانية الأنسب',
    ],
    tags: ['ROI', 'Feasibility Study', 'Technical Due Diligence', 'تكنولوجيا ألمانية'],
    output: 'تقرير جدوى شامل مع تحليل مالي وفني وتوصيات تقنية واضحة',
  },
  {
    num: '06',
    label: 'المرحلة السادسة',
    en: 'Design & Planning',
    title: 'التصميم والتخطيط الهندسي',
    icon: 'design',
    desc: 'تصميم الحلول الهندسية والتقنية وتخطيط خطوط الإنتاج وتوطين التكنولوجيا الألمانية.',
    steps: [
      '<strong>التخطيط الهندسي</strong> وتصميم خطوط الإنتاج والبنية التحتية',
      '<strong>تصميم أنظمة إدارة الطاقة</strong> (Energy Management) وتقليل البصمة الكربونية',
      '<strong>نقل وتوطين التكنولوجيا الألمانية</strong> عبر الترخيص الحصري (Exclusive License)',
      '<strong>إدارة سلسلة التوريد</strong> (Supply Chain) وتوفير المعدات بأعلى جودة وأسعار تنافسية',
    ],
    tags: ['Exclusive License', 'German Technology', 'Supply Chain', 'Energy Management'],
    output: 'مخططات هندسية وتصميمات تقنية جاهزة للتنفيذ مع جدول زمني محدد',
  },
  {
    num: '07',
    label: 'المرحلة السابعة',
    en: 'Contract & Agreement',
    title: 'العرض والتعاقد',
    icon: 'contract',
    desc: 'تقديم العرض الرسمي الشامل والتعاقد مع تحديد المراحل والمخرجات وشروط الدفع.',
    steps: [
      '<strong>تقديم العرض الرسمي</strong> الشامل مع تفصيل الخدمات والتكاليف',
      '<strong>مناقشة شروط التعاقد</strong> والجدول الزمني ومراحل الدفع',
      '<strong>تنسيق التمويل الأخضر:</strong> قروض ميسرة (KfW)، إعفاءات ضريبية، حوافز مالية',
      '<strong>توقيع العقد</strong> وتحديد نقاط التسليم (Milestones) وآليات المتابعة',
    ],
    tags: ['Green Financing', 'KfW', 'Subsidized Loans', 'Tax Exemptions'],
    output: 'عقد موقّع مع خطة تنفيذ واضحة وتمويل مُؤمّن',
  },
  {
    num: '08',
    label: 'المرحلة الثامنة',
    en: 'Execution & Monitoring',
    title: 'التنفيذ والمتابعة الميدانية',
    icon: 'execute',
    desc: 'بدء التنفيذ الفعلي على الأرض مع متابعة مرحلية ومراقبة الجودة والالتزام بالمعايير.',
    steps: [
      '<strong>بدء التنفيذ:</strong> تركيب المعدات وخطوط الإنتاج وفق المعايير الألمانية',
      '<strong>إدارة دورة حياة الأصول</strong> (Asset Lifecycle Management) لأعلى كفاءة تشغيلية',
      '<strong>تطبيق الصيانة التنبؤية</strong> (Predictive Maintenance) بالذكاء الاصطناعي',
      '<strong>متابعة مرحلية</strong> وتقارير تقدم دورية وقياس الإنجاز مقابل الخطة',
    ],
    tags: ['Predictive Maintenance', 'AI', 'Operational Excellence', 'Turnkey Solution'],
    output: 'مشروع مُنفَّذ على الأرض مع تقارير تقدم مرحلية',
  },
  {
    num: '09',
    label: 'المرحلة التاسعة',
    en: 'Training & Capacity',
    title: 'التدريب وبناء القدرات',
    icon: 'training',
    desc: 'تأهيل الكوادر المحلية لإدارة وتشغيل المشروع الأخضر بكفاءة عالية ومستدامة.',
    steps: [
      '<strong>تدريب العمال والفنيين</strong> على التقنيات الخضراء (Green Skills)',
      '<strong>بناء القدرات الإدارية</strong> (Capacity Building) بالتعاون مع GIZ',
      '<strong>نقل المعرفة المنهجي</strong> (Knowledge Transfer) من الخبراء الألمان',
      '<strong>بناء ثقافة السلامة المؤسسية</strong> والالتزام بمعايير ISO 45001',
    ],
    tags: ['Green Skills', 'GIZ', 'Knowledge Transfer', 'ISO 45001'],
    output: 'فريق عمل مؤهل ومدرب قادر على تشغيل المشروع باستقلالية',
  },
  {
    num: '10',
    label: 'المرحلة العاشرة',
    en: 'Certifications & Reports',
    title: 'الشهادات والاعتمادات الدولية',
    icon: 'cert',
    desc: 'الحصول على الشهادات الدولية وإصدار تقارير الكربون وESG وتسجيل أرصدة الكربون.',
    steps: [
      '<strong>الحصول على شهادات ISO 14001</strong> وشهادات الصناعات الخضراء الدولية',
      '<strong>إعداد تقارير ESG</strong> (Environmental, Social, and Governance) الشاملة',
      '<strong>الامتثال لمعايير</strong> Verra و Gold Standard لشهادات الكربون',
      '<strong>تسجيل أرصدة الكربون</strong> (Carbon Credits) في الأسواق المحلية والدولية للتداول',
    ],
    tags: ['ISO 14001', 'ESG Ratings', 'Verra', 'Gold Standard', 'Carbon Credits'],
    output: 'شهادات دولية مُعتمدة وأرصدة كربون مُسجلة قابلة للتداول',
  },
  {
    num: '11',
    label: 'المرحلة الأخيرة',
    en: 'Returns & Growth',
    title: 'تحقيق العوائد والنمو المستدام',
    icon: 'profit',
    desc: 'جني ثمار الاستثمار الأخضر من خلال العوائد المالية والتشغيلية والوصول للأسواق العالمية.',
    steps: [
      '<strong>عوائد مالية:</strong> أرصدة كربون قابلة للبيع، إعفاءات ضريبية، تمويل أخضر ميسر',
      '<strong>كفاءة تشغيلية:</strong> خفض التكاليف وزيادة الإنتاجية بالتكنولوجيا الألمانية',
      '<strong>وصول للأسواق العالمية:</strong> منتجات متوافقة مع المعايير الدولية جاهزة للتصدير',
      '<strong>جذب الاستثمارات:</strong> تصنيف ESG عالٍ يجذب المستثمرين الدوليين (Impact Investing)',
    ],
    tags: ['Net-Zero 2050', 'رؤية الإمارات 2030', 'Impact Investing', 'Global Markets'],
    output: 'مشروع مستدام ومربح مع ميزة تنافسية فريدة في السوق العالمية',
  },
]

const root = document.querySelector('#app')

function renderStage(s, i) {
  const servicesHTML = s.services ? `
    <div class="services-catalog">
      <div class="services-catalog-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span>كتالوج الخدمات المتاحة (14 خدمة)</span>
      </div>
      <div class="services-catalog-grid">
        ${s.services.map((srv) => `
          <div class="srv-card">
            <div class="srv-card-head">
              <span class="srv-num">${srv.num}</span>
              <h4 class="srv-title">${srv.title}</h4>
            </div>
            <p class="srv-desc">${srv.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  ` : ''

  return `
    <div class="stage-block" data-index="${i}">
      <div class="stage-marker">
        <div class="stage-number">
          <span class="num-text">${s.num}</span>
          <span class="icon-check">${icons.check}</span>
        </div>
        ${i < stages.length - 1 ? '<div class="stage-connector"></div>' : ''}
      </div>
      <div class="stage-card" data-stage="${i}">
        <div class="stage-header">
          <div class="stage-icon">${icons[s.icon]}</div>
          <div class="stage-info">
            <span class="stage-label">${s.label}</span>
            <h3 class="stage-title">${s.title}</h3>
            <span class="stage-subtitle">${s.en}</span>
          </div>
          <button class="stage-toggle" aria-label="Toggle details">${icons.chevron}</button>
        </div>
        <div class="stage-details">
          <div class="stage-body">
            <p class="stage-desc">${s.desc}</p>
            <div class="sub-steps">
              ${s.steps.map((step, j) => `
                <div class="sub-step">
                  <span class="sub-step-num">${j + 1}</span>
                  <span class="sub-step-text">${step}</span>
                </div>
              `).join('')}
            </div>
            ${servicesHTML}
            <div class="stage-tags">
              ${s.tags.map((t, ti) => `<span class="stage-tag ${ti === 0 ? 'gold' : ''}">${t}</span>`).join('')}
            </div>
            <div class="stage-output">
              <div class="stage-output-label">المخرج المتوقع</div>
              <div class="stage-output-text">${s.output}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function render() {
  root.innerHTML = `
    <div class="bg-grid"></div>
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>
    <div class="bg-glow-3"></div>

    <div class="page-shell">
      <header class="page-header">
        <a href="/" class="back-link">${icons.arrow} الرئيسية</a>
        <a href="/" class="header-brand">
          <span>Global Experts AFZ</span>
          <img src="/logo.png" alt="Logo" />
        </a>
      </header>

      <section class="journey-hero">
        <div class="hero-badge"><span class="pulse-dot"></span> رحلة العميل الكاملة</div>
        <h1>من <span class="text-gradient">أول تواصل</span> إلى<br/><span class="text-gradient">مشروع أخضر مربح</span></h1>
        <p>11 مرحلة منظمة وواضحة تنقل مشروعك من الفكرة إلى التنفيذ والاعتمادات الدولية والعوائد المالية</p>
      </section>

      <div class="progress-wrap">
        <div class="progress-track"><div class="progress-fill"></div></div>
        <div class="progress-labels">
          ${stages.map((s, i) => `<span class="progress-label" data-target="${i}">${s.num}</span>`).join('')}
        </div>
      </div>

      <div class="timeline-grid">
        <div class="timeline-line"></div>
        ${stages.map((s, i) => renderStage(s, i)).join('')}
      </div>

      <section class="cta-section" data-reveal>
        <h2>جاهز لبدء رحلتك نحو <span class="text-gradient">مستقبل أخضر؟</span></h2>
        <p>سجّل الآن وسيتواصل معك فريق الخبراء خلال يوم عمل واحد لبدء دراسة مشروعك</p>
        <div class="cta-buttons">
          <a href="${FORM}" target="_blank" rel="noreferrer" class="btn btn-primary">ابدأ التسجيل الآن</a>
          <a href="${WA}" target="_blank" rel="noreferrer" class="btn btn-secondary">تواصل عبر WhatsApp</a>
        </div>
      </section>

      <footer class="page-footer">
        <p>Global Experts for Industrial Development and Green Consultations AFZ</p>
      </footer>
    </div>
  `

  initInteractions()
}

function initInteractions() {
  document.querySelectorAll('.stage-card').forEach((card) => {
    card.addEventListener('click', () => {
      const wasOpen = card.classList.contains('is-open')
      document.querySelectorAll('.stage-card.is-open').forEach((c) => c.classList.remove('is-open'))
      if (!wasOpen) card.classList.add('is-open')
    })
  })

  const blocks = document.querySelectorAll('.stage-block')
  const progressFill = document.querySelector('.progress-fill')
  const progressLabels = document.querySelectorAll('.progress-label')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          const idx = parseInt(entry.target.dataset.index)
          const pct = ((idx + 1) / stages.length) * 100
          if (progressFill) progressFill.style.width = pct + '%'
          progressLabels.forEach((label, li) => {
            label.classList.toggle('is-active', li === idx)
            label.classList.toggle('is-done', li < idx)
          })
        }
      })
    },
    { threshold: 0.3 },
  )
  blocks.forEach((b) => observer.observe(b))

  progressLabels.forEach((label) => {
    label.addEventListener('click', () => {
      const idx = parseInt(label.dataset.target)
      blocks[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  })

  const ctaSection = document.querySelector('[data-reveal]')
  if (ctaSection) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.style.animation = 'fade-up 600ms ease both'
      },
      { threshold: 0.2 },
    ).observe(ctaSection)
  }
}

render()
