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
            <h1 style={{ textAlign: 'left', marginLeft: '1em' }}>
              <span style={{ color: 'red' }}>D</span>atepickers <span style={{ color: 'red', display: 'block' }}>&</span> <span style={{ color: 'red' }}>D</span>ialogs
            </h1>
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

          <section class="slide-gradient">
            <h3>Our cast</h3>
            <div class="collage">
              <img src="../assets/wizard.png" alt="sketch of a cute cat wizard character holding a staff" style={{ width: '33%'}} />
              <img src="../assets/druid.png" alt="sketch of a cute imposing cat druid with a crescent moon staff" style={{ width: '40%'}} />
              <img src="../assets/bard.png" alt="sketch of a cute cat bard with a lute and a large feather in its cap" style={{ width: '28%'}} />
            </div>
          </section>

          <section class="slide-gradient">
            <div class="flex-h">
              <span><img src="../assets/wizard.png" alt="sketch of a cute cat wizard character holding a staff" width="650" /></span>
              <div class="character-info">
                <h4>The Wizard</h4>
                <span class="subtitle">Our project manager</span>
                <ul style={{ fontSize: '0.8em'}}>
                  <li>Great at inserting a11y into project roadmaps</li>
                  <li>Advocates for hiring and supporting a11y experts</li>
                  <li>Has melted 3 computers with fireball</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="slide-gradient">
            <div class="flex-h">
              <span><img src="../assets/druid.png" alt="sketch of a cute imposing cat druid with a crescent moon staff" width="750" /></span>
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

          <section class="slide-gradient">
            <div class="flex-h">
              <span><img src="../assets/bard.png" alt="sketch of a cute cat bard with a lute and a large feather in its cap" width="650" /></span>
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
            <ul class="sequential-overlays">
              <li>
                <img src="./assets/dragon.png" alt="a sketch of the outline of an unknown dragon-like foe with three question marks within it" width="600" />
              </li>
              <li class="fragment step">
                <img src="./assets/dragon-datepicker.png" alt="the dragon has transformed into a datepicker! It was a datepicker all along!" width="600" />
              </li>
            </ul>
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
            <p style={{ marginTop: '8em' }}>When you see a slide with this image, I will ask for a dice roll</p>
          </section>

          <section data-background-image="./assets/hands.png" data-background-size="150px" data-background-position="10% 10%">
            <p style={{ marginTop: '8em' }}>When you see a slide with this image, I'll ask for audience feedback</p>
          </section>

          <section>
            <p>Challenge 1: A land of contrasts</p>
            <div class="fade-series">
              <img src="../assets/druid.png" alt="sketch of 5 copies of the druid at descending opacity" />
              <img src="../assets/druid.png" alt="" />
              <img src="../assets/druid.png" alt="" />
              <img src="../assets/druid.png" alt="" />
              <img src="../assets/druid.png" alt="" />
            </div>
          </section>

          <section>
            <img src="./assets/datepicker-low-contrast.png" width="600" />
            <aside class="notes">On first image/step, ask for design feedback</aside>
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%" class="slide-gradient">
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
              {/* <label class="roll-choice">
                <input type="radio" name="contrast" value="all" onChange={(ev) => {this.contrast = (ev.target as HTMLInputElement).value as any; this.customContrast = true;}} />
                Your choice! Make Sarah code something custom. (DC 20)
              </label> */}
            </fieldset>
          </section>

          <section class="slide-gradient">
            {this.contrast !== 'none' ?
              <p>We survived our first battle! On to the next...</p>
            : null}
            {this.contrast === 'none' ?
              <p>It's a minor setback, but there are more battles to come!</p>
            : null}
          </section>

          <section>
            Where we are now:
            <dnd-calendar class="calendar" contrast={this.contrast} />
          </section>

          <section class="slide-gradient">
            <p>Challenge 2: Getting a-header the competition</p>
            <img src="./assets/table-headers.png" width="600" />
          </section>

          <section class="slide-gradient">
            Current status:
            <pre><code data-trim data-noescape class="html">
{`<th role="columnheader">
  S
</th>`}
            </code></pre>
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%" class="slide-gradient">
            Some options:
            <pre class="fragment"><code data-trim data-noescape class="html">
{`<th role="columnheader" aria-label="Sunday">
  S
</th>`}
            </code></pre>
            <pre class="fragment"><code data-trim data-noescape class="html">
{`<th role="columnheader" abbr="Sunday">
  S
</th>`}
            </code></pre>
            <pre class="fragment"><code data-trim data-noescape class="html">
{`<th role="columnheader">
  <span aria-hidden="true">S</span>
  <span class="visuallyHidden">Sunday</span>
</th>`}
            </code></pre>
          </section>

          <section data-background-image="./assets/hands.png" data-background-size="150px" data-background-position="10% 10%">
            <label htmlFor="columnheader">Column header labels:</label>
            <select class="select-choice" onChange={(ev) => this.columnheader = (ev.target as HTMLSelectElement).value as any}>
              <option value="ariaLabel">aria-label</option>
              <option value="abbr">abbr</option>
              <option value="text">hidden text</option>
            </select>
          </section>

          <section>
            <p>Challenge 3: our adventurers need to <strong>focus</strong></p>
            <img src="./assets/date-focus-arrows.png" alt="a single date cell in focus, with sketchy red arrows pointing in all four cardinal directions, indicating focus moving with arrow keys" width="400" />
          </section>

          <section>
            <img src="./assets/td-button-diagram.png" alt="a diagram of a TD box with an inner button box inside, with the number 17 within the button" width="500" />
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
            <section>
              <h3>Cell stat sheet</h3>
              <img src="./assets/angry-cube-td.png" alt="an angry gelatinous cube, one side of which is inexplicably a date table cell" width="600" />
            </section>
            <section class="slide-gradient">
              Pro: Grid cells support `aria-selected`
              <dnd-mini-grid class="calendar" />
              <span class="fragment">Con: "selected" announcements are "quirky"</span>
            </section>
            <section class="slide-gradient">
              Pro: <code>gridcell</code> is a composite widget role
              <dnd-mini-grid class="calendar" />
            </section>
            <section class="slide-gradient">
              Con: <code>gridcell</code> is not always recognized with voice control
              <dnd-mini-grid class="calendar" />
            </section>
          </section>
  
          <section>
            <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%">
              <h3>Button stat sheet</h3>
              <img src="./assets/angry-button.png" alt="a weirdly angry purple button (the kind that goes on a shirt), brandishing a sword" width="400" />
            </section>
            <section class="slide-gradient">
              Pro: Buttons natively pick up enter/space and high contrast colors
              <img src="./assets/mini-grid-hcm.png" alt="a screenshot of the mini ABC grid showing header text in white against a black background, and button text in yellow" width="800" />
            </section>
            <section class="slide-gradient">
              Pro: Buttons support <code>aria-pressed</code>
              <dnd-mini-grid class="calendar" cellFocus={false} />
              <span class="fragment">Con: bit weird to have a calendar of toggle buttons though</span>
            </section>
            <section class="slide-gradient">
              Con: <code>button</code> is not a composite widget role
              <dnd-mini-grid class="calendar" cellFocus={false} />
            </section>
          </section>

          <section data-background-image="./assets/hands.png" data-background-size="150px" data-background-position="10% 10%" class="slide-gradient">
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
            <p>Challenge 4: seeking external <strong>&lt;input&gt;</strong></p>
          </section>

          <section class="slide-gradient">
            Our current datepicker:
            <dnd-datepicker class="calendar" style={{ fontSize: '20px' }} contrast={this.contrast} columnheader={this.columnheader} focusModel={this.focusModel} />
          </section>

          <section class="slide-gradient">
            Upgrade?
            <img src="./assets/datepicker-input.png" alt="screenshot of an empty text input to the left of a purple button with a calendar icon" />
          </section>

          <section>
            But wait! An angry stakeholder has appeared!
            <img src="./assets/mind-flayer.png" alt="a blue humanoid creature with an octopus-like head with tentacles coming out brandishes its long spidery fingers menacingly" />
          </section>

          <section data-background-image="./assets/dice2.png" data-background-size="150px" data-background-position="10% 10%" class="slide-gradient">
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
            </fieldset>
          </section>

          <section>
            <h2>Looking back at our adventure</h2>
          </section>

          <section class="slide-gradient">
            <h3>Our choices:</h3>
            <dl class="results-table">
              <dt>Contrast:</dt>
              <dd>
                {this.contrast === 'none' ? 'No change' : null}
                {this.contrast === 'arrows' ? 'Updated previous/next arrows' : null}
                {this.contrast === 'all' ? 'Updated previous/next arrows and today\'s date' : null}
                {this.customContrast ? 'Oh no you made Sarah code! And also updated contrast :)' : null}
              </dd>
              <dt>Weekday labels:</dt>
              <dd>
                {this.columnheader === 'none' ? 'No change from visual abbreviations' : null}
                {this.columnheader === 'ariaLabel' ? 'Added the full weekday in an aria-label attribute' : null}
                {this.columnheader === 'abbr' ? 'Added the full weekday in an `abbr` attribute' : null}
                {this.columnheader === 'text' ? 'Added the full weekday in a visually hidden <span>' : null}
              </dd>
              <dt>Focus model:</dt>
              <dd>
                {this.focusModel === 'cell' ? ('Focus is on the gridcell') : null}
                {this.focusModel === 'button' ? 'Focus is on the button' : null}
                {this.focusModel === 'dual' ? 'Focus is on the gridcell, but with an inner button' : null}
              </dd>
              <dt>Button vs. Input:</dt>
              <dd>
                {this.showInput === false ? 'Kept a single button as calendar trigger' : null}
                {this.showInput === true ? 'Added a text input next to an icon button' : null}
                {this.inputChaos ? 'I have no idea, you chose chaos' : null}
              </dd>
            </dl>
          </section>
          <section class="slide-gradient">
            <h3>Live test!</h3>
            <dnd-datepicker class="calendar" style={{ fontSize: '20px' }} contrast={this.contrast} columnheader={this.columnheader} focusModel={this.focusModel} showInput={this.showInput} />
          </section>

          <section class="slide-gradient">
            <h3 style={{ textTransform: 'none' }}>The battle is over, but the adventure continues</h3>
            <img src="./assets/tavern.png" alt="all three party members relax around a tavern table, the wizard and druid playing cards, and the bard strumming their lute" />
          </section>
        </div>
      </div>
    );
  }
}
