

const Display = function (canvas) {
    this.canvas = canvas;
    this.buffer = document.createElement("canvas").getContext("2d");
    this.context = canvas.getContext("2d");

    this.buffer.canvas.width = this.context.canvas.width = 640;
    this.buffer.canvas.height = this.context.canvas.height = 480;

    this.render = function(objects) {
        this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);

        this.buffer.fillStyle = "#00004b";
        this.buffer.fillRect(0,0,this.buffer.canvas.width,this.context.canvas.height);

        for (var i = objects.length - 1; i >= 0; i--) {
            this.buffer.fillStyle = objects[i].Color;
            this.buffer.fillRect(objects[i].position[0], objects[i].position[1], objects[i].Size[0], objects[i].Size[1]);
        }
        
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }
};