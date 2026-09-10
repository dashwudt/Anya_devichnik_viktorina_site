// Shared constants. Used by the browser (window.Logic) and node tests.
(function (root) {
  const SHOWS = {
    himym: { label: 'Как я встретил вашу маму', emoji: '☂️' },
    tbbt: { label: 'Теория большого взрыва', emoji: '⚛️' },
    friends: { label: 'Друзья', emoji: '☕' },
    twilight: { label: 'Сумерки', emoji: '🧛' },
    office: { label: 'Офис', emoji: '📎' },
  };

  const Logic = { SHOWS };

  if (typeof module !== 'undefined' && module.exports) module.exports = Logic;
  else root.Logic = Logic;
})(globalThis);
