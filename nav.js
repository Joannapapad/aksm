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
    const animateObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('animate', entry.isIntersecting);
        });
    }, { threshold: 0.3 });

    const elementsToObserve = document.querySelectorAll('.text-left, .services_text-left, .about_services_title, .animated-line-container, .animated-line-container2, .heading, .project, .text-right, .vertical-separator, .services_vertical-separator, .vertical-separator2, .heropanel__content, .vertical-line-container, .customers');
    elementsToObserve.forEach(element => animateObserver.observe(element));

    // Counter Animation
    const counters = [
        { counterId: 'counter1', startCount: 0, maxCount: 23, interval: 50 },
        { counterId: 'counter2', startCount: 1400, maxCount: 2000, interval: -100 },
        { counterId: 'counter3', startCount: 0, maxCount: 80, interval: 10 }
    ];

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const { counterId, startCount, maxCount, interval } = entry.target.dataset;
                startCountdown(entry.target, parseInt(startCount), parseInt(maxCount), parseInt(interval));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(item => {
        const counter = document.getElementById(item.counterId);
        if (counter) {
            counter.dataset.startCount = item.startCount;
            counter.dataset.maxCount = item.maxCount;
            counter.dataset.interval = item.interval;
            counterObserver.observe(counter);
        }
    });

    function startCountdown(counter, startCount, maxCount, interval) {
        let count = startCount;
        counter.textContent = count;
        const countdown = setInterval(() => {
            count++;
            counter.textContent = count;
            if (count >= maxCount) clearInterval(countdown);
        }, interval);
    }

    const logos = [
        { src: "assets/constumers/LOGOS/LOGOS/stfa.jpg", alt: "STFA" },
        { src: "assets/constumers/LOGOS/LOGOS/LOGO_TOSONI.jpg", alt: "tosoni" },
        { src: "assets/constumers/LOGOS/LOGOS/LOGO_village_roadshow.jpg", alt: "village_cinema" },
        { src: "assets/constumers/LOGOS/LOGOS/alja.jpg", alt: "alja" },
        { src: "assets/constumers/LOGOS/LOGOS/l&-T-logo.jpg", alt: "I&T" },
        { src: "assets/constumers/LOGOS/LOGOS/logo_aktor_en.jpg", alt: "aktor" },
        { src: "assets/constumers/LOGOS/LOGOS/alysj.jpg", alt: "alysj" },
        { src: "assets/constumers/LOGOS/EOLFI.jpg", alt: "eolfi" },
        { src: "assets/constumers/LOGOS/EMEK.JPG", alt: "emek" },
        { src: "assets/constumers/LOGOS/ELMEC SPORT.jpg", alt: "emelksport" },
        { src: "assets/constumers/LOGOS/DSTEEL.jpg", alt: "steel" },
        { src: "assets/constumers/LOGOS/DIMAND.JPG", alt: "dimand" },
        { src: "assets/constumers/LOGOS/CYCLON.jpg", alt: "cyclon" },
        { src: "assets/constumers/LOGOS/CORE.JPG", alt: "core" },
        { src: "assets/constumers/LOGOS/BIC.jpg", alt: "bic" },
        { src: "assets/constumers/LOGOS/BEMEKEP.JPG", alt: "bemekep" },
        { src: "assets/constumers/LOGOS/ARKTEAM.JPG", alt: "arkteam" },
        { src: "assets/constumers/LOGOS/ARCON. CONST..jpg", alt: "arcon" },
        { src: "assets/constumers/LOGOS/ALUMAN.JPG", alt: "aluman" },
        { src: "assets/constumers/LOGOS/ALSTOM.jpg", alt: "alstom" },
        { src: "assets/constumers/LOGOS/ZINON ATH..JPG", alt: "zinon" },
        { src: "assets/constumers/LOGOS/YPOURGEIO DHMOSIAS TAXIS.JPG", alt: "ypoyrgeio" },
        { src: "assets/constumers/LOGOS/xalyvourgiki.jpg", alt: "xalivourgiki" },
        { src: "assets/constumers/LOGOS/TERNA.jpg", alt: "terna" },
        { src: "assets/constumers/LOGOS/terkenlis1.jpg", alt: "terkenlis" },
        { src: "assets/constumers/LOGOS/SWLIN. KORINTHOU.jpg", alt: "svlin" },
        { src: "assets/constumers/LOGOS/sidma ae1.jpg", alt: "sidma" },
        { src: "assets/constumers/LOGOS/SANYO HELLAS.jpg", alt: "sanyo" },
        { src: "assets/constumers/LOGOS/SAMIA INTERNATIONAL.JPG", alt: "samia" },
        { src: "assets/constumers/LOGOS/MOXLOS.jpg", alt: "moxlos" },
        { src: "assets/constumers/LOGOS/METRON.JPG", alt: "metron" },
        { src: "assets/constumers/LOGOS/METKA.jpg", alt: "metka" },
        { src: "assets/constumers/LOGOS/maillis.jpg", alt: "maillis" },
        { src: "assets/constumers/LOGOS/LEROY MERLIN.jpg", alt: "leroi" },
        { src: "assets/constumers/LOGOS/KOCH + PARTNERS.JPG", alt: "koch + partners" },
        { src: "assets/constumers/LOGOS/karenta ae.jpg", alt: "karenta" },
        { src: "assets/constumers/LOGOS/intrakat.jpg", alt: "intrakat" },
        { src: "assets/constumers/LOGOS/IMBREGILO.jpg", alt: "IMBREGILO" },
        { src: "assets/constumers/LOGOS/h & m.jpg", alt: "h&m" },
        { src: "assets/constumers/LOGOS/FOKAS.JPG", alt: "fokas" },
        { src: "assets/constumers/LOGOS/FOCAL.JPG", alt: "focal" }
    ];
    
// Function to generate scroller content dynamically
function generateScrollerContent(logos) {
    const scrollerInner = document.querySelector(".scroller__inner");

    logos.forEach(logo => {
        // Create a new div for each logo
        const circleDiv = document.createElement("div");
        circleDiv.classList.add("circle");

        // Create a new image element
        const img = document.createElement("img");
        img.setAttribute("loading", "lazy");
        img.setAttribute("src", logo.src);
        img.setAttribute("alt", logo.alt);

        // Append the image to the circle div
        circleDiv.appendChild(img);

        // Append the circle div to the scroller inner container
        scrollerInner.appendChild(circleDiv);
    });
}

// Call the function to generate the content
generateScrollerContent(logos);

// Handle scroller animation if not reducing motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const scrollers = document.querySelectorAll(".scroller");
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (scrollerInner) {
            const scrollerContent = Array.from(scrollerInner.children);
            scrollerContent.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(clone);
            });
        }
    });
}
});
