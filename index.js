function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

function setVideoSource() {
    const videoSource = document.getElementById('videoSource');
    const videoElement = document.getElementById('dynamicVideo');

    // Check screen width and assign video source accordingly
    if (window.innerWidth < 600) {
        // Set the mobile video source
        videoSource.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_low.mp4?alt=media&token=332280e9-1399-4646-81fe-c73daf2d4b5a'; // Replace with your mobile video URL
    } else {
        // Set the desktop video source
        videoSource.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_high.mp4?alt=media&token=7efe5d1b-868a-4e36-8026-2b7c4e38f5f1';
    }

    // Load the new video source
    videoElement.load();
}

// Set the video source on page load
window.onload = setVideoSource;

// Optionally, you can also change it on window resize
window.onresize = setVideoSource;
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
    // JavaScript for Parallax Effect



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
const elementsToObserve = document.querySelectorAll('.text-left, .services_text-left, .subscribe,.about_services_title, .animated-line-container, .animated-line-container2, .heading, .project, .text-right, .vertical-separator, .services_vertical-separator, .vertical-separator2, .heropanel__content, .vertical-line-container, .customers, .row a, .carousel'); 

// Observe all selected elements
elementsToObserve.forEach(element => animateObserver.observe(element));

// Observe all selected elements
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
    
// Carousel functionality for moving images only with buttons
const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".project_wrapper i");

if (carousel && carousel.querySelectorAll("img").length > 0) {
    const firstImg = carousel.querySelectorAll("img")[0];

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

    showHideIcons(); 
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

const scriptURL = 'https://script.google.com/macros/s/AKfycbwU3MRCwC23AnvYZorqqjv9RNGu62nXYUHrM6PmmDBP6eU396ldQ0ctix0dXUUJbLpR/exec'; // Replace with your actual script URL
const form = document.forms['submit-to-google-sheet'];
const subscribeButton = document.getElementById('subscribe-button');
const consentCheckbox = document.getElementById('consent');
const messageDisplay = document.querySelector('.thank-you-message'); // Select the message element
let isSubmitting = false; // Flag to check if form is currently being submitted

// Enable/Disable the submit button based on the checkbox and show a message when it's checked
consentCheckbox.addEventListener('change', () => {
  subscribeButton.disabled = !consentCheckbox.checked;

});

form.addEventListener('submit', e => {
  e.preventDefault();

  // Check if the form is already being submitted
  if (isSubmitting) {
    return; // Ignore further clicks until the current submission is done
  }

  // Check if the consent checkbox is checked
  if (!consentCheckbox.checked) {
    messageDisplay.textContent = 'Please check the consent box to proceed.';
    messageDisplay.style.display = 'block'; // Show consent checkbox error
    return; // Stop submission if consent is not checked
  }

  // Client-side validation for email format
  const emailInput = form.elements['Email'].value;
  if (!validateEmail(emailInput)) {
    messageDisplay.textContent = 'Please enter a valid email address.';
    messageDisplay.style.display = 'block'; // Show error message
    return;
  }

  // Proceed with submission
  const formData = new FormData(form);
  isSubmitting = true; // Set the flag to true to prevent further submissions
  messageDisplay.style.display = 'none'; // Hide any previous message

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        form.reset(); // Clear the form
        messageDisplay.textContent = "Please verify your subscription through your email!";
        messageDisplay.style.display = 'block'; // Show success message
        subscribeButton.disabled = true; // Disable button again after resetting the form
      } else {
        // Handle various errors from the server response
        if (data.error === 'Email already exists') {
          messageDisplay.textContent = "This email is already subscribed. Please check your inbox.";
          messageDisplay.style.display = 'block';
        } else if (data.error === 'Invalid request origin') {
          messageDisplay.textContent = 'Unauthorized request origin.';
          messageDisplay.style.display = 'block';
        } else if (data.error === 'Invalid email format') {
          messageDisplay.textContent = 'Invalid email format.';
          messageDisplay.style.display = 'block';
        } else {
          console.error('Error!', data.error);
          messageDisplay.textContent = 'There was an error processing your request. Please try again.';
          messageDisplay.style.display = 'block';
        }
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      messageDisplay.textContent = 'There was an error processing your request. Please try again.';
      messageDisplay.style.display = 'block';
    })
    .finally(() => {
      isSubmitting = false; // Reset the flag after submission (success or failure)
    });
});

// Simple email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
