

const EnemyMissile = function (width, height, gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.position = [Math.round(Math.random() * width),-20];
    this.dest = [Math.round(Math.random() * width), height];
    var vx = (this.dest[0] - this.position[0]) / 100;
    var vy = height / 100;
    this.velocity = [0, 0];
    this.Color = "#ffffff";

    this.update = function(time) {
        time /= 1000
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
        this.velocity[1] += 1;
        if(this.position[1] > this.dest[1]) {
            this.isDead = true;
        }
    }
};