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
    //send snake to opposite side if edge hit
    if (this.x > 20) {
      this.x = 1;
    }
    if (this.x < 1) {
      this.x = 20;
    }
    if (this.y > 20) {
      this.y = 1;
    }
    if (this.y < 1) {
      this.y = 20;
    }
  }
  move() {
    //move head in current direction
    this.remove();
    this.render();
  }
}
