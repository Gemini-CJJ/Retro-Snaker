var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN*SQUAREWIDTH, YLEN*SQUAREWIDTH);

ground.init = function() {
    //渲染广场
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.background = '#0ff';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    document.body.appendChild(this.viewContent);

    //填充广场 Stone Floor      SnakeHead SnakeBody Food
    this.SquareTable = []

    for(var i =0 ; i < YLEN; i++) {
        //(x,y) => (j,i)  坐标
        this.SquareTable[i] = new Array(XLEN)
        for(var j = 0; j<XLEN; j++){
            if( j== 0 || i == 0 || j == XLEN-1 || i == YLEN-1) {
                //生成障碍物
                var newSquare = SquareFactory.create('Stone' ,j ,i, 'black');
            }else{
                //生成地板
                var newSquare = SquareFactory.create('Floor' ,j ,i,'orange')
            }
            this.SquareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}

//拆方法
ground.remove = function(x, y) {
    this.viewContent.removeChild(this.SquareTable[y][x].viewContent);//移除对应ground里的dom
    this.SquareTable[y][x] = null;//在数组删除对应dom的数据
}

//安方法
ground.append = function(square) {
    this.SquareTable[square.y][square.x] = square; //在数组里添加对应的dom数据
    this.viewContent.appendChild(square.viewContent) //在ground上添加dom
}







//Game.js使用
// ground.init();