const text = "Hello 👋! Welcome to my personal website. Here you can see my personal projects and read my blogs :) ";

// Function to type out text with a cursor
function typeWriter(text, i = 0) {
  if (i < text.length) {
    document.getElementById('typing-text').innerHTML += text.charAt(i);
    i++;
    setTimeout(() => typeWriter(text, i), 50); // Adjust typing speed (milliseconds)
  } else {
    // Create cursor element after typing is finished
    document.getElementById('typing-text').insertAdjacentHTML('beforeend', '<span class="cursor"></span>');
  }
}

// Start typing effect
typeWriter(text);


// Profile slide show
// Array of image URLs for the slideshow
const imageUrls = ['pic.png', 'pic1.png', 'pic2.png', 'pic3.png']; // Add more image URLs as needed
let currentIndex = 0;
const profilePic = document.querySelector('.profile-pic');

// Function to change the profile picture
function changeProfilePic() {
  profilePic.src = imageUrls[currentIndex];
  currentIndex = (currentIndex + 1) % imageUrls.length;
}

// Call the changeProfilePic function initially and then every 2 seconds
changeProfilePic(); // Call once to set initial image
setInterval(changeProfilePic, 2500); // Call every 2 seconds

