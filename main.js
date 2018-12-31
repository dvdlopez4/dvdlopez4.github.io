/*Entry*/


window.addEventListener("load", function(event) {
    var canvas = document.querySelector("canvas");
    var game = new Game();
    game.init();
    var run = function(time_stamp) {
        game.run(time_stamp);
        window.requestAnimationFrame(run);
    }

    canvas.addEventListener("click", function(e) {
        game.objects.push(new Rocket(e.offsetX, e.offsetY, new Graphics()));
    });
    window.requestAnimationFrame(run);
})

