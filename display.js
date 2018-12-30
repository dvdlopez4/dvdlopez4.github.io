

const Display = function (canvas) {
    this.canvas = canvas;
    this.buffer = document.createElement("canvas").getContext("2d");
    this.context = canvas.getContext("2d");

    this.buffer.canvas.width = this.context.canvas.width = 640;
    this.buffer.canvas.height = this.context.canvas.height = 700;

    this.render = function(objects) {
        this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);

        this.buffer.fillStyle = "#00004b";
        this.buffer.fillRect(0,0,this.buffer.canvas.width,this.context.canvas.height);

        for (var i = objects.length - 1; i >= 0; i--) {
            if(objects[i].constructor == Explosion) {
                this.buffer.strokeStyle = objects[i].Color;
                this.buffer.beginPath();
                this.buffer.arc(objects[i].x, objects[i].y, objects[i].radius, objects[i].startAngle, objects[i].endAngle, 0);
                this.buffer.stroke();
            } else {
                this.buffer.fillStyle = objects[i].Color;
                this.buffer.fillRect(objects[i].position[0], objects[i].position[1], objects[i].Size[0], objects[i].Size[1]);
            }
        }
        
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }
};