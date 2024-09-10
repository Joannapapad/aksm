document.addEventListener("DOMContentLoaded", () => {
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
        
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;

            const script = document.createElement('script');
            script.src = 'header_nav.js';
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
            footerElement.style.backgroundColor = '#fff'; // Change the background color to white
        })
        .catch(error => console.error('Error loading footer:', error));

    function loadProjectDetails() {
        const projectId = getParameterByName('id');

        fetch('project.json')
            .then(response => response.json())
            .then(data => {
                const project = data.find(item => item.id === projectId);

                if (project) {
                    const projectHtml = `
                    <div class="project-details-container">
                        <div class="project-background" style="background: url('${project.image1 || ''}') no-repeat center center fixed;background-size: cover;">
                            <div class="project-summary">
                                <div class="heading-container">
                                    <h1 class="head">${project.title}</h1>
                                    <p>${project.typeofproject}</p>
                                </div>
                                <div class="project-info">
                                    <div class="project-text">
                                        <p><strong>Location:</strong> ${project.location}</p>
                                        <p><strong>Completion Year:</strong> ${project.completionyear}</p>
                                        <p><strong>Gross Built Area:</strong> ${project.area}</p>
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

                        // Add image1
                    if (project.image1) {
                        imgTextHtml.push(`
                            <div class="img_text_flex">
                                <img class="detail_proj_image clickable-image" src="${project.image1}" alt="Project Image">
                                <p>${project.description1}</p>
                            </div>
                        `);
                    }

                    // Add image2
                    if (project.image2) {
                        imgTextHtml.push(`
                            <div class="img_text_flex right">
                                <img class="detail_proj_image clickable-image" src="${project.image2}" alt="Project Image">
                                <p>${project.description2}</p>
                            </div>
                        `);
                    }

                    // Handle image3
                    if (project.image3) {
                        imgTextHtml.push(`
                            <div class="img_text_flex right">
                                <img class="detail_proj_image clickable-image" src="${project.image3}" alt="Project Image">
                                <p>${project.description4}</p>
                            </div>
                        `);
                    }

                    // Handle image4
                    if (project.image4) {
                        imgTextHtml.push(`
                            <div class="img_text_flex">
                                <img class="detail_proj_image clickable-image" src="${project.image4}" alt="Project Image">
                                <p>${project.description2}</p>
                            </div>
                        `);
                    }

                    if (project.description2 && !(project.image4)) {
                        imgTextHtml.push(`
                            <div class="img_text_flex right">
                                <p>${project.description2}</p>
                            </div>
                        `);
                    }

                    // Handle image5
                    if (project.image5) {
                        imgTextHtml.push(`
                            <div class="img_text_flex right">
                                <img class="detail_proj_image clickable-image" src="${project.image5}" alt="Project Image">
                                <p>${project.description3}</p>
                            </div>
                        `);
                    }

                    if (project.description3 && !(project.image5)) {
                        imgTextHtml.push(`
                            <div class="img_text_flex right">
                                <p>${project.description3}</p>
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
