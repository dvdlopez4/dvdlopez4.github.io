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

        while(accumulatedTime >= timeStep) {
            accumulatedTime -= timeStep;
            for (var i = 0; i < objects.length; i++) {
                objects[i].update(timeStep);
            }
            updated = true;
        }

        if(updated) {
            updated = false;
            display.render(objects);
        }

        window.requestAnimationFrame(run);
    }

    canvas.addEventListener("mousemove", function(e) {
        p1.position[0] = e.offsetX - p1.Size[0] / 2;
        p1.position[1] = e.offsetY - p1.Size[1] / 2;
    });

    canvas.addEventListener("click", function(e) {
        var squares = [];
        for(var i = 0; i < 5; ++i) {
            squares.push(new Square(e.offsetX, e.offsetY))
        }
        if (objects.length > 1000) {
            objects.splice(1,5);
        }
        objects = objects.concat(squares);
    });
    window.requestAnimationFrame(run);
})

