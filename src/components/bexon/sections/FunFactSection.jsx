const html = `<div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-wrap-content">
                  <div class="sec-heading style-4">
                    <span class="sub-title wow fadeInUp" data-wow-delay=".3s"><i class="tji-box"></i>OUR FUN FACT</span>
                    <h2 class="sec-title title-anim">Numbers and facts that define performance.</h2>
                  </div>
                  <div class="progress-item">
                    <div class="progress-circle">
                      <input type="text" class="knob" value="0" data-rel="92" data-linecap="0" data-width="120"
                        data-height="120" data-bgcolor="#ffffff" data-fgcolor="#1E8A8A" data-thickness=".16"
                        data-readonly="true" disabled>
                    </div>
                    <div class="progress-text">
                      <span class="sub-title">Increased revenue in the last 6 months.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row row-gap-4">
              <div class="col-lg-4 col-md-6">
                <div class="countup-item style-2 wow fadeInUp" data-wow-delay=".7s">
                  <span class="count-icon"><i class="tji-growth"></i></span>
                  <span class="steps">01.</span>
                  <div class="count-inner">
                    <span class="count-text">Faster Growth</span>
                    <div class="inline-content">
                      <span class="odometer countup-number" data-count="8.5"></span>
                      <span class="count-plus">X</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="countup-item style-2 wow fadeInUp" data-wow-delay=".5s">
                  <span class="count-icon"><i class="tji-worldwide"></i></span>
                  <span class="steps">02.</span>
                  <div class="count-inner">
                    <span class="count-text">Reach Worldwide</span>
                    <div class="inline-content">
                      <span class="odometer countup-number" data-count="20"></span>
                      <span class="count-plus">M</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="countup-item style-2 wow fadeInUp" data-wow-delay=".1s">
                  <span class="count-icon"><i class="tji-complete"></i></span>
                  <span class="steps">03.</span>
                  <div class="count-inner">
                    <span class="count-text">Projects Completed.</span>
                    <div class="inline-content">
                      <span class="odometer countup-number" data-count="93"></span>
                      <span class="count-plus">%</span>
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

export function FunFactSection() {
  return <section className="tj-funfact-section section-gap section-gap-x" dangerouslySetInnerHTML={{ __html: html }} />;
}
