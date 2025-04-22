document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".verse").forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
  
        const el = this;
        const href = el.getAttribute("href");
  
        sessionStorage.setItem("scrollTarget", "calendars");
  
        const logo = el.querySelector('.logo-preview');
        logo.style.opacity = "0";
        logo.style.filter = "blur(10px)";
        logo.style.transform = "scale(0.95)";

        setTimeout(() => {
          el.classList.add("slide-out");
  
          setTimeout(() => {
            window.location.href = href;
          }, 600);
        }, 100);
      });
    });
});      