class Food {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.$food = $('<div class="food"></div>');
  }

  render() {
    findSquare(this.x,this.y).append(this.$food);
  }
}
