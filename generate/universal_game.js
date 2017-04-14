(function() {
  var universal_game = [
    ['Омлет', 'Скутер', 'Спаржа', 'Аксиома', 'Мусс', 'Трансляция'],
    ['Округ', 'Пасха', 'Карамель', 'Хэштег', 'Робокоп', 'Одноклассник'],
    ['Страус', 'Хрестоматия', 'Лапша', 'Молоток', 'Газировка', 'Фейхоа'],
    //r2
    ['Супермен', 'Спагетти', 'Пудинг', 'анорексия', 'Круассан', 'Гороскоп'],
    ['Подвес', 'Сортировка', 'Ярость', 'Символ', 'Лаборатория', 'Теорема'],
    ['Стюардесса', 'Госпиталь', 'Осадок', 'ветеринар', 'Тет-а-тет', 'Лидер'],
  ]

  var c = 0;
      current_command = 0;
      current_member = 0;

  universal_game.forEach(function(wordset) {
    document.getElementById('pt-main').insertBefore(
      make_slide.swap(command_names[current_command], 10, key_slides.universal_game),
      document.getElementById('universal_game_end'));
    current_command++;
    if(current_command === commands.length) {
      current_command=0;
    }
    document.getElementById('pt-main').insertBefore(
      make_slide.multiword(wordset, 90, key_slides.universal_game),
      document.getElementById('universal_game_end'));
  });
}() );
