document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    if ("ontouchstart" in window) {
        document.addEventListener("click", (event) => {
            const hoverText = document.querySelector(".hover-text");
            if (hoverText) {
                hoverText.style.display = "none";
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
        panImages(modal,image);
    }

    function panImages(modal,image){
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

    function openCarousel(startImage, secondImage) {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
    
        const image = document.createElement('img');
        image.src = startImage;
        image.classList.add('fullscreen-image');
    
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.classList.add('close-button');
    
        const nextButton = document.createElement('span');
        nextButton.classList.add('next-button');
    
        // Create an image for the next button
        const nextButtonImage = document.createElement('img');
        nextButtonImage.src = 'assets/icons/right_arrow_white.png';  // Replace with the path to your image
        nextButtonImage.alt = 'Next';
        nextButtonImage.classList.add('next-button-image');  // Optional: for styling
    
        // Append the image to the next button
        nextButton.appendChild(nextButtonImage);
    
        modal.appendChild(image);
        modal.appendChild(closeButton);
        modal.appendChild(nextButton);
        document.body.appendChild(modal);
    
        document.body.style.overflow = 'hidden';
    
        let currentImage = startImage;
        nextButton.addEventListener('click', () => {
            currentImage = currentImage === startImage ? secondImage : startImage;
            image.src = currentImage;
        });
    
        // Pass the image element to panImages
        panImages(modal, image);
    
        closeButton.addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
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
                    let projectHtml = `
                        <div class="project-details-container">
                            <div class="project-background" data-bg="${project.image_front || ''}">
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

                    document.getElementById('project-details-container').innerHTML = projectHtml;

                    // Ensure the project background element exists
                    const projectBg = document.querySelector(".project-background");
                    if (projectBg && project.image_front) {
                        console.log("Setting background image:", project.image_front);
                        projectBg.style.backgroundImage = `url('${project.image_front}')`;
                    }
                    
                    let imgTextHtml = [];
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

                    const imagesDescriptions = [
                        { image: project.image1, description: project.description },
                        { image: project.image2, description: project.description2 },
                        { image: project.image3, description: project.description3 },
                        { image: project.image4, description: project.description4 },
                        // image5 is hidden on the main page
                    ];

                    if (project.typeofproject2 === "scan2bim") {
                        for (let i = 0; i < imagesDescriptions.length; i += 2) {
                            const leftPair = imagesDescriptions[i];
                            const rightPair = imagesDescriptions[i + 1];
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
                            } else if (leftPair.image && leftPair.description) {
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


                    document.getElementById('project-details-container').innerHTML = projectHtml;

                    document.querySelectorAll('.clickable-image').forEach(img => {
                        if (img.src.includes(project.image2) && project.image5) {
                            img.addEventListener('click', () => openCarousel(project.image2, project.image5));
                        } else {
                            img.addEventListener('click', () => openImageInFullscreen(img.src)); // Normal fullscreen for other images
                        }
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

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            const script = document.createElement('script');
            script.src = 'nav.js';
            document.body.appendChild(script);
            loadProjectDetails();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer__cont').innerHTML = data;
        });
});
