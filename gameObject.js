
// Base class for all objects on the screen.
const GameObject = function (gfx = undefined) {
    this.Size = [10,10];
    this.position = [0, 0];
    this.velocity = [0, 0];
    this.graphics = gfx;
    this.isDead = false;

    this.render = function(buffer) {
        if(this.graphics) { this.graphics.render(this, buffer); }
    }
};