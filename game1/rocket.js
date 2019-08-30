

const Rocket = function (x,y, gfx = undefined) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.peak = new Vector2(x, y);
    this.Color = "rgba(255,0,0,0.5)";
    this.acceleration = new Vector2(0,25);
    this.level = 1;

    this.update = function(time, objects) {
        time /= 1000
        this.position = this.position.add(this.velocity);
        this.velocity = this.velocity.add(this.acceleration.mult(time));

        // At the height of the trajectory turn on the isDead flag
        if(this.velocity.y > 0 && this.isDead == false) {
            this.isDead = true;
        }
    }

    this.death = function(objects) {
        if (this.level > 2) {
            objects.push(new Explosion(this.position.x + 40, this.position.y, new ExplosionGraphics()));
            objects.push(new Explosion(this.position.x - 40, this.position.y, new ExplosionGraphics()));
        }
        if (this.level > 1) {
            for(var i = 0; i < this.level - 1; ++i) objects.push(new HomingMissile(this.position.x, this.position.y, new Graphics()));
        }
        objects.push(new Explosion(this.position.x, this.position.y, new ExplosionGraphics()));
    }

    this.initialPosition = function(x, y) {
        // Starting position, where the projectile will be fired from
        this.position.set(x - this.Size[1] / 2, y - this.Size[1]);
        // Calculate the velocity vector that will peak at the mouse position
        var a = 25 * 0.01666;
        var vy = (-a - Math.sqrt(Math.pow(a,2) - 4*a*(this.peak.y - this.position.y))) / 2;
        var n = (-vy * 1.35) / a;
        this.velocity.set((this.peak.x - this.position.x) / n, vy * 1.35);

    }
};