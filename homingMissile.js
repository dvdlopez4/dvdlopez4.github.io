

const HomingMissile = function (x,y,gfx) {
    GameObject.call(this, gfx);
    this.Size = [10,10];
    this.position.set(x - this.Size[0] / 2, y - this.Size[1] / 2);
    this.velocity.set(Math.round(Math.random() * 4), Math.round(Math.random() * -5 - 3));
    this.velocity.x *= Math.random() < 0.5 ? -1 : 1;
    this.acceleration = new Vector2(0,0);
    this.State = 0;
    this.Target = null;
    this.life = 300;
    this.Standby = 50;
    this.Color = "#00ff00";

    this.update = function(time, objects) {
        time /= 1000;
        // this.acceleration = this.acceleration.add(new Vector2(0, 0.5)).mult(time);
        switch(this.State) {
            case 0:
                if (this.Standby === 0) {
                    var missiles = objects.filter(obj => obj.constructor == EnemyMissile);
                    for (var i = 0; i < missiles.length; i++) {
                        var distance = this.position.distanceTo(missiles[i].position);
                        if(distance < 200) {
                            this.Target = missiles[i];
                            this.State = 1;
                            break;
                        }
                    }
                    this.isDead = true;
                } else {
                    this.Standby--;
                }
                this.acceleration = this.acceleration.add(new Vector2(0, 9)).mult(time);
                
                break;
            case 1:
                if(this.Target != undefined && this.Target.isDead) {
                    this.Target = null;
                    this.State = 0;
                } else {
                    var desired = this.Target.position.sub(this.position);
                    desired.normalize();
                    desired = desired.mult(8);
                    var steer = desired.sub(this.velocity);
                    this.acceleration = this.acceleration.add(steer);
                    var distance = this.position.distanceTo(this.Target.position);
                    if(distance < 4) {
                        this.isDead = true;
                    }
                }
                break;
        }
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);

        this.acceleration = this.acceleration.mult(0);
        if(this.life < 0) {
            this.isDead = true;
        }
        this.life--;
    }

    this.death = function(objects) {
        objects.push(new Explosion(this.position.x, this.position.y, new ExplosionGraphics()));
        objects.push(new HomingMissile(this.position.x, this.position.y, new Graphics()));
    }
};