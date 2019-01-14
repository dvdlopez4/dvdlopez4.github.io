

const Game = function (width = 640, height = 480) {
    this.display = undefined;
    this.objects = [];
    this.timeStep = 1000/60;
    this.accumulatedTime = 0;
    this.time =  undefined;
    this.updated = false;
    this.w = width;
    this.h = height
    this.score = 0;

    this.init = function() {
        var canvas = document.querySelector("canvas");
        this.display = new Display(canvas, this.w, this.h);
        this.time = window.performance.now();
    }

    this.run = function(time_stamp) {
        this.accumulatedTime += time_stamp - this.time;
        this.time = time_stamp;

        if (this.accumulatedTime >= this.timeStep * 3) {
            this.accumulatedTime = this.timeStep;
        }


        while(this.accumulatedTime >= this.timeStep) {
            this.accumulatedTime -= this.timeStep;
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].update(this.timeStep, this.objects);
            }
            for (var i = 0; i < this.objects.length; i++) {
                if(this.objects[i].isDead) {
                    if (this.objects[i].death != null) this.objects[i].death(this.objects);
                    this.objects.splice(i,1);
                }
            }

            if(Math.random() < 0.02) {
                this.objects.push(new EnemyMissile(this.w, this.h, new Graphics()));
            }
            this.updated = true;
        }
        
        if(this.updated) {
            var buffer = this.display.buffer;
            this.display.renderBackground("#00004b");
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].render(buffer);
            }
            buffer.fillStyle = "#00ff00";
            buffer.font = '48px serif';
            buffer.fillText(this.score, 10, 50);

            this.display.update();
            this.updated = false;
        }
    }
};