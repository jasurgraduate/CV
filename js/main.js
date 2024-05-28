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
const imageUrls = ['pic3.png', 'pic2.png', 'pic.png', 'pic1.png']; // Add more image URLs as needed
let currentIndex = 0;
const profilePic = document.querySelector('.profile-pic');
let interval;

// Function to change the profile picture
function changeProfilePic() {
    profilePic.src = imageUrls[currentIndex];
    currentIndex = (currentIndex + 1) % imageUrls.length;
}

// Function to handle click event and reset the interval
function handleClick() {
    changeProfilePic();
    resetInterval();
}

// Function to reset the interval
function resetInterval() {
    clearInterval(interval);
    interval = setInterval(changeProfilePic, 4000);
}

// Add event listener for click event
profilePic.addEventListener('click', handleClick);

// Call the changeProfilePic function initially and start the interval
changeProfilePic(); // Call once to set initial image
resetInterval(); // Start the interval
