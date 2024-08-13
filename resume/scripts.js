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
