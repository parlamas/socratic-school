'use client';

// src/app/danish/components/ex-003.tsx

import { useState, useRef } from 'react';

type WordItem = {
  danish: string;
  role: string;
  hint?: string;
  color: string;
  darkText: string;
  slot: number;
  note: string;
};

type SentenceItem = {
  englishParts: { text: string; wordIndex: number }[];
  words: WordItem[];
};

const colorMap: Record<string, { bg: string; text: string }> = {
  amber: { bg: '#FAEEDA', text: '#854F0B' },
  coral: { bg: '#FAECE7', text: '#993C1D' },
  blue:  { bg: '#E6F1FB', text: '#0C447C' },
  teal:  { bg: '#E1F5EE', text: '#085041' },
};

const sentences: SentenceItem[] = [
  {
    englishParts: [
      { text: 'Unfortunately,', wordIndex: 0 },
      { text: 'I', wordIndex: 2 },
      { text: 'bought', wordIndex: 1 },
      { text: 'fish.', wordIndex: 3 },
    ],
    words: [
          { danish: 'Desværre', role: 'adverb', hint: 'no comma', color: 'amber', darkText: '#854F0B', slot: 0, note: 'The sentence opens with the adverb — this pushes everything else back one slot. Unlike English, Danish doesn\'t put a comma after it.' },
      { danish: 'købte', role: 'verb', hint: 'must be in 2nd place', color: 'coral', darkText: '#993C1D', slot: 1, note: 'Danish is a V2 language: the finite verb always sits in the second position, no matter what came first.' },
      { danish: 'jeg', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 2, note: 'Because the verb took slot 2, the subject moves after it — the opposite of English word order here.' },
      { danish: 'fisk.', role: 'object', color: 'teal', darkText: '#085041', slot: 3, note: 'The object closes the clause, exactly as in English.' },
    ],
  },
];

export default function Exercise003() {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [used, setUsed] = useState<boolean[]>(() => new Array(sentences[0].words.length).fill(false));
  const [note, setNote] = useState('Click each English word to reveal its Danish translation and watch it settle into its position below.');
  const [flying, setFlying] = useState<{ text: string; color: string; darkText: string; left: number; top: number; opacity: number } | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [filled, setFilled] = useState<(WordItem | null)[]>(() => new Array(sentences[0].words.length).fill(null));

  const sentence = sentences[sentenceIndex];

  const goTo = (i: number) => {
    if (i < 0 || i >= sentences.length) return;
    setSentenceIndex(i);
    setUsed(new Array(sentences[i].words.length).fill(false));
    setFilled(new Array(sentences[i].words.length).fill(null));
    setFlying(null);
    setNote('Click each English word to reveal its Danish translation and watch it settle into its position below.');
  };

  const handleClick = (wordIndex: number) => {
    if (used[wordIndex]) return;
    const item = sentence.words[wordIndex];
    const wordEl = wordRefs.current[wordIndex];
    const slotEl = slotRefs.current[item.slot];
    const stageEl = stageRef.current;
    if (!wordEl || !slotEl || !stageEl) return;

    const wr = wordEl.getBoundingClientRect();
    const sr = stageEl.getBoundingClientRect();

    const nextUsed = [...used];
    nextUsed[wordIndex] = true;
    setUsed(nextUsed);

    setFlying({
      text: item.danish,
      color: colorMap[item.color].bg,
      darkText: colorMap[item.color].text,
      left: wr.left - sr.left,
      top: wr.top - sr.top - 34,
      opacity: 0,
    });

    requestAnimationFrame(() => {
      setFlying((f) => (f ? { ...f, opacity: 1 } : f));
    });

    setTimeout(() => {
      const tr = slotEl.getBoundingClientRect();
      setFlying((f) => (f ? { ...f, left: tr.left - sr.left, top: tr.top - sr.top } : f));
    }, 550);

    setTimeout(() => {
      setFlying(null);
      const nextFilled = [...filled];
      nextFilled[item.slot] = item;
      setFilled(nextFilled);
      setNote(item.note);
    }, 1180);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '1.5rem 1rem 3rem', fontFamily: "'Source Serif 4', Georgia, serif", color: 'inherit' }}>

      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
          Word order · Ordstilling
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          Click each English word to watch it settle into its Danish position
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: '1.5rem' }}>
        {sentences.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: 22, height: 22, borderRadius: '50%',
              background: i === sentenceIndex ? '#185FA5' : '#eee',
              border: i === sentenceIndex ? '1.5px solid #185FA5' : '0.5px solid #ccc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 500, cursor: 'pointer',
              color: i === sentenceIndex ? '#E6F1FB' : '#888',
              fontFamily: 'sans-serif',
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div ref={stageRef} style={{ position: 'relative', background: '#fff', border: '0.5px solid #bbb', borderRadius: 12, padding: '2rem 1.5rem 1.5rem' }}>

        <div style={{ textAlign: 'center', fontSize: 18, marginBottom: '3rem' }}>
          {sentence.englishParts.map((part) => (
            <span
              key={part.wordIndex}
              ref={(el) => { wordRefs.current[part.wordIndex] = el; }}
              onClick={() => handleClick(part.wordIndex)}
              style={{
                cursor: used[part.wordIndex] ? 'default' : 'pointer',
                padding: '4px 6px',
                borderRadius: 8,
                borderBottom: '1.5px dashed #999',
                opacity: used[part.wordIndex] ? 0.35 : 1,
                marginRight: 4,
                display: 'inline-block',
              }}
            >
              {part.text}
            </span>
          ))}
        </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
          {sentence.words.map((_, i) => (
            <div key={i} style={{ width: 90, textAlign: 'center', minHeight: 28 }}>
              <div style={{ fontSize: 11, color: '#888' }}>{filled[i]?.role ?? ''}</div>
              {filled[i]?.hint && (
                <div style={{ fontSize: 10, color: filled[i] ? colorMap[filled[i]!.color].text : 'inherit', fontWeight: 500 }}>
                  {filled[i]!.hint}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, minHeight: 56 }}>
          {sentence.words.map((_, i) => (
            <div
              key={i}
              ref={(el) => { slotRefs.current[i] = el; }}
              style={{
                width: 90,
                height: 44,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: filled[i] ? 500 : 400,
                border: filled[i] ? 'none' : '1.5px dashed #ddd',
                background: filled[i] ? colorMap[filled[i]!.color].bg : 'transparent',
                color: filled[i] ? colorMap[filled[i]!.color].text : 'inherit',
                transition: 'border-color 0.2s ease',
              }}
            >
              {filled[i]?.danish ?? ''}
            </div>
          ))}
        </div>

        {flying && (
          <div
            style={{
              position: 'absolute',
              left: flying.left,
              top: flying.top,
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              background: flying.color,
              color: flying.darkText,
              opacity: flying.opacity,
              zIndex: 5,
              transition: 'left 0.6s cubic-bezier(0.22, 1, 0.36, 1), top 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease',
            }}
          >
            {flying.text}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14, color: '#666', minHeight: 40 }}>
        {note}
      </div>

      <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: '2rem', paddingTop: '1rem', borderTop: '0.5px solid #eee', fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
        &copy; 2026 Isidoros Parlamas · mind@horistics.com · socratic-school.com
      </div>
    </div>
  );
}