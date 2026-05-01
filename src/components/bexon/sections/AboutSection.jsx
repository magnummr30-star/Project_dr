const html = `<div class="container">
            <div class="row">
              <div class="col-12">
                <div class="about-content-area style-3 wow fadeInLeft" data-wow-delay=".3s">
                  <div class="sec-heading style-4">
                    <div class="subtitle-text">
                      <span class="sub-title wow fadeInUp" data-wow-delay=".3s"><i class="tji-box"></i>Get to Know
                        Us</span>
                    </div>
                    <h2 class="sec-title title-highlight">Committed Delivering <img
                        src="/assets/images/marquee/marquee-1.webp" alt=""> Measurable Results and Building from the
                      Lasting
                      Relationships <img src="/assets/images/marquee/marquee-2.webp" alt=""> through trust and innovation
                      and
                      shared for
                      success industries Experts.
                    </h2>
                  </div>
                  <div class="about-bottom-area">
                    <div class="customers-box style-3">
                      <div class="customers">
                        <ul>
                          <li class="wow fadeInLeft" data-wow-delay=".2s"><img
                              src="/assets/images/testimonial/client-1.webp" alt=""></li>
                          <li class="wow fadeInLeft" data-wow-delay=".3s"><img
                              src="/assets/images/testimonial/client-2.webp" alt=""></li>
                          <li class="wow fadeInLeft" data-wow-delay=".4s"><img
                              src="/assets/images/testimonial/client-3.webp" alt=""></li>
                          <li class="wow fadeInLeft" data-wow-delay=".5s"><span><i class="tji-plus"></i></span></li>
                        </ul>
                      </div>
                      <h6 class="customers-text wow fadeInLeft" data-wow-delay=".6s">We have <span>100+</span> happy
                        customer.
                      </h6>
                    </div>
                    <div class="about-btn-area-2 wow fadeInUp" data-wow-delay="1s">
                      <a class="tj-primary-btn" href="/about">
                        <span class="btn-text"><span>Learn More</span></span>
                        <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                      </a>
                      <a class="tj-primary-btn transparent-btn" href="/team">
                        <span class="btn-text"><span>Meet Teams</span></span>
                        <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid client-container-2 gap-top">
            <div class="row">
              <div class="col-12">
                <div class="swiper client-slider client-slider-3">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide client-item">
                      <div class="client-logo">
                        <img src="/assets/images/brands/brand-1.webp" alt="">
                      </div>
                    </div>
                    <div class="swiper-slide client-item">
                      <div class="client-logo">
                        <img src="/assets/images/brands/brand-2.webp" alt="">
                      </div>
                    </div>
                    <div class="swiper-slide client-item">
                      <div class="client-logo">
                        <img src="/assets/images/brands/brand-3.webp" alt="">
                      </div>
                    </div>
                    <div class="swiper-slide client-item">
                      <div class="client-logo">
                        <img src="/assets/images/brands/brand-4.webp" alt="">
                      </div>
                    </div>
                    <div class="swiper-slide client-item">
                      <div class="client-logo">
                        <img src="/assets/images/brands/brand-5.webp" alt="">
                      </div>
                    </div>
                    <div class="swiper-slide client-item">
                      <div class="client-logo">
                        <img src="/assets/images/brands/brand-6.webp" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-shape-1">
            <img src="/assets/images/shape/pattern-2.svg" alt="">
          </div>
          <div class="bg-shape-2">
            <img src="/assets/images/shape/pattern-3.svg" alt="">
          </div>`;

export function AboutSection() {
  return <section className="tj-about-section-2 section-gap section-gap-x" dangerouslySetInnerHTML={{ __html: html }} />;
}
