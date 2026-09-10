const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Logic = require('./logic.js');
const QUESTIONS = require('./questions.js');

test('no scoring, count picking or shuffling left in Logic', () => {
  assert.deepEqual(Object.keys(Logic), ['SHOWS']);
});

test('shows: five shows incl. Office, all labels in Russian', () => {
  assert.deepEqual(Object.keys(Logic.SHOWS).sort(), ['friends', 'himym', 'office', 'tbbt', 'twilight']);
  for (const s of Object.values(Logic.SHOWS)) assert.doesNotMatch(s.label, /[A-Za-z]/);
});

test('questions: each has a real question + answer, media files exist, text is rare', () => {
  assert.equal(QUESTIONS.length, 27);
  const ids = new Set();
  let text = 0;
  for (const q of QUESTIONS) {
    assert.ok(Logic.SHOWS[q.show], `unknown show ${q.show} in ${q.id}`);
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
    ids.add(q.id);
    assert.equal(q.title, undefined, `legacy title in ${q.id}`);
    assert.ok(q.question.trim().length > 0, `empty question in ${q.id}`);
    assert.doesNotMatch(q.question, /что за сериал|откуда/i, `"what show" question in ${q.id}`);
    assert.ok(q.answer.trim().length > 0, `empty answer ${q.id}`);
    assert.ok(Array.isArray(q.bonus), `bonus missing ${q.id}`);
    for (const b of q.bonus) assert.ok(b.q && b.a, `bad bonus in ${q.id}`);
    switch (q.media.type) {
      case 'image':
      case 'audio':
        assert.ok(fs.existsSync(path.join(__dirname, q.media.src)), `missing file ${q.media.src}`);
        break;
      case 'text':
        assert.ok(q.media.text.trim().length > 0);
        text += 1;
        break;
      default:
        assert.fail(`unknown media type ${q.media.type} in ${q.id}`);
    }
  }
  assert.ok(text / QUESTIONS.length < 0.15, 'too many text-only questions');
  for (const show of Object.keys(Logic.SHOWS)) {
    assert.ok(QUESTIONS.some((q) => q.show === show), `no questions for ${show}`);
  }
});

test('questions: curated order — хао-хао stays, no two neighbours from the same show, ends on «леген…дарно»', () => {
  assert.ok(QUESTIONS.some((q) => q.id === 'twilight-eyesonfire'), 'хао-хао must stay');
  for (let i = 1; i < QUESTIONS.length; i++) {
    assert.notEqual(QUESTIONS[i].show, QUESTIONS[i - 1].show, `same show twice in a row at #${i + 1}: ${QUESTIONS[i].id}`);
  }
  assert.equal(QUESTIONS.at(-1).id, 'himym-legendary');
  for (const id of ['himym-metted', 'himym-mall', 'himym-suitup']) {
    assert.ok(!QUESTIONS.some((q) => q.id === id), `${id} should be removed`);
  }
});

test('questions: quote-style answers exist and are in «»; loud fact only on spider monkey', () => {
  const quoted = QUESTIONS.filter((q) => /^«.+»$/.test(q.answer));
  assert.ok(quoted.length >= 8, `only ${quoted.length} quote answers`);
  assert.deepEqual(QUESTIONS.filter((q) => q.loud).map((q) => q.id), ['twilight-spidermonkey']);
  assert.equal(QUESTIONS.find((q) => q.id === 'tbbt-gravity').media.type, 'audio');
});

test('questions: user-facing text is Russian (Latin only in known proper nouns)', () => {
  const allowed = /Blue Foundation|Eyes on Fire|Muse|Paramore|Iron & Wine|Кураж-Бамбей/g;
  const textOf = (q) => [q.question, q.answer, q.fact || '', q.media.text || '', ...q.bonus.flatMap((b) => [b.q, b.a])].join(' ');
  for (const q of QUESTIONS) {
    const rest = textOf(q).replace(allowed, '');
    assert.doesNotMatch(rest, /[A-Za-z]/, `English left in ${q.id}: ${rest.match(/[A-Za-z][^\s,.!?»)]*/g)}`);
  }
});
