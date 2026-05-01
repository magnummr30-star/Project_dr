const html = `<div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="contact-form style-3 wow fadeInUp" data-wow-delay=".4s">
                  <div class="sec-heading style-4">
                    <span class="sub-title"><i class="tji-box"></i>Get in Touch</span>
                    <h2 class="sec-title title-anim">Drop us a Line Here.</h2>
                  </div>
                  <form id="contact-form-3">
                    <div class="row wow fadeInUp" data-wow-delay=".5s">
                      <div class="col-sm-6">
                        <div class="form-input">
                          <label class="cf-label">Full Name *</label>
                          <input type="text" name="cfName3">
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-input">
                          <label class="cf-label">Email Address *</label>
                          <input type="email" name="cfEmail3">
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-input">
                          <label class="cf-label">Phone number *</label>
                          <input type="tel" name="cfPhone3">
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-input">
                          <div class="tj-nice-select-box">
                            <div class="tj-select">
                              <label class="cf-label">Chose a option</label>
                              <select name="cfSubject3">
                                <option value="1">Business Strategy</option>
                                <option value="2">Customer Experience</option>
                                <option value="3">Sustainability and ESG</option>
                                <option value="4">Training and Development</option>
                                <option value="5">IT Support & Maintenance</option>
                                <option value="6">Marketing Strategy</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-input message-input">
                          <label class="cf-label">Message here... *</label>
                          <textarea name="cfMessage3" id="message"></textarea>
                        </div>
                      </div>
                      <div class="submit-btn">
                        <button class="tj-primary-btn" type="submit">
                          <span class="btn-text"><span>Send Message</span></span>
                          <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="testimonial-wrapper-3 wow fadeInUp" data-wow-delay=".5s">
                  <div class="swiper testimonial-slider-2 h4-testimonial">
                    <h3 class="tes-title">Client Feedback (4.8<span>/out of 200</span>)</h3>
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <div class="testimonial-item">
                          <span class="quote-icon"><i class="tji-quote"></i></span>
                          <div class="desc">
                            <p>Working with Bexon has been a game-changer for our business. Their team's
                              professionalism,
                              attention to detail, and innovative solutions have helped us streamline operations and
                              achieve
                              our goals faster than we imagined. We truly feel like a valued partner. The results we’ve
                              seen
                              after partnering.</p>
                          </div>
                          <div class="testimonial-author">
                            <div class="author-inner">
                              <div class="author-img">
                                <img src="/assets/images/testimonial/client-1.webp" alt="">
                              </div>
                              <div class="author-header">
                                <h4 class="title">Guy Hawkins</h4>
                                <span class="designation">Co. Founder</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="testimonial-item">
                          <span class="quote-icon"><i class="tji-quote"></i></span>
                          <div class="desc">
                            <p>The results we’ve seen after partnering with Bexon are beyond our expectations. They not
                              only
                              understood our vision but also brought new ideas to the table that have taken our business
                              to
                              the next level. Their expertise and commitment to success make them a trusted.
                            </p>
                          </div>
                          <div class="testimonial-author">
                            <div class="author-inner">
                              <div class="author-img">
                                <img src="/assets/images/testimonial/client-2.webp" alt="">
                              </div>
                              <div class="author-header">
                                <h4 class="title">Ralph Edwards</h4>
                                <span class="designation">Co. Founder</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="testimonial-item">
                          <span class="quote-icon"><i class="tji-quote"></i></span>
                          <div class="desc">
                            <p>We’ve been working with Bexonfor years, and they continue to deliver outstanding results.
                              Their team is proactive, responsive, and always goes the extra mile to ensure our needs
                              are
                              met. They’ve become a key contributor to our growth and success that really help us"
                            </p>
                          </div>
                          <div class="testimonial-author">
                            <div class="author-inner">
                              <div class="author-img">
                                <img src="/assets/images/testimonial/client-3.webp" alt="">
                              </div>
                              <div class="author-header">
                                <h4 class="title">Devon Lane</h4>
                                <span class="designation">Co. Founder</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="testimonial-navigation d-flex">
                      <div class="slider-prev">
                        <span class="anim-icon">
                          <i class="tji-arrow-left"></i>
                          <i class="tji-arrow-left"></i>
                        </span>
                      </div>
                      <div class="slider-next">
                        <span class="anim-icon">
                          <i class="tji-arrow-right"></i>
                          <i class="tji-arrow-right"></i>
                        </span>
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

export function ContactSection() {
  return <section className="tj-contact-section h4-contact-section section-gap section-gap-x" dangerouslySetInnerHTML={{ __html: html }} />;
}
