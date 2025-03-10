document.addEventListener("DOMContentLoaded", () => {
    if ("ontouchstart" in window) {
        document.addEventListener("click", (event) => {
            const hoverText = document.querySelector(".hover-text");  // Update with your hover text class
            if (hoverText) {
                hoverText.style.display = "none";  // Hides hover text on tap
            }
        });
    }

    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function openImageInFullscreen(src) {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');

        const image = document.createElement('img');
        image.src = src;
        image.classList.add('fullscreen-image');

        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.classList.add('close-button');

        modal.appendChild(image);
        modal.appendChild(closeButton);
        document.body.appendChild(modal);
        
        document.body.style.overflow = 'hidden';

        closeButton.addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });

        // Initialize zoom level and position
        let scale = 1;
        let posX = 0;
        let posY = 0;
        let isDragging = false;
        let startX, startY;

        // Zoom with scroll for desktop
        modal.addEventListener('wheel', (event) => {
            event.preventDefault();
            scale += event.deltaY * -0.001;  // Adjust zoom speed here
            scale = Math.min(Math.max(1, scale), 3);  // Limit zoom range from 1x to 3x
            applyTransform();
        });

        // Drag image to pan for desktop
        image.addEventListener('mousedown', (event) => {
            isDragging = true;
            startX = event.clientX - posX;
            startY = event.clientY - posY;
        });

        document.addEventListener('mousemove', (event) => {
            if (isDragging) {
                posX = event.clientX - startX;
                posY = event.clientY - startY;
                applyTransform();
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events for mobile (pinch-to-zoom and pan)
        let initialDistance = null;
        
        modal.addEventListener('touchstart', (event) => {
            if (event.touches.length === 2) {
                initialDistance = calculateDistance(event.touches);
            } else if (event.touches.length === 1) {
                isDragging = true;
                startX = event.touches[0].clientX - posX;
                startY = event.touches[0].clientY - posY;
            }
        });

        modal.addEventListener('touchmove', (event) => {
            if (event.touches.length === 2) {
                event.preventDefault();
                const currentDistance = calculateDistance(event.touches);
                if (initialDistance) {
                    const scaleChange = currentDistance / initialDistance;
                    scale = Math.min(Math.max(1, scale * scaleChange), 3);
                    initialDistance = currentDistance;
                    applyTransform();
                }
            } else if (event.touches.length === 1 && isDragging) {
                posX = event.touches[0].clientX - startX;
                posY = event.touches[0].clientY - startY;
                applyTransform();
            }
        });

        modal.addEventListener('touchend', () => {
            initialDistance = null;
            isDragging = false;
        });

        // Helper function to apply transformations
        function applyTransform() {
            image.style.transform = `scale(${scale}) translate(${posX / scale}px, ${posY / scale}px)`;
        }

        // Helper function to calculate distance between two touch points
        function calculateDistance(touches) {
            const [touch1, touch2] = touches;
            return Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
        }
    }

    function closeModal(modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }


    function loadProjectDetails() {
        const projectId = getParameterByName('id');
        console.log('Loaded Project ID:', projectId);
        
        fetch('project.json')
            .then(response => response.json())
            .then(data => {
                const project = data.find(item => item.id === projectId);
                if (project) {
                    // Create HTML for project background and summary
                    let projectHtml = `
                        <div class="project-details-container">
                            <div class="project-background" 
                                style="
                                    background-image: url('${project.image_front || ''}');
                                    background-repeat: no-repeat;
                                    background-position: center center;
                                    background-attachment: fixed;
                                    background-size: cover;
                                    z-index: -1;
                                    display: flex;
                                    align-items: center;
                                    flex-direction: column;
                                    width: 100%;
                                    height: 100%;
                                    box-sizing: border-box;
                                " nonce="randomNonce123">
                                <div class="project-summary">
                                    <div class="heading-container">
                                        <h1 class="head">${project.title}</h1>
                                        <p>${project.typeofproject}</p>
                                    </div>
                                    <div class="project-info">
                                        <div class="project-text">
                                            ${project.main_description ? `<p><strong>Description</strong><br> ${project.main_description}</p><hr>` : ''}
                                            ${project.area ? `<p><strong>Area</strong><br> ${project.area}</p><hr>` : ''}
                                            ${project.location ? `<p><strong>Location</strong><br> ${project.location}</p><hr>` : ''}
                                            ${project.LOD ? `<p><strong>LOD</strong><br> ${project.LOD}</p><hr>` : ''}
                                            ${project.completionyear ? `<p><strong>Completion</strong><br> ${project.completionyear}</p>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    // Generate HTML for images and descriptions
                    let imgTextHtml = [];

                    // Add video based on screen width
                    const videoSource = window.innerWidth <= 800 ? project.video2 : project.video1;
                    if (videoSource) {
                        imgTextHtml.push(`
                            <div class="center vid">
                                <video class="detail_proj_video" autoplay muted loop controls>
                                    <source src="${videoSource}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        `);
                    }

                    // Images and descriptions for projects
                    const imagesDescriptions = [
                        { image: project.image1, description: project.description },
                        { image: project.image2, description: project.description2 },
                        { image: project.image3, description: project.description3 },
                        { image: project.image4, description: project.description4 },
                        { image: project.image5, description: project.description5 }
                    ];

                    // Check the project type
                    if (project.typeofproject2 === "scan2bim") {
                             // Scan2BIM projects: handle multiple image and description pairs with flexible layout
                    const imageDescriptionPairs = [
                        { image: project.image1, description: project.description },
                        { image: project.image2, description: project.description2 },
                        { image: project.image3, description: project.description3 },
                        { image: project.image4, description: project.description4 }
                    ];

                    for (let i = 0; i < imageDescriptionPairs.length; i += 2) {
                        const leftPair = imageDescriptionPairs[i];
                        const rightPair = imageDescriptionPairs[i + 1];

                        // If both images and descriptions are available, show in a flex row
                        if (leftPair.image && leftPair.description && rightPair?.image && rightPair?.description) {
                            imgTextHtml.push(`
                                <div class="img_text_flex">
                                    <div class="img_text img_left">
                                        <p class="description">${leftPair.description}</p>
                                        <img class="detail_proj_image clickable-image" src="${leftPair.image}" alt="Project Image Left">
                                    </div>
                                    <div class="img_text img_right">
                                        <p class="description">${rightPair.description}</p>
                                        <img class="detail_proj_image clickable-image" src="${rightPair.image}" alt="Project Image Right">
                                    </div>
                                </div>
                            `);
                        }
                        // If only the left image and description exist
                        else if (leftPair.image && leftPair.description) {
                            imgTextHtml.push(`
                                <div class="img_text_flex">
                                    <div class="img_text img_left">
                                        <p class="description">${leftPair.description}</p>
                                        <img class="detail_proj_image clickable-image" src="${leftPair.image}" alt="Project Image Left">
                                    </div>
                                </div>
                            `);
                        }
                    }

                    } else {
                        // Non-scan2bim projects
                        imagesDescriptions.forEach((item, index) => {
                            if (item.image) {
                                imgTextHtml.push(`
                                    <div class="img_text_flex ${index % 2 === 1 ? 'right' : ''}">
                                        <img class="detail_proj_image clickable-image" src="${item.image}" alt="Project Image">
                                        <p>${item.description || ''}</p>
                                    </div>
                                `);
                            }
                        });
                    }

                    // Join images and descriptions HTML
                    projectHtml += `<div class="img_text_container">${imgTextHtml.join('')}</div>`;

                    // Add project info HTML after the image-text container
                    projectHtml += `
                        <div class="project-info2">
                            <div class="project-text">
                                ${project.main_description ? `<p><strong>Description</strong><br> ${project.main_description}</p><hr>` : ''}
                                ${project.area ? `<p><strong>Area</strong><br> ${project.area}</p><hr>` : ''}
                                ${project.location ? `<p><strong>Location</strong><br> ${project.location}</p><hr>` : ''}
                                ${project.LOD ? `<p><strong>LOD</strong><br> ${project.LOD}</p><hr>` : ''}
                                ${project.completionyear ? `<p><strong>Completion</strong><br> ${project.completionyear}</p>` : ''}
                            </div>
                        </div>`;

                    // Set the inner HTML of project-details-container
                    document.getElementById('project-details-container').innerHTML = projectHtml;

                    // Enable fullscreen for images
                    document.querySelectorAll('.clickable-image').forEach(img => {
                        img.addEventListener('click', () => openImageInFullscreen(img.src));
                    });
                } else {
                    document.getElementById('project-details-container').innerHTML = '<p>No details found for this project.</p>';
                }
            })
            .catch(error => {
                console.error('Error loading project.json', error);
                document.getElementById('project-details-container').innerHTML = '<p>Failed to load project details.</p>';
            });
    }

    // Fetch header and footer
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            const script = document.createElement('script');
            script.src = 'nav.js';
            document.body.appendChild(script);
            loadProjectDetails(); // Load project details after header is loaded
        })
        .catch(error => {
            console.error('Error loading the header:', error);
            document.getElementById('menu-container').innerHTML = '<p>Failed to load menu.</p>';
            loadProjectDetails();
        });

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer__cont').innerHTML = data;
    });

});
