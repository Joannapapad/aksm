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
    const animationDelay = 200; // Delay (in milliseconds) to smooth toggling

    window.animateObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Add a delay to ensure smooth transitions between states
            if (entry.isIntersecting) {
                clearTimeout(entry.target.animationTimeout); // Clear previous timeout if any
                entry.target.animationTimeout = setTimeout(() => {
                    entry.target.classList.add('animate');
                }, animationDelay); // Add a slight delay for the "in" state
            } else {
                clearTimeout(entry.target.animationTimeout); // Clear any potential timeout
                entry.target.animationTimeout = setTimeout(() => {
                    entry.target.classList.remove('animate');
                }, animationDelay); // Add a slight delay for the "out" state
            }
        });
    }, { threshold: [0.3, 0.7] }); // Adjust threshold values to reduce toggle jitter

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
            .row a,
            .services_flex_container,
            .news2
        `);

        // Attach observer to each element
        elementsToObserve.forEach(element => {
            if (!element.animateObserved) { // Avoid re-observing elements already being tracked
                window.animateObserver.observe(element);
                element.animateObserved = true; // Mark the element as observed
            }
        });
    };

    // Observe elements on initial load
    observeElements();

    // If you dynamically add new content later, reapply observations
    document.addEventListener('contentloaded', observeElements); // Custom event for dynamically loaded content
}

});
