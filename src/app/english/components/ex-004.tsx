'use client';

// src/app/english/components/ex-004.tsx

import { useState, useEffect, useRef } from 'react';

type Blank = {
  correct: string[];
};

type ExerciseItem = {
  parts: string[];
  blanks: Blank[];
  note?: string;
};

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
const split = (s: string) => s.split('___');
const ex = (template: string, blanks: Blank[], note?: string): ExerciseItem => ({
  parts: split(template),
  blanks,
  note,
});

const a     = { correct: ['a'] };
const an    = { correct: ['an'] };
const the   = { correct: ['the'] };
const nil   = { correct: [''] };
const my    = { correct: ['my'] };
const your  = { correct: ['your'] };
const his   = { correct: ['his'] };
const her   = { correct: ['her'] };
const our   = { correct: ['our'] };
const their = { correct: ['their'] };

const exercises: ExerciseItem[] = [
  ex('He took off ___ coat and set to work.', [his]),
  ex('Why are you standing there with ___ hands in ___ pockets?', [your, your]),
  ex(
    'At most meetings ___ people vote by raising ___ right hands.',
    [nil, their],
    '"People" here is generic, no article. Each person raises their own hand — possessive.',
  ),
  ex(
    'The bullet struck him in ___ foot.',
    [the],
    'Verb + person + preposition + body part = "the" (struck him in the foot).',
  ),
  ex(
    'They tied ___ hands behind ___ back and locked him in a cellar.',
    [his, his],
    'Here "hands"/"back" are the direct objects themselves (tied his hands), not "tied him by the hands" — so possessive.',
  ),
  ex('He took ___ shoes off and entered on ___ tiptoe.', [his, nil], '"On tiptoe" is a fixed expression — no article.'),
  ex(
    'Someone threw ___ egg which struck the speaker on ___ shoulder.',
    [an, the],
    '"An egg" — first mention, indefinite. "Struck the speaker on the shoulder" — contact-verb pattern.',
  ),
  ex('I have ___ headache.', [a]),
  ex(
    'I have ___ pain in ___ shoulder.',
    [a, my],
    'Describing your own sensation, not an action performed on you by someone else — possessive.',
  ),
  ex(
    'The windscreen was smashed and the driver was cut in ___ face by broken glass.',
    [the],
    'Passive "was cut in the face" — injury caused by an external agent uses "the".',
  ),
  ex(
    'He was ___ very tall man with ___ dark hair and ___ small beard, but I couldn\'t see ___ eyes because he was wearing ___ dark glasses.',
    [a, nil, a, his, nil],
    '"Dark hair" and "dark glasses" are uncountable/generic descriptions — no article. "His eyes" — own body, plain reference.',
  ),
  ex('He tore ___ trousers getting over a barbed wire fence.', [his]),
  ex(
    'Brother and sister were quite unlike each other. He had ___ fair wavy hair; ___ hair was dark and straight.',
    [nil, her],
    '"Fair wavy hair" describes a trait, no article. The second clause needs a subject — "her hair".',
  ),
  ex('She pulled ___ sleeve to attract his attention.', [her], 'Her own sleeve — same-person action.'),
  ex(
    'She pulled him by ___ sleeve.',
    [the],
    'Contact-verb pattern: pulled him by the sleeve.',
  ),
  ex('\'Hands up!\' said the masked man, and we all put ___ hands up.', [our]),
  ex(
    'Ask ___ woman in front of you to take off ___ hat.',
    [the, her],
    '"The woman in front of you" is specific. "Take off her hat" — she is both the one asked and the one acting on her own hat.',
  ),
  ex('He stroked ___ chin thoughtfully.', [his]),
  ex('If you\'re too hot why don\'t you take off ___ coat?', [your]),
  ex(
    'I saw him raise ___ right hand and take ___ oath.',
    [his, an],
    '"Take an oath" is a fixed expression.',
  ),
  ex('The lioness bit him in ___ leg.', [the], 'Contact-verb pattern.'),
  ex('You should change ___ wet shoes, or you\'ll catch another cold.', [your]),
  ex(
    'There was a shot and a policeman came out with ___ blood running down ___ face.',
    [nil, his],
    '"Blood" is uncountable/generic here — no article. "His face" — his own.',
  ),
  ex(
    'We shook ___ hands with ___ host.',
    [nil, the],
    '"Shake hands with" is a fixed idiom — no article on "hands". "The host" — specific.',
  ),
  ex('He fell off his horse and injured ___ back.', [his], 'Own injury, no external agent as object.'),
  ex(
    'The barman seized the drunk by ___ collar.',
    [the],
    'Contact-verb pattern: seized the drunk by the collar.',
  ),
  ex(
    'Leave ___ coats in ___ cloakroom; don\'t bring them into ___ theatre.',
    [your, the, the],
  ),
  ex(
    'He fell down a flight of stairs and broke ___ rib.',
    [a],
    'You have many ribs — unspecified which one, so indefinite rather than possessive.',
  ),
  ex('He pointed to a woman in ___ green dress.', [a]),
  ex(
    'He is ___ thoroughly selfish man; he wouldn\'t lift ___ finger to help anyone.',
    [a, a],
    '"Wouldn\'t lift a finger" is a fixed idiom.',
  ),
  ex(
    'You\'ll strain ___ eyes if you read in ___ bad light.',
    [your, nil],
    '"Bad light" is a general description — no article.',
  ),
  ex(
    'She was on ___ knees, scrubbing ___ kitchen floor.',
    [her, the],
    '"On her knees" is idiomatic with the possessive. "The kitchen floor" — specific.',
  ),
  ex(
    'He has ___ horrible job; I wouldn\'t like to be in ___ shoes.',
    [a, his],
    '"To be in his shoes" — fixed idiom, possessive.',
  ),
  ex('You\'ve got ___ shirt on inside out.', [your]),
  ex(
    '\'Pull up ___ socks,\' said his mother.',
    [your],
    'Direct speech addressed to "you" — fixed idiom "pull your socks up".',
  ),
  ex('I hit ___ thumb with a hammer when I was hanging the picture.', [my]),
];

