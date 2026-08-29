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
              <div className="wow">
                <span className="b">fordi</span> • cause → effect (fordi <span className="ur">determines</span> the effect)
                <p>
                  <span className="b">for</span> • effect → explanation (for <span className="ur">reconstructs</span> a reason from the effect)
                </p>
              </div>

              <table>
                <tbody>
                  <tr>
                    <td className="b">fordi</td>
                    <td>cause</td>
                    <td>effect ← cause</td>
                    <td>because</td>
                  </tr>
                  <tr>
                    <td className="b">for</td>
                    <td>explanation</td>
                    <td>effect → explanation</td>
                    <td>for / since (speculative)</td>
                  </tr>
                </tbody>
              </table>

              <p></p>

              <ol>
                <li>
                  <span className="ur">definitioner</span> • definitions
                  <br />
                  <span className="b">årsag</span><sub>1</sub> • <span className="b">forklaring</span><sub>2</sub>
                  <br />
                  cause<sub>1</sub> • explanation<sub>2</sub>
                  <p>
                    En <span className="b">årsag</span> er det, der <span className="ur">bestemmer</span> en hændelse.
                    <br />
                    A cause is what <span className="ur">determines</span> an occurrence.
                  </p>
                  <p>
                    En <span className="b">forklaring</span> er et <span className="ur">spekulativt forsøg</span> på at rekonstruere en hændelse.
                    <br />
                    An explanation is a <span className="ur">speculative attempt</span> to reconstruct an occurrence.
                  </p>
                  <p></p>
                </li>

                <li>
                  <span className="ur">samme sætning, to læsninger</span> • same sentence, two readings
                  <br />
                  <span className="b">
                    Lyset er slukket<sub>1</sub>, for ingen er hjemme<sub>2</sub>.
                  </span>
                  <br />
                  The light is off<sub>1</sub>, for nobody is home<sub>2</sub>.
                  <p>
                    <span className="ur">effekt</span><sub>1</sub> → <span className="ur">forklaring</span><sub>2</sub>: taleren observerer at lyset er slukket, og <span className="ur">gætter</span> at ingen er hjemme.
                    <br />
                    <span className="ur">effect</span><sub>1</sub> → <span className="ur">explanation</span><sub>2</sub>: the speaker observes the light is off, and <span className="ur">infers</span> that nobody is home.
                  </p>

                  <span className="b">
                    Lyset er slukket<sub>1</sub>, fordi ingen er hjemme<sub>2</sub>.
                  </span>
                  <br />
                  The light is off<sub>1</sub>, because nobody is home<sub>2</sub>.
                  <p>
                    <span className="ur">effekt</span><sub>1</sub> ← <span className="ur">årsag</span><sub>2</sub>: at ingen er hjemme er det, der <span className="ur">bestemmer</span> at lyset er slukket.
                    <br />
                    <span className="ur">effect</span><sub>1</sub> ← <span className="ur">cause</span><sub>2</sub>: nobody being home is what <span className="ur">determines</span> the light being off.
                  </p>
                  <p></p>
                </li>

                <li>
                  <span className="ur">test</span> • test
                  <br />
                  Spørg: bestemmer det andet led det første (<span className="b">fordi</span>), eller er det andet led talerens <span className="ur">gæt</span> ud fra det første (<span className="b">for</span>)?
                  <br />
                  Ask: does the second clause <span className="ur">determine</span> the first (<span className="b">fordi</span>), or is the second clause the speaker&rsquo;s <span className="ur">guess</span> based on the first (<span className="b">for</span>)?
                  <p></p>
                </li>

                <li>
                  <span className="ur">nægtelse: bekræftende</span> • negation: affirmative
                  <br />
                  <span className="b">
                    Hun blev hjemme<sub>1</sub>, for hun var træt<sub>2</sub>.
                  </span>
                  <br />
                  She stayed home<sub>1</sub>, for she was tired<sub>2</sub>.
                  <br />
                  <span className="b">
                    Hun blev hjemme<sub>1</sub>, fordi hun var træt<sub>2</sub>.
                  </span>
                  <br />
                  She stayed home<sub>1</sub>, because she was tired<sub>2</sub>.
                  <p>
                    Ordstillingen er identisk i den bekræftende form.
                    <br />
                    Word order is identical in the affirmative.
                  </p>
                  <p></p>
                </li>

                <li>
                  <span className="ur">nægtelse: benægtende</span> • negation: negative
                  <br />
                  <span className="b">
                    Hun blev til festen<sub>1</sub>, for hun<sub>2</sub> var<sub>3</sub> ikke<sub>4</sub> træt<sub>5</sub>.
                  </span>
                  <br />
                  She stayed at the party<sub>1</sub>, for she<sub>2</sub> was<sub>3</sub> not<sub>4</sub> tired<sub>5</sub>.
                  <p>
                    <span className="ur">ikke</span> følger <span className="b">var</span> → nægter <span className="ur">at være træt</span> (forklaringen selv nægtes).
                    <br />
                    <span className="ur">ikke</span> follows <span className="b">var</span> → negates <span className="ur">being tired</span> (the explanation itself is negated).
                  </p>

                  <span className="b">
                    Hun blev til festen<sub>1</sub>, fordi hun<sub>2</sub> ikke<sub>3</sub> var<sub>4</sub> træt<sub>5</sub>.
                  </span>
                  <br />
                  She stayed at the party<sub>1</sub>, because she<sub>2</sub> wasn&rsquo;t<sub>3</sub> tired<sub>4/5</sub>.
                  <p>
                    <span className="ur">ikke</span> følger <span className="b">hun</span> → nægter <span className="ur">den kausale forbindelse</span> til at være træt.
                    <br />
                    <span className="ur">ikke</span> follows <span className="b">hun</span> → negates the <span className="ur">causal link</span> to being tired.
                  </p>
                  <p></p>
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