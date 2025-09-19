const canvas = document.getElementById('canvas_1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0,'white');
gradient.addColorStop(0.5,'blue');
gradient.addColorStop(1,'magenta');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';



class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 20;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius *2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius *2);
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
    }
    draw(context){
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        context.fill();
    }
    update(){
        this.x += this.vx;
        if(this.x > this.effect.width - this.radius || this.x < 0){this.vx *= -1}
        this.y += this.vy;
        if(this.y > this.effect.height - this.radius || this.y < 0){this.vy *= -1}
    }
}

class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles =200;
        this.createParticles();
    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    handle(context){
        this.connectParticle(context);
        this.particles.forEach(e=>{
            e.draw(context);
            e.update();
        });
        
    }
    connectParticle(context){
        const maxdist = 100;
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = 0; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx,dy);
                if (distance<maxdist) {
                    context.save();
                    const opacity = 1 - (distance/maxdist);
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x , this.particles[a].y);
                    context.lineTo(this.particles[b].x , this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }
}

const eff = new Effect(canvas);



function animation() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    eff.handle(ctx);
    requestAnimationFrame(animation);
}

animation();