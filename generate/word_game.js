(function() {
  var word_game = [
    'Куб', 'Брат', 'Окружность', 'Плетение',
    'Углы', 'Вина', 'Скорость', 'Добряк',
    'Пифагор', 'Тревога', 'Рассчитать', 'Частность',
    'Вход', 'Отец', 'Кулак', 'Поддержка',
    'Амфора', 'Бунгало', 'Камертон', 'Фофудья',
    //t2
    'Вода', 'Сторонник', 'Конфуз', 'Сто',
    'Наука', 'Пустота', 'Уравнение', 'Щавель',
    'Ом', 'Кенгуру', 'Вперед',  'Золото',
    'Призма', 'Нырять', 'гладить', 'кисть',
    'Этюд', 'Сомнение', 'Вывеска', 'Неизвестно',
    //t3
    'Слезы', 'Задача', 'Полотно', 'Честность',
    'Проводок', 'Граната', 'Вера', 'Имущество',
    'Таблица', 'Сознание', 'Удивление', 'Оружие',
    'Вероисповедание', 'Нейтрино', 'Встрепенуться', 'Физтех',
    'Тофу', 'Опричнина', 'Прелюбодеяние', 'Аккредитация',
  ];

  ex = ['Счастье', 'Камень', 'Люстра', 'Пример']

  var c = 0;
      current_command = 0;
      current_member = 0;

  ex.forEach(function(word) {
    c++;
    var last = false;
    if(c === ex.length) {
      last = true;
    }

    document.getElementById('pt-main').insertBefore(
      make_slide.word(word, 15, last),
      document.getElementById('word_game_end'));
  });

  c = 0;

  word_game.forEach(function(word) {
    if(c%4 === 0) {
      document.getElementById('pt-main').insertBefore(
        make_slide.swap(commands[current_command][current_member], 10, key_slides.word_game),
        document.getElementById('word_game_end'));
        current_member++;
        if(current_member === commands[current_command].length) {
          current_command++;
          current_member=0;
        }
    }
    c++;

    var last = false;
    if(c%4 === 0) {
      last = true;
    }

    document.getElementById('pt-main').insertBefore(
      make_slide.word(word, 15, last),
      document.getElementById('word_game_end'));
  });
}() );
