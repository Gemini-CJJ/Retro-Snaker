var tool = {
    inherit: function(target, origin) {  //只是继承了原型
         var temp = function () {};
         temp.prototype = origin.prototype;
         target.prototype = new temp();
         target.prototype.constructor = target;
    },
    extends: function(origin) {
        var result = function () {
            origin.apply(this,arguments); //获得私有属性
        }
        this.inherit(result,origin)   //继承原型
        return result;
    },
    single: function(origin) {
        var singleResult = (function() {
            var instance;
            return function() {
                if(typeof instance == 'object') {
                    return instance;
                }
                origin && origin.apply(this,arguments);//获得私有属性
                instance = this;
            }
        }());
        origin && this.inherit(singleResult, origin);//继承原型
        return singleResult;
    },
    throttle: function () {
        
    }
}


// function Square (x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }

// Square.prototype.touch = function() {
//     console.log('touch')
// }

// function Food() {

// }


// tool.inherit(Food, Square); //只继承了原型
// var Food = tool.extends(Square); //继承了原型和私有属性
// var oF = new Food(10, 20, 100, 200);
// oF.touch()


// var Food = tool.single(Square)
// var oF1 = new Food(10, 20, 100, 300)
// var oF2 = new Food(10, 20, 100, 300)
// var oF3 = new Food(10, 20, 100, 300)















