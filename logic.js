// Pure game logic. Shared by the browser (window.Logic) and node tests.
(function (root) {
  const SHOWS = {
    himym: { label: 'Как я встретил вашу маму', emoji: '☂️' },
    tbbt: { label: 'Теория большого взрыва', emoji: '⚛️' },
    friends: { label: 'Друзья', emoji: '☕' },
    twilight: { label: 'Сумерки', emoji: '🧛' },
    office: { label: 'Офис', emoji: '📎' },
  };

  function shuffle(arr, rand = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Берём count вопросов, по кругу из каждого сериала, чтобы набор был сбалансирован.
  function pickQuestions(all, count, rand = Math.random) {
    const groups = {};
    for (const q of all) (groups[q.show] ||= []).push(q);
    const queues = Object.values(groups).map((g) => shuffle(g, rand));
    const picked = [];
    while (picked.length < Math.min(count, all.length)) {
      for (const queue of queues) {
        if (queue.length && picked.length < count) picked.push(queue.shift());
      }
    }
    return shuffle(picked, rand);
  }

  const Logic = { SHOWS, shuffle, pickQuestions };

  if (typeof module !== 'undefined' && module.exports) module.exports = Logic;
  else root.Logic = Logic;
})(globalThis);
