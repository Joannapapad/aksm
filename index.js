// Function to preload images
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url; // This triggers the loading of the image
    });
}

// URLs of images you want to preload
const imageUrls = [
    'assets/slide_2_main_low.jpg',
    'assets/slide_3_main_low.jpg',
    'assets/slide_4_main_low.webp'
];
// Preload images
preloadImages(imageUrls);
// Load header.html and nav.js sequentially
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;

        const script = document.createElement('script');
        script.src = 'nav.js';
        script.defer = true;  // Use defer instead of async
        document.body.appendChild(script);
    });

// Add loaded class to body on window load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// JavaScript for Parallax Effect
function updateMedia() {
    const videoElement = document.getElementById('videoSource');
    const images = Array.from({ length: 12 }, (_, i) => document.getElementById(`image${i + 1}`));

    const isSmallScreen = window.innerWidth < 800;
    videoElement.src = isSmallScreen
        ? 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video.mp4?alt=media&token=d181133e-6109-44a6-9941-e2cd5c8148fb'
        : 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_high.mp4?alt=media&token=7efe5d1b-868a-4e36-8026-2b7c4e38f5f1';

    const basePath = isSmallScreen ? 'low' : 'high';
    const imagesSrc = [
        'slide_2_main', 'slide_3_main', 'slide_4_main.webp', 
        'aksm_news_5', 'aksm_img2', 
        '2024_042_Elementengineers.Paros/revit.png', 
        '2021_009_Temes.Hilton/image_front.jpg', 
        '2022_049_Terna.PwC/image_front.jpg', 
        '2022_062_Terna.Vasiliko.Cyprus/image_front.jpg', 
        '2023_073_Ballian.Noval/image_front.jpg', 
        '2024_039_Metka_Galleria.Riviera/image_front.jpg', 
        '2024_036_Ballian.Avenue_Mon/image_front.jpg'
    ].map(name => `assets/${name}_${basePath}.jpg`);

    images.forEach((img, index) => {
        img.src = imagesSrc[index];
    });

    // Reload the video to apply the new source
    videoElement.closest('video').load();
}

// Check screen size on load and resize
window.addEventListener('load', updateMedia);
window.addEventListener('resize', updateMedia);

// Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = (i === index) ? '1' : '0';
            slide.style.zIndex = (i === index) ? '-1' : '-2';
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Automatically change slides every 6 seconds
    setInterval(nextSlide, 6000);
    showSlide(currentIndex);
});

// Intersection Observer for animations
const animateObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('animate', entry.isIntersecting);
    });
}, { threshold: 0.3 });

document.querySelectorAll('.text-left, .services_text-left, .about_services_title, .animated-line-container, .animated-line-container2, .heading, .project, .text-right, .vertical-separator, .services_vertical-separator, .vertical-separator2, .heropanel__content, .vertical-line-container, .customers').forEach(element => {
    animateObserver.observe(element);
});

// Counter Animation
const counters = [
    { counterId: 'counter1', startCount: 0, maxCount: 23, interval: 50 },
    { counterId: 'counter2', startCount: 1400, maxCount: 2000, interval: -100 },
    { counterId: 'counter3', startCount: 0, maxCount: 80, interval: 10 }
];

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const { startCount, maxCount, interval } = entry.target.dataset;
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

// Logo Scroller
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
    { src: "assets/constumers/LOGOS/alstom.jpg", alt: "alstom" },
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
        const circleDiv = document.createElement("div");
        circleDiv.classList.add("circle");

        const img = document.createElement("img");
        img.setAttribute("loading", "lazy");
        img.setAttribute("src", logo.src);
        img.setAttribute("alt", logo.alt);

        circleDiv.appendChild(img);
        scrollerInner.appendChild(circleDiv);
    });
}

generateScrollerContent(logos);

// Handle scroller animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const scrollers = document.querySelectorAll(".scroller");
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (scrollerInner) {
            Array.from(scrollerInner.children).forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(clone);
            });
        }
    });
}

// Slider functionality
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const sections = Array.from(slider.children);
let sectionIndex = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    slider.style.transition = 'transform 0.5s ease'; // Adding smooth transition
}

function nextSlide() {
    sectionIndex = (sectionIndex + 1) % sections.length;
    showSlide(sectionIndex);
}

function prevSlide() {
    sectionIndex = (sectionIndex - 1 + sections.length) % sections.length;
    showSlide(sectionIndex);
}

let autoSlideInterval = setInterval(nextSlide, 5000);

nextButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    nextSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
});

prevButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    prevSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Touch handling for swiping
let startX;
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    clearInterval(autoSlideInterval);
});

slider.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].pageX;
    const difference = startX - moveX;
    if (difference > 50) {
        nextSlide();
    } else if (difference < -50) {
        prevSlide();
    }
});

slider.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    clearInterval(autoSlideInterval);
});

slider.addEventListener('mousemove', (e) => {
    if (e.buttons) {
        const moveX = e.pageX;
        const difference = startX - moveX;
        if (difference > 50) {
            nextSlide();
        } else if (difference < -50) {
            prevSlide();
        }
    }
});

// Carousel functionality for moving images only with buttons
const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".project_wrapper i");

if (carousel) {
    const firstImg = carousel.querySelectorAll("img")[0];

    const showHideIcons = () => {
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth ? "none" : "block";
    };

    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            carousel.scrollLeft += icon.id === "left" ? -firstImg.clientWidth : firstImg.clientWidth;
            setTimeout(showHideIcons, 50);
        });
    });

    carousel.addEventListener("scroll", showHideIcons);
    showHideIcons();
}
