/*Entry*/


window.addEventListener("load", function(event) {
    var canvas = document.querySelector("canvas");
    var display = new Display(canvas);

    var timeStep = 1000/30;
    var accumulatedTime = 0;
    var time =  window.performance.now();
    var updated = false;
    var color = "#00004b";

    var p1 = new Player();

    var objects = [p1];
    var run = function(time_stamp) {
        accumulatedTime += time_stamp - time;
        time = time_stamp;

        if (accumulatedTime >= timeStep * 3) {
            accumulatedTime = timeStep;
        }
        var squares = [];
        while(accumulatedTime >= timeStep) {
            accumulatedTime -= timeStep;
            for (var i = 0; i < objects.length; i++) {
                objects[i].update(timeStep);
                if(objects[i].constructor == Rocket) {
                    if(objects[i].Explode) {
                        for(var x = 0; x < 5; ++x) {
                            squares.push(new Square(objects[i].position[0], objects[i].position[1]));
                        }
                        objects.push(new Explosion(objects[i].position[0], objects[i].position[1]));
                        objects.splice(i,1);
                    }
                }
                if(objects[i].constructor == Explosion) {
                    if(objects[i].isDead) {
                        objects.splice(i,1);
                    }
                }
                if(objects[i].constructor == EnemyMissile) {
                    if(objects[i].isDead) {
                        for(var x = 0; x < 5; ++x) {
                            squares.push(new Square(objects[i].position[0], objects[i].position[1]));
                        }
                        objects.splice(i,1);
                    }
                }
            }

            // Check if any explosions collided with the missiles currently on screen
            var missiles = objects.filter(obj => obj.constructor == EnemyMissile);
            var explosions = objects.filter(obj => obj.constructor == Explosion);
            for (var e = 0; e < explosions.length; e++) {
                for (var i = 0; i < missiles.length; i++) {
                    var distance = Math.sqrt((Math.pow(missiles[i].position[0] - explosions[e].x, 2)) + (Math.pow(missiles[i].position[1] - explosions[e].y, 2)));
                    if(distance < explosions[e].radius) {
                        missiles[i].isDead = true;
                    }
                }
            }
            
            objects = objects.concat(squares);
            if(Math.random() < 0.02) {
                objects.push(new EnemyMissile(640, 700));
            }
            updated = true;
        }

        if(updated) {
            updated = false;
            display.render(objects);
        }

        window.requestAnimationFrame(run);
    }


    canvas.addEventListener("click", function(e) {
        objects.push(new Rocket(e.offsetX, e.offsetY));
    });
    window.requestAnimationFrame(run);
})

