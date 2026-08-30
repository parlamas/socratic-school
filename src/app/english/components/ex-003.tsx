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

const a   = { correct: ['a'] };
const an  = { correct: ['an'] };
const the = { correct: ['the'] };
const nil = { correct: [''] };

// ─── Data ────────────────────────────────────────────────────────────────────

const exercises: ExerciseItem[] = [
  ex(
    'There was ___ knock on ___ door. I opened it and found ___ small dark man in ___ blue overcoat and ___ woollen cap.',
    [a, the, a, a, a],
  ),
  ex(
    'He said he was ___ employee of ___ gas company and had come to read ___ meter.',
    [an, the, the],
  ),
  ex(
    'But I had ___ suspicion that he wasn\'t speaking ___ truth because ___ meter readers usually wear ___ peaked caps.',
    [a, the, nil, nil],
    '"Speaking the truth" is a fixed expression. "Meter readers" and "peaked caps" are generic plurals.',
  ),
  ex(
    'However, I took him to ___ meter, which is in ___ dark corner under ___ stairs (___ meters are usually in ___ dark corners under ___ stairs).',
    [the, a, the, nil, nil, the],
    '"Under the stairs" is idiomatic even when speaking generally. "Meters" and "dark corners" (2nd time) are generic plurals.',
  ),
  ex(
    'I asked if he had ___ torch; he said he disliked torches and always read ___ meters by ___ light of ___ match.',
    [a, nil, the, a],
    '"By the light of a match" — fixed pattern. "Meters" here is generic.',
  ),
  ex(
    'I remarked that if there was ___ leak in ___ gaspipe there might be ___ explosion while he was reading ___ meter.',
    [a, the, an, the],
  ),
  ex(
    'He said, \'As ___ matter of ___ fact, there was ___ explosion in ___ last house I visited; and Mr Smith, ___ owner of ___ house, was burnt in ___ face.\'',
    [a, nil, an, the, the, the, the],
    '"As a matter of fact" is a fixed idiom — only one article, before "matter".',
  ),
  ex(
    '\'Mr Smith was holding ___ lighted match at ___ time of ___ explosion.\'',
    [a, the, the],
  ),
  ex(
    'To prevent ___ possible repetition of this accident, I lent him ___ torch.',
    [a, a],
    'The second torch is a different, unspecified one — indefinite.',
  ),
  ex(
    'He switched on ___ torch, read ___ meter and wrote ___ reading down on ___ back of ___ envelope.',
    [the, the, the, the, an],
    '"The torch" — the one just lent to him. "An envelope" — unspecified.',
  ),
  ex(
    'I said in ___ surprise that ___ meter readers usually put ___ readings down in ___ book.',
    [nil, nil, nil, a],
    '"In surprise" — abstract feeling, no article.',
  ),
  ex(
    'He said that he had had ___ book but that it had been burnt in ___ fire in ___ Mr Smith\'s house.',
    [a, a, nil],
  ),
  ex(
    'By this time I had come to ___ conclusion that he wasn\'t ___ genuine meter reader; and ___ moment he left ___ house I rang ___ police.',
    [the, a, the, the, the],
    '"Come to the conclusion" and "the moment he left" are fixed patterns.',
  ),
  ex(
    'Are John and Mary ___ cousins? ~ No, they aren\'t ___ cousins; they are ___ brother and ___ sister.',
    [nil, nil, nil, nil],
    'Plural/role complements after "be" — no article.',
  ),
  ex(
    '___ fog was so thick that we couldn\'t see ___ side of ___ road. We followed ___ car in front of us and hoped that we were going ___ right way.',
    [the, the, the, a, the],
    '"The right way" is a fixed expression.',
  ),
  ex(
    'I can\'t remember ___ exact date of ___ storm, but I know it was ___ Sunday because everybody was at ___ church. On ___ Monday ___ post didn\'t come because ___ roads were blocked by ___ fallen trees.',
    [the, the, a, nil, nil, the, the, nil],
    '"At church" (institution) and day names take no article. "The post" = the mail.',
  ),
  ex(
    'Peter thinks that this is quite ___ cheap restaurant.',
    [a],
  ),
  ex(
    'There\'s been ___ murder here. ~ Where\'s ___ body?~ There isn\'t ___ body. ~ Then how do you know there\'s been ___ murder?',
    [a, the, a, a],
  ),
  ex(
    'Number ___ hundred and two, - ___ house next door to us, is for sale. It\'s quite ___ nice house with ___ big rooms. ___ back windows look out on ___ park.',
    [a, the, a, nil, the, the],
    '"A hundred and two" — indefinite numeral. "Big rooms" — generic plural.',
  ),
  ex(
    'I don\'t know what ___ price ___ owners are asking. But Dry and Rot are ___ agents. You could give them ___ ring and make them ___ offer.',
    [the, the, nil, a, an],
    '"Are agents" — occupation as complement, no article.',
  ),
  ex(
    '___ postman\'s little boy says that he\'d rather be ___ dentist than ___ doctor, because ___ dentists don\'t get called out at ___ night.',
    [the, a, a, nil, nil],
  ),
  ex(
    'Just as ___ air hostess (there was only one on the plane) was handing me ___ cup of ___ coffee ___ plane gave ___ lurch and ___ coffee went all over ___ person on ___ other side of ___ gangway.',
    [the, a, nil, the, a, the, the, the, the],
    'Second "coffee" is definite — it\'s the same coffee just mentioned.',
  ),
  ex(
    'There was ___ collision between ___ car and ___ cyclist at ___ crossroads near ___ my house early in ___ morning. ___ cyclist was taken to ___ hospital with ___ concussion. ___ driver of ___ car was treated for ___ shock. ___ witnesses say that ___ car was going at ___ seventy miles ___ hour.',
    [a, a, a, a, nil, the, the, nil, nil, the, the, nil, the, the, an],
    'No article before "my house" — a possessive already precedes it. "Taken to hospital" (institution, BrE) and "an hour" in "miles an hour" are fixed.',
  ),
  ex(
    'Professor Jones, ___ man who discovered ___ new drug that everyone is talking about, refused to give ___ press conference.',
    [the, the, a],
  ),
  ex(
    'Peter Piper, ___ student in ___ professor\'s college, asked him why he refused to talk to ___ press.',
    [a, the, the],
    '"The press" = the media, collective institution.',
  ),
  ex(
    'We\'re going to ___ tea with ___ Smiths today, aren\'t we? Shall we take ___ car? ~ We can go by ___ car if you wash ___ car first. We can\'t go to ___ Mrs Smith\'s in ___ car all covered with ___ mud.',
    [nil, the, the, nil, the, nil, a, nil],
    '"Go to tea" and "by car" are fixed expressions. Family surnames take "the" (the Smiths). Least certain: the last "car" — describing a state ("a car all covered with mud") rather than re-identifying it.',
  ),
  ex(
    'He got ___ job in ___ south and spent ___ next two years doing ___ work he really enjoyed.',
    [a, the, the, the],
    '"The work he really enjoyed" — the relative clause makes it specific.',
  ),
  ex(
    'It is ___ pleasure to do ___ business with such ___ efficient organization.',
    [a, nil, an],
  ),
  ex(
    '___ day after ___ day passed without ___ news, and we began to lose ___ hope.',
    [nil, nil, nil, nil],
    '"Day after day" is a fixed expression.',
  ),
  ex(
    'Would you like to hear ___ story about ___ Englishman, ___ Irishman and ___ Scotsman? ~ No. I\'ve heard ___ stories about ___ Englishmen, ___ Irishmen and ___ Scotsmen before and they are all ___ same.',
    [a, an, an, a, nil, nil, nil, nil, the],
    '"All the same" is fixed.',
  ),
  ex(
    'But mine is not ___ typical story. In my story ___ Scotsman is generous, ___ Irishman is logical and ___ Englishman is romantic. ~ Oh, if it\'s ___ fantastic story I\'ll listen with ___ pleasure.',
    [a, the, the, the, a, nil],
    'The nationalities are now specific characters within "my story". "With pleasure" is fixed.',
  ),
  ex(
    'My aunt lived on ___ ground floor of ___ old house on ___ River Thames. She was very much afraid of ___ burglars and always locked up ___ house very carefully before she went to ___ bed. She also took ___ precaution of looking under ___ bed to see if ___ burglar was hiding there.',
    [the, an, the, nil, the, nil, the, the, a],
    'Rivers take "the". "Go to bed" is fixed. "Took the precaution of" is a fixed pattern.',
  ),
  ex(
    '\'___ modern burglars don\'t hide under ___ beds,\' said her daughter. I\'ll go on looking just ___ same,\' said my aunt.',
    [nil, nil, the],
  ),
  ex(
    'One morning she rang her daughter in ___ triumph. \'I found ___ burglar under ___ bed ___ last night,\' she said, \'and he was quite ___ young man.\'',
    [nil, a, the, nil, a],
    '"In triumph" is abstract; "last night" takes no article.',
  ),
  ex(
    '___ apples are sold by ___ pound. These are forty pence ___ pound.',
    [nil, the, a],
    '"Sold by the pound" vs "forty pence a pound" — both fixed, different articles.',
  ),
  ex(
    'It was ___ windy morning but they hired ___ boat and went for ___ sail along ___ coast. In ___ afternoon ___ wind increased and they soon found themselves in ___ difficulties.',
    [a, a, a, the, the, the, nil],
    '"In difficulties" is a fixed expression, no article.',
  ),
];

// ─── Component ───────────────────────────────────────────────────────────────

const FREE_LIMIT = 10;

type AccessStatus = 'guest' | 'signed-in' | 'purchased';

const Exercise003 = ({ accessStatus }: { accessStatus: AccessStatus }) => {
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

      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
          Fill in the Blank
        </div>
                <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          Insert <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>a</em>, <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>an</em> or <em style={{ color: '#1E6FEA', fontWeight: 700, fontStyle: 'normal' }}>the</em> where necessary — otherwise leave the blank empty
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