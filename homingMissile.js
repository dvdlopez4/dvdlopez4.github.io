

const HomingMissile = function (x,y,gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.rate = Math.random();
    this.position = [x - this.Size[0] / 2, y - this.Size[1] / 2];
    this.velocity = [Math.round(Math.random() * 10 + 5), Math.round(Math.random() * -10 + 5)];
    this.velocity[0] *= Math.random() < 0.5 ? -1 : 1;
    this.State = 0;
    this.Target = null;
    this.life = 5;
    this.Color = "#00ff00";

    this.update = function(time, objects) {
        time /= 1000;
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);

        if(this.life < 0) {
            this.isDead = true;
        }
        this.life--;
    }

    this.death = function(objects) {
        objects.push(new Explosion(this.position[0], this.position[1], new ExplosionGraphics()));
    }
};