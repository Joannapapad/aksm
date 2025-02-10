function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

function setVideoSource() {
    const videoSource = document.getElementById('videoSource');
    const videoElement = document.getElementById('dynamicVideo');

    // Store the current source for comparison
    const currentSource = videoSource.src;

    // Check screen width and assign video source accordingly
    if (window.innerWidth < 600) {
        // Set the mobile video source
        videoSource.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_low.mp4?alt=media&token=cfae68f3-1636-4543-ac3f-c8c6d19b1b90';
    } else {
        // Set the desktop video source
        videoSource.src = 'https://firebasestorage.googleapis.com/v0/b/aksmweb-a8516.appspot.com/o/video_high.mp4?alt=media&token=c63fcf1a-bcf2-41c2-ae31-1dffe0432fcd';
    }

    // Only load if the source has changed
    if (currentSource !== videoSource.src) {
        videoElement.load(); // Load the new video source

        // Attempt to play the video after loading the new source
        videoElement.play().catch(error => {
            console.warn('Video play failed:', error);
            // Optionally, you could show a play button or an overlay here
        });
    }
}

// Set the video source on page load
window.onload = setVideoSource;

// Optionally, change it on window resize
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
    
        // Category names and corresponding URLs
        const categories = [
            "Scan2Bim",  // Slide 1
            "Construction Surveying",  // Slide 2
            // "Industrial Surveying",  // Slide 3
            "Deformation Monitoring",   // Slide 4
            "UAV Mapping"   // Slide 5
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
                    slide.style.opacity = '1'; // Make the active slide visible
                    slide.style.zIndex = '1'; // Active slide gets z-index 1
                    slide.classList.add('active');
                    
                    // Update category text and fade it in
                    categoryTextElement.textContent = categories[index]; // Update text
                    categoryTextElement.style.opacity = '1'; // Fade in text
                } else {
                    slide.style.opacity = '0'; // Hide other slides
                    slide.style.zIndex = '0'; // Other slides get z-index 0
                    slide.classList.remove('active');
                }
            });
    
            if (index >= 0) {
                setTimeout(() => {
                    categoryTextElement.style.opacity = '0'; // Fade out text
                }, 5800); // Time to wait before fading out text
            }
        }
    
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides; // Cycle through slides
            showSlide(currentIndex);
        }
    
        // Automatically change slides every 6 seconds
        setInterval(nextSlide, 6000);
    
        // Initialize the first slide as active
        showSlide(currentIndex);
    
        // Event listener for clicking on the category text
        categoryTextElement.addEventListener('click', () => {
            const currentCategory = categories[currentIndex];
            const targetUrl = categoryUrls[currentCategory];
    
            if (targetUrl) {
                window.location.href = targetUrl; // Redirect to the corresponding URL
            }
        });
    });
    

    // Counter Animation
    const counters = [
        { counterId: 'counter1', startCount: 0, maxCount: 23, interval: 50 },
        { counterId: 'counter2', startCount: 2900, maxCount: 3000, interval: 50 },
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
        { src: "assets/customers/adark.jpg", alt: "adark" },
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
const sections = Array.from(slider.children); // Get all the child sections
let sectionIndex = 0; // Initialize the current section index

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    slider.style.transition = 'transform 0.5s ease'; // Adding smooth transition
}

// Function to move to the next slide
function nextSlide() {
    sectionIndex = (sectionIndex + 1) % sections.length; // Wrap around to first slide if at last
    showSlide(sectionIndex);
}

// Function to move to the previous slide
function prevSlide() {
    sectionIndex = (sectionIndex - 1 + sections.length) % sections.length; // Wrap around to last slide if at first
    showSlide(sectionIndex);
}

// Handle the "next" button click
next.addEventListener('click', function() {
    nextSlide(); // Move to the next slide
});

// Handle the "prev" button click
prev.addEventListener('click', function() {
    prevSlide(); // Move to the previous slide
});

