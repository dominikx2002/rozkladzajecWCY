window.addEventListener('DOMContentLoaded', () => {

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
      window.scrollTo(0, 0);
    }
  
    const container = document.querySelector('[data-scroll-container]');
  
    window.locoScroll = new LocomotiveScroll({
      el: container,
      smooth: true,
      lerp: 0.03
    });
  
    const scrollTarget = sessionStorage.getItem("scrollTarget");
  
    if (scrollTarget) {
      setTimeout(() => {
        locoScroll.scrollTo(`#${scrollTarget}`, {
          offset: 0,
          duration: 800,
          easing: [0.25, 0.0, 0.35, 1.0]
        });
  
        sessionStorage.removeItem("scrollTarget");
      }, 300);
    }
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
  
        const target = this.getAttribute("href");
        const offset = parseInt(this.dataset.offset || 0);
        const element = document.querySelector(target);
  
        if (locoScroll && element) {
          locoScroll.scrollTo(target, {
            offset: offset,
            duration: 800,
            easing: [0.25, 0.0, 0.35, 1.0]
          });
  
          history.pushState(null, null, target);
        }
      });
    });
  });
  