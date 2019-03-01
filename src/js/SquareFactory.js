function SquareFactory (){
    
}

SquareFactory.create = function(type, x, y, color) {
    if(typeof SquareFactory.prototype[type] == undefined) {
        throw 'no this type'
    }
    if(SquareFactory.prototype[type].prototype.__proto__!= SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    var newSquare = new SquareFactory.prototype[type](x,y,color);
    return newSquare
}


//产品初始化
SquareFactory.prototype.init = function(square, color, startegyMessage) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.viewContent.style.backgroundColor = color;
    square.touch = function() {
        return startegyMessage  //不同产品的不同装饰池里的函数
    }
}



//生成子类产品并初始化

SquareFactory.prototype.Floor = function(x ,y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH) //生成产品
    this.init(floor,color, STRATEGYMESSAGEENUM.MOVE); //产品初始化
    return floor;
}

SquareFactory.prototype.Stone = function(x ,y, color) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(stone,color,STRATEGYMESSAGEENUM.DIE);// STRATEGYMESSAGEENUM收集策略信息 
    return stone;
}

SquareFactory.prototype.Food = function(x ,y, color) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(food,color, STRATEGYMESSAGEENUM.EAT);
    food.upDate(x, y);
    return food;
}

SquareFactory.prototype.SnakeHead = function(x ,y, color) {
    var sh = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(sh,color);
    sh.upDate(x,y) //修改单例
    return sh;
}

SquareFactory.prototype.SnakeBody = function(x ,y, color) {
    var sb = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(sb, color, STRATEGYMESSAGEENUM.DIE);
    return sb;
}