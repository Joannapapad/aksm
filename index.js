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

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});


function updateMedia() {
    const videoElement = document.getElementById('videoSource');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const image3 = document.getElementById('image3');

    if (window.innerWidth < 800) {
        // Load smaller video for smaller screens
        videoElement.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video.mp4?alt=media&token=91a27c5d-27c2-4d71-b695-2071049eafe3';
        
        // Load smaller images
        image1.src = 'assets/slide_2_main_low.jpg';
        image2.src = 'assets/slide_3_main_low.jpg';
        image3.src = 'assets/slide_4_main_low.webp';
    } else {
        // Load large video for larger screens
        videoElement.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_high.mp4?alt=media&token=7efe5d1b-868a-4e36-8026-2b7c4e38f5f1';

        // Load larger images
        image1.src = 'assets/slide_2_main_high.jpg';
        image2.src = 'assets/slide_3_main.jpg';
        image3.src = 'assets/slide_4_main.webp';
    }
    
    // Reload the video to apply the new source
    const videoTag = videoElement.closest('video');
    videoTag.load();
}

// Check screen size on load and resize
window.addEventListener('load', updateMedia);
window.addEventListener('resize', updateMedia);

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.opacity = '1'; // Make the active slide visible
                slide.style.zIndex = '-1'; // Active slide gets z-index -1
                slide.classList.add('active');
            } else {
                slide.style.opacity = '0'; // Hide other slides
                slide.style.zIndex = '-2'; // Other slides get z-index -2
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Cycle through slides
        showSlide(currentIndex);
    }

    // Automatically change slides every 5 seconds
    setInterval(nextSlide, 6000);

    // Initialize the first slide as active
    showSlide(currentIndex);
});

// Lazy load images using IntersectionObserver
const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('data-src');
            lazyImage.classList.remove("lazy-img");
            lazyImage.classList.add("loaded"); // Add 'loaded' class to trigger CSS transitions
            observer.unobserve(lazyImage); // Stop observing once loaded
        }
    });
}, {
    rootMargin: '0px 0px 200px 0px', // Load images 200px before they appear in view
    threshold: 0.1 // Start loading when 10% of the image is visible
});

const lazyImages = document.querySelectorAll("img.lazy-img");

if ("IntersectionObserver" in window) {
    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage); // Observe each image
    });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(function(lazyImage) {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.removeAttribute('data-src');
        lazyImage.classList.add("loaded"); // Add 'loaded' class to trigger CSS transitions
    });
}

 // Slider functionality
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const sections = Array.from(slider.children);
let sectionIndex = 0;
let startX;
let isSwiping = false;
let isDragging = false;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    slider.style.transition = 'transform 0.5s ease'; // Adding smooth transition
}

function nextSlide() {
    // Increment sectionIndex and loop back if needed
    if (sectionIndex < sections.length - 1) {
        sectionIndex++;
    } else {
        sectionIndex = 0;
    }
    showSlide(sectionIndex);
}

function prevSlide() {
    // Decrement sectionIndex and loop back if needed
    if (sectionIndex > 0) {
        sectionIndex--;
    } else {
        sectionIndex = sections.length - 1;
    }
    showSlide(sectionIndex);
}

// Handle the "next" button click
next.addEventListener('click', function() {
    clearInterval(autoSlideInterval); // Pause auto-sliding
    nextSlide(); // Move to the next slide
    autoSlideInterval = setInterval(nextSlide, 5000); // Resume auto-sliding
});

// Handle the "prev" button click
prev.addEventListener('click', function() {
    clearInterval(autoSlideInterval); // Pause auto-sliding
    prevSlide(); // Move to the previous slide
    autoSlideInterval = setInterval(nextSlide, 5000); // Resume auto-sliding
});

// Initially show the first slide
showSlide(sectionIndex);

// Auto-slide functionality (every 5 seconds)
let autoSlideInterval = setInterval(nextSlide, 5000);

// Touch handling for swiping
slider.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX;
    isSwiping = true;
    clearInterval(autoSlideInterval); // Pause auto-sliding
});

slider.addEventListener('touchmove', function(e) {
    if (isSwiping) {
        let moveX = e.touches[0].pageX;
        let difference = startX - moveX;

        if (difference > 50) {
            nextSlide();
            isSwiping = false;
            autoSlideInterval = setInterval(nextSlide, 5000); // Resume auto-sliding
        } else if (difference < -50) {
            prevSlide();
            isSwiping = false;
            autoSlideInterval = setInterval(nextSlide, 5000); // Resume auto-sliding
        }
    }
});

slider.addEventListener('touchend', function() {
    isSwiping = false;
});

// Mouse handling for dragging
slider.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    isDragging = true;
    clearInterval(autoSlideInterval); // Pause auto-sliding
});

slider.addEventListener('mousemove', function(e) {
    if (isDragging) {
        let moveX = e.pageX;
        let difference = startX - moveX;

        if (difference > 50) {
            nextSlide();
            isDragging = false;
            autoSlideInterval = setInterval(nextSlide, 5000); // Resume auto-sliding
        } else if (difference < -50) {
            prevSlide();
            isDragging = false;
            autoSlideInterval = setInterval(nextSlide, 5000); // Resume auto-sliding
        }
    }
});

slider.addEventListener('mouseup', function() {
    isDragging = false;
});

slider.addEventListener('mouseleave', function() {
    isDragging = false;
});
    
// Carousel functionality for horizontal dragging only
const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".project_wrapper i");

if (carousel && carousel.querySelectorAll("img").length > 0) {
    const firstImg = carousel.querySelectorAll("img")[0];

    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    let isVerticalDrag = false;

    const showHideIcons = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth ? "none" : "block";
    };

    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const firstImgWidth = firstImg.clientWidth + 14; // Adjust for margins if any
            const scrollAmount = icon.id === "left" ? -firstImgWidth : firstImgWidth;
            carousel.scrollLeft += scrollAmount;
            setTimeout(showHideIcons, 60); // Show/hide icons based on scroll position
        });
    });

    const autoSlide = () => {
        if (carousel.scrollLeft <= 0 || carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) return;

        positionDiff = Math.abs(positionDiff);
        const firstImgWidth = firstImg.clientWidth + 14; // Adjust for margins if any
        const valDifference = firstImgWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            // Scroll right
            carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        } else {
            // Scroll left
            carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
        showHideIcons();
    };

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
        // Capture initial vertical position to detect vertical drag
        const prevPageY = e.pageY || e.touches[0].pageY;

        // Reset flags
        isVerticalDrag = false;
        positionDiff = 0;

        // Temporary event to determine drag direction
        const determineDragDirection = (e) => {
            let currentX = e.pageX || e.touches[0].pageX;
            let currentY = e.pageY || e.touches[0].pageY;

            if (Math.abs(currentX - prevPageX) > 5) {
                // If horizontal drag is detected, start horizontal dragging
                isDragging = true;
                document.removeEventListener("mousemove", determineDragDirection);
                carousel.classList.add("dragging");
            } else if (Math.abs(currentY - prevPageY) > 5) {
                // If vertical drag is detected, set flag to allow vertical scrolling
                isVerticalDrag = true;
                document.removeEventListener("mousemove", determineDragDirection);
            }
        };

        document.addEventListener("mousemove", determineDragDirection);
    };

    const dragging = (e) => {
        if (!isDragStart || isVerticalDrag) return;
        e.preventDefault();
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");
        if (isDragging) {
            isDragging = false;
            autoSlide();
        }
        // Reset flags
        isVerticalDrag = false;
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);
    document.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);
}


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
