const html = `<div class="h4-banner-area">
            <div class="h4-banner-content">
              <span class="sub-title wow fadeInUp" data-wow-delay=".2s">
                <i class="tji-box"></i> Solutions That Deliver
              </span>
              <h1 class="banner-title text-anim">Empowering Your Business with Smart Solutions.</h1>
              <div class="banner-desc-area wow fadeInUp" data-wow-delay=".7s">
                <a class="tj-primary-btn" href="/contact">
                  <span class="btn-text"><span>Get Started</span></span>
                  <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                </a>
                <div class="banner-desc">Committed to delivering innovative solutions that drive success. With a focus
                  on
                  quality.
                </div>
              </div>
            </div>
            <div class="banner-img-area">
              <div class="banner-img">
                <img data-speed="0.8" src="/images/hero-industrial-solar-1479x648.jpg" alt="Aerial view of an industrial complex with rooftop solar panels and green fields">
              </div>
              <div class="h4-rating-box wow fadeInUp" data-wow-delay="1s">
                <h2 class="title">4.8</h2>
                <p class="desc">Global rating based on 20k+ reviews</p>
              </div>
            </div>
          </div>
          <div class="bg-shape-1">
            <img src="/assets/images/shape/pattern-2.svg" alt="">
          </div>
          <div class="bg-shape-2">
            <img src="/assets/images/shape/pattern-3.svg" alt="">
          </div>`;

export function BannerSection() {
  return <section className="h4-banner-section section-gap-x" dangerouslySetInnerHTML={{ __html: html }} />;
}
