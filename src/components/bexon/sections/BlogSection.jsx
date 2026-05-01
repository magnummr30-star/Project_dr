const html = `<div class="container">
            <div class="row">
              <div class="col-12">
                <div class="sec-heading style-4 text-center">
                  <span class="sub-title wow fadeInUp" data-wow-delay=".3s"><i class="tji-box"></i>Read Blogs</span>
                  <h2 class="sec-title title-anim">Strategies and Insights.</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="h4-blog-wrap">
                  <div class="blog-item style-3 wow fadeInUp" data-wow-delay=".3s">
                    <div class="blog-thumb">
                      <a href="/blog-details"><img src="/assets/images/blog/blog-1.webp" alt=""></a>
                      <div class="blog-date">
                        <span class="date">28</span>
                        <span class="month">Feb</span>
                      </div>
                    </div>
                    <div class="blog-content">
                      <div class="blog-meta">
                        <span class="categories"><a href="/blog-details">Business</a></span>
                        <span>By <a href="/blog-details">Ellinien Loma</a></span>
                      </div>
                      <h4 class="title"><a href="/blog-details">Harnessing Digital Transform a Roadmap
                          Businesses.</a>
                      </h4>
                      <a class="text-btn" href="/blog-details">
                        <span class="btn-text"><span>Read More</span></span>
                        <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                      </a>
                    </div>
                  </div>
                  <div class="blog-item style-3 wow fadeInUp" data-wow-delay=".5s">
                    <div class="blog-thumb">
                      <a href="/blog-details"><img src="/assets/images/blog/blog-2.webp" alt=""></a>
                    </div>
                    <div class="blog-content">
                      <div class="blog-meta">
                        <span class="categories"><a href="/blog-details">Business</a></span>
                        <span>By <a href="/blog-details">Ellinien Loma</a></span>
                      </div>
                      <h4 class="title"><a href="/blog-details">Harnessing Digital Transform a Roadmap
                          Businesses.</a>
                      </h4>
                      <a class="text-btn" href="/blog-details">
                        <span class="btn-text"><span>Read More</span></span>
                        <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                      </a>
                    </div>
                  </div>
                  <div class="blog-item style-3 wow fadeInUp" data-wow-delay=".7s">
                    <div class="blog-thumb">
                      <a href="/blog-details"><img src="/assets/images/blog/blog-3.webp" alt=""></a>
                    </div>
                    <div class="blog-content">
                      <div class="blog-meta">
                        <span class="categories"><a href="/blog-details">Business</a></span>
                        <span>By <a href="/blog-details">Ellinien Loma</a></span>
                      </div>
                      <h4 class="title"><a href="/blog-details">Mastering Change Management Lessons for
                          Businesses.</a>
                      </h4>
                      <a class="text-btn" href="/blog-details">
                        <span class="btn-text"><span>Read More</span></span>
                        <span class="btn-icon"><i class="tji-arrow-right-long"></i></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

export function BlogSection() {
  return <section className="tj-blog-section-4 section-gap" dangerouslySetInnerHTML={{ __html: html }} />;
}
