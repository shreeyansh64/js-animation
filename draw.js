const canvas = document.getElementById("canvas_2");
canvas.width = 700;
canvas.height = 600;
const ctx = canvas.getContext('2d');

class Line {
    constructor(canvas) {
        this.canvas = canvas;
        this.startx = Math.random() * this.canvas.width;
        this.starty = Math.random() * this.canvas.height;
        this.endx = Math.random() * this.canvas.width;
        this.endy = Math.random() * this.canvas.height;
        this.hue = Math.floor(Math.random() * 360);
    }
    draw(context){
        context.strokeStyle = 'hsl('+this.hue+',100%, 50%)';
        context.lineWidth = Math.floor(Math.random() * 15 + 1);
        context.beginPath();
        context.moveTo(this.startx,this.starty);
        context.lineTo(this.endx,this.endy);
        context.stroke();
        
    }
}


