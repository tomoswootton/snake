function Snake(x,y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
}

Snake.prototype.moveUp = function () {
  this.direction = 'up';
};

Snake.prototype.moveDown = function () {
  this.direction = 'down';
};

Snake.prototype.moveLeft = function () {
  this.direction = 'left';
};

Snake.prototype.moveRight = function () {
  this.direction = 'right';
};
