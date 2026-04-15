//src/app/Danish/components/lesson-001.tsx

import '../danish.css';
import Image from 'next/image';

const Lesson001 = () => {
  return (
    <div className="danish-lesson">
      <center>
        &copy; 2026 Isidoros Parlamas &bull; parlamas@live.com &bull; socratic-school.com
        <div style={{ fontSize: '40pt' }}>1</div>
                
                <div className="header-row">
  <span className="www">ΣΩΚΡΑΤΙΚΗ ΣΧΟΛΗ</span>
  <Image src="/images/danish/dk.svg" alt="Danish flag" width={25} height={25} />
  <span>PRÆSENTATION • INTRODUCTIONS</span>
  <Image src="/images/danish/ukk.png" alt="UK flag" width={25} height={25} />
  <span className="www">SOKRATISK SKOLE</span>
</div>
        <hr />
      </center>

      <table style={{fontSize: '10pt'}}>
        <tbody>
          <tr>
            <td>
              <span className="b">Dialog 1</span> • Dialogue 1
              <p>
                <span className="b">Lyt og gentag</span> • Listen and repeat
              </p>

              <table>
                <tbody>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>1. Isi:</td>
                    <td>
                      <span className="b">Hej, jeg hedder Isi. Hvad hedder du?</span>
                      <br />
                      Hi, my name is Isi. What's your name?
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>2. Ellen:</td>
                    <td>
                      <span className="b">Jeg hedder Ellen.</span>
                      <br />
                      My name is Ellen.
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>3. Isi:</td>
                    <td>
                      <span className="b">Hvor kommer du fra?</span>
                      <br />
                      Where are you from?
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>4. Ellen:</td>
                    <td>
                      <span className="b">Jeg kommer fra Grækenland. Hvor kommer du fra?</span>
                      <br />
                      I'm from Greece. Where are you from?
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>5. Isi:</td>
                    <td>
                      <span className="b">Jeg kommer fra Italien.</span>
                      <br />
                      I'm from Italy.
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>6. Ellen:</td>
                    <td>
                      <span className="b">Hvad *sprog taler du?</span>
                      <br />
                      What language do you speak?
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>7. Isi:</td>
                    <td>
                      <span className="b">Jeg taler italiensk. Hvad med dig?</span>
                      <br />
                      I speak Italian. What about you?
                    </td>
                  </tr>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ fontWeight: 'bold' }}>8. Ellen:</td>
                    <td>
                      <span className="b">Jeg taler græsk og dansk.</span>
                      <br />
                      I speak Greek and Danish.
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <p>
                <span className="b">
                  Øvelse: Træn dialogen i klassen (i to dele). Pas på udtale af{' '}
                  <span className="r">r</span> og blødt <span className="r">*d</span>.
                </span>
              </p>
              
              <p>
                Exercise: Practice the dialog in class (in two parts). Pay attention to the 
                pronunciation of <span className="r">r</span> and the soft{' '}
                <span className="r">d</span>.
              </p>
              
              <p>
                <span className="b">
                  Bemærk: Endelsen <span className="r">-er</span> udtales[
                  <span className="r">ɐ</span>].
                </span>{' '}
                • Note: The ending <span className="r">-er</span> is pronounced [
                <span className="r">ɐ</span>].
              </p>
              
              <hr />

              <table>
                <tbody>
                  <tr style={{ verticalAlign: 'top' }}>
                    <td>
                      <table className="pronoun-table" cellPadding="5" cellSpacing="5">
                        <tbody>
                          <tr style={{ verticalAlign: 'bottom' }}>
                            <td>&nbsp;</td>
                            <td colSpan={2}>
                              <span className="b">personlige *pronominer</span>
                              <hr />
                              <b>personal pronouns</b>
                            </td>
                            <td>
                              <span className="b">verbum</span>
                              <hr />
                              <b>verb</b>
                            </td>
                          </tr>
                          <tr>
                            <td rowSpan={3} style={{ color: 'red', verticalAlign: 'top' }}>
                              e<br />n<br />t<br />a<br />l
                            </td>
                            <td>1. person</td>
                            <td>
                              <span className="b">jeg</span> (I)
                            </td>
                            <td rowSpan={3} style={{ verticalAlign: 'middle' }}>
                              <span className="b">taler</span>
                            </td>
                          </tr>
                          <tr>
                            <td>2. person</td>
                            <td>
                              <span className="b">du</span> (you)
                            </td>
                          </tr>
                          <tr>
                            <td>3. person</td>
                            <td>
                              <span className="b">han</span> (he)
                              <hr />
                              <span className="b">hun</span> (she)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table className="pronoun-table" cellPadding="5" cellSpacing="5">
                        <tbody>
                          <tr style={{ verticalAlign: 'top' }}>
                            <td>&nbsp;</td>
                            <td colSpan={2}>
                              <span className="b">personlige pronominer</span>
                              <hr />
                              <b>personal pronouns</b>
                            </td>
                            <td>
                              <span className="b">verbum</span>
                              <hr />
                              <b>verb</b>
                            </td>
                          </tr>
                          <tr>
                            <td rowSpan={3} style={{ color: 'red', verticalAlign: 'top' }}>
                              f<br />l<br />e<br />r<br />t<br />a<br />l
                            </td>
                            <td>1. person</td>
                            <td>
                              <span className="b">vi</span> (we)
                            </td>
                            <td rowSpan={3} style={{ verticalAlign: 'middle' }}>
                              <span className="b">taler</span>
                            </td>
                          </tr>
                          <tr>
                            <td>2. person</td>
                            <td>
                              <span className="b">I</span> (you)
                            </td>
                          </tr>
                          <tr>
                            <td>3. person</td>
                            <td>
                              <span className="b">de</span> (they)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div><span className="b">ental</span> = singular &bull; <span className="b">flertal</span> = plural</div>
              <hr />

              <div className="wow">
                ubestemt kendeord (et, en) • indefinite article (a, an)
                <p>bestemt kendeord (det, den, de — e, n, ene) • definite article (the)</p>
              </div>
              
              <table>
                <tbody>
                  <tr>
                    <td className="b">fælleskøn</td>
                    <td>common gender</td>
                    <td className="b">en notesbog</td>
                    <td>a notebook</td>
                    <td className="b">notesbogen</td>
                    <td>the notebook</td>
                  </tr>
                  <tr>
                    <td className="b">*intetkøn</td>
                    <td>neuter gender</td>
                    <td className="b">et pronomen</td>
                    <td>a pronoun</td>
                    <td className="b">pronomenet</td>
                    <td>the pronoun</td>
                  </tr>
                </tbody>
              </table>
              
              <p>
                <span className="b">nogle notesbøger</span> • some notebooks —{' '}
                <span className="b">notesbøgerne</span> • the notebooks
              </p>
              
              <p>
                <span className="b">nogle pronominer</span> • some pronouns —{' '}
                <span className="b">pronominerne</span> • the pronouns
              </p>
              
              <p>
                <span className="b">en personlig notesbog</span> • a personal notebook —{' '}
                <span className="b">nogle personlige notesbøger</span> • some personal notebooks
              </p>
              
              <p>
                <span className="b">et personligt pronomen</span> • a personal pronoun —{' '}
                <span className="b">nogle personlige pronominer</span> • some personal pronouns
              </p>
              
              <p>
                <span className="b">de personlige notesbøger</span> • the personal notebooks —{' '}
                <span className="b">de personlige pronominer</span> • the personal pronouns
              </p>

              <ol>
                <li>
                  <span className="b">et barn</span> = a child •{' '}
                  <span className="b">et hus</span> = a house
                </li>
                <li>
                  <span className="b">et lille barn</span> = a small child •{' '}
                  <span className="b">et rødt hus</span> = a red house
                </li>
                <li>
                  <span className="b">barnet</span> = the child •{' '}
                  <span className="b">huset</span> = the house
                </li>
                <li>
                  <span className="b">huse</span> = houses •{' '}
                  <span className="b">husene</span> = the houses •{' '}
                  <span className="b">nogle huse</span> = some houses
                </li>
                <li>
                  <span className="b">børn</span> = children •{' '}
                  <span className="b">børnene</span> = the children •{' '}
                  <span className="b">nogle børn</span> = some children
                </li>
                <li>
                  <span className="b">det lille barn</span> = the little child •{' '}
                  <span className="b">det røde hus</span> = the red house
                </li>
                <li>
                  <span className="b">de små børn</span> = the little children •{' '}
                  <span className="b">de røde huse</span> = the red houses
                </li>
              </ol>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Lesson001;