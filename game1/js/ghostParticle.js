
const GhostParticle = function (x,y,gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.alpha = 1;
    this.position.set(x, y);
    this.Color = "rgba(255,255,255," + this.alpha + ")"; 

    this.update = function(time, objects) {
        time /= 1000;
        if (this.alpha >= 0) {
            this.Color = "rgba(255,255,255," + this.alpha + ")"; 
        } else {
            this.isDead = true;
        }
        this.alpha -= 0.09;
    }
};