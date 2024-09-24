// Load header.html and nav.js sequentially
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;
        const script = document.createElement('script');
        script.src = 'nav.js';
        script.defer = true; // Use defer instead of async
        document.body.appendChild(script);
    });

// Add class when the window has loaded
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Update media sources based on screen size
function updateMedia() {
    const videoElement = document.getElementById('videoSource');
    const images = [
        document.getElementById('image1'),
        document.getElementById('image2'),
        document.getElementById('image3')
    ];

    const isSmallScreen = window.innerWidth < 800;
    videoElement.src = isSmallScreen
        ? 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video.mp4?alt=media&token=91a27c5d-27c2-4d71-b695-2071049eafe3'
        : 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_high.mp4?alt=media&token=7efe5d1b-868a-4e36-8026-2b7c4e38f5f1';

    images.forEach((img, index) => {
        img.src = isSmallScreen
            ? `assets/slide_${index + 2}_main_low.jpg`
            : `assets/slide_${index + 2}_main_high.jpg`;
    });

    videoElement.closest('video').load();
}

// Check screen size on load and resize
window.addEventListener('load', updateMedia);
window.addEventListener('resize', updateMedia);

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 6000);
    showSlide(currentIndex);
});

// Lazy load images using IntersectionObserver
const lazyImageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.replace("lazy-img", "loaded");
            lazyImageObserver.unobserve(lazyImage);
        }
    });
}, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.1
});

document.querySelectorAll("img.lazy-img").forEach(image => {
    lazyImageObserver.observe(image);
});

// General Intersection Observer for animations
const animateObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('animate', entry.isIntersecting);
    });
}, { threshold: 0.3 });

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateObserver.observe(element);
});

// Counter Animation
const counters = [
    { id: 'counter1', start: 0, end: 23, interval: 50 },
    { id: 'counter2', start: 1400, end: 2000, interval: -100 },
    { id: 'counter3', start: 0, end: 80, interval: 10 }
];

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const { id, start, end, interval } = entry.target.dataset;
            startCountdown(entry.target, parseInt(start), parseInt(end), parseInt(interval));
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

counters.forEach(({ id, start, end }) => {
    const counter = document.getElementById(id);
    if (counter) {
        counter.dataset.start = start;
        counter.dataset.end = end;
        counterObserver.observe(counter);
    }
});

function startCountdown(counter, start, end, interval) {
    let count = start;
    counter.textContent = count;
    const countdown = setInterval(() => {
        count += interval > 0 ? 1 : -1;
        counter.textContent = count;
        if ((interval > 0 && count >= end) || (interval < 0 && count <= end)) clearInterval(countdown);
    }, Math.abs(interval));
}

// Logo scroller
const logos = [...]; // (Add logo objects here)
function generateScrollerContent(logos) {
    const scrollerInner = document.querySelector(".scroller__inner");
    logos.forEach(logo => {
        const circleDiv = document.createElement("div");
        circleDiv.classList.add("circle");
        const img = document.createElement("img");
        img.setAttribute("loading", "lazy");
        img.src = logo.src;
        img.alt = logo.alt;
        circleDiv.appendChild(img);
        scrollerInner.appendChild(circleDiv);
    });
}
generateScrollerContent(logos);

// Slider functionality
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const sections = Array.from(slider.children);
let sectionIndex = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    sectionIndex = (sectionIndex + 1) % sections.length;
    showSlide(sectionIndex);
}

function prevSlide() {
    sectionIndex = (sectionIndex - 1 + sections.length) % sections.length;
    showSlide(sectionIndex);
}

// Button click events
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

// Auto-slide functionality
let autoSlideInterval = setInterval(nextSlide, 5000);

// Touch handling for swiping
let startX, isSwiping = false;
slider.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    isSwiping = true;
    clearInterval(autoSlideInterval);
});
slider.addEventListener('touchmove', e => {
    if (isSwiping) {
        const moveX = e.touches[0].pageX;
        const difference = startX - moveX;
        if (difference > 50) nextSlide();
        else if (difference < -50) prevSlide();
        isSwiping = false;
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
});

// Load footer.html
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer__cont').innerHTML = data;
    });
