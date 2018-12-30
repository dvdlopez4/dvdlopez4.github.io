

const Rocket = function (x,y) {
    this.Size = [10,10];
    this.position = [320 - this.Size[1] / 2,700 - this.Size[1]];
    
    var a = 25 * 0.03333;
    var vy = (-a - Math.sqrt(a*a - 4*a*(y - this.position[1]))) / 2;
    var n = (-vy * 1.4) / a;

    this.velocity = [(x - this.position[0]) / n, vy * 1.4];
    this.Color = "#ff0000";
    this.Explode = false;

    this.update = function(time) {
        time /= 1000
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
        // this.velocity[0] *= 0.85;
        this.velocity[1] += 25 * time;
        if(this.velocity[1] > 0 && this.Explode == false) {
            this.Explode = true;
        }
    }
};