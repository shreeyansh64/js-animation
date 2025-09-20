const canvas = document.getElementById("canvas_2");
canvas.width = 700;
canvas.height = 600;
const ctx = canvas.getContext('2d');

class Line {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.past = [{ x: this.x, y: this.y }];
        this.hue = Math.floor(Math.random() * 360);
        this.maxLength = 5;
    }
    draw(context) {
        context.strokeStyle = 'hsl(' + this.hue + ',100%, 50%)';
        context.lineWidth = Math.floor(Math.random() * 15 + 1);
        context.beginPath();
        context.moveTo(this.past[0].x, this.past[0].y);
        for (let i = 0; i < this.past.length; i++) {
            context.lineTo(this.past[i].x, this.past[i].y);
        }

        context.stroke();

    }
    update() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.past.push({ x: this.x, y: this.y });
        if (this.past.length > this.maxLength) {
            this.past.shift()
        }
    }
}

let lineArr = [];
const totalLines = 1;

for (let i = 0; i < totalLines; i++) {
    lineArr.push(new Line(canvas));
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lineArr.map(e=>{
        e.draw(ctx);
        e.update();
    });
    requestAnimationFrame(animate);
}
animate();
