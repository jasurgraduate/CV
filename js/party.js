document.addEventListener('DOMContentLoaded', () => {
    const confettiButton = document.getElementById('confettiButton');
  
    confettiButton.addEventListener('click', (event) => {
      // Get the button's bounding box to find its position
      const rect = confettiButton.getBoundingClientRect();
  
      // Calculate the center of the button
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

  
      // Create different shapes for the confetti
      const shapes = ['square', 'circle', 'triangle', 'star'];
      const colors = ['#ff0f00', '#ffbf00', '#00ff37', '#0065ff', '#9400ff'];
  
      shapes.forEach((shape) => {
        confetti({
          origin: { x: x / window.innerWidth, y: y / window.innerHeight },
          particleCount: 150,
          spread: 400, // Spread angle of the particles
          angle: 75,  // Angle in degrees at which particles are launched
          startVelocity: 50, // Initial speed of the particles
          colors: colors,
          shapes: [shape],
          scalar: 1.1,
        });
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const confettiButton = document.getElementById('confettiButtonimg');
  
    confettiButton.addEventListener('click', (event) => {
      // Get the button's bounding box to find its position
      const rect = confettiButton.getBoundingClientRect();
  
      // Calculate the center of the button
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

  
      // Create different shapes for the confetti
      const shapes = ['square', 'circle', 'triangle', 'star'];
      const colors = ['#ff0f00', '#ffbf00', '#00ff37', '#0065ff', '#9400ff'];
  
      shapes.forEach((shape) => {
        confetti({
          origin: { x: x / window.innerWidth, y: y / window.innerHeight },
          particleCount: 110,
          spread: 175, // Spread angle of the particles
          angle: 90,  // Angle in degrees at which particles are launched
          startVelocity: 65, // Initial speed of the particles
          colors: colors,
          shapes: [shape],
          scalar: 2,
        });
      });
    });
  });
  
