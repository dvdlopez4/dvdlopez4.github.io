

const Explosion = function (x,y, gfx = undefined) {
    GameObject.call(this, gfx);
    this.position.set(x, y);
    this.radius = 25; // Arc radius
    this.startAngle = 0; // Starting point on circle
    this.endAngle = 2 * Math.PI; // End point on circle
    this.Color = "#ff0000";
    this.killCount = 0;

    this.update = function(time, objects) {
        time /= 1000
        if (this.radius > 65) {
            this.isDead = true;
        }
        var missiles = objects.filter(obj => obj.constructor == EnemyMissile);
        for (var i = 0; i < missiles.length; i++) {
            var distance = this.position.distanceTo(missiles[i].position);
            if(distance < this.radius) {
                missiles[i].isDead = true;
                this.killCount += 1;
            }
        }
        this.radius += 3;
    }

    this.getKills = function() {
        return this.killCount;
    }
};