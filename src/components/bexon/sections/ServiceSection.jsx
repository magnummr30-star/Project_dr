const html = `<div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="sec-heading style-4 text-center">
                  <span class="sub-title wow fadeInUp" data-wow-delay=".3s"><i class="tji-box"></i>Our Solutions</span>
                  <h2 class="sec-title title-anim">Tailor Business Solutions for Corporates.</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="service-wrapper">
                  <div class="service-item style-5 service-stack">
                    <div class="service-content-area">
                      <div class="service-icon">
                        <i class="tji-service-1"></i>
                      </div>
                      <div class="service-content">
                        <span class="no">01.</span>
                        <h3 class="title"><a href="/service-details">Business Strategy Development</a></h3>
                        <p class="desc">Through a combination of data-driven insights and innovative approaches, we work
                          closely with you to develop customized.</p>
                        <a class="tj-primary-btn" href="/service-details">
                          <span class="btn-text"><span>Learn More</span></span>
                          <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                        </a>
                      </div>
                    </div>
                    <div class="service-img">
                      <img src="/assets/images/service/service-6.webp" alt="">
                    </div>
                  </div>
                  <div class="service-item style-5 service-stack">
                    <div class="service-content-area">
                      <div class="service-icon">
                        <i class="tji-service-2"></i>
                      </div>
                      <div class="service-content">
                        <span class="no">02.</span>
                        <h3 class="title"><a href="/service-details">Customer Experience Solutions</a></h3>
                        <p class="desc">Customer Experience Solutions are designed to enhance every touchpoint of your
                          customer journey, from first interaction.</p>
                        <a class="tj-primary-btn" href="/service-details">
                          <span class="btn-text"><span>Learn More</span></span>
                          <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                        </a>
                      </div>
                    </div>
                    <div class="service-img">
                      <img src="/assets/images/service/service-1.webp" alt="">
                    </div>
                  </div>
                  <div class="service-item style-5">
                    <div class="service-content-area">
                      <div class="service-icon">
                        <i class="tji-service-3"></i>
                      </div>
                      <div class="service-content">
                        <span class="no">03.</span>
                        <h3 class="title"><a href="/service-details">Sustainability and ESG Consulting</a></h3>
                        <p class="desc">Provide tailored strategies that not only drive long-term value but also build
                          trust
                          with stakeholders, investors.</p>
                        <a class="tj-primary-btn" href="/service-details">
                          <span class="btn-text"><span>Learn More</span></span>
                          <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                        </a>
                      </div>
                    </div>
                    <div class="service-img">
                      <img src="/assets/images/service/service-7.webp" alt="">
                    </div>
                  </div>
                </div>
                <div class="service-bottom-text">
                  <p class="desc"><span><i class="tji-box"></i>Unlock tailored solutions without the wasted effort. <a
                        href="/contact">Talk to us today</a></span>
                  </p>
                </div>
              </div>
            </div>
          </div>`;

export function ServiceSection() {
  return <section className="tj-service-section-5 section-gap" dangerouslySetInnerHTML={{ __html: html }} />;
}
