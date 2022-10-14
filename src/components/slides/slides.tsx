import { Component, h, State } from '@stencil/core';
import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight';

@Component({
  tag: 'dnd-slides',
  styleUrl: 'slides.css',
  shadow: false,
})
export class Slides {
  // States for custom choices
  @State() contrast: 'none' | 'arrows' | 'all' = 'none';
  @State() customContrast: boolean = false;
  @State() columnheader: 'none' | 'ariaLabel' | 'abbr' | 'text' = 'none';
  @State() focusModel: 'cell' | 'button' | 'dual' = 'cell';
  @State() showInput: boolean = false;
  @State() inputChaos: boolean = false;

  componentDidLoad() {
    // initialize reveal.js
    let deck = new Reveal({
      plugins: [ Highlight ]
    });
    deck.initialize({
      history: true,
      transition: 'fade'
    });
  }

  render() {
    return (
      <div class="reveal">
        <div class="slides" role="document">
          {/*Intro */}
          <section>
            <h1>Datepickers & Dialogs</h1>
          </section>

          <section>
            <div class="flex-h">
              <img src="./assets/avatar.png" alt="illustrated avatar of Sarah, with purple hair and a cat peaking out from behind her head" style={{maxWidth: '300px'}} />
              <p class="large" style={{marginTop: '-0.5em'}}>⬅️ who is this person?</p>
            </div>
          </section>

          <section>
            <h2>What are we doing?</h2>
            <p><del>Dungeons & Dragons</del></p>
            <p>Datepickers & Dialogs</p>
            <aside class="notes">
              - what is dnd, explain 3 volunteers + audience voting
            </aside>
          </section>

          <section>
            <h3>Our cast</h3>
            (img/silhouette of three characters)
          </section>

          <section>
            <div class="flex-h">
              <span>(img)</span>
              <div class="character-info">
                <h4>The Wizard</h4>
                <span class="subtitle">Our project manager</span>
                <ul>
                  <li>Great at inserting a11y into project roadmaps</li>
                  <li>Advocates for hiring and supporting a11y experts</li>
                  <li>Has melted 3 computers with fireball</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div class="flex-h">
              <span>(img)</span>
              <div class="character-info">
                <h4>The Druid</h4>
                <span class="subtitle">Our designer</span>
                <ul>
                  <li>Sees the web as a land of contrasts in delicate balance</li>
                  <li>Brings to life figma-ents of imagination</li>
                  <li>Turns into a tree when angry</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div class="flex-h">
              <span>(img)</span>
              <div class="character-info">
                <h4>The Bard</h4>
                <span class="subtitle">Our developer</span>
                <ul>
                  <li>Cares a lot about performance</li>
                  <li>Knows that an Aria can be powerful, when used strategically</li>
                  <li>Has been known to throw vicious mockery at people who ignore a11y bugs</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2>The Adventure</h2>
            {/* <ul class="sequential-overlays">
              <li>
                (image of monster with question mark)
              </li>
              <li class="fragment">
                (image of datepicker/calendar)
              </li>
            </ul> */}
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
            <p style={{ marginTop: '8em' }}>When you see a slide with this image, I will ask a volunteer to roll</p>
          </section>

          <section data-background-image="./assets/hands.png" data-background-size="150px" data-background-position="10% 10%">
            <p style={{ marginTop: '8em' }}>When you see a slide with this image, I'll ask for audience feedback</p>
          </section>

          <section>
            <p>Challenge 1: A land of contrasts</p>
            (image of the druid, progressively fading into the bg)
          </section>

          <section data-background-image="./assets/hands.png" data-background-size="150px" data-background-position="10% 10%">
            <img src="./assets/datepicker-low-contrast.png" width="400" />
            {/* (second step: image of the datepicker, with low contrast pointed out) */}
            <aside class="notes">On first image/step, ask for design feedback</aside>
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
            <fieldset>
              <legend>Choose a path:</legend>
              {/* Being lazy with types, don't @ me */}
              <label class="roll-choice">
                <input type="radio" name="contrast" value="none" onChange={(ev) => this.contrast = (ev.target as HTMLInputElement).value as any} />
                Colors stay the same
              </label>
              <label class="roll-choice">
                <input type="radio" name="contrast" value="arrows" onChange={(ev) => {this.contrast = (ev.target as HTMLInputElement).value as any; console.log(ev);}} />
                Increase contrast of ⬅️/➡️ icons (DC 10)
              </label>
              <label class="roll-choice">
                <input type="radio" name="contrast" value="all" onChange={(ev) => this.contrast = (ev.target as HTMLInputElement).value as any} />
                Increase contrast of today's date and ⬅️/➡️ icons (DC 14)
              </label>
              <label class="roll-choice">
                <input type="radio" name="contrast" value="all" onChange={(ev) => {this.contrast = (ev.target as HTMLInputElement).value as any; this.customContrast = true;}} />
                Your choice! Make Sarah code something custom. (DC 20)
              </label>
            </fieldset>
          </section>

          <section>
            {this.contrast !== 'none' ?
              <p>You survived your first battle! On to the next...</p>
            : null}
            {this.contrast === 'none' ?
              <p>It's a minor setback, but there are more battles to come!</p>
            : null}
            (image of post-battle)
          </section>

          <section>
            Where we are now:
            <dnd-calendar class="calendar" contrast={this.contrast} />
          </section>

          <section>
            <p>Challenge 2: Getting a-header the competition</p>
            <img src="./assets/table-headers.png" width="600" />
          </section>

          <section>
            Current status:
            <pre><code data-trim data-noescape class="html">
{`<th role="columnheader">
  Su
</th>`}
            </code></pre>
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
            Some options:
            <pre class="fragment"><code data-trim data-noescape class="html">
{`<th role="columnheader" aria-label="Sunday">
  Su
</th>`}
            </code></pre>
            <pre class="fragment"><code data-trim data-noescape class="html">
{`<th role="columnheader" abbr="Sunday">
  Su
</th>`}
            </code></pre>
            <pre class="fragment"><code data-trim data-noescape class="html">
{`<th role="columnheader">
  <span aria-hidden="true">Su</span>
  <span class="visuallyHidden">Sunday</span>
</th>`}
            </code></pre>
          </section>

          <section data-background-image="./assets/hands.png" data-background-size="150px" data-background-position="10% 10%">
            <label htmlFor="columnheader">Column header labels:</label>
            <select class="select-choice" onChange={(ev) => this.columnheader = (ev.target as HTMLSelectElement).value as any}>
              <option value="none">none</option>
              <option value="ariaLabel">aria-label</option>
              <option value="abbr">abbr</option>
              <option value="text">hidden text</option>
              <option value="none">custom</option>
            </select>
          </section>

          <section>
            <p>Challenge 3: our adventurers need to focus</p>
            (img of focus outline around date)
          </section>

          <section>
            (diagram of td vs. button)
          </section>

          <section>
            How does it work now?
            <dnd-calendar class="calendar" contrast={this.contrast} columnheader={this.columnheader} />
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
            <section>
              <h3>Cell stat sheet</h3>
              (img of an angry gelatenous cube cell)
            </section>
            <section>
              Pro: Grid cells support `aria-selected`
              <dnd-mini-grid class="calendar" />
              <span class="fragment">Con: "selected" announcements are "quirky"</span>
            </section>
            <section>
              Pro: <code>gridcell</code> is a composite widget role
              <dnd-mini-grid class="calendar" />
            </section>
            <section>
              Con: <code>gridcell</code> is not always recognized with voice control
              <dnd-mini-grid class="calendar" />
            </section>
          </section>
  
          <section>
            <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
              <h3>Button stat sheet</h3>
              (img of a button as a monster?)
            </section>
            <section>
              Pro: Buttons natively pick up enter/space and high contrast colors
              (screenshot of mini grid in HCM)
            </section>
            <section>
              Pro: Buttons support <code>aria-pressed</code>
              <dnd-mini-grid class="calendar" cellFocus={false} />
              <span class="fragment">Con: bit weird to have a calendar of toggle buttons though</span>
            </section>
            <section>
              Con: `button` is not a composite widget role
              <dnd-mini-grid class="calendar" cellFocus={false} />
            </section>
          </section>

          <section data-background-image="./assets/hands.png" data-background-size="150px" data-background-position="10% 10%">
            <fieldset>
              <legend>Focus pattern:</legend>
              {/* Being lazy with types, don't @ me */}
              <label class="roll-choice">
                <input type="radio" name="focusModel" value="cell" onChange={(ev) => this.focusModel = (ev.target as HTMLInputElement).value as any} />
                Focus is on the <code>gridcell</code>
              </label>
              <label class="roll-choice">
                <input type="radio" name="focusModel" value="button" onChange={(ev) => {this.focusModel = (ev.target as HTMLInputElement).value as any; console.log(ev);}} />
                Focus is on the <code>button</code>
              </label>
              <label class="roll-choice">
                <input type="radio" name="focusModel" value="dual" onChange={(ev) => this.focusModel = (ev.target as HTMLInputElement).value as any} />
                Focus is on the <code>gridcell</code>, but with an inner button
              </label>
            </fieldset>
          </section>

          <section>
            <p>Challenge 4: seeking external input</p>
          </section>

          <section>
            Our current datepicker:
            <dnd-datepicker contrast={this.contrast} columnheader={this.columnheader} focusModel={this.focusModel} />
          </section>

          <section>
            Upgrade?
            (screenshot of input datepicker)
          </section>

          <section>
            But wait! An angry stakeholder has appeared!
            (image of a mind flayer)
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
            <fieldset>
              <legend>Button vs. input:</legend>
              <label class="roll-choice">
                <input type="radio" name="input" value="false" onChange={(ev) => this.showInput = (ev.target as HTMLInputElement).value === 'true'} />
                Keep a single button
              </label>
              <label class="roll-choice">
                <input type="radio" name="input" value="true" onChange={(ev) => this.showInput = (ev.target as HTMLInputElement).value === 'true'} />
                Add a text input next to an icon button
              </label>
              <label class="roll-choice">
                <input type="radio" name="input" value="chaos" onChange={(ev) => {this.showInput = (ev.target as HTMLInputElement).value === 'true'; this.inputChaos = true;}} />
                Chaos option! Your choice, make Sarah code again.
              </label>
            </fieldset>
          </section>

          <section>
            <h2>Looking back at our adventure</h2>
          </section>

          <section>
            <h3>Our choices:</h3>
            <ul>
              <li>Contrast:
                {this.contrast === 'none' ? 'No change' : null}
                {this.contrast === 'arrows' ? 'Updated previous/next arrows' : null}
                {this.contrast === 'all' ? 'Updated previous/next arrows and today\'s date' : null}
                {this.customContrast ? 'Oh no you made Sarah code! And also updated contrast :)' : null}
              </li>
              <li>Weekday labels:
                {this.columnheader === 'none' ? 'No change from visual abbreviations' : null}
                {this.columnheader === 'ariaLabel' ? 'Added the full weekday in an <code>aria-label</code> attribute' : null}
                {this.columnheader === 'abbr' ? 'Added the full weekday in an <code>abbr</code> attribute' : null}
                {this.columnheader === 'text' ? 'Added the full weekday in a visually hidden <code>span</code>' : null}
              </li>
              <li>Focus model:
                {this.focusModel === 'cell' ? 'Focus is on the <code>gridcell</code>' : null}
                {this.focusModel === 'button' ? 'Focus is on the <code>button</code>' : null}
                {this.focusModel === 'dual' ? 'Focus is on the <code>gridcell</code>, but with an inner button' : null}
              </li>
              <li>Button vs. Input:
                {this.showInput === false ? 'Kept a single button as calendar trigger' : null}
                {this.showInput === true ? 'Added a text input next to an icon button' : null}
                {this.inputChaos ? 'I have no idea, you chose chaos' : null}
              </li>
            </ul>
          </section>
          <section>
            Let's test!
            <dnd-datepicker contrast={this.contrast} columnheader={this.columnheader} focusModel={this.focusModel} showInput={this.showInput} />
          </section>

          <section>
            (img of party members in a tavern)
          </section>
        </div>
      </div>
    );
  }
}
