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

    // General Intersection Observer for animations
    if (!window.animateObserver) { // Use a global check to prevent reinitialization
        window.animateObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Optionally unobserve to improve performance
                    animateObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Function to observe elements dynamically
        const observeElements = () => {
            const elementsToObserve = document.querySelectorAll(`
                .text-left,
                .link-wrapper,
                .services_text-left,
                .subscribe,
                .about_services_title,
                .animated-line-container,
                .carousel,
                .animated-line-container3,
                .animated-line-container2,
                .animated-line-container4,
                .heading,
                .project,
                .text-right,
                .vertical-separator,
                .services_vertical-separator,
                .vertical-separator2,
                .heropanel__content,
                .vertical-line-container,
                .customers,
                .row a
            `);

            // Attach observer to each element
            elementsToObserve.forEach(element => {
                if (!element.classList.contains('animate')) { // Avoid re-observing animated elements
                    animateObserver.observe(element);
                }
            });
        };

        // Observe elements on initial load
        observeElements();

        // If you dynamically add new content later, reapply observations:
        document.addEventListener('contentloaded', observeElements); // Custom event example
    }
});
