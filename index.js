function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

function setVideoSource() {
    const videoSource = document.getElementById('videoSource');
    const videoElement = document.getElementById('dynamicVideo');
    const currentSource = videoSource.src;

    if (window.innerWidth < 600) {
        videoSource.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_low.mp4?alt=media&token=cfae68f3-1636-4543-ac3f-c8c6d19b1b90';
    } else {
        videoSource.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_high.mp4?alt=media&token=c63fcf1a-bcf2-41c2-ae31-1dffe0432fcd';
    }

    if (currentSource !== videoSource.src) {
        videoElement.load();
        videoElement.play().catch(error => {
            console.warn('Video play failed:', error);
        });
    }
}

window.onload = setVideoSource;
window.onresize = setVideoSource;

fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;

    const script = document.createElement('script');
    script.src = 'nav.js';
    script.defer = true;
    document.body.appendChild(script);
    });

window.addEventListener('load', () => {
    const video = document.querySelector("video");

    if (video) {
        video.addEventListener("canplaythrough", () => {
            document.body.classList.add("loaded");
        });
    } else {
        document.body.classList.add("loaded");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    const categories = [
        "Scan2Bim",
        "Construction Surveying",
        "Deformation Monitoring",
        "UAV Mapping"
    ];

    const categoryUrls = {
        "Scan2Bim": "services.html#scan2bim-section",
        "Construction Surveying": "services.html#ci_surveying",
        "Deformation Monitoring": "services.html#deformation-monitoring",
        "UAV Mapping": "services.html#UVA_mapping"
    };

    const categoryTextElement = document.getElementById('categoryText');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.opacity = '1';
                slide.style.zIndex = '1';
                slide.classList.add('active');
                categoryTextElement.textContent = categories[index];
                categoryTextElement.style.opacity = '1';
            } else {
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
                slide.classList.remove('active');
            }
        });

        if (index >= 0) {
            setTimeout(() => {
                categoryTextElement.style.opacity = '0';
            }, 5800);
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 6000);
    showSlide(currentIndex);

    categoryTextElement.addEventListener('click', () => {
        const currentCategory = categories[currentIndex];
        const targetUrl = categoryUrls[currentCategory];

        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });
});

const counters = [
    { counterId: 'counter1', startCount: 0, maxCount: 25, interval: 50 },
    { counterId: 'counter2', startCount: 2900, maxCount: 3000, interval: 10 },
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
    { src: "assets/customers/titan.jpg", alt: "titan" },
    { src: "assets/customers/elval.jpg", alt: "elval" },
    { src: "assets/customers/temes.jpg", alt: "temes" },
    { src: "assets/customers/terna.jpg", alt: "terna" },
    { src: "assets/customers/elemka.jpg", alt: "elemka" },
    { src: "assets/customers/ballian.jpg", alt: "ballian" },
    { src: "assets/customers/atlantis.jpg", alt: "atlantis" },
    { src: "assets/customers/metalsystems.jpg", alt: "metalsystems" },
    { src: "assets/customers/unispace.jpg", alt: "unispace" },
    { src: "assets/customers/bic.jpg", alt: "bic" },
    { src: "assets/customers/adark.jpg", alt: "adark" },
    { src: "assets/customers/eurohub.jpg", alt: "eurohub" },
    { src: "assets/customers/arka.jpg", alt: "arka" },
    { src: "assets/customers/ethnokat.jpg", alt: "ethnokat" },
    { src: "assets/customers/redex.jpg", alt: "redex" },
    { src: "assets/customers/lafarge.jpg", alt: "lafarge" },
    { src: "assets/customers/AIA.jpg", alt: "AIA" },
    { src: "assets/customers/ioniki.jpg", alt: "ioniki" },
    { src: "assets/customers/vitael.jpg", alt: "vitael" },
    { src: "assets/customers/sklavenitis.jpg", alt: "sklavenitis" },
    { src: "assets/customers/metlen.jpg", alt: "metlen" },
    { src: "assets/customers/fraport.jpg", alt: "fraport" },
    { src: "assets/customers/noval.jpg", alt: "noval" },
    { src: "assets/customers/eyau.jpg", alt: "eyau" },
    { src: "assets/customers/metka.jpg", alt: "metka" },
    { src: "assets/customers/dimand.jpg", alt: "dimand" },
    { src: "assets/customers/peraiosbank.jpg", alt: "peraiosbank" }
];

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

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const sections = Array.from(slider.children);
let sectionIndex = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    slider.style.transition = 'transform 0.5s ease';
}

function nextSlide() {
    sectionIndex = (sectionIndex + 1) % sections.length;
    showSlide(sectionIndex);
}

function prevSlide() {
    sectionIndex = (sectionIndex - 1 + sections.length) % sections.length;
    showSlide(sectionIndex);
}

next.addEventListener('click', function() {
    nextSlide();
});

prev.addEventListener('click', function() {
    prevSlide();
});

showSlide(sectionIndex);

function initSlider(sliderContainerSelector, prevBtnSelector, nextBtnSelector) {
    const slider = document.querySelector(sliderContainerSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    if (slider && prevBtn && nextBtn) {
        const items = slider.querySelectorAll('.img__wrap');
        const itemWidth = items[0].offsetWidth + 10;
        let visibleCards = Math.floor(slider.offsetWidth / itemWidth);
        let scrollPosition = slider.scrollLeft;

        function updateButtons() {
            const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
            prevBtn.style.display = scrollPosition > 0 ? 'block' : 'none';
            nextBtn.style.display = scrollPosition < maxScrollLeft ? 'block' : 'none';
        }

        function updateScrollAmount() {
            visibleCards = Math.floor(slider.offsetWidth / itemWidth);
        }

        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (slider.classList.contains('animate')) {
                        updateScrollAmount();
                        break;
                    }
                }
            }
        });

        observer.observe(slider, { attributes: true });

        window.addEventListener('resize', () => {
            if (slider.classList.contains('animate')) {
                updateScrollAmount();
            }
        });

        updateScrollAmount();
        updateButtons();

        nextBtn.addEventListener('click', () => {
            scrollPosition = Math.min(scrollPosition + (itemWidth * visibleCards), slider.scrollWidth - slider.clientWidth);
            slider.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            updateButtons();
        });

        prevBtn.addEventListener('click', () => {
            scrollPosition = Math.max(scrollPosition - (itemWidth * visibleCards), 0);
            slider.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            updateButtons();
        });
    }
}

initSlider(".carousel", "#left", "#right");

function changeImage(element, newSrc) {
    element.querySelector('img').src = newSrc;
}

function restoreImage(element, originalSrc) {
    element.querySelector('img').src = originalSrc;
}

fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer__cont').innerHTML = data;
});
