const text = "Hello ツ\nWelcome to my personal website!\nHere you can see my personal projects and read my blogs ☺";
const styleMap = {
  "Hello ツ": "hello",
  "Welcome to my personal website!": "welcome",
  "Here you can see my personal projects and read my blogs ☺": "projects"
};

function typeWriter(text, i = 0) {
  // Add cursor at the start
  let cursor = document.createElement('span');
  cursor.className = 'cursor';
  document.getElementById('typing-text').appendChild(cursor);

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
    } else {
      // Move cursor to end after typing is finished
      cursor.remove();
      document.getElementById('typing-text').insertAdjacentHTML('beforeend', '<span class="cursor"></span>');
    }
  }

  typeNextChar();
}

typeWriter(text);