const FREE_LIMIT = 10;

type AccessStatus = 'guest' | 'signed-in' | 'purchased';

const Exercise004 = ({ accessStatus }: { accessStatus: AccessStatus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const ex = exercises[currentIndex];
  const isLocked = accessStatus !== 'purchased' && currentIndex >= FREE_LIMIT;

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
    blank.correct.filter((c) => c !== '').join(' / ');

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
                disabled={isLocked}
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

      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
          Fill in the Blank
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          Insert <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>a</em>, <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>an</em>, <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>the</em>, or <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>my / his / her / our / your / their</em> if necessary
        </div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
          Type your answer in each blank. Press <kbd style={{ fontFamily: 'monospace', background: '#f0f0f0', padding: '1px 5px', borderRadius: 4, border: '0.5px solid #ccc' }}>Enter</kbd> to move to the next blank or check.
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', fontSize: 13, color: '#666' }}>
        <span>Sentence {currentIndex + 1} of {exercises.length}</span>
        <span style={{ background: '#f4f4f4', border: '0.5px solid #ddd', borderRadius: 20, padding: '2px 12px', fontWeight: 500, color: '#333', fontSize: 13 }}>
          Score: {score} / {exercises.length}
        </span>
      </div>

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

      <div style={{ textAlign: 'center', fontSize: 12, color: '#888', marginBottom: 8 }}>
        {ex.blanks.length === 1 ? '1 blank' : `${ex.blanks.length} blanks`}
      </div>

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
                <a href="/shop" style={{ background: '#185FA5', color: '#fff', borderRadius: 8, padding: '7px 18px', fontSize: 13, textDecoration: 'none', fontFamily: "'Source Serif 4', Georgia, serif" }}>Buy now</a>
              </>
            )}
          </div>
        )}
      </div>

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

            {showExplanation && !isLocked && (
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

      <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '0.5px solid #eee', fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
        &copy; 2026 Isidoros Parlamas · mind@horistics.com · socratic-school.com
      </div>
    </div>
  );
};

export default Exercise004;