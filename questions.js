// show: himym | tbbt | friends | twilight | office (см. Logic.SHOWS)
// media: { type: 'image', src } | { type: 'audio', src } | { type: 'text', text }  — текст только когда нет картинки/звука
// bonus: доп-вопросы ведущей после ответа (персонаж / место / ситуация); ответ открывается тапом
// Все цитаты — в русском дубляже (Кураж-Бамбей, РТР/Парамаунт Комеди), звуки — тоже русские, кроме музыки.
const QUESTIONS = [
  // ───────────── Как я встретил вашу маму ─────────────
  {
    id: 'himym-umbrella', show: 'himym', media: { type: 'image', src: 'assets/img/himym-umbrella.jpg' },
    title: 'Жёлтый зонт',
    bonus: [
      { q: 'Кто под зонтом?', a: 'Тед и Трейси (Мать)' },
      { q: 'Что символизирует?', a: 'Судьбу: зонт кочует от Теда к Матери и обратно все 9 сезонов' },
    ],
    fact: 'Главный символ сериала — именно по зонту Тед и находит Мать.',
  },
  {
    id: 'himym-horn', show: 'himym', media: { type: 'image', src: 'assets/img/himym-horn.jpg' },
    title: 'Синяя валторна',
    bonus: [
      { q: 'Кто её украл?', a: 'Тед' },
      { q: 'Для кого?', a: 'Для Робин' },
      { q: 'Откуда?', a: 'Со стены ресторана на первом свидании' },
    ],
    fact: 'В финале Тед снова приходит к Робин с синей валторной.',
  },
  {
    id: 'himym-tattoo', show: 'himym', media: { type: 'image', src: 'assets/img/himym-tattoo.jpg' },
    title: 'Тату-бабочка',
    bonus: [
      { q: 'У кого?', a: 'У Теда, на пояснице' },
      { q: 'Почему?', a: 'По пьяни после расставания с Робин' },
      { q: 'Как называл её Барни?', a: '«Клеймо шалавы»' },
    ],
    fact: 'Сводить тату Тед пошёл к дерматологу Стелле — своей будущей (несостоявшейся) жене.',
  },
  {
    id: 'himym-slap', show: 'himym', media: { type: 'image', src: 'assets/img/himym-slap.jpg' },
    title: 'Спор на пощёчины',
    bonus: [
      { q: 'Кто кого бьёт?', a: 'Маршалл — Барни' },
      { q: 'Из-за чего спор?', a: 'Из-за секрета Робин (Робин Спарклз)' },
      { q: 'Как назывался праздник?', a: '«Пощёчинодарение»' },
    ],
    fact: 'Всего Барни получил 8 пощёчин, последняя — в день его свадьбы.',
  },
  {
    id: 'himym-pineapple', show: 'himym', media: { type: 'image', src: 'assets/img/himym-pineapple.jpg' },
    title: 'Ананасовый инцидент',
    bonus: [
      { q: 'Кто проснулся с ананасом?', a: 'Тед' },
      { q: 'Откуда ананас?', a: 'Загадка сериала. Ответ есть только в удалённой сцене 9 сезона: с крыльца Капитана' },
    ],
    fact: 'Тед также проснулся с вывихнутой лодыжкой, обгоревшим пальто и девушкой Труди.',
  },
  {
    id: 'himym-brocode', show: 'himym', media: { type: 'image', src: 'assets/img/himym-brocode.jpg' },
    title: 'Кодекс братана',
    bonus: [
      { q: 'Автор?', a: 'Барни Стинсон' },
      { q: 'Статья №1?', a: '«Братаны важнее тёлок»' },
    ],
    fact: 'По легенде Барни, Кодекс написал Бенджамин Франклин в 1776 году.',
  },
  {
    id: 'himym-duckytie', show: 'himym', media: { type: 'image', src: 'assets/img/himym-duckytie.jpg' },
    title: 'Утиный галстук',
    bonus: [
      { q: 'Кто носит?', a: 'Барни' },
      { q: 'Почему?', a: 'Проиграл спор Маршаллу и Лили — носить целый год' },
    ],
    fact: 'Чтобы снять галстук раньше, Барни согласился на три дополнительные пощёчины.',
  },
  {
    id: 'himym-challenge', show: 'himym', media: { type: 'image', src: 'assets/img/himym-challenge.jpg' },
    title: 'Вызов принят!',
    bonus: [{ q: 'Кто говорит?', a: 'Барни' }],
    fact: 'Фраза стала мемом далеко за пределами сериала.',
  },
  {
    id: 'himym-suitup', show: 'himym', media: { type: 'image', src: 'assets/img/himym-suitup.jpg' },
    title: 'Приоденься!',
    bonus: [
      { q: 'Кто?', a: 'Барни' },
      { q: 'Кому чаще всего?', a: 'Теду' },
    ],
    fact: 'Барни носит костюм всегда — кроме дня, когда проиграл спор и ходил в спортивном.',
  },
  {
    id: 'himym-mall', show: 'himym', media: { type: 'image', src: 'assets/img/himym-mall.jpg' },
    title: 'Робин Спарклз',
    bonus: [
      { q: 'Кто это на самом деле?', a: 'Робин Щербатски' },
      { q: 'Хит?', a: '«Пойдём в торговый центр!»' },
      { q: 'Страна поп-карьеры?', a: 'Канада' },
    ],
    fact: 'Второй хит Робин Спарклз — «Замки на песке».',
  },
  {
    id: 'himym-metted', show: 'himym', media: { type: 'image', src: 'assets/img/himym-metted.jpg' },
    title: 'А ты знакома с Тедом?',
    bonus: [{ q: 'Кто и зачем это говорит?', a: 'Барни — знакомит Теда с девушками в баре' }],
    fact: 'Так Тед познакомился с Робин в самой первой серии.',
  },
  {
    id: 'himym-legendary', show: 'himym', media: { type: 'audio', src: 'assets/snd/himym-legendary.mp3' },
    title: 'Это будет леген… подожди-подожди… дарно!',
    bonus: [{ q: 'Кто?', a: 'Барни' }],
    fact: 'Любимое слово Барни — в озвучке Кураж-Бамбей.',
  },
  {
    id: 'himym-sonofabitch', show: 'himym', media: { type: 'text', text: '«Ах ты ж сукин сын!»' },
    title: 'Ругательство Лили',
    bonus: [{ q: 'Чьё любимое ругательство?', a: 'Лили' }],
    fact: 'Лили говорит это почти в каждом сезоне — обычно Барни.',
  },
  {
    id: 'himym-evillaugh', show: 'himym', media: { type: 'audio', src: 'assets/snd/himym-evillaugh.mp3' },
    title: 'Злодейский смех',
    bonus: [{ q: 'Кто?', a: 'Барни' }],
    fact: 'Так Барни смеётся, когда очередная схема из «Плейбука» срабатывает.',
  },
  {
    id: 'himym-theme', show: 'himym', media: { type: 'audio', src: 'assets/snd/himym-theme.mp3' },
    title: 'Заставка',
    bonus: [{ q: 'Кто исполняет?', a: 'The Solids — группа создателей сериала' }],
    fact: 'В заставке звучит лишь короткий «па-па-па» кусочек песни.',
  },
  {
    id: 'himym-mailbox', show: 'himym', media: { type: 'text', text: 'Зачем Барни ходил к почтовым ящикам?' },
    title: 'Барни и почтовые ящики',
    bonus: [{ q: 'Зачем?', a: 'Спорные версии принимаются 😄' }],
    fact: 'Вопрос со звёздочкой.',
  },

  // ───────────── Теория большого взрыва ─────────────
  {
    id: 'tbbt-spot', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-spot.jpg' },
    title: 'Место Шелдона',
    bonus: [
      { q: 'Чьё место?', a: 'Шелдона' },
      { q: 'Почему именно оно?', a: 'Идеальная температура, угол к телевизору и поток воздуха' },
    ],
    fact: 'Координаты места Шелдона — «0, 0, 0, 0» в его системе координат.',
  },
  {
    id: 'tbbt-sarcasm', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-sarcasm.jpg' },
    title: 'Табличка «Сарказм»',
    bonus: [
      { q: 'Кто держит?', a: 'Леонард' },
      { q: 'Для кого?', a: 'Для Шелдона — он не распознаёт сарказм' },
    ],
    fact: 'Позже Шелдон научился и стал спрашивать: «Это был сарказм?»',
  },
  {
    id: 'tbbt-temples', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-temples.jpg' },
    title: 'Пальцы к вискам',
    bonus: [
      { q: 'Кто?', a: 'Шелдон' },
      { q: 'Что пытается сделать?', a: 'Взорвать голову Леонарда силой мысли' },
    ],
    fact: 'Не путать с «унаги» Росса из «Друзей»!',
  },
  {
    id: 'tbbt-rpsls', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-rpsls.jpg' },
    title: 'Камень-ножницы-бумага-ящерица-Спок',
    bonus: [
      { q: 'Кто предложил так играть?', a: 'Шелдон' },
      { q: 'Кого побеждает Спок?', a: 'Ножницы и камень' },
    ],
    fact: 'Проблема: все друзья всегда выбирают Спока — ничья.',
  },
  {
    id: 'tbbt-raj', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-raj.jpg' },
    title: 'Радж и девушки',
    bonus: [
      { q: 'В чём его проблема?', a: 'Не может говорить с женщинами' },
      { q: 'Лекарство?', a: 'Алкоголь (или плацебо)' },
    ],
    fact: 'Радж излечился только в финале 6 сезона — после расставания с Люси.',
  },
  {
    id: 'tbbt-flags', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-flags.jpg' },
    title: 'Веселье с флагами',
    bonus: [{ q: 'Ведущие?', a: 'Шелдон и Эми' }],
    fact: 'Веб-шоу о флагах. Один из выпусков — с Леваром Бёртоном.',
  },
  {
    id: 'tbbt-belt', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-belt.jpg' },
    title: 'Коллекция пряжек',
    bonus: [{ q: 'Чья?', a: 'Говарда Воловица' }],
    fact: 'К пряжкам прилагаются джинсы в обтяжку и водолазки с ромбами.',
  },
  {
    id: 'tbbt-flash', show: 'tbbt', media: { type: 'image', src: 'assets/img/tbbt-flash.jpg' },
    title: 'Футболка с Флэшем',
    bonus: [{ q: 'Кто носит?', a: 'Шелдон' }],
    fact: 'Флэш — любимый супергерой Шелдона, на Хэллоуин все четверо пришли Флэшами.',
  },
  {
    id: 'tbbt-bazinga', show: 'tbbt', media: { type: 'audio', src: 'assets/snd/tbbt-bazinga.mp3' },
    title: 'Бугагашеньки!',
    bonus: [
      { q: 'Кто?', a: 'Шелдон' },
      { q: 'Как в оригинале?', a: '«Базинга!»' },
    ],
    fact: 'Впервые прозвучало в финале 2 сезона. Перевод — Кураж-Бамбей.',
  },
  {
    id: 'tbbt-softkitty', show: 'tbbt', media: { type: 'audio', src: 'assets/snd/tbbt-softkitty.mp3' },
    title: 'Тёплый котик, мягкий котик',
    bonus: [
      { q: 'Кому поют?', a: 'Шелдону' },
      { q: 'Когда можно петь?', a: 'Только когда он болеет!' },
    ],
    fact: 'Впервые песенку спела Пенни — в обмен на растирание груди мазью.',
  },
  {
    id: 'tbbt-knock', show: 'tbbt', media: { type: 'audio', src: 'assets/snd/tbbt-knock.mp3' },
    title: 'Тук-тук-тук, Пенни!',
    bonus: [
      { q: 'Кто так стучит?', a: 'Шелдон' },
      { q: 'Сколько раз?', a: 'Три серии по три' },
    ],
    fact: 'Однажды Пенни открыла дверь на первом стуке — Шелдону пришлось достучать в неё.',
  },
  {
    id: 'tbbt-theme', show: 'tbbt', media: { type: 'audio', src: 'assets/snd/tbbt-theme.mp3' },
    title: 'Заставка',
    bonus: [{ q: 'Кто исполняет?', a: 'Barenaked Ladies' }],
    fact: '«Вся наша Вселенная пребывала в горячем плотном состоянии…» — 14 миллиардов лет за 20 секунд.',
  },
  {
    id: 'tbbt-gravity', show: 'tbbt', media: { type: 'text', text: '«Ах, гравитация — бессердечная ты сука»' },
    title: 'Гравитация',
    bonus: [{ q: 'Кто?', a: 'Шелдон' }],
    fact: 'Одна из самых цитируемых реплик Шелдона Купера.',
  },
  {
    id: 'tbbt-holycow', show: 'tbbt', media: { type: 'text', text: '«СвЯтая корова!»' },
    title: 'Святая корова',
    bonus: [],
    fact: 'Одно из фирменных восклицаний «Теории».',
  },

  // ───────────── Друзья ─────────────
  {
    id: 'friends-couch', show: 'friends', media: { type: 'image', src: 'assets/img/friends-couch.jpg' },
    title: 'Оранжевый диван',
    bonus: [{ q: 'Где стоит?', a: 'В кофейне «Централ Перк»' }],
    fact: 'Диван всегда свободен, потому что на нём табличка «Занято» — видно в одной из серий.',
  },
  {
    id: 'friends-pivot', show: 'friends', media: { type: 'image', src: 'assets/img/friends-pivot.jpg' },
    title: 'Поворот!',
    bonus: [
      { q: 'Кто командует?', a: 'Росс' },
      { q: 'Что несут?', a: 'Новый диван Росса по лестнице' },
    ],
    fact: 'Диван в итоге распилили пополам. Магазин вернул 4 доллара.',
  },
  {
    id: 'friends-tan', show: 'friends', media: { type: 'image', src: 'assets/img/friends-tan.jpg' },
    title: 'Автозагар',
    bonus: [
      { q: 'Кто?', a: 'Росс' },
      { q: 'Какой он «номер»?', a: '«Я — восьмёрка!» — 4 слоя спереди, дважды' },
    ],
    fact: 'Счёт «Миссисипи» подвёл Росса — считать надо было быстрее.',
  },
  {
    id: 'friends-turkey', show: 'friends', media: { type: 'image', src: 'assets/img/friends-turkey.jpg' },
    title: 'Индейка на голове',
    bonus: [
      { q: 'Кто?', a: 'Моника' },
      { q: 'Зачем?', a: 'Рассмешить Чендлера — и он впервые сказал «я тебя люблю»' },
    ],
    fact: 'Годом раньше индейку на голову надевал Джоуи — и застрял.',
  },
  {
    id: 'friends-armadillo', show: 'friends', media: { type: 'image', src: 'assets/img/friends-armadillo.jpg' },
    title: 'Праздничный броненосец',
    bonus: [
      { q: 'Кто в костюме?', a: 'Росс' },
      { q: 'Зачем?', a: 'Рассказать сыну Бену о Хануке — костюма Санты не осталось' },
    ],
    fact: 'Броненосец, Санта и Супермен рассказывают о Хануке вместе.',
  },
  {
    id: 'friends-unagi', show: 'friends', media: { type: 'image', src: 'assets/img/friends-unagi.jpg' },
    title: 'Унаги',
    bonus: [
      { q: 'Кто?', a: 'Росс' },
      { q: 'Что это такое?', a: '«Состояние полной боевой готовности». А вообще — угорь' },
    ],
    fact: 'Рэйчел и Фиби потом «унагнули» Росса в ответ.',
  },
  {
    id: 'friends-door', show: 'friends', media: { type: 'image', src: 'assets/img/friends-door.jpg' },
    title: 'Дверь с жёлтой рамкой',
    bonus: [
      { q: 'Чья квартира?', a: 'Моники' },
      { q: 'Что за рамка?', a: 'Жёлтая рамка вокруг глазка' },
    ],
    fact: 'Рамка появилась случайно: у декоратора разбилось зеркало, а рамку оставили.',
  },
  {
    id: 'friends-leather', show: 'friends', media: { type: 'image', src: 'assets/img/friends-leather.jpg' },
    title: 'Кожаные штаны',
    bonus: [
      { q: 'Кто?', a: 'Росс' },
      { q: 'Что пошло не так?', a: 'Не смог надеть их обратно в туалете на свидании. Лосьон + присыпка = паста' },
    ],
    fact: 'Совет по телефону давал Джоуи.',
  },
  {
    id: 'friends-chandler-could', show: 'friends', media: { type: 'image', src: 'assets/img/friends-chandler-could.jpg' },
    title: 'Могу ли я НАДЕТЬ ещё больше одежды?',
    bonus: [
      { q: 'Кто это на самом деле?', a: 'Джоуи, пародирует Чендлера' },
      { q: 'Почему столько одежды?', a: 'Надел всю одежду Чендлера в отместку за спрятанное бельё' },
    ],
    fact: 'И всё это — без белья.',
  },
  {
    id: 'friends-smellycat', show: 'friends', media: { type: 'audio', src: 'assets/snd/friends-smellycat.mp3' },
    title: 'Драный кот',
    bonus: [{ q: 'Кто поёт?', a: 'Фиби Буффе' }],
    fact: '«Драный кот, драный кот, у тебя пустой живот…» В другом переводе — «Вонючий кот».',
  },
  {
    id: 'friends-omg', show: 'friends', media: { type: 'audio', src: 'assets/snd/friends-omg.mp3' },
    title: 'О. Мой. Бог!',
    bonus: [
      { q: 'Кто?', a: 'Дженис' },
      { q: 'Чья бывшая?', a: 'Чендлера' },
    ],
    fact: 'Самый узнаваемый смех на телевидении.',
  },
  {
    id: 'friends-howyoudoin', show: 'friends', media: { type: 'audio', src: 'assets/snd/friends-howyoudoin.mp3' },
    title: 'Привет. Как поживаешь?',
    bonus: [{ q: 'Кто?', a: 'Джоуи Триббиани' }],
    fact: 'Фирменный подкат Джоуи. Работает безотказно.',
  },
  {
    id: 'friends-break', show: 'friends', media: { type: 'text', text: '«У нас был перерыв!»' },
    title: 'У нас был перерыв!',
    bonus: [
      { q: 'Кто?', a: 'Росс' },
      { q: 'Кому?', a: 'Рэйчел' },
    ],
    fact: 'Главный спор сериала, так и не решённый за 10 сезонов.',
  },
  {
    id: 'friends-share', show: 'friends', media: { type: 'audio', src: 'assets/snd/friends-share.mp3' },
    title: 'Джо не делится едой!',
    bonus: [{ q: 'Кто?', a: 'Джоуи' }],
    fact: 'Из-за этого он расстался с девушкой, которая брала картошку с его тарелки.',
  },
  {
    id: 'friends-theme', show: 'friends', media: { type: 'audio', src: 'assets/snd/friends-theme.mp3' },
    title: 'Заставка',
    bonus: [
      { q: 'Кто исполняет?', a: 'The Rembrandts' },
      { q: 'Что все делают под заставку?', a: 'Хлопают четыре раза' },
    ],
    fact: 'Четыре хлопка после первой строчки — обязательны.',
  },

  // ───────────── Сумерки ─────────────
  {
    id: 'twilight-apple', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-apple.jpg' },
    title: 'Яблоко',
    bonus: [
      { q: 'Что это?', a: 'Обложка первой книги' },
      { q: 'Символ чего?', a: 'Запретного плода' },
    ],
    fact: 'В фильме Эдвард ловит яблоко в столовой — отсылка к обложке.',
  },
  {
    id: 'twilight-sparkle', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-sparkle.jpg' },
    title: 'Кожа убийцы',
    bonus: [
      { q: 'Кто?', a: 'Эдвард' },
      { q: 'Что с ним происходит?', a: 'Сверкает на солнце' },
    ],
    fact: '«Это кожа убийцы, Белла» — главный мем саги.',
  },
  {
    id: 'twilight-baseball', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-baseball.jpg' },
    title: 'Вампирский бейсбол',
    bonus: [
      { q: 'Почему только в грозу?', a: 'Гром заглушает удары по мячу' },
      { q: 'Кто пришёл на игру?', a: 'Джеймс, Виктория и Лоран' },
    ],
    fact: 'Играют под песню группы Muse.',
  },
  {
    id: 'twilight-truck', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-truck.jpg' },
    title: 'Красный пикап',
    bonus: [
      { q: 'Чей?', a: 'Беллы' },
      { q: 'От кого?', a: 'Подарок Чарли, куплен у Билли Блэка' },
    ],
    fact: '«Шевроле» 1953 года. Джейкоб его и починил.',
  },
  {
    id: 'twilight-cafeteria', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-cafeteria.jpg' },
    title: 'Выход в столовую',
    bonus: [
      { q: 'Кто это?', a: 'Каллены' },
      { q: 'Где?', a: 'Школа в Форксе' },
    ],
    fact: 'Джессика: «Они все вместе… живут вместе».',
  },
  {
    id: 'twilight-loca', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-loca.jpg' },
    title: 'Где тебя носило, чокнутая?',
    bonus: [{ q: 'Кто?', a: 'Джейкоб' }],
    fact: 'Обязательно без футболки.',
  },
  {
    id: 'twilight-renesmee', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-renesmee.jpg' },
    title: 'Малышка',
    bonus: [
      { q: 'Как зовут?', a: 'Ренесми' },
      { q: 'Из чьих имён?', a: 'Рене + Эсми' },
    ],
    fact: 'Компьютерное лицо младенца стало отдельным мемом.',
  },
  {
    id: 'twilight-forks', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-forks.jpg' },
    title: 'Форкс',
    bonus: [
      { q: 'Штат?', a: 'Вашингтон' },
      { q: 'Что за линия договора?', a: 'Граница между Калленами и волками-квилетами' },
    ],
    fact: 'Реальный Форкс живёт туризмом по «Сумеркам» до сих пор.',
  },
  {
    id: 'twilight-team', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-team.jpg' },
    title: 'Команда Эдварда против команды Джейкоба',
    bonus: [{ q: 'А ты за кого? Аргументируй!', a: 'Любой ответ с аргументом' }],
    fact: 'Спор, расколовший интернет 2009 года.',
  },
  {
    id: 'twilight-betterlovestory', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-betterlovestory.jpg' },
    title: 'Всё ещё лучшая история любви, чем «Сумерки»',
    bonus: [{ q: 'Кто на картинке?', a: 'Рамси и Теон из «Игры престолов». Подходит любой фильм, где двое хоть как-то взаимодействуют' }],
    fact: 'Эпоха мемов о «Сумерках» — 2010–2012.',
  },
  {
    id: 'twilight-spidermonkey', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-spidermonkey.jpg' },
    title: 'Держись крепче, мартышка',
    bonus: [
      { q: 'Кто кому?', a: 'Эдвард — Белле' },
      { q: 'Куда лезут?', a: 'На дерево над лесом Форкса' },
    ],
    fact: 'Фразу выбрал сам Роберт Паттинсон из нескольких вариантов.',
  },
  {
    id: 'twilight-lip', show: 'twilight', media: { type: 'image', src: 'assets/img/twilight-lip.jpg' },
    title: 'Губа',
    bonus: [{ q: 'Кто?', a: 'Белла (Кристен Стюарт)' }],
    fact: 'Фирменный жест Беллы — покусывание губы.',
  },
  {
    id: 'twilight-lullaby', show: 'twilight', media: { type: 'audio', src: 'assets/snd/twilight-lullaby.mp3' },
    title: 'Колыбельная Беллы',
    bonus: [{ q: 'Кто её написал и играет?', a: 'Эдвард — на рояле' }],
    fact: 'В фильме мелодию написал композитор Картер Бёруэлл.',
  },
  {
    id: 'twilight-eyesonfire', show: 'twilight', media: { type: 'audio', src: 'assets/snd/twilight-eyesonfire.mp3' },
    title: 'Песня из саундтрека',
    bonus: [{ q: 'Кто исполняет?', a: 'Blue Foundation' }],
    fact: 'Саундтрек первого фильма — сплошные хиты: Paramore, Muse, Iron & Wine.',
  },
  {
    id: 'twilight-heroin', show: 'twilight', media: { type: 'text', text: '«Ты — мой личный сорт героина»' },
    title: 'Личный сорт героина',
    bonus: [{ q: 'Кто кому?', a: 'Эдвард — Белле' }],
    fact: 'Признание на поляне. Романтика 2008 года.',
  },

  // ───────────── Офис ─────────────
  {
    id: 'office-stapler', show: 'office', media: { type: 'image', src: 'assets/img/office-stapler.jpg' },
    title: 'Степлер в желе',
    bonus: [
      { q: 'Чей степлер?', a: 'Дуайта' },
      { q: 'Кто это сделал?', a: 'Джим' },
    ],
    fact: 'Первая серия, первый розыгрыш — и Дуайт требует ответить «по всей строгости».',
  },
  {
    id: 'office-mug', show: 'office', media: { type: 'image', src: 'assets/img/office-mug.jpg' },
    title: 'Кружка «Лучший босс в мире»',
    bonus: [
      { q: 'Чья?', a: 'Майкла Скотта' },
      { q: 'Кто подарил?', a: 'Он сам себе — купил в магазине' },
    ],
    fact: 'Майкл: «Я не только босс, я ещё и друг. Сначала друг, потом босс».',
  },
  {
    id: 'office-dundermifflin', show: 'office', media: { type: 'image', src: 'assets/img/office-dundermifflin.jpg' },
    title: 'Дандер Миффлин',
    bonus: [
      { q: 'Что продают?', a: 'Бумагу' },
      { q: 'Город?', a: 'Скрэнтон, Пенсильвания' },
    ],
    fact: 'Здание с вывеской в Скрэнтоне реально существует — теперь это место паломничества фанатов.',
  },
  {
    id: 'office-jimface', show: 'office', media: { type: 'image', src: 'assets/img/office-jimface.jpg' },
    title: 'Взгляд в камеру',
    bonus: [
      { q: 'Кто?', a: 'Джим Халперт' },
      { q: 'Когда он так смотрит?', a: 'Когда Майкл или Дуайт сказали очередную глупость' },
    ],
    fact: 'Самый тиражируемый мем сериала — реакция без слов.',
  },
  {
    id: 'office-dwightimpression', show: 'office', media: { type: 'image', src: 'assets/img/office-dwightimpression.jpg' },
    title: 'Джим в образе Дуайта',
    bonus: [
      { q: 'Что он говорит?', a: '«Медведи. Свёкла. „Звёздный крейсер Галактика“»' },
      { q: 'Сколько стоил костюм?', a: '11 долларов' },
    ],
    fact: 'Дуайт в ответ: «Кража личности — это не шутки, Джим!»',
  },
  {
    id: 'office-firedrill', show: 'office', media: { type: 'image', src: 'assets/img/office-firedrill.jpg' },
    title: 'Пожарная тревога',
    bonus: [
      { q: 'Кто устроил?', a: 'Дуайт — для «реалистичности» учений' },
      { q: 'Чем кончилось?', a: 'У Стэнли случился сердечный приступ' },
    ],
    fact: 'На курсах первой помощи Дуайт срезал лицо с манекена и надел его — как Ганнибал Лектер.',
  },
  {
    id: 'office-prisonmike', show: 'office', media: { type: 'image', src: 'assets/img/office-prisonmike.jpg' },
    title: 'Тюремный Майк',
    bonus: [
      { q: 'Зачем он это устроил?', a: 'Доказать, что в офисе лучше, чем в тюрьме' },
      { q: 'Что самое страшное в тюрьме?', a: '«Дементоры»' },
    ],
    fact: 'Повод — новый сотрудник Мартин, который отсидел и сказал, что в тюрьме было неплохо.',
  },
  {
    id: 'office-chili', show: 'office', media: { type: 'image', src: 'assets/img/office-chili.jpg' },
    title: 'Знаменитое чили',
    bonus: [
      { q: 'Чьё?', a: 'Кевина' },
      { q: 'В чём секрет?', a: 'Поджарить лук и дать бобам настояться — «главное — не торопиться»' },
    ],
    fact: 'Сцена длится 30 секунд и считается одной из лучших холодных заставок сериала.',
  },
  {
    id: 'office-threatlevel', show: 'office', media: { type: 'image', src: 'assets/img/office-threatlevel.jpg' },
    title: 'Уровень угрозы: полночь',
    bonus: [
      { q: 'Кто это?', a: 'Агент Майкл Скарн — то есть Майкл Скотт' },
      { q: 'Что это?', a: 'Фильм Майкла, который он снимал 11 лет' },
    ],
    fact: 'Злодей — Голденфейс в исполнении Джима. Все сотрудники сыграли роли.',
  },
  {
    id: 'office-beets', show: 'office', media: { type: 'image', src: 'assets/img/office-beets.jpg' },
    title: 'Свёкла',
    bonus: [
      { q: 'Кто выращивает?', a: 'Дуайт Шрут' },
      { q: 'Как называется ферма?', a: 'Ферма Шрутов — ещё и гостиница' },
    ],
    fact: 'Джим и Пэм были первыми гостями фермы. Развлечения: изготовление свечей и уборка навоза.',
  },
  {
    id: 'office-bankruptcy', show: 'office', media: { type: 'image', src: 'assets/img/office-bankruptcy.jpg' },
    title: 'Я объявляю банкротство!',
    bonus: [
      { q: 'Кто кричит?', a: 'Майкл Скотт' },
      { q: 'В чём ошибка?', a: 'Он думал, что достаточно просто крикнуть это на весь офис' },
    ],
    fact: 'Оскар: «Нельзя просто сказать слово „банкротство“ и ждать, что что-то произойдёт».',
  },
  {
    id: 'office-wedding', show: 'office', media: { type: 'image', src: 'assets/img/office-wedding.jpg' },
    title: 'Свадьба Джима и Пэм',
    bonus: [
      { q: 'Где?', a: 'Ниагарский водопад' },
      { q: 'Что случилось перед свадьбой?', a: 'Они тайно расписались на кораблике, чтобы никто не испортил' },
    ],
    fact: 'Коллеги устроили танцевальный проход по проходу церкви — по мотивам вирусного ролика.',
  },
  {
    id: 'office-bobblehead', show: 'office', media: { type: 'image', src: 'assets/img/office-bobblehead.jpg' },
    title: 'Кукла-болванчик',
    bonus: [
      { q: 'Чья?', a: 'Дуайта' },
      { q: 'Кто подарил?', a: 'Анджела — на Валентинов день' },
    ],
    fact: 'Болванчик стоит на столе Дуайта до конца сериала.',
  },
  {
    id: 'office-dinnerparty', show: 'office', media: { type: 'image', src: 'assets/img/office-dinnerparty.jpg' },
    title: 'Крошечный телевизор',
    bonus: [
      { q: 'Чей ужин?', a: 'Майкла и Джен' },
      { q: 'Чем кончилось?', a: 'Джен швырнула «Дандер»-награду Майкла в телевизор. Приехала полиция' },
    ],
    fact: 'Серия «Званый ужин» — по опросам, лучшая серия сериала.',
  },
  {
    id: 'office-nogod', show: 'office', media: { type: 'audio', src: 'assets/snd/office-nogod.mp3' },
    title: 'Нет, боже, умоляю, нет!',
    bonus: [
      { q: 'Кто кричит?', a: 'Майкл Скотт' },
      { q: 'Из-за кого?', a: 'Вернулся Тоби' },
    ],
    fact: 'Майкл ненавидит Тоби больше всех на свете. Тоби — из отдела кадров.',
  },
  {
    id: 'office-parkour', show: 'office', media: { type: 'audio', src: 'assets/snd/office-parkour.mp3' },
    title: 'Паркур!',
    bonus: [
      { q: 'Кто?', a: 'Майкл, Дуайт и Энди' },
      { q: 'Чем кончилось?', a: 'Энди прыгнул в пустую коробку от холодильника' },
    ],
    fact: 'Холодная заставка 6 сезона. «Паркур — интернет-сенсация 5-летней давности».',
  },
  {
    id: 'office-shesaid', show: 'office', media: { type: 'audio', src: 'assets/snd/office-shesaid.mp3' },
    title: 'Сказала она!',
    bonus: [
      { q: 'Чья фирменная шутка?', a: 'Майкла Скотта' },
      { q: 'Когда он её вставляет?', a: 'После любой двусмысленной фразы — даже в кабинете кадровика' },
    ],
    fact: 'Из-за этой шутки Майкл однажды угодил на разбор к отделу кадров — и пошутил ещё раз прямо там.',
  },
  {
    id: 'office-theme', show: 'office', media: { type: 'audio', src: 'assets/snd/office-theme.mp3' },
    title: 'Заставка',
    bonus: [{ q: 'Что показывают в заставке?', a: 'Скрэнтон, здание офиса и всех сотрудников за работой' }],
    fact: 'Кадры Скрэнтона для заставки снял Джон Красински (Джим) — сам, на любительскую камеру.',
  },
  {
    id: 'office-kevin', show: 'office', media: { type: 'text', text: '«Зачем тратить время говорить много слов, когда мало слов сделать дело?»' },
    title: 'Мало слов',
    bonus: [{ q: 'Кто?', a: 'Кевин' }],
    fact: 'Кевин решил экономить время и говорить меньше слов — получилось не очень.',
  },
];

if (typeof module !== 'undefined' && module.exports) module.exports = QUESTIONS;
