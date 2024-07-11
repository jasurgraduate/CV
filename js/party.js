document.addEventListener('DOMContentLoaded', () => {
  const confettiButton = document.getElementById('confettiButton');

  confettiButton.addEventListener('click', (event) => {
    // Calculate the center of the viewport
    const x = window.innerWidth / 2;
    const y = window.innerHeight; // Bottom of the viewport

    // Create different shapes for the confetti
    const shapes = ['square', 'circle', 'triangle', 'octagon', 'hexagon'];
    const colors = ['#ff0f00', '#ffbf00', '#00ff37', '#0065ff', '#9400ff'];

    shapes.forEach((shape) => {
      confetti({
        // Set origin to be at the bottom center of the viewport
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        particleCount: 800,
        spread: 400, // Spread angle of the particles
        angle: 75,  // Angle in degrees at which particles are launched
        startVelocity: 90, // Initial speed of the particles
        colors: colors,
        shapes: [shape],
        scalar: 1.5,
      });
    });
  });
});
