

const EnemyMissile = function (width, height, gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.position.set(Math.round(Math.random() * width),-20);
    this.dest = new Vector2(Math.round(Math.random() * width), height);
    var vx = (this.dest.x - this.position.x) / 100;
    var vy = height / 100;
    var normal = Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));
    vx /= normal;
    vy /= normal;
    this.velocity.set(vx, vy);
    this.Color = "#ffffff";
    this.rate = 0;
    this.damage = 0;
    this.maxDamage = 5;
    this.health = 1;
    this.invincible = false;
    this.iFrames = 4;

    this.update = function(time, objects) {
        time /= 1000;
        this.position = this.position.add(this.velocity);
        // this.velocity[1] += 1;
        if (this.position.y + this.Size[1] > this.dest.y) {
            this.isDead = true;
            this.damage = this.maxDamage;
        }
        if (this.health <= 0) this.isDead = true;
        if (this.invincible) {
            if (this.iFrames > 0) {
                this.iFrames = 4;
                this.invincible = false;
            }
            this.iFrames--;
        }
        if (this.rate >= 0.03) {
            this.rate = 0;
            var gp = new GhostParticle(this.position.x, this.position.y, new Graphics());
            gp.Size = this.Size;
            objects.push(gp);
        }

        this.rate += time;
    }

    this.death = function(objects) {
        for (var p = 0; p < 5; p++) {
            var sq = 
            objects.push(new Square(this.position.x, this.position.y, new Graphics()));
        }
    }
};