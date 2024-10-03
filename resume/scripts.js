document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('.download-btn');
    const modal = document.getElementById('password-modal');
    const closeButton = document.querySelector('.close');
    const submitButton = document.getElementById('submit-password');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message'); // Error message container
    const cvLink = 'Jasur_Anorkulov_CV_2024.pdf'; // 

    const encodedPassword = 'amFzdXIyMDI0'; // 

    downloadButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        modal.style.display = 'block'; // Show the modal
        errorMessage.style.display = 'none'; // Hide the error message when showing the modal
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    submitButton.addEventListener('click', () => {
        submitPassword();
    });

    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default Enter key behavior
            submitPassword();
        }
    });

    function submitPassword() {
        const password = passwordInput.value;
        const decodedPassword = atob(encodedPassword); // 

        if (password === decodedPassword) {
            // If the password is correct, create a temporary link and trigger the download
            const link = document.createElement('a');
            link.href = cvLink;
            link.download = cvLink;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            modal.style.display = 'none'; // Hide the modal after download
        } else {
            // If the password is incorrect, show the error message
            errorMessage.textContent = 'Incorrect password. Please try again.';
            errorMessage.style.display = 'block';
        }
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal if clicked outside
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('.download-btn2');
    const modal = document.getElementById('password-modal');
    const closeButton = document.querySelector('.close');
    const submitButton = document.getElementById('submit-password');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message'); // Error message container
    const cvLink = 'BC_Jasur_2024.pdf'; // 

    const encodedPassword = 'amFzdXIyMDI1';

    downloadButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        modal.style.display = 'block'; // Show the modal
        errorMessage.style.display = 'none'; // Hide the error message when showing the modal
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    submitButton.addEventListener('click', () => {
        submitPassword();
    });

    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default Enter key behavior
            submitPassword();
        }
    });

    function submitPassword() {
        const password = passwordInput.value;
        const decodedPassword = atob(encodedPassword);

        if (password === decodedPassword) {
            // If the password is correct, create a temporary link and trigger the download
            const link = document.createElement('a');
            link.href = cvLink;
            link.download = cvLink;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            modal.style.display = 'none'; // Hide the modal after download
        } else {
            // If the password is incorrect, show the error message
            errorMessage.textContent = 'Incorrect password. Please try again.';
            errorMessage.style.display = 'block';
        }
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal if clicked outside
        }
    });
});

// Select the business card
const businessCard = document.getElementById('business-card');

// Add an event listener for the click event
businessCard.addEventListener('click', function () {
    // Toggle the 'flipped' class on the card
    businessCard.classList.toggle('flipped');
});



/// Image flipper

document.addEventListener('DOMContentLoaded', () => {
    const flipper = document.querySelector('.image-flipper');
    const imageElement = document.getElementById('imageSwitcher');

    // Array of image URLs
    const images = [
        '/img/istanbul.jpg',
        '/img/pic.png',
        '/img/pic1.png',
        '/img/pic2.png',
        '/img/pic3.png',
        '/img/pic4.png',
        '/img/pic5.png',
        '/img/pic7.png'
    ];

    // Get the current index from localStorage, or default to 0
    let currentIndex = localStorage.getItem('currentImageIndex') !== null
        ? parseInt(localStorage.getItem('currentImageIndex'))
        : 0;

    // Set initial image for the flipper
    imageElement.src = images[currentIndex];

    flipper.addEventListener('click', () => {
        // Flip the image
        flipper.classList.add('flipped'); // Start the flip animation

        // Change the image after the flip animation is done
        setTimeout(() => {
            // Move to the next image
            currentIndex = (currentIndex + 1) % images.length;
            imageElement.src = images[currentIndex]; // Update image

            // Save the current index to localStorage
            localStorage.setItem('currentImageIndex', currentIndex);

            flipper.classList.remove('flipped'); // Remove the flipped class to reset for the next click
        }, 300); // Wait for flip duration before changing the image
    });
});
