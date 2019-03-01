var snake = new Snake();
snake.head = null;
snake.tail = null;

var DERECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
}


snake.init = function() {
//创建蛇头和蛇身
var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red')
var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green')
var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green')

this.head = snakeHead;
this.tail = snakeBody2;

//创建链表
snakeHead.next = snakeBody1;
snakeHead.last = null;

snakeBody1.next = snakeBody2;
snakeBody1.last = snakeHead;

snakeBody2.next = null;
snakeBody2.last = snakeBody1;

//direction right
this.direction = DERECTIONENUM.RIGHT;


//show snake
ground.remove(snakeHead.x, snakeHead.y)
ground.append(snakeHead);

ground.remove(snakeBody1.x, snakeBody1.y);
ground.append(snakeBody1);

ground.remove(snakeBody2.x, snakeBody2.y);
ground.append(snakeBody2);



snake.strategies = {
    MOVE: function (snake, square, ground, fromEat) {
        //生成身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        //融入整个蛇
        newBody.next = snake.head.next;  //新身体和上节相连
        newBody.next.last = newBody;
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        //新建蛇头
        var newHead = SquareFactory.create('SnakeHead',square.x, square.y, 'red');
        //蛇头融入蛇身
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);

        if(!fromEat) {
        //拆尾巴
        var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
        ground.remove(snake.tail.x, snake.tail.y);
        ground.append(newFloor);
        snake.tail = snake.tail.last;
        }
        snake.head = newHead;
    },
    EAT: function (snake, square, ground) {
        this.MOVE(snake, square, ground, true);
        createFood(ground);
        game.score++;
    },
    DIE: function (snake, square, ground) {
        game.over()
    }
}

//根据蛇的移动做出判断 根据你移动方向做出预判
snake.move = function (ground) {
    //this.head.x + this.direction.x  this.head.y + this.direction.y
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if(typeof square.touch == 'function') {
        //   装饰池        策略名
        this.strategies[square.touch()](this,square,ground);

    }
}
}


//在game.js
// snake.init();
