const html = `<div class="body-overlay"></div>
  <!-- Preloader Start -->
  <div class="tj-preloader is-loading">
    <div class="tj-preloader-inner">
      <div class="tj-preloader-ball-wrap">
        <div class="tj-preloader-ball-inner-wrap">
          <div class="tj-preloader-ball-inner">
            <div class="tj-preloader-ball"></div>
          </div>
          <div class="tj-preloader-ball-shadow"></div>
        </div>
        <div id="tj-weave-anim" class="tj-preloader-text">Loading...</div>
      </div>
    </div>
    <div class="tj-preloader-overlay"></div>
  </div>
  <!-- Preloader end -->

  <!-- back to top start -->
  <div id="tj-back-to-top"><span id="tj-back-to-top-percentage"></span></div>
  <!-- back to top end -->

  <!-- start: Search Popup -->
  <div class="search-popup-overlay"></div>
  <!-- end: Search Popup -->`;

export function BexonShellElements() {
  return <div className="bexon-static-html" dangerouslySetInnerHTML={{ __html: html }} />;
}
