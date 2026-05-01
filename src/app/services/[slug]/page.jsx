import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryNames, getRelatedServices, getServiceBySlug, services } from "@/data/services";
import { getServiceDetail, getServicePageExperience } from "@/data/serviceDetails";
import { absoluteUrl, companyName, defaultKeywords, jsonLdScript, organizationSchema, serviceUrl, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "الخدمة غير موجودة"
    };
  }

  const detail = getServiceDetail(service);

  return {
    title: service.title,
    description: detail.overview,
    keywords: [service.title, service.tag, categoryNames[service.category], ...defaultKeywords],
    alternates: {
      canonical: `/services/${service.slug}`
    },
    openGraph: {
      type: "article",
      locale: "ar_AE",
      url: serviceUrl(service.slug),
      siteName: companyName,
      title: `${service.title} | ${companyName}`,
      description: detail.overview,
      images: [
        {
          url: absoluteUrl(detail.visual.url),
          width: 1600,
          height: 1000,
          alt: detail.visual.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${companyName}`,
      description: detail.overview,
      images: [absoluteUrl(detail.visual.url)]
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const detail = getServiceDetail(service);
  const pageExperience = getServicePageExperience(service, detail);
  const relatedServices = getRelatedServices(service, 3);
  const pageUrl = serviceUrl(service.slug);
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: detail.overview,
        image: absoluteUrl(detail.visual.url),
        url: pageUrl,
        serviceType: categoryNames[service.category],
        areaServed: "United Arab Emirates",
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات مشابهة",
          itemListElement: relatedServices.map((related, index) => ({
            "@type": "Offer",
            position: index + 1,
            url: serviceUrl(related.slug),
            itemOffered: {
              "@type": "Service",
              name: related.title,
              description: related.summary
            }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: `${siteUrl}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "الخدمات",
            item: `${siteUrl}/#services`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: pageUrl
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(serviceStructuredData)} />
      <main className={`green-showcase service-detail-page service-detail-page--${service.slug}`} dir="rtl">
        <header className="showcase-nav service-detail-nav">
          <Link className="showcase-brand" href="/" aria-label="العودة إلى الرئيسية">
            <img src="/images/logo.jpeg" alt="" />
            <span>
              <strong>خبراء التطوير الصناعي</strong>
              <small>والاستشارات الخضراء</small>
            </span>
          </Link>
          <nav className="showcase-links" aria-label="روابط الخدمة">
            <Link href="/">الرئيسية</Link>
            <Link href="/#services">كل الخدمات</Link>
            <a href="#video">فيديو الخدمة</a>
            <a href="#contact">تواصل</a>
          </nav>
          <div className="showcase-nav-actions">
            <Link className="showcase-client-login" href="/clients/login" aria-label="دخول العملاء" title="دخول العملاء">
              <i className="fa-solid fa-user-lock" aria-hidden="true" />
              <span>دخول العملاء</span>
            </Link>
            <a className="showcase-nav-cta" href="tel:0556260392">
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <span>اتصل الآن</span>
            </a>
          </div>
        </header>

        <section
          className="service-detail-hero service-detail-hero--rich"
          style={{ "--service-detail-hero-bg": `url("${detail.visual.url}")` }}
        >
          <div className="showcase-container service-detail-hero__inner">
            <div className="service-detail-hero__copy">
              <Link className="service-detail-back" href="/#services">← العودة إلى كتالوج الخدمات</Link>
              <span className="showcase-kicker">{categoryNames[service.category]}</span>
              <h1>{service.title}</h1>
              <p>{detail.headline}</p>
              <div className="service-detail-actions">
                <a className="showcase-button showcase-button--primary" href="tel:0556260392">اطلب هذه الخدمة</a>
                <a className="showcase-button showcase-button--ghost" href="#video">شاهد مكان الفيديو</a>
              </div>
            </div>

            <div className="service-detail-poster service-detail-poster--rich">
              <img className="service-detail-poster__main" src={detail.visual.url} alt={detail.visual.alt} />
              <div className="service-detail-poster__summary">
                <span>{service.tag}</span>
                <strong>{String(service.id).padStart(2, "0")}</strong>
              </div>
              <div className="service-detail-poster__thumb">
                <img src={service.image} alt={service.title} />
              </div>
            </div>
          </div>
        </section>

        <section className="service-detail-content">
          <div className="showcase-container service-detail-content__grid">
            <aside className="service-detail-panel service-detail-panel--rich">
              <span>ملخص الخدمة</span>
              <h2>{service.tag}</h2>
              <p>{service.summary}</p>
              <div className="service-detail-facts">
                <div>
                  <strong>{String(service.id).padStart(2, "0")}</strong>
                  <small>رقم الخدمة</small>
                </div>
                <div>
                  <strong>{categoryNames[service.category]}</strong>
                  <small>التصنيف</small>
                </div>
              </div>
              <div className="service-detail-panel__opportunity">
                <span>استفادة سريعة</span>
                <h3>ما الذي تكسبه من هذه الخدمة؟</h3>
                <ul>
                  {pageExperience.assurance.map((item) => (
                    <li key={item.title}>
                      <i className="fa-solid fa-check" aria-hidden="true" />
                      <strong>{item.title}</strong>
                    </li>
                  ))}
                </ul>
                <p>{pageExperience.decisionGuide[0].text}</p>
              </div>
              <a className="service-detail-panel__cta" href="https://wa.me/971556260392" target="_blank" rel="noopener noreferrer">
                تواصل عبر واتساب
              </a>
            </aside>

            <div className="service-detail-main">
              <div className="service-detail-story">
                <article>
                  <span>الفكرة ببساطة</span>
                  <h2>{detail.headline}</h2>
                  <p>{detail.overview}</p>
                </article>
                <article className="service-detail-story__value">
                  <span>لماذا تهم العميل؟</span>
                  <p>{detail.visitorValue}</p>
                </article>
              </div>

              <div className="service-detail-proof-grid" aria-label="نقاط قوة الخدمة">
                {pageExperience.proofCards.map((card) => (
                  <article key={card.title}>
                    <i className={card.icon} aria-hidden="true" />
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                ))}
              </div>

              <section className="service-detail-inline-video" id="video" aria-labelledby="service-video-title-updated">
                <div className="service-detail-inline-video__copy">
                  <span>{pageExperience.intro.label}</span>
                  <h2 id="service-video-title-updated">{pageExperience.intro.title}</h2>
                  <p>{pageExperience.intro.text}</p>
                </div>
                <div className="service-video-slot service-video-slot--inline">
                  <div className="service-video-slot__play">
                    <i className="fa-solid fa-play" aria-hidden="true" />
                  </div>
                  <span>مكان الفيديو</span>
                  <strong>{detail.videoTitle}</strong>
                  <p>يمكن استبدال هذه المساحة لاحقًا برابط YouTube أو ملف فيديو من الشركة.</p>
                </div>
              </section>

              <div className="section-heading service-detail-section-heading">
                <span>ما الذي يحصل عليه العميل؟</span>
                <h2>مخرجات عملية تساعدك على فهم قيمة الخدمة قبل التواصل.</h2>
              </div>

              <div className="service-detail-benefits service-detail-benefits--rich">
                {pageExperience.deliverables.map((deliverable, index) => (
                  <article key={`${deliverable.title}-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{deliverable.title}</h3>
                    <p>{deliverable.text}</p>
                    <p>نحوّل هذه النقطة إلى جزء واضح داخل ملف الخدمة حتى يعرف العميل ما سيتم تسليمه وما الخطوة التالية.</p>
                  </article>
                ))}
              </div>

              <div className="service-detail-assurance" aria-label="مؤشرات ثقة الخدمة">
                {pageExperience.assurance.map((item) => (
                  <article key={item.title}>
                    <span>{item.value}</span>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="service-detail-fit">
          <div className="showcase-container service-detail-fit__inner">
            <div className="section-heading">
              <span>لمن تناسب هذه الخدمة؟</span>
              <h2>هذه الخدمة توضح للعميل هل هذا المسار مناسب لمشروعه ومرحلته الحالية.</h2>
              <p>{pageExperience.targetSummary}</p>
            </div>
            <div className="service-detail-fit__list">
              {detail.suitableFor.map((item) => (
                <article key={item}>
                  <i className="fa-solid fa-check" aria-hidden="true" />
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail-process">
          <div className="showcase-container">
            <div className="section-heading section-heading--split">
              <div>
                <span>مسار التنفيذ</span>
                <h2>طريقة عمل واضحة من أول تواصل حتى تسليم المخرجات.</h2>
              </div>
              <p className="service-detail-process__summary">{pageExperience.intro.text}</p>
            </div>
            <div className="path-grid service-detail-roadmap">
              {pageExperience.workflow.map((step, index) => (
                <article className="path-step" key={`${step.title}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <p>خطوة منظمة تجعل الخدمة قابلة للفهم والمتابعة، وتحوّل العنوان العام إلى إجراءات يمكن تنفيذها.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail-decision">
          <div className="showcase-container">
            <div className="section-heading section-heading--split">
              <div>
                <span>قبل التواصل</span>
                <h2>إجابات سريعة مرتبطة بالخدمة تساعد العميل على تحديد الخطوة التالية.</h2>
              </div>
              <p>يوضح هذا الجزء متى تبدأ الخدمة، ماذا يجهز العميل، وكيف يستفيد من النتيجة بعد استلامها.</p>
            </div>
            <div className="service-detail-decision__grid">
              {pageExperience.decisionGuide.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="service-detail-faq" aria-label="أسئلة شائعة عن الخدمة">
              {pageExperience.faq.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length ? (
          <section className="service-gallery service-related" aria-labelledby="related-title">
            <div className="showcase-container">
              <div className="section-heading">
                <span>خدمات مشابهة</span>
                <h2 id="related-title">قد تهمك أيضًا.</h2>
              </div>
              <div className="service-grid">
                {relatedServices.map((related) => (
                  <article className="service-tile service-product-card" key={related.id}>
                    <Link className="service-product-card__image" href={`/services/${related.slug}`}>
                      <img src={related.image} alt={related.title} loading="lazy" />
                      <span>{String(related.id).padStart(2, "0")}</span>
                    </Link>
                    <div className="service-product-card__body">
                      <div className="service-product-card__meta">
                        <span>{related.tag}</span>
                        <span>{categoryNames[related.category]}</span>
                      </div>
                      <h3>
                        <Link href={`/services/${related.slug}`}>{related.title}</Link>
                      </h3>
                      <p>{related.summary}</p>
                      <Link className="service-product-card__cta" href={`/services/${related.slug}`}>
                        تفاصيل الخدمة
                        <span aria-hidden="true">←</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="showcase-contact" id="contact" aria-labelledby="contact-title">
          <div className="showcase-container showcase-contact__inner">
            <div>
              <span>ابدأ الآن</span>
              <h2 id="contact-title">هل تريد تطبيق هذه الخدمة على مشروعك؟</h2>
            </div>
            <div className="contact-actions">
              <a className="showcase-button showcase-button--primary" href="tel:0556260392">0556260392</a>
              <a className="showcase-button showcase-button--light" href="mailto:info@globalgreenconsults.com">
                info@globalgreenconsults.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
