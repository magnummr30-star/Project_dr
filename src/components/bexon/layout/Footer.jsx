const html = `<div class="footer-top">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <div class="footer-cta">
                  <h2 class="cta-title title-anim">Let’s Build Future Together?</h2>
                  <a class="cta-btn wow fadeInUp" data-wow-delay=".3s" href="/contact">
                    <div class="customers">
                      <ul>
                        <li><img src="/assets/images/testimonial/client-1.webp" alt=""></li>
                        <li><img src="/assets/images/testimonial/client-2.webp" alt=""></li>
                        <li><img src="/assets/images/testimonial/client-3.webp" alt=""></li>
                      </ul>
                    </div>
                    <span class="btn-text"><span>Lets Talk</span> <i class="tji-arrow-right-long"></i></span>
                  </a>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="footer-widget widget-subscribe-3 wow fadeInUp" data-wow-delay=".5s">
                  <h3 class="title">Subscribe to Our Newsletter.</h3>
                  <div class="subscribe-form">
                    <form action="#">
                      <input type="email" name="email" placeholder="Enter email">
                      <button class="tj-primary-btn d-none d-sm-flex" type="submit">
                        <span class="btn-text"><span>Subscribe</span></span>
                        <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                      </button>
                      <label for="agree"><input id="agree" type="checkbox">Agree to our <a href="#">Terms &
                          Condition?</a></label>
                      <button class="tj-primary-btn d-flex d-sm-none " type="submit">
                        <span class="btn-text"><span>Subscribe</span></span>
                        <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-main-area">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-xl-3 col-md-6">
                <div class="footer-widget wow fadeInUp" data-wow-delay=".1s">
                  <h5 class="title">Our Company</h5>
                  <div class="footer-text">
                    <p>Developing personalze our customer journeys to increase satisfaction & loyalty of our expansion.
                    </p>
                  </div>
                  <div class="award-logo-area">
                    <div class="award-logo">
                      <img src="/assets/images/footer/award-logo-1.webp" alt="">
                    </div>
                    <div class="award-logo">
                      <img src="/assets/images/footer/award-logo-2.webp" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="footer-widget footer-col-2 widget-nav-menu wow fadeInUp" data-wow-delay=".3s">
                  <h5 class="title">Services</h5>
                  <ul>
                    <li><a href="#">Customer Experience</a></li>
                    <li><a href="#">Training Programs</a></li>
                    <li><a href="#">Business Strategy</a></li>
                    <li><a href="#">Training Program</a></li>
                    <li><a href="#">ESG Consulting</a></li>
                    <li><a href="#">Development Hub</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="footer-widget footer-col-3 widget-nav-menu wow fadeInUp" data-wow-delay=".5s">
                  <h5 class="title">Resources</h5>
                  <ul>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Team Member</a></li>
                    <li><a href="#">Recognitions</a></li>
                    <li><a href="/careers">Careers <span class="badge">New</span></a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Feedback</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="footer-widget widget-contact style-2 wow fadeInUp" data-wow-delay=".7s">
                  <h5 class="title">Our Office</h5>
                  <div class="footer-contact-info">
                    <div class="contact-item">
                      <span>993 Renner Burg, West Rond, MT 94251-030, USA.</span>
                    </div>
                    <div class="contact-item">
                      <a href="tel:10095447818">P: +1 (009) 544-7818</a>
                      <a href="mailto:support@bexon.com">M: support@bexon.com</a>
                    </div>
                    <div class="contact-item">
                      <span><i class="tji-clock"></i> Mon-Fri 10am-10pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tj-copyright-area-4">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="copyright-content-area">
                  <div class="copyright-text">
                    <p>&copy; <span>2026</span> <a href="https://themeforest.net/user/theme-junction/portfolio"
                        target="_blank">Bexon</a> All right reserved</p>
                  </div>
                  <div class="social-links style-2">
                    <ul>
                      <li><a href="https://www.facebook.com/" target="_blank"><i
                            class="fa-brands fa-facebook-f"></i></a>
                      </li>
                      <li><a href="https://www.instagram.com/" target="_blank"><i
                            class="fa-brands fa-instagram"></i></a>
                      </li>
                      <li><a href="https://x.com/" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>
                      <li><a href="https://www.linkedin.com/" target="_blank"><i
                            class="fa-brands fa-linkedin-in"></i></a>
                      </li>
                    </ul>
                  </div>
                  <div class="copyright-menu">
                    <ul>
                      <li><a href="/contact">Privacy Policy</a></li>
                      <li><a href="/contact">Terms & Condition</a></li>
                    </ul>
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

export function Footer() {
  return <footer className="tj-footer-section footer-4 section-gap-x" dangerouslySetInnerHTML={{ __html: html }} />;
}
