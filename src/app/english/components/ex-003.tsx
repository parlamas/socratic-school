'use client';

// src/app/english/components/ex-003.tsx

import { useState, useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Blank = {
  correct: string[];
};

type ExerciseItem = {
  parts: string[];
  blanks: Blank[];
  note?: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
const split = (s: string) => s.split('___');
const ex = (template: string, blanks: Blank[], note?: string): ExerciseItem => ({
  parts: split(template),
  blanks,
  note,
});

const the = { correct: ['the'] };
const nil = { correct: [''] };

// ─── Data ────────────────────────────────────────────────────────────────────

const exercises: ExerciseItem[] = [
  ex(
    '___ youngest boy has just started going to ___ school; ___ eldest boy is at ___ college.',
    [the, nil, the, nil],
    '"Go to school/college" = no article (purpose). "The youngest/eldest" = superlative takes the.',
  ),
  ex(
    'She lives on ___ top floor of an old house. When ___ wind blows, all ___ windows rattle.',
    [the, the, the],
    '"The top floor" = specific. "The wind", "the windows" = specific to this house.',
  ),
  ex(
    '___ darkness doesn\'t worry ___ cats; ___ cats can see in ___ dark.',
    [nil, nil, nil, the],
    '"Darkness" and "cats" used generically — no article. "In the dark" = fixed expression.',
  ),
  ex(
    'My little boys say that they want to be ___ spacemen, but most of them will probably end up in ___ less dramatic jobs.',
    [nil, nil],
    'Both are plural indefinite — no article.',
  ),
  ex(
    'Do you know ___ time? ~ Yes, ___ clock in ___ hall has just struck nine. ~ Then it isn\'t ___ time to go yet.',
    [the, the, the, nil],
    '"Do you know the time?" = specific. "Time to go" = abstract, no article.',
  ),
  ex(
    'He was sent to ___ prison for ___ six months for ___ shop-lifting. When ___ six months are over he\'ll be released; ___ difficulty then will be to find ___ work. ~ Do you go to ___ prison to visit him?',
    [nil, nil, nil, the, the, nil, the],
    '"In prison" = as an institution, no article. "The six months" = the specific period mentioned. "The difficulty" = specific difficulty. "Find work" = abstract.',
  ),
  ex(
    'I went to ___ school to talk to ___ headmistress. I persuaded her to let Ann give up ___ gymnastics and take ___ ballet lessons instead.',
    [the, the, nil, nil],
    '"The school" = a specific school. "The headmistress" = specific person. "Gymnastics/ballet lessons" = activities, no article.',
  ),
  ex(
    '___ ballet isn\'t much use for ___ girls; it is much better to be able to play ___ piano.',
    [nil, nil, the],
    '"Ballet" and "girls" = generic, no article. "Play the piano" = fixed expression.',
  ),
  ex(
    'I am on ___ night duty. When you go to ___ bed, I go to ___ work.',
    [nil, nil, nil],
    '"On night duty", "go to bed", "go to work" = all fixed expressions with no article.',
  ),
  ex(
    'Peter\'s at ___ office but you could get him on ___ phone. There\'s a telephone box just round ___ corner.',
    [the, the, the],
    '"The office" = his specific office. "On the phone" = fixed expression. "Round the corner" = fixed expression.',
  ),
  ex(
    'He got ___ bronchitis and was taken to ___ hospital. I expect they\'ll send him home at ___ end of ___ week. ~ Have you rung ___ hospital to ask how he is?',
    [nil, nil, the, the, the],
    '"Bronchitis" = illness, no article. "In hospital" = as institution. "The end of the week" = specific. "The hospital" = the specific one mentioned.',
  ),
  ex(
    'Ann\'s habit of riding a motorcycle up and down ___ road early in ___ morning annoyed ___ neighbours and in ___ end they took her to ___ court.',
    [the, the, the, the, nil],
    '"The road/morning/neighbours/end" = all specific. "Took to court" = institution, no article.',
  ),
  ex(
    'He first went to ___ sea in a Swedish ship, so as well as learning ___ navigation he had to learn ___ Swedish.',
    [nil, nil, nil],
    '"Go to sea" = as a profession, no article. "Navigation" and "Swedish" = subjects/languages, no article.',
  ),
  ex(
    '___ family hotels are ___ hotels which welcome ___ parents and ___ children.',
    [nil, nil, nil, nil],
    'All generic plurals — no article.',
  ),
  ex(
    'On ___ Sundays my father stays in ___ bed till ten o\'clock, reading ___ Sunday papers.',
    [nil, nil, the],
    '"On Sundays" = habitual, no article. "In bed" = fixed expression. "The Sunday papers" = specific papers.',
  ),
  ex(
    'Then he gets up, puts on ___ old clothes, has ___ breakfast and starts ___ work in ___ garden.',
    [nil, nil, nil, the],
    '"Old clothes/breakfast/work" = no article (generic/routine). "The garden" = his specific garden.',
  ),
  ex(
    'My mother goes to ___ church in ___ morning, and in ___ afternoon goes to visit ___ friends.',
    [nil, the, the, nil],
    '"Go to church" = as institution. "The morning/afternoon" = specific parts of the day. "Friends" = indefinite plural.',
  ),
  ex(
    'Like many women, she loves ___ tea parties and ___ gossip.',
    [nil, nil],
    'Both generic — no article.',
  ),
  ex(
    'My parents have ___ cold meat and ___ salad for ___ supper, ___ winter and ___ summer.',
    [nil, nil, nil, nil, nil],
    'All generic/routine — no article.',
  ),
  ex(
    'During ___ meal he talks about ___ garden and she tells him ___ village gossip.',
    [the, the, nil],
    '"The meal" = the specific meal they are having. "The garden" = their garden. "Village gossip" = generic.',
  ),
  ex(
    'We have a very good train service from here to ___ city centre and most people go to ___ work by train. You can go by ___ bus too, of course, but you can\'t get a season ticket on ___ bus.',
    [the, nil, nil, the],
    '"The city centre" = specific. "Go to work" = fixed expression. "By bus" = mode of transport. "On the bus" = the specific bus service.',
  ),
  ex(
    '___ dead no longer need ___ help. We must concern ourselves with ___ living. We must build ___ houses and ___ schools and ___ playgrounds.',
    [the, nil, the, nil, nil, nil],
    '"The dead/the living" = collective nouns with the. "Help/houses/schools/playgrounds" = generic.',
  ),
  ex(
    'I\'d like to see ___ Mr Smith please. ~ Do you mean ___ Mr Smith who works in ___ box office or ___ other Mr Smith?',
    [nil, the, the, the],
    '"Mr Smith" alone = no article. "The Mr Smith" = identifies which one. "The box office/the other" = specific.',
  ),
  ex(
    'Did you come by ___ air? ~ No, I came by ___ sea. I had a lovely voyage on ___ Queen Elizabeth II.',
    [nil, nil, the],
    '"By air/sea" = mode of transport, no article. "The Queen Elizabeth II" = named vessel takes the.',
  ),
  ex(
    '___ most of ___ stories that ___ people tell about ___ Irish aren\'t true.',
    [nil, the, nil, the],
    '"Most of the stories" = specific stories referred to. "People" = generic. "The Irish" = nationality group takes the.',
  ),
  ex(
    '___ married couples with ___ children often rent ___ cottages by ___ seaside for ___ summer holidays. ___ men hire boats and go for ___ trips along ___ coast; ___ children spend ___ day on ___ beach and ___ poor mothers spend ___ most of ___ time doing ___ cooking and cleaning.',
    [nil, nil, nil, the, nil, the, nil, the, the, the, the, the, the, nil, nil],
    '"The seaside/coast/beach" = specific geographical features. "The men/children/poor mothers" = the specific people in the group. "The day/most of the time" = specific. "Cooking and cleaning" = activities, no article.',
  ),
  ex(
    'It\'s usually safe to walk on ___ sand, but here, when ___ tide is coming in, ___ sand becomes dangerously soft. ___ people have been swallowed up by it.',
    [the, the, the, nil],
    '"The sand/tide" = specific to this location. "People" = indefinite, no article.',
  ),
  ex(
    'When ___ Titanic was crossing ___ Atlantic she struck an iceberg which tore a huge hole in her bow. ___ captain ordered ___ crew to help ___ passengers into ___ boats.',
    [the, the, the, the, the, the],
    'All take the: named ship, named ocean, specific captain/crew/passengers/boats.',
  ),
  ex(
    'Everywhere ___ man has cut down ___ forests in order to cultivate ___ ground, or to use ___ wood as ___ fuel or as ___ building material.',
    [nil, nil, the, the, nil, nil],
    '"Man" = generic mankind. "Forests" = generic plural. "The ground/wood" = specific resources being discussed. "Fuel/building material" = abstract.',
  ),
  ex(
    'But ___ interference with ___ nature often brings ___ disaster. ___ tree-felling sometimes turns ___ fertile land into a dustbowl.',
    [nil, nil, nil, nil, nil],
    'All abstract/generic — no article.',
  ),
  ex(
    '___ people think that ___ lead is ___ heaviest metal, but ___ gold is heavier.',
    [nil, nil, the, nil],
    '"People/lead/gold" = generic. "The heaviest" = superlative takes the.',
  ),
  ex(
    'Our air hostess said, \'___ rack is only for ___ light articles. ___ heavy things such as ___ bottles must be put on ___ floor.\'',
    [the, nil, nil, nil, the],
    '"The rack/floor" = specific. "Light articles/heavy things/bottles" = generic.',
  ),
  ex(
    '___ windows are supposed to let in ___ light; but ___ windows of this house are so small that we have to have ___ electric light on all ___ time.',
    [nil, nil, the, nil, the],
    '"Windows" first = generic. "The windows of this house" = specific. "Light/electric light" = abstract. "All the time" = fixed expression.',
  ),
  ex(
    'There\'ll always be a conflict between ___ old and ___ young. ___ young people want ___ change but ___ old people want ___ things to stay ___ same.',
    [the, the, nil, nil, nil, nil, the],
    '"The old/the young" = collective groups. "Young/old people" = generic. "The same" = fixed expression.',
  ),
  ex(
    '___ power tends to corrupt and ___ absolute power corrupts absolutely.',
    [nil, nil],
    'Both abstract/generic — no article.',
  ),
  ex(
    'You can fool some of ___ people all ___ time, and all ___ people some of ___ time; but you cannot fool all ___ people all ___ time.',
    [the, the, the, the, the, the],
    'All take the — referring to specific groups of people in each clause.',
  ),
];

// ─── Component ───────────────────────────────────────────────────────────────

const Exercise003 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const ex = exercises[currentIndex];

  useEffect(() => {
    setAnswers(new Array(ex.blanks.length).fill(''));
    setShowResult(null);
    setShowExplanation(false);
    inputRefs.current = [];
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  }, [currentIndex]);

  const handleChange = (i: number, val: string) => {
    const next = [...answers];
    next[i] = val;
    setAnswers(next);
    setShowResult(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter') {
      if (i < ex.blanks.length - 1) {
        inputRefs.current[i + 1]?.focus();
      } else {
        checkAnswer();
      }
    }
  };

  const answerKey = (blank: Blank) =>
    blank.correct.map((c) => (c === '' ? '∅' : c)).join(' / ');

  const checkAnswer = () => {
    if (answers.some((a) => a === undefined)) return;
    const ok = ex.blanks.every((blank, i) =>
      blank.correct.includes(norm(answers[i] ?? ''))
    );
    setShowResult(ok);
    if (ok && !answered[currentIndex]) {
      const next = [...answered];
      next[currentIndex] = true;
      setAnswered(next);
      setScore((s) => s + 1);
    }
  };

  const reset = () => {
    setAnswers(new Array(ex.blanks.length).fill(''));
    setShowResult(null);
    setShowExplanation(false);
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const goTo = (i: number) => {
    if (i < 0 || i >= exercises.length) return;
    setCurrentIndex(i);
  };

  const renderSentence = () => {
    return ex.parts.map((part, i) => {
      const blank = ex.blanks[i];
      const isWrong = showResult === false && blank && !blank.correct.includes(norm(answers[i] ?? ''));

      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: part }} />
          {i < ex.blanks.length && (
            <>
                            <input
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                value={answers[i] ?? ''}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                placeholder=". . . . . . . . . ."
                data-state={showResult === null ? 'typing' : blank.correct.includes(norm(answers[i] ?? '')) ? 'correct' : 'incorrect'}
                className="exercise-blank-input"
                style={{
                  width: 90,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: 15,
                  padding: '1px 4px',
                  border: 'none',
                  borderRadius: 0,
                  background: 'transparent',
                  outline: 'none',
                  textAlign: 'center',
                  margin: '0 2px',
                }}
              />
              {isWrong && (
                <span style={{ fontSize: 12, color: '#A32D2D', fontStyle: 'italic', marginRight: 2 }}>
                  ({answerKey(blank)})
                </span>
              )}
            </>
          )}
        </span>
      );
    });
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '1.5rem 1rem 3rem', fontFamily: "'Source Serif 4', Georgia, serif", color: 'inherit' }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
          Fill in the Blank
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          Insert <em>the</em> where necessary — otherwise leave the blank empty (∅)
        </div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
          Type your answer in each blank. Press <kbd style={{ fontFamily: 'monospace', background: '#f0f0f0', padding: '1px 5px', borderRadius: 4, border: '0.5px solid #ccc' }}>Enter</kbd> to move to the next blank or check.
        </div>
      </div>

      {/* ── Progress row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', fontSize: 13, color: '#666' }}>
        <span>Sentence {currentIndex + 1} of {exercises.length}</span>
        <span style={{ background: '#f4f4f4', border: '0.5px solid #ddd', borderRadius: 20, padding: '2px 12px', fontWeight: 500, color: '#333', fontSize: 13 }}>
          Score: {score} / {exercises.length}
        </span>
      </div>

      {/* ── Progress dots ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginBottom: '1rem' }}>
        {exercises.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: 22, height: 22, borderRadius: '50%',
              background: i === currentIndex ? '#185FA5' : answered[i] ? '#3B6D11' : '#eee',
              border: i === currentIndex ? '1.5px solid #185FA5' : answered[i] ? '1.5px solid #3B6D11' : '0.5px solid #ccc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 500, cursor: 'pointer',
              color: i === currentIndex ? '#E6F1FB' : answered[i] ? '#EAF3DE' : '#888',
              fontFamily: 'sans-serif',
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* ── Blanks count hint ── */}
      <div style={{ textAlign: 'center', fontSize: 12, color: '#888', marginBottom: 8 }}>
        {ex.blanks.length === 1 ? '1 blank' : `${ex.blanks.length} blanks`}
      </div>

      {/* ── Sentence card ── */}
      <div style={{
        background: '#fff',
        border: '0.5px solid #bbb',
        borderRadius: 12,
        padding: '1.25rem 1.5rem',
        marginBottom: '1rem',
        fontSize: 15,
        lineHeight: 2.2,
        textAlign: 'left',
      }}>
        {renderSentence()}
      </div>

      {/* ── Action buttons ── */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={checkAnswer}
          disabled={answers.every((a) => a === '')}
          style={{
            background: answers.every((a) => a === '') ? '#ccc' : '#185FA5',
            border: 'none', borderRadius: 8, padding: '7px 20px',
            fontSize: 13, cursor: answers.every((a) => a === '') ? 'not-allowed' : 'pointer',
            color: '#fff', fontFamily: "'Source Serif 4', Georgia, serif",
          }}
        >
          Check
        </button>
        <button
          onClick={reset}
          style={{ background: '#fff', border: '0.5px solid #ccc', borderRadius: 8, padding: '7px 20px', fontSize: 13, cursor: 'pointer', color: '#333', fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          Reset
        </button>
        <button
          onClick={() => setShowExplanation((v) => !v)}
          style={{ background: '#fff', border: '0.5px solid #ccc', borderRadius: 8, padding: '7px 20px', fontSize: 13, cursor: 'pointer', color: '#333', fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          {showExplanation ? 'Hide' : 'Answers'}
        </button>
      </div>

      {/* ── Result banner ── */}
      {showResult !== null && (
        <div style={{
          borderRadius: 8, padding: '0.6rem 1rem', marginBottom: '0.75rem',
          textAlign: 'center', fontSize: 14, fontWeight: 500,
          background: showResult ? '#EAF3DE' : '#FCEBEB',
          color: showResult ? '#27500A' : '#791F1F',
          border: `0.5px solid ${showResult ? '#3B6D11' : '#A32D2D'}`,
        }}>
          {showResult ? 'Correct!' : 'Not quite — check the highlighted blanks.'}
        </div>
      )}

      {/* ── Answer key ── */}
      {showExplanation && (
        <div style={{ background: '#f7f7f7', borderRadius: 8, padding: '0.85rem 1.1rem', marginBottom: '1rem', fontSize: 13, lineHeight: 1.9 }}>
          <div style={{ fontWeight: 500, marginBottom: 6, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#888', fontFamily: 'sans-serif' }}>
            Answer key
          </div>
          {ex.blanks.map((blank, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <span style={{ fontSize: 11, color: '#aaa', minWidth: 20, fontFamily: 'sans-serif' }}>{i + 1}.</span>
              <span style={{ fontWeight: 500, color: '#185FA5', fontStyle: 'italic' }}>{answerKey(blank)}</span>
            </div>
          ))}
          {ex.note && (
            <div style={{ marginTop: 10, fontSize: 12, color: '#888', fontStyle: 'italic', borderTop: '0.5px solid #ddd', paddingTop: 8 }}>
              {ex.note}
            </div>
          )}
        </div>
      )}

      {/* ── Navigation ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: '1.5rem' }}>
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{ background: '#fff', border: '0.5px solid #ccc', borderRadius: 8, padding: '7px 18px', fontSize: 13, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', color: currentIndex === 0 ? '#bbb' : '#333', fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          ← Previous
        </button>
        <button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === exercises.length - 1}
          style={{ background: '#fff', border: '0.5px solid #ccc', borderRadius: 8, padding: '7px 18px', fontSize: 13, cursor: currentIndex === exercises.length - 1 ? 'not-allowed' : 'pointer', color: currentIndex === exercises.length - 1 ? '#bbb' : '#333', fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          Next →
        </button>
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '0.5px solid #eee', fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
        &copy; 2026 Isidoros Parlamas · mind@horistics.com · socratic-school.com
      </div>
    </div>
  );
};

export default Exercise003;