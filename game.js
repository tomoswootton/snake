$(window).on('load', function() {
  for (y=20;y>0;y--) {
    for (x=1;x<=20;x++) {
      $('.board').append('<div class="square" data-x="'+x+'" data-y="'+y+'"></div>');
    }
  }
  $(window).on('resize', function() {
    $('.board').css("height", $('.board').width());
    //set snake height and width to 80% of square

  })
  //force resize listener to set board height
  $(window).trigger('resize');
  spawnSnake();
});

function spawnSnake() {
  $('[data-x='+1+'][data-y='+20+']').append('<div class="snake"></div>');
  $('.snake').css("height", ($('.square').height())*0.8);
  $('.snake').css("width", ($('.square').width())*0.8);
}
