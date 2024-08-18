const confetti = {
    maxCount: 550,
    speed: 1.5,
    frameInterval: 15,
    alpha: 2.0,
    gradient: false,
    shapes: ['circle', 'triangle', 'star', 'square', 'donut', 'star'], // Added shapes
    start: null,
    stop: null,
    toggle: null,
    pause: null,
    resume: null,
    togglePause: null,
    remove: null,
    isPaused: null,
    isRunning: null,
};

(function() {
    const colors = [
        "rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,",
        "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,",
        "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,",
        "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"
    ];
    
    let streamingConfetti = false;
    let animationTimer = null;
    let pause = false;
    let lastFrameTime = Date.now();
    const particles = [];
    let waveAngle = 0;
    let context = null;
  
    function resetParticle(particle, width, height) {
        particle.color = colors[Math.floor(Math.random() * colors.length)] + confetti.alpha + ")";
        particle.color2 = colors[Math.floor(Math.random() * colors.length)] + confetti.alpha + ")";
        particle.shape = confetti.shapes[Math.floor(Math.random() * confetti.shapes.length)];
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 20 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = Math.random() * Math.PI;
        return particle;
    }
  
    function toggleConfettiPause() {
        pause ? resumeConfetti() : pauseConfetti();
    }
  
    function isConfettiPaused() {
        return pause;
    }
  
    function pauseConfetti() {
        pause = true;
    }
  
    function resumeConfetti() {
        pause = false;
        runAnimation();
    }
  
    function runAnimation() {
        if (pause) return;
  
        if (particles.length === 0) {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            animationTimer = null;
        } else {
            const now = Date.now();
            const delta = now - lastFrameTime;
            if (!supportsAnimationFrame || delta > confetti.frameInterval) {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                updateParticles();
                drawParticles(context);
                lastFrameTime = now - (delta % confetti.frameInterval);
            }
            animationTimer = requestAnimationFrame(runAnimation);
        }
    }
  
    function startConfetti(timeout, min, max) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelRatio = window.devicePixelRatio || 1;
        const canvas = document.getElementById("confetti-canvas") || createCanvas(width, height, pixelRatio);
  
        context = canvas.getContext("2d");
        context.scale(pixelRatio, pixelRatio);
  
        let count = confetti.maxCount;
        if (min) count = max ? adjustCount(min, max) : particles.length + min;
        else if (max) count = particles.length + max;
        
        while (particles.length < count) particles.push(resetParticle({}, width, height));
        
        streamingConfetti = true;
        pause = false;
        runAnimation();
        
        if (timeout) setTimeout(stopConfetti, timeout);
    }
  
    function stopConfetti() {
        streamingConfetti = false;
    }
  
    function removeConfetti() {
        stopConfetti();
        pause = false;
        particles.length = 0;
    }
  
    function toggleConfetti() {
        streamingConfetti ? stopConfetti() : startConfetti();
    }
  
    function isConfettiRunning() {
        return streamingConfetti;
    }
  
    function drawParticles(context) {
        particles.forEach(particle => {
            context.beginPath();
            context.lineWidth = particle.diameter;
            const x2 = particle.x + particle.tilt;
            const y2 = particle.y + particle.tilt + particle.diameter / 2;

            if (particle.shape === 'circle') {
                context.arc(particle.x, particle.y, particle.diameter / 2, 0, Math.PI * 2);
            } else if (particle.shape === 'triangle') {
                context.moveTo(particle.x, particle.y - particle.diameter / 2);
                context.lineTo(particle.x - particle.diameter / 2, particle.y + particle.diameter / 2);
                context.lineTo(particle.x + particle.diameter / 2, particle.y + particle.diameter / 2);
                context.closePath();
            } else if (particle.shape === 'star') {
                context.save();
                context.translate(particle.x, particle.y);
                context.beginPath();
                for (let i = 0; i < 5; i++) {
                    context.lineTo(0, -particle.diameter / 2);
                    context.lineTo(0, particle.diameter / 4);
                    context.rotate((Math.PI * 2) / 5);
                }
                context.closePath();
                context.restore();
            }

            if (confetti.gradient) {
                const gradient = context.createLinearGradient(particle.x, particle.y, x2, y2);
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, particle.color2);
                context.fillStyle = gradient;
            } else {
                context.fillStyle = particle.color;
            }
            
            context.fill();
        });
    }
  
    function updateParticles() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        waveAngle += 0.01;
  
        particles.forEach((particle, i) => {
            if (!streamingConfetti && particle.y < -15) {
                particle.y = height + 100;
            } else {
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(waveAngle) - 0.5;
                particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
                particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }
            if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                if (streamingConfetti && particles.length <= confetti.maxCount) {
                    resetParticle(particle, width, height);
                } else {
                    particles.splice(i, 1);
                }
            }
        });
    }
  
    function createCanvas(width, height, pixelRatio) {
        const canvas = document.createElement("canvas");
        canvas.id = "confetti-canvas";
        canvas.style.cssText = "display:block;z-index:999999;pointer-events:none;position:fixed;top:0;left:0;";
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        document.body.prepend(canvas);
  
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        });
  
        return canvas;
    }
  
    function adjustCount(min, max) {
        if (min > max) [min, max] = [max, min];
        return particles.length + Math.floor(Math.random() * (max - min) + min);
    }
  
    const supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  
    confetti.start = startConfetti;
    confetti.stop = stopConfetti;
    confetti.toggle = toggleConfetti;
    confetti.pause = pauseConfetti;
    confetti.resume = resumeConfetti;
    confetti.togglePause = toggleConfettiPause;
    confetti.isPaused = isConfettiPaused;
    confetti.remove = removeConfetti;
    confetti.isRunning = isConfettiRunning;
})();
