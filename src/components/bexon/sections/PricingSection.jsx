const html = `<div class="container">
            <div class="row">
              <div class="col-lg-8 order-2 order-lg-1">
                <div class="accordion tj-faq pricing-accordion" id="pricing">
                  <div class="accordion-item pricing-box active wow fadeInUp" data-wow-delay=".3s">
                    <button class="faq-title" type="button" data-bs-toggle="collapse" data-bs-target="#pricing-1"
                      aria-expanded="true">Basic Plan</button>
                    <div id="pricing-1" class="collapse show" data-bs-parent="#pricing">
                      <div class="accordion-body pricing-inner">
                        <div class="pricing-header">
                          <div class="pricing-top">
                            <div class="package-desc">
                              <p>Essential Business Services</p>
                            </div>
                            <div class="package-price">
                              <span class="package-currency">$</span>
                              <span class="price-number">99</span>
                              <span class="package-period">/per month</span>
                            </div>
                          </div>
                          <div class="pricing-btn">
                            <a class="text-btn" href="/contact">
                              <span class="btn-text"><span>Chose Plan</span></span>
                              <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                            </a>
                          </div>
                        </div>
                        <div class="list-items">
                          <ul>
                            <li><i class="tji-list"></i>Access to core services</li>
                            <li><i class="tji-list"></i>Limited customer support (email)</li>
                            <li><i class="tji-list"></i>1 project per month</li>
                            <li><i class="tji-list"></i>Basic reporting and analytics</li>
                            <li><i class="tji-list"></i>Standard templates and tools</li>
                            <li><i class="tji-list"></i>Basic performance tracking</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item pricing-box wow fadeInUp" data-wow-delay=".3s">
                    <button class="faq-title collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#pricing-2" aria-expanded="false">Standard Plan</button>
                    <div id="pricing-2" class="collapse" data-bs-parent="#pricing">
                      <div class="accordion-body pricing-inner">
                        <div class="pricing-header">
                          <div class="package-desc">
                            <p>Complete Business Solutions</p>
                          </div>
                          <div class="package-price">
                            <span class="package-currency">$</span>
                            <span class="price-number">249</span>
                            <span class="package-period">/per month</span>
                          </div>
                          <div class="pricing-btn">
                            <a class="text-btn" href="/contact">
                              <span class="btn-text"><span>Chose Plan</span></span>
                              <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                            </a>
                          </div>
                        </div>
                        <div class="list-items">
                          <ul>
                            <li><i class="tji-list"></i>All features in Basic Plan</li>
                            <li><i class="tji-list"></i>Priority customer support</li>
                            <li><i class="tji-list"></i>Up to 3 projects per month</li>
                            <li><i class="tji-list"></i>Monthly performance reviews</li>
                            <li><i class="tji-list"></i>Collaboration tools for team</li>
                            <li><i class="tji-list"></i>Custom templates</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item pricing-box wow fadeInUp" data-wow-delay=".3s">
                    <button class="faq-title collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#pricing-3" aria-expanded="false">Premium Plan</button>
                    <div id="pricing-3" class="collapse" data-bs-parent="#pricing">
                      <div class="accordion-body pricing-inner">
                        <div class="pricing-header">
                          <div class="package-desc">
                            <p>Advanced Business Services</p>
                          </div>
                          <div class="package-price">
                            <span class="package-currency">$</span>
                            <span class="price-number">499</span>
                            <span class="package-period">/per month</span>
                          </div>
                          <div class="pricing-btn">
                            <a class="text-btn" href="/contact">
                              <span class="btn-text"><span>Chose Plan</span></span>
                              <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                            </a>
                          </div>
                        </div>
                        <div class="list-items">
                          <ul>
                            <li><i class="tji-list"></i>All features in Standard Plan</li>
                            <li><i class="tji-list"></i>Dedicated account manager</li>
                            <li><i class="tji-list"></i>Tailored strategy sessions</li>
                            <li><i class="tji-list"></i>Quarterly performance audits</li>
                            <li><i class="tji-list"></i>Priority support</li>
                            <li><i class="tji-list"></i>24/7 emergency service</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 order-1 order-lg-2">
                <div class="content-wrap slidebar-stickiy">
                  <div class="sec-heading style-4">
                    <span class="sub-title wow fadeInUp" data-wow-delay=".3s"><i class="tji-box"></i>Flexible
                      pricing</span>
                    <h2 class="sec-title title-anim">Our Pricing Plan.</h2>
                  </div>
                  <p class="desc">Our team is always available to address your concerns, providing quick.</p>
                  <div class="d-none d-lg-inline-flex wow fadeInUp" data-wow-delay=".6s">
                    <a class="tj-primary-btn" href="/pricing">
                      <span class="btn-text"><span>More Pricing</span></span>
                      <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="d-lg-none d-flex mt-5">
                  <a class="tj-primary-btn" href="/pricing">
                    <span class="btn-text"><span>More Pricing</span></span>
                    <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>`;

export function PricingSection() {
  return <section className="tj-pricing-section-2 section-gap section-separator slidebar-stickiy-container" dangerouslySetInnerHTML={{ __html: html }} />;
}
