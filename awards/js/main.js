document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    const awards = document.querySelectorAll(".award");

    // Function to open modal with clicked image or description
    function openModal(source, description) {
        modal.style.display = "block";
        modalImg.src = source;
        captionText.innerHTML = description;
    }

    // Event listener for each award
    awards.forEach(award => {
        award.addEventListener("click", function(event) {
            // Check if the clicked element is inside the award or its children
            if (event.target.closest(".award")) {
                const image = this.querySelector(".award-image");
                const description = this.querySelector(".award-description").innerHTML;
                openModal(image.src, description);
            }
        });
    });

    // Close modal
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
