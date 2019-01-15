

const EnemyMissile = function (width, height, gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.position.set(Math.round(Math.random() * width),-20);
    this.dest = new Vector2(Math.round(Math.random() * width), height);
    var vx = (this.dest.x - this.position.x) / 100;
    var vy = height / 100;
    var normal = Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2)) / 3;
    vx /= normal;
    vy /= normal;
    this.velocity.set(vx, vy);
    this.Color = "#ffffff";

    this.update = function(time, objects) {
        time /= 1000
        this.position = this.position.add(this.velocity);
        // this.velocity[1] += 1;
        if(this.position.y > this.dest.y) {
            this.isDead = true;
        }
    }

    this.death = function(objects) {
        for (var p = 0; p < 5; p++) {
            objects.push(new Square(this.position.x, this.position.y, new Graphics()));
        }
    }
};