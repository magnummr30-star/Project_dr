const html = `<div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="sec-heading style-4 text-center">
                  <span class="sub-title wow fadeInUp" data-wow-delay=".3s"><i class="tji-box"></i>Proud Projects</span>
                  <h2 class="sec-title title-anim">Breaking Boundaries, Building Dreams.</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="project-wrapper wow fadeInUp" data-wow-delay=".5s">
                  <div class="swiper project-slider-3">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <div class="project-item h4-project-item">
                          <div class="project-content">
                            <span class="categories"><a href="/portfolio-details">Business</a></span>
                            <div class="project-text">
                              <h4 class="title"><a href="/portfolio-details">Event Management Platform</a></h4>
                              <a class="tji-icon-btn" href="/portfolio-details">
                                <i class="tji-arrow-right-long"></i>
                              </a>
                            </div>
                          </div>
                          <div class="project-img">
                            <img src="/assets/images/project/project-4.webp" alt="Image">
                          </div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="project-item h4-project-item">
                          <div class="project-content">
                            <span class="categories"><a href="/portfolio-details">Business</a></span>
                            <div class="project-text">
                              <h4 class="title"><a href="/portfolio-details">Rebranding Strategy for a Growing</a>
                              </h4>
                              <a class="tji-icon-btn" href="/portfolio-details">
                                <i class="tji-arrow-right-long"></i>
                              </a>
                            </div>
                          </div>
                          <div class="project-img">
                            <img src="/assets/images/project/project-8.webp" alt="Image">
                          </div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="project-item h4-project-item">
                          <div class="project-content">
                            <span class="categories"><a href="/portfolio-details">Business</a></span>
                            <div class="project-text">
                              <h4 class="title"><a href="/portfolio-details">Event Management Platform</a></h4>
                              <a class="tji-icon-btn" href="/portfolio-details">
                                <i class="tji-arrow-right-long"></i>
                              </a>
                            </div>
                          </div>
                          <div class="project-img">
                            <img src="/assets/images/project/project-9.webp" alt="Image">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-pagination-area"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

export function ProjectSection() {
  return <section className="tj-project-section-4 section-gap" dangerouslySetInnerHTML={{ __html: html }} />;
}
