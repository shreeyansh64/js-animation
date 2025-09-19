const canvas = document.getElementById('canvas_1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 20;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius *2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius *2);
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }
    draw(context){
        context.fillStyle = 'hsl('+ this.x * 0.5+',100%,50%)'
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        context.fill();
        context.stroke();
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
        this.numberOfParticles =500;
        this.createParticles();
    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    handle(context){
        this.particles.forEach(e=>{
            e.draw(context);
            e.update();
        });
    }
}

const eff = new Effect(canvas);



function animation() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    eff.handle(ctx);
    requestAnimationFrame(animation);
}

animation();