const html = `<div class="container">
            <div class="row row-gap-4">
              <div class="col-lg-4 col-md-6 order-lg-0 order-1">
                <div class="choose-box wow fadeInUp" data-wow-delay=".2s">
                  <div class="choose-content">
                    <div class="choose-icon">
                      <i class="tji-award"></i>
                    </div>
                    <h4 class="title">Award-Winning Expertise</h4>
                    <p class="desc">Recognized by industry leaders, our award-winning team has a proven record of
                      delivering
                      excellence across projects.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 order-lg-1 order-0">
                <div class="h4-content-wrap text-center">
                  <div class="sec-heading style-4 text-center">
                    <span class="sub-title wow fadeInUp" data-wow-delay=".3s"><i class="tji-box"></i>Choose the
                      Best</span>
                    <h2 class="sec-title title-anim">Solutions Built for Business.</h2>
                  </div>
                  <a class="tj-primary-btn wow fadeInUp" data-wow-delay=".5s" href="/about">
                    <span class="btn-text"><span>Learn More</span></span>
                    <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                  </a>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 order-lg-2 order-2">
                <div class="choose-box wow fadeInUp" data-wow-delay=".3s">
                  <div class="choose-content">
                    <div class="choose-icon">
                      <i class="tji-team"></i>
                    </div>
                    <h4 class="title">Expert Team</h4>
                    <p class="desc">Our team is always available to address your concerns, providing quick and solution.
                      to
                      keep you competitive in marketplace.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 order-lg-3 order-3">
                <div class="choose-box wow fadeInUp" data-wow-delay=".5s">
                  <div class="choose-content">
                    <div class="choose-icon">
                      <i class="tji-support"></i>
                    </div>
                    <h4 class="title">Dedicated Support</h4>
                    <p class="desc">Our team is always available to address your concerns, providing quick and effective
                      solution to keep your business.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 order-lg-4 order-4">
                <div class="choose-box wow fadeInUp" data-wow-delay=".7s">
                  <div class="choose-content">
                    <div class="choose-icon">
                      <i class="tji-innovative"></i>
                    </div>
                    <h4 class="title">Innovative Solutions</h4>
                    <p class="desc">We stay ahead of the curve, leveraging cutting-edge technologies and strategies to
                      keep
                      you competitive in a marketplace.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 order-lg-5 order-5">
                <div class="countup-item style-2 wow fadeInUp" data-wow-delay=".9s"
                  data-bg-image="/assets/images/choose/choose-img.webp">
                  <span class="count-icon"><i class="tji-growth"></i></span>
                  <div class="count-inner">
                    <span class="count-text">Faster Growth</span>
                    <div class="inline-content">
                      <span class="odometer countup-number" data-count="8.5"></span>
                      <span class="count-plus">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

export function ChooseSection() {
  return <section id="choose" className="tj-choose-section section-gap" dangerouslySetInnerHTML={{ __html: html }} />;
}
