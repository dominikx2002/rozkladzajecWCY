function smoothScrollTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
  
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;
  
    function animationScroll(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = easeInOutCubic(progress / duration);
      window.scrollTo(0, startPosition + distance * ease);
  
      if (progress < duration) {
        requestAnimationFrame(animationScroll);
      }
    }
  
    function easeInOutCubic(t) {
      return t *(2 - t)
    }
  
    requestAnimationFrame(animationScroll);
  }
  