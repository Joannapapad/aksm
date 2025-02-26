document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        const navToggle = event.target.closest('.nav-toggle_header');
        if (navToggle) {
            const primaryNav = document.querySelector('.primary-navigation_header');
            const visibility = primaryNav.getAttribute('data-visible') === "true";
            primaryNav.setAttribute("data-visible", !visibility);
            navToggle.setAttribute("aria-expanded", !visibility);
        }
    });

    if (!window.animateObserver) {
        const animationDelay = 200;

        window.animateObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    clearTimeout(entry.target.animationTimeout);
                    entry.target.animationTimeout = setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, animationDelay);
                } else {
                    clearTimeout(entry.target.animationTimeout);
                    entry.target.animationTimeout = setTimeout(() => {
                        entry.target.classList.remove('animate');
                    }, animationDelay);
                }
            });
        }, { threshold: [0.3, 0.7] });

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

            elementsToObserve.forEach(element => {
                if (!element.animateObserved) {
                    window.animateObserver.observe(element);
                    element.animateObserved = true;
                }
            });
        };

        observeElements();
        document.addEventListener('contentloaded', observeElements);
    }
});
