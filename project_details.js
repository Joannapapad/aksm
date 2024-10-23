document.addEventListener("DOMContentLoaded", () => {
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
    }

    function closeModal(modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            const script = document.createElement('script');
            script.src = 'nav.js';
            document.body.appendChild(script);
            loadProjectDetails();
        })
        .catch(error => {
            console.error('Error loading the header:', error);
            document.getElementById('menu-container').innerHTML = '<p>Failed to load menu.</p>';
            loadProjectDetails();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerElement = document.getElementById('footer__cont');
            footerElement.innerHTML = data;
            footerElement.style.backgroundColor = '#fff';
        })
        .catch(error => console.error('Error loading footer:', error));

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
                        <div class="project-background" style="background: url('${project.image_front || ''}') no-repeat center center fixed; background-size: cover;">
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

                    let imgTextHtml = [];

                    // Add videos based on screen width
                    if (project.video1 || project.video2) {
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
                    }

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
                        // Non-scan2bim projects: handle individual images and descriptions separately
                        const imagesDescriptions = [
                            { image: project.image1, description: project.description },
                            { image: project.image2, description: project.description2 },
                            { image: project.image3, description: project.description3 },
                            { image: project.image4, description: project.description4 },
                            { image: project.image5, description: project.description5 }
                        ];
                    
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
                    

                    // Handle non-scan2bim images
                    if (project.typeofproject2 !== "scan2bim") {
                        ['image1', 'image2', 'image3', 'image4', 'image5'].forEach((img, idx) => {
                            if (project[img]) {
                                imgTextHtml.push(`
                                    <div class="img_text_flex ${idx % 2 === 1 ? 'right' : ''}">
                                        <img class="detail_proj_image clickable-image" src="${project[img]}" alt="Project Image">
                                        <p>${project['description' + (idx + 1)] || ''}</p>
                                    </div>
                                `);
                            }
                        });
                    }

                    // Add image-text container only if there's content
                    if (imgTextHtml.length > 0) {
                        projectHtml += `<div class="img_text_container">${imgTextHtml.join('')}</div>`;
                    }

                    document.getElementById('project-details-container').innerHTML = projectHtml;

                    // Add event listeners for fullscreen functionality
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
});
