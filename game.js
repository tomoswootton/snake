$(window).on('load', function() {

  //create squares
  for (y=20;y>0;y--) {
    for (x=1;x<=20;x++) {
      $('.board').append('<div class="square" data-x="'+x+'" data-y="'+y+'"></div>');
    }
  }

  //square and snake size relative to board size so only board width has to be set
  $(window).on('resize', function() {
    $('.board').css("height", $('.board').width());
    //TODO move this code to css
    $('.snake_head').css("margin-top", $('.snake_head').css('marginLeft'));
    $('.snake_tail').css("margin-top", $('.snake_tail').css('marginLeft'));
    $('.snake_body').css("margin-top", $('.snake_body').css('marginLeft'));
    $('.food').css("margin-top", $('.food').css('marginLeft'));
  })
  //force resize listener to set board height
  spawnSnake();
  $(window).trigger('resize');
});``


function findSquare(x,y) {
  return $('[data-x='+x+'][data-y='+y+']');
}

function spawnSnake() {
  snake.push(new Snake_head(10,10,0));
  snake.push(new Snake(9,10,1));
  snake.push(new Snake(8,10,2));
  for (i=0;i<=2;i++) {
    snake[i].render();
  }
  snake[snake.length-1].setTail();

}

function addFood() {
  var food = new Food(randCoords(),randCoords());
  food.render();
}

function randCoords() {
  return Math.floor(Math.random() * 20) + 1 ;
}

function addToSnake() {
  // snake.splice(snake.length-2,0,new Snake(snake[snake.length-1].x,snake[snake.length-1].y,'body',snake.length+1));
  snake.push(new Snake(snake[snake.length-1].x,snake[snake.length-1].y,snake.length));
  snake[snake.length-2].unSetTail();
  snake[snake.length-1].setTail();
}

//movement event listeners
$(document).keydown(function(e) {
  switch (e.which) {
    case 37:
      snake[0].direction = 'left';
      break;
    case 38:
      snake[0].direction = 'up';
      break;
    case 39:
      snake[0].direction = 'right';
      break;
    case 40:
      snake[0].direction = 'down';
      break;
  }
})

//game running
function run() {
  if (running) {
    clearInterval(timer);
    running = false;
  } else {
    timer = setInterval(tick,400);
    running = true;
  }
}

snake = [];
running = false;
function tick() {
  $(window).trigger('resize');
  //for each body and tail part of snake, grab new coords from part infront
  for (i=snake.length-1;i>=1;i--) {
    snake[i].grabNewCoords();
  }
  //for each part, move to new coords
  for (i=0;i<=snake.length-1;i++) {
    snake[i].move();
  }
}
