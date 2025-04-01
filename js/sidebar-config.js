document.addEventListener("scroll", () => {
    const sidebar = document.getElementById("sidebar");
    const home = document.getElementById("home");

    if (!sidebar || !home) return;

    
    // const isMobile = window.innerWidth <= 480;
    // if(isMobile) {
      // sidebar.classList.remove("hidden");
      // sidebar.classList.add("mobile-visible");
      // return;
    // }
    

    const homeBottom = home.getBoundingClientRect().bottom;

    if(homeBottom <= 0) {
        sidebar.classList.remove("hidden");
    } else {
        sidebar.classList.add("hidden");
    }
});

document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const menuItems = document.querySelectorAll(".menu-item");

  let currentSectionId = "home"; // domyślna

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      currentSectionId = section.id;
    }
  });

  menuItems.forEach(item => {
    item.classList.remove("active");
    if (item.onclick?.toString().includes(`'${currentSectionId}'`)) {
      item.classList.add("active");
    }
  });
});