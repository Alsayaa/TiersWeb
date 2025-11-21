        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles = [];
        let mouse = { x: null, y: null, radius: 350 };
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
        
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 3 + 1;
                this.density = Math.random() * 40 + 5;
                this.distance = 0;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.5 + 0.2;
                this.hue = Math.random() * 60 + 200;
            }
            
            update() {
                // Animation de rotation naturelle
                this.angle += this.speed * 0.01;
                this.baseX += Math.cos(this.angle) * 0.3;
                this.baseY += Math.sin(this.angle) * 0.3;
                
                // Retour progressif à la position de base
                if (this.baseX < 0 || this.baseX > canvas.width) {
                    this.baseX = this.x;
                }
                if (this.baseY < 0 || this.baseY > canvas.height) {
                    this.baseY = this.y;
                }
                
                // Interaction avec la souris
                const dx = mouse.x - this.baseX;
                const dy = mouse.y - this.baseY;
                this.distance = Math.sqrt(dx * dx + dy * dy);
                
                const forceDirectionX = dx / this.distance;
                const forceDirectionY = dy / this.distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - this.distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;
                
                if (this.distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
            
            draw() {
                ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, 0.8)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                
                // Effet de lueur
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
                gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0.4)`);
                gradient.addColorStop(1, `hsla(${this.hue}, 80%, 60%, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        function init() {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 8000;
            
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        }
        
        function connect() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const opacity = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(138, 43, 226, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            connect();
            requestAnimationFrame(animate);
        }
        
        init();
        animate();