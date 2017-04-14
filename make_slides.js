var make_slide = {}
var templates = {
  word_slide: document.querySelector('link[obj="word_slide"]'),
  multiword_slide: document.querySelector('link[obj="multiword_slide"]'),
  swap_slide: document.querySelector('link[obj="swap_slide"]'),
  www_slide: document.querySelector('link[obj="www_slide"]'),
  pic_slide: document.querySelector('link[obj="pic_slide"]'),
  pictures: [],
  timer: document.querySelector('link[obj="timer"]')
}

function create_timer(time_left) {
  var new_timer = templates.timer.import.querySelector('.timer').cloneNode(true);

  new_timer.querySelector('.outer').style.transitionDuration = time_left + 's';

  new_timer.start = function() {
    new_timer.querySelector('.outer').style.transform = 'scale(1.01)';
    setTimeout(function() {
      new_timer.style.borderColor = 'var(--error-color)';
      new_timer.querySelector('.outer').style.background = 'var(--error-color)';
      new_timer.querySelector('.outer').style.transitionDuration = '.2s';
    }, (time_left*0.9) * 1000);
  };

  return new_timer;
}

make_slide.word = function(word, time_left, last) {
  var new_slide = templates.word_slide.import.querySelector('.slide')
    .cloneNode(true);

  var new_timer = create_timer(time_left);

  new_slide.querySelector('.slide--word__word').innerHTML = word;
  new_slide.querySelector('.slide__time-spot')
    .appendChild(new_timer);

  var transition = "slideLeft";

  if(last) {
    var transition = "openToLeft"
  }

  slides.splice(slides.indexOf(key_slides.word_game), 0, {
    transition: transition,
    beforeSwitch: new_timer.start
  });

  return new_slide;
}

make_slide.multiword = function(words, time_left) {
  var current=0, active=1;
  function next_word() {
    current++;
    if(current === words.length) {
      nextPage();
      return;
    }

    var used = active;
    active = active%2 + 1;

    new_slide.querySelector('.word-'+used).style.transform = 'translateX(-100%)'
    setTimeout(function() {
      new_slide.querySelector('.word-'+used).style.transition = '0s'
      new_slide.querySelector('.word-'+used).style.transform = 'translateX(100%)'

      setTimeout(function() {
        new_slide.querySelector('.word-'+used).style.transition = '.5s'
      }, 100);

    }, 500);

    new_slide.querySelector('.word-'+active).style.transform = 'translateX(0)'
    new_slide.querySelector('.word-'+active).innerHTML = words[current];
  }

  var new_slide = templates.multiword_slide.import.querySelector('.slide')
    .cloneNode(true);

  var new_timer = create_timer(time_left);

  new_slide.querySelector('.word-1').innerHTML = words[0];
  new_slide.querySelector('.slide__time-spot')
    .appendChild(new_timer);

  slides.splice(slides.indexOf(key_slides.universal_game), 0, {
    transition: "openToLeft",
    beforeSwitch: function() {
      // console.log('on');
      new_timer.start();
      $(document).keyup(function(event) {
  			var key = event.which;
        // console.log(key);
  			if(key == 83 && new_slide.classList.contains('pt-page-current')) {
  				next_word();
  			}
      });
    }
  });

  return new_slide;
}

make_slide.swap = function(name, time_left, key_slide) {
  var new_slide = templates.swap_slide.import.querySelector('.slide')
    .cloneNode(true);

  var new_timer = create_timer(time_left);

  new_slide.querySelector('.slide--swap__name').innerHTML = name;
  new_slide.querySelector('.slide__time-spot')
    .appendChild(new_timer);

  slides.splice(slides.indexOf(key_slide), 0, {
    transition: "openToRight",
    beforeSwitch: new_timer.start
  });

  return new_slide;
}

make_slide.pic = function(url, questions, side, time_left) {
  var new_slide = templates.pic_slide.import.querySelector('.slide')
    .cloneNode(true);

  var new_timer = create_timer(time_left);

  new_slide.style.backgroundImage = 'url(pics/' + url + ')';
  new_slide.querySelector('.pic_overlay').classList.add(side);
  new_slide.querySelector('.slide--swap__name').innerHTML = questions;
  new_slide.querySelector('.slide__time-spot')
    .appendChild(new_timer);

  slides.splice(slides.indexOf(key_slides.pic_game), 0, {
    transition: "scaleOut",
    beforeSwitch: function() {
      // console.log('on');
      new_timer.start();
      $(document).keyup(function(event) {
  			var key = event.which;
        // console.log(key);
  			if(key == 83 && new_slide.classList.contains('pt-page-current')) {
          questions--;
  				new_slide.querySelector('.slide--swap__name').innerHTML = questions;
  			}

        if(key == 69 && new_slide.classList.contains('pt-page-current')) {
          questions--;
  				new_slide.querySelector('.pic_overlay').classList.add('hidden');
  			}
      });
    }
  });

  return new_slide;
}


make_slide.www = function(table, time_left) {
  function reset_timer() {
    new_slide.querySelector('.slide__time-spot')
      .innerHTML = '';

    console.log(time_left);

    var new_timer = create_timer(time_left);

    new_slide.querySelector('.slide__time-spot')
    .appendChild(new_timer);

    setTimeout(new_timer.start, 500);
  }

  var new_slide = templates.www_slide.import.querySelector('.slide')
    .cloneNode(true);

  new_slide.querySelectorAll('td:not(.head)').forEach(function(cell) {
    cell.addEventListener('click', function(event) {
      var catergory = cell.parentElement.classList[0];
      var price = this.innerHTML;
          price = parseInt(price)/10 - 1;


      cell.style.opacity = 0;

      reset_timer();

      new_slide.querySelector('.slide--www__question__question')
        .innerHTML = table[catergory][price].question;

      new_slide.querySelector('.slide--www__question__answer')
        .innerHTML = table[catergory][price].answer;

      new_slide.querySelector('.slide--www__question__answer')
        .style.background = 'var(--accent-color)';

      new_slide.querySelector('.slide--www__question').style.display = 'flex';
      new_slide.querySelector('.slide--www__table').style.display = 'none';
    });
  });

  slides.splice(slides.indexOf(key_slides.www_game), 0, {
    transition: "scaleOut",
    beforeSwitch: function() {
      $(document).keyup(function(event) {
        var key = event.which;
        console.log(key);
        if(key == 83 && new_slide.classList.contains('pt-page-current')) {
          new_slide.querySelector('.slide--www__question__answer')
            .style.background = 'var(--bg-color)';
        }

        if(key == 69 && new_slide.classList.contains('pt-page-current')) {
          new_slide.querySelector('.slide--www__question').style.display = 'none';
          new_slide.querySelector('.slide--www__table').style.display = 'block';
        }
      });
    }
  });

  return new_slide;
}
