//src/app/Danish/components/lesson-003.tsx

import '../danish.css';
import Image from 'next/image';

const Lesson003 = () => {
  return (
    <div className="danish-lesson">
      <center>
        &copy; 2026 Isidoros Parlamas &bull; parlamas@live.com &bull; socratic-school.com
        <div style={{ fontSize: '40pt' }}>3</div>
        <div className="header-row">
          <span className="www">ΣΩΚΡΑΤΙΚΗ ΣΧΟΛΗ</span>
          <Image src="/images/danish/dk.svg" alt="Danish flag" width={25} height={25} />
          <span>*FOR • FORDI</span>
          <Image src="/images/danish/ukk.png" alt="UK flag" width={25} height={25} />
          <span className="www">SOKRATISK SKOLE</span>
        </div>
        <hr />
      </center>

      <table style={{ fontSize: '10pt' }}>
        <tbody>
          <tr>
            <td>

              {/* ── ENGLISH ── */}
              <div className="wow">English</div>
              <p></p>

              <ol>
                <li>
                  Definitions
                                    <p>
                    A <span className="b">cause</span> is an occurrence insofar as it is considered in terms of how it determines the characteristics of another occurrence.
                  </p>
                  <p>
                    An <span className="b">explanation</span> is an attempt to reconstruct an occurrence.
                  </p>
                </li>

                                <li>
                  Danish resolves the confusion between cause and explanation through the choice of conjunction:
                  <p>
                    <span className="b">fordi</span> → cause: effect ← cause
                  </p>
                  <p>
                    <span className="b">for</span> → explanation: effect → explanation
                  </p>
                  <p>
                    Both <span className="b">for</span> and <span className="b">fordi</span> are conjunctions, and conjunctions always introduce subordinate clauses. The relationship between the two clauses is subordinating in both sentences &mdash; this does not change depending on which of the two conjunctions is used.
                  </p>
                </li>

                <li>
                  Example
                  <p>
                    The light is off, for nobody is home.
                    <br />
                    Effect: the light is off. Explanation: nobody is home.
                  </p>
                  <p>
                    The light is off, because nobody is home.
                    <br />
                    Effect: the light is off. Cause: nobody being home.
                  </p>
                  <p>
                    The wording of the second clause can be identical in both sentences. The distinction is not carried by the wording &mdash; it is carried entirely by the choice of conjunction, <span className="b">for</span> or <span className="b">because</span>.
                  </p>
                </li>

                <li>
                  Negation &mdash; affirmative
                  <p>
                    She stayed home, for she was tired.
                    <br />
                    She stayed home, because she was tired.
                  </p>
                  <p>
                    Word order is identical in the affirmative.
                  </p>
                </li>

                                <li>
                  Negation &mdash; negative
                  <p>
                    Hun blev til festen, for hun var ikke træt.
                    <br />
                    She stayed at the party, for she was not tired.
                    <br />
                    <span className="ur">ikke</span> follows <span className="b">var</span> (was) &rarr; negates <span className="ur">var</span> directly.
                  </p>
                  <p>
                    Hun blev til festen, fordi hun ikke var træt.
                    <br />
                    She stayed at the party &mdash; and why wouldn&rsquo;t she? It is not that she was tired.
                    <br />
                    <span className="ur">ikke</span> follows <span className="b">hun</span> (she) &rarr; negates <span className="ur">hun</span>, so the whole proposition &ldquo;she was tired&rdquo; is rejected as the cause, rather than the verb alone.
                  </p>
                </li>
              </ol>

              <hr />

              {/* ── DANSK ── */}
              <div className="wow">Dansk</div>
              <p></p>

              <ol>
                <li>
                  Definitioner
                                    <p>
                    En <span className="b">årsag</span> er en hændelse, for så vidt den betragtes ud fra, hvordan den bestemmer egenskaberne ved en anden hændelse.
                  </p>
                  <p>
                    En <span className="b">forklaring</span> er et forsøg på at rekonstruere en hændelse.
                  </p>
                </li>

                                <li>
                  Dansk løser forvirringen mellem årsag og forklaring gennem valget af konjunktion:
                  <p>
                    <span className="b">fordi</span> &rarr; årsag: effekt &larr; årsag
                  </p>
                  <p>
                    <span className="b">for</span> &rarr; forklaring: effekt &rarr; forklaring
                  </p>
                  <p>
                    Både <span className="b">for</span> og <span className="b">fordi</span> er konjunktioner, og konjunktioner indleder altid ledsætninger. Forholdet mellem de to led er underordnende i begge sætninger &mdash; dette ændrer sig ikke afhængigt af, hvilken af de to konjunktioner der bruges.
                  </p>
                </li>

                <li>
                  Eksempel
                  <p>
                    Lyset er slukket, for ingen er hjemme.
                    <br />
                    Effekt: lyset er slukket. Forklaring: ingen er hjemme.
                  </p>
                  <p>
                    Lyset er slukket, fordi ingen er hjemme.
                    <br />
                    Effekt: lyset er slukket. Årsag: at ingen er hjemme.
                  </p>
                  <p>
                    Ordlyden af det andet led kan være identisk i begge sætninger. Forskellen ligger ikke i ordlyden &mdash; den ligger udelukkende i valget af konjunktion, <span className="b">for</span> eller <span className="b">fordi</span>.
                  </p>
                </li>

                <li>
                  Nægtelse &mdash; bekræftende
                  <p>
                    Hun blev hjemme, for hun var træt.
                    <br />
                    Hun blev hjemme, fordi hun var træt.
                  </p>
                  <p>
                    Ordstillingen er identisk i den bekræftende form.
                  </p>
                </li>

                                <li>
                  Nægtelse &mdash; benægtende
                  <p>
                    Hun blev til festen, for hun var ikke træt.
                    <br />
                    <span className="ur">ikke</span> følger <span className="b">var</span> &rarr; nægter <span className="ur">var</span> direkte.
                  </p>
                  <p>
                    Hun blev til festen, fordi hun ikke var træt.
                    <br />
                    <span className="ur">ikke</span> følger <span className="b">hun</span> &rarr; nægter <span className="ur">hun</span>, så hele påstanden &mdash;at hun var træt&mdash; afvises som årsag, snarere end blot verbet.
                  </p>
                </li>
              </ol>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Lesson003;


