document.addEventListener('DOMContentLoaded', () => {
    // --- Particle System ---
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 20)); // Adjust based on screen size

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - distance / 150) * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }

    // --- Typewriter Effect ---
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const textToType = "Let's Build You\nSomething Sick.";
        let i = 0;
        heroTitle.innerHTML = '<span class="typewriter-cursor"></span>';
        
        function typeWriter() {
            if (i < textToType.length) {
                const char = textToType.charAt(i);
                const currentHtml = heroTitle.innerHTML.replace('<span class="typewriter-cursor"></span>', '');
                
                if (char === '\n') {
                    heroTitle.innerHTML = currentHtml + '<br><span class="typewriter-cursor"></span>';
                } else {
                    heroTitle.innerHTML = currentHtml + char + '<span class="typewriter-cursor"></span>';
                }
                
                i++;
                setTimeout(typeWriter, Math.random() * 50 + 50);
            }
        }
        
        setTimeout(typeWriter, 800);
    }

    // --- V3 OS View Switching Logic ---
    window.switchView = function(viewId, element) {
        if (!element) return;
        
        // Update nav states
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        element.classList.add('active');

        // Hide all views
        document.querySelectorAll('.view-section').forEach(el => {
            el.classList.remove('active');
            // Force reflow for animation
            void el.offsetWidth; 
        });

        // Show target view
        const target = document.getElementById('view-' + viewId);
        if (target) {
            target.classList.add('active');
        }
    };
});
