'use client';

// src/app/english/components/ex-001.tsx

import { useState, useEffect, useRef, memo } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Blank = {
  correct: string[]; // all accepted answers; '' = nothing/zero article
};

type ExerciseItem = {
  parts: string[];   // text split on each blank; length = blanks.length + 1
  blanks: Blank[];
  note?: string;     // optional footnote shown with explanation
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Normalise input: trim, lowercase, collapse spaces
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

// Split a template string on ___ into parts
const split = (s: string) => s.split('___');

// Build an ExerciseItem from a template string and a blanks array
const ex = (template: string, blanks: Blank[], note?: string): ExerciseItem => ({
  parts: split(template),
  blanks,
  note,
});

// Blank helpers
const a       = { correct: ['a'] };
const an      = { correct: ['an'] };
const some    = { correct: ['some'] };
const any     = { correct: ['any'] };
const no      = { correct: ['no'] };                   // "no" as article (e.g. "no idea")
const the     = { correct: ['the'] };
const nil     = { correct: [''] };                     // zero article ∅
const aAn     = { correct: ['a', 'an'] };
const someAny = { correct: ['some', 'any'] };          // some or any
const someNil = { correct: ['some', ''] };             // some or ∅
const anyNil  = { correct: ['any', ''] };              // any or ∅
const aNil    = { correct: ['a', ''] };                // a or ∅
const theNil  = { correct: ['the', ''] };              // the or ∅

// ─── Data ────────────────────────────────────────────────────────────────────

const exercises: ExerciseItem[] = [
  ex(
    'My neighbour is ___ photographer; let\'s ask him for ___ advice about light.',
    [a, someNil],
  ),
  ex(
    '&mdash; We had ___ fish and ___ chips for ___ lunch.<br>&mdash; That doesn\'t sound like ___ very interesting lunch.',
    [someNil, nil, nil, a],
  ),
  ex(
    'They had ___ troubled night; They didn\'t sleep ___ wink.',
    [a, a],
  ),
  ex(
    '&mdash; She is ___ vegetarian; you won\'t get ___ meat at her house. She\'ll give you ___ zucchini burger.<br>&mdash; Last time I had ___ zucchini burger, it had ___ most amazing taste.',
    [a, anyNil, a, a, the],
  ),
  ex(
    '___ travel agent would give you ___ information about ___ hotels.',
    [a, some, nil],
    'Hotels is plural countable — no article needed for a general statement.',
  ),
  ex(
    'We\'d better go by ___ taxi &mdash; if we can get ___ taxi at such ___ hour as 2 a.m.',
    [nil, a, an],
    '"By taxi" = no article (mode of transport). "Such an hour" is a fixed expression.',
  ),
  ex(
    '___ person who suffers from ___ claustrophobia has ___ dread of being confined in ___ small space, and would always prefer ___ stairs to ___ lift.',
    [a, nil, a, a, nil, a],
    '"Stairs" is plural here used generally &mdash; no article.',
  ),
  ex(
    '&mdash; Do you take ___ sugar in ___ coffee?<br>&mdash; I used to, but now I\'m on ___ diet. I\'m trying to lose ___ weight.',
    [nil, nil, a, someNil],
  ),
  ex(
    '___ man suffering from ___ shock should not be given anything to drink.',
    [a, nil],
  ),
  ex(
    'You\'ll get ___ shock if you touch ___ live wire with that screwdriver. Why don\'t you get ___ screwdriver with ___ insulated handle?',
    [a, a, a, an],
  ),
  ex(
    '&mdash; It costs fifty five and ___ half euros and I\'ve only got ___ fifty-euro bill.<br>&mdash; You can pay by ___ card here.<br>&mdash; But can I get ___ change in cash if I pay sixty euros?',
    [a, a, nil, a, some],
    '"By card" = no article (method of payment).',
  ),
  ex(
    '&mdash; ___ Mr Smith is ___ old customer and ___ honest man.<br>&mdash; Why do you say that? Has he been accused of ___ dishonesty?',
    [nil, an, an, nil],
    '"Mr Smith" with no article = we know who he is. "Dishonesty" is abstract — no article.',
  ),
  ex(
    '&mdash; I\'m not ___ wage-earner; I\'m ___ self-employed man. I have ___ business of my own.<br>&mdash;Then you\'re not ___ worker; you\'re ___ businessman!',
    [a, a, a, a, a],
  ),
  ex(
    'When he was charged with ___ murder he said he had ___ alibi.',
    [nil, an],
    '"Murder" here is used in the abstract sense — no article.',
  ),
  ex(
    '&mdash; ___ friend of mine is expecting ___ baby. If it\'s ___ girl she\'s going to be called Diotima.<br>&mdash; What ___ beautiful name to give ___ girl!',
    [a, a, a, a, a],
  ),
  ex(
    '&mdash; I have ___ hour and ___ half for lunch.<br>&mdash;I only have ___ half ___ hour &mdash; barely ___ time for ___ smoke and ___ cup of coffee.',
    [an, a, nil, an, a, a],
    '"An hour" — silent h. "Barely time" = no article (abstract sense).',
  ),
  ex(
    '&mdash; I hope you have ___ lovely time and ___ good weather.<br>&mdash; But I\'m not going for ___ holiday; I\'m going on ___ business.',
    [a, nil, a, nil],
    '"On business" = no article (purpose/function expression).',
  ),
  ex(
    'He looked at me with ___ horror when I explained that I was ___ double agent.',
    [nil, a],
    '"With horror" = abstract, no article.',
  ),
  ex(
    'I wouldn\'t climb ___ mountain for $1,000! I have ___ horror of ___ heights.',
    [a, a, nil],
    '"Heights" = plural abstract — no article.',
  ),
  ex(
    '&mdash; I have ___ headache and ___ sore throat. I think I\'ve got ___ cold.<br>&mdash; I think you\'re getting ___ flu.',
    [a, a, a, the],
    '"Flu" is used without article in British English.',
  ),
  ex(
    '___ Mr Jones called while you were out. He wants to make ___ complaint about ___ article in the paper. He was in ___ very bad temper.',
    [a, a, an, a],
    '"A Mr Jones" &mdash; he is not known to the speaker.',
  ),
  ex(
    'If you go by ___ train you can have quite ___ comfortable journey, but make sure you get ___ express, not ___ train that stops at all the stations.',
    [nil, a, the, the],
    '"By train" = no article (mode of transport).',
  ),
  ex(
    '___ few people know that there is ___ secret passage from this house to ___ old smugglers\' cave in the cliffs.',
    [a, a, an],
    '"A few" = a small number (positive sense). "An old" — vowel sound.',
  ),
  ex(
    '&mdash; I\'m having ___ few friends in for ___ coffee tomorrow evening. Would you like to come?<br>&mdash; I\'d love to, but I\'m afraid I\'m going to ___ concert.',
    [a, nil, a],
    '"To coffee" = informal invitation, no article. "A concert" = specific event.',
  ),
  ex(
    'It\'s time you had ___ holiday. You haven\'t had ___ day off for ___ month.',
    [a, a, a],
  ),
  ex(
    'He broke ___ leg in ___ skiing accident. It\'s still in ___ plaster.',
    [a, a, nil],
    '"In plaster" = fixed expression, no article.',
  ),
  ex(
    'I want ___ assistant with ___ knowledge of French and ___ experience of ___ office routine.',
    [an, someNil, someNil, nil],
    '"Experience of office routine" — both are used in a general/abstract sense here.',
  ),
  ex(
    'I see that your house is built of ___ wood. Are you insured against ___ fire?',
    [nil, nil],
    'Both "wood" and "fire" are used in an abstract/material sense.',
  ),
  ex(
    '___ prisoner on the run camped in ___ woods but he didn\'t light ___ fire because ___ smoke rising from the wood might attract ___ attention.',
    [a, the, a, nil, nil],
    '"Woods" = a forest. "A fire" = a specific fire. "Smoke" and "attention" are abstract here.',
  ),
  ex(
    '&mdash; I had ___ amazing experience last night. I saw ___ dinosaur eating ___ meat pie in ___ Seoul park.<br>&mdash; You mean you had ___ nightmare. Anyway, dinosaurs didn\'t eat ___ meat.',
    [an, a, someNil, a, a, nil],
  ),
  ex(
    'I\'ll pay you ___ hundred ___ week. It\'s not ___ enormous salary but after all you are ___ completely unskilled man.',
    [a, a, an, a],
  ),
  ex(
    'If you kept ___ graph you could see at ___ glance whether you were making ___ profit or ___ loss.',
    [a, a, a, a],
  ),
  ex(
    '___ little is known about the effect of this drug; yet ___ chemist will sell it to you without ___ prescription.',
    [nil, a, a],
    '"Little" here = hardly anything (no article). "A chemist" = any chemist.',
  ),
  ex(
    'I have ___ little money left; let\'s have dinner in ___ restaurant.',
    [a, a],
    '"A little" = a small amount (positive sense).',
  ),
  ex(
    'Would it be ___ trouble to you to buy me ___ newspaper on your way home?',
    [any, a],
  ),
  ex(
    '___ man is ___ reasoning animal.',
    [nil, a],
    '"Man" in the generic philosophical sense takes no article.',
  ),
];

// ─── Component ───────────────────────────────────────────────────────────────

const FREE_LIMIT = 3;

type AccessStatus = 'guest' | 'signed-in' | 'purchased';

const Exercise001 = ({ accessStatus }: { accessStatus: AccessStatus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const ex = exercises[currentIndex];
  const isLocked = accessStatus !== 'purchased' && currentIndex >= FREE_LIMIT;

  // Reset answers when exercise changes
  useEffect(() => {
    setAnswers(new Array(ex.blanks.length).fill(''));
    setShowResult(null);
    setShowExplanation(false);
    inputRefs.current = [];
    // Focus first input after render
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

  // Render the sentence with inline inputs
  const renderSentence = () => {
    return ex.parts.map((part, i) => (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: part }} />
        {i < ex.blanks.length && (
          <input
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            value={answers[i] ?? ''}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            placeholder="…"
            style={{
              width: 52,
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 15,
              padding: '1px 4px',
              border: 'none',
              borderBottom: showResult === null
                ? '1.5px solid #185FA5'
                : ex.blanks[i].correct.includes(norm(answers[i] ?? ''))
                  ? '1.5px solid #3B6D11'
                  : '1.5px solid #E24B4A',
              borderRadius: 0,
              background: 'transparent',
              color: showResult === null
                ? 'inherit'
                : ex.blanks[i].correct.includes(norm(answers[i] ?? ''))
                  ? '#27500A'
                  : '#A32D2D',
              outline: 'none',
              textAlign: 'center',
              margin: '0 2px',
            }}
          />
        )}
      </span>
    ));
  };

  // Build the answer key string for a blank
  const answerKey = (blank: Blank) => {
    return blank.correct
      .map((c) => (c === '' ? '∅' : c))
      .join(' / ');
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '1.5rem 1rem 3rem', fontFamily: "'Source Serif 4', Georgia, serif", color: 'inherit' }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
          Fill in the Blank
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          The use of indefinite articles · <em>a</em>, <em>an</em>, <em>some</em>, <em>the</em>, <em>any</em>, or nothing (∅)
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
      <div style={{ position: 'relative' }}>
        <div style={{
          background: '#fff',
          border: '0.5px solid #bbb',
          borderRadius: 12,
          padding: '1.25rem 1.5rem',
          marginBottom: '1rem',
          fontSize: 15,
          lineHeight: 2.2,
          textAlign: 'left',
          filter: isLocked ? 'blur(4px)' : 'none',
          userSelect: isLocked ? 'none' : 'auto',
          pointerEvents: isLocked ? 'none' : 'auto',
        }}>
          {renderSentence()}
        </div>

        {/* ── Gate overlay ── */}
        {isLocked && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 10, borderRadius: 12,
            background: 'rgba(255,255,255,0.7)',
          }}>
            {accessStatus === 'guest' && (
              <>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#333', textAlign: 'center' }}>
                  Sign in to continue
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href="/students/sign-in" style={{ background: '#185FA5', color: '#fff', borderRadius: 8, padding: '7px 18px', fontSize: 13, textDecoration: 'none', fontFamily: "'Source Serif 4', Georgia, serif" }}>Sign in</a>
                  <a href="/students/sign-up" style={{ background: '#fff', color: '#333', border: '0.5px solid #ccc', borderRadius: 8, padding: '7px 18px', fontSize: 13, textDecoration: 'none', fontFamily: "'Source Serif 4', Georgia, serif" }}>Sign up</a>
                </div>
              </>
            )}
            {accessStatus === 'signed-in' && (
              <>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#333', textAlign: 'center' }}>
                  Purchase this exercise to continue
                </div>
                <a href="/shop/languages/english-articles-possessive-adjectives-one-some-any-no" style={{ background: '#185FA5', color: '#fff', borderRadius: 8, padding: '7px 18px', fontSize: 13, textDecoration: 'none', fontFamily: "'Source Serif 4', Georgia, serif" }}>Buy now</a>
              </>
            )}
          </div>
        )}
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
        &copy; 2026 Isidoros Parlamas · parlamas@live.com · socratic-school.com
      </div>
    </div>
  );
};

export default Exercise001;
