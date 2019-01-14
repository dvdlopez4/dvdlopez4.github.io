

const Rocket = function (x,y,xi,yi, gfx = undefined) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    // Starting position is at the middle and bottom of the canvas
    this.position = [xi - this.Size[1] / 2, yi - this.Size[1]];
    
    // Calculate the velocity vector that will peak at the mouse position
    var a = 25 * 0.01666;
    var vy = (-a - Math.sqrt(Math.pow(a,2) - 4*a*(y - this.position[1]))) / 2;
    var n = (-vy * 1.35) / a;
    this.velocity = [(x - this.position[0]) / n, vy * 1.35];

    this.Color = "rgba(255,0,0,0.5)";

    this.update = function(time, objects) {
        time /= 1000
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);

        this.velocity[1] += 25 * time;
        // At the height of the trajectory turn on the isDead flag
        if(this.velocity[1] > 0 && this.isDead == false) {
            this.isDead = true;
        }
    }

    this.death = function(objects) {
        objects.push(new Explosion(this.position[0], this.position[1], new ExplosionGraphics()));
    }
};