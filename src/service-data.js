export const pathOrder = ['launch', 'upgrade', 'carbon', 'support']

export const pathMeta = {
  launch: {
    ar: { label: 'إطلاق مشروع جديد', short: 'تأسيس المشروع من الصفر' },
    en: { label: 'New Project Launch', short: 'Starting from zero' },
    keywords: ['مشروع جديد', 'ابدأ', 'ابدء', 'فكرة', 'استثمار', 'رأس مال', 'ارض', 'ارض صناعية', 'start', 'new project', 'idea', 'land', 'investment'],
  },
  upgrade: {
    ar: { label: 'تطوير مشروع قائم', short: 'تحسين مصنع أو منشأة عاملة' },
    en: { label: 'Existing Project Upgrade', short: 'Improving an active facility' },
    keywords: ['مصنع قائم', 'تطوير مصنع', 'تحويل مصنع', 'تحسين', 'تحديث', 'عمال', 'فنيين', 'كوادر', 'factory', 'upgrade', 'retrofit', 'training', 'workforce'],
  },
  carbon: {
    ar: { label: 'تقارير واعتمادات وكربون', short: 'الكربون والامتثال والاعتمادات' },
    en: { label: 'Carbon, Reports, and Certifications', short: 'Carbon and compliance readiness' },
    keywords: ['بصمة كربونية', 'حياد كربوني', 'كربون', 'esg', 'اعتماد', 'شهادة', 'verra', 'gold standard', 'carbon', 'net zero', 'report', 'certification'],
  },
  support: {
    ar: { label: 'تمويل ودعم تشغيلي', short: 'التمويل والإجراءات والاستشارات' },
    en: { label: 'Finance and Operational Support', short: 'Finance, advisory, and procedures' },
    keywords: ['تمويل', 'قرض', 'قروض', 'جدوى', 'استشارة', 'استشارات', 'معاملات', 'اجراءات', 'government', 'finance', 'loan', 'feasibility', 'consulting'],
  },
}

