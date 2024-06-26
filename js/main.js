document.addEventListener("DOMContentLoaded", function() {
  const text = "Hello ツ\nWelcome to my personal website!\nHere you can see my personal projects and read my blogs \uD83D\uDC3C";


  const styleMap = {
    "Hello ツ": "hello",
    "Welcome to my personal website!": "welcome",
    "Here you can see my personal projects and read my blogs \uD83D\uDC3C": "projects"
  };

  function typeWriter(text, i = 0) {
    // Add cursor at the start
    let cursor = document.createElement('span');
    cursor.className = 'cursor';
    document.getElementById('typing-text').appendChild(cursor);

    // Audio element for typing sound
    const typingSound = new Audio('typing.mp3');

    // Ensure audio is ready to play
    typingSound.load();

    function typeNextChar() {
      if (i < text.length) {
        let currentText = "";
        let currentClass = "";
        for (let key in styleMap) {
          if (text.startsWith(key, i)) {
            currentText = key;
            currentClass = styleMap[key];
            break;
          }
        }

        if (currentText) {
          let span = document.createElement("span");
          span.className = currentClass;
          document.getElementById('typing-text').insertBefore(span, cursor);
          let j = 0;
          let typeSpanText = () => {
            if (j < currentText.length) {
              span.innerHTML += currentText.charAt(j);
              j++;
              setTimeout(typeSpanText, 75); // Adjust typing speed (milliseconds)
            } else {
              i += currentText.length;
              typeNextChar();
            }
          };
          typeSpanText();
        } else if (text.charAt(i) === '\n') {
          document.getElementById('typing-text').insertBefore(document.createElement('br'), cursor);
          i++;
          setTimeout(typeNextChar, 75); // Adjust typing speed (milliseconds)
        } else {
          cursor.insertAdjacentHTML('beforebegin', text.charAt(i));
          i++;
          setTimeout(typeNextChar, 75); // Adjust typing speed (milliseconds)
        }

        // Play typing sound
        typingSound.play().catch(error => {
          // Autoplay was prevented, handle error here
          console.error('Autoplay was prevented: ', error);
        });
      } else {
        // Move cursor to end after typing is finished
        cursor.remove();
        document.getElementById('typing-text').insertAdjacentHTML('beforeend', '<span class="cursor"></span>');

        // Stop typing sound
        typingSound.pause();
        typingSound.currentTime = 0; // Reset audio to beginning
      }
    }

    typeNextChar();
  }

  // Call typeWriter function on page load
  typeWriter(text);
});
