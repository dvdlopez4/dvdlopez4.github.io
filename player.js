

const Player = function () {
    this.position = [0,0];
    this.velocity = [5,0];
    this.Size = [50,50];
    this.Color = "#ff0000";

    this.update = function(time) {
        time /= 1000
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];

        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
        this.velocity[0] *= 0.20;
        // this.velocity[1] *= 0.20;
        this.velocity[1] += 5 * time;
    }
};