export const services = [
  {
    id: 'industrial-land',
    num: '01',
    path: 'launch',
    title: {
      ar: 'أرض صناعية متوافقة مع الحياد الكربوني',
      en: 'Carbon-Neutral Industrial Land',
    },
    short: {
      ar: 'نساعدك على اختيار الموقع الصناعي الأنسب لمشروع أخضر جاهز للامتثال من البداية.',
      en: 'We help identify the right industrial site for a green project with early compliance readiness.',
    },
    when: {
      ar: 'عندما تكون بصدد تأسيس مشروع جديد وتحتاج أرضًا مناسبة بيئيًا وفنيًا.',
      en: 'When you are launching a new project and need a site with technical and environmental fit.',
    },
    gain: {
      ar: 'اختيار موقع يدعم الترخيص والامتثال والتوسع بثقة أكبر.',
      en: 'A site choice that supports licensing, compliance, and expansion with greater confidence.',
    },
    nextStep: {
      ar: 'نراجع النشاط المطلوب، المساحة، والموقع المفضل ثم نبدأ التقييم.',
      en: 'We review the activity, size requirement, and preferred location before starting the assessment.',
    },
    documents: {
      ar: ['وصف مختصر للنشاط الصناعي', 'المساحة التقريبية المطلوبة', 'الموقع الجغرافي المفضل', 'نسخة من بيانات الشركة أو المستثمر'],
      en: ['Brief activity description', 'Approximate required area', 'Preferred location', 'Company or investor information'],
    },
    video: {
      poster: '/green-industrial-campus.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح معايير اختيار الأرض الصناعية المناسبة هنا.',
        en: 'A short explainer about selecting the right industrial site can appear here.',
      },
      embed: '',
    },
    keywords: ['ارض', 'أرض', 'موقع', 'site', 'land', 'industrial land', 'industrial site', 'ارض صناعية'],
  },
  {
    id: 'green-investment',
    num: '02',
    path: 'launch',
    title: {
      ar: 'استثمار رأس مال في الاقتصاد الأخضر',
      en: 'Green Economy Capital Investment',
    },
    short: {
      ar: 'نحوّل رأس المال المتاح إلى فرصة مشروع أخضر ذات مسار تنفيذي أوضح.',
      en: 'We turn available capital into a clearer green project opportunity with execution logic.',
    },
    when: {
      ar: 'عندما تمتلك رأس مال وتبحث عن مشروع أخضر قابل للتنفيذ لا مجرد فكرة عامة.',
      en: 'When you already have capital and want a practical green project opportunity.',
    },
    gain: {
      ar: 'تحديد الفرصة الأنسب وربطها بالعائد المتوقع والجاهزية الفعلية.',
      en: 'A better fit between investment opportunity, expected return, and execution readiness.',
    },
    nextStep: {
      ar: 'نحدد المجال والميزانية ومستوى المخاطرة المقبول قبل بناء التوصية.',
      en: 'We define the sector, budget, and acceptable risk before shaping the recommendation.',
    },
    documents: {
      ar: ['الميزانية أو النطاق الاستثماري', 'القطاعات المفضلة', 'الإطار الزمني المتوقع', 'بيانات المستثمر الأساسية'],
      en: ['Budget or investment range', 'Preferred sectors', 'Expected timeline', 'Basic investor information'],
    },
    video: {
      poster: '/export-market-readiness.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح كيف نحوّل رأس المال إلى فرصة مشروع واضحة هنا.',
        en: 'A short video explaining how capital is translated into a project opportunity can appear here.',
      },
      embed: '',
    },
    keywords: ['استثمار', 'رأس مال', 'capital', 'invest', 'investment', 'opportunity', 'green economy'],
  },
  {
    id: 'vision-to-project',
    num: '03',
    path: 'launch',
    title: {
      ar: 'تحويل رؤية المشروع إلى مشروع ملموس',
      en: 'Vision-to-Project Development',
    },
    short: {
      ar: 'نحوّل الفكرة إلى خطة عملية تشمل الدراسة، التصميم، والتجهيز للانطلاق.',
      en: 'We turn the idea into a practical plan covering study, design, and launch readiness.',
    },
    when: {
      ar: 'عندما تكون لديك رؤية أو فكرة وتحتاج تحويلها إلى مشروع واضح المعالم.',
      en: 'When you have an idea or vision and need to convert it into a defined project.',
    },
    gain: {
      ar: 'رؤية أوضح للمشروع وخطوات عملية تقربه من التنفيذ.',
      en: 'A clearer project structure and practical next steps toward execution.',
    },
    nextStep: {
      ar: 'نراجع الفكرة والسوق المستهدف ونبني مسار التطوير المناسب.',
      en: 'We review the idea and target market, then shape the right development path.',
    },
    documents: {
      ar: ['ملخص الفكرة أو الرؤية', 'السوق أو العملاء المستهدفون', 'أي دراسات أولية متاحة', 'تقدير أولي للميزانية'],
      en: ['Concept note or vision summary', 'Target market or clients', 'Any available preliminary studies', 'Initial budget estimate'],
    },
    video: {
      poster: '/green-industrial-campus.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح كيف ننتقل من الفكرة إلى المشروع هنا.',
        en: 'A short video explaining how we move from idea to project can appear here.',
      },
      embed: '',
    },
    keywords: ['فكرة', 'رؤية', 'concept', 'vision', 'launch plan', 'project idea', 'تحويل رؤية'],
  },
  {
    id: 'green-financing',
    num: '04',
    path: 'support',
    title: {
      ar: 'قروض وتمويلات بشروط ميسرة',
      en: 'Flexible Green Financing',
    },
    short: {
      ar: 'نساعدك في الوصول إلى خيارات تمويل تدعم التوسع أو التحديث دون ضغط رأسمالي كبير.',
      en: 'We help you access financing options that support upgrades or expansion with lighter capital pressure.',
    },
    when: {
      ar: 'عندما تحتاج تمويلًا لتحديث المعدات أو التوسع أو تشغيل المشروع بثقة.',
      en: 'When you need financing for equipment upgrades, expansion, or project acceleration.',
    },
    gain: {
      ar: 'فهم أفضل لخيارات التمويل وتجهيز طلبك بشكل أقوى.',
      en: 'A clearer financing path and stronger readiness for the funding process.',
    },
    nextStep: {
      ar: 'نراجع الهدف التمويلي وحجم المشروع ونحدد المسار الأنسب للتقديم.',
      en: 'We review the financing goal and project size to identify the right route forward.',
    },
    documents: {
      ar: ['بيانات الشركة الأساسية', 'الهدف من التمويل', 'ميزانية أو تكلفة تقديرية', 'أي عروض أسعار أو بيانات مالية متاحة'],
      en: ['Basic company information', 'Funding objective', 'Budget or estimated project cost', 'Any quotations or available financial data'],
    },
    video: {
      poster: '/green-logistics-network.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح كيف نجهز ملف التمويل ونختار المسار المناسب هنا.',
        en: 'A short video explaining financing preparation and route selection can appear here.',
      },
      embed: '',
    },
    keywords: ['تمويل', 'قرض', 'قروض', 'finance', 'loan', 'funding', 'kfw'],
  },
  {
    id: 'development-support',
    num: '05',
    path: 'launch',
    title: {
      ar: 'دعم المشاريع في مرحلة التطوير',
      en: 'Development-Phase Project Support',
    },
    short: {
      ar: 'ندعم المشاريع التي لا تزال في التخطيط حتى تتجه نحو التنفيذ بشكل أكثر دقة.',
      en: 'We support projects still in planning so they move toward execution with more structure.',
    },
    when: {
      ar: 'عندما يكون المشروع في مرحلة التطوير ويحتاج مراجعة أو توجيهًا فنيًا صحيحًا.',
      en: 'When the project is still under development and needs sound technical direction.',
    },
    gain: {
      ar: 'تقليل أخطاء البداية ورفع جودة القرارات قبل الإنفاق الأكبر.',
      en: 'Fewer early-stage mistakes and stronger decisions before major spend.',
    },
    nextStep: {
      ar: 'نراجع ما تم إنجازه حتى الآن ثم نحدد الفجوات والأولوية القادمة.',
      en: 'We assess what has already been done and identify the gaps and next priority.',
    },
    documents: {
      ar: ['المخططات أو التصورات الحالية', 'الدراسات الأولية المتاحة', 'الوضع الحالي للموافقات', 'الجدول الزمني المتوقع'],
      en: ['Current drawings or concepts', 'Available early studies', 'Approval status', 'Expected timeline'],
    },
    video: {
      poster: '/export-market-readiness.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يوضح كيف نراجع المشروع في مرحلة التطوير هنا.',
        en: 'A short explainer about supporting projects in development can appear here.',
      },
      embed: '',
    },
    keywords: ['مرحلة التطوير', 'تطوير', 'planning', 'development phase', 'project support'],
  },
  {
    id: 'sustainability-conversion',
    num: '06',
    path: 'upgrade',
    title: {
      ar: 'تحويل مشروع قائم إلى مستدام',
      en: 'Sustainability Conversion for Existing Projects',
    },
    short: {
      ar: 'نطوّر المصنع أو المنشأة القائمة لتصبح أكثر كفاءة واستدامة وجاهزية للامتثال.',
      en: 'We upgrade active facilities to become more efficient, sustainable, and compliance-ready.',
    },
    when: {
      ar: 'عندما لديك مصنع أو مشروع يعمل فعليًا وتريد تحسين الأداء والاستدامة.',
      en: 'When you already have an operating project and want stronger efficiency and sustainability.',
    },
    gain: {
      ar: 'خفض الهدر والانبعاثات مع تحسين صورة المشروع وجاهزيته.',
      en: 'Lower waste and emissions with stronger project readiness and positioning.',
    },
    nextStep: {
      ar: 'نراجع وضع التشغيل الحالي ثم نحدد فرص التحسين والتحديث الأكثر أثرًا.',
      en: 'We assess current operations, then identify the highest-impact improvement opportunities.',
    },
    documents: {
      ar: ['بيانات المنشأة الحالية', 'فواتير الطاقة أو الاستهلاك', 'وصف خطوط الإنتاج أو التشغيل', 'أي تقارير امتثال أو سلامة متاحة'],
      en: ['Current facility information', 'Energy or utility bills', 'Description of production or operations', 'Any available compliance or safety reports'],
    },
    video: {
      poster: '/green-industrial-campus.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح كيف نطوّر المشروع القائم نحو الاستدامة هنا.',
        en: 'A short video explaining how an active project is upgraded toward sustainability can appear here.',
      },
      embed: '',
    },
    keywords: ['مصنع قائم', 'تحويل', 'retrofit', 'existing project', 'sustainable factory', 'upgrade factory'],
  },
  {
    id: 'specialized-consulting',
    num: '07',
    path: 'support',
    title: {
      ar: 'خدمات استشارية متخصصة',
      en: 'Specialized Consulting Services',
    },
    short: {
      ar: 'نقدم استشارات مركزة في الاستدامة والطاقة والهندسة والتشغيل حسب طبيعة التحدي.',
      en: 'We provide focused advisory support in sustainability, energy, engineering, and operations.',
    },
    when: {
      ar: 'عندما تكون لديك مشكلة محددة أو قرار معقد يحتاج خبرة متخصصة.',
      en: 'When you have a specific problem or a complex decision that needs specialist support.',
    },
    gain: {
      ar: 'قرار أوضح وخطوة عملية مبنية على خبرة مركزة في الموضوع.',
      en: 'A clearer decision and a practical next step grounded in specialist expertise.',
    },
    nextStep: {
      ar: 'نحدد السؤال الرئيسي أو التحدي التشغيلي ثم نبني نطاق الاستشارة المناسب.',
      en: 'We define the main question or operating challenge, then shape the right advisory scope.',
    },
    documents: {
      ar: ['وصف واضح للتحدي أو المطلوب', 'أي بيانات أو تقارير مرتبطة', 'الوضع التشغيلي الحالي', 'الهدف الذي ترغب الوصول إليه'],
      en: ['Clear problem statement', 'Any related data or reports', 'Current operating status', 'Desired target outcome'],
    },
    video: {
      poster: '/carbon-control-room.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يوضح أمثلة على نوع الاستشارات المتخصصة هنا.',
        en: 'A short video showing examples of specialized consulting can appear here.',
      },
      embed: '',
    },
    keywords: ['استشارة', 'استشارات', 'consulting', 'advisor', 'specialized', 'consultancy'],
  },
  {
    id: 'carbon-footprint',
    num: '08',
    path: 'carbon',
    title: {
      ar: 'تقرير البصمة الكربونية',
      en: 'Carbon Footprint Report',
    },
    short: {
      ar: 'نقيس الانبعاثات الحالية ونبني صورة واضحة تساعد على اتخاذ قرارات الخفض والتحسين.',
      en: 'We measure current emissions and create a clear picture that supports reduction decisions.',
    },
    when: {
      ar: 'عندما تحتاج معرفة حجم الانبعاثات ومصادرها كنقطة انطلاق واضحة.',
      en: 'When you need a baseline view of emissions and their sources.',
    },
    gain: {
      ar: 'تقرير مبسط وواضح يدعم القرارات التالية في الكربون والاستدامة.',
      en: 'A clear and simple report that supports the next carbon and sustainability decisions.',
    },
    nextStep: {
      ar: 'نجمع بيانات الاستهلاك والتشغيل ثم نبدأ القياس والتحليل الأولي.',
      en: 'We gather consumption and operating data before starting the first measurement analysis.',
    },
    documents: {
      ar: ['بيانات استهلاك الطاقة لـ 12 شهرًا', 'بيانات الوقود أو الديزل إن وجدت', 'كميات الإنتاج أو التشغيل', 'قائمة المواقع أو المنشآت المشمولة'],
      en: ['12 months of energy consumption data', 'Fuel or diesel data if available', 'Production or operating volumes', 'List of covered sites or facilities'],
    },
    video: {
      poster: '/carbon-control-room.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح ما الذي يتضمنه تقرير البصمة الكربونية هنا.',
        en: 'A short explainer about what the carbon footprint report includes can appear here.',
      },
      embed: '',
    },
    keywords: ['بصمة', 'بصمة كربونية', 'carbon footprint', 'emissions report', 'انبعاثات'],
  },
  {
    id: 'net-zero-report',
    num: '09',
    path: 'carbon',
    title: {
      ar: 'تقرير فني لتحقيق الحياد الكربوني',
      en: 'Carbon Neutrality Technical Report',
    },
    short: {
      ar: 'نضع خارطة طريق فنية ومالية للوصول إلى الحياد الكربوني بخطوات واضحة.',
      en: 'We define a technical and financial roadmap toward carbon neutrality with clear steps.',
    },
    when: {
      ar: 'عندما تريد الانتقال من القياس إلى خطة عملية للوصول إلى Net-Zero.',
      en: 'When you want to move from measurement to an actionable Net-Zero pathway.',
    },
    gain: {
      ar: 'فهم أوضح للحلول والجدول الزمني والتكلفة والعائد المحتمل.',
      en: 'A clearer understanding of solutions, timeline, cost, and potential upside.',
    },
    nextStep: {
      ar: 'نراجع وضع الانبعاثات الحالي والأهداف الزمنية قبل إعداد التقرير.',
      en: 'We review the current emissions position and timeline goals before preparing the report.',
    },
    documents: {
      ar: ['بيانات الاستهلاك والانبعاثات المتاحة', 'الأهداف الزمنية أو أهداف الاستدامة', 'أي تقرير بصمة كربونية سابق', 'بيانات الأنظمة أو العمليات الحالية'],
      en: ['Available consumption and emissions data', 'Timeline or sustainability targets', 'Any previous carbon footprint report', 'Current systems or process information'],
    },
    video: {
      poster: '/carbon-control-room.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح خارطة الطريق نحو الحياد الكربوني هنا.',
        en: 'A short explainer about the roadmap to carbon neutrality can appear here.',
      },
      embed: '',
    },
    keywords: ['حياد كربوني', 'net zero', 'neutrality', 'carbon neutrality', 'صافي صفري'],
  },
  {
    id: 'training',
    num: '10',
    path: 'upgrade',
    title: {
      ar: 'تدريب العمال والفنيين',
      en: 'Workers and Technicians Training',
    },
    short: {
      ar: 'نجهز الفرق العاملة للمهارات الخضراء والتشغيل الآمن والفعال حسب الحاجة.',
      en: 'We prepare teams for green skills, safer operations, and more effective execution.',
    },
    when: {
      ar: 'عندما يحتاج فريقك إلى تدريب عملي يواكب التحديثات أو التشغيل الجديد.',
      en: 'When your team needs practical training aligned with upgrades or new operations.',
    },
    gain: {
      ar: 'رفع الجاهزية البشرية وتقليل أخطاء التشغيل وتحسين الالتزام.',
      en: 'Stronger human readiness, fewer operating errors, and better adherence.',
    },
    nextStep: {
      ar: 'نحدد الفئات المستهدفة والمهارات المطلوبة ثم نبني خطة التدريب.',
      en: 'We define the target roles and required skills before shaping the training plan.',
    },
    documents: {
      ar: ['الفئات أو الوظائف المستهدفة', 'عدد المتدربين', 'الأهداف التدريبية', 'أي مواعيد أو قيود تشغيلية'],
      en: ['Target roles or groups', 'Number of trainees', 'Training objectives', 'Any schedule or operating constraints'],
    },
    video: {
      poster: '/smart-training-lab.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح برامج التدريب والمخرجات المتوقعة هنا.',
        en: 'A short video explaining training formats and expected outcomes can appear here.',
      },
      embed: '',
    },
    keywords: ['تدريب', 'عمال', 'فنيين', 'training', 'workers', 'technicians', 'green skills'],
  },
  {
    id: 'feasibility-study',
    num: '11',
    path: 'support',
    title: {
      ar: 'دراسات الجدوى الاقتصادية والفنية',
      en: 'Economic and Technical Feasibility Studies',
    },
    short: {
      ar: 'نقدم دراسة أوضح قبل الاستثمار أو التوسع حتى يكون القرار مبنيًا على أسس واقعية.',
      en: 'We provide a clearer basis before investment or expansion so decisions are grounded in reality.',
    },
    when: {
      ar: 'عندما تحتاج تقييمًا فنيًا وماليًا قبل بدء مشروع جديد أو توسعة مهمة.',
      en: 'When you need a technical and financial assessment before a new project or major expansion.',
    },
    gain: {
      ar: 'رؤية أوضح للجدوى والمخاطر والعائد المتوقع.',
      en: 'A clearer view of feasibility, risk, and expected return.',
    },
    nextStep: {
      ar: 'نراجع فكرة المشروع والبيانات المتاحة ثم نحدد نطاق الدراسة المطلوب.',
      en: 'We review the project concept and available data before defining the required study scope.',
    },
    documents: {
      ar: ['وصف المشروع أو التوسعة', 'الميزانية التقديرية', 'بيانات السوق أو الفرضيات المتاحة', 'الموقع أو بيانات المنشأة إن وجدت'],
      en: ['Project or expansion description', 'Estimated budget', 'Available market data or assumptions', 'Site or facility data if available'],
    },
    video: {
      poster: '/export-market-readiness.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح ما الذي تتضمنه دراسة الجدوى هنا.',
        en: 'A short explainer about what the feasibility study includes can appear here.',
      },
      embed: '',
    },
    keywords: ['جدوى', 'دراسة جدوى', 'feasibility', 'roi', 'economic study', 'technical study'],
  },
  {
    id: 'qualified-workforce',
    num: '12',
    path: 'upgrade',
    title: {
      ar: 'توفير كفاءات مدربة ومؤهلة',
      en: 'Qualified Workforce Provision',
    },
    short: {
      ar: 'نساعدك في سد فجوة المهارات عبر كوادر إدارية وفنية وتشغيلية مناسبة.',
      en: 'We help close the skills gap through qualified administrative, technical, and operational talent.',
    },
    when: {
      ar: 'عندما يحتاج المشروع إلى أشخاص جاهزين للتشغيل أو التوسع أو الامتثال.',
      en: 'When the project needs ready talent for operations, expansion, or compliance.',
    },
    gain: {
      ar: 'تسريع الجاهزية التشغيلية دون إبطاء المشروع بسبب نقص الكفاءات.',
      en: 'Faster operating readiness without slowing the project due to talent gaps.',
    },
    nextStep: {
      ar: 'نحدد الأدوار المطلوبة والمستوى الفني ثم نبدأ مواءمة الكفاءات.',
      en: 'We define the required roles and level before starting the matching process.',
    },
    documents: {
      ar: ['الأدوار أو التخصصات المطلوبة', 'عدد الكفاءات المطلوبة', 'مستوى الخبرة أو المعايير', 'التاريخ المتوقع لبدء العمل'],
      en: ['Required roles or specializations', 'Required headcount', 'Experience level or standards', 'Expected start date'],
    },
    video: {
      poster: '/smart-training-lab.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يوضح آلية تحديد وتوفير الكفاءات هنا.',
        en: 'A short video explaining talent matching and workforce provision can appear here.',
      },
      embed: '',
    },
    keywords: ['كوادر', 'افراد', 'أفراد', 'موظفين', 'staff', 'workforce', 'hiring', 'qualified personnel'],
  },
  {
    id: 'carbon-credits',
    num: '13',
    path: 'carbon',
    title: {
      ar: 'تسجيل أرصدة الكربون للتداول',
      en: 'Carbon Credit Registration',
    },
    short: {
      ar: 'نساعد على تحويل خفض الانبعاثات إلى قيمة قابلة للتوثيق والتسجيل والتداول.',
      en: 'We help convert emissions reductions into value that can be documented, registered, and traded.',
    },
    when: {
      ar: 'عندما تريد الاستفادة من خفض الانبعاثات عبر التسجيل في الأسواق المعتمدة.',
      en: 'When you want to benefit from emissions reductions through accredited market registration.',
    },
    gain: {
      ar: 'مسار إضافي للقيمة وتحسين التموضع في ملف الاستدامة.',
      en: 'An additional value stream and stronger sustainability positioning.',
    },
    nextStep: {
      ar: 'نراجع نوع المشروع وبيانات الخفض المتاحة ثم نحدد جاهزية التسجيل.',
      en: 'We review the project type and available reduction evidence before assessing registration readiness.',
    },
    documents: {
      ar: ['وصف المشروع أو النشاط', 'بيانات الخفض أو القياس المتاحة', 'أي تقارير كربون سابقة', 'المعلومات الفنية اللازمة للتوثيق'],
      en: ['Project or activity description', 'Available reduction or measurement data', 'Any previous carbon reports', 'Technical information needed for documentation'],
    },
    video: {
      poster: '/carbon-credit-exchange.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح كيف يتم تسجيل أرصدة الكربون للتداول هنا.',
        en: 'A short video explaining carbon credit registration for trading can appear here.',
      },
      embed: '',
    },
    keywords: ['ارصدة كربون', 'أرصدة كربون', 'carbon credits', 'verra', 'gold standard', 'credit registration'],
  },
  {
    id: 'government-transactions',
    num: '14',
    path: 'support',
    title: {
      ar: 'إتمام المعاملات الحكومية',
      en: 'Government Transactions Processing',
    },
    short: {
      ar: 'نرتب ملف التراخيص والموافقات الرسمية حتى تمضي الإجراءات بوضوح أكبر.',
      en: 'We organize licensing and official approvals so the process moves with more clarity.',
    },
    when: {
      ar: 'عندما تحتاج إلى تسريع أو ترتيب التراخيص والموافقات والإجراءات الرسمية.',
      en: 'When you need to accelerate or organize licensing, approvals, and official procedures.',
    },
    gain: {
      ar: 'تقليل التعقيد الإداري وتحسين الجاهزية الرسمية للمشروع.',
      en: 'Less administrative complexity and better formal readiness for the project.',
    },
    nextStep: {
      ar: 'نراجع الوثائق الحالية والجهات المعنية ثم نبني قائمة الإجراءات المطلوبة.',
      en: 'We review the current documents and authorities involved before mapping the required actions.',
    },
    documents: {
      ar: ['الرخص أو الوثائق الحالية', 'تفويض أو بيانات الممثل المخول', 'بيانات الشركة الأساسية', 'أي ملاحظات أو متطلبات من الجهات الرسمية'],
      en: ['Current licenses or documents', 'Authorization or representative details', 'Basic company information', 'Any notes or requirements from authorities'],
    },
    video: {
      poster: '/green-logistics-network.svg',
      title: { ar: 'فيديو توضيحي للخدمة', en: 'Service explainer video' },
      hint: {
        ar: 'يمكن عرض فيديو يشرح نطاق المعاملات الحكومية التي تشملها الخدمة هنا.',
        en: 'A short video explaining the scope of government transactions covered by the service can appear here.',
      },
      embed: '',
    },
    keywords: ['معاملات حكومية', 'اجراءات حكومية', 'تراخيص', 'موافقات', 'government transactions', 'licenses', 'approvals'],
  },
]

