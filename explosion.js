

const Explosion = function (x,y, gfx = undefined) {
    GameObject.call(this, gfx);
    this.position[0] = x; // x coordinate
    this.position[1] = y; // y coordinate
    this.radius = 25; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = 2 * Math.PI; // End point on circle
    this.Color = "#ff0000";

    this.update = function(time, objects) {
        time /= 1000
        if (this.radius > 65) {
            this.isDead = true;
        }
        var missiles = objects.filter(obj => obj.constructor == EnemyMissile);
        for (var i = 0; i < missiles.length; i++) {
            var distance = Math.sqrt(
                Math.pow(this.position[0] - missiles[i].position[0], 2) + 
                Math.pow(this.position[1] - missiles[i].position[1], 2));
            if(distance < this.radius) {
                missiles[i].isDead = true;
            }
        }
        this.radius += 3;
    }
};