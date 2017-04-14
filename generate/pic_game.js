(function() {
  document.getElementById('pt-main').insertBefore(
    make_slide.pic('1.jpg', 15, 'right', 180),
    document.getElementById('pic_game_end'));

  var current_command = 0;

  for(var i=2; i<=4; i++) {
    document.getElementById('pt-main').insertBefore(
      make_slide.swap(command_names[current_command], 10, key_slides.pic_game),
      document.getElementById('pic_game_end'));
    current_command++;
    if(current_command === commands.length) {
      current_command=0;
    }

    document.getElementById('pt-main').insertBefore(
      make_slide.pic(i.toString() + '.jpg', 15, 'top', 180),
      document.getElementById('pic_game_end'));
  }
}() );
