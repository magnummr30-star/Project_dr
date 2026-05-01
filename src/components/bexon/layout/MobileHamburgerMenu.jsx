const html = `<div class="hamburger_bg"></div>
    <div class="hamburger_wrapper">
      <div class="hamburger_inner">
        <div class="hamburger_top d-flex align-items-center justify-content-between">
          <div class="hamburger_logo">
            <a href="/" class="mobile_logo brand-logo" aria-label="Global Experts for Industrial Development and Green Consultations">
              <img src="/images/logo.jpeg" alt="">
              <span class="brand-name">
                <span class="brand-name-ar" lang="ar">الشركة الدولية لخبراء التطوير الصناعي والإستشارات الخضراء</span>
                <span class="brand-name-en" lang="en">Global Experts for Industrial Development and Green Consultations</span>
              </span>
            </a>
          </div>
          <div class="bexon-language-slot bexon-language-slot-drawer" data-bexon-language-slot="drawer-mobile"></div>
          <div class="hamburger_close">
            <button class="hamburger_close_btn"><i class="fa-thin fa-times"></i></button>
          </div>
        </div>
        <div class="hamburger_menu">
          <div class="mobile_menu"></div>
        </div>
        <div class="hamburger-infos">
          <h5 class="hamburger-title">Contact Info</h5>
          <div class="contact-info">
            <div class="contact-item">
              <span class="subtitle">Phone</span>
              <a class="contact-link" href="tel:8089091313">808-909-1313</a>
            </div>
            <div class="contact-item">
              <span class="subtitle">Email</span>
              <a class="contact-link" href="mailto:info@bexon.com">info@bexon.com</a>
            </div>
            <div class="contact-item">
              <span class="subtitle">Location</span>
              <span class="contact-link">993 Renner Burg, West Rond, MT 94251-030</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hamburger-socials">
        <h5 class="hamburger-title">Follow Us</h5>
        <div class="social-links style-3">
          <ul>
            <li><a href="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
            </li>
            <li><a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            </li>
            <li><a href="https://x.com/" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>
            <li><a href="https://www.linkedin.com/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>`;

export function MobileHamburgerMenu() {
  return <div className="hamburger-area d-lg-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
