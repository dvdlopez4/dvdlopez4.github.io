

const Display = function (canvas, width = 640, height = 700) {
    this.canvas = canvas;
    // Back buffer
    this.buffer = document.createElement("canvas").getContext("2d");
    // Front buffer
    this.context = canvas.getContext("2d");

    this.buffer.canvas.width = this.context.canvas.width = width;
    this.buffer.canvas.height = this.context.canvas.height = height;

    // This is it's own function so the buffer variable can be used outside of the Display class
    this.renderBackground = function(color) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0,0,this.buffer.canvas.width,this.buffer.canvas.height);
    }

    this.update = function() {
        // Clear the front buffer, or current canvas, in preparation for the new frame
        this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
        // Copy the back buffer to the front buffer
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }
};