'use client';

// src/app/multilingual/components/ex-002.tsx

import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'choice' | 'danish' | 'greek' | 'pos';
type AccessStatus = 'guest' | 'signed-in' | 'purchased';
interface Word { id: number; text: string; }
interface VocabItem { english: string; danish: string; }
interface GreekItem { greek: string; english: string; }
interface ExerciseData {
  id: string;
  sentence: string;
  greekSentence?: string;
  phenomenon?: string;
  feeling?: string;
  englishWords: Word[];
  danishWords: Word[];
  greekWords: Word[];
  danishVocab: VocabItem[];
  greekVocab: GreekItem[];
  expectedPOS: Record<string, string>;
  syntaxAnalysis: Record<string, string[]>;
  generalTip?: string;
}

// ─── Exercise data ────────────────────────────────────────────────────────────

const exercises: ExerciseData[] = [
  {
    id:'ex0001', phenomenon:'Pangram', feeling:'Playfulness',
    sentence:'The quick brown fox jumps over the lazy dog.',
    greekSentence:'Η γρήγορη καφέ αλεπού πηδάει πάνω από τον οκνηρό σκύλο.',
    englishWords:[{id:1,text:'The'},{id:2,text:'quick'},{id:3,text:'brown'},{id:4,text:'fox'},{id:5,text:'jumps'},{id:6,text:'over'},{id:7,text:'the'},{id:8,text:'lazy'},{id:9,text:'dog'}],
    danishWords:[{id:1,text:'Den'},{id:2,text:'hurtige'},{id:3,text:'brune'},{id:4,text:'ræv'},{id:5,text:'springer'},{id:6,text:'over'},{id:7,text:'den'},{id:8,text:'dovne'},{id:9,text:'hund'}],
    greekWords:[{id:1,text:'Η'},{id:2,text:'γρήγορη'},{id:3,text:'καφέ'},{id:4,text:'αλεπού'},{id:5,text:'πηδάει'},{id:6,text:'πάνω από'},{id:7,text:'τον'},{id:8,text:'οκνηρό'},{id:9,text:'σκύλο'}],
    danishVocab:[{english:'The',danish:'Den'},{english:'quick',danish:'hurtige'},{english:'brown',danish:'brune'},{english:'fox',danish:'ræv'},{english:'jumps',danish:'springer'},{english:'over',danish:'over'},{english:'the',danish:'den'},{english:'lazy',danish:'dovne'},{english:'dog',danish:'hund'}],
    greekVocab:[{greek:'Η',english:'The'},{greek:'γρήγορη',english:'quick'},{greek:'καφέ',english:'brown'},{greek:'αλεπού',english:'fox'},{greek:'πηδάει',english:'jumps'},{greek:'πάνω από',english:'over'},{greek:'τον',english:'the'},{greek:'οκνηρό',english:'lazy'},{greek:'σκύλο',english:'dog'}],
    expectedPOS:{'The':'article','quick':'adjective','brown':'adjective','fox':'noun','jumps':'verb','over':'preposition','the':'article','lazy':'adjective','dog':'noun'},
    syntaxAnalysis:{'The quick brown fox':['subject','noun phrase'],'jumps over the lazy dog':['complete predicate','verb phrase'],'over the lazy dog':['prepositional phrase'],'the lazy dog':['object of preposition','noun phrase'],'fox':['head noun'],'dog':['head noun']},
    generalTip:'There are 10 parts of speech. Infinitives are nouns because they name the action of the verb (e.g. to steal names the action of stealing).',
  },
  {
    id:'ex0002', phenomenon:'Concession', feeling:'Reluctance',
    sentence:'Even though they knew the brothers well, they did not wish to divulge any details about their personal lives.',
    greekSentence:'Αν και γνώριζαν τους αδελφούς καλά, δεν ήθελαν να αποκαλύψουν λεπτομέριες για την προσωπική τους ζωή.',
    englishWords:[{id:1,text:'even though'},{id:2,text:'they'},{id:3,text:'knew'},{id:4,text:'the'},{id:5,text:'brothers'},{id:6,text:'well'},{id:7,text:'they'},{id:8,text:'did'},{id:9,text:'not'},{id:10,text:'wish'},{id:11,text:'to'},{id:12,text:'divulge'},{id:13,text:'any'},{id:14,text:'details'},{id:15,text:'about'},{id:16,text:'their'},{id:17,text:'personal'},{id:18,text:'lives'}],
    danishWords:[{id:1,text:'selv om'},{id:2,text:'de'},{id:3,text:'kendte'},{id:4,text:'brødrene'},{id:5,text:'godt'},{id:6,text:'de'},{id:7,text:'ønskede ikke'},{id:8,text:'at'},{id:9,text:'afsløre'},{id:10,text:'nogen'},{id:11,text:'detaljer'},{id:12,text:'om'},{id:13,text:'deres personlige'},{id:14,text:'liv'}],
    greekWords:[{id:1,text:'αν και'},{id:2,text:'γνώριζαν'},{id:3,text:'τους'},{id:4,text:'αδελφούς'},{id:5,text:'καλά'},{id:6,text:'δεν ήθελαν'},{id:7,text:'να'},{id:8,text:'αποκαλύψουν'},{id:9,text:'λεπτομέριες'},{id:10,text:'για'},{id:11,text:'την προσωπική τους'},{id:12,text:'ζωή'}],
    danishVocab:[{english:'even though',danish:'selv om'},{english:'they',danish:'de'},{english:'knew',danish:'kendte'},{english:'the brothers',danish:'brødrene'},{english:'well',danish:'godt'},{english:'they did not wish',danish:'ønskede ikke'},{english:'to',danish:'at'},{english:'divulge',danish:'afsløre'},{english:'any details',danish:'nogen detaljer'},{english:'about',danish:'om'},{english:'their personal',danish:'deres personlige'},{english:'lives',danish:'liv'}],
    greekVocab:[{greek:'αν και',english:'even though'},{greek:'γνώριζαν',english:'they knew'},{greek:'τους',english:'the'},{greek:'αδελφούς',english:'brothers'},{greek:'καλά',english:'well'},{greek:'δεν ήθελαν',english:'they did not wish'},{greek:'να',english:'to'},{greek:'αποκαλύψουν',english:'divulge'},{greek:'λεπτομέριες',english:'any details'},{greek:'για',english:'about'},{greek:'την προσωπική τους',english:'their personal'},{greek:'ζωή',english:'lives'}],
    expectedPOS:{'even though':'conjunction','they':'pronoun','knew':'verb','the':'article','brothers':'noun','well':'adverb','did':'verb','not':'adverb','wish':'verb','to':'particle','divulge':'verb','any':'adjective','details':'noun','about':'preposition','their':'adjective','personal':'adjective','lives':'noun'},
    syntaxAnalysis:{'Even though they knew the brothers well':['subordinate clause','dependent clause'],'they did not wish to divulge any details about their personal lives':['main clause','independent clause'],'to divulge any details about their personal lives':['infinitive phrase'],'about their personal lives':['prepositional phrase']},
    generalTip:'Infinitives are nouns. "did not" is an adverb of negation — it modifies the verb "wish."',
  },
  {
    id:'ex0003', phenomenon:'A caustic reminder', feeling:'Bluntness',
    sentence:'People pee in the toilet.',
    greekSentence:'Οι άνθρωποι ουρούν στην τουαλέτα.',
    englishWords:[{id:1,text:'People'},{id:2,text:'pee'},{id:3,text:'in'},{id:4,text:'the'},{id:5,text:'toilet'}],
    danishWords:[{id:1,text:'folk'},{id:2,text:'tisser'},{id:3,text:'på'},{id:4,text:'toilettet'}],
    greekWords:[{id:1,text:'οι άνθρωποι'},{id:2,text:'ουρούν'},{id:3,text:'στην'},{id:4,text:'τουαλέτα'}],
    danishVocab:[{english:'People',danish:'folk'},{english:'pee',danish:'tisser'},{english:'in the',danish:'på'},{english:'toilet',danish:'toilettet'}],
    greekVocab:[{greek:'οι άνθρωποι',english:'People'},{greek:'ουρούν',english:'pee'},{greek:'στην',english:'in the'},{greek:'τουαλέτα',english:'toilet'}],
    expectedPOS:{'People':'noun','pee':'verb','in':'preposition','the':'article','toilet':'noun'},
    syntaxAnalysis:{'People':['subject'],'pee in the toilet':['complete predicate','verb phrase'],'in the toilet':['prepositional phrase'],'toilet':['head noun']},
    generalTip:'In Danish, the definite form of nouns is marked by a suffix (-en/-et). When preceded by an adjective, definiteness is marked by a free article (den/det/de) before the adjective.',
  },
  {
    id:'ex0004', phenomenon:'Breaking the rules', feeling:'The satisfaction of evasion',
    sentence:'— Where at school do you smoke?\n— Outside.',
    greekSentence:'— Πού καπνίζεις στο σχολείο;\n— Εξω.',
    englishWords:[{id:1,text:'Where'},{id:2,text:'at'},{id:3,text:'school'},{id:4,text:'do'},{id:5,text:'you'},{id:6,text:'smoke'},{id:7,text:'Outside'}],
    danishWords:[{id:1,text:'Hvor'},{id:2,text:'på'},{id:3,text:'skolen'},{id:4,text:'ryger du'},{id:5,text:'Udenfor'}],
    greekWords:[{id:1,text:'Πού'},{id:2,text:'καπνίζεις'},{id:3,text:'στο'},{id:4,text:'σχολείο'},{id:5,text:'Εξω'}],
    danishVocab:[{english:'Where',danish:'Hvor'},{english:'at',danish:'på'},{english:'school',danish:'skolen'},{english:'do you smoke',danish:'ryger du'},{english:'Outside',danish:'Udenfor'}],
    greekVocab:[{greek:'Πού',english:'Where'},{greek:'καπνίζεις',english:'do you smoke'},{greek:'στο',english:'at the'},{greek:'σχολείο',english:'school'},{greek:'Εξω',english:'Outside'}],
    expectedPOS:{'Where':'adverb','at':'preposition','school':'noun','do':'particle','you':'pronoun','smoke':'verb','Outside':'adverb'},
    syntaxAnalysis:{'Where at school':['adverbial phrase','prepositional phrase'],'do you smoke':['main clause','interrogative clause'],'at school':['prepositional phrase'],'Outside':['adverb','short answer']},
    generalTip:'"do" is a particle — it signals a question without having its own agent or patient. Particles are not a part of speech.',
  },
  {
    id:'ex0005', phenomenon:'Routine', feeling:'Stability',
    sentence:'Steve gets up at 6:30. He works in a small IT company.',
    greekSentence:'Ο Στηβ σηκώνεται στις 6:30. Εργάζεται σε μία μικρή εταιρεία πληροφορικής.',
    englishWords:[{id:1,text:'Steve'},{id:2,text:'gets'},{id:3,text:'up'},{id:4,text:'at'},{id:5,text:'6:30'},{id:6,text:'He'},{id:7,text:'works'},{id:8,text:'in'},{id:9,text:'a'},{id:10,text:'small'},{id:11,text:'IT'},{id:12,text:'company'}],
    danishWords:[{id:1,text:'Steve'},{id:2,text:'står op'},{id:3,text:'klokken'},{id:4,text:'halv syv'},{id:5,text:'Han'},{id:6,text:'arbejder'},{id:7,text:'i'},{id:8,text:'et'},{id:9,text:'lille'},{id:10,text:'IT'},{id:11,text:'firma'}],
    greekWords:[{id:1,text:'Ο Στηβ'},{id:2,text:'σηκώνεται'},{id:3,text:'στις'},{id:4,text:'6:30'},{id:5,text:'Εργάζεται'},{id:6,text:'σε'},{id:7,text:'μία'},{id:8,text:'μικρή'},{id:9,text:'εταιρεία πληροφορικής'}],
    danishVocab:[{english:'Steve',danish:'Steve'},{english:'gets up',danish:'står op'},{english:'at',danish:'klokken'},{english:'6:30',danish:'halv syv'},{english:'He',danish:'Han'},{english:'works',danish:'arbejder'},{english:'in',danish:'i'},{english:'a',danish:'et'},{english:'small',danish:'lille'},{english:'IT',danish:'IT'},{english:'company',danish:'firma'}],
    greekVocab:[{greek:'Ο Στηβ',english:'Steve'},{greek:'σηκώνεται',english:'gets up'},{greek:'στις',english:'at'},{greek:'6:30',english:'6:30'},{greek:'Εργάζεται',english:'He works'},{greek:'σε',english:'in'},{greek:'μία',english:'a'},{greek:'μικρή',english:'small'},{greek:'εταιρεία πληροφορικής',english:'IT company'}],
    expectedPOS:{'Steve':'noun','gets':'verb','up':'particle','at':'preposition','6:30':'adjective','He':'pronoun','works':'verb','in':'preposition','a':'article','small':'adjective','IT':'adjective','company':'noun'},
    syntaxAnalysis:{'Steve gets up at 6:30':['main clause','independent clause'],'at 6:30':['prepositional phrase','adverbial phrase'],'He works in a small IT company':['main clause','independent clause'],'in a small IT company':['prepositional phrase'],'gets up':['phrasal verb']},
    generalTip:'6:30 is an adjective — it modifies a noun (The time is 6:30). All numerals are adjectives. IT is an adjective because it modifies "company."',
  },
  {
    id:'ex0006', phenomenon:'Following instructions', feeling:'Mechanical',
    sentence:'Listen and repeat: Hi, my name is Mark. What is your name?',
    greekSentence:'Ακου και επανάλαβε: Γεια σου, με λένε Μάρκο. Πώς σε λένε εσένα;',
    englishWords:[{id:1,text:'Listen'},{id:2,text:'and'},{id:3,text:'repeat'},{id:4,text:'Hi'},{id:5,text:'my'},{id:6,text:'name'},{id:7,text:'is'},{id:8,text:'Mark'},{id:9,text:'What'},{id:10,text:'is'},{id:11,text:'your'},{id:12,text:'name'}],
    danishWords:[{id:1,text:'Lyt'},{id:2,text:'og'},{id:3,text:'gentag'},{id:4,text:'Hej'},{id:5,text:'mit navn er'},{id:6,text:'Mark'},{id:7,text:'Hvad'},{id:8,text:'hedder du'}],
    greekWords:[{id:1,text:'Ακου'},{id:2,text:'και'},{id:3,text:'επανάλαβε'},{id:4,text:'Γειά σου'},{id:5,text:'με λένε'},{id:6,text:'Μάρκο'},{id:7,text:'Πώς'},{id:8,text:'σε λένε εσένα'}],
    danishVocab:[{english:'Listen',danish:'Lyt'},{english:'and',danish:'og'},{english:'repeat',danish:'gentag'},{english:'Hi',danish:'Hej'},{english:'my name is',danish:'mit navn er'},{english:'Mark',danish:'Mark'},{english:'What',danish:'Hvad'},{english:'is your name',danish:'hedder du'}],
    greekVocab:[{greek:'Ακου',english:'Listen'},{greek:'και',english:'and'},{greek:'επανάλαβε',english:'repeat'},{greek:'Γειά σου',english:'Hi'},{greek:'με λένε',english:'my name is'},{greek:'Μάρκο',english:'Mark'},{greek:'Πώς',english:'What'},{greek:'σε λένε εσένα',english:'is your name'}],
    expectedPOS:{'Listen':'verb','and':'conjunction','repeat':'verb','Hi':'interjection','my':'adjective','name':'noun','is':'verb','Mark':'noun','What':'pronoun','your':'adjective'},
    syntaxAnalysis:{'Listen and repeat':['imperative sentence','compound verb phrase'],'Hi':['interjection'],'my name is Mark':['declarative clause','main clause'],'What is your name':['interrogative clause','main clause']},
    generalTip:'In Danish, "What is your name?" is "Hvad hedder du?" (literally "What are you called?") which is more natural than the direct translation.',
  },
  {
    id:'ex0007', phenomenon:'Ethnicity', feeling:'Confirmation',
    sentence:'They speak Greek.',
    greekSentence:'Μιλούν ελληνικά.',
    englishWords:[{id:1,text:'They'},{id:2,text:'speak'},{id:3,text:'Greek'}],
    danishWords:[{id:1,text:'De'},{id:2,text:'taler'},{id:3,text:'græsk'}],
    greekWords:[{id:1,text:'Μιλούν'},{id:2,text:'ελληνικά'}],
    danishVocab:[{english:'They',danish:'De'},{english:'speak',danish:'taler'},{english:'Greek',danish:'græsk'}],
    greekVocab:[{greek:'Μιλούν',english:'They speak'},{greek:'ελληνικά',english:'Greek'}],
    expectedPOS:{'They':'pronoun','speak':'verb','Greek':'noun'},
    syntaxAnalysis:{'They':['subject','pronoun'],'speak':['verb','transitive verb'],'Greek':['direct object','noun'],'speak Greek':['predicate','verb phrase']},
    generalTip:'"Greek" functions as a direct object, receiving the action of "speak." Languages are treated as nouns when used as objects of verbs like "speak," "learn," or "understand."',
  },
  {
    id:'ex0008', phenomenon:'Interest in origin', feeling:'Curiosity',
    sentence:'Where does she come from?',
    greekSentence:'Από πού είναι;',
    englishWords:[{id:1,text:'Where'},{id:2,text:'does'},{id:3,text:'she'},{id:4,text:'come'},{id:5,text:'from'}],
    danishWords:[{id:1,text:'Hvor'},{id:2,text:'kommer'},{id:3,text:'hun'},{id:4,text:'fra'}],
    greekWords:[{id:1,text:'Από πού είναι;'}],
    danishVocab:[{english:'Where',danish:'Hvor'},{english:'does...come',danish:'kommer'},{english:'she',danish:'hun'},{english:'from',danish:'fra'}],
    greekVocab:[{greek:'Από πού είναι;',english:'Where does she come from?'}],
    expectedPOS:{'Where':'adverb','does':'particle','she':'pronoun','come':'verb','from':'preposition'},
    syntaxAnalysis:{'Where':['interrogative adverb'],'does':['auxiliary verb','question particle'],'she':['subject','pronoun'],'come from':['phrasal verb'],'Where does she come from':['interrogative clause','complete sentence']},
    generalTip:'"come from" is a phrasal verb meaning "originate." In Greek, the word order is different — "from" (από) comes before "where" (πού).',
  },
  {
    id:'ex0009', phenomenon:'Interest in languages', feeling:'Curiosity',
    sentence:'What language do they speak?',
    greekSentence:'Τί γλώσσα μιλούν;',
    englishWords:[{id:1,text:'What'},{id:2,text:'language'},{id:3,text:'do'},{id:4,text:'they'},{id:5,text:'speak'}],
    danishWords:[{id:1,text:'Hvad'},{id:2,text:'sprog'},{id:3,text:'taler'},{id:4,text:'de'}],
    greekWords:[{id:1,text:'Τί'},{id:2,text:'γλώσσα'},{id:3,text:'μιλούν;'}],
    danishVocab:[{english:'What',danish:'Hvad'},{english:'language',danish:'sprog'},{english:'do they speak?',danish:'taler de?'}],
    greekVocab:[{greek:'Τί',english:'What'},{greek:'γλώσσα',english:'language'},{greek:'μιλούν;',english:'do they speak?'}],
    expectedPOS:{'What':'pronoun','language':'noun','do':'particle','they':'pronoun','speak':'verb'},
    syntaxAnalysis:{'What language':['direct object','noun phrase'],'they':['subject'],'speak':['verb','transitive verb'],'do they speak':['main clause']},
    generalTip:'"What" is an interrogative determiner modifying "language." The phrase "What language" is the direct object of "speak."',
  },
  {
    id:'ex0010', phenomenon:'Following instructions', feeling:'Mechanical',
    sentence:'Ask and answer in turns.',
    greekSentence:'Ρωτήστε και απαντήστε με τη σειρά.',
    englishWords:[{id:1,text:'Ask'},{id:2,text:'and'},{id:3,text:'answer'},{id:4,text:'in'},{id:5,text:'turns'}],
    danishWords:[{id:1,text:'Spørg'},{id:2,text:'og'},{id:3,text:'svar'},{id:4,text:'på skift'}],
    greekWords:[{id:1,text:'Ρωτήστε'},{id:2,text:'και'},{id:3,text:'απαντήστε'},{id:4,text:'με τη σειρά'}],
    danishVocab:[{english:'Ask',danish:'Spørg'},{english:'and',danish:'og'},{english:'answer',danish:'svar'},{english:'in turns',danish:'på skift'}],
    greekVocab:[{greek:'Ρωτήστε',english:'Ask'},{greek:'και',english:'and'},{greek:'απαντήστε',english:'answer'},{greek:'με τη σειρά',english:'in turns'}],
    expectedPOS:{'Ask':'verb','and':'conjunction','answer':'verb','in':'preposition','turns':'noun'},
    syntaxAnalysis:{'Ask and answer':['compound verb phrase'],'in turns':['adverbial phrase','prepositional phrase'],'Ask and answer in turns':['complete imperative sentence']},
    generalTip:'"Ask" and "answer" are both imperative verbs joined by the conjunction "and." "in turns" is a prepositional phrase functioning as an adverbial modifier.',
  },
  {
    id:'ex0011', phenomenon:'Interest in origin', feeling:'Curiosity',
    sentence:'What is her mother tongue?',
    greekSentence:'Ποια είναι η μητρική της γλώσσα;',
    englishWords:[{id:1,text:'What'},{id:2,text:'is'},{id:3,text:'her'},{id:4,text:'mother'},{id:5,text:'tongue'}],
    danishWords:[{id:1,text:'Hvad'},{id:2,text:'er'},{id:3,text:'hendes'},{id:4,text:'modersmål'}],
    greekWords:[{id:1,text:'Ποια'},{id:2,text:'είναι'},{id:3,text:'η'},{id:4,text:'μητρική'},{id:5,text:'της'},{id:6,text:'γλώσσα'}],
    danishVocab:[{english:'What',danish:'Hvad'},{english:'is',danish:'er'},{english:'her',danish:'hendes'},{english:'mother tongue',danish:'modersmål'}],
    greekVocab:[{greek:'Ποια',english:'What'},{greek:'είναι',english:'is'},{greek:'η',english:'the'},{greek:'μητρική',english:'native'},{greek:'της',english:'her'},{greek:'γλώσσα',english:'language'}],
    expectedPOS:{'What':'interrogative pronoun','is':'verb','her':'possessive adjective','mother':'noun','tongue':'noun'},
    syntaxAnalysis:{'What':['interrogative pronoun','subject of the question'],'is':['linking verb','present tense'],'her':['possessive adjective','modifies "mother tongue"'],'mother tongue':['compound noun','subject complement']},
    generalTip:'"modersmål" in Danish combines "moder" (mother) and "sprog" (language) into a single compound noun. In Greek, "της" is the feminine possessive genitive.',
  },
  {
    id:'ex0012', phenomenon:'Interest in nationality', feeling:'Curiosity',
    sentence:"What is Tina's nationality?",
    greekSentence:'Ποιά είναι η εθνικότητα της Τίνας;',
    englishWords:[{id:1,text:'What'},{id:2,text:'is'},{id:3,text:"Tina's"},{id:4,text:'nationality?'}],
    danishWords:[{id:1,text:'Hvad'},{id:2,text:'er'},{id:3,text:'Tinas'},{id:4,text:'nationalitet'}],
    greekWords:[{id:1,text:'Ποιά'},{id:2,text:'είναι'},{id:3,text:'η εθνικότητα της Τίνας;'}],
    danishVocab:[{english:'What',danish:'Hvad'},{english:'is',danish:'er'},{english:"Tina's",danish:'Tinas'},{english:'nationality?',danish:'nationalitet?'}],
    greekVocab:[{greek:'Ποιά',english:'What'},{greek:'είναι',english:'is'},{greek:'η εθνικότητα της Τίνας;',english:"Tina's nationality?"}],
    expectedPOS:{'What':'interrogative pronoun','is':'verb',"Tina's":'possessive noun','nationality?':'noun'},
    syntaxAnalysis:{'What':['interrogative pronoun','subject of the question'],'is':['linking verb'],"Tina's":['possessive noun phrase','proper noun + possessive genitive'],'nationality':['noun','subject complement']},
    generalTip:"Danish uses the genitive -s suffix without an apostrophe: \"Tinas\" = \"Tina's\". In Greek, the possessive is formed with \"της\" (genitive of she) + name.",
  },
  {
    id:'ex0013', phenomenon:'Following instructions', feeling:'Mechanical',
    sentence:'Introduce two other course participants (a man and a woman) to your partner. Tell about their name, nationality, and mother tongue.',
    greekSentence:'Σύστησε δύο άλλους συμμαθητές σου (έναν άνδρα και μία γυναίκα) στον συνεργάτη σου. Πες για το όνομά τους, την εθνικότητά τους και την μητρική τους γλώσσα.',
    englishWords:[{id:1,text:'Introduce'},{id:2,text:'two'},{id:3,text:'other'},{id:4,text:'course'},{id:5,text:'participants'},{id:6,text:'a'},{id:7,text:'man'},{id:8,text:'and'},{id:9,text:'a'},{id:10,text:'woman'},{id:11,text:'to'},{id:12,text:'your'},{id:13,text:'partner'},{id:14,text:'Tell'},{id:15,text:'about'},{id:16,text:'their'},{id:17,text:'name'},{id:18,text:'nationality'},{id:19,text:'and'},{id:20,text:'mother'},{id:21,text:'tongue'}],
    danishWords:[{id:1,text:'Præsenter'},{id:2,text:'to'},{id:3,text:'andre'},{id:4,text:'kursister'},{id:5,text:'en'},{id:6,text:'mand'},{id:7,text:'og'},{id:8,text:'en'},{id:9,text:'kvinde'},{id:10,text:'for'},{id:11,text:'din'},{id:12,text:'partner'},{id:13,text:'Fortæl'},{id:14,text:'om'},{id:15,text:'navn'},{id:16,text:'nationalitet'},{id:17,text:'og'},{id:18,text:'modersmål'}],
    greekWords:[{id:1,text:'Σύστησε'},{id:2,text:'δύο'},{id:3,text:'άλλους'},{id:4,text:'συμμαθητές σου'},{id:5,text:'έναν άνδρα και μία γυναίκα'},{id:6,text:'στον συνεργάτη σου'},{id:7,text:'Πες για'},{id:8,text:'το όνομά τους, την εθνικότητά τους και την μητρική τους γλώσσα.'}],
    danishVocab:[{english:'Introduce',danish:'Præsenter'},{english:'two other course participants',danish:'to andre kursister'},{english:'a man and a woman',danish:'en mand og en kvinde'},{english:'to your partner',danish:'for din partner'},{english:'Tell about',danish:'Fortæl om'},{english:'name',danish:'navn'},{english:'nationality',danish:'nationalitet'},{english:'and mother tongue',danish:'og modersmål'}],
    greekVocab:[{greek:'Σύστησε',english:'Introduce'},{greek:'δύο',english:'two'},{greek:'άλλους',english:'other'},{greek:'συμμαθητές σου',english:'course participants'},{greek:'έναν άνδρα και μία γυναίκα',english:'a man and a woman'},{greek:'στον συνεργάτη σου',english:'to your partner'},{greek:'Πες για',english:'Tell about'},{greek:'το όνομά τους, την εθνικότητά τους και την μητρική τους γλώσσα.',english:'their name, nationality, and mother tongue.'}],
    expectedPOS:{'Introduce':'verb','two':'adjective','other':'adjective','course':'adjective','participants':'noun','a':'article','man':'noun','and':'conjunction','woman':'noun','to':'preposition','your':'adjective','partner':'noun','Tell':'verb','about':'preposition','their':'adjective','name':'noun','nationality':'noun','mother':'noun','tongue':'noun'},
    syntaxAnalysis:{'Introduce':['imperative verb','main verb'],'two other course participants':['noun phrase','direct object'],'a man and a woman':['noun phrase','appositive'],'to your partner':['prepositional phrase','indirect object'],'name, nationality, and mother tongue':['compound noun phrase','coordinated nouns']},
    generalTip:'"Introduce" and "Tell" are both imperative verbs. "a man and a woman" is an appositive phrase clarifying who the participants are.',
  },
  {
    id:'ex0014', phenomenon:'Practice', feeling:'Self-confidence',
    sentence:"Listen and repeat, and mark the stress with ' as shown — before the stressed syllable. Place the words under the categories: country, nationality, and language.",
    greekSentence:"Άκου και επανάλαβε και βάλε τον τόνο: ' όπως φαίνεται (πριν από τη συλλαβή με τον τόνο). Τοποθέτησε τις λέξεις κάτω από: χώρα, εθνικότητα, και γλώσσα.",
    englishWords:[{id:1,text:'Listen'},{id:2,text:'and'},{id:3,text:'repeat'},{id:4,text:'and'},{id:5,text:'mark'},{id:6,text:'the'},{id:7,text:'stress'},{id:8,text:'as shown'},{id:9,text:'before'},{id:10,text:'the stressed syllable'},{id:11,text:'Place'},{id:12,text:'the words'},{id:13,text:'under'},{id:14,text:'country'},{id:15,text:'nationality'},{id:16,text:'and'},{id:17,text:'language'}],
    danishWords:[{id:1,text:'Lyt'},{id:2,text:'og'},{id:3,text:'gentag'},{id:4,text:'og'},{id:5,text:'sæt'},{id:6,text:'tryk'},{id:7,text:'som vist'},{id:8,text:'før stavelsen med tryk'},{id:9,text:'Placer ordene under'},{id:10,text:'land'},{id:11,text:'nationalitet'},{id:12,text:'og'},{id:13,text:'sprog'}],
    greekWords:[{id:1,text:'Άκου'},{id:2,text:'και'},{id:3,text:'επανάλαβε'},{id:4,text:'και'},{id:5,text:'βάλε τον τόνο'},{id:6,text:'όπως φαίνεται'},{id:7,text:'πριν από την συλλαβή με τον τόνο'},{id:8,text:'Τοποθέτησε τις λέξεις κάτω από'},{id:9,text:'χώρα'},{id:10,text:'εθνικότητα'},{id:11,text:'και'},{id:12,text:'γλώσσα'}],
    danishVocab:[{english:'Listen',danish:'Lyt'},{english:'and repeat',danish:'og gentag'},{english:'and mark',danish:'og sæt'},{english:'the stress',danish:'tryk'},{english:'as shown',danish:'som vist'},{english:'before the stressed syllable',danish:'før stavelsen med tryk'},{english:'Place the words under',danish:'Placer ordene under'},{english:'country',danish:'land'},{english:'nationality',danish:'nationalitet'},{english:'language',danish:'sprog'}],
    greekVocab:[{greek:'Άκου',english:'Listen'},{greek:'και',english:'and'},{greek:'επανάλαβε',english:'repeat'},{greek:'βάλε τον τόνο',english:'mark the stress'},{greek:'όπως φαίνεται',english:'as shown'},{greek:'πριν από την συλλαβή με τον τόνο',english:'before the stressed syllable'},{greek:'Τοποθέτησε τις λέξεις κάτω από',english:'Place the words under'},{greek:'χώρα',english:'country'},{greek:'εθνικότητα',english:'nationality'},{greek:'γλώσσα',english:'language'}],
    expectedPOS:{'Listen':'verb','and':'conjunction','repeat':'verb','mark':'verb','the':'article','stress':'noun','before':'preposition','Place':'verb','country':'noun','nationality':'noun','language':'noun'},
    syntaxAnalysis:{'Listen and repeat and mark':['compound imperative phrase','three commands'],'as shown':['adverbial phrase','manner'],'before the stressed syllable':['prepositional phrase'],'Place the words under':['imperative phrase','command'],'country, nationality, language':['coordinate nouns','categories']},
    generalTip:'"tryk" in Danish means stress. Danish also has stød (a glottal stop) in addition to word stress. Greek uses accent marks (τόνοι) to indicate stress.',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

const C = { danish:'#185FA5', greek:'#A32D2D', pos:'#3B6D11' };

const posOptions = ['article','adjective','noun','verb','pronoun','adverb','preposition','conjunction','interjection','particle','possessive adjective','interrogative pronoun','possessive noun'];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Exercise002({ accessStatus = 'guest' }: { accessStatus?: AccessStatus }) {
  const [exIndex, setExIndex] = useState(0);
  const [phase, setPhase]     = useState<Phase>('choice');
  const [showSyntax, setShowSyntax] = useState(false);
  const [danishAnswers, setDanishAnswers] = useState<Record<number,string>>({});
  const [danishChecked, setDanishChecked] = useState(false);
  const [shuffledDanish, setShuffledDanish] = useState<string[]>([]);
  const [greekAnswers, setGreekAnswers]   = useState<Record<number,string>>({});
  const [greekChecked, setGreekChecked]   = useState(false);
  const [shuffledGreek, setShuffledGreek] = useState<string[]>([]);
  const [posAnswers, setPosAnswers]       = useState<Record<number,string>>({});
  const [posChecked, setPosChecked]       = useState(false);

  const ex = exercises[exIndex];
  const isLocked = accessStatus !== 'purchased' && exIndex > 0;

  useEffect(() => {
    setShuffledDanish(shuffle(ex.danishWords.map(w => w.text)));
    setShuffledGreek(shuffle(ex.greekWords.map(w => w.text)));
    setDanishAnswers({}); setDanishChecked(false);
    setGreekAnswers({});  setGreekChecked(false);
    setPosAnswers({});    setPosChecked(false);
    setPhase('choice');   setShowSyntax(false);
  }, [exIndex]);

  const danishScore = ex.englishWords.filter(w => {
    const c = ex.danishVocab.find(v => v.english===w.text)?.danish;
    return c && danishAnswers[w.id]?.toLowerCase()===c.toLowerCase();
  }).length;

  const greekScore = ex.greekWords.filter(w => {
    const c = ex.greekVocab.find(v => v.greek===w.text)?.english;
    return c && greekAnswers[w.id]?.toLowerCase()===c.toLowerCase();
  }).length;

  const posScore = ex.englishWords.filter(w =>
    posAnswers[w.id]?.toLowerCase()===ex.expectedPOS[w.text]?.toLowerCase()
  ).length;

  const resetPhase = () => {
    if (phase==='danish') { setDanishAnswers({}); setDanishChecked(false); setShuffledDanish(shuffle(ex.danishWords.map(w=>w.text))); }
    if (phase==='greek')  { setGreekAnswers({});  setGreekChecked(false);  setShuffledGreek(shuffle(ex.greekWords.map(w=>w.text))); }
    if (phase==='pos')    { setPosAnswers({});     setPosChecked(false); }
  };

  // ── Shared styles ────────────────────────────────────────────────────────────

  const f = "'Source Serif 4', Georgia, serif";
  const fp = "'Playfair Display', serif";

  const wordBox = (highlight?: boolean, color?: string): React.CSSProperties => ({
    fontSize:13, fontWeight:500,
    color: highlight ? '#fff' : '#333',
    background: highlight ? color : '#f4f4f4',
    border:`0.5px solid ${highlight ? color : '#ccc'}`,
    borderRadius:6, padding:'4px 10px', minWidth:56, textAlign:'center' as const,
  });

  const sel = (ok: boolean, bad: boolean): React.CSSProperties => ({
    fontSize:12, padding:'4px 2px',
    border:`1.5px solid ${ok?'#3B6D11':bad?'#A32D2D':'#bbb'}`,
    borderRadius:6,
    background:ok?'#EAF3DE':bad?'#FCEBEB':'#fff',
    color:ok?'#27500A':bad?'#791F1F':'#333',
    minWidth:70, maxWidth:110, fontFamily:f,
  });

  const primaryBtn = (color: string, disabled?: boolean): React.CSSProperties => ({
    background:disabled?'#ccc':color, border:'none', borderRadius:8,
    padding:'7px 20px', fontSize:13, cursor:disabled?'not-allowed':'pointer',
    color:'#fff', fontFamily:f,
  });

  const secondaryBtn: React.CSSProperties = {
    background:'#fff', border:'0.5px solid #ccc', borderRadius:8,
    padding:'7px 20px', fontSize:13, cursor:'pointer', color:'#333', fontFamily:f,
  };

  const backBtn: React.CSSProperties = {
    fontSize:12, color:'#888', background:'none', border:'none',
    cursor:'pointer', fontFamily:f, textDecoration:'underline',
  };

  const scoreBox = (perfect: boolean): React.CSSProperties => ({
    textAlign:'center' as const, padding:'0.6rem 1rem', borderRadius:8,
    background:perfect?'#EAF3DE':'#f7f7f7',
    border:`0.5px solid ${perfect?'#3B6D11':'#ddd'}`,
    fontSize:14, fontWeight:500,
    color:perfect?'#27500A':'#333', marginBottom:'0.75rem',
  });

  // ── Grid renderer ────────────────────────────────────────────────────────────

  const Grid = ({
    words, topLabel, topStyle, getValue, onChange, options, checked, isOk, isBad, correctLabel, color,
  }: {
    words: Word[];
    topLabel: (w: Word) => string;
    topStyle: (w: Word) => React.CSSProperties;
    getValue: (w: Word) => string;
    onChange: (w: Word, v: string) => void;
    options: string[];
    checked: boolean;
    isOk: (w: Word) => boolean;
    isBad: (w: Word) => boolean;
    correctLabel: (w: Word) => string;
    color: string;
  }) => (
    <div style={{ overflowX:'auto', paddingBottom:8 }}>
      <div style={{ display:'flex', gap:6, minWidth:'max-content' }}>
        {words.map(w => (
          <div key={w.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
            <div style={topStyle(w)}>{topLabel(w)}</div>
            {isLocked ? (
              <div style={{ width:70, height:34, background:'rgba(0,0,0,0.06)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, color:'#bbb' }}>🔒</div>
            ) : (
              <select value={getValue(w)} onChange={e => onChange(w, e.target.value)} disabled={checked} style={sel(isOk(w), isBad(w))}>
                <option value="">—</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            )}
            {checked && isBad(w) && (
              <div style={{ fontSize:11, color, fontStyle:'italic', textAlign:'center', maxWidth:90 }}>{correctLabel(w)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ── Paywall ──────────────────────────────────────────────────────────────────

  const Paywall = ({ color, bg, border }: { color: string; bg: string; border: string }) => isLocked ? (
    <div style={{ marginTop:'0.75rem', background:bg, border:`0.5px solid ${border}`, borderRadius:8, padding:'0.65rem 1rem', fontSize:13, color, textAlign:'center' as const }}>
      The first sentence is free.{' '}
      {accessStatus==='guest'
        ? <><a href="/students/sign-in" style={{ color, fontWeight:500 }}>Sign in</a> or <a href="/students/sign-up" style={{ color, fontWeight:500 }}>sign up</a> to continue.</>
        : <a href="/shop/languages/multilingual" style={{ color, fontWeight:500 }}>Purchase to unlock all sentences.</a>
      }
    </div>
  ) : null;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div style={{ maxWidth:720, margin:'0 auto', padding:'1.5rem 1rem 3rem', fontFamily:f, color:'inherit' }}>

      {/* Header */}
      <div style={{ borderBottom:'1px solid #ccc', paddingBottom:'1rem', marginBottom:'1.5rem', textAlign:'center' }}>
        <div style={{ fontFamily:fp, fontSize:22, fontWeight:500, marginBottom:4 }}>Oversæt · Translate · Μεταφράστε</div>
        <div style={{ fontSize:13, color:'#666', lineHeight:1.6 }}>Word-order translation exercise · Socratic School</div>
      </div>

      {/* Navigation */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:5, marginBottom:'1rem', flexWrap:'wrap' }}>
        <button onClick={() => setExIndex(i => Math.max(0,i-1))} disabled={exIndex===0} style={{ ...secondaryBtn, padding:'4px 10px', fontSize:12, opacity:exIndex===0?0.4:1 }}>←</button>
        {exercises.map((_,i) => (
          <button key={i} onClick={() => setExIndex(i)} style={{
            width:26, height:26, borderRadius:'50%', border:'none', cursor:'pointer',
            background:i===exIndex?'#185FA5':i===0||accessStatus==='purchased'?'#ddd':'#eee',
            color:i===exIndex?'#fff':'#555', fontSize:11, fontWeight:500,
            opacity:i>0&&isLocked?0.55:1,
          }}>{i+1}</button>
        ))}
        <button onClick={() => setExIndex(i => Math.min(exercises.length-1,i+1))} disabled={exIndex===exercises.length-1} style={{ ...secondaryBtn, padding:'4px 10px', fontSize:12, opacity:exIndex===exercises.length-1?0.4:1 }}>→</button>
      </div>

      {/* Phenomenon / Feeling pills */}
      {(ex.phenomenon || ex.feeling) && (
        <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:'1rem', flexWrap:'wrap' }}>
          {ex.phenomenon && <span style={{ background:'#EEEDFE', border:'0.5px solid #AFA9EC', borderRadius:20, padding:'2px 10px', fontSize:12, color:'#534AB7', fontStyle:'italic' }}>{ex.phenomenon}</span>}
          {ex.feeling    && <span style={{ background:'#FBEAF0', border:'0.5px solid #ED93B1', borderRadius:20, padding:'2px 10px', fontSize:12, color:'#993556', fontStyle:'italic' }}>{ex.feeling}</span>}
        </div>
      )}

      {/* Sentence */}
      <div style={{ background:'#f7f7f7', border:'0.5px solid #ccc', borderRadius:12, padding:'1rem 1.25rem', marginBottom:'0.75rem', fontSize:16, lineHeight:1.8, fontStyle:'italic', whiteSpace:'pre-line' }}>{ex.sentence}</div>
      {ex.greekSentence && <div style={{ background:'#fff', border:'0.5px solid #ddd', borderRadius:12, padding:'0.75rem 1.25rem', marginBottom:'1.25rem', fontSize:14, lineHeight:1.8, color:'#555', whiteSpace:'pre-line' }}>{ex.greekSentence}</div>}

      {/* Mode selector */}
      {phase==='choice' && (
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase' as const, color:'#aaa', fontFamily:'sans-serif', textAlign:'center', marginBottom:'0.75rem' }}>Choose an exercise</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {([
              { key:'danish' as Phase, label:'Danish translation', sub:'Dansk oversættelse', color:C.danish },
              { key:'greek'  as Phase, label:'Greek translation',  sub:'Ελληνική μετάφραση', color:C.greek  },
              { key:'pos'    as Phase, label:'Parts of speech',    sub:'Ordklasser',          color:C.pos   },
            ]).map(({ key, label, sub, color }) => (
              <button key={key} onClick={() => setPhase(key)} style={{ background:'#fff', border:`1px solid ${color}`, borderRadius:10, padding:'0.85rem 0.5rem', cursor:'pointer', fontFamily:f, textAlign:'center' as const }}>
                <div style={{ fontSize:14, fontWeight:500, color, marginBottom:3 }}>{label}</div>
                <div style={{ fontSize:12, color:'#888', fontStyle:'italic' }}>{sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Danish ── */}
      {phase==='danish' && (
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <div style={{ fontFamily:fp, fontSize:16, fontWeight:500, color:C.danish }}>Danish translation</div>
            <button onClick={() => setPhase('choice')} style={backBtn}>← Back</button>
          </div>
          <div style={{ fontSize:13, color:'#666', marginBottom:'1rem', lineHeight:1.6, borderLeft:`3px solid ${C.danish}`, paddingLeft:'0.75rem' }}>
            Each gap corresponds to one English word above it. Choose the correct Danish word from the dropdown.
          </div>
          <Grid
            words={ex.englishWords}
            topLabel={w => w.text} topStyle={() => wordBox()}
            getValue={w => danishAnswers[w.id]||''}
            onChange={(w,v) => { setDanishAnswers(p=>({...p,[w.id]:v})); setDanishChecked(false); }}
            options={shuffledDanish} checked={danishChecked}
            isOk={w => { const c=ex.danishVocab.find(v=>v.english===w.text)?.danish; return !!c&&danishAnswers[w.id]?.toLowerCase()===c.toLowerCase(); }}
            isBad={w => { const c=ex.danishVocab.find(v=>v.english===w.text)?.danish; return !!danishChecked&&!!danishAnswers[w.id]&&danishAnswers[w.id]?.toLowerCase()!==c?.toLowerCase(); }}
            correctLabel={w => ex.danishVocab.find(v=>v.english===w.text)?.danish||''}
            color={C.danish}
          />
          <Paywall color={C.danish} bg="#E6F1FB" border="#B5D4F4" />
          {!danishChecked ? (
            <div style={{ display:'flex', gap:8, marginTop:'1rem', justifyContent:'center' }}>
              <button onClick={() => setDanishChecked(true)} disabled={!Object.keys(danishAnswers).length} style={primaryBtn(C.danish, !Object.keys(danishAnswers).length)}>Check answers</button>
              <button onClick={resetPhase} style={secondaryBtn}>Reset</button>
              <button onClick={() => setPhase('choice')} style={secondaryBtn}>Back</button>
            </div>
          ) : (
            <div style={{ marginTop:'1rem' }}>
              <div style={scoreBox(danishScore===ex.englishWords.length)}>{danishScore} / {ex.englishWords.length} correct{danishScore===ex.englishWords.length&&' · Perfekt! 🎉'}</div>
              <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
                <button onClick={resetPhase} style={primaryBtn(C.danish)}>Try again</button>
                <button onClick={() => setPhase('choice')} style={secondaryBtn}>Back</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Greek ── */}
      {phase==='greek' && (
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <div style={{ fontFamily:fp, fontSize:16, fontWeight:500, color:C.greek }}>Greek translation · Ελληνική μετάφραση</div>
            <button onClick={() => setPhase('choice')} style={backBtn}>← Back</button>
          </div>
          <div style={{ fontSize:13, color:'#666', marginBottom:'1rem', lineHeight:1.6, borderLeft:`3px solid ${C.greek}`, paddingLeft:'0.75rem' }}>
            Each Greek word is shown above. Choose the matching English word from the dropdown.
          </div>
          <Grid
            words={ex.greekWords}
            topLabel={w => w.text}
            topStyle={() => ({ ...wordBox(), color:C.greek, background:'#FCEBEB', border:'0.5px solid #F09595', fontStyle:'italic' as const })}
            getValue={w => greekAnswers[w.id]||''}
            onChange={(w,v) => { setGreekAnswers(p=>({...p,[w.id]:v})); setGreekChecked(false); }}
            options={shuffledGreek} checked={greekChecked}
            isOk={w => { const c=ex.greekVocab.find(v=>v.greek===w.text)?.english; return !!c&&greekAnswers[w.id]?.toLowerCase()===c.toLowerCase(); }}
            isBad={w => { const c=ex.greekVocab.find(v=>v.greek===w.text)?.english; return !!greekChecked&&!!greekAnswers[w.id]&&greekAnswers[w.id]?.toLowerCase()!==c?.toLowerCase(); }}
            correctLabel={w => ex.greekVocab.find(v=>v.greek===w.text)?.english||''}
            color={C.greek}
          />
          <Paywall color={C.greek} bg="#FCEBEB" border="#F09595" />
          {!greekChecked ? (
            <div style={{ display:'flex', gap:8, marginTop:'1rem', justifyContent:'center' }}>
              <button onClick={() => setGreekChecked(true)} disabled={!Object.keys(greekAnswers).length} style={primaryBtn(C.greek, !Object.keys(greekAnswers).length)}>Check answers</button>
              <button onClick={resetPhase} style={secondaryBtn}>Reset</button>
              <button onClick={() => setPhase('choice')} style={secondaryBtn}>Back</button>
            </div>
          ) : (
            <div style={{ marginTop:'1rem' }}>
              <div style={scoreBox(greekScore===ex.greekWords.length)}>{greekScore} / {ex.greekWords.length} correct{greekScore===ex.greekWords.length&&' · Τέλεια! 🎉'}</div>
              <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
                <button onClick={resetPhase} style={primaryBtn(C.greek)}>Try again</button>
                <button onClick={() => setPhase('choice')} style={secondaryBtn}>Back</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── POS ── */}
      {phase==='pos' && (
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
            <div style={{ fontFamily:fp, fontSize:16, fontWeight:500, color:C.pos }}>Parts of speech · Ordklasser</div>
            <button onClick={() => setPhase('choice')} style={backBtn}>← Back</button>
          </div>
          <div style={{ fontSize:13, color:'#666', marginBottom:'1rem', lineHeight:1.6, borderLeft:`3px solid ${C.pos}`, paddingLeft:'0.75rem' }}>
            Identify the part of speech for each word in the sentence.
          </div>
          <Grid
            words={ex.englishWords}
            topLabel={w => w.text} topStyle={() => wordBox()}
            getValue={w => posAnswers[w.id]||''}
            onChange={(w,v) => { setPosAnswers(p=>({...p,[w.id]:v})); setPosChecked(false); }}
            options={posOptions} checked={posChecked}
            isOk={w => posAnswers[w.id]?.toLowerCase()===ex.expectedPOS[w.text]?.toLowerCase()}
            isBad={w => !!posChecked&&!!posAnswers[w.id]&&posAnswers[w.id]?.toLowerCase()!==ex.expectedPOS[w.text]?.toLowerCase()}
            correctLabel={w => ex.expectedPOS[w.text]||''}
            color={C.pos}
          />
          <Paywall color={C.pos} bg="#EAF3DE" border="#C0DD97" />
          {!posChecked ? (
            <div style={{ display:'flex', gap:8, marginTop:'1rem', justifyContent:'center' }}>
              <button onClick={() => setPosChecked(true)} disabled={!Object.keys(posAnswers).length} style={primaryBtn(C.pos, !Object.keys(posAnswers).length)}>Check answers</button>
              <button onClick={resetPhase} style={secondaryBtn}>Reset</button>
              <button onClick={() => setPhase('choice')} style={secondaryBtn}>Back</button>
            </div>
          ) : (
            <div style={{ marginTop:'1rem' }}>
              <div style={scoreBox(posScore===ex.englishWords.length)}>{posScore} / {ex.englishWords.length} correct{posScore===ex.englishWords.length&&' · Excellent! 🎉'}</div>
              <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
                <button onClick={resetPhase} style={primaryBtn(C.pos)}>Try again</button>
                <button onClick={() => setPhase('choice')} style={secondaryBtn}>Back</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Syntax analysis */}
      <div style={{ borderTop:'0.5px solid #ddd', paddingTop:'1rem', marginTop:'0.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
          <div style={{ fontSize:13, fontWeight:500, color:'#333' }}>Syntax analysis</div>
          <button onClick={() => setShowSyntax(v=>!v)} style={{ fontSize:12, color:'#185FA5', background:'none', border:'none', cursor:'pointer', fontFamily:f }}>{showSyntax?'Hide ▴':'Show ▾'}</button>
        </div>
        {showSyntax && (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {Object.entries(ex.syntaxAnalysis).map(([phrase,terms]) => (
              <div key={phrase} style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                <div style={{ fontSize:13, fontWeight:500, color:'#333', background:'#f4f4f4', border:'0.5px solid #ccc', borderRadius:6, padding:'3px 10px', fontStyle:'italic' }}>{phrase}</div>
                <span style={{ color:'#bbb', fontSize:12 }}>→</span>
                <div style={{ fontSize:12, color:'#185FA5', background:'#E6F1FB', border:'0.5px solid #B5D4F4', borderRadius:6, padding:'3px 10px' }}>{terms.join(', ')}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* General tip */}
      {ex.generalTip && (
        <div style={{ borderTop:'0.5px solid #eee', marginTop:'1.25rem', paddingTop:'1rem', fontSize:12.5, color:'#666', lineHeight:1.8 }}>
          <strong style={{ color:'#333' }}>Note: </strong>{ex.generalTip}
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign:'center', fontSize:11, color:'#aaa', marginTop:'1.5rem', paddingTop:'1rem', borderTop:'0.5px solid #eee', fontFamily:'sans-serif', letterSpacing:'0.02em' }}>
        © 2026 Isidoros Parlamas · mind@horistics.com · socratic-school.com
      </div>
    </div>
  );
}
