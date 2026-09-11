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
  rule: string;
  enPrefix?: string;
  daPrefix?: string;
  englishParts: { text: string; wordIndex: number }[];
  words: WordItem[];
};

const colorMap: Record<string, { bg: string; text: string }> = {
  amber: { bg: '#FAEEDA', text: '#854F0B' },
  coral: { bg: '#FAECE7', text: '#993C1D' },
  blue:  { bg: '#E6F1FB', text: '#0C447C' },
  teal:  { bg: '#E1F5EE', text: '#085041' },
};

const MAIN_CLAUSE_RULE = 'In Danish, in main clauses, the verb must occupy the second place.';
const SUBORDINATE_CLAUSE_RULE = 'In Danish, in subordinate clauses, adverbs are placed after the subject, unless the conjunction is one of the following: så, for, og, men, eller (SFOME), in which case they are placed after the verb.';
const AT_OMISSION_NOTE = '"At" can often be omitted, especially after verbs such as tro, mene, synes, håbe, vide, etc.';

const sentences: SentenceItem[] = [
  {
    rule: MAIN_CLAUSE_RULE,
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
      { danish: 'fisk.', role: 'direct object', color: 'teal', darkText: '#085041', slot: 3, note: 'The direct object closes the clause, exactly as in English.' },
    ],
  },
  {
    rule: MAIN_CLAUSE_RULE,
    englishParts: [
      { text: 'Yesterday,', wordIndex: 0 },
      { text: 'I', wordIndex: 2 },
      { text: 'saw', wordIndex: 1 },
      { text: 'a movie.', wordIndex: 3 },
    ],
    words: [
      { danish: 'I går', role: 'adverb', hint: 'no comma', color: 'amber', darkText: '#854F0B', slot: 0, note: 'Same pattern: the time adverb opens the sentence, so it takes slot 1 — and again, no comma follows it in Danish.' },
      { danish: 'så', role: 'verb', hint: 'must be in 2nd place', color: 'coral', darkText: '#993C1D', slot: 1, note: 'The verb "så" (saw) still has to land in second place, so it jumps ahead of the subject.' },
      { danish: 'jeg', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 2, note: 'The subject gets pushed to third place — Danish and English disagree here even though both start from the same idea.' },
      { danish: 'en film.', role: 'direct object', color: 'teal', darkText: '#085041', slot: 3, note: 'The direct object closes the sentence, same as in English.' },
    ],
  },
  {
    rule: MAIN_CLAUSE_RULE,
    englishParts: [
      { text: 'Suddenly,', wordIndex: 0 },
      { text: 'the dog', wordIndex: 2 },
      { text: 'bit', wordIndex: 1 },
      { text: 'him.', wordIndex: 3 },
    ],
    words: [
      { danish: 'Pludselig', role: 'adverb', hint: 'no comma', color: 'amber', darkText: '#854F0B', slot: 0, note: 'The adverb "suddenly" opens the sentence and takes slot 1, with no comma after it.' },
      { danish: 'bed', role: 'verb', hint: 'must be in 2nd place', color: 'coral', darkText: '#993C1D', slot: 1, note: '"Bed" (bit) has to be second — even though "the dog" comes before it in English.' },
      { danish: 'hunden', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 2, note: 'The subject "the dog" is pushed to third place in Danish.' },
      { danish: 'ham.', role: 'direct object', color: 'teal', darkText: '#085041', slot: 3, note: 'The direct object closes the sentence, same as in English.' },
    ],
  },
  {
    rule: MAIN_CLAUSE_RULE,
    englishParts: [
      { text: 'Tonight,', wordIndex: 0 },
      { text: 'she', wordIndex: 2 },
      { text: 'will read', wordIndex: 1 },
      { text: 'a book.', wordIndex: 3 },
    ],
    words: [
      { danish: 'I aften', role: 'adverb', hint: 'no comma', color: 'amber', darkText: '#854F0B', slot: 0, note: 'The time adverb "tonight" opens the sentence — slot 1, no comma.' },
      { danish: 'læser', role: 'verb', hint: 'must be in 2nd place', color: 'coral', darkText: '#993C1D', slot: 1, note: 'Danish doesn\'t need a separate "will" — the present tense verb "læser" alone covers the future here, and it still must be second.' },
      { danish: 'hun', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 2, note: 'The subject moves to third place, after the verb.' },
      { danish: 'en bog.', role: 'direct object', color: 'teal', darkText: '#085041', slot: 3, note: 'The direct object closes the sentence, same as in English.' },
    ],
  },
  {
    rule: MAIN_CLAUSE_RULE,
    englishParts: [
      { text: 'Before you leave home,', wordIndex: 0 },
      { text: 'you', wordIndex: 2 },
      { text: 'should', wordIndex: 1 },
      { text: 'turn the lights off.', wordIndex: 3 },
    ],
    words: [
      { danish: 'Før du går hjemmefra,', role: 'adverb', hint: 'comma required', color: 'amber', darkText: '#854F0B', slot: 0, note: 'A whole subordinate clause can fill the front position, just like a single adverb — but this time Danish does require a comma, since it\'s a full clause, not just one word.' },
      { danish: 'bør', role: 'verb', hint: 'must be in 2nd place', color: 'coral', darkText: '#993C1D', slot: 1, note: 'Even after a whole clause up front, the main clause verb still has to be second — right after it, before the subject.' },
      { danish: 'du', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 2, note: 'The subject is pushed to third place, exactly as with a single-word adverb.' },
      { danish: 'slukke lyset.', role: 'infinitive & its object', color: 'teal', darkText: '#085041', slot: 3, note: 'The infinitive "turn off" and its direct object "the lights" move together to the end of the clause.' },
    ],
  },
  {
    rule: SUBORDINATE_CLAUSE_RULE,
    enPrefix: 'I think',
    daPrefix: 'Jeg tror, at',
    englishParts: [
      { text: 'she', wordIndex: 0 },
      { text: 'will not', wordIndex: 1 },
      { text: 'pass', wordIndex: 2 },
      { text: 'the exam.', wordIndex: 3 },
    ],
    words: [
      { danish: 'hun', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 0, note: 'A comma is added before the subordinate clause. In a clause introduced by "at", the subject comes first — same as in English.' },
      { danish: 'ikke', role: 'adverb', hint: 'after the subject', color: 'amber', darkText: '#854F0B', slot: 1, note: '"Ikke" is an adverb. In this subordinate clause it sits right after the subject and before the verb — the opposite order from a main clause.' },
      { danish: 'består', role: 'verb', color: 'coral', darkText: '#993C1D', slot: 2, note: 'The verb comes third here, after the subject and the adverb — not second, because this is a subordinate clause, not a main clause.' },
      { danish: 'eksamen.', role: 'direct object', color: 'teal', darkText: '#085041', slot: 3, note: 'The direct object still closes the clause.' },
    ],
  },
  {
    rule: SUBORDINATE_CLAUSE_RULE,
    enPrefix: 'I think',
    daPrefix: 'Jeg tror,',
    englishParts: [
      { text: 'she', wordIndex: 0 },
      { text: 'will certainly', wordIndex: 1 },
      { text: 'pass', wordIndex: 2 },
      { text: 'the exam.', wordIndex: 3 },
    ],
    words: [
      { danish: 'hun', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 0, note: 'A comma is added before the subordinate clause. Here the conjunction "at" is dropped entirely — common in everyday Danish — but the subordinate word order still applies.' },
      { danish: 'helt sikkert', role: 'adverb', hint: 'after the subject', color: 'amber', darkText: '#854F0B', slot: 1, note: '"Helt sikkert" (certainly) is an adverb phrase. Even though it\'s two words, it still occupies the single adverb slot, right after the subject.' },
      { danish: 'består', role: 'verb', color: 'coral', darkText: '#993C1D', slot: 2, note: 'The verb again comes third — after the subject and the adverb.' },
            { danish: 'eksamen.', role: 'direct object', color: 'teal', darkText: '#085041', slot: 3, note: 'The direct object closes the clause.' },
    ],
  },
  {
    rule: SUBORDINATE_CLAUSE_RULE,
    enPrefix: 'He did not listen to his mother, so, ',
    daPrefix: 'Han lyttede ikke til sin mor, så',
    englishParts: [
      { text: 'regrettably,', wordIndex: 2 },
      { text: 'he', wordIndex: 0 },
      { text: 'ruined', wordIndex: 1 },
      { text: 'his career.', wordIndex: 3 },
    ],
    words: [
      { danish: 'han', role: 'subject', color: 'blue', darkText: '#0C447C', slot: 0, note: '"Så" (so) is one of the SFOME conjunctions, so the clause that follows keeps main-clause word order: subject first.' },
      { danish: 'ødelagde', role: 'verb', color: 'coral', darkText: '#993C1D', slot: 1, note: 'The verb comes second — the normal main-clause pattern that SFOME conjunctions preserve.' },
      { danish: 'beklageligvis', role: 'adverb', hint: 'after the verb (SFOME)', color: 'amber', darkText: '#854F0B', slot: 2, note: 'Because "så" is SFOME, the adverb "beklageligvis" goes after the verb — not after the subject, as it would in an ordinary subordinate clause. English still fronts it, but Danish doesn\'t.' },
      { danish: 'sin karriere.', role: 'direct object', color: 'teal', darkText: '#085041', slot: 3, note: 'The direct object closes the clause.' },
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

            <div style={{ background: '#F7F4EC', border: '0.5px solid #ddd', borderRadius: 8, padding: '0.85rem 1.1rem', marginBottom: '1.5rem', textAlign: 'center', fontSize: 14, color: '#333' }}>
        <div>{sentence.rule}</div>
        {sentence.rule === SUBORDINATE_CLAUSE_RULE && (
          <div style={{ fontSize: 12, color: '#666', marginTop: 8, fontStyle: 'italic' }}>
            {AT_OMISSION_NOTE}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
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

        <div style={{ textAlign: 'center', fontSize: 18, marginBottom: '3rem', color: '#000' }}>
          {sentence.enPrefix && (
            <span style={{ color: '#000', marginRight: 4 }}>{sentence.enPrefix}</span>
          )}
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
                marginRight: 4,
                display: 'inline-block',
                color: used[part.wordIndex] ? '#1E6FEA' : '#000',
                fontWeight: used[part.wordIndex] ? 700 : 400,
                transition: 'color 0.3s ease',
              }}
            >
              {part.text}
            </span>
          ))}
        </div>

        {sentence.daPrefix && (
          <div style={{ textAlign: 'center', fontSize: 15, color: '#666', marginTop: -32, marginBottom: 24 }}>
            {sentence.daPrefix}
          </div>
        )}

        <div className="word-columns" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, rowGap: 16, alignItems: 'flex-end' }}>
          {sentence.words.map((_, i) => (
            <div key={i} className="word-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
              <div style={{ minHeight: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#888' }}>{filled[i]?.role ?? ''}</div>
                {filled[i]?.hint && (
                  <div style={{ fontSize: 10, color: filled[i] ? colorMap[filled[i]!.color].text : 'inherit', fontWeight: 500 }}>
                    {filled[i]!.hint}
                  </div>
                )}
              </div>
              <div
                ref={(el) => { slotRefs.current[i] = el; }}
                style={{
                  minWidth: 90,
                  width: 'auto',
                  padding: '0 10px',
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
                  whiteSpace: 'nowrap',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {filled[i]?.danish ?? ''}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 10 }}>
          paragrammar: word order differs
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
      <style jsx>{`
        @media (max-width: 480px) {
          .word-columns {
            gap: 6px;
          }
          .word-column {
            min-width: 74px !important;
          }
        }
      `}</style>
    </div>
  );
}