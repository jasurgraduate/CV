const start = () => {
    setTimeout(function() {
        confetti.start();
    }, 1000); // Start confetti after 1 second (1000 ms)
};

const stop = () => {
    setTimeout(function() {
        confetti.stop();
    }, 5000); // Stop confetti after 5 seconds (5000 ms)
};

// Function to start confetti when button is clicked
document.getElementById('confettiButton').addEventListener('click', function() {
    start();
    stop(); // Start the stop timer when the button is clicked
});
