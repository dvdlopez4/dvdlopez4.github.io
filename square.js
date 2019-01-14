

const Square = function (x,y,gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.rate = Math.random();
    this.position = [x - this.Size[0] / 2, y - this.Size[1] / 2];
    this.velocity = [Math.round(Math.random() * 10), Math.round(Math.random() * -10)];
    this.velocity[0] *= Math.random() < 0.5 ? -1 : 1;
    this.Color = "#ffffff"; 

    this.update = function(time, objects) {
        time /= 1000;
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);

        if(this.Size[0] > 1) {
            this.Size[0] -= this.rate;
            this.Size[1] -= this.rate;
        } else {
            this.isDead = true;
        }
        this.velocity[1] += 15  * time;
    }
};