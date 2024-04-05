const text = "Hello! Welcome to my personal website. Here you can see my personal projects and read my blogs :) ";

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