export const serviceMap = Object.fromEntries(services.map((service) => [service.id, service]))

export const servicesByPath = Object.fromEntries(
  pathOrder.map((path) => [path, services.filter((service) => service.path === path)]),
)

const pathLocalKeywords = {
  launch: [
    'عندي فكره',
    'ابي ابدا مشروع',
    'ابغي ابدا مشروع',
    'عايز ابدا مشروع',
    'اريد مشروع جديد',
    'ادور فرصه استثمار',
    'عندي راس مال',
    'احتاج ارض صناعيه',
  ],
  upgrade: [
    'استدامه',
    'الاستدامه',
    'مستدام',
    'استدامة المصنع',
    'تحول مستدام',
    'مصنع شغال',
    'مصنع قائم',
    'مصنع موجود',
    'عندي مصنع موجود',
    'منشاة قائمة',
    'منشاه قائمة',
    'منشاة موجودة',
    'منشاه موجوده',
    'ابي اطور المصنع',
    'ابغي احسن المصنع',
    'عندي مصنع وابيه يتطور',
    'احتاج تدريب عمال',
    'ابي كوادر للمصنع',
  ],
  carbon: [
    'ابي تقرير كربون',
    'تقرير',
    'عمل تقرير',
    'اعمل تقرير',
    'ابي تقرير',
    'احتاج تقرير',
    'سوي تقرير',
    'احتاج اعرف الانبعاثات',
    'ابي بصمه كربونيه',
    'ابي حياد كربوني',
    'احتاج شهاده esg',
    'ابي اسجل كربون',
  ],
  support: [
    'ابي تمويل',
    'احتاج قرض',
    'ابي دراسه جدوي',
    'ابي استشاره',
    'ابي رخص',
    'تخليص معاملات',
  ],
}

