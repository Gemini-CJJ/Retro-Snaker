var game = new Game();
game.timer = null;
game.score = 0;

//NEXT HIT DELAY  节流
game.init = function () {
    ground.init();
    snake.init(ground);
    createFood(ground);

    //监控事件 控制蛇的移动
    document.onkeydown = function(e) {
        //e.which  left 37 top 38 right 39  down 40
        if(e.which == 37 && snake.direction != DERECTIONENUM.RIGHT) {
            snake.direction = DERECTIONENUM.LEFT;
        }else if(e.which == 38 && snake.direction != DERECTIONENUM.DOWN) {
            snake.direction = DERECTIONENUM.UP;
        }else if(e.which == 39 && snake.direction != DERECTIONENUM.LEFT) {
            snake.direction = DERECTIONENUM.RIGHT;
        }else if(e.which == 40 && snake.direction != DERECTIONENUM.UP) {
            snake.direction = DERECTIONENUM.DOWN;
        }
    }
}

game.start = function () {
    game.timer = setInterval(function() {
        snake.move(ground);
    },200)
}

game.over = function () {
    clearInterval(game.timer)
    alert(game.score);
}

//优化  {}记录整体可用坐标 然后随机抽取
function createFood (ground) {
    var x = null;
    var y = null;
    var flag = true;
    while(flag) {
        x = 1 + Math.floor(Math.random() * 27);
        y = 1 + Math.floor(Math.random() * 27);
        var ok = true;
        for(var i = snake.head; i = snake.next; ) {
            if(x == i.x && y == i.y) {
                ok = false;
                break;
            }
        }
        if(ok) {
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'blue');
    ground.remove(food.x, food.y);
    ground.append(food);
}

game.init();

















