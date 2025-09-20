const canvas = document.getElementById("canvas_2");
canvas.width = 900;
canvas.height = 700;
const ctx = canvas.getContext('2d');
const image = document.getElementById('bgimg');
const pattern = ctx.createPattern(image,'no-repeat');


ctx.strokeStyle = pattern;


class Line {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.past = [{ x: this.x, y: this.y }];
        this.hue = Math.floor(Math.random() * 360);
        this.maxLength = Math.floor(Math.random() * 150 + 6);
        this.speedx = Math.random() * 1 - 0.5;
        this.speedy = 5;
        this.lifeSpan = this.maxLength * 2;
        this.timer = 0;
    }
    draw(context) {
        // context.strokeStyle = 'hsl(' + this.hue + ',100%, 50%)';
        context.lineWidth = Math.floor(Math.random() * 15 + 1);
        context.beginPath();
        context.moveTo(this.past[0].x, this.past[0].y);
        for (let i = 0; i < this.past.length; i++) {
            context.lineTo(this.past[i].x, this.past[i].y);
        }

        context.stroke();

    }
    update() {
        this.timer++;
        if (this.timer < this.lifeSpan) {
            this.x += this.speedx + Math.random() * 20 - 10;
            this.y += this.speedy + Math.random() * 20 - 10;
            this.past.push({ x: this.x, y: this.y });
            if (this.past.length > this.maxLength) {
                this.past.shift()
            }
        }else if (this.past.length <= 1){
            this.reset();
        }else{
            this.past.shift()
        }
    }
    reset(){
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.past = [{ x: this.x, y: this.y }];
        this.timer = 0;
    }
}

let lineArr = [];
const totalLines = 200;

for (let i = 0; i < totalLines; i++) {
    lineArr.push(new Line(canvas));
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lineArr.map(e => {
        e.draw(ctx);
        e.update();
    });
    requestAnimationFrame(animate);
}
animate();
