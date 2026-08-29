'use client';

// src/app/placement-test/PlacementTest.tsx

import { useState } from 'react';

type Blank = {
  id: string;
  verb: string;
  correct: string[];
};

type Token =
  | { type: 'text'; value: string }
  | { type: 'blank'; blank: Blank };

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

const t = (value: string): Token => ({ type: 'text', value });
const b = (id: string, verb: string, correct: string[]): Token => ({
  type: 'blank',
  blank: { id, verb, correct },
});

const tokens: Token[] = [
  t('Good morning, ladies and gentlemen. Welcome on board this Classic Airways flight to Athens. In a very short time we '),
  b('1', 'take', ['will be taking']),
  t(' off. When we '),
  b('2', 'reach', ['reach']),
  t(' our cruising speed of 550 miles per hour, we '),
  b('3', 'fly', ['will be flying']),
  t(' at 35,000 feet. Our flight time today is two and a half thousand years, so we '),
  b('4', 'be', ['will be']),
  t(' in Athens in time for lunch!'),
  t('||'), // paragraph break marker
  t('The cabin crew '),
  b('5', 'serve', ['will be serving']),
  t(' refreshments during the flight. If you '),
  b('6', 'need', ['need']),
  t(' any assistance, just press the button and a flight robot '),
  b('7', 'come', ['will come']),
  t(' to help you.'),
  t('||'),
  t('[Near the end of the flight]'),
  t('||'),
  t('In a few moments\u2019 time, the crew '),
  b('8', 'come', ['will be coming']),
  t(' round with duty-free goods. We '),
  b('9a', '', ['will']),
  t(' also '),
  b('9b', 'give out', ['be giving out']),
  t(' credential cards. When you '),
  b('10', 'fill', ['fill']),
  t(' in, place them in your passport. They '),
  b('11', 'collect', ['will be collected']),
  t(' as you '),
  b('12', 'go', ['go']),
  t(' through passport control.'),
  t('||'),
  t('In twenty minutes\u2019 time we '),
  b('13', 'land', ['will be landing']),
  t(' at Acropolis airport. Please put your seats in the upright position. You are requested to remain seated until the plane '),
  b('14', 'come', ['comes']),
  t(' to a complete standstill.'),
  t('||'),
  t('We hope you '),
  b('15', 'fly', ['will fly']),
  t(' again soon with Classic Airways.'),
];

const blanks = tokens.filter((tok): tok is { type: 'blank'; blank: Blank } => tok.type === 'blank');

export default function PlacementTest() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setChecked(false);
  };

  const isCorrect = (blank: Blank) =>
    blank.correct.includes(norm(answers[blank.id] ?? ''));

    const score = blanks.filter(({ blank }) => isCorrect(blank)).length;

  const getVerdict = (correct: number, total: number): 'Beginner' | 'Intermediate' | 'Advanced' => {
    const pct = correct / total;
    if (pct < 0.4) return 'Beginner';
    if (pct < 0.75) return 'Intermediate';
    return 'Advanced';
  };

  const verdict = checked ? getVerdict(score, blanks.length) : null;

  const verdictColor: Record<string, { bg: string; text: string; border: string }> = {
    Beginner: { bg: '#FCEBEB', text: '#791F1F', border: '#A32D2D' },
    Intermediate: { bg: '#FFF6E0', text: '#8A6100', border: '#D9A400' },
    Advanced: { bg: '#EAF3DE', text: '#27500A', border: '#3B6D11' },
  };

  const renderTokens = () => {
    const paragraphs: React.ReactNode[][] = [[]];

    tokens.forEach((tok, i) => {
      if (tok.type === 'text' && tok.value === '||') {
        paragraphs.push([]);
        return;
      }
      const current = paragraphs[paragraphs.length - 1];
      if (tok.type === 'text') {
        current.push(<span key={i}>{tok.value}</span>);
      } else {
        const { blank } = tok;
        const answered = answers[blank.id] !== undefined && answers[blank.id] !== '';
        const correct = checked ? isCorrect(blank) : null;
        current.push(
          <span key={i} style={{ whiteSpace: 'nowrap' }}>
            <input
              type="text"
              value={answers[blank.id] ?? ''}
              onChange={(e) => handleChange(blank.id, e.target.value)}
                            placeholder=". . . . . . . . . ."
              style={{
                width: 130,
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: 15,
                padding: '1px 4px',
                border: 'none',
                borderRadius: 0,
                background: 'transparent',
                color: correct === null ? 'inherit' : correct ? '#27500A' : '#A32D2D',
                outline: 'none',
                textAlign: 'center',
                margin: '0 2px',
              }}
            />
                        {blank.verb && (
              <span style={{ fontSize: 12, color: '#888', marginRight: 4 }}>
                ({blank.verb})
              </span>
            )}
          </span>
        );
      }
    });

    return paragraphs.map((para, i) => (
      <p key={i} style={{ marginBottom: '1rem' }}>
        {para}
      </p>
    ));
  };

  return (
    <div
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: '1.5rem 1rem 3rem',
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: 'inherit',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <img
          src="/images/your-captain.webp"
          alt="This is your captain speaking"
          style={{ maxWidth: '100%', borderRadius: 12, marginBottom: '1rem' }}
        />
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
          Placement Test
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          Future forms &middot; will / going to / present continuous / future continuous
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          border: '0.5px solid #bbb',
          borderRadius: 12,
          padding: '1.25rem 1.5rem',
          marginBottom: '1rem',
          fontSize: 15,
          lineHeight: 2.2,
          textAlign: 'left',
        }}
      >
        {renderTokens()}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setChecked(true)}
          style={{
            background: '#185FA5',
            border: 'none',
            borderRadius: 8,
            padding: '7px 20px',
            fontSize: 13,
            cursor: 'pointer',
            color: '#fff',
            fontFamily: "'Source Serif 4', Georgia, serif",
          }}
        >
          Check
        </button>
        <button
          onClick={() => setShowAnswers((v) => !v)}
          style={{
            background: '#fff',
            border: '0.5px solid #ccc',
            borderRadius: 8,
            padding: '7px 20px',
            fontSize: 13,
            cursor: 'pointer',
            color: '#333',
            fontFamily: "'Source Serif 4', Georgia, serif",
          }}
        >
          {showAnswers ? 'Hide answers' : 'Show answers'}
        </button>
      </div>

            {checked && verdict && (
        <div
          style={{
            borderRadius: 8,
            padding: '0.75rem 1rem',
            marginBottom: '0.75rem',
            textAlign: 'center',
            background: verdictColor[verdict].bg,
            color: verdictColor[verdict].text,
            border: `0.5px solid ${verdictColor[verdict].border}`,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>
            Score: {score} / {blanks.length}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>
            Level: {verdict}
          </div>
        </div>
      )}

      {showAnswers && (
        <div style={{ background: '#f7f7f7', borderRadius: 8, padding: '0.85rem 1.1rem', marginBottom: '1rem', fontSize: 13, lineHeight: 1.9 }}>
          <div style={{ fontWeight: 500, marginBottom: 6, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#888', fontFamily: 'sans-serif' }}>
            Answer key
          </div>
          {blanks.map(({ blank }) => (
            <div key={blank.id} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 11, color: '#aaa', minWidth: 24, fontFamily: 'sans-serif' }}>{blank.id}.</span>
              <span style={{ fontWeight: 500, color: '#185FA5', fontStyle: 'italic' }}>{blank.correct.join(' / ')}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '0.5px solid #eee', fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
        &copy; 2026 Isidoros Parlamas &middot; parlamas@live.com &middot; socratic-school.com
      </div>
    </div>
  );
}