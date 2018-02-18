/**
 * Created by Dallu on 2/17/2018.
 */
var para = document.querySelector('p');
var count = 0;

var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min, max) {
    var num = Math.floor(Math.random()*(max-min+1))+min;
    return num;
}

function Shape(x, y, velX, velY, exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}
Ball.prototype = new Shape();
Ball.prototype.constructor = Ball;
function Ball(x, y, velX, velY, exists, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
    this.color = color;
    this.size = size;
}

evilCircle.prototype = new Shape();
evilCircle.prototype.constructor =evilCircle;
function evilCircle(x, y, exists, color, size, velX, velY){
    this.x = x;
    this.y = y;
    this.exists = exists;
    this.color = 'white';
    this.size = 20;
    this.velX = 20;
    this.velY = 20;
}

Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
};


Ball.prototype.update = function(){
    if((this.x + this.size)>= width){
        this.velX = -(this.velX);
    }
    if((this.x - this.size) <= 0){
        this.velX = -(this.velX);
    }
    if((this.y + this.size) >= height){
        this.velY = -(this.velY);
    }
    if((this.y - this.size) <=0){
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
};


Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
};

evilCircle.prototype.draw = function(){
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.stroke();
};

evilCircle.prototype.checkBounds = function(){
    if((this.x + this.size)>= width){
        this.x -= this.size;
    }
    if((this.x - this.size) <= 0){
        this.x += this.size;
    }
    if((this.y + this.size) >= height){
        this.y -= this.size;
    }
    if((this.y - this.size) <=0){
        this.y += this.size;
    }
};

evilCircle.prototype.setControls = function() {
    var _this = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 65) {
            _this.x -= _this.velX;
        } else if (e.keyCode === 68) {
            _this.x += _this.velX;
        } else if (e.keyCode === 87) {
            _this.y -= _this.velY;
        } else if (e.keyCode === 83) {
            _this.y += _this.velY;
        }
    }
};

evilCircle.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count--;
                para.textContent = 'Ball Count ' + count;
            }
        }
    }
};

var balls = [];

var evil = new evilCircle(
    random(0, width),
    random(0, height),
    true
);
evil.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25) {
        var ball = new Ball(
            random(0,width),
            random(0,height),
            random(-7,7),
            random(-7,7),
            true,
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
            random(10,20)
        );
        balls.push(ball);
        count++;
        para.textContent = 'Ball Count ' + count;
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();


    requestAnimationFrame(loop);
}
loop();

