//src/app/Danish/components/ex-001.tsx
// REDESIGNED — Socratic School · Editorial Academic Aesthetic

'use client';

import '../danish.css';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

type ExerciseItem = {
  english: string;
  danish: string;
  userAnswer: string;
  isCorrect: boolean | null;
};

type ExerciseSet = {
  name: string;
  description: string;
  items: ExerciseItem[];
};

// ─── Inline styles as a design system ────────────────────────────────────────
const DS = {
  // Colors
  parchment:   '#faf7f2',
  parchmentDk: '#f0ebe0',
  ink:         '#1a1209',
  inkLight:    '#4a3f2f',
  inkMuted:    '#9a8e7e',
  rust:        '#8b4513',
  rustLight:   '#b05a22',
  rustPale:    '#f5ece4',
  green:       '#2d6a4f',
  greenPale:   '#e8f5ee',
  red:         '#9b2226',
  redPale:     '#fdeaea',
  border:      '#d4c9b8',
  borderDk:    '#b8a898',

  // Typography
  serif:  "'Playfair Display', 'Georgia', serif",
  mono:   "'JetBrains Mono', 'Courier New', monospace",
  sans:   "'Inter', system-ui, sans-serif",
} as const;

// ─── Sub-components ────────────────────────────────────────────────────────

function NavButton({
  onClick, disabled, children
}: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? DS.parchmentDk : DS.rust,
        color: disabled ? DS.inkMuted : '#fff',
        border: `1px solid ${disabled ? DS.border : DS.rust}`,
        borderRadius: '6px',
        padding: '8px 18px',
        fontFamily: DS.serif,
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.18s ease',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => { if (!disabled) (e.target as HTMLButtonElement).style.background = DS.rustLight; }}
      onMouseLeave={e => { if (!disabled) (e.target as HTMLButtonElement).style.background = DS.rust; }}
    >
      {children}
    </button>
  );
}

function ScoreChip({ label, correct, total }: { label: string; correct: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '6px 14px',
      background: DS.parchmentDk,
      border: `1px solid ${DS.border}`,
      borderRadius: '8px',
      minWidth: '80px',
    }}>
      <span style={{ fontFamily: DS.mono, fontSize: '0.6rem', color: DS.inkMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ fontFamily: DS.serif, fontSize: '1.1rem', fontWeight: 700, color: DS.rust }}>
        {correct}<span style={{ color: DS.inkMuted, fontWeight: 400 }}>/{total}</span>
      </span>
      <div style={{
        width: '100%', height: '3px', background: DS.border, borderRadius: '2px', marginTop: '4px'
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: pct === 100 ? DS.green : DS.rust,
          borderRadius: '2px',
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}

function Pagination({
  exerciseSets, currentSetIndex, completedSets, setCurrentSetIndex
}: {
  exerciseSets: ExerciseSet[];
  currentSetIndex: number;
  completedSets: boolean[];
  setCurrentSetIndex: (i: number) => void;
}) {
  const pageSize = 6;
  const totalSets = exerciseSets.length;
  const currentPage = Math.floor(currentSetIndex / pageSize);
  const totalPages = Math.ceil(totalSets / pageSize);
  const start = currentPage * pageSize;
  const end = Math.min(start + pageSize, totalSets);

  return (
    <div style={{
      display: 'flex', gap: '6px', justifyContent: 'center',
      alignItems: 'center', flexWrap: 'wrap', margin: '12px 0',
    }}>
      {currentPage > 0 && (
        <button
          onClick={() => setCurrentSetIndex((currentPage - 1) * pageSize)}
          style={{
            width: 28, height: 28, borderRadius: '50%',
            background: DS.rust, color: '#fff', border: 'none',
            fontFamily: DS.serif, fontSize: '14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >‹</button>
      )}

      {exerciseSets.slice(start, end).map((_, i) => {
        const index = start + i;
        const isCurrent = index === currentSetIndex;
        const isDone = completedSets[index];
        return (
          <button
            key={index}
            onClick={() => setCurrentSetIndex(index)}
            title={exerciseSets[index].name}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: isCurrent ? DS.rust : isDone ? DS.green : DS.parchmentDk,
              color: isCurrent || isDone ? '#fff' : DS.inkMuted,
              border: `1px solid ${isCurrent ? DS.rust : isDone ? DS.green : DS.border}`,
              fontFamily: DS.mono, fontSize: '11px', fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {index + 1}
          </button>
        );
      })}

      {currentPage < totalPages - 1 && (
        <button
          onClick={() => setCurrentSetIndex((currentPage + 1) * pageSize)}
          style={{
            width: 28, height: 28, borderRadius: '50%',
            background: DS.rust, color: '#fff', border: 'none',
            fontFamily: DS.serif, fontSize: '14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >›</button>
      )}

      {totalPages > 1 && (
        <span style={{ fontFamily: DS.mono, fontSize: '0.65rem', color: DS.inkMuted, marginLeft: '4px' }}>
          {currentPage + 1}/{totalPages}
        </span>
      )}
    </div>
  );
}

function ExerciseCard({
  item, index, onChange, inputRef
}: {
  item: ExerciseItem;
  index: number;
  onChange: (index: number, value: string) => void;
  inputRef?: (el: HTMLInputElement | null) => void;
}) {
  const bg = item.isCorrect === true
    ? DS.greenPale
    : item.isCorrect === false
    ? DS.redPale
    : '#fff';

  const borderColor = item.isCorrect === true
    ? DS.green
    : item.isCorrect === false
    ? DS.red
    : DS.border;

  return (
    <div style={{
      background: bg,
      border: `1px solid ${borderColor}`,
      borderRadius: '10px',
      padding: '12px 14px',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{
        fontFamily: DS.serif,
        fontSize: '0.95rem',
        fontWeight: 600,
        color: DS.inkLight,
        lineHeight: 1.3,
      }}>
        {item.english}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={item.userAnswer}
        onChange={e => onChange(index, e.target.value)}
        placeholder="skriv her…"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        style={{
          width: '100%',
          padding: '8px 10px',
          fontFamily: DS.mono,
          fontSize: '0.9rem',
          color: DS.ink,
          background: item.isCorrect === true ? DS.greenPale : item.isCorrect === false ? DS.redPale : DS.parchment,
          border: `1.5px solid ${borderColor}`,
          borderRadius: '6px',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={e => { if (!item.isCorrect) e.target.style.borderColor = DS.rust; }}
        onBlur={e => { if (!item.isCorrect) e.target.style.borderColor = borderColor; }}
      />

      {item.isCorrect === false && (
        <div style={{
          fontFamily: DS.mono,
          fontSize: '0.78rem',
          color: DS.red,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <span>✗</span>
          <span style={{ color: DS.inkMuted }}>Korrekt:</span>
          <span style={{ fontWeight: 600 }}>{item.danish}</span>
        </div>
      )}

      {item.isCorrect === true && (
        <div style={{
          fontFamily: DS.mono, fontSize: '0.78rem', color: DS.green,
        }}>✓</div>
      )}
    </div>
  );
}

// ─── Grammar notes (collapsible) ────────────────────────────────────────────

function GrammarNotes() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      marginTop: '24px',
      border: `1px solid ${DS.border}`,
      borderRadius: '10px',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '14px 18px',
          background: DS.parchmentDk, border: 'none', cursor: 'pointer',
          fontFamily: DS.serif, fontSize: '0.9rem', fontWeight: 600,
          color: DS.inkLight, textAlign: 'left',
        }}
      >
        <span>Huskeregler · Rules of Thumb</span>
        <span style={{
          fontFamily: DS.mono, fontSize: '0.75rem', color: DS.rust,
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          padding: '18px 20px',
          background: DS.parchment,
          fontSize: '0.82rem',
          fontFamily: DS.sans,
          color: DS.inkLight,
          lineHeight: 1.85,
        }}>
          {/* Intro */}
          <p style={{ marginBottom: '14px', fontFamily: DS.serif, fontSize: '0.85rem', color: DS.rust, fontStyle: 'italic' }}>
            Danish grammar is surprisingly easy. What follows is about 25% of it. It covers:{' '}
            <strong>indefinite articles · definite articles · common gender of nouns · neuter gender of nouns · singular and plural of nouns · adjectives · nogle, noget, nogen, ingen, intet</strong>{' '}
            (all five of them can be either indefinite adjectives or indefinite pronouns).
          </p>

          <ol style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <li>
              a/an = <code style={{ background: DS.rustPale, padding: '1px 5px', borderRadius: '3px', fontFamily: DS.mono }}>en</code>{' '}
              or{' '}
              <code style={{ background: DS.rustPale, padding: '1px 5px', borderRadius: '3px', fontFamily: DS.mono }}>et</code>
            </li>

            <li>
              the = <code style={{ background: DS.rustPale, padding: '1px 5px', borderRadius: '3px', fontFamily: DS.mono }}>-en</code>{' '}
              or{' '}
              <code style={{ background: DS.rustPale, padding: '1px 5px', borderRadius: '3px', fontFamily: DS.mono }}>-et</code>{' '}
              (singular) ·{' '}
              <code style={{ background: DS.rustPale, padding: '1px 5px', borderRadius: '3px', fontFamily: DS.mono }}>-ne</code>{' '}
              or{' '}
              <code style={{ background: DS.rustPale, padding: '1px 5px', borderRadius: '3px', fontFamily: DS.mono }}>-ene</code>{' '}
              (plural)
            </li>

            <li>
              Plural in Danish is formed with:
              <ol style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><code style={{ fontFamily: DS.mono, color: DS.rust }}>-er</code> &nbsp;[bil · bil<strong style={{ color: DS.rust }}>er</strong>]</li>
                <li>doubling the final consonant + <code style={{ fontFamily: DS.mono, color: DS.rust }}>-er</code> &nbsp;[ven · ven<strong style={{ color: DS.rust }}>ner</strong>]</li>
                <li><code style={{ fontFamily: DS.mono, color: DS.rust }}>-e</code> &nbsp;[hus · hus<strong style={{ color: DS.rust }}>e</strong>]</li>
                <li><code style={{ fontFamily: DS.mono, color: DS.rust }}>-r</code> &nbsp;[pige · pige<strong style={{ color: DS.rust }}>r</strong>]</li>
                <li>no ending &nbsp;[ord · ord]</li>
                <li>vowel change &nbsp;[mand · m<strong style={{ color: DS.rust }}>æ</strong>nd]</li>
                <li>vowel change + <code style={{ fontFamily: DS.mono, color: DS.rust }}>-er</code> &nbsp;[bog · b<strong style={{ color: DS.rust }}>ø</strong>g<strong style={{ color: DS.rust }}>er</strong>, tand · t<strong style={{ color: DS.rust }}>æn</strong>d<strong style={{ color: DS.rust }}>er</strong>], or vowel change + <code style={{ fontFamily: DS.mono, color: DS.rust }}>-re</code> &nbsp;[datter · d<strong style={{ color: DS.rust }}>ø</strong>t<strong style={{ color: DS.rust }}>re</strong>]</li>
                <li>vowel change + <code style={{ fontFamily: DS.mono, color: DS.rust }}>-er</code> + consonant change &nbsp;[fod · <strong style={{ color: DS.rust }}>fødder</strong>]</li>
                <li>totally irregular &nbsp;[øje · øj<strong style={{ color: DS.rust }}>ne</strong>]</li>
              </ol>
            </li>

            <li>
              <strong>Attributive</strong> adjectives stand <em>before</em> a noun: A <strong>big</strong> car has just parked across the street.
            </li>

            <li>
              <strong>Predicative</strong> adjectives stand <em>after</em> the verb: This is a <strong>big</strong> car. / This is <strong>big</strong>.
            </li>

            <li>
              Attributive adjectives add:
              <ol type="a" style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>
                  <strong>nothing</strong> when the gender is common, the number singular, and the form indefinite:{' '}
                  <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>en stor bil</span>{' '}
                  (<strong>stor</strong> = base form)
                </li>
                <li>
                  <code style={{ fontFamily: DS.mono, color: DS.rust }}>-t</code> <em>only</em> when the gender is neuter, the number singular, and the form indefinite; <em>only</em> after <code style={{ fontFamily: DS.mono }}>et</code>:{' '}
                  <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>et stor<strong style={{ color: DS.rust }}>t</strong> land</span>{' '}
                  (<strong>stort</strong> = -t form)
                </li>
                <li>
                  <code style={{ fontFamily: DS.mono, color: DS.rust }}>-e</code> in plural:{' '}
                  <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>stor<strong style={{ color: DS.rust }}>e</strong> biler</span>,{' '}
                  or in the definite form regardless of number:{' '}
                  <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>den stor<strong style={{ color: DS.rust }}>e</strong> bil</span>{' '}
                  (<strong>store</strong> = -e form)
                  <br />
                  <span style={{ color: DS.inkMuted, fontSize: '0.78rem' }}>
                    Also after: den, det, de, min, din, hans, hendes, vores, jeres, deres, denne, dette, disse
                  </span>
                </li>
              </ol>
            </li>

            <li>
              Predicative adjectives add <code style={{ fontFamily: DS.mono, color: DS.rust }}>-t</code>:
              <ol type="a" style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>when the subject is <code style={{ fontFamily: DS.mono }}>det</code>: <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>Det er vigtig<strong style={{ color: DS.rust }}>t</strong>.</span></li>
                <li>when the subject is a neuter noun: <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>Landet er smuk<strong style={{ color: DS.rust }}>t</strong>.</span></li>
              </ol>
            </li>

            <li>
              Predicative adjectives add <code style={{ fontFamily: DS.mono, color: DS.rust }}>-e</code> <em>only</em> in the plural:{' '}
              <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>Biler er stor<strong style={{ color: DS.rust }}>e</strong></span>{' '}
              ·{' '}
              <span style={{ background: DS.parchmentDk, padding: '1px 6px', borderRadius: '3px', fontFamily: DS.mono }}>Bilerne er stor<strong style={{ color: DS.rust }}>e</strong></span>
            </li>

            <li>
              Adjectives whose base form ends in <code style={{ fontFamily: DS.mono }}>-e</code> are invariant:{' '}
              <span style={{ fontFamily: DS.mono, color: DS.rust }}>lille, stille, ille, moderne</span>{' '}
              — although <em>moderne</em> retains a -t form in strict Danish.
            </li>

            <li>
              Adjectives whose base form ends in <code style={{ fontFamily: DS.mono }}>-å</code> lack an -e form:{' '}
              <span style={{ fontFamily: DS.mono, color: DS.rust }}>blå, grå, rå</span>
            </li>

            <li>
              <code style={{ fontFamily: DS.mono }}>fri</code> is the only Danish adjective whose base form ends in <code style={{ fontFamily: DS.mono }}>-i</code>.{' '}
              <code style={{ fontFamily: DS.mono }}>ny</code> and <code style={{ fontFamily: DS.mono }}>sky</code> are the only ones ending in <code style={{ fontFamily: DS.mono }}>-y</code>. All three behave normally.
            </li>

            <li>
              <code style={{ fontFamily: DS.mono, fontWeight: 700 }}>nogle</code> = some + plural countable nouns
            </li>

            <li>
              <code style={{ fontFamily: DS.mono, fontWeight: 700 }}>noget</code> =
              <ol type="a" style={{ paddingLeft: '20px', marginTop: '4px' }}>
                <li>some + uncountable nouns</li>
                <li>something / anything</li>
              </ol>
            </li>

            <li>
              <code style={{ fontFamily: DS.mono, fontWeight: 700 }}>nogen</code> = someone / anyone / somebody / anybody / no one / nobody / any
            </li>

            <li>
              <code style={{ fontFamily: DS.mono, fontWeight: 700 }}>ingen (af)</code> (common gender) = no / not any / none
              &nbsp;·&nbsp;
              <code style={{ fontFamily: DS.mono, fontWeight: 700 }}>intet (af)</code> (neuter gender) = no / not any / nothing / not anything / none
            </li>

          </ol>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const Exercise001 = () => {
  const allExerciseSets: ExerciseSet[] = [
    {
      name: 'Det Grundlæggende • The Basics',

      description: 'Articles with "bog"',
      items: [
        { english: 'book (bog=7)', danish: 'bog', userAnswer: '', isCorrect: null },
        { english: 'a book', danish: 'en bog', userAnswer: '', isCorrect: null },
        { english: 'the book', danish: 'bogen', userAnswer: '', isCorrect: null },
        { english: 'books', danish: 'bøger', userAnswer: '', isCorrect: null },
        { english: 'some books', danish: 'nogle bøger', userAnswer: '', isCorrect: null },
        { english: 'the books', danish: 'bøgerne', userAnswer: '', isCorrect: null },
        { english: 'a small book', danish: 'en lille bog', userAnswer: '', isCorrect: null },
        { english: 'the small book', danish: 'den lille bog', userAnswer: '', isCorrect: null },
        { english: 'small books', danish: 'små bøger', userAnswer: '', isCorrect: null },
        { english: 'some small books', danish: 'nogle små bøger', userAnswer: '', isCorrect: null },
        { english: 'the small books', danish: 'de små bøger', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • Dør',
      description: 'Statement with "nogen" (someone)',
      items: [
        { english: 'Someone is standing at the door. (dør=3)', danish: 'Der står nogen ved døren.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Personlige pronominer • Personal Pronouns',
      description: 'The word "pronoun" in Danish',
      items: [
        { english: '*pronoun (pronomen 7)', danish: 'pronomen', userAnswer: '', isCorrect: null },
        { english: 'a pronoun', danish: 'et pronomen', userAnswer: '', isCorrect: null },
        { english: 'the pronoun', danish: 'pronomenet', userAnswer: '', isCorrect: null },
        { english: 'pronouns', danish: 'pronominer', userAnswer: '', isCorrect: null },
        { english: 'some pronouns', danish: 'nogle pronominer', userAnswer: '', isCorrect: null },
        { english: 'the pronouns', danish: 'pronominerne', userAnswer: '', isCorrect: null },
        { english: 'a personal pronoun', danish: 'et personligt pronomen', userAnswer: '', isCorrect: null },
        { english: 'the personal pronoun', danish: 'det personlige pronomen', userAnswer: '', isCorrect: null },
        { english: 'personal pronouns', danish: 'personlige pronominer', userAnswer: '', isCorrect: null },
        { english: 'some personal pronouns', danish: 'nogle personlige pronominer', userAnswer: '', isCorrect: null },
        { english: 'the personal pronouns', danish: 'de personlige pronominer', userAnswer: '', isCorrect: null },
      ]
    },
        {
      name: 'Ord • Word',
      description: 'Neuter gender with adjectives',
      items: [
        { english: '*word (ord=5)', danish: 'ord', userAnswer: '', isCorrect: null },
        { english: 'a word', danish: 'et ord', userAnswer: '', isCorrect: null },
        { english: 'the word', danish: 'ordet', userAnswer: '', isCorrect: null },
        { english: 'words', danish: 'ord', userAnswer: '', isCorrect: null },
        { english: 'some words', danish: 'nogle ord', userAnswer: '', isCorrect: null },
        { english: 'the words', danish: 'ordene', userAnswer: '', isCorrect: null },
        { english: 'a new word', danish: 'et nyt ord', userAnswer: '', isCorrect: null },
        { english: 'the new word', danish: 'det nye ord', userAnswer: '', isCorrect: null },
        { english: 'new words', danish: 'nye ord', userAnswer: '', isCorrect: null },
        { english: 'some new words', danish: 'nogle nye ord', userAnswer: '', isCorrect: null },
        { english: 'the new words', danish: 'de nye ord', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • København',
      description: 'Question with "nogen" (anyone)',
      items: [
        { english: 'Do you know anyone in Copenhagen?', danish: 'Kender du nogen i København?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Navn • Name',
      description: 'Neuter gender with adjectives',
      items: [
        { english: '*name (navn=3)', danish: 'navn', userAnswer: '', isCorrect: null },
        { english: 'a name', danish: 'et navn', userAnswer: '', isCorrect: null },
        { english: 'the name', danish: 'navnet', userAnswer: '', isCorrect: null },
        { english: 'names', danish: 'navne', userAnswer: '', isCorrect: null },
        { english: 'some names', danish: 'nogle navne', userAnswer: '', isCorrect: null },
        { english: 'the names', danish: 'navnene', userAnswer: '', isCorrect: null },
        { english: 'a beautiful name', danish: 'et smukt navn', userAnswer: '', isCorrect: null },
        { english: 'the beautiful name', danish: 'det smukke navn', userAnswer: '', isCorrect: null },
        { english: 'beautiful names', danish: 'smukke navne', userAnswer: '', isCorrect: null },
        { english: 'some beautiful names', danish: 'nogle smukke navne', userAnswer: '', isCorrect: null },
        { english: 'the beautiful names', danish: 'de smukke navne', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Tal • Number',
      description: 'Neuter gender with adjectives',
      items: [
        { english: '*number (tal=5)', danish: 'tal', userAnswer: '', isCorrect: null },
        { english: 'a number', danish: 'et tal', userAnswer: '', isCorrect: null },
        { english: 'the number', danish: 'tallet', userAnswer: '', isCorrect: null },
        { english: 'numbers', danish: 'tal', userAnswer: '', isCorrect: null },
        { english: 'some numbers', danish: 'nogle tal', userAnswer: '', isCorrect: null },
        { english: 'the numbers', danish: 'tallene', userAnswer: '', isCorrect: null },
        { english: 'a round number', danish: 'et rundt tal', userAnswer: '', isCorrect: null },
        { english: 'the round number', danish: 'det runde tal', userAnswer: '', isCorrect: null },
        { english: 'round numbers', danish: 'runde tal', userAnswer: '', isCorrect: null },
        { english: 'some round numbers', danish: 'nogle runde tal', userAnswer: '', isCorrect: null },
        { english: 'the round numbers', danish: 'de runde tal', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • Ringede',
      description: 'Statement with "nogen" (someone) in past tense',
      items: [
        { english: 'Someone called me yesterday.', danish: 'Nogen ringede til mig i går.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Bogstav • Fed',
      description: 'Neuter gender with the adjective "fed" (bold)',
      items: [
        { english: '*letter (bogstav=1)', danish: 'bogstav', userAnswer: '', isCorrect: null },
        { english: 'a letter', danish: 'et bogstav', userAnswer: '', isCorrect: null },
        { english: 'the letter', danish: 'bogstavet', userAnswer: '', isCorrect: null },
        { english: 'letters', danish: 'bogstaver', userAnswer: '', isCorrect: null },
        { english: 'some letters', danish: 'nogle bogstaver', userAnswer: '', isCorrect: null },
        { english: 'the letters', danish: 'bogstaverne', userAnswer: '', isCorrect: null },
        { english: 'a bold letter', danish: 'et fedt bogstav', userAnswer: '', isCorrect: null },
        { english: 'the bold letter', danish: 'det fede bogstav', userAnswer: '', isCorrect: null },
        { english: 'bold letters', danish: 'fede bogstaver', userAnswer: '', isCorrect: null },
        { english: 'some bold letters', danish: 'nogle fede bogstaver', userAnswer: '', isCorrect: null },
        { english: 'the bold letters', danish: 'de fede bogstaver', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'År • Year',
      description: 'Neuter gender with adjectives',
      items: [
        { english: '*year (år=5)', danish: 'år', userAnswer: '', isCorrect: null },
        { english: 'a year', danish: 'et år', userAnswer: '', isCorrect: null },
        { english: 'the year', danish: 'året', userAnswer: '', isCorrect: null },
        { english: 'years', danish: 'år', userAnswer: '', isCorrect: null },
        { english: 'some years', danish: 'nogle år', userAnswer: '', isCorrect: null },
        { english: 'the years', danish: 'årene', userAnswer: '', isCorrect: null },
        { english: 'a new year', danish: 'et nyt år', userAnswer: '', isCorrect: null },
        { english: 'the new year', danish: 'det nye år', userAnswer: '', isCorrect: null },
        { english: 'good years', danish: 'gode år', userAnswer: '', isCorrect: null },
        { english: 'some good years', danish: 'nogle gode år', userAnswer: '', isCorrect: null },
        { english: 'the good years', danish: 'de gode år', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Måned • Month',
      description: 'Common gender with adjectives',
      items: [
        { english: 'month (måned=1)', danish: 'måned', userAnswer: '', isCorrect: null },
        { english: 'a month', danish: 'en måned', userAnswer: '', isCorrect: null },
        { english: 'the month', danish: 'måneden', userAnswer: '', isCorrect: null },
        { english: 'months', danish: 'måneder', userAnswer: '', isCorrect: null },
        { english: 'some months', danish: 'nogle måneder', userAnswer: '', isCorrect: null },
        { english: 'the months', danish: 'månederne', userAnswer: '', isCorrect: null },
        { english: 'a long month', danish: 'en lang måned', userAnswer: '', isCorrect: null },
        { english: 'the long month', danish: 'den lange måned', userAnswer: '', isCorrect: null },
        { english: 'long months', danish: 'lange måneder', userAnswer: '', isCorrect: null },
        { english: 'some long months', danish: 'nogle lange måneder', userAnswer: '', isCorrect: null },
        { english: 'the long months', danish: 'de lange måneder', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • Taget',
      description: 'Statement with "nogen" (someone) in present perfect tense',
      items: [
        { english: 'I think someone has taken my book.', danish: 'Jeg tror nogen har taget min bog.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Notesbog • Notebook',
      description: 'Common gender words with "notesbog"',
      items: [
        { english: 'notebook (notesbog=7)', danish: 'notesbog', userAnswer: '', isCorrect: null },
        { english: 'a notebook', danish: 'en notesbog', userAnswer: '', isCorrect: null },
        { english: 'the notebook', danish: 'notesbogen', userAnswer: '', isCorrect: null },
        { english: 'notebooks', danish: 'notesbøger', userAnswer: '', isCorrect: null },
        { english: 'some notebooks', danish: 'nogle notesbøger', userAnswer: '', isCorrect: null },
        { english: 'the notebooks', danish: 'notesbøgerne', userAnswer: '', isCorrect: null },
        { english: 'a personal notebook', danish: 'en personlig notesbog', userAnswer: '', isCorrect: null },
        { english: 'the personal notebook', danish: 'den personlige notesbog', userAnswer: '', isCorrect: null },
        { english: 'personal notebooks', danish: 'personlige notesbøger', userAnswer: '', isCorrect: null },
        { english: 'some personal notebooks', danish: 'nogle personlige notesbøger', userAnswer: '', isCorrect: null },
        { english: 'the personal notebooks', danish: 'de personlige notesbøger', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Hus • House',
      description: 'Neuter gender words with "hus" and colors',
      items: [
        { english: '*house (hus=3)', danish: 'hus', userAnswer: '', isCorrect: null },
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'the house', danish: 'huset', userAnswer: '', isCorrect: null },
        { english: 'houses', danish: 'huse', userAnswer: '', isCorrect: null },
        { english: 'some houses', danish: 'nogle huse', userAnswer: '', isCorrect: null },
        { english: 'the houses', danish: 'husene', userAnswer: '', isCorrect: null },
        { english: 'a red house', danish: 'et rødt hus', userAnswer: '', isCorrect: null },
        { english: 'the red house', danish: 'det røde hus', userAnswer: '', isCorrect: null },
        { english: 'red houses', danish: 'røde huse', userAnswer: '', isCorrect: null },
        { english: 'some red houses', danish: 'nogle røde huse', userAnswer: '', isCorrect: null },
        { english: 'the red houses', danish: 'de røde huse', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • Nøgler',
      description: 'Question with "nogen" (anyone) in present perfect tense',
      items: [
        { english: 'Has anyone seen my keys? (nøgle=1)', danish: 'Har nogen set mine nøgler?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Barn • Child',
      description: 'Neuter gender with adjectives',
      items: [
        { english: '*child (barn=6)', danish: 'barn', userAnswer: '', isCorrect: null },
        { english: 'a child', danish: 'et barn', userAnswer: '', isCorrect: null },
        { english: 'the child', danish: 'barnet', userAnswer: '', isCorrect: null },
        { english: 'children', danish: 'børn', userAnswer: '', isCorrect: null },
        { english: 'some children', danish: 'nogle børn', userAnswer: '', isCorrect: null },
        { english: 'the children', danish: 'børnene', userAnswer: '', isCorrect: null },
        { english: 'a quiet child', danish: 'et stille barn', userAnswer: '', isCorrect: null },
        { english: 'the quiet child', danish: 'det stille barn', userAnswer: '', isCorrect: null },
        { english: 'quiet children', danish: 'stille børn', userAnswer: '', isCorrect: null },
        { english: 'some quiet children', danish: 'nogle stille børn', userAnswer: '', isCorrect: null },
        { english: 'the quiet children', danish: 'de stille børn', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Æg • Egg',
      description: 'Neuter gender with colors',
      items: [
        { english: '*egg (æg=5)', danish: 'æg', userAnswer: '', isCorrect: null },
        { english: 'an egg', danish: 'et æg', userAnswer: '', isCorrect: null },
        { english: 'the egg', danish: 'ægget', userAnswer: '', isCorrect: null },
        { english: 'eggs', danish: 'æg', userAnswer: '', isCorrect: null },
        { english: 'some eggs', danish: 'nogle æg', userAnswer: '', isCorrect: null },
        { english: 'the eggs', danish: 'æggene', userAnswer: '', isCorrect: null },
        { english: 'a brown egg', danish: 'et brunt æg', userAnswer: '', isCorrect: null },
        { english: 'the brown egg', danish: 'det brune æg', userAnswer: '', isCorrect: null },
        { english: 'brown eggs', danish: 'brune æg', userAnswer: '', isCorrect: null },
        { english: 'some brown eggs', danish: 'nogle brune æg', userAnswer: '', isCorrect: null },
        { english: 'the brown eggs', danish: 'de brune æg', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Sky • Spredt',
      description: 'Common gender with the adjective "spredt" (scattered)',
      items: [
        { english: 'cloud (sky=1)', danish: 'sky', userAnswer: '', isCorrect: null },
        { english: 'a cloud', danish: 'en sky', userAnswer: '', isCorrect: null },
        { english: 'the cloud', danish: 'skyen', userAnswer: '', isCorrect: null },
        { english: 'clouds', danish: 'skyer', userAnswer: '', isCorrect: null },
        { english: 'some clouds', danish: 'nogle skyer', userAnswer: '', isCorrect: null },
        { english: 'the clouds', danish: 'skyerne', userAnswer: '', isCorrect: null },
        { english: 'a scattered cloud', danish: 'en spredt sky', userAnswer: '', isCorrect: null },
        { english: 'the scattered cloud', danish: 'den spredte sky', userAnswer: '', isCorrect: null },
        { english: 'scattered clouds', danish: 'spredte skyer', userAnswer: '', isCorrect: null },
        { english: 'some scattered clouds', danish: 'nogle spredte skyer', userAnswer: '', isCorrect: null },
        { english: 'the scattered clouds', danish: 'de spredte skyer', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Intet • Høre',
      description: 'Negative with "intet" (nothing - hear)',
      items: [
        { english: 'I hear nothing.', danish: 'Jeg hører intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Umuligt',
      description: 'Negative with "intet" (nothing - impossible)',
      items: [
        { english: 'Nothing is impossible.', danish: 'Intet er umuligt.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Sagde',
      description: 'Negative with "intet" (nothing - said)',
      items: [
        { english: 'He said nothing.', danish: 'Han sagde intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Sandt',
      description: 'Negative with "intet" (none - true)',
      items: [
        { english: 'None of this is true.', danish: 'Intet af dette er sandt.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Så',
      description: 'Negative with "intet" (nothing - saw)',
      items: [
        { english: 'I saw nothing.', danish: 'Jeg så intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Hjælper',
      description: 'Negative with "intet" (none - helps)',
      items: [
        { english: 'None of this helps.', danish: 'Intet af dette hjælper.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Skete',
      description: 'Negative with "intet" (nothing - happened)',
      items: [
        { english: 'Nothing happened.', danish: 'Intet skete.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Mening',
      description: 'Negative with "intet" (none - sense)',
      items: [
        { english: 'None of it makes sense.', danish: 'Intet af det giver mening.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Ændrer',
      description: 'Negative with "intet" (none - changes)',
      items: [
        { english: 'None of this changes anything.', danish: 'Intet af dette ændrer noget.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Vigtigt',
      description: 'Negative with "intet" (none - important)',
      items: [
        { english: 'None of this is important.', danish: 'Intet af dette er vigtigt.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Sjov • Stor',
      description: 'Common gender with the adjective "stor" (great)',
      items: [
        { english: 'fun', danish: 'sjov', userAnswer: '', isCorrect: null },
        { english: 'the fun', danish: 'sjoven', userAnswer: '', isCorrect: null },
        { english: 'some fun', danish: 'noget sjov', userAnswer: '', isCorrect: null },
        { english: 'great fun', danish: 'stor sjov', userAnswer: '', isCorrect: null },
        { english: 'the great fun', danish: 'den store sjov', userAnswer: '', isCorrect: null },
        { english: 'some great fun', danish: 'noget stor sjov', userAnswer: '', isCorrect: null },
        { english: 'many types of fun', danish: 'mange typer sjov', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Sprog • Language • let',
      description: 'Neuter gender with adjectives',
      items: [
        { english: '*language (sprog=5)', danish: 'sprog', userAnswer: '', isCorrect: null },
        { english: 'a language', danish: 'et sprog', userAnswer: '', isCorrect: null },
        { english: 'the language', danish: 'sproget', userAnswer: '', isCorrect: null },
        { english: 'languages', danish: 'sprog', userAnswer: '', isCorrect: null },
        { english: 'some languages', danish: 'nogle sprog', userAnswer: '', isCorrect: null },
        { english: 'the languages', danish: 'sprogene', userAnswer: '', isCorrect: null },
        { english: 'an easy language', danish: 'et let sprog', userAnswer: '', isCorrect: null },
        { english: 'the easy language', danish: 'det lette sprog', userAnswer: '', isCorrect: null },
        { english: 'easy languages', danish: 'lette sprog', userAnswer: '', isCorrect: null },
        { english: 'some easy languages', danish: 'nogle lette sprog', userAnswer: '', isCorrect: null },
        { english: 'the easy languages', danish: 'de lette sprog', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Sige • Noget',
      description: 'Verb phrase with "noget" (something)',
      items: [
        { english: 'I would like to say something.', danish: 'Jeg vil gerne sige noget.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Stol • Chair',
      description: 'Common gender with colors',
      items: [
        { english: 'chair (stol=3)', danish: 'stol', userAnswer: '', isCorrect: null },
        { english: 'a chair', danish: 'en stol', userAnswer: '', isCorrect: null },
        { english: 'the chair', danish: 'stolen', userAnswer: '', isCorrect: null },
        { english: 'chairs', danish: 'stole', userAnswer: '', isCorrect: null },
        { english: 'some chairs', danish: 'nogle stole', userAnswer: '', isCorrect: null },
        { english: 'the chairs', danish: 'stolene', userAnswer: '', isCorrect: null },
        { english: 'a blue chair', danish: 'en blå stol', userAnswer: '', isCorrect: null },
        { english: 'the blue chair', danish: 'den blå stol', userAnswer: '', isCorrect: null },
        { english: 'blue chairs', danish: 'blå stole', userAnswer: '', isCorrect: null },
        { english: 'some blue chairs', danish: 'nogle blå stole', userAnswer: '', isCorrect: null },
        { english: 'the blue chairs', danish: 'de blå stole', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • Banker',
      description: 'Statement with "nogen" (someone)',
      items: [
        { english: 'Someone is knocking on the window. (vindue=4)', danish: 'Nogen banker på vinduet.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Bord • Firkantet',
      description: 'Neuter gender with the adjective "firkantet" (square)',
      items: [
        { english: '*table (bord=3)', danish: 'bord', userAnswer: '', isCorrect: null },
        { english: 'a table', danish: 'et bord', userAnswer: '', isCorrect: null },
        { english: 'the table', danish: 'bordet', userAnswer: '', isCorrect: null },
        { english: 'tables', danish: 'borde', userAnswer: '', isCorrect: null },
        { english: 'some tables', danish: 'nogle borde', userAnswer: '', isCorrect: null },
        { english: 'the tables', danish: 'bordene', userAnswer: '', isCorrect: null },
        { english: 'a square table', danish: 'et firkantet bord', userAnswer: '', isCorrect: null },
        { english: 'the square table', danish: 'det firkantede bord', userAnswer: '', isCorrect: null },
        { english: 'square tables', danish: 'firkantede borde', userAnswer: '', isCorrect: null },
        { english: 'some square tables', danish: 'nogle firkantede borde', userAnswer: '', isCorrect: null },
        { english: 'the square tables', danish: 'de firkantede borde', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Kaffe • Friskkværnet',
      description: 'Common gender with the adjective "friskkværnet" (freshly ground)',
      items: [
        { english: 'coffee', danish: 'kaffe', userAnswer: '', isCorrect: null },
        { english: 'the coffee', danish: 'kaffen', userAnswer: '', isCorrect: null },
        { english: 'some coffee', danish: 'noget kaffe', userAnswer: '', isCorrect: null },
        { english: 'freshly ground coffee', danish: 'friskkværnet kaffe', userAnswer: '', isCorrect: null },
        { english: 'the freshly ground coffee', danish: 'den friskkværnede kaffe', userAnswer: '', isCorrect: null },
        { english: 'some freshly ground coffee', danish: 'noget friskkværnet kaffe', userAnswer: '', isCorrect: null },
        { english: 'three varieties of coffee', danish: 'tre slags kaffe', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Bil • Hurtig',
      description: 'Common gender with the adjective "hurtig" (fast)',
      items: [
        { english: 'car (bil=1)', danish: 'bil', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'the car', danish: 'bilen', userAnswer: '', isCorrect: null },
        { english: 'cars', danish: 'biler', userAnswer: '', isCorrect: null },
        { english: 'some cars', danish: 'nogle biler', userAnswer: '', isCorrect: null },
        { english: 'the cars', danish: 'bilerne', userAnswer: '', isCorrect: null },
        { english: 'a fast car', danish: 'en hurtig bil', userAnswer: '', isCorrect: null },
        { english: 'the fast car', danish: 'den hurtige bil', userAnswer: '', isCorrect: null },
        { english: 'fast cars', danish: 'hurtige biler', userAnswer: '', isCorrect: null },
        { english: 'some fast cars', danish: 'nogle hurtige biler', userAnswer: '', isCorrect: null },
        { english: 'the fast cars', danish: 'de hurtige biler', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Noget • Bord',
      description: 'There is + something phrase',
      items: [
        { english: 'There is something on the table.', danish: 'Der er noget på bordet.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Mand • Gammel',
      description: 'Common gender with the adjective "gammel" (old)',
      items: [
        { english: 'man (mand=6)', danish: 'mand', userAnswer: '', isCorrect: null },
        { english: 'a man', danish: 'en mand', userAnswer: '', isCorrect: null },
        { english: 'the man', danish: 'manden', userAnswer: '', isCorrect: null },
        { english: 'men', danish: 'mænd', userAnswer: '', isCorrect: null },
        { english: 'some men', danish: 'nogle mænd', userAnswer: '', isCorrect: null },
        { english: 'the men', danish: 'mændene', userAnswer: '', isCorrect: null },
        { english: 'an old man', danish: 'en gammel mand', userAnswer: '', isCorrect: null },
        { english: 'the old man', danish: 'den gamle mand', userAnswer: '', isCorrect: null },
        { english: 'old men', danish: 'gamle mænd', userAnswer: '', isCorrect: null },
        { english: 'some old men', danish: 'nogle gamle mænd', userAnswer: '', isCorrect: null },
        { english: 'the old men', danish: 'de gamle mænd', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Kvinde • Smuk',
      description: 'Common gender with the adjective "smuk" (beautiful)',
      items: [
        { english: 'woman (kvinde=4)', danish: 'kvinde', userAnswer: '', isCorrect: null },
        { english: 'a woman', danish: 'en kvinde', userAnswer: '', isCorrect: null },
        { english: 'the woman', danish: 'kvinden', userAnswer: '', isCorrect: null },
        { english: 'women', danish: 'kvinder', userAnswer: '', isCorrect: null },
        { english: 'some women', danish: 'nogle kvinder', userAnswer: '', isCorrect: null },
        { english: 'the women', danish: 'kvinderne', userAnswer: '', isCorrect: null },
        { english: 'a beautiful woman', danish: 'en smuk kvinde', userAnswer: '', isCorrect: null },
        { english: 'the beautiful woman', danish: 'den smukke kvinde', userAnswer: '', isCorrect: null },
        { english: 'beautiful women', danish: 'smukke kvinder', userAnswer: '', isCorrect: null },
        { english: 'some beautiful women', danish: 'nogle smukke kvinder', userAnswer: '', isCorrect: null },
        { english: 'the beautiful women', danish: 'de smukke kvinder', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Nogen • Forklare',
      description: 'Question with "nogen" (anyone) and modal verb',
      items: [
        { english: 'Can anyone explain it?', danish: 'Kan nogen forklare det?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Sukker • Fint',
      description: 'Neuter gender with the adjective "fin" (fine)',
      items: [
        { english: '*sugar', danish: 'sukker', userAnswer: '', isCorrect: null },
        { english: 'the sugar', danish: 'sukkeret', userAnswer: '', isCorrect: null },
        { english: 'some sugar', danish: 'noget sukker', userAnswer: '', isCorrect: null },
        { english: 'fine sugar', danish: 'fint sukker', userAnswer: '', isCorrect: null },
        { english: 'the fine sugar', danish: 'det fine sukker', userAnswer: '', isCorrect: null },
        { english: 'some fine sugar', danish: 'noget fint sukker', userAnswer: '', isCorrect: null },
        { english: 'four types of sugar', danish: 'fire typer sukker', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Fod • Beskidt',
      description: 'Common gender with the adjective "beskidt" (dirty)',
      items: [
        { english: 'foot (fod=8)', danish: 'fod', userAnswer: '', isCorrect: null },
        { english: 'a foot', danish: 'en fod', userAnswer: '', isCorrect: null },
        { english: 'the foot', danish: 'foden', userAnswer: '', isCorrect: null },
        { english: 'feet', danish: 'fødder', userAnswer: '', isCorrect: null },
        { english: 'some feet', danish: 'nogle fødder', userAnswer: '', isCorrect: null },
        { english: 'the feet', danish: 'fødderne', userAnswer: '', isCorrect: null },
        { english: 'a dirty foot', danish: 'en beskidt fod', userAnswer: '', isCorrect: null },
        { english: 'the dirty foot', danish: 'den beskidte fod', userAnswer: '', isCorrect: null },
        { english: 'dirty feet', danish: 'beskidte fødder', userAnswer: '', isCorrect: null },
        { english: 'some dirty feet', danish: 'nogle beskidte fødder', userAnswer: '', isCorrect: null },
        { english: 'the dirty feet', danish: 'de beskidte fødder', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Noget • Spørgsmål',
      description: 'Question with "noget" (anything)',
      items: [
        { english: 'Do you have anything to say?', danish: 'Har du noget at sige?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Tand • Knækket',
      description: 'Common gender with the adjective "knækket" (chipped/broken)',
      items: [
        { english: 'tooth (tand=7)', danish: 'tand', userAnswer: '', isCorrect: null },
        { english: 'a tooth', danish: 'en tand', userAnswer: '', isCorrect: null },
        { english: 'the tooth', danish: 'tanden', userAnswer: '', isCorrect: null },
        { english: 'teeth', danish: 'tænder', userAnswer: '', isCorrect: null },
        { english: 'some teeth', danish: 'nogle tænder', userAnswer: '', isCorrect: null },
        { english: 'the teeth', danish: 'tænderne', userAnswer: '', isCorrect: null },
        { english: 'a chipped tooth', danish: 'en knækket tand', userAnswer: '', isCorrect: null },
        { english: 'the chipped tooth', danish: 'den knækkede tand', userAnswer: '', isCorrect: null },
        { english: 'chipped teeth', danish: 'knækkede tænder', userAnswer: '', isCorrect: null },
        { english: 'some chipped teeth', danish: 'nogle knækkede tænder', userAnswer: '', isCorrect: null },
        { english: 'the chipped teeth', danish: 'de knækkede tænder', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Hånd • Kold',
      description: 'Common gender with the adjective "kold" (cold)',
      items: [
        { english: 'hand (hånd=7)', danish: 'hånd', userAnswer: '', isCorrect: null },
        { english: 'a hand', danish: 'en hånd', userAnswer: '', isCorrect: null },
        { english: 'the hand', danish: 'hånden', userAnswer: '', isCorrect: null },
        { english: 'hands', danish: 'hænder', userAnswer: '', isCorrect: null },
        { english: 'some hands', danish: 'nogle hænder', userAnswer: '', isCorrect: null },
        { english: 'the hands', danish: 'hænderne', userAnswer: '', isCorrect: null },
        { english: 'a cold hand', danish: 'en kold hånd', userAnswer: '', isCorrect: null },
        { english: 'the cold hand', danish: 'den kolde hånd', userAnswer: '', isCorrect: null },
        { english: 'cold hands', danish: 'kolde hænder', userAnswer: '', isCorrect: null },
        { english: 'some cold hands', danish: 'nogle kolde hænder', userAnswer: '', isCorrect: null },
        { english: 'the cold hands', danish: 'de kolde hænder', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Gås • Hvid',
      description: 'Common gender with the adjective "hvid" (white)',
      items: [
        { english: 'goose (gås=5)', danish: 'gås', userAnswer: '', isCorrect: null },
        { english: 'a goose', danish: 'en gås', userAnswer: '', isCorrect: null },
        { english: 'the goose', danish: 'gåsen', userAnswer: '', isCorrect: null },
        { english: 'geese', danish: 'gæs', userAnswer: '', isCorrect: null },
        { english: 'some geese', danish: 'nogle gæs', userAnswer: '', isCorrect: null },
        { english: 'the geese', danish: 'gæssene', userAnswer: '', isCorrect: null },
        { english: 'a white goose', danish: 'en hvid gås', userAnswer: '', isCorrect: null },
        { english: 'the white goose', danish: 'den hvide gås', userAnswer: '', isCorrect: null },
        { english: 'white geese', danish: 'hvide gæs', userAnswer: '', isCorrect: null },
        { english: 'some white geese', danish: 'nogle hvide gæs', userAnswer: '', isCorrect: null },
        { english: 'the white geese', danish: 'de hvide gæs', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Noget • Spise',
      description: 'Statement with "noget" (something)',
      items: [
        { english: 'We need to find something to eat.', danish: 'Vi skal finde noget at spise.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Bror • Lille',
      description: 'Common gender with the adjective "lille" (little/younger)',
      items: [
        { english: 'brother (bror=8)', danish: 'bror', userAnswer: '', isCorrect: null },
        { english: 'a brother', danish: 'en bror', userAnswer: '', isCorrect: null },
        { english: 'the brother', danish: 'broren', userAnswer: '', isCorrect: null },
        { english: 'brothers', danish: 'brødre', userAnswer: '', isCorrect: null },
        { english: 'some brothers', danish: 'nogle brødre', userAnswer: '', isCorrect: null },
        { english: 'the brothers', danish: 'brødrene', userAnswer: '', isCorrect: null },
        { english: 'a little brother', danish: 'en lille bror', userAnswer: '', isCorrect: null },
        { english: 'the little brother', danish: 'den lille bror', userAnswer: '', isCorrect: null },
        { english: 'little brothers', danish: 'små brødre', userAnswer: '', isCorrect: null },
        { english: 'some little brothers', danish: 'nogle små brødre', userAnswer: '', isCorrect: null },
        { english: 'the little brothers', danish: 'de små brødre', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Venner • Friends',
      description: 'Question with "nogen" (any) and "her" (here)',
      items: [
        { english: 'Do you have any friends here?', danish: 'Har du nogen venner her? (ven=2)', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Datter • Ældste',
      description: 'Common gender with the adjective "ældste" (eldest)',
      items: [
        { english: 'daughter (datter=8)', danish: 'datter', userAnswer: '', isCorrect: null },
        { english: 'a daughter', danish: 'en datter', userAnswer: '', isCorrect: null },
        { english: 'the daughter', danish: 'datteren', userAnswer: '', isCorrect: null },
        { english: 'daughters', danish: 'døtre', userAnswer: '', isCorrect: null },
        { english: 'some daughters', danish: 'nogle døtre', userAnswer: '', isCorrect: null },
        { english: 'the daughters', danish: 'døtrene', userAnswer: '', isCorrect: null },
        { english: 'an eldest daughter', danish: 'en ældste datter', userAnswer: '', isCorrect: null },
        { english: 'the eldest daughter', danish: 'den ældste datter', userAnswer: '', isCorrect: null },
        { english: 'eldest daughters', danish: 'ældste døtre', userAnswer: '', isCorrect: null },
        { english: 'some eldest daughters', danish: 'nogle ældste døtre', userAnswer: '', isCorrect: null },
        { english: 'the eldest daughters', danish: 'de ældste døtre', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Lys • Klart',
      description: 'Neuter gender with the adjective "klar" (bright)',
      items: [
        { english: '*light (lys=5)', danish: 'lys', userAnswer: '', isCorrect: null },
        { english: 'a light', danish: 'et lyset', userAnswer: '', isCorrect: null },
        { english: 'the light', danish: 'lyset', userAnswer: '', isCorrect: null },
        { english: 'some light', danish: 'noget lys', userAnswer: '', isCorrect: null },
        { english: 'some lights', danish: 'nogle lys', userAnswer: '', isCorrect: null },
        { english: 'bright light', danish: 'klart lys', userAnswer: '', isCorrect: null },
        { english: 'the bright light', danish: 'det klare lys', userAnswer: '', isCorrect: null },
        { english: 'some bright lights', danish: 'nogle klare lys', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Mennesker • People',
      description: 'Negative with "ingen" (no people)',
      items: [
        { english: 'There are no people here.', danish: 'Der er ingen mennesker her.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Børn • Children',
      description: 'Negative with "ingen" (no children)',
      items: [
        { english: 'She has no children.', danish: 'Hun har ingen børn.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Kød • Råt',
      description: 'Neuter gender with the adjective "rå" (raw)',
      items: [
        { english: '*meat (kød=5)', danish: 'kød', userAnswer: '', isCorrect: null },
        { english: 'a meat', danish: 'et kød', userAnswer: '', isCorrect: null },
        { english: 'the meat', danish: 'kødet', userAnswer: '', isCorrect: null },
        { english: 'meats', danish: 'kød', userAnswer: '', isCorrect: null },
        { english: 'some meats', danish: 'nogle kød', userAnswer: '', isCorrect: null },
        { english: 'the meats', danish: 'kødene', userAnswer: '', isCorrect: null },
        { english: 'raw meat', danish: 'råt kød', userAnswer: '', isCorrect: null },
        { english: 'the raw meat', danish: 'det rå kød', userAnswer: '', isCorrect: null },
        { english: 'raw meats', danish: 'rå kød', userAnswer: '', isCorrect: null },
        { english: 'some raw meats', danish: 'nogle rå kød', userAnswer: '', isCorrect: null },
        { english: 'the raw meats', danish: 'de rå kød', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Problemer • Problems',
      description: 'Negative with "ingen" (no problems)',
      items: [
        { english: 'We have no problems. (problem=1)', danish: 'Vi har ingen problemer.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Grund • Reason',
      description: 'Negative with "ingen" (no reason • no as an adjective)',
      items: [
        { english: 'There is no reason to wait. (grund=3)', danish: 'Der er ingen grund til at vente.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Nothing',
      description: 'Negative with "intet" (nothing - common gender)',
      items: [
        { english: 'I know nothing.', danish: 'Jeg ved intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • No Problem',
      description: 'Negative with "intet" (no - neuter gender)',
      items: [
        { english: 'There is no problem.', danish: 'Der er intet problem.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Saw Nothing',
      description: 'Negative with "intet" (nothing)',
      items: [
        { english: 'I saw nothing.', danish: 'Jeg så intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Said Nothing',
      description: 'Negative with "intet" (nothing)',
      items: [
        { english: 'He said nothing.', danish: 'Han sagde intet.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Brød • Sprødt',
      description: 'Neuter gender with the adjective "sprød" (crispy)',
      items: [
        { english: '*bread (brød=5)', danish: 'brød', userAnswer: '', isCorrect: null },
        { english: 'a bread', danish: 'et brød', userAnswer: '', isCorrect: null },
        { english: 'the bread', danish: 'brødet', userAnswer: '', isCorrect: null },
        { english: 'breads', danish: 'brød', userAnswer: '', isCorrect: null },
        { english: 'some breads', danish: 'nogle brød', userAnswer: '', isCorrect: null },
        { english: 'the breads', danish: 'brødene', userAnswer: '', isCorrect: null },
        { english: 'crispy bread', danish: 'sprødt brød', userAnswer: '', isCorrect: null },
        { english: 'the crispy bread', danish: 'det sprøde brød', userAnswer: '', isCorrect: null },
        { english: 'crispy breads', danish: 'sprøde brød', userAnswer: '', isCorrect: null },
        { english: 'some crispy breads', danish: 'nogle sprøde brød', userAnswer: '', isCorrect: null },
        { english: 'the crispy breads', danish: 'de sprøde brød', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet Nyt • Nothing New',
      description: 'Negative with "intet" (nothing new)',
      items: [
        { english: 'There is nothing new.', danish: 'Der er intet nyt.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Noget • Udenfor',
      description: 'Statement with "noget" (something)',
      items: [
        { english: 'I heard something outside.', danish: 'Jeg hørte noget udenfor.', userAnswer: '', isCorrect: null }
      ]
    },
            {
      name: 'Mus • Vågen',
      description: 'Common gender with the adjective "vågen" (alert)',
      items: [
        { english: 'mouse (mus=5)', danish: 'mus', userAnswer: '', isCorrect: null },
        { english: 'a mouse', danish: 'en mus', userAnswer: '', isCorrect: null },
        { english: 'the mouse', danish: 'musen', userAnswer: '', isCorrect: null },
        { english: 'mice', danish: 'mus', userAnswer: '', isCorrect: null },
        { english: 'some mice', danish: 'nogle mus', userAnswer: '', isCorrect: null },
        { english: 'the mice', danish: 'musene', userAnswer: '', isCorrect: null },
        { english: 'an alert mouse', danish: 'en vågen mus', userAnswer: '', isCorrect: null },
        { english: 'the alert mouse', danish: 'den vågne mus', userAnswer: '', isCorrect: null },
        { english: 'alert mice', danish: 'vågne mus', userAnswer: '', isCorrect: null },
        { english: 'some alert mice', danish: 'nogle vågne mus', userAnswer: '', isCorrect: null },
        { english: 'the alert mice', danish: 'de vågne mus', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ko • Brun',
      description: 'Common gender with the adjective "brun" (brown)',
      items: [
        { english: 'cow (ko=7)', danish: 'ko', userAnswer: '', isCorrect: null },
        { english: 'a cow', danish: 'en ko', userAnswer: '', isCorrect: null },
        { english: 'the cow', danish: 'koen', userAnswer: '', isCorrect: null },
        { english: 'cows', danish: 'køer', userAnswer: '', isCorrect: null },
        { english: 'some cows', danish: 'nogle køer', userAnswer: '', isCorrect: null },
        { english: 'the cows', danish: 'køerne', userAnswer: '', isCorrect: null },
        { english: 'a brown cow', danish: 'en brun ko', userAnswer: '', isCorrect: null },
        { english: 'the brown cow', danish: 'den brune ko', userAnswer: '', isCorrect: null },
        { english: 'brown cows', danish: 'brune køer', userAnswer: '', isCorrect: null },
        { english: 'some brown cows', danish: 'nogle brune køer', userAnswer: '', isCorrect: null },
        { english: 'the brown cows', danish: 'de brune køer', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Noget • Hjælp',
      description: 'Question offering help with "noget" (anything)',
      items: [
        { english: 'Can I do anything for you?', danish: 'Kan jeg gøre noget for dig?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Luft • Frisk',
      description: 'Common gender with the adjective "frisk" (fresh)',
      items: [
        { english: 'air', danish: 'luft', userAnswer: '', isCorrect: null },
        { english: 'the air', danish: 'luften', userAnswer: '', isCorrect: null },
        { english: 'some air', danish: 'noget luft', userAnswer: '', isCorrect: null },
        { english: 'fresh air', danish: 'frisk luft', userAnswer: '', isCorrect: null },
        { english: 'the fresh air', danish: 'den friske luft', userAnswer: '', isCorrect: null },
        { english: 'some fresh air', danish: 'noget frisk luft', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Nat • Mørk',
      description: 'Common gender with the adjective "mørk" (dark)',
      items: [
        { english: 'night (nat=8)', danish: 'nat', userAnswer: '', isCorrect: null },
        { english: 'a night', danish: 'en nat', userAnswer: '', isCorrect: null },
        { english: 'the night', danish: 'natten', userAnswer: '', isCorrect: null },
        { english: 'nights', danish: 'nætter', userAnswer: '', isCorrect: null },
        { english: 'some nights', danish: 'nogle nætter', userAnswer: '', isCorrect: null },
        { english: 'the nights', danish: 'nætterne', userAnswer: '', isCorrect: null },
        { english: 'a dark night', danish: 'en mørk nat', userAnswer: '', isCorrect: null },
        { english: 'the dark night', danish: 'den mørke nat', userAnswer: '', isCorrect: null },
        { english: 'dark nights', danish: 'mørke nætter', userAnswer: '', isCorrect: null },
        { english: 'some dark nights', danish: 'nogle mørke nætter', userAnswer: '', isCorrect: null },
        { english: 'the dark nights', danish: 'de mørke nætter', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Nogen • Hjælpe',
      description: 'Statement with "nogen" (someone) and modal verb',
      items: [
        { english: 'Someone must help her.', danish: 'Nogen skal hjælpe hende.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'By • Stor',
      description: 'Common gender with the adjective "stor" (big)',
      items: [
        { english: 'city (by=1)', danish: 'by', userAnswer: '', isCorrect: null },
        { english: 'a city', danish: 'en by', userAnswer: '', isCorrect: null },
        { english: 'the city', danish: 'byen', userAnswer: '', isCorrect: null },
        { english: 'cities', danish: 'byer', userAnswer: '', isCorrect: null },
        { english: 'some cities', danish: 'nogle byer', userAnswer: '', isCorrect: null },
        { english: 'the cities', danish: 'byerne', userAnswer: '', isCorrect: null },
        { english: 'a big city', danish: 'en stor by', userAnswer: '', isCorrect: null },
        { english: 'the big city', danish: 'den store by', userAnswer: '', isCorrect: null },
        { english: 'big cities', danish: 'store byer', userAnswer: '', isCorrect: null },
        { english: 'some big cities', danish: 'nogle store byer', userAnswer: '', isCorrect: null },
        { english: 'the big cities', danish: 'de store byer', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Noget • Butik',
      description: 'Statement with "noget" (something)',
      items: [
        { english: 'She bought something in the shop.', danish: 'Hun købte noget i butikken.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Land • Vigtigt',
      description: 'Neuter gender with the adjective "vigtig" (important)',
      items: [
        { english: '*country (land=3)', danish: 'land', userAnswer: '', isCorrect: null },
        { english: 'a country', danish: 'et land', userAnswer: '', isCorrect: null },
        { english: 'the country', danish: 'landet', userAnswer: '', isCorrect: null },
        { english: 'countries', danish: 'lande', userAnswer: '', isCorrect: null },
        { english: 'some countries', danish: 'nogle lande', userAnswer: '', isCorrect: null },
        { english: 'the countries', danish: 'landene', userAnswer: '', isCorrect: null },
        { english: 'an important country', danish: 'et vigtigt land', userAnswer: '', isCorrect: null },
        { english: 'the important country', danish: 'det vigtige land', userAnswer: '', isCorrect: null },
        { english: 'important countries', danish: 'vigtige lande', userAnswer: '', isCorrect: null },
        { english: 'some important countries', danish: 'nogle vigtige lande', userAnswer: '', isCorrect: null },
        { english: 'the important countries', danish: 'de vigtige lande', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Skeer • Spoons',
      description: 'Informal question with "nogen" (any)',
      items: [
        { english: 'Do you have any spoons? (ske=1)', danish: 'Har du nogen skeer?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Pakke • Let',
      description: 'Common gender with the adjective "let" (light)',
      items: [
        { english: 'package (pakke=4)', danish: 'pakke', userAnswer: '', isCorrect: null },
        { english: 'a package', danish: 'en pakke', userAnswer: '', isCorrect: null },
        { english: 'the package', danish: 'pakken', userAnswer: '', isCorrect: null },
        { english: 'packages', danish: 'pakker', userAnswer: '', isCorrect: null },
        { english: 'some packages', danish: 'nogle pakker', userAnswer: '', isCorrect: null },
        { english: 'the packages', danish: 'pakkerne', userAnswer: '', isCorrect: null },
        { english: 'a light package', danish: 'en let pakke', userAnswer: '', isCorrect: null },
        { english: 'the light package', danish: 'den lette pakke', userAnswer: '', isCorrect: null },
        { english: 'light packages', danish: 'lette pakker', userAnswer: '', isCorrect: null },
        { english: 'some light packages', danish: 'nogle lette pakker', userAnswer: '', isCorrect: null },
        { english: 'the light packages', danish: 'de lette pakker', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Vand • Løbende',
      description: 'Neuter gender with the participle "løbende" (running)',
      items: [
        { english: '*water', danish: 'vand', userAnswer: '', isCorrect: null },
        { english: 'the water', danish: 'vandet', userAnswer: '', isCorrect: null },
        { english: 'some water', danish: 'noget vand', userAnswer: '', isCorrect: null },
        { english: 'running water', danish: 'løbende vand', userAnswer: '', isCorrect: null },
        { english: 'the running water', danish: 'det løbende vand', userAnswer: '', isCorrect: null },
        { english: 'some running water', danish: 'noget løbende vand', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Træ • Højt',
      description: 'Neuter gender with the adjective "høj" (tall)',
      items: [
        { english: '*tree (træ=1)', danish: 'træ', userAnswer: '', isCorrect: null },
        { english: 'a tree', danish: 'et træ', userAnswer: '', isCorrect: null },
        { english: 'the tree', danish: 'træet', userAnswer: '', isCorrect: null },
        { english: 'trees', danish: 'træer', userAnswer: '', isCorrect: null },
        { english: 'some trees', danish: 'nogle træer', userAnswer: '', isCorrect: null },
        { english: 'the trees', danish: 'træerne', userAnswer: '', isCorrect: null },
        { english: 'a tall tree', danish: 'et højt træ', userAnswer: '', isCorrect: null },
        { english: 'the tall tree', danish: 'det høje træ', userAnswer: '', isCorrect: null },
        { english: 'tall trees', danish: 'høje træer', userAnswer: '', isCorrect: null },
        { english: 'some tall trees', danish: 'nogle høje træer', userAnswer: '', isCorrect: null },
        { english: 'the tall trees', danish: 'de høje træer', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Noget • Taske',
      description: 'Question about something in a bag',
      items: [
        { english: 'Is there anything in the bag? (taske=4)', danish: 'Er der noget i tasken?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Øje • Blåt',
      description: 'Neuter gender with the adjective "blå" (blue)',
      items: [
        { english: '*eye (øje=9)', danish: 'øje', userAnswer: '', isCorrect: null },
        { english: 'an eye', danish: 'et øje', userAnswer: '', isCorrect: null },
        { english: 'the eye', danish: 'øjet', userAnswer: '', isCorrect: null },
        { english: 'eyes', danish: 'øjne', userAnswer: '', isCorrect: null },
        { english: 'some eyes', danish: 'nogle øjne', userAnswer: '', isCorrect: null },
        { english: 'the eyes', danish: 'øjnene', userAnswer: '', isCorrect: null },
        { english: 'a blue eye', danish: 'et blåt øje', userAnswer: '', isCorrect: null },
        { english: 'the blue eye', danish: 'det blå øje', userAnswer: '', isCorrect: null },
        { english: 'blue eyes', danish: 'blå øjne', userAnswer: '', isCorrect: null },
        { english: 'some blue eyes', danish: 'nogle blå øjne', userAnswer: '', isCorrect: null },
        { english: 'the blue eyes', danish: 'de blå øjne', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Moder • Ung',
      description: 'Common gender with the adjective "ung" (young)',
      items: [
        { english: 'mother (moder=7)', danish: 'moder', userAnswer: '', isCorrect: null },
        { english: 'a mother', danish: 'en moder', userAnswer: '', isCorrect: null },
        { english: 'the mother', danish: 'moderen', userAnswer: '', isCorrect: null },
        { english: 'mothers', danish: 'mødre', userAnswer: '', isCorrect: null },
        { english: 'some mothers', danish: 'nogle mødre', userAnswer: '', isCorrect: null },
        { english: 'the mothers', danish: 'mødrene', userAnswer: '', isCorrect: null },
        { english: 'a young mother', danish: 'en ung moder', userAnswer: '', isCorrect: null },
        { english: 'the young mother', danish: 'den unge moder', userAnswer: '', isCorrect: null },
        { english: 'young mothers', danish: 'unge mødre', userAnswer: '', isCorrect: null },
        { english: 'some young mothers', danish: 'nogle unge mødre', userAnswer: '', isCorrect: null },
        { english: 'the young mothers', danish: 'de unge mødre', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Penge • Money',
      description: 'Negative with "ingen" (no money)',
      items: [
        { english: 'I have no money.', danish: 'Jeg har ingen penge.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Nogen • Spørge',
      description: 'Question with "nogen" (anyone as a pronoun) and relative clause',
      items: [
        { english: 'Is there anyone who wants to ask something?', danish: 'Er der nogen, der vil spørge om noget?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Fader • Glad',
      description: 'Common gender with the adjective "glad" (happy)',
      items: [
        { english: 'father (fader=7)', danish: 'fader', userAnswer: '', isCorrect: null },
        { english: 'a father', danish: 'en fader', userAnswer: '', isCorrect: null },
        { english: 'the father', danish: 'faderen', userAnswer: '', isCorrect: null },
        { english: 'fathers', danish: 'fædre', userAnswer: '', isCorrect: null },
        { english: 'some fathers', danish: 'nogle fædre', userAnswer: '', isCorrect: null },
        { english: 'the fathers', danish: 'fædrene', userAnswer: '', isCorrect: null },
        { english: 'a happy father', danish: 'en glad fader', userAnswer: '', isCorrect: null },
        { english: 'the happy father', danish: 'den glade fader', userAnswer: '', isCorrect: null },
        { english: 'happy fathers', danish: 'glade fædre', userAnswer: '', isCorrect: null },
        { english: 'some happy fathers', danish: 'nogle glade fædre', userAnswer: '', isCorrect: null },
        { english: 'the happy fathers', danish: 'de glade fædre', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Ingen • Møde',
      description: 'Negative with "ingen" (none as a pronoun - meeting)',
      items: [
        { english: 'None were ready for the meeting. (møde=4)', danish: 'Ingen var klar til mødet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Bøger',
      description: 'Negative with "ingen" (none as a pronoun - books)',
      items: [
        { english: 'None of the books are mine.', danish: 'Ingen af bøgerne er mine.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Storm',
      description: 'Negative with "ingen" (none as a pronoun - storm)',
      items: [
        { english: 'None survived the storm. (storm=3)', danish: 'Ingen overlevede stormen.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Døre',
      description: 'Negative with "ingen" (none - doors)',
      items: [
        { english: 'None of the doors were open.', danish: 'Ingen af dørene var åbne.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Diskussion',
      description: 'Negative with "ingen" (none as a pronoun - discussion)',
      items: [
        { english: 'None remained after the discussion. (diskussion=1)', danish: 'Ingen blev tilbage efter diskussionen.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Gæster',
      description: 'Negative with "ingen" (none as a pronoun - guests)',
      items: [
        { english: 'None of the guests arrived on time. (gæst=1)', danish: 'Ingen af gæsterne ankom til tiden.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Forslag',
      description: 'Negative with "ingen" (none as a pronoun - proposal)',
      items: [
        { english: 'None were interested in the proposal. (forslag=5)', danish: 'Ingen var interesseret i forslaget.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Lys',
      description: 'Negative with "ingen" (none as a pronoun - lights)',
      items: [
        { english: 'None of the lights were on.', danish: 'Ingen af lysene var tændt.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Studerende',
      description: 'Negative with "ingen" (none as a pronoun - students)',
      items: [
        { english: 'None of the students understood the question. (*spørgsmål=5)', danish: 'Ingen af de studerende forstod spørgsmålet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ingen • Svar',
      description: 'Negative with "ingen" (none as a pronoun - answers)',
      items: [
        { english: 'None of the answers were correct. (svar=5)', danish: 'Ingen af svarene var korrekte.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Endelse • Definite',
      description: 'Common gender with adjectives',
      items: [
        { english: 'ending (endelse=4)', danish: 'endelse', userAnswer: '', isCorrect: null },
        { english: 'an ending', danish: 'en endelse', userAnswer: '', isCorrect: null },
        { english: 'the ending', danish: 'endelsen', userAnswer: '', isCorrect: null },
        { english: 'endings', danish: 'endelser', userAnswer: '', isCorrect: null },
        { english: 'some endings', danish: 'nogle endelser', userAnswer: '', isCorrect: null },
        { english: 'the endings', danish: 'endelserne', userAnswer: '', isCorrect: null },
        { english: 'a definite ending', danish: 'en bestemt endelse', userAnswer: '', isCorrect: null },
        { english: 'the definite ending', danish: 'den bestemte endelse', userAnswer: '', isCorrect: null },
        { english: 'definite endings', danish: 'bestemte endelser', userAnswer: '', isCorrect: null },
        { english: 'some definite endings', danish: 'nogle bestemte endelser', userAnswer: '', isCorrect: null },
        { english: 'the definite endings', danish: 'de bestemte endelser', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Himmel • Mørk',
      description: 'Common gender with the adjective "mørk" (dark) - usually no plural',
      items: [
        { english: 'sky (himmel)', danish: 'himmel', userAnswer: '', isCorrect: null },
        { english: 'a sky', danish: 'en himmel', userAnswer: '', isCorrect: null },
        { english: 'the sky', danish: 'himlen', userAnswer: '', isCorrect: null },
        { english: 'a dark sky', danish: 'en mørk himmel', userAnswer: '', isCorrect: null },
        { english: 'the dark sky', danish: 'den mørke himmel', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Gammel • Old',
      description: 'Irregular adjective "old"',
      items: [
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'an old house', danish: 'et gammelt hus', userAnswer: '', isCorrect: null },
        { english: 'the old house', danish: 'det gamle hus', userAnswer: '', isCorrect: null },
        { english: 'old houses', danish: 'gamle huse', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'an old car', danish: 'en gammel bil', userAnswer: '', isCorrect: null },
        { english: 'the old car', danish: 'den gamle bil', userAnswer: '', isCorrect: null },
        { english: 'old cars', danish: 'gamle biler', userAnswer: '', isCorrect: null },
        { english: 'a book', danish: 'en bog', userAnswer: '', isCorrect: null },
        { english: 'an old book', danish: 'en gammel bog', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • Her',
      description: 'Question with "nogen" (anyone)',
      items: [
        { english: 'Is anyone here?', danish: 'Er der nogen her?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Lille • Small',
      description: 'Irregular adjective "small/little"',
      items: [
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a small house', danish: 'et lille hus', userAnswer: '', isCorrect: null },
        { english: 'the small house', danish: 'det lille hus', userAnswer: '', isCorrect: null },
        { english: 'small houses', danish: 'små huse', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'a small car', danish: 'en lille bil', userAnswer: '', isCorrect: null },
        { english: 'the small car', danish: 'den lille bil', userAnswer: '', isCorrect: null },
        { english: 'small cars', danish: 'små biler', userAnswer: '', isCorrect: null },
        { english: 'a child', danish: 'et barn', userAnswer: '', isCorrect: null },
        { english: 'a small child', danish: 'et lille barn', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Noget • Usædvanligt',
      description: 'Question with "noget" and adjective',
      items: [
        { english: 'Do you see anything unusual?', danish: 'Ser du noget usædvanligt?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Guld • Rent',
      description: 'Neuter gender with the adjective "ren" (pure)',
      items: [
        { english: 'gold', danish: 'guld', userAnswer: '', isCorrect: null },
        { english: 'the gold', danish: 'guldet', userAnswer: '', isCorrect: null },
        { english: 'some gold', danish: 'noget guld', userAnswer: '', isCorrect: null },
        { english: 'pure gold', danish: 'rent guld', userAnswer: '', isCorrect: null },
        { english: 'the pure gold', danish: 'det rene guld', userAnswer: '', isCorrect: null },
        { english: 'some pure gold', danish: 'noget rent guld', userAnswer: '', isCorrect: null },
        { english: 'several bars of gold', danish: 'flere barer guld', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Stor • Big',
      description: 'Irregular adjective "big"',
      items: [
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a big house', danish: 'et stort hus', userAnswer: '', isCorrect: null },
        { english: 'the big house', danish: 'det store hus', userAnswer: '', isCorrect: null },
        { english: 'big houses', danish: 'store huse', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'a big car', danish: 'en stor bil', userAnswer: '', isCorrect: null },
        { english: 'the big car', danish: 'den store bil', userAnswer: '', isCorrect: null },
        { english: 'big cars', danish: 'store biler', userAnswer: '', isCorrect: null },
        { english: 'a book', danish: 'en bog', userAnswer: '', isCorrect: null },
        { english: 'a big book', danish: 'en stor bog', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Nogen • Hjemme',
      description: 'Informal question with "nogen" (anybody)',
      items: [
        { english: 'Anybody home?', danish: 'Er der nogen hjemme?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Ny • New',
      description: 'Regular adjective "new"',
      items: [
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a new house', danish: 'et nyt hus', userAnswer: '', isCorrect: null },
        { english: 'the new house', danish: 'det nye hus', userAnswer: '', isCorrect: null },
        { english: 'new houses', danish: 'nye huse', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'a new car', danish: 'en ny bil', userAnswer: '', isCorrect: null },
        { english: 'the new car', danish: 'den nye bil', userAnswer: '', isCorrect: null },
        { english: 'new cars', danish: 'nye biler', userAnswer: '', isCorrect: null },
        { english: 'a book', danish: 'en bog', userAnswer: '', isCorrect: null },
        { english: 'a new book', danish: 'en ny bog', userAnswer: '', isCorrect: null },
      ]
    },
        {
      name: 'Mennesker • Human Beings (people)',
      description: 'Negative with "ingen" (no people)',
      items: [ 
        { english: 'There are no people here.', danish: 'Der er ingen mennesker her.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Børn • Children',
      description: 'Negative with "ingen" (no children)',
      items: [
        { english: 'She has no children.', danish: 'Hun har ingen børn.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Problemer • Problems',
      description: 'Negative with "ingen" (no problems)',
      items: [
        { english: 'We have no problems.', danish: 'Vi har ingen problemer.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Studerende • Flittig',
      description: 'Common gender with the adjective "flittig" (diligent)',
      items: [
        { english: 'student (studerende=5)', danish: 'studerende', userAnswer: '', isCorrect: null },
        { english: 'a student', danish: 'en studerende', userAnswer: '', isCorrect: null },
        { english: 'the student', danish: 'den studerende', userAnswer: '', isCorrect: null },
        { english: 'students', danish: 'studerende', userAnswer: '', isCorrect: null },
        { english: 'some students', danish: 'nogle studerende', userAnswer: '', isCorrect: null },
        { english: 'the students', danish: 'de studerende', userAnswer: '', isCorrect: null },
        { english: 'a diligent student', danish: 'en flittig studerende', userAnswer: '', isCorrect: null },
        { english: 'the diligent student', danish: 'den flittige studerende', userAnswer: '', isCorrect: null },
        { english: 'diligent students', danish: 'flittige studerende', userAnswer: '', isCorrect: null },
        { english: 'some diligent students', danish: 'nogle flittige studerende', userAnswer: '', isCorrect: null },
        { english: 'the diligent students', danish: 'de flittige studerende', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Grund • Reason',
      description: 'Negative with "ingen" (no reason)',
      items: [
        { english: 'There is no reason to wait.', danish: 'Der er ingen grund til at vente.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Nothing',
      description: 'Negative with "intet" (nothing - common gender)',
      items: [
        { english: 'I know nothing.', danish: 'Jeg ved intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • No Problem',
      description: 'Negative with "intet" (no - neuter gender)',
      items: [
        { english: 'There is no problem.', danish: 'Der er intet problem.', userAnswer: '', isCorrect: null }
      ]
    },
        {
      name: 'Praksis • Svindlerisk',
      description: 'Common gender with the adjective "svindlerisk" (fraudulent)',
      items: [
        { english: 'practice (praksis=2)', danish: 'praksis', userAnswer: '', isCorrect: null },
        { english: 'a practice', danish: 'en praksis', userAnswer: '', isCorrect: null },
        { english: 'the practice', danish: 'praksissen', userAnswer: '', isCorrect: null },
        { english: 'practices', danish: 'praksisser', userAnswer: '', isCorrect: null },
        { english: 'some practices', danish: 'nogle praksisser', userAnswer: '', isCorrect: null },
        { english: 'the practices', danish: 'praksisserne', userAnswer: '', isCorrect: null },
        { english: 'a fraudulent practice', danish: 'en svindlerisk praksis', userAnswer: '', isCorrect: null },
        { english: 'the fraudulent practice', danish: 'den svindleriske praksis', userAnswer: '', isCorrect: null },
        { english: 'fraudulent practices', danish: 'svindleriske praksisser', userAnswer: '', isCorrect: null },
        { english: 'some fraudulent practices', danish: 'nogle svindleriske praksisser', userAnswer: '', isCorrect: null },
        { english: 'the fraudulent practices', danish: 'de svindleriske praksisser', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Saw Nothing',
      description: 'Negative with "intet" (nothing)',
      items: [
        { english: 'I saw nothing.', danish: 'Jeg så intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet • Said Nothing',
      description: 'Negative with "intet" (nothing)',
      items: [
        { english: 'He said nothing.', danish: 'Han sagde intet.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Intet Nyt • Nothing New',
      description: 'Negative with "intet" (nothing new)',
      items: [
        { english: 'There is nothing new.', danish: 'Der er intet nyt.', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'God • Good',
      description: 'Irregular adjective "good"',
      items: [
        { english: 'a book', danish: 'en bog', userAnswer: '', isCorrect: null },
        { english: 'a good book', danish: 'en god bog', userAnswer: '', isCorrect: null },
        { english: 'the good book', danish: 'den gode bog', userAnswer: '', isCorrect: null },
        { english: 'good books', danish: 'gode bøger', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'a good car', danish: 'en god bil', userAnswer: '', isCorrect: null },
        { english: 'the good car', danish: 'den gode bil', userAnswer: '', isCorrect: null },
        { english: 'good cars', danish: 'gode biler', userAnswer: '', isCorrect: null },
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a good house', danish: 'et godt hus', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Dårlig • Bad',
      description: 'Regular adjective "bad"',
      items: [
        { english: 'a book', danish: 'en bog', userAnswer: '', isCorrect: null },
        { english: 'a bad book', danish: 'en dårlig bog', userAnswer: '', isCorrect: null },
        { english: 'the bad book', danish: 'den dårlige bog', userAnswer: '', isCorrect: null },
        { english: 'bad books', danish: 'dårlige bøger', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'a bad car', danish: 'en dårlig bil', userAnswer: '', isCorrect: null },
        { english: 'the bad car', danish: 'den dårlige bil', userAnswer: '', isCorrect: null },
        { english: 'bad cars', danish: 'dårlige biler', userAnswer: '', isCorrect: null },
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a bad house', danish: 'et dårligt hus', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Sæbe • Højkvalitets',
      description: 'Common gender with the adjective "højkvalitets" (high-quality)',
      items: [
        { english: 'soap (sæbe)', danish: 'sæbe', userAnswer: '', isCorrect: null },
        { english: 'the soap', danish: 'sæben', userAnswer: '', isCorrect: null },
        { english: 'some soap', danish: 'noget sæbe', userAnswer: '', isCorrect: null },
        { english: 'high-quality soap', danish: 'højkvalitets sæbe', userAnswer: '', isCorrect: null },
        { english: 'the high-quality soap', danish: 'den højkvalitets sæbe', userAnswer: '', isCorrect: null },
        { english: 'some high-quality soap', danish: 'noget højkvalitets sæbe', userAnswer: '', isCorrect: null },
        { english: 'several bars of soap', danish: 'flere stykker sæbe', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Smuk • Beautiful',
      description: 'Irregular adjective "beautiful"',
      items: [
        { english: 'a woman', danish: 'en kvinde', userAnswer: '', isCorrect: null },
        { english: 'a beautiful woman', danish: 'en smuk kvinde', userAnswer: '', isCorrect: null },
        { english: 'the beautiful woman', danish: 'den smukke kvinde', userAnswer: '', isCorrect: null },
        { english: 'beautiful women', danish: 'smukke kvinder', userAnswer: '', isCorrect: null },
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a beautiful house', danish: 'et smukt hus', userAnswer: '', isCorrect: null },
        { english: 'the beautiful house', danish: 'det smukke hus', userAnswer: '', isCorrect: null },
        { english: 'beautiful houses', danish: 'smukke huse', userAnswer: '', isCorrect: null },
        { english: 'a car', danish: 'en bil', userAnswer: '', isCorrect: null },
        { english: 'a beautiful car', danish: 'en smuk bil', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Noget • Få',
      description: 'Question with "noget" (something)',
      items: [
        { english: 'Are you going to have something?', danish: 'Skal du have noget?', userAnswer: '', isCorrect: null }
      ]
    },
    {
      name: 'Varm • Warm',
      description: 'Regular adjective "warm"',
      items: [
        { english: 'a day', danish: 'en dag', userAnswer: '', isCorrect: null },
        { english: 'a warm day', danish: 'en varm dag', userAnswer: '', isCorrect: null },
        { english: 'the warm day', danish: 'den varme dag', userAnswer: '', isCorrect: null },
        { english: 'warm days', danish: 'varme dage', userAnswer: '', isCorrect: null },
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a warm house', danish: 'et varmt hus', userAnswer: '', isCorrect: null },
        { english: 'the warm house', danish: 'det varme hus', userAnswer: '', isCorrect: null },
        { english: 'warm houses', danish: 'varme huse', userAnswer: '', isCorrect: null },
        { english: 'a coffee', danish: 'en kaffe', userAnswer: '', isCorrect: null },
        { english: 'a warm coffee', danish: 'en varm kaffe', userAnswer: '', isCorrect: null },
      ]
    },
    {
      name: 'Kold • Cold',
      description: 'Regular adjective "cold"',
      items: [
        { english: 'a day', danish: 'en dag', userAnswer: '', isCorrect: null },
        { english: 'a cold day', danish: 'en kold dag', userAnswer: '', isCorrect: null },
        { english: 'the cold day', danish: 'den kolde dag', userAnswer: '', isCorrect: null },
        { english: 'cold days', danish: 'kolde dage', userAnswer: '', isCorrect: null },
        { english: 'a house', danish: 'et hus', userAnswer: '', isCorrect: null },
        { english: 'a cold house', danish: 'et koldt hus', userAnswer: '', isCorrect: null },
        { english: 'the cold house', danish: 'det kolde hus', userAnswer: '', isCorrect: null },
        { english: 'cold houses', danish: 'kolde huse', userAnswer: '', isCorrect: null },
        { english: 'a drink', danish: 'en drink', userAnswer: '', isCorrect: null },
        { english: 'a cold drink', danish: 'en kold drink', userAnswer: '', isCorrect: null },
      ]
    }

  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>(allExerciseSets);
  const [showResults, setShowResults] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const [completedSets, setCompletedSets] = useState<boolean[]>([]);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const currentSet = exerciseSets[currentSetIndex];
  const exercises = currentSet.items;

  const totalCorrect = exerciseSets.reduce((t, s) => t + s.items.filter(i => i.isCorrect === true).length, 0);
  const totalItems = exerciseSets.reduce((t, s) => t + s.items.length, 0);
  const correctCount = exercises.filter(ex => ex.isCorrect === true).length;

  // Auto-focus first input on set change
  useEffect(() => {
    setTimeout(() => firstInputRef.current?.focus(), 50);
  }, [currentSetIndex]);

  const handleInputChange = (index: number, value: string) => {
    const newSets = [...exerciseSets];
    newSets[currentSetIndex].items[index].userAnswer = value;
    newSets[currentSetIndex].items[index].isCorrect = null;
    setExerciseSets(newSets);
    setShowResults(false);
    setAllCorrect(false);
  };

  const checkAnswers = () => {
    const newSets = [...exerciseSets];
    let correct = true;
    newSets[currentSetIndex].items.forEach(ex => {
      const ok = ex.userAnswer.trim().toLowerCase() === ex.danish.toLowerCase();
      ex.isCorrect = ok;
      if (!ok) correct = false;
    });
    setExerciseSets(newSets);
    setShowResults(true);
    setAllCorrect(correct);
    if (correct) {
      const newCompleted = [...completedSets];
      newCompleted[currentSetIndex] = true;
      setCompletedSets(newCompleted);
    }
  };

  const resetCurrentSet = () => {
    const newSets = [...exerciseSets];
    newSets[currentSetIndex].items = exercises.map(ex => ({
      ...ex, userAnswer: '', isCorrect: null
    }));
    setExerciseSets(newSets);
    setShowResults(false);
    setAllCorrect(false);
  };

  const goTo = (idx: number) => {
    setCurrentSetIndex(idx);
    setShowResults(false);
    setAllCorrect(false);
  };

  // Handle Enter key to advance through inputs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = document.querySelectorAll<HTMLInputElement>('.exercise-input');
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        checkAnswers();
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: DS.parchment,
      fontFamily: DS.sans,
    }}>
      {/* ── Header ── */}
      <header style={{
        background: DS.rust,
        color: '#fff',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(139,69,19,0.3)',
      }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          {/* Logo / Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Image src="/images/danish/dk.svg" alt="Danish flag" width={22} height={16} />
              <Image src="/images/danish/ukk.png" alt="UK flag" width={22} height={16} />
            </div>
            <div>
              <div style={{ fontFamily: DS.serif, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                Øvelse 1
              </div>
              <div style={{ fontSize: '0.6rem', opacity: 0.8, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Sokratisk Skole · Danish
              </div>
            </div>
          </div>

          {/* Score chips */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <ScoreChip label="Sæt" correct={correctCount} total={exercises.length} />
            <ScoreChip label="Total" correct={totalCorrect} total={totalItems} />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '16px' }}>

        {/* Set title + description */}
        <div style={{
          textAlign: 'center',
          padding: '18px 16px 10px',
        }}>
          <h1 style={{
            fontFamily: DS.serif,
            fontSize: 'clamp(1.2rem, 4vw, 1.7rem)',
            fontWeight: 700,
            color: DS.rust,
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            {currentSet.name}
          </h1>
          <p style={{
            fontFamily: DS.mono,
            fontSize: '0.72rem',
            color: DS.inkMuted,
            marginTop: '6px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {currentSet.description}
          </p>
        </div>

        {/* Pagination */}
        <Pagination
          exerciseSets={exerciseSets}
          currentSetIndex={currentSetIndex}
          completedSets={completedSets}
          setCurrentSetIndex={goTo}
        />

        {/* Action bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          padding: '10px 0 16px',
          borderBottom: `1px solid ${DS.border}`,
          marginBottom: '16px',
        }}>
          <NavButton onClick={() => goTo(currentSetIndex - 1)} disabled={currentSetIndex === 0}>
            ← Forrige
          </NavButton>

          <button
            onClick={checkAnswers}
            style={{
              background: DS.rust,
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 20px',
              fontFamily: DS.serif,
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 2px 6px rgba(139,69,19,0.25)',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.background = DS.rustLight}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.background = DS.rust}
          >
            Tjek svar ✓
          </button>

          <button
            onClick={resetCurrentSet}
            style={{
              background: 'transparent',
              color: DS.inkMuted,
              border: `1px solid ${DS.border}`,
              borderRadius: '6px',
              padding: '8px 16px',
              fontFamily: DS.serif,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = DS.rust; (e.target as HTMLButtonElement).style.color = DS.rust; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = DS.border; (e.target as HTMLButtonElement).style.color = DS.inkMuted; }}
          >
            Nulstil
          </button>

          <NavButton onClick={() => goTo(currentSetIndex + 1)} disabled={currentSetIndex === exerciseSets.length - 1}>
            Næste →
          </NavButton>
        </div>

        {/* Result banner */}
        {showResults && (
          <div style={{
            textAlign: 'center',
            padding: '10px 16px',
            marginBottom: '16px',
            borderRadius: '8px',
            background: allCorrect ? DS.greenPale : DS.redPale,
            border: `1px solid ${allCorrect ? DS.green : DS.red}`,
            fontFamily: DS.serif,
            fontSize: '1rem',
            color: allCorrect ? DS.green : DS.red,
            fontWeight: 600,
          }}>
            {allCorrect
              ? '🎉 Perfekt! Alle svar er korrekte.'
              : `${correctCount} af ${exercises.length} korrekte — prøv igen!`}
          </div>
        )}

        {/* Exercise instruction */}
        <p style={{
          fontFamily: DS.mono,
          fontSize: '0.7rem',
          color: DS.inkMuted,
          textAlign: 'center',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}>
          Skriv den danske oversættelse · Write the Danish translation · Enter → next field
        </p>

        {/* Exercise grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: '10px',
          marginBottom: '20px',
        }}>
          {exercises.map((item, index) => (
            <div
              key={index}
              onKeyDown={e => handleKeyDown(e, index)}
            >
              <ExerciseCard
                item={item}
                index={index}
                onChange={handleInputChange}
                inputRef={index === 0 ? el => { firstInputRef.current = el; } : undefined}
              />
            </div>
          ))}
        </div>

        {/* Bottom nav (mirrors top) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          padding: '16px 0',
          borderTop: `1px solid ${DS.border}`,
          marginTop: '8px',
        }}>
          <NavButton onClick={() => goTo(currentSetIndex - 1)} disabled={currentSetIndex === 0}>
            ← Forrige
          </NavButton>
          <button
            onClick={checkAnswers}
            style={{
              background: DS.rust, color: '#fff', border: 'none',
              borderRadius: '6px', padding: '8px 20px',
              fontFamily: DS.serif, fontSize: '0.88rem', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.02em',
            }}
          >
            Tjek svar ✓
          </button>
          <button
            onClick={resetCurrentSet}
            style={{
              background: 'transparent', color: DS.inkMuted,
              border: `1px solid ${DS.border}`, borderRadius: '6px',
              padding: '8px 16px', fontFamily: DS.serif,
              fontSize: '0.82rem', cursor: 'pointer',
            }}
          >
            Nulstil
          </button>
          <NavButton onClick={() => goTo(currentSetIndex + 1)} disabled={currentSetIndex === exerciseSets.length - 1}>
            Næste →
          </NavButton>
        </div>

        {/* Grammar notes */}
        <GrammarNotes />

        

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '24px 0 16px',
          fontFamily: DS.mono,
          fontSize: '0.65rem',
          color: DS.inkMuted,
          letterSpacing: '0.06em',
        }}>
          © 2026 Isidoros Parlamas · parlamas@live.com · socratic-school.com
        </footer>
      </main>
    </div>
  );
};

export default Exercise001;