const serviceLocalKeywords = {
  'industrial-land': [
    'ابي ارض',
    'احتاج ارض صناعيه',
    'ابغي موقع صناعي',
    'ادور ارض للمصنع',
    'مكان للمصنع',
  ],
  'green-investment': [
    'عندي راس مال',
    'ابي استثمر',
    'ابغي استثمار اخضر',
    'ادور فرصه استثمار',
    'مشروع يجيب عائد',
    'وين استثمر',
  ],
  'vision-to-project': [
    'عندي فكره مشروع',
    'ابي احول الفكره لمشروع',
    'ابغي ابدا من الصفر',
    'ودي اطلع المشروع للنور',
    'عندي رؤيه وابغي انفذها',
  ],
  'green-financing': [
    'ابي تمويل',
    'احتاج قرض',
    'ابغي قرض للمشروع',
    'دعم مالي',
    'تمويل للمصنع',
    'تمويل للتوسع',
  ],
  'development-support': [
    'المشروع تحت التطوير',
    'المشروع في مرحله تطوير',
    'احتاج دعم للمشروع',
    'ابغي مساعده في التطوير',
    'اكمل المشروع',
  ],
  'sustainability-conversion': [
    'استدامه',
    'الاستدامه',
    'مستدام',
    'مشروع مستدام',
    'مصنع مستدام',
    'تحول مستدام',
    'تحول للاستدامه',
    'مصنع شغال',
    'مصنع قائم',
    'مصنع موجود',
    'عندي مصنع موجود',
    'منشاة قائمة',
    'منشاه قائمة',
    'منشاة موجودة',
    'منشاه موجوده',
    'ابي اطور المصنع',
    'ابي اخلي المصنع مستدام',
    'احول المصنع الى مستدام',
    'ابغي احسن كفاءه المصنع',
  ],
  'specialized-consulting': [
    'ابي استشاره',
    'احتاج استشاره متخصصه',
    'ابغي راي فني',
    'استشيركم',
    'احتاج مستشار',
  ],
  'carbon-footprint': [
    'تقرير انبعاثات',
    'تقرير كربون',
    'تقرير بصمه',
    'ابي بصمه كربونيه',
    'احتاج تقرير انبعاثات',
    'ابي اعرف الانبعاثات',
    'احسب الانبعاثات',
    'كم كربون نطلع',
    'قياس الكربون',
  ],
  'net-zero-report': [
    'تقرير فني',
    'تقرير حياد كربوني',
    'تقرير نت زيرو',
    'ابي حياد كربوني',
    'احتاج نت زيرو',
    'صافي صفري',
    'خطه حياد كربوني',
    'خارطه طريق كربون',
    'كيف نوصل للحياد',
  ],
  training: [
    'ابي تدريب عمال',
    'تدريب فنيين',
    'رفع كفاءه العمال',
    'تاهيل الفريق',
    'ابي ادرب الموظفين',
  ],
  'feasibility-study': [
    'تقرير جدوي',
    'ابي دراسه جدوي',
    'هل المشروع يسوي',
    'هل المشروع مربح',
    'اعرف الجدوي',
    'ابي roi',
    'دراسه للمشروع',
  ],
  'qualified-workforce': [
    'ابي ناس جاهزين',
    'احتاج موظفين',
    'ابغي كوادر',
    'عماله مدربه',
    'فريق جاهز للمصنع',
    'اشخاص مؤهلين',
  ],
  'carbon-credits': [
    'ارصده كربون',
    'ابي اسجل ارصده',
    'بيع الكربون',
    'اسجل كربون للتداول',
    'كربون كريدت',
    'اعتمادات كربونيه',
  ],
  'government-transactions': [
    'ابي رخص',
    'تخليص معاملات',
    'اجراءات حكوميه',
    'ابغي موافقات',
    'طلعوا التراخيص',
    'اوراق حكوميه',
  ],
}

const dialectReplacements = [
  [/(^|\s)(ابي|ابغي|ابغا|ودي|حاب|حابب|نفسي)(?=\s|$)/g, ' احتاج '],
  [/(^|\s)(عايز|عاوزه|عاوز|محتاج|محتاجه|محتاجين)(?=\s|$)/g, ' احتاج '],
  [/(^|\s)(شغال|شغاله|شغالين|قائمه)(?=\s|$)/g, ' قائم '],
  [/(^|\s)(موجود|موجوده|موجودين)(?=\s|$)/g, ' قائم '],
  [/(^|\s)(منشاه|منشاة|منشأه|منشأة)(?=\s|$)/g, ' مصنع '],
  [/(^|\s)(اطور|اطوّر|احسن|احسّن|احدث|أحدث)(?=\s|$)/g, ' تطوير '],
  [/(^|\s)(رخصه|رخص|ترخيص|تصريح|تصاريح)(?=\s|$)/g, ' تراخيص '],
  [/(^|\s)(اوراق|ورق)(?=\s|$)/g, ' معاملات '],
  [/(^|\s)(يسوي|يسوى|ينفع|مربح|مربحه|مجدي|مجدية)(?=\s|$)/g, ' جدوي '],
  [/(^|\s)(نت زيرو|نتزيرو|صافي صفري|حياديه|حياديه الكربون)(?=\s|$)/g, ' حياد كربوني '],
  [/(^|\s)(اس جي|اي اس جي|الاس جي)(?=\s|$)/g, ' esg '],
  [/(^|\s)(بصمه|بصمه الكربون|البصمه)(?=\s|$)/g, ' بصمه كربونيه '],
  [/(^|\s)(كوادر|عماله|عمالة)(?=\s|$)/g, ' كوادر '],
]

