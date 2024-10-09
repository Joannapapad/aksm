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

});

// General Intersection Observer for animations
const animateObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Optionally unobserve after animation to improve performance
            animateObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Select the elements to observe, now including .carousel
const elementsToObserve = document.querySelectorAll('.text-left, .services_text-left, .subscribe,.about_services_title, .animated-line-container,.carousel, .animated-line-container3 ,.animated-line-container2, .heading, .project, .text-right, .vertical-separator, .services_vertical-separator, .vertical-separator2, .heropanel__content, .vertical-line-container, .customers, .row a'); 
// Observe all selected elements
elementsToObserve.forEach(element => animateObserver.observe(element));
