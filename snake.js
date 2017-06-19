class Snake {
  constructor(x,y,id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.$snake = $('<div class="snake_body"></div>');

    // this.render();
    }

  render() {
    findSquare(this.x,this.y).append(this.$snake);
  }

  remove() {
    this.$snake.remove();
  }

  //each move call moves the snake 1 square
  move() {
    this.remove();
    this.render();
  }

  //send x y to next part of snake
  grabNewCoords() {
    this.x = snake[this.id-1].x;
    this.y = snake[this.id-1].y;
  }

  setTail() {
    this.remove();
    this.$snake = $('<div class="snake_tail"></div>');
    this.render();
  }

  unSetTail() {
    this.remove();
    this.$snake = $('<div class="snake_body"></div>');
    this.render();
  }
}
