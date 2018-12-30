

const EnemyMissile = function (width, height) {
    this.Size = [10,10];
    this.position = [Math.round(Math.random() * width),0];
    this.dest = [Math.round(Math.random() * width), height];
    var vx = (this.dest[0] - this.position[0]) / 100;
    var vy = height / 100;
    this.velocity = [vx, vy];
    this.Color = "#ffffff";
    this.isDead = false;

    this.update = function(time) {
        time /= 1000
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
        if(this.position[1] > 700) {
            this.isDead = true;
        }
    }
};