document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-btn');
    const modal = document.getElementById('password-modal');
    const closeButton = document.querySelector('.close');
    const submitButton = document.getElementById('submit-password');
    const passwordInput = document.getElementById('password-input');
    const modalMessage = document.getElementById('modal-message');
    
    const encodedPassword = 'amFzdXIyMDI0'; // 
    const encodedFileUrl = 'aHR0cHM6Ly93d3cubWVkaWFmaXJlLmNvbS9maWxlL2YyNHF5bXBzNGRhZTU4NS9VenktTG9jby12NS4wX18xX05FV19JbnRlZmFjZS5yYXI='; //

    downloadButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        modal.style.display = 'block'; // Show the modal
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
        modalMessage.textContent = ''; // Clear message
    });

    submitButton.addEventListener('click', () => {
        handlePasswordSubmission();
    });

    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if in a form
            handlePasswordSubmission();
        }
    });

    function handlePasswordSubmission() {
        const password = passwordInput.value;
        const decodedPassword = atob(encodedPassword); 
        const fileUrl = atob(encodedFileUrl); 

        if (password === decodedPassword) {
            // If the password is correct, redirect to the decoded file URL
            window.location.href = fileUrl;
            modal.style.display = 'none'; // Hide the modal after download
        } else {
            // If the password is incorrect, show the message in the modal
            modalMessage.textContent = 'Incorrect password. Please try again.';
        }
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal if clicked outside
            modalMessage.textContent = ''; // Clear message
        }
    });
});
