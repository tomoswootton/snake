//GENERAL
$(document).keydown(function(e) {
  switch (e.which) {
    case 37:
    if (snake[0].direction != 'right') {
      snake[0].direction = 'left';
    }
    break;
    case 38:
    if (snake[0].direction != 'down') {
      snake[0].direction = 'up';
    }
    break;
    case 39:
    if (snake[0].direction != 'left') {
      snake[0].direction = 'right';
    }
    break;
    case 40:
    if (snake[0].direction != 'up') {
      snake[0].direction = 'down';
    }
    break;
  }
})
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
  spawnStuff();
  $(window).trigger('resize');
});``

function findSquare(x,y) {
  return $('[data-x='+x+'][data-y='+y+']');
}

function randCoords() {
  return Math.floor(Math.random() * 20) + 1 ;
}

//SPAWNERS
function spawnStuff() {
  snake.push(new Snake_head(10,10,0));
  snake.push(new Snake(9,10,1));
  snake.push(new Snake(8,10,2));

  for (i=0;i<=2;i++) {
    snake[i].render();
  }
  snake[snake.length-1].setTail();
  addFood();
}

function addToSnake() {
  // snake.splice(snake.length-2,0,new Snake(snake[snake.length-1].x,snake[snake.length-1].y,'body',snake.length+1));
  snake.push(new Snake(snake[snake.length-1].x,snake[snake.length-1].y,snake.length));
  snake[snake.length-2].unSetTail();
  snake[snake.length-1].setTail();
}

function killSnake() {
  for (i=0;i<=snake.length-1;i++) {
    snake[i].remove();
  }
  snake.splice(0,snake.length);
}

function addFood() {
  var food = new Food(randCoords(),randCoords());
  food.render();
}

function killFood() {
  $('.food').remove();
}

//running of game
function run() {
  if (!running) {
    timer = setInterval(tick,tick_time);
    running = true;
  } else {
    stopRun();
  }
}

function stopRun() {
  clearInterval(timer);
  running = false;
}

function tick() {
  console.log(tick_time)
  $(window).trigger('resize');
  //for each body and tail part of snake, grab new coords from part infront
  for (i=snake.length-1;i>=0;i--) {
    snake[i].grabNewCoords();
  }
  //kill if crash
  if(snakeInSquare(snake[0].x,snake[0].y)) {
    stopRun();
    alert('game over! Your score is '+score+'.');
    killSnake();
    killFood();
    spawnStuff();
    $(window).trigger('resize');
    score = 0;
    return
  }
  //eat if crash with food
  if (appleInSquare(snake[0].x,snake[0].y)) {
    killFood();
    addToSnake();
    addFood();
    tick_time = tick_time - 8;
    //stop start to resest speed
    stopRun();
    run();
    score++;
  }

  //for each part, move to new coords
  for (i=0;i<=snake.length-1;i++) {
    snake[i].move();
  }
}

function snakeInSquare(x,y) {
  //checks if x,y value has snake
  if(findSquare(x,y).children().hasClass('snake_body') || findSquare(x,y).children().hasClass('snake_tail')) {
    return true;
  }
}

function appleInSquare(x,y) {
  if(findSquare(x,y).children().hasClass('food')) {
    return true;
  }
}

snake = [];
running = false;
tick_time = 400;
score = 0;
