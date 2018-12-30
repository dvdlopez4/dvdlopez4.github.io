

const Explosion = function (x,y) {
    this.x = x; // x coordinate
    this.y = y; // y coordinate
    this.radius = 5; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = 2 * Math.PI; // End point on circle
    this.isDead = false;

    this.Color = "#ff0000";
    this.update = function(time) {
        time /= 1000
        if (this.radius > 65) {
            this.isDead = true;
        }
        this.radius += 2;
    }
};