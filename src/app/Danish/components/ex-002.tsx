//src/app/Danish/components/ex-002.tsx

'use client';

import '../danish.css';
import Image from 'next/image';
import { useState, memo, useEffect } from 'react';

type ExerciseItem = {
  greek: string;
  english: string;
  danish: string;
  correctMood: string;
  explanation: string;
  userAnswer: string;
  isCorrect: boolean | null;
};

// DisplayText component for handling HTML content (Approach #5)
const DisplayText = memo(({ content }: { content: string }) => {
  // Debug: log the content
  console.log('DisplayText received:', content);
  
  // More robust HTML detection - check for any HTML tags
  const hasHtml = /<[a-z][^>]*>/i.test(content);
  console.log('Has HTML:', hasHtml);
  
  if (hasHtml) {
    // For HTML content, use dangerouslySetInnerHTML
    // This is safe because content is hardcoded in exercises
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  
  // For plain text, render normally
  return <div>{content}</div>;
});

DisplayText.displayName = 'DisplayText';

const Exercise002 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<'greek' | 'english' | 'danish'>('greek');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [socraticDate, setSocraticDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Calculate Socratic date on component mount
  useEffect(() => {
  const updateDateTime = () => {
    const today = new Date();
    const gregorianYear = today.getFullYear();
    const socraticYear = gregorianYear + 470;
    
    // Format date: Month Day, Year
    const dateOptions: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    };
    // Format month and day only (no year)
const monthDayOptions: Intl.DateTimeFormatOptions = { 
  month: 'long', 
  day: 'numeric'
};
const monthDay = today.toLocaleDateString('en-US', monthDayOptions);
    
// Format time: HH:MM:SS (24-hour format)
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const seconds = today.getSeconds().toString().padStart(2, '0');
const formattedTime = `${hours}:${minutes}:${seconds}`;

setSocraticDate(`${monthDay}, ${socraticYear}`);
    setCurrentTime(formattedTime);
  };

  // Update immediately
  updateDateTime();

  // Update every second
  const timer = setInterval(updateDateTime, 1000);

  // Cleanup on unmount
  return () => clearInterval(timer);
}, []);

  // Debug: log when current exercise changes
  useEffect(() => {
    console.log('Current exercise:', currentIndex);
    console.log('English text:', exercises[currentIndex].english);
  }, [currentIndex]);

  const exercises: ExerciseItem[] = [
    {
      greek: 'Αυτήν τη στιγμή βρέχει έξω.',
      english: 'It is raining outside right now.',
      danish: 'Det regner udenfor lige nu.',
      correctMood: 'indicative',
      explanation: 'This statement presents itself as real.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Είναι απαραίτητο να φύγουμε τώρα.',
      english: '<span class="uur">It is necessary</span> <span class="ub">that we leave now</span>.',
      danish: '<span class="uur">Det er nødvendigt</span>, <span class="ub">at vi går nu</span>.',
      correctMood: 'subjunctive',
      explanation: '<center><span class="uur">It is necessary</span> <span class="ub">that we leave now</span>.</center><br />The first clause is the framing clause (indicative mood) and the second is the subjunctive clause, which remains invariant. This sentence expresses the unverified. It is not verified if they actually left at the moment of speaking.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Μακάρι να είχε έρθει νωρίτερα.',
      english: 'If only he had come earlier.',
      danish: 'Gid han var kommet tidligere.',
      correctMood: 'subjunctive',
      explanation: 'This is an example where the subjunctive occurs alone. The sentence expresses the unrealizable and is therefore not optative, since the optative refers only to hope, and hope cannot refer to the past.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Φύγε αμέσως από εδώ!',
      english: 'Leave here immediately!',
      danish: 'Gå væk herfra med det samme!',
      correctMood: 'imperative',
      explanation: 'This sentence presents itself as a command.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Θα έρθω αύριο στο σχολείο.',
      english: 'I will come to school tomorrow.',
      danish: 'Jeg kommer i skole i morgen.',
      correctMood: 'indicative',
      explanation: 'This statement presents itself as real.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Παρακαλώ, καθήστε.',
      english: 'Please sit down.',
      danish: 'Vær venlig at sætte dig.',
      correctMood: 'optative',
      explanation: 'This sentence presents itself as a polite request. The speaker hopes that their guest will comply.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Kαθήστε (κάτω)!/Κάθησε (κάτω)!',
      english: 'Sit down!',
      danish: 'Sæt dig ned!',
      correctMood: 'imperative',
      explanation: 'This sentence presents itself as a command, regardless of whether the addressee agrees or refuses to comply.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Έχουν τελειώσει το φαγητό.',
      english: 'They have finished eating.',
      danish: 'De er færdige med at spise.',
      correctMood: 'indicative',
      explanation: 'This statement presents itself as real, regardless of whether it is true or not, accurate or not, honest or not, etc.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Δεν είμαι βέβαιος ότι τους έχω ξανασυναντήσει.',
      english: 'I am not sure (that) I have met them before.',
      danish: 'Jeg er ikke sikker på, at jeg har mødt dem før.',
      correctMood: 'indicative',
      explanation: '<center><span class="uur">I am not sure</span> <span class="uur">(that) I have met them before</span>.</center><br />This statement presents itself as real, regardless of whether it is true or not, accurate or not, honest or not, etc. Both clauses are in the indicative mood.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Αν ήταν ψηλότερος, θα μπορούσε να παίξει μπάσκετ.',
      english: 'If he were taller, he could play basketball.',
      danish: 'Hvis han var højere, kunne han spille basketball.',
      correctMood: 'subjunctive',
      explanation: '<center><span class="ub">If he were taller</span> <span class="ub">he could play basketball</span>.</center><br />Here we have a sentence consisting of two subordinate clauses, because neither of them can stand on its own. Both are in the subjunctive mood. The first expresses the unrealizable, and the second expresses the unverified.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Να δέσετε τη ζώνη ασφαλείας σας όλοι σας!',
      english: 'All of you, fasten your seat belt!',
      danish: 'Alle sammen, spænd sikkerhedsselen!',
      correctMood: 'imperative',
      explanation: 'This sentence presents itself as a command.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Σου εύχομαι καλή τύχη σε ό,τι κάνεις!',
      english: 'I wish you luck with everything you do!',
      danish: 'Jeg ønsker dig held og lykke med alt, hvad du gør!',
      correctMood: 'optative',
      explanation: 'This expresses a hope for the future. Remember that the optative refers only to the future.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Επέμενε να είναι παρόντες.',
      english: 'He insisted that they be present.',
      danish: 'Han insisterede på, at de er til stede.',
      correctMood: 'subjunctive',
      explanation: '<center><span class="uur">He insisted</span> <span class="ub">that they be present</span>.</center><br />The first clause is the framing clause (in the indicative mood) and the second is the subjunctive clause, which remains invariant. The second sentence expresses the unverified. We do not know whether they were or will be  actually present.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Μακάρι να μην μας συμβεί ποτέ αυτό!',
      english: 'May that never happen to us!',
      danish: 'Må det aldrig ske for os!',
      correctMood: 'optative',
      explanation: 'This expresses a hope for the future. Remember that the optative refers only to the future.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Δεν γνωρίζαμε κανέναν που θα παραδεχόταν κάτι τέτοιο.',
      english: 'We were unaware of anyone who would admit such a thing.',
      danish: 'Vi kendte ikke nogen, der ville indrømme sådan noget.',
      correctMood: 'subjunctive',
      explanation: '<center><span class="uur">We were unaware of anyone</span> <span class="ub">who would admit such a thing</span>.</center><br />Here we have a sentence consisting of two subordinate clauses, because neither of them can stand on its own. The first is in the indicative mood, and the second in the subjunctive, expressing the unverified.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Ψάχνω κάποιον που να μπορεί να μεταφράσει αυτό το χειρόγραφο.',
      english: 'I am looking for someone who can translate this manuscript.',
      danish: 'Jeg leder efter nogen, der kan oversætte dette manuskript.',
      correctMood: 'subjunctive',
      explanation: '<center><span class="uur">I am looking for someone</span> <span class="o123">who can translate this manuscript</span>.</center><br />The first clause is clearly in the indicative mood, since it presents a <b>real</b> action of the speaker. The mood of the second clause depends on how the speaker views the <b>existence</b> of such a person. If the speaker assumes or has been told that such a person <b>exists</b>, then the clause also presents something as <b>real</b> and is therefore indicative. If, however, the speaker does not know whether such a person <b>exists</b> and is merely searching for one, then the clause refers to an <b>unverified</b> or hypothetical person, and it is therefore subjunctive. The crucial question is thus whether the <b>existence</b> of such a person is established or <b>verified</b>.<br />We assume that the speaker does not know whether such a person <b>exists</b> or not.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Αν πρέπει να διακινδυνεύσουμε την ίδια μας τη ζωή, κανένα πρόβλημα./ας είναι.',
      english: 'If we must risk our very lives, so be it.',
      danish: 'Hvis vi må risikere vores egne liv, så må det være sådan.',
      correctMood: 'imperative',
      explanation: '<center><span class="uur">If we must risk our very lives</span>, <span class="oor">so be it</span>.</center><br />The first clause does not function semantically as a true conditional clause&mdash;<b>if</b> can be replaced with <b>since</b> or <b>given that</b>&mdash;because the speaker is not presenting a condition  whose fulfillment would determine the outcome of the second clause. Rather, the clause introduces a background premise&mdash;something that the speaker accepts or is willing to treat as given for the sake of the statement. Its meaning therefore assigns the <span class="uur">indicative mood</span> to it. The second clause then expresses the speaker’s acceptance or resignation in response to that premise. The first clause establishes the background premise, while the second clause expresses the speaker’s attitude toward it. Accordingly, the first clause can be described as a clause of background premise rather than a conditional clause in the usual sense. The mood of the second clause is <span class="oor">imperative</span>; the speaker actually commands themselves to accept the situation stoically.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Φρόντισε να έρθει στην ώρα του.',
      english: 'See that he arrive on time.',
      danish: 'Sørg for, at han kommer til tiden.',
      correctMood: 'optative',
      explanation: '<center><span class="olior">See</span>, <span class="ub">that he arrive on time</span>.</center><br />A clear, unambiguous expectation is imperative. However, hopefulness—even to a high degree—does not qualify as imperative but as optative. It becomes clear, then, that in many such situations we need more context than just the text alone. For example, body language, facial expressions, and tone of voice can clarify whether the imperative or the optative is at play. An exclamation mark signals intensity and may accompany the imperative, but it does not determine mood. It is clear that imperative punctuation is necessary, but no such punctuation exists',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Να χαμηλώσεις τη μουσική!',
      english: 'You had better turn down the music!',
      danish: 'Du må hellere skrue ned for musikken!',
      correctMood: 'imperative',
      explanation: '<center><span class="oor">You had better turn down the music!</span></center><br />A clear, unambiguous expectation is present; the mood is therefore imperative.',
      userAnswer: '',
      isCorrect: null
    },
    {
      greek: 'Ζήτω η σωκρατική νοοτροπία!',
      english: 'Long live the Socratic mindset!',
      danish: 'Længe leve den sokratiske tankegang!',
      correctMood: 'optative',
      explanation: '<center><span class="llr">Long live the Socratic mindset!</span></center><br />A clear, unambiguous hope is present; the mood is therefore optative.',
      userAnswer: '',
      isCorrect: null
    },
  ];

  const moods = [
    { greek: 'οριστική', english: 'indicative', danish: 'indikativ' },
    { greek: 'υποτακτική', english: 'subjunctive', danish: 'konjunktiv' },
    { greek: 'ευκτική', english: 'optative', danish: 'optativ' },
    { greek: 'προστακτική', english: 'imperative', danish: 'imperativ' }
  ];

  const currentExercise = exercises[currentIndex];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowResult(null);
    setShowExplanation(false);
  };

  const checkAnswer = () => {
    const isCorrect = selectedMood === currentExercise.correctMood;
    setShowResult(isCorrect);
    
    // Update score if not previously answered correctly
    if (isCorrect && !answered[currentIndex]) {
      const newAnswered = [...answered];
      newAnswered[currentIndex] = true;
      setAnswered(newAnswered);
      setScore(score + 1);
    }
  };

  const resetExercise = () => {
    setSelectedMood('');
    setShowResult(null);
    setShowExplanation(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedMood('');
      setShowResult(null);
      setShowExplanation(false);
      setCurrentLanguage('greek');
    }
  };

  const goToNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedMood('');
      setShowResult(null);
      setShowExplanation(false);
      setCurrentLanguage('greek');
    }
  };

  const getDisplayText = () => {
    switch(currentLanguage) {
      case 'greek': return currentExercise.greek;
      case 'english': return currentExercise.english;
      case 'danish': return currentExercise.danish;
    }
  };

  return (
    <div className="danish-lesson" style={{ marginTop: '-50px' }}>
      <center>
        <span style={{ fontSize: 'clamp(14px, 4vw, 20px)' }}>&copy; 2026 Isidoros Parlamas<br />parlamas@live.com &bull; socratic-school.com</span>
        <div style={{ fontSize: 'clamp(14px, 4vw, 20px)', color: 'blue' }}>Αναγνώρισε την Εγκλιση<br />Identify the Mood &bull; Bestem Modus</div>
        
        <div className="header-row" style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          margin: '3px 0'
        }}>
          {/* Instruction text above flags with dynamic Socratic date */}
          <div style={{fontSize: '11pt', backgroundColor: 'beige', color: '#7B1B1B', fontWeight: 'bold', padding: '3px'}}>
  <div style={{fontSize: '11pt', backgroundColor: 'black', color: 'lime', fontWeight: 'bold', padding: '3px'}}>
    TODAY'S DATE After Socrates (<span className="g">Gregorian year + 470</span> for AD, <span className="g">471 - Gregorian year</span> for BC = Socratic Calendar): <span style={{color: 'white'}}>{socraticDate} &bull; {currentTime}</span>
  </div>
  The Giants of Glossology (=Philosophy of Language) and Grammar:<br />
  Socrates in <span className="vvv">Cratylus</span> (1&mdash;70 AS), Dionysius Thrax in <span className="vvv">Téchnē Grammatikḗ</span> (300&mdash;380 AS), Apollonius Dyscolus in <span className="vvv">Perì Syntáxeōs</span> (580&mdash;650 AS) (<i>AS = After Socrates</i>)
</div>
          <div style={{fontSize: '11pt', backgroundColor: '#7B1B1B', color: 'beige', fontWeight: 'bold', padding: '3px'}}>Grammar is a means of interpreting reality; it is therefore closely connected to metaphysics.<br />A better understanding of <span className="oow">grammar</span> leads to a better understanding of <span className="oow">metaphysics</span>, which in turn leads to a higher <span className="oow">Quality of Life</span> across the board.</div>
          <div style={{ fontSize: 'clamp(12px, 4vw, 16px)', marginBottom: '5px' }}>click on the flag of your choice</div>
          
          {/* Flags row */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <div 
              onClick={() => setCurrentLanguage('greek')}
              style={{ cursor: 'pointer', opacity: currentLanguage === 'greek' ? 1 : 0.5 }}
            >
              <Image src="/images/danish/hlt.png" alt="Greek flag" width={20} height={20} />
            </div>
            <div 
              onClick={() => setCurrentLanguage('english')}
              style={{ cursor: 'pointer', opacity: currentLanguage === 'english' ? 1 : 0.5 }}
            >
              <Image src="/images/danish/ukk.png" alt="UK flag" width={20} height={20} />
            </div>
            <div 
              onClick={() => setCurrentLanguage('danish')}
              style={{ cursor: 'pointer', opacity: currentLanguage === 'danish' ? 1 : 0.5 }}
            >
              <Image src="/images/danish/dk.svg" alt="Danish flag" width={20} height={20} />
            </div>
          </div>
        
        </div>
        <hr style={{ margin: '5px 0' }} />
      </center>

      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0',
        fontSize: '12pt'
      }}>
        <div>Sentence {currentIndex + 1} of {exercises.length}</div>
        <div style={{ fontWeight: 'bold' }}>Score: {score}/{exercises.length}</div>
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        gap: '5px',
        justifyContent: 'center',
        margin: '5px 0 10px',
        flexWrap: 'wrap'
      }}>
        {exercises.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setSelectedMood('');
              setShowResult(null);
              setShowExplanation(false);
              setCurrentLanguage('greek');
            }}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#8b4513' : 
                             answered[index] ? 'green' : '#ccc',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Sentence display - UPDATED to use DisplayText component */}
      <div style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #8b4513',
        borderRadius: '6px',
        padding: '10px',
        margin: '10px 0',
        textAlign: 'center',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        <DisplayText content={getDisplayText()} />
      </div>

      {/* Mood selection */}
      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <div className="wow" style={{ marginBottom: '2px', fontSize: '11pt' }}>Το κριτήριο δεν είναι ο ρηματικός τύπος, αλλά το σημασιολογικό του στίγμα.<br />The criterion is not the form of the verb, but its semantic value.<br />Kriteriet er ikke verbets form, men dets semantiske værdi.<br /><span className="regress">Select the mood:</span></div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '5px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          {moods.map((mood) => (
            <button
              key={mood.english}
              onClick={() => handleMoodSelect(mood.english)}
              style={{
                backgroundColor: selectedMood === mood.english ? '#8b4513' : '#f0f0f0',
                color: selectedMood === mood.english ? 'white' : '#333',
                border: '1px solid #8b4513',
                padding: '4px 4px',
                fontSize: '12pt',
                borderRadius: '4px',
                cursor: 'pointer',
                lineHeight: '1.3'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.7em' }}>
                <div>{mood.greek}</div>
                <div>{mood.english} • {mood.danish}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px',
        margin: '15px 0',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={checkAnswer}
          disabled={!selectedMood}
          style={{
            backgroundColor: '#8b4513',
            color: 'white',
            border: 'none',
            padding: '2px 4px',
            fontSize: '11pt',
            borderRadius: '4px',
            cursor: selectedMood ? 'pointer' : 'not-allowed',
            opacity: selectedMood ? 1 : 0.5
          }}
        >
          Check
        </button>
        
        <button
          onClick={resetExercise}
          style={{
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            padding: '2px 4px',
            fontSize: '11pt',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>

        <button
          onClick={toggleExplanation}
          style={{
            backgroundColor: '#4682b4',
            color: 'white',
            border: 'none',
            padding: '2px 4px',
            fontSize: '11pt',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showExplanation ? 'Hide' : 'Explain'}
        </button>
      </div>

      {/* Explanation display */}
      {showExplanation && (
        <div style={{
          backgroundColor: '#e6f3ff',
          border: '1px solid #4682b4',
          borderRadius: '6px',
          padding: '10px',
          margin: '10px 0',
          fontSize: '12pt',
          lineHeight: '1.5'
        }}>
           <DisplayText content={currentExercise.explanation} />
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        margin: '10px 0'
      }}>
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          style={{
            backgroundColor: currentIndex === 0 ? '#ccc' : '#8b4513',
            color: 'white',
            border: 'none',
            padding: '2px 4px',
            fontSize: '11pt',
            borderRadius: '4px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Previous
        </button>
        
        <button
          onClick={goToNext}
          disabled={currentIndex === exercises.length - 1}
          style={{
            backgroundColor: currentIndex === exercises.length - 1 ? '#ccc' : '#8b4513',
            color: 'white',
            border: 'none',
            padding: '2px 4px',
            fontSize: '11pt',
            borderRadius: '4px',
            cursor: currentIndex === exercises.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Next →
        </button>
      </div>

      {/* Result display */}
      {showResult !== null && (
        <div style={{
          textAlign: 'center',
          padding: '4px',
          margin: '5px 0',
          backgroundColor: showResult ? '#e6ffe6' : '#ffe6e6',
          borderRadius: '4px',
          fontSize: '12pt'
        }}>
          {showResult ? (
            <span style={{ color: 'green' }}>✓ Correct! ({currentExercise.correctMood})</span>
          ) : (
            <span style={{ color: 'red' }}>✗ Incorrect. The correct mood is {currentExercise.correctMood}.</span>
          )}
        </div>
      )}

      {/* Mood explanation - minimal */}
      <div style={{
        marginTop: '15px',
        padding: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        fontSize: '11pt'
      }}>
        <div><center style={{backgroundColor: '#8F4103', color: 'white', fontWeight: 'bold'}}>ΤΟ ΣΩΚΡΑΤΙΚΟ ΗΜΕΡΟΛΟΓΙΟ<br />THE SOCRATIC CALENDAR &bull; DEN SOKRATISKE KALENDER</center><br />Οταν μετατρεπουμε <span className="b">προ Χριστου</span> ετη απο το Γρηγοριανο στο Σωκρατικο ημερολογιο, αφαιρουμε απο τον αριθμο <span className="r">471</span> το Γρηγοριανο ετος. Οταν μετατρεπουμε <span className="b">μετα Χριστον</span> ετη απο το Γρηγοριανο στο Σωκρατικο ημερολογιο, προσθετουμε τον αριθμο <span className="r">470</span> στο Γρηγοριανο ετος. Το ετος γεννησης του Σωκρατη ειναι το ετος <span className="r">1</span>.<br />προ Σωκρατους (<b>π.Σ.</b>) μετα Σωκρατη (<b>μ.Σ.</b>)<br /><br />When we convert <span className="b">BC</span> years from the Gregorian calendar to the Socratic calendar, we subtract the Gregorian year from the number <span className="r">471</span>. When we convert <span className="b">AD</span> years from the Gregorian calendar to the Socratic calendar, we add the number <span className="r">470</span> to the Gregorian year. The year of Socrates’ birth is year <span className="r">1</span>.<br />before Socrates (<b>b.S.</b>) — after Socrates (<b>a.S.</b>)<br /><br />Når vi omregner <span className="b">f.Kr.</span>-år fra den gregorianske kalender til den sokratiske kalender, trækker vi det gregorianske år fra tallet <span className="r">471</span>. Når vi omregner <span className="b">e.Kr.</span>-år fra den gregorianske kalender til den sokratiske kalender, lægger vi tallet <span className="r">470</span> til det gregorianske år. Sokrates’ fødselsår er år <span className="r">1</span>.<br />før Sokrates (<b>f.S.</b>) — efter Sokrates (<b>e.S.</b>)</div><hr />

        <center>indicative (<span className="b">real</span>), subjunctive (<span className="b">unrealizable or unverified</span>), optative (<span className="b">hope</span>), imperative (<span className="b">command</span>)<br />ΟΡΙΣΜΟΙ &bull; DEFINITIONS &bull; DEFINITIONER</center>
        <span className="b">Εγκλιση</span> είναι ό,τι ελπίζει να επιτύχει ο ομιλητής ή ο συγγραφέας μέσω της γλώσσας.<br /><br />
        <span className="b">Mood</span> is what the speaker or writer hopes to achieve through language.<br /><br />
        <span className="b">Modus</span> er det, taleren eller skribenten håber at opnå gennem sproget.<hr />
        <center style={{fontSize: "10pt"}}>ΟΙ 4 ΕΓΚΛΙΣΕΙΣ &bull; THE 4 MOODS &bull; DE 4 MODI</center>
        <ol style={{fontSize: "12pt", lineHeight: "2"}}>
        <li><span className="ub">&nbsp;Η οριστική έγκλιση&nbsp;</span> είναι ο λόγος που παρουσιάζει ό,τι εκφέρεται ή γράφεται ως <span className="uur">πραγματικό</span>.<br /><br />
        <span className="ub">&nbsp;The indicative mood&nbsp;</span> is the discourse that presents what is said or written as <span className="uur">real</span>.<br /><br />
        <span className="ub">&nbsp;Indikativ&nbsp;</span> er den måde at udtrykke sig på, hvor det, der siges eller skrives, fremstilles som <span className="uur">virkeligt</span>.</li><br />

        <li><span className="ub">&nbsp;Η υποτακτική έγκλιση&nbsp;</span> είναι ο λόγος που παρουσιάζει ό,τι εκφέρεται ή γράφεται ως <span className="uur">μη πραγματοποιήσιμο ή ανεπιβεβαίωτο</span>.<br /><br />
        <span className="ub">&nbsp;The subjunctive mood&nbsp;</span> is the discourse that presents what is said or written as <span className="uur">unrealizable or unverified</span>.<br /><br />
        <span className="ub">&nbsp;Konjunktiv&nbsp;</span> er den måde at udtrykke sig på, hvor det, der siges eller skrives, fremstilles som <span className="uur">urealiserbart eller ubekræftet</span>.</li><br />

        <li><span className="ub">&nbsp;Η ευκτική έγκλιση&nbsp;</span> είναι ο λόγος που παρουσιάζει ό,τι εκφέρεται ή γράφεται ως <span className="uur">ελπίδα</span>.<br /><br />
        <span className="ub">&nbsp;The optative mood&nbsp;</span> is the discourse that presents what is said or written as <span className="uur">hope</span>.<br /><br />
        <span className="ub">&nbsp;Optativ&nbsp;</span> er den måde at udtrykke sig på, hvor det, der siges eller skrives, fremstilles som <span className="uur">håb</span>.</li><br />

        <li><span className="ub">&nbsp;Η προστακτική έγκλιση&nbsp;</span> είναι ο λόγος που παρουσιάζει ό,τι εκφέρεται ή γράφεται ως <span className="uur">προσταγή</span>.<br /><br />
        <span className="ub">&nbsp;The imperative mood&nbsp;</span> is the discourse that presents what is said or written as a <span className="uur">command</span>.<br /><br />
        <span className="ub">&nbsp;Imperativ&nbsp;</span> er den måde at udtrykke sig på, hvor det, der siges eller skrives, fremstilles som en <span className="uur">befaling</span>.</li>
        </ol><hr />
        <center style={{fontSize: "10pt"}}>ΣΧΟΛΙΑ &bull; COMMENTS &bull; KOMMENTARER</center>

        <ol>
        <li><span className="ub">&nbsp;Η έγκλιση&nbsp;</span> αναλύεται στο επίπεδο της πρότασης, όχι της περιόδου· κάθε πρόταση έχει τη δική της έγκλιση.<br /><br />
        <span className="ub">&nbsp;Mood&nbsp;</span> is analyzed at the level of the clause, not the sentence; each clause has its own mood.<br /><br />
        <span className="ub">&nbsp;Modus&nbsp;</span> analyseres på sætningsniveau, ikke på helsætningsniveau; hver sætning har sin egen modus.</li><br />

        <li>Κατά κανόνα, <span className="ub">&nbsp;η υποτακτική&nbsp;</span> δεν εμφανίζεται μόνη της σε μία περίοδο· συνυπάρχει με την οριστική, την ευκτική ή την προστακτική.<br /><br />
        As a rule, <span className="ub">&nbsp;the subjunctive&nbsp;</span> does not occur alone in a sentence; it always coexists with the indicative, the optative, or the imperative.<br /><br />
        Som regel forekommer <span className="ub">&nbsp;konjunktiven&nbsp;</span> ikke alene i en helsætning; den optræder med enten indikativ, optativ eller imperativ.</li>
        </ol><hr />

        <center style={{fontSize: "10pt"}}>ΚΑΤΑ ΣΥΜΒΑΣΗ &bull; CONVENTIONS &bull; KONVENTIONER</center>

<ol>
<li>Προτάσεις <span className="uur">&nbsp;οριστικής έγκλισης&nbsp;</span> υπογραμμίζονται με κόκκινο, <span className="ub">&nbsp;υποτακτικής έγκλισης&nbsp;</span> με μπλε, <span className="llr">&nbsp;ευκτικής έγκλισης&nbsp;</span> με λαχανί, και <span className="oor">&nbsp;προστακτικής έγκλισης&nbsp;</span> με πορτοκαλί.<br /><br />

Clauses of the <span className="uur">&nbsp;indicative moood&nbsp;</span> are underlined in red, those of the <span className="ub">&nbsp;subjunctive mood&nbsp;</span> in blue, those of the <span className="llr">&nbsp;optative mood&nbsp;</span> in lime, and those of the <span className="oor">&nbsp;imperative mood&nbsp;</span> in orange.<br /><br />

Sætninger i <span className="uur">&nbsp;indikativ&nbsp;</span> er understreget med rødt, dem i <span className="ub">&nbsp;konjunktiv&nbsp;</span> med blåt, dem i <span className="llr">&nbsp;optativ&nbsp;</span> med limegrønt, og dem i <span className="oor">&nbsp;imperativ&nbsp;</span> med orange.<br /><br />
        </li><br />
</ol>
      </div>
    </div>
  );
};

export default Exercise002;