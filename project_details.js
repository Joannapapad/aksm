document.addEventListener("DOMContentLoaded", () => {
    // Helper function to get URL parameters
    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to open images in fullscreen
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
        
        // Disable scrolling
        document.body.style.overflow = 'hidden';
        
        // Close the modal when the close button is clicked
        closeButton.addEventListener('click', () => {
            closeModal(modal);
        });
        
        // Close the modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }

    // Function to close the modal and re-enable scrolling
    function closeModal(modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Loading header and footer HTML files
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
            footerElement.style.backgroundColor = '#fff'; // Change background color to white
        })
        .catch(error => console.error('Error loading footer:', error));

    // Load project details based on the project ID in the URL
    function loadProjectDetails() {
        const projectId = getParameterByName('id');
        console.log('Loaded Project ID:', projectId);

        fetch('project.json')
            .then(response => response.json())
            .then(data => {
                const project = data.find(item => item.id === projectId);

                if (project) {
                    const projectHtml = `
                    <div class="project-details-container">
                        <div class="project-background" style="background: url('${project.image_front || ''}') no-repeat center center fixed;background-size: cover;">
                            <div class="project-summary">
                                <div class="heading-container">
                                    <h1 class="head">${project.title}</h1>
                                    <p>${project.typeofproject}</p>
                                </div>

                                <div class="project-text desc" style="border:0;"><p><strong>Description:</strong> ${project.main_description}</p></div>

                                <div class="project-info">
                                    <div class="project-text">
                                        <p><strong>Location:</strong> ${project.location}</p>
                                        <p><strong>LOD:</strong> ${project.LOD}</p>
                                        <p><strong>Completion:</strong> ${project.completionyear}</p>
                                        <p><strong>Area:</strong> ${project.area}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="img_text_container">
                            <!-- img_text_flex elements will be injected here -->
                        </div>
                    </div>
                    `;

                    const imgTextHtml = [];

                                        // Handle video1 and video2
                    if (project.video1 && project.video2) {
                        let videoSource = window.innerWidth <= 800 ? project.video2 : project.video1;
                        imgTextHtml.push(`
                            <div class="center vid">
                                <video class="detail_proj_video" autoplay muted loop controls>
                                    <source src="${videoSource}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        `);
                    }
                    
                    if(project.typeofproject2 == "scan2bim"){
                        imgTextHtml.push(`
                            <div class="img_text_flex">
                                <!-- Left Image with Description -->
                                <div class="img_text img_left">
                                    <p class="description">${project.description}</p>
                                    <img class="detail_proj_image clickable-image" src="${project.image1}" alt="Project Image Left">
                                </div>

                                <!-- Right Image with Description -->
                                <div class="img_text img_right">
                                    <p class="description">${project.description2}</p>
                                    <img class="detail_proj_image clickable-image" src="${project.image2}" alt="Project Image Right">
                                </div>
                            </div>
                            <div class="img_text_flex">
                                <!-- Left Image with Description -->
                                <div class="img_text img_left">
                                    <p class="description">${project.description3}</p>
                                    <img class="detail_proj_image clickable-image" src="${project.image3}" alt="Project Image Left">
                                </div>

                                <!-- Right Image with Description -->
                                <div class="img_text img_right">
                                    <p class="description">${project.description4}</p>
                                    <img class="detail_proj_image clickable-image" src="${project.image4}" alt="Project Image Right">
                                </div>
                            </div>
                        `);
                    }

                    // Add image1
                    if (project.image1 && project.typeofproject2 != "scan2bim") {
                        imgTextHtml.push(`
                            <div class="img_text_flex">
                                <img class="detail_proj_image clickable-image" src="${project.image1}" alt="Project Image">
                                <p>${project.description}</p>
                            </div>
                        `);
                    }

                    // Add image2
                    if (project.image2 && project.typeofproject2 != "scan2bim") {
                        imgTextHtml.push(`
                            <div class="img_text_flex right">
                                <img class="detail_proj_image clickable-image" src="${project.image2}" alt="Project Image">
                                <p>${project.description2}</p>
                            </div>
                        `);
                    }

                    // Add image3
                    if (project.image3 && project.typeofproject2 != "scan2bim") {
                        imgTextHtml.push(`
                            <div class="img_text_flex">
                                <img class="detail_proj_image clickable-image" src="${project.image3}" alt="Project Image">
                                <p>${project.description3}</p>
                            </div>
                        `);
                    }

                    // Add image4
                    if (project.image4 && project.typeofproject2 != "scan2bim") {
                        imgTextHtml.push(`
                            <div class="img_text_flex right">
                                <img class="detail_proj_image clickable-image" src="${project.image4}" alt="Project Image">
                                <p>${project.description4}</p>
                            </div>
                        `);
                    }

                    // Add image5
                    if (project.image5 && project.typeofproject2 != "scan2bim") {
                        imgTextHtml.push(`
                            <div class="img_text_flex">
                                <img class="detail_proj_image clickable-image" src="${project.image5}" alt="Project Image">
                                <p>${project.description5}</p>
                            </div>
                        `);
                    }

                    // Wrap imgTextHtml in a container
                    const imgTextContainer = `
                        <div class="img_text_container">
                            ${imgTextHtml.join('')}
                        </div>
                    `;

                    // Append the images and details to the container
                    document.getElementById('project-details-container').innerHTML = projectHtml + imgTextContainer;

                    // Add event listeners for fullscreen functionality on images
                    document.querySelectorAll('.clickable-image').forEach(img => {
                        img.addEventListener('click', () => {
                            openImageInFullscreen(img.src);
                        });
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