// Initially show the first slide
showSlide(sectionIndex);

    // Generic function to handle the slide transitions for the slider
    function initSlider(sliderContainerSelector, prevBtnSelector, nextBtnSelector) {
        const slider = document.querySelector(sliderContainerSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);

        if (slider && prevBtn && nextBtn) {
            const firstChild = slider.firstElementChild; // Get the first slide item
            const slideWidth = firstChild.offsetWidth + 12; // Slide width including gap
            let scrollPosition = 0; // Initialize scroll position

            const updateButtons = () => {
                const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                prevBtn.style.display = scrollPosition > 0 ? "block" : "none";
                nextBtn.style.display = scrollPosition < maxScrollLeft ? "block" : "none";
            };

            // Event listeners for buttons
            nextBtn.addEventListener("click", () => {
                scrollPosition = Math.min(scrollPosition + slideWidth, slider.scrollWidth - slider.clientWidth);
                slider.scrollTo({ left: scrollPosition, behavior: "smooth" });
                updateButtons();
            });

            prevBtn.addEventListener("click", () => {
                scrollPosition = Math.max(scrollPosition - slideWidth, 0);
                slider.scrollTo({ left: scrollPosition, behavior: "smooth" });
                updateButtons();
            });

            // Initialize button visibility
            updateButtons();
        }
    }

    // Initialize "Project Carousel" slider
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

const scriptURL = 'https://script.google.com/macros/s/AKfycbwU3MRCwC23AnvYZorqqjv9RNGu62nXYUHrM6PmmDBP6eU396ldQ0ctix0dXUUJbLpR/exec'; // Replace with your actual script URL
const form = document.forms['submit-to-google-sheet'];
const subscribeButton = document.getElementById('subscribe-button');
const consentCheckbox = document.getElementById('consent');
const messageDisplay = document.querySelector('.thank-you-message');
let isSubmitting = false; // Flag to check if form is currently being submitted

console.log("Form initialization complete.");

subscribeButton.disabled = false;
// Event listener for form submission
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent form from submitting immediately
    console.log("Form submitted."); // Debugging: Check when form submission is triggered

    // Check if the form is already being submitted
    if (isSubmitting) {
        console.log("Form is already being submitted, ignoring this click.");
        return; // Ignore further clicks until the current submission is done
    }

    const emailInput = form.elements['Email'].value;
    console.log("Email entered:", emailInput); // Debugging: Output entered email

    // Validate email format
    if (!validateEmail(emailInput)) {
        console.log("Invalid email format:", emailInput); // Debugging: Invalid email format
        messageDisplay.textContent = 'Please enter a valid email address.';
        messageDisplay.style.display = 'block'; // Show error message
        return;
    }

    // Check if the consent checkbox is checked
    if (!consentCheckbox.checked) {
        console.log("Consent checkbox not checked."); // Debugging: Consent checkbox issue
        messageDisplay.textContent = 'You need to check the consent box in order to subscribe.';
        messageDisplay.style.display = 'block'; // Show error message
        return; // Block submission if consent is not provided
    }

    console.log("Consent checkbox checked. Proceeding with form submission."); // Debugging: Consent is valid

    const formData = new FormData(form);
    isSubmitting = true; // Set the flag to true to prevent further submissions
    messageDisplay.style.display = 'none'; // Hide any previous message

    console.log("Sending form data to server..."); // Debugging: Sending data

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            console.log("Server responded:", response); // Debugging: Check server response
            return response.json();
        })
        .then(data => {
            console.log("Response data:", data); // Debugging: Output server response data

            if (data.result === 'success') {
                form.reset(); // Clear the form
                messageDisplay.textContent = "Please verify your subscription through your email!";
                messageDisplay.style.display = 'block'; // Show success message
                console.log("Form submitted successfully!"); // Debugging: Success
            } else {
                console.log("Server returned an error:", data.error); // Debugging: Error from the server

                // Handle various errors from the server response
                if (data.error === 'Email already exists') {
                    messageDisplay.textContent = "This email is already subscribed. Please check your inbox.";
                    messageDisplay.style.display = 'block';
                } else {
                    messageDisplay.textContent = 'There was an error processing your request. Please try again.';
                    messageDisplay.style.display = 'block';
                }
            }
        })
        .catch(error => {
            console.error('Error in fetch request:', error.message); // Debugging: Network or server error
            messageDisplay.textContent = 'There was an error processing your request. Please try again.';
            messageDisplay.style.display = 'block';
        })
        .finally(() => {
            isSubmitting = false; // Reset the flag after submission (success or failure)
            console.log("Submission complete, isSubmitting flag reset."); // Debugging: Flag reset after submission
        });
});

// Simple email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(String(email).toLowerCase());
    console.log("Email validation result for", email, ":", isValid); // Debugging: Email validation result
    return isValid;
}
