

const Explosion = function (x,y, gfx = undefined) {
    GameObject.call(this, gfx);
    this.position[0] = x; // x coordinate
    this.position[1] = y; // y coordinate
    this.radius = 25; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = 2 * Math.PI; // End point on circle
    this.Color = "#ff0000";

    this.update = function(time) {
        time /= 1000
        if (this.radius > 65) {
            this.isDead = true;
        }
        this.radius += 1;
    }
};