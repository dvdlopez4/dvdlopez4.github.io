

const Square = function (x,y,gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.rate = Math.random();
    this.position.set(x - this.Size[0] / 2, y - this.Size[1] / 2);
    this.velocity.set(Math.round(Math.random() * 10), Math.round(Math.random() * -10));
    this.velocity.x *= Math.random() < 0.5 ? -1 : 1;
    this.Color = "#ffffff"; 

    this.update = function(time, objects) {
        time /= 1000;
        this.position = this.position.add(this.velocity);
        if(this.Size[0] > 1) {
            this.Size[0] -= this.rate;
            this.Size[1] -= this.rate;
        } else {
            this.isDead = true;
        }
        this.velocity.y += 15  * time;
    }
};