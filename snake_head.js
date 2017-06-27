class Snake_head extends Snake {
  constructor(x,y,id) {
    super(x,y,0);
    this.$snake = $('<div class="snake_head"></div>');
    this.direction = 'right';
  }

  grabNewCoords() {
    switch (this.direction) {
      case 'up':
        this.y++;
        break;
      case 'down':
        this.y--;
        break;
      case 'left':
        this.x--;
        break;
      case 'right':
        this.x++;
        break;
      }
  }

  move() {
    //move head in current direction
    this.remove();
    this.render();
  }
}
