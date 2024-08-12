document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('.download-btn');
    const modal = document.getElementById('password-modal');
    const closeButton = document.querySelector('.close');
    const submitButton = document.getElementById('submit-password');
    const passwordInput = document.getElementById('password-input');
    const cvLink = 'Jasur_Anorkulov_CV_2024.pdf'; // The CV file to be downloaded

    downloadButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        modal.style.display = 'block'; // Show the modal
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    submitButton.addEventListener('click', () => {
        const password = passwordInput.value;
        
        if (password === 'jasur2024') {
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
            // If the password is incorrect, alert the user
            alert('Incorrect password. Please try again.');
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal if clicked outside
        }
    });
});
