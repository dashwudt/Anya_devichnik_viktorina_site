const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Logic = require('./logic.js');
const QUESTIONS = require('./questions.js');

const seq = (vals) => { let i = 0; return () => vals[i++ % vals.length]; };

test('pickQuestions: respects count and balances shows round-robin', () => {
  const all = [];
  for (const show of ['a', 'b', 'c', 'd']) for (let i = 0; i < 5; i++) all.push({ show, i });
  const picked = Logic.pickQuestions(all, 8, seq([0.1]));
  assert.equal(picked.length, 8);
  const byShow = picked.reduce((m, q) => ((m[q.show] = (m[q.show] || 0) + 1), m), {});
  assert.deepEqual(byShow, { a: 2, b: 2, c: 2, d: 2 });
});

test('pickQuestions: count >= total returns everything, no duplicates', () => {
  const all = [{ show: 'a' }, { show: 'a' }, { show: 'b' }];
  const picked = Logic.pickQuestions(all, 99, Math.random);
  assert.equal(picked.length, 3);
  assert.equal(new Set(picked).size, 3);
});

test('no scoring left in Logic', () => {
  assert.equal(Logic.toggleAward, undefined);
  assert.equal(Logic.tally, undefined);
  assert.equal(Logic.SHOW_POINTS, undefined);
});

test('shows: five shows incl. Office, all labels in Russian', () => {
  assert.deepEqual(Object.keys(Logic.SHOWS).sort(), ['friends', 'himym', 'office', 'tbbt', 'twilight']);
  for (const s of Object.values(Logic.SHOWS)) assert.doesNotMatch(s.label, /[A-Za-z]/);
});

test('questions: valid shows, unique ids, media files exist, text is rare, no points', () => {
  const ids = new Set();
  let text = 0;
  for (const q of QUESTIONS) {
    assert.ok(Logic.SHOWS[q.show], `unknown show ${q.show} in ${q.id}`);
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
    ids.add(q.id);
    assert.ok(q.title.trim().length > 0, `empty title ${q.id}`);
    assert.ok(Array.isArray(q.bonus), `bonus missing ${q.id}`);
    for (const b of q.bonus) {
      assert.ok(b.q && b.a, `bad bonus in ${q.id}`);
      assert.equal(b.pts, undefined, `points left in ${q.id}`);
    }
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
  assert.ok(QUESTIONS.length >= 60);
  assert.ok(text / QUESTIONS.length < 0.15, 'too many text-only questions');
  for (const show of Object.keys(Logic.SHOWS)) {
    assert.ok(QUESTIONS.filter((q) => q.show === show).length >= 10, `too few questions for ${show}`);
  }
});

test('questions: user-facing text is Russian (Latin only in known proper nouns)', () => {
  const allowed = /The Solids|Barenaked Ladies|The Rembrandts|Blue Foundation|Muse|Paramore|Iron & Wine|Кураж-Бамбей/g;
  const textOf = (q) => [q.title, q.fact || '', q.media.text || '', ...q.bonus.flatMap((b) => [b.q, b.a])].join(' ');
  for (const q of QUESTIONS) {
    const rest = textOf(q).replace(allowed, '');
    assert.doesNotMatch(rest, /[A-Za-z]/, `English left in ${q.id}: ${rest.match(/[A-Za-z][^\s,.!?»)]*/g)}`);
  }
});
