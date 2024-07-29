document.addEventListener('DOMContentLoaded', () => {
    // Toggle navigation menu
    document.body.addEventListener('click', (event) => {
        const navToggle = event.target.closest('.nav-toggle_header');
        if (navToggle) {
            const primaryNav = document.querySelector('.primary-navigation_header');
            const visibility = primaryNav.getAttribute('data-visible') === "true";
            primaryNav.setAttribute("data-visible", !visibility);
            navToggle.setAttribute("aria-expanded", !visibility);
        }
    });
  
    // Intersection Observer for nav-toggle button visibility (project overlay)
    const navToggle = document.querySelector('.nav-toggle');
    const projectOverlay = document.querySelector('.project-overlay');
  
    if (navToggle && projectOverlay) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navToggle.classList.add('active');
                } else {
                    navToggle.classList.remove('active');
                }
            });
        }, {
            threshold: [0],
            rootMargin: '-100% 0px 0px 0px'
        });
  
        observer.observe(projectOverlay);
    }
  });