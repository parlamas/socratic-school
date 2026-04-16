'use client';

// src/app/Danish/components/ex-002.tsx

import { useState, useEffect, memo } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Mood = 'indicative' | 'subjunctive' | 'optative' | 'imperative';

type ExerciseItem = {
  greek: string;
  english: string;
  danish: string;
  correct: Mood;
  explanation: string;
};

type Lang = 'greek' | 'english' | 'danish';

// ─── DisplayText ─────────────────────────────────────────────────────────────

const DisplayText = memo(({ content }: { content: string }) => {
  const hasHtml = /<[a-z][^>]*>/i.test(content);
  if (hasHtml) {
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <span>{content}</span>;
});
DisplayText.displayName = 'DisplayText';

// ─── Data ────────────────────────────────────────────────────────────────────

const exercises: ExerciseItem[] = [
  {
    greek: 'Αυτήν τη στιγμή βρέχει έξω.',
    english: 'It is raining outside right now.',
    danish: 'Det regner udenfor lige nu.',
    correct: 'indicative',
    explanation: 'This statement presents itself as real.',
  },
  {
    greek: 'Είναι απαραίτητο να φύγουμε τώρα.',
    english: '<span class="uur">It is necessary</span> <span class="ub">that we leave now</span>.',
    danish: '<span class="uur">Det er nødvendigt</span>, <span class="ub">at vi går nu</span>.',
    correct: 'subjunctive',
    explanation:
      '<span class="uur">It is necessary</span> <span class="ub">that we leave now</span>. The first clause is indicative; the second is subjunctive — it remains invariant and expresses the unverified.',
  },
  {
    greek: 'Μακάρι να είχε έρθει νωρίτερα.',
    english: 'If only he had come earlier.',
    danish: 'Gid han var kommet tidligere.',
    correct: 'subjunctive',
    explanation:
      'The subjunctive occurs alone here. The sentence expresses the unrealizable — hope cannot refer to the past, so it is not optative.',
  },
  {
    greek: 'Φύγε αμέσως από εδώ!',
    english: 'Leave here immediately!',
    danish: 'Gå væk herfra med det samme!',
    correct: 'imperative',
    explanation: 'This sentence presents itself as a command.',
  },
  {
    greek: 'Θα έρθω αύριο στο σχολείο.',
    english: 'I will come to school tomorrow.',
    danish: 'Jeg kommer i skole i morgen.',
    correct: 'indicative',
    explanation: 'This statement presents itself as real.',
  },
  {
    greek: 'Παρακαλώ, καθήστε.',
    english: 'Please sit down.',
    danish: 'Vær venlig at sætte dig.',
    correct: 'optative',
    explanation:
      'A polite request. The speaker hopes that their guest will comply — this is optative, not imperative.',
  },
  {
    greek: 'Kαθήστε (κάτω)! / Κάθησε (κάτω)!',
    english: 'Sit down!',
    danish: 'Sæt dig ned!',
    correct: 'imperative',
    explanation:
      'A command, regardless of whether the addressee agrees or refuses to comply.',
  },
  {
    greek: 'Έχουν τελειώσει το φαγητό.',
    english: 'They have finished eating.',
    danish: 'De er færdige med at spise.',
    correct: 'indicative',
    explanation:
      'This statement presents itself as real, regardless of whether it is true, accurate, or honest.',
  },
  {
    greek: 'Δεν είμαι βέβαιος ότι τους έχω ξανασυναντήσει.',
    english: 'I am not sure (that) I have met them before.',
    danish: 'Jeg er ikke sikker på, at jeg har mødt dem før.',
    correct: 'indicative',
    explanation:
      '<span class="uur">I am not sure</span> <span class="uur">(that) I have met them before</span>. Both clauses present themselves as real — both are indicative.',
  },
  {
    greek: 'Αν ήταν ψηλότερος, θα μπορούσε να παίξει μπάσκετ.',
    english: 'If he were taller, he could play basketball.',
    danish: 'Hvis han var højere, kunne han spille basketball.',
    correct: 'subjunctive',
    explanation:
      '<span class="ub">If he were taller</span> — <span class="ub">he could play basketball</span>. Two subordinate clauses, neither standing alone. Both are subjunctive: the first expresses the unrealizable, the second the unverified.',
  },
  {
    greek: 'Να δέσετε τη ζώνη ασφαλείας σας όλοι σας!',
    english: 'All of you, fasten your seat belt!',
    danish: 'Alle sammen, spænd sikkerhedsselen!',
    correct: 'imperative',
    explanation: 'This sentence presents itself as a command.',
  },
  {
    greek: 'Σου εύχομαι καλή τύχη σε ό,τι κάνεις!',
    english: 'I wish you luck with everything you do!',
    danish: 'Jeg ønsker dig held og lykke med alt, hvad du gør!',
    correct: 'optative',
    explanation:
      'This expresses a hope for the future. The optative always refers to the future.',
  },
  {
    greek: 'Επέμενε να είναι παρόντες.',
    english: 'He insisted that they be present.',
    danish: 'Han insisterede på, at de er til stede.',
    correct: 'subjunctive',
    explanation:
      '<span class="uur">He insisted</span> <span class="ub">that they be present</span>. The first clause is indicative; the second is subjunctive — we do not know whether they were actually present.',
  },
  {
    greek: 'Μακάρι να μην μας συμβεί ποτέ αυτό!',
    english: 'May that never happen to us!',
    danish: 'Må det aldrig ske for os!',
    correct: 'optative',
    explanation:
      'This expresses a hope for the future. The optative always refers to the future.',
  },
  {
    greek: 'Δεν γνωρίζαμε κανέναν που θα παραδεχόταν κάτι τέτοιο.',
    english: 'We were unaware of anyone who would admit such a thing.',
    danish: 'Vi kendte ikke nogen, der ville indrømme sådan noget.',
    correct: 'subjunctive',
    explanation:
      '<span class="uur">We were unaware of anyone</span> <span class="ub">who would admit such a thing</span>. The first is indicative, the second subjunctive — expressing the unverified.',
  },
  {
    greek: 'Ψάχνω κάποιον που να μπορεί να μεταφράσει αυτό το χειρόγραφο.',
    english: 'I am looking for someone who can translate this manuscript.',
    danish: 'Jeg leder efter nogen, der kan oversætte dette manuskript.',
    correct: 'subjunctive',
    explanation:
      '<span class="uur">I am looking for someone</span> <span class="ub">who can translate this manuscript</span>. The speaker does not know whether such a person exists — the existence is unverified — so the second clause is subjunctive.',
  },
  {
    greek: 'Αν πρέπει να διακινδυνεύσουμε την ίδια μας τη ζωή, κανένα πρόβλημα.',
    english: 'If we must risk our very lives, so be it.',
    danish: 'Hvis vi må risikere vores egne liv, så må det være sådan.',
    correct: 'imperative',
    explanation:
      '<span class="uur">If we must risk our very lives</span>, <span class="oor">so be it</span>. The first clause is a background premise (indicative). The second expresses the speaker\'s self-command to accept the situation stoically — it is imperative.',
  },
  {
    greek: 'Φρόντισε να έρθει στην ώρα του.',
    english: 'See that he arrive on time.',
    danish: 'Sørg for, at han kommer til tiden.',
    correct: 'optative',
    explanation:
      '<span class="oor">See</span> — <span class="ub">that he arrive on time</span>. Hopefulness, even to a high degree, is optative not imperative. Without unambiguous expectation and command-force, this remains a hope.',
  },
  {
    greek: 'Να χαμηλώσεις τη μουσική!',
    english: 'You had better turn down the music!',
    danish: 'Du må hellere skrue ned for musikken!',
    correct: 'imperative',
    explanation:
      '<span class="oor">You had better turn down the music!</span> A clear, unambiguous expectation is present — the mood is imperative.',
  },
  {
    greek: 'Ζήτω η σωκρατική νοοτροπία!',
    english: 'Long live the Socratic mindset!',
    danish: 'Længe leve den sokratiske tankegang!',
    correct: 'optative',
    explanation:
      '<span class="llr">Long live the Socratic mindset!</span> A clear, unambiguous hope is present — the mood is optative.',
  },
];

const moods: { key: Mood; en: string; da: string; gr: string }[] = [
  { key: 'indicative',  en: 'indicative',  da: 'indikativ',  gr: 'οριστική'    },
  { key: 'subjunctive', en: 'subjunctive', da: 'konjunktiv', gr: 'υποτακτική'  },
  { key: 'optative',    en: 'optative',    da: 'optativ',    gr: 'ευκτική'     },
  { key: 'imperative',  en: 'imperative',  da: 'imperativ',  gr: 'προστακτική' },
];

// ─── Athenian calendar engine ─────────────────────────────────────────────────

const NEW_MOONS_UTC: Date[] = [
  new Date('2025-07-25T02:11:00Z'),
  new Date('2025-08-23T06:06:00Z'),
  new Date('2025-09-21T19:54:00Z'),
  new Date('2025-10-21T12:25:00Z'),
  new Date('2025-11-20T06:47:00Z'),
  new Date('2025-12-20T01:43:00Z'),
  new Date('2026-01-18T19:52:00Z'),
  new Date('2026-02-17T12:01:00Z'),
  new Date('2026-03-19T01:23:00Z'),
  new Date('2026-04-17T11:52:00Z'),
  new Date('2026-05-16T23:01:00Z'),
  new Date('2026-06-15T08:54:00Z'),
  new Date('2026-07-14T17:43:00Z'), // start of 2026/27 year
];

const ATH_MONTHS = [
  { nom: 'Εκατομβαιών',  gen: 'Εκατομβαιώνος',  la: 'Hekatombaion',  ety: 'From ἑκατόμβη — a sacrifice of 100 oxen (ἑκατόν "hundred" + βοῦς "ox"). Named after the Hekatomb offered to Apollo and Athena.' },
  { nom: 'Μεταγειτνιών', gen: 'Μεταγειτνιώνος', la: 'Metageitnion',  ety: 'From μετά ("after/change") + γείτων ("neighbour"). Festival of the Metageitnia, celebrating the reunion of neighbours after summer.' },
  { nom: 'Βοηδρομιών',   gen: 'Βοηδρομιώνος',   la: 'Boedromion',    ety: 'From βοή ("cry/shout") + δρόμος ("run"). "Running to the cry" — honouring Theseus\'s legendary rescue of Athens.' },
  { nom: 'Πυανεψιών',    gen: 'Πυανεψιώνος',    la: 'Pyanepsion',    ety: 'From πύανος ("bean") + ἕψω ("to boil"). Named after the Pyanepsia festival, in which a bean-stew was offered to Apollo.' },
  { nom: 'Μαιμακτηριών', gen: 'Μαιμακτηριώνος', la: 'Maimakterion',  ety: 'From Μαιμάκτης, an epithet of Zeus meaning "stormy" or "blustering". The month of Zeus Maimaktes, god of rough winter weather.' },
  { nom: 'Ποσειδεών',    gen: 'Ποσειδεώνος',    la: 'Poseideon',     ety: 'From Ποσειδῶν (Poseidon), god of the sea. Named after the festival Poseideia held in honour of Poseidon during midwinter.' },
  { nom: 'Γαμηλιών',     gen: 'Γαμηλιώνος',     la: 'Gamelion',      ety: 'From γάμος ("marriage"). Named after the sacred marriage (hieros gamos) of Zeus and Hera celebrated in this month.' },
  { nom: 'Ανθεστηριών',  gen: 'Ανθεστηριώνος',  la: 'Anthesterion',  ety: 'From ἄνθος ("flower/bloom"). Named after the Anthesteria festival — first tasting of new wine and the arrival of spring flowers.' },
  { nom: 'Ελαφηβολιών',  gen: 'Ελαφηβολιώνος',  la: 'Elaphebolion',  ety: 'From ἔλαφος ("deer") + βάλλω ("to shoot"). Festival Elaphebolia: deer hunted and sacrificed to Artemis.' },
  { nom: 'Μουνιχιών',    gen: 'Μουνιχιώνος',    la: 'Mounichion',    ety: 'From Μουνυχία, a hill and harbour in Piraeus. Named after the festival Mounikhia honouring Artemis as goddess of the Piraeus.' },
  { nom: 'Θαργηλιών',    gen: 'Θαργηλιώνος',    la: 'Thargelion',    ety: 'From θαργήλια — a pot of first-fruits offered to Apollo. Birth month of Socrates. Named after the festival Thargelia.' },
  { nom: 'Σκιροφοριών',  gen: 'Σκιροφοριώνος',  la: 'Skirophorion',  ety: 'From σκίρον, a large white sunshade carried in procession to Skiron. Named after the Skira festival honouring Athena and Poseidon.' },
];

const GREG_RANGES = [
  'Jul 25 – Aug 22, 2025', 'Aug 23 – Sep 20, 2025', 'Sep 21 – Oct 20, 2025',
  'Oct 21 – Nov 19, 2025', 'Nov 20 – Dec 19, 2025', 'Dec 20, 2025 – Jan 17, 2026',
  'Jan 18 – Feb 16, 2026', 'Feb 17 – Mar 18, 2026', 'Mar 19 – Apr 16, 2026',
  'Apr 17 – May 15, 2026', 'May 16 – Jun 14, 2026', 'Jun 15 – Jul 13, 2026',
];

function getAthenianDate(d: Date): { nom: string; gen: string; monthEN: string; idx: number; day: number } | null {
  const ms = d.getTime();
  for (let i = 0; i < NEW_MOONS_UTC.length - 1; i++) {
    if (ms >= NEW_MOONS_UTC[i].getTime() && ms < NEW_MOONS_UTC[i + 1].getTime()) {
      const monthIdx = i % 12;
      return {
        nom:     ATH_MONTHS[monthIdx].nom,
        gen:     ATH_MONTHS[monthIdx].gen,
        monthEN: ATH_MONTHS[monthIdx].la,
        idx:     monthIdx,
        day:     Math.floor((ms - NEW_MOONS_UTC[i].getTime()) / 86400000) + 1,
      };
    }
  }
  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Exercise002 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lang, setLang] = useState<Lang>('greek');
  const [selected, setSelected] = useState<Mood | ''>('');
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(exercises.length).fill(false));
  const [gregDate, setGregDate]     = useState('');
  const [athDate, setAthDate]       = useState('');
  const [socDate, setSocDate]       = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showHow, setShowHow]       = useState(false);
  const [convDay, setConvDay]       = useState('');
  const [convMonth, setConvMonth]   = useState('');
  const [convYear, setConvYear]     = useState('');
  const [convResult, setConvResult] = useState('');
  const [convNote, setConvNote]     = useState('');

  // Clock + Athenian date
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setGregDate(now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
      const ath = getAthenianDate(now);
      setAthDate(ath ? `${ath.day} ${ath.gen}` : '—');
      const socYear = now.getFullYear() + 470;
      const dm = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
      setSocDate(`${dm}, ${socYear} AS`);
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Initialise converter to today when panel opens
  useEffect(() => {
    if (showHow && !convDay) {
      const today = new Date();
      setConvDay(String(today.getDate()));
      setConvMonth(String(today.getMonth() + 1));
      setConvYear(String(today.getFullYear()));
      runConvert(today.getDate(), today.getMonth() + 1, today.getFullYear());
    }
  }, [showHow]);

  const runConvert = (d: number, mo: number, y: number) => {
    if (!d || !mo || !y) { setConvResult(''); setConvNote(''); return; }
    const date = new Date(Date.UTC(y, mo - 1, d, 12, 0, 0));
    const ath = getAthenianDate(date);
    const greg = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const socYear = date.getUTCFullYear() + 470;
    const socDM = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    if (ath) {
      setConvResult(`${greg} → ${ath.day} ${ath.gen} · ${socDM}, ${socYear} AS`);
      setConvNote(`(${ath.monthEN} / ${ath.nom}, month ${ath.idx + 1} of the Athenian year 2025/26)`);
    } else {
      setConvResult(`${greg} → outside the 2025/26 Athenian year range`);
      setConvNote('Supported range: Jul 25, 2025 – Jul 13, 2026');
    }
  };

  const ex = exercises[currentIndex];

  const getText = () => {
    if (lang === 'greek')   return ex.greek;
    if (lang === 'english') return ex.english;
    return ex.danish;
  };

  const handleSelect = (mood: Mood) => {
    setSelected(mood);
    setShowResult(null);
  };

  const checkAnswer = () => {
    if (!selected) return;
    const ok = selected === ex.correct;
    setShowResult(ok);
    if (ok && !answered[currentIndex]) {
      const next = [...answered];
      next[currentIndex] = true;
      setAnswered(next);
      setScore((s) => s + 1);
    }
  };

  const reset = () => {
    setSelected('');
    setShowResult(null);
    setShowExplanation(false);
  };

  const goTo = (i: number) => {
    if (i < 0 || i >= exercises.length) return;
    setCurrentIndex(i);
    setSelected('');
    setShowResult(null);
    setShowExplanation(false);
    setLang('greek');
  };

  // ─── Mood colour helpers ──────────────────────────────────────────────────

  const moodColor: Record<Mood, string> = {
    indicative:  '#185FA5',
    subjunctive: '#A32D2D',
    optative:    '#3B6D11',
    imperative:  '#854F0B',
  };

  const moodBg: Record<Mood, string> = {
    indicative:  '#E6F1FB',
    subjunctive: '#FCEBEB',
    optative:    '#EAF3DE',
    imperative:  '#FAEEDA',
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '1.5rem 1rem 3rem', fontFamily: "'Source Serif 4', Georgia, serif", color: 'inherit' }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
          Αναγνώρισε την Έγκλιση · Identify the Mood
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>Bestem Modus · Socratic School</div>

        {/* Clock block */}
        <div style={{ display: 'inline-block', marginTop: 10, textAlign: 'left', background: '#f7f7f7', borderRadius: 8, padding: '10px 18px', border: '0.5px solid #ddd' }}>
          {([
            { label: 'Gregorian', val: gregDate, color: '#333' },
            { label: 'Athenian',  val: athDate,  color: '#185FA5' },
            { label: 'Socratic',  val: socDate,  color: '#666' },
          ] as { label: string; val: string; color: string }[]).map(({ label, val, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 10, lineHeight: 2.1 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', minWidth: 72, fontFamily: 'sans-serif' }}>{label}</span>
              <span style={{ fontSize: 13, color, fontStyle: label === 'Athenian' ? 'italic' : 'normal', fontFamily: "'Source Serif 4', Georgia, serif" }}>{val}</span>
            </div>
          ))}
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#aaa', marginTop: 3 }}>{currentTime}</div>
        </div>

        {/* How link */}
        <div style={{ marginTop: 8 }}>
          <span
            onClick={() => setShowHow((v) => !v)}
            style={{ fontSize: 12, color: '#185FA5', cursor: 'pointer', textDecoration: 'none', textUnderlineOffset: 3, fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {showHow ? '▾' : '▸'} How does the Athenian calendar work? · Πώς λειτουργεί το Αθηναϊκό ημερολόγιο;<br />Hvordan fungerer den athenske kalender?
          </span>
        </div>

        {/* How panel */}
        {showHow && (
          <div style={{ marginTop: 10, background: '#fff', border: '0.5px solid #ccc', borderRadius: 12, padding: '1rem 1.1rem', textAlign: 'left', fontSize: 13, lineHeight: 1.8 }}>

            {/* Trilingual explanation */}
            {([
              { lang: 'English', text: 'The Athenian calendar is lunisolar: each month begins on the first visible crescent after a new moon, and the year begins on the first new moon after the summer solstice (around 21 June). The twelve months are 29 or 30 days long. Because 12 lunar months (≈354 days) fall short of the solar year (≈365 days) by about 11 days, a thirteenth intercalary month (usually a second Poseideon) is added roughly every three years. The Athenian day shown here is computed from actual astronomical new moon moments for 2025–2026 — not a rough approximation. The day number resets to 1 on each new moon.' },
              { lang: 'Ελληνικά', text: 'Το Αθηναϊκό ημερολόγιο είναι σεληνιακό-ηλιακό: κάθε μήνας αρχίζει με την πρώτη ορατή μηνοειδή Σελήνη μετά τη νέα σελήνη, και το έτος αρχίζει με την πρώτη νέα σελήνη μετά το θερινό ηλιοστάσιο (περίπου 21 Ιουνίου). Επειδή 12 σεληνιακοί μήνες (≈354 ημέρες) υστερούν κατά ~11 ημέρες έναντι του ηλιακού έτους, προστίθεται ένας δέκατος τρίτος παρεμβαλλόμενος μήνας (συνήθως δεύτερος Ποσειδεών) κάθε τρία περίπου χρόνια. Η ημέρα εδώ υπολογίζεται από πραγματικές αστρονομικές στιγμές νέας σελήνης για τα έτη 2025–2026.' },
              { lang: 'Dansk', text: 'Den athenske kalender er lunisolar: hver måned begynder med den første synlige halvmåne efter nymåne, og året begynder med den første nymåne efter sommersolhverv (ca. 21. juni). De tolv måneder har 29 eller 30 dage. Fordi 12 månedscyklusser (≈354 dage) er ca. 11 dage kortere end solåret, tilføjes en trettende interkalar måned (oftest en anden Poseideon) ca. hvert tredje år. Den athenske dag beregnes her ud fra faktiske astronomiske nymånedatoer for 2025–2026.' },
            ]).map(({ lang: l, text }) => (
              <div key={l}>
                <div style={{ fontWeight: 500, fontSize: 13, color: '#333', marginTop: '0.85rem', marginBottom: 3, borderBottom: '0.5px solid #eee', paddingBottom: 3, fontFamily: "'Playfair Display', serif" }}>{l}</div>
                <div style={{ color: '#666', fontSize: 12.5, lineHeight: 1.85 }}>{text}</div>
              </div>
            ))}

            {/* Date converter */}
            <div style={{ marginTop: '1rem', background: '#f7f7f7', borderRadius: 8, border: '0.5px solid #ddd', padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', fontFamily: 'sans-serif', marginBottom: 6 }}>
                Date converter · Μετατροπέας ημερομηνίας · Datokonverter
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Day */}
                <select
                  value={convDay}
                  onChange={(e) => { setConvDay(e.target.value); runConvert(+e.target.value, +convMonth, +convYear); }}
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 13, padding: '5px 8px', border: '0.5px solid #ccc', borderRadius: 8, background: '#fff', color: '#333', cursor: 'pointer' }}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {/* Month */}
                <select
                  value={convMonth}
                  onChange={(e) => { setConvMonth(e.target.value); runConvert(+convDay, +e.target.value, +convYear); }}
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 13, padding: '5px 8px', border: '0.5px solid #ccc', borderRadius: 8, background: '#fff', color: '#333', cursor: 'pointer' }}
                >
                  <option value="">Month</option>
                  {['January','February','March','April','May','June','July','August','September','October','November','December'].map((mn, i) => (
                    <option key={mn} value={i + 1}>{mn}</option>
                  ))}
                </select>
                {/* Year */}
                <select
                  value={convYear}
                  onChange={(e) => { setConvYear(e.target.value); runConvert(+convDay, +convMonth, +e.target.value); }}
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 13, padding: '5px 8px', border: '0.5px solid #ccc', borderRadius: 8, background: '#fff', color: '#333', cursor: 'pointer' }}
                >
                  <option value="">Year</option>
                  {[2025, 2026].map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
              {convResult && (
                <div style={{ marginTop: 8, fontSize: 13, color: convResult.includes('outside') ? '#888' : '#333' }}>
                  {convResult.includes('→') && !convResult.includes('outside') ? (
                    <>
                      {convResult.split('→')[0]}→{' '}
                      <span style={{ color: '#185FA5', fontStyle: 'italic', fontWeight: 500 }}>{convResult.split('→')[1]}</span>
                    </>
                  ) : (
                    <span style={{ fontStyle: 'italic', color: '#aaa' }}>{convResult}</span>
                  )}
                </div>
              )}
              {convNote && <div style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>{convNote}</div>}
            </div>

            {/* Month table */}
            <div style={{ marginTop: '1.1rem' }}>
              <div style={{ fontWeight: 500, fontSize: 13, color: '#333', marginBottom: 6, borderBottom: '0.5px solid #eee', paddingBottom: 3, fontFamily: "'Playfair Display', serif" }}>
                The 12 Athenian months · Οι 12 Αθηναϊκοί μήνες · De 12 athenske måneder
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
                  <thead>
                    <tr>
                      {['#', 'Ονομαστική / Γενική', 'Latin name', 'Gregorian 2025/26', 'Etymology'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', fontWeight: 500, color: '#aaa', padding: '4px 6px', borderBottom: '0.5px solid #ddd', fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ATH_MONTHS.map((m, i) => {
                      const isCur = getAthenianDate(new Date())?.idx === i;
                      return (
                        <tr key={i} style={{ background: isCur ? '#E6F1FB' : i % 2 === 0 ? '#fff' : '#f7f7f7' }}>
                          <td style={{ padding: '4px 6px', color: isCur ? '#0C447C' : '#333', borderBottom: '0.5px solid #eee' }}>{i + 1}</td>
                          <td style={{ padding: '4px 6px', color: isCur ? '#0C447C' : '#185FA5', fontStyle: 'italic', fontWeight: 500, borderBottom: '0.5px solid #eee' }}>
                            {m.nom} / {m.gen}
                          </td>
                          <td style={{ padding: '4px 6px', color: '#333', borderBottom: '0.5px solid #eee', whiteSpace: 'nowrap' }}>{m.la}</td>
                          <td style={{ padding: '4px 6px', color: '#666', fontSize: 11, borderBottom: '0.5px solid #eee', whiteSpace: 'nowrap' }}>{GREG_RANGES[i]}</td>
                          <td style={{ padding: '4px 6px', color: '#888', fontSize: 11, fontStyle: 'italic', borderBottom: '0.5px solid #eee', lineHeight: 1.5 }}>{m.ety}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Language switcher ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1rem' }}>
        {(['greek', 'english', 'danish'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              background: lang === l ? '#B5D4F4' : '#f4f4f4',
              border: lang === l ? '1.5px solid #185FA5' : '0.5px solid #ccc',
              borderRadius: 8,
              padding: '5px 16px',
              fontSize: 13,
              cursor: 'pointer',
              color: lang === l ? '#0C447C' : '#555',
              fontWeight: lang === l ? 500 : 400,
              fontFamily: "'Source Serif 4', Georgia, serif",
            }}
          >
            {l === 'greek' ? 'Ελληνικά' : l === 'english' ? 'English' : 'Dansk'}
          </button>
        ))}
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

      {/* ── Sentence card ── */}
      <div style={{
        background: '#fff',
        border: '0.5px solid #bbb',
        borderRadius: 12,
        padding: '1.1rem 1.25rem',
        marginBottom: '1rem',
        fontSize: 16,
        lineHeight: 1.7,
        textAlign: 'center',
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <DisplayText content={getText()} />
      </div>

      {/* ── Criterion note ── */}
      <div style={{
        background: '#f7f7f7',
        borderLeft: '3px solid #185FA5',
        padding: '0.6rem 1rem',
        marginBottom: '1rem',
        fontSize: 12.5,
        color: '#555',
        lineHeight: 1.6,
        textAlign: 'center',
      }}>
        The criterion is not the form of the verb, but its semantic value. · Kriteriet er ikke verbets form, men dets semantiske værdi.
      </div>

      {/* ── Mood hint ── */}
      <div style={{ textAlign: 'center', fontSize: 12, color: '#888', marginBottom: 6 }}>
        Select {ex.correct.length === 1 ? '1 answer' : `${ex.correct.length} answers`}
      </div>

      {/* ── Mood buttons ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8, marginBottom: '1rem' }}>
        {moods.map((m) => (
          <button
            key={m.key}
            onClick={() => handleSelect(m.key)}
            style={{
              background: selected === m.key ? moodBg[m.key] : '#fff',
              border: selected === m.key ? `1.5px solid ${moodColor[m.key]}` : '0.5px solid #ccc',
              borderRadius: 8,
              padding: '10px 8px',
              cursor: 'pointer',
              textAlign: 'center',
              fontFamily: "'Source Serif 4', Georgia, serif",
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: 12, color: '#888', fontStyle: 'italic' }}>{m.gr}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: selected === m.key ? moodColor[m.key] : '#333' }}>{m.en}</div>
            <div style={{ fontSize: 11, color: '#999' }}>{m.da}</div>
          </button>
        ))}
      </div>

      {/* ── Action buttons ── */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={checkAnswer}
          disabled={!selected}
          style={{
            background: selected ? '#185FA5' : '#ccc',
            border: 'none',
            borderRadius: 8,
            padding: '7px 20px',
            fontSize: 13,
            cursor: selected ? 'pointer' : 'not-allowed',
            color: '#fff',
            fontFamily: "'Source Serif 4', Georgia, serif",
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
          {showExplanation ? 'Hide' : 'Explain'}
        </button>
      </div>

      {/* ── Result banner ── */}
      {showResult !== null && (
        <div style={{
          borderRadius: 8,
          padding: '0.6rem 1rem',
          marginBottom: '0.75rem',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          background: showResult ? '#EAF3DE' : '#FCEBEB',
          color: showResult ? '#27500A' : '#791F1F',
          border: `0.5px solid ${showResult ? '#3B6D11' : '#A32D2D'}`,
        }}>
          {showResult
            ? `Correct — ${ex.correct}`
            : <span>Incorrect. The correct mood is <strong>{ex.correct}</strong>.</span>}
        </div>
      )}

      {/* ── Explanation ── */}
      {showExplanation && (
        <div style={{
          background: '#f7f7f7',
          borderRadius: 8,
          padding: '0.85rem 1.1rem',
          marginBottom: '1rem',
          fontSize: 13.5,
          lineHeight: 1.75,
        }}>
          <DisplayText content={ex.explanation} />
        </div>
      )}

      {/* ── Navigation ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: '1.5rem' }}>
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{
            background: '#fff', border: '0.5px solid #ccc', borderRadius: 8,
            padding: '7px 18px', fontSize: 13, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            color: currentIndex === 0 ? '#bbb' : '#333',
            fontFamily: "'Source Serif 4', Georgia, serif",
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === exercises.length - 1}
          style={{
            background: '#fff', border: '0.5px solid #ccc', borderRadius: 8,
            padding: '7px 18px', fontSize: 13,
            cursor: currentIndex === exercises.length - 1 ? 'not-allowed' : 'pointer',
            color: currentIndex === exercises.length - 1 ? '#bbb' : '#333',
            fontFamily: "'Source Serif 4', Georgia, serif",
          }}
        >
          Next →
        </button>
      </div>

      {/* ── Mood legend ── */}
      <div style={{ borderTop: '0.5px solid #ddd', paddingTop: '1rem', marginTop: '0.5rem' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.06em', color: '#888', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.6rem', textAlign: 'center' }}>
          The 4 moods · De 4 modi
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 6 }}>
          {([
            { mood: 'indicative'  as Mood, desc: 'presents what is said as real' },
            { mood: 'subjunctive' as Mood, desc: 'presents as unrealizable or unverified' },
            { mood: 'optative'    as Mood, desc: 'presents as hope (future only)' },
            { mood: 'imperative'  as Mood, desc: 'presents as a command' },
          ]).map(({ mood, desc }) => (
            <div key={mood} style={{ background: '#f7f7f7', borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: 12.5, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 500, fontSize: 13, color: moodColor[mood] }}>{mood}</span>
              <br />
              <span style={{ fontSize: 12, color: '#666' }}>{desc}</span>
            </div>
          ))}
        </div>

        {/* Convention pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.75rem' }}>
          {moods.map((m) => (
            <span key={m.key} style={{ background: moodBg[m.key], color: moodColor[m.key], borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 500 }}>
              {m.en}
            </span>
          ))}
        </div>
      </div>

      {/* ── Socratic calendar note ── */}
      <div style={{ borderTop: '0.5px solid #ddd', paddingTop: '1rem', marginTop: '1rem' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, marginBottom: '0.5rem', textAlign: 'center' }}>
          The Socratic Calendar · Den Sokratiske Kalender
        </div>
        <div style={{ fontSize: 12.5, color: '#666', lineHeight: 1.75 }}>
          <p style={{ marginBottom: '0.5rem' }}>
            AD years: add 470 to the Gregorian year. BC years: subtract the Gregorian year from 471. Year 1 = birth of Socrates.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            The giants of the philosophy of language: Socrates in <em>Cratylus</em> (1–70 AS),
            Dionysius Thrax in <em>Téchnē Grammatikḗ</em> (300–380 AS),
            Apollonius Dyscolus in <em>Perì Syntáxeōs</em> (580–650 AS).
          </p>
          <p>
            Grammar is a means of communicating reality; it is therefore closely connected to metaphysics.
            A better understanding of grammar leads to a better understanding of metaphysics,
            which in turn leads to a higher quality of life.
          </p>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '0.5px solid #eee', fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
        &copy; 2026 Isidoros Parlamas · parlamas@live.com · socratic-school.com
      </div>
    </div>
  );
};

export default Exercise002;
