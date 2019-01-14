

const EnemyMissile = function (width, height, gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.position = [Math.round(Math.random() * width),-20];
    this.dest = [Math.round(Math.random() * width), height];
    var vx = (this.dest[0] - this.position[0]) / 100;
    var vy = height / 100;
    var normal = Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2)) / 3;
    vx /= normal;
    vy /= normal;
    this.velocity = [vx, vy];
    this.Color = "#ffffff";

    this.update = function(time, objects) {
        time /= 1000
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
        // this.velocity[1] += 1;
        if(this.position[1] > this.dest[1]) {
            this.isDead = true;
        }
    }

    this.death = function(objects) {
        for (var p = 0; p < 5; p++) {
            objects.push(new Square(this.position[0], this.position[1], new Graphics()));
        }
    }
};