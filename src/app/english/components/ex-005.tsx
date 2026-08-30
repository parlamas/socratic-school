'use client';

// src/app/english/components/ex-005.tsx

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

const a   = { correct: ['a'] };
const an  = { correct: ['an'] };
const one = { correct: ['one'] };
const nil = { correct: [''] };

const exercises: ExerciseItem[] = [
  ex(
    '___ of my friends advised me to take ___ taxi; another said that there was quite ___ good bus service.',
    [one, a, a],
    '"One of my friends... another said" — contrast between two friends.',
  ),
  ex(
    '___ friend of mine lent me ___ book by Meredith. I\'ve only ___ more chapter to read. Would you like ___ loan of it afterwards?<br>&mdash; No, thanks. I read ___ of his books ___ few years ago and didn\'t like it. Besides I have ___ library book to finish. If I don\'t take it back tomorrow I\'ll have to pay ___ fine.',
    [a, a, one, a, one, a, a, a],
    '"Only one more chapter" emphasizes exactly one. "One of his books" — indefinite reference among many.',
  ),
  ex(
    '___ man I met on the train told me ___ rather unusual story.',
    [a, a],
  ),
  ex(
    'Most people like ___ rest after ___ hard day\'s work, but Tom seemed to have ___ inexhaustible supply of energy.',
    [a, a, an],
  ),
  ex(
    'I\'ve told you ___ hundred times not to come into ___ room with ___ hat on.',
    [a, a, a],
    '"A hundred times" is the standard idiom with round numbers.',
  ),
  ex(
    'It\'s unlucky to light three cigarettes with ___ match. ~ That\'s only ___ superstition. Only ___ idiot believes in superstitions.',
    [one, a, an],
    'Lighting three cigarettes with a single, same match — emphasis on "one" match, not several.',
  ),
  ex(
    'He says ___ caravan is no good; he needs ___ cottage.',
    [a, a],
  ),
  ex(
    '___ plate is no good; we need ___ dozen.',
    [one, a],
    'Contrast: one plate isn\'t enough — a dozen is needed.',
  ),
  ex(
    'Last time there was ___ fog here ___ plane crash-landed in ___ field near the airport. The crew had ___ lucky escape. ___ man broke his leg; the rest were unhurt.',
    [a, a, a, a, one],
    '"One man... the rest were unhurt" — contrast between one person and the group.',
  ),
  ex(
    'You\'ve been ___ great help to me; ___ day I will repay you.',
    [a, one],
    '"One day" = at some unspecified time in the future.',
  ),
  ex(
    'My car broke down near ___ bus stop. There was ___ man waiting for ___ bus so I asked him for ___ advice.',
    [a, a, a, nil],
    '"Advice" is uncountable — no article.',
  ),
  ex(
    'He took ___ quick look at my car and said, \'Buy ___ new ___.\'',
    [a, a, one],
    '"One" here stands in for "car" — "buy a new one."',
  ),
  ex(
    'There was ___ woman there. The rest were men. ~ There shouldn\'t have been even ___ woman. It was meant to be ___ stag party.',
    [a, one, a],
    '"Not even one woman" — emphatic single count.',
  ),
  ex(
    'Don\'t tell ___ soul! Not even your wife! ~ Of course not! I\'d never tell ___ secret to ___ woman.',
    [a, a, a],
  ),
  ex(
    'Most of the staff had been there for only ___ very short time, but ___ man had been there ___ year and ___ half, so he knew ___ little more than the rest.',
    [a, one, a, a, a],
    '"One man" singled out from "most of the staff."',
  ),
  ex(
    'Could you lend me ___ dictionary, please? I\'m trying to do ___ crossword puzzle. ~ I\'m afraid I\'ve only got ___ dictionary, and Tom\'s borrowed it.',
    [a, a, one],
    '"Only got one dictionary" — emphasis on the exact quantity.',
  ),
  ex(
    '___ chop won\'t be enough for Tom; he\'ll want two; he\'s ___ small man but he\'s got ___ big appetite.',
    [one, a, a],
    '"One chop... he\'ll want two" — numerical contrast.',
  ),
  ex(
    '\'I want ___ volunteers for ___ dangerous job,\' said the captain. There was ___ long silence. \'Isn\'t there even ___ man who will take ___ risk?\' he asked. ___ voice called out from the back, \'Will there be ___ reward?\'',
    [nil, a, a, one, a, a, a],
    '"Volunteers" is a plural generic — no article. "Even one man" is emphatic.',
  ),
  ex(
    'I have ___ flat on the top floor. You get ___ lovely view from there.',
    [a, a],
  ),
  ex(
    '___ day a new director arrived. He was ___ ambitious, bad-tempered man, and the staff took ___ instant dislike to him.',
    [one, an, an],
    '"One day" = an unspecified day.',
  ),
  ex(
    'Suddenly ___ bullet struck ___ street lamp ___ little to Bill\'s left. He looked up and saw ___ man with ___ gun standing at ___ open window.',
    [a, a, a, a, a, an],
  ),
  ex(
    'Bill fired back twice. ___ bullet hit the wall, the other broke ___ pane of ___ glass. He heard ___ angry shout.',
    [one, a, nil, an],
    '"One... the other" — a classic contrastive pair. "Glass" (the material) is uncountable.',
  ),
  ex(
    '___ day—it was ___ dry day with ___ good visibility—Tom was driving along ___ country road in ___ borrowed car.',
    [one, a, nil, a, a],
    '"One day" = unspecified. "Visibility" is abstract/uncountable — no article.',
  ),
  ex(
    'You\'re making ___ mistake after another. Have you ___ hangover, or something? ~ No, but I had ___ very bad night last night. The people next door were having ___ party. ~ ___ bad night shouldn\'t have such ___ effect on your work. I often have three bad nights in succession. I live in ___ very noisy street.',
    [one, a, a, a, a, an, a],
    '"One mistake after another" is a fixed idiom.',
  ),
];

const FREE_LIMIT = 10;

type AccessStatus = 'guest' | 'signed-in' | 'purchased';

const Exercise005 = ({ accessStatus }: { accessStatus: AccessStatus }) => {
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
          Insert <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>a</em>, <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>an</em>, or <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>one</em> if necessary
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

export default Exercise005;