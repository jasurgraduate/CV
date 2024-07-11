document.addEventListener("DOMContentLoaded", function() {
    const progressBar = document.getElementById('progress-bar-new');
    const progressText = document.getElementById('progress-text-new');
    const content = document.getElementById('content-new');
    let currentProgress = 0;

    // Check if localStorage already has a visit count stored
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
        visitCount = 0;
    } else {
        visitCount = parseInt(visitCount);
    }

    function updateProgress() {
        // Increase progress by a random value between 1 to 3%
        const increment = Math.random() * 3 + 1;
        currentProgress += increment;

        // Ensure progress doesn't exceed 100%
        if (currentProgress > 100) {
            currentProgress = 100;
        }

        // Update progress bar width and text
        progressBar.style.width = currentProgress + '%';
        progressText.innerText = Math.floor(currentProgress) + '%';

        // Check if progress is completed
        if (currentProgress < 100) {
            requestAnimationFrame(updateProgress); // Continue updating
        } else {
            // Show content after progress completes
            setTimeout(() => {
                content.style.opacity = '1'; // Fade in content
                content.style.display = 'block'; // Show content
                document.getElementById('progress-container-new').style.display = 'none';
            }, 500); // Show content after 0.5s delay
        }
    }

    // Increment visit count and update localStorage
    visitCount++;
    localStorage.setItem('visitCount', visitCount);

    // Check if this is the fourth visit (visitCount = 4)
    if (visitCount > 3) {
        // Start the progress animation
        requestAnimationFrame(updateProgress);
    } else {
        // If not the fourth visit, hide the progress bar
        document.getElementById('progress-container-new').style.display = 'none';
        content.style.opacity = '1'; // Directly show content
        content.style.display = 'block';
    }
});
