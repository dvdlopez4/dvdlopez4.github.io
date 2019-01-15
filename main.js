/*Entry*/


window.addEventListener("load", function(event) {
    var canvas = document.querySelector("canvas");
    var width = document.documentElement.clientWidth - 100;
    var height = document.documentElement.clientHeight - 150;
    var game = new Game(width,height);
    game.init();
    var run = function(time_stamp) {
        game.run(time_stamp);
        window.requestAnimationFrame(run);
    }

    window.addEventListener("resize", function(e) {
        game.display.resize();
    });

    canvas.addEventListener("click", function(e) {
        var dims = game.display.getDimensions();
        var rocket = new Rocket(e.offsetX, e.offsetY, new Graphics());
        rocket.initialPosition(dims[0] / 2, dims[1]);
        game.objects.push(rocket);
    });
    window.requestAnimationFrame(run);
})

