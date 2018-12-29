

const Square = function (x,y) {
    this.Size = [50,50];
    this.rate = Math.random();
    this.position = [x - this.Size[0] / 2, y - this.Size[1] / 2];
    this.velocity = [Math.round(Math.random() * 10), Math.round(Math.random() * -25)];
    this.Color = "rgb(" + Math.round(Math.random() * 255) + ", " + 
                        Math.round(Math.random() * 255) + ", " + 
                        Math.round(Math.random() * 255) + ")"; 

    this.update = function(time) {
        time /= 1000;
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);

        if(this.Size[0] > 1) {
            this.Size[0] -= this.rate;
            this.Size[1] -= this.rate;
        }
        this.velocity[1] += 15  * time;
    }
};