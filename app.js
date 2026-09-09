/* global QUESTIONS, Logic */
(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    screens: { start: $('screen-start'), game: $('screen-game'), end: $('screen-end') },
    countPicker: $('count-picker'),
    btnStart: $('btn-start'),
    progressText: $('progress-text'),
    progressBar: $('progress-bar'),
    card: $('card'),
    cardLabel: $('card-label'),
    media: $('media'),
    btnReveal: $('btn-reveal'),
    reveal: $('reveal'),
    showBadge: $('show-badge'),
    answerTitle: $('answer-title'),
    bonusHint: $('bonus-hint'),
    bonus: $('bonus'),
    fact: $('fact'),
    btnNext: $('btn-next'),
    endSub: $('end-sub'),
    btnRestart: $('btn-restart'),
    audio: $('audio-el'),
    confetti: $('confetti'),
  };

  const state = { questions: [], index: 0, count: 30, revealed: false };

  // ---------- tiny synth for UI feedback (no files needed) ----------
  const Sfx = (() => {
    let ctx;
    const ac = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());
    const tone = (freq, { at = 0, dur = 0.15, type = 'sine', gain = 0.18, slide } = {}) => {
      try {
        const c = ac();
        const o = c.createOscillator();
        const g = c.createGain();
        const t = c.currentTime + at;
        o.type = type;
        o.frequency.setValueAtTime(freq, t);
        if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(c.destination);
        o.start(t);
        o.stop(t + dur + 0.05);
      } catch (_) { /* no audio — fine */ }
    };
    return {
      reveal: () => tone(300, { dur: 0.35, type: 'triangle', slide: 900 }),
      pop: () => { tone(880, { dur: 0.12 }); tone(1320, { at: 0.1, dur: 0.2 }); },
      fanfare: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, { at: i * 0.12, dur: 0.3 })),
    };
  })();

  // ---------- helpers ----------
  const show = (name) => {
    Object.values(el.screens).forEach((s) => s.classList.remove('active'));
    el.screens[name].classList.add('active');
    window.scrollTo({ top: 0 });
  };
  const currentQuestion = () => state.questions[state.index];

  const burstConfetti = () => {
    const colors = ['#ffcc33', '#2dd4bf', '#a855f7', '#ff6aa2', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      const piece = document.createElement('i');
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = `${1.4 + Math.random() * 1.2}s`;
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.confetti.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    }
  };

  const stopAudio = () => {
    el.audio.pause();
    el.audio.removeAttribute('src');
    el.audio.load();
  };

  // ---------- start screen ----------
  el.countPicker.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-count]');
    if (!btn) return;
    el.countPicker.querySelectorAll('button').forEach((b) => { b.classList.remove('on'); b.setAttribute('aria-checked', 'false'); });
    btn.classList.add('on');
    btn.setAttribute('aria-checked', 'true');
    state.count = btn.dataset.count === 'all' ? Infinity : Number(btn.dataset.count);
  });

  // ---------- game ----------
  const startGame = () => {
    state.questions = Logic.pickQuestions(QUESTIONS, state.count);
    state.index = 0;
    show('game');
    renderQuestion();
  };

  const renderMedia = (q) => {
    el.media.innerHTML = '';
    stopAudio();
    switch (q.media.type) {
      case 'image': {
        const img = document.createElement('img');
        img.src = q.media.src;
        img.alt = 'Кадр из сериала — угадай какого';
        el.media.appendChild(img);
        el.cardLabel.textContent = 'Что за сериал?';
        break;
      }
      case 'audio': {
        const wrap = document.createElement('div');
        wrap.className = 'audio';
        wrap.innerHTML = `
          <div class="eq" aria-hidden="true">${'<i></i>'.repeat(9)}</div>
          <button type="button" class="play" aria-label="Слушать">▶</button>
          <p class="audio-hint">Тапни, чтобы послушать ещё раз</p>`;
        const play = wrap.querySelector('.play');
        el.audio.src = q.media.src;
        const sync = () => {
          wrap.classList.toggle('playing', !el.audio.paused && !el.audio.ended);
          play.textContent = !el.audio.paused && !el.audio.ended ? '❚❚' : '▶';
        };
        el.audio.onplay = el.audio.onpause = el.audio.onended = sync; // assign, not addEventListener: one live listener set per question
        play.addEventListener('click', () => {
          if (el.audio.paused || el.audio.ended) { el.audio.currentTime = 0; el.audio.play().catch(() => {}); }
          else el.audio.pause();
        });
        el.media.appendChild(wrap);
        el.cardLabel.textContent = 'Откуда этот звук?';
        el.audio.play().catch(() => {}); // autoplay may be blocked before the first tap — then the big ▶ works
        break;
      }
      case 'text': {
        const p = document.createElement('p');
        p.className = 'quote';
        p.textContent = q.media.text;
        el.media.appendChild(p);
        el.cardLabel.textContent = 'Откуда цитата?';
        break;
      }
      default: {
        const _exhaustive = q.media.type;
        throw new Error(`Unknown media type: ${_exhaustive}`);
      }
    }
    // Preload the next image so the card appears instantly.
    const next = state.questions[state.index + 1];
    if (next && next.media.type === 'image') new Image().src = next.media.src;
  };

  const renderQuestion = () => {
    const q = currentQuestion();
    const total = state.questions.length;
    state.revealed = false;

    el.progressText.textContent = `${state.index + 1} / ${total}`;
    el.progressBar.style.width = `${(state.index / total) * 100}%`;

    el.card.style.animation = 'none';
    void el.card.offsetWidth;
    el.card.style.animation = '';
    renderMedia(q);

    el.reveal.classList.add('hidden');
    el.btnReveal.classList.remove('hidden');
  };

  // Доп-вопросы: ведущая читает вопрос, тап открывает ответ.
  const renderBonus = (q) => {
    el.bonus.innerHTML = '';
    el.bonusHint.classList.toggle('hidden', q.bonus.length === 0);
    q.bonus.forEach((item) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'bonus-item';
      b.innerHTML = '<span class="q"></span><span class="a"></span>';
      b.querySelector('.q').textContent = item.q;
      b.querySelector('.a').textContent = item.a;
      b.addEventListener('click', () => {
        if (b.classList.contains('open')) return;
        b.classList.add('open');
        Sfx.pop();
      });
      el.bonus.appendChild(b);
    });
  };

  const reveal = () => {
    const q = currentQuestion();
    state.revealed = true;
    Sfx.reveal();
    burstConfetti();
    el.showBadge.textContent = `${Logic.SHOWS[q.show].emoji} ${Logic.SHOWS[q.show].label}`;
    el.showBadge.className = `show-badge show-${q.show}`;
    el.answerTitle.textContent = q.title;
    el.fact.textContent = q.fact;
    el.fact.classList.toggle('hidden', !q.fact);
    renderBonus(q);
    el.btnReveal.classList.add('hidden');
    el.reveal.classList.remove('hidden');
    el.btnNext.textContent = state.index + 1 < state.questions.length ? 'Дальше →' : 'Финал 🏁';
    el.reveal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const next = () => {
    state.index += 1;
    if (state.index >= state.questions.length) return finish();
    renderQuestion();
  };

  // ---------- end ----------
  const finish = () => {
    stopAudio();
    el.endSub.textContent = `${state.questions.length} вопросов позади. Королева ситкомов — в этой комнате 👑`;
    show('end');
    Sfx.fanfare();
    burstConfetti();
  };

  // ---------- wiring ----------
  el.btnStart.addEventListener('click', startGame);
  el.btnReveal.addEventListener('click', reveal);
  el.btnNext.addEventListener('click', next);
  el.btnRestart.addEventListener('click', () => show('start'));

  document.addEventListener('keydown', (e) => {
    if (!el.screens.game.classList.contains('active')) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target.closest('button')) return; // let focused buttons behave normally
    e.preventDefault();
    if (state.revealed) next(); else reveal();
  });
})();