function normalize(text) {
  let normalized = (text || '')
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/[ؤئ]/g, (match) => (match === 'ؤ' ? 'و' : 'ي'))
    .replace(/ة/g, 'ه')
    .replace(/[گک]/g, 'ك')
    .replace(/چ/g, 'ج')
    .replace(/پ/g, 'ب')
    .replace(/ـ/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  normalized = ` ${normalized} `
  for (const [pattern, replacement] of dialectReplacements) {
    normalized = normalized.replace(pattern, replacement)
  }

  return normalized.replace(/\s+/g, ' ').trim()
}

function scoreKeywords(text, keywords) {
  const normalized = normalize(text)
  if (!normalized) return 0
  const tokens = new Set(normalized.split(' '))

  return keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalize(keyword)
    if (!normalizedKeyword) return score

    if (normalized.includes(normalizedKeyword)) {
      return score + (normalizedKeyword.includes(' ') ? 2 : 1)
    }

    const keywordTokens = normalizedKeyword.split(' ')
    if (keywordTokens.length > 1 && keywordTokens.every((token) => tokens.has(token))) {
      return score + 1.5
    }

    return score
  }, 0)
}

export function inferServiceFromText(text) {
  const serviceScores = services.map((service) => ({
    id: service.id,
    score: scoreKeywords(text, [...service.keywords, ...(serviceLocalKeywords[service.id] || [])]),
  }))

  const pathScores = pathOrder.map((path) => ({
    id: path,
    score: scoreKeywords(text, [...pathMeta[path].keywords, ...(pathLocalKeywords[path] || [])]),
  }))

  const bestService = serviceScores.sort((a, b) => b.score - a.score)[0]
  const bestPath = pathScores.sort((a, b) => b.score - a.score)[0]

  if (bestService && bestService.score >= 2) {
    return { type: 'service', serviceId: bestService.id }
  }

  if (bestPath && bestPath.score >= 1) {
    return { type: 'path', pathId: bestPath.id }
  }

  return { type: 'none' }
}

export function buildServiceUrl(serviceId) {
  return `/service.html?service=${encodeURIComponent(serviceId)}`
}
