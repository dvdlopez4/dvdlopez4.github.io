

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
    this.gameTime = undefined;
    this.fired = false;
    this.rechargeRate = 250;
    this.level = 1;
    this.experience = 100;
    this.currentExp = 0;
    this.health = 100;
    this.maxHealth = 100;

    this.init = function() {
        var canvas = document.querySelector("canvas");
        this.display = new Display(canvas, this.w, this.h);
        this.time = window.performance.now();
    }
    this.levelUp = function() {
        this.level += 1;
        this.currentExp = this.currentExp - this.experience;
        this.experience = 100 + this.level * 65;
    }
    this.run = function(time_stamp) {
        this.accumulatedTime += time_stamp - this.time;
        this.time = time_stamp;
        this.w = this.display.w;
        this.h = this.display.h;

        if (this.accumulatedTime >= this.timeStep * 3) {
            this.accumulatedTime = this.timeStep;
        }
        if (this.fired) {
            this.rechargeRate -= this.timeStep;
            if (this.rechargeRate <= 0) {
                this.fired = false;
                this.rechargeRate = 250;
            }
        }
        if (this.health > 0) {
            while(this.accumulatedTime >= this.timeStep) {
                this.accumulatedTime -= this.timeStep;
                for (var i = 0; i < this.objects.length; i++) {
                    this.objects[i].update(this.timeStep, this.objects);
                }
                for (var i = 0; i < this.objects.length; i++) {
                    if (this.objects[i].isDead) {
                        if (this.objects[i].death != null) this.objects[i].death(this.objects);
                        if (this.objects[i].constructor == Explosion) {
                            this.score += this.objects[i].getKills() * 10;
                            this.currentExp += Math.pow(this.objects[i].getKills(), 2);
                        }
                        if (this.objects[i].damage != undefined) {
                            this.health -= this.objects[i].damage;
                            if (this.health < 0) this.health = 0;
                        }
                        this.objects.splice(i,1);
                    }
                }
                if (this.currentExp > this.experience) this.levelUp();
                var missileCount = this.objects.filter(obj => obj.constructor == EnemyMissile && obj.Size[0] == 10).length;
                if(Math.random() < 0.015 && missileCount < this.level + 2) {
                    var regularEnemyMissile = new EnemyMissile(this.w, this.h * 5 / 6, new Graphics());
                    regularEnemyMissile.velocity = regularEnemyMissile.velocity.mult(3);
                    this.objects.push(regularEnemyMissile);
                }
                var largeCount = this.objects.filter(obj => obj.constructor == EnemyMissile && obj.Size[0] >= 10).length;
                if(Math.random() < 0.005 && largeCount < this.level) {
                    var largeEnemyMissile = new EnemyMissile(this.w, this.h * 5 / 6, new Graphics());
                    largeEnemyMissile.Size = [60,60];
                    largeEnemyMissile.health = 100;
                    largeEnemyMissile.maxDamage = 20;
                    largeEnemyMissile.velocity = largeEnemyMissile.velocity.mult(0.5);
                    this.objects.push(largeEnemyMissile);
                }
                this.updated = true;
            }
        } else {
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

            buffer.fillStyle = "#444444";
            buffer.fillRect(0, this.h * 5 / 6, this.w, this.h);
            buffer.fillStyle = "#33aa33";
            buffer.fillRect(this.w / 2 - 80, this.h * 5 / 6 + 20, 160 * (this.fired ? (1 - this.rechargeRate / 250) : 1),40);
            buffer.strokeStyle = "#ffffff";
            buffer.strokeRect(this.w / 2 - 80, this.h * 5 / 6 + 20, 160, 40);

            buffer.fillStyle = "#33aa33";
            buffer.fillRect(20, this.h - 60, 200 * (this.currentExp / this.experience), 30);
            buffer.strokeStyle = "#ffffff";
            buffer.strokeRect(20, this.h - 60, 200, 30);
            buffer.fillStyle = "#ffffff";
            buffer.fillText(this.level, 20, this.h - 60);

            buffer.fillStyle = "#ff0033";
            buffer.fillRect(this.w / 2 - 100, 60, 200 * (this.health / this.maxHealth), 30);
            buffer.strokeStyle = "#ffffff";
            buffer.strokeRect(this.w / 2 - 100, 60, 200, 30);
            buffer.fillStyle = "#ffffff";
            // buffer.fillText("Rocket count: " + this.rockets, this.w * 2 / 3, this.h * 5 / 6);
            this.display.update();
            this.updated = false;
        }
    }
};