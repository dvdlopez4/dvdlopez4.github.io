

const Graphics = function () {
    this.render = function(object, buffer) {
        buffer.fillStyle = object.Color;
        buffer.fillRect(object.position.x,object.position.y, object.Size[0], object.Size[1]);
    }
};

// Specific for explosions in order to draw circles
const ExplosionGraphics = function() {

    this.render = function(object, buffer) {
        buffer.strokeStyle = object.Color;
        buffer.beginPath();
        buffer.arc(object.position.x, object.position.y, object.radius, object.startAngle, object.endAngle, 0);
        buffer.stroke();
    }
}