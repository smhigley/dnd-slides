import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { MONTHS } from './strings';

@Component({
  tag: 'dnd-datepicker',
  styleUrl: './datepicker.css',
  shadow: true
})
export class Datepicker {
  /**
   * Props and State
   */

  // Date object to set the calendar's starting month and year
  @Prop() startDate: Date;

  // Props for talk-specific choices
  @Prop() contrast: 'none' | 'arrows' | 'all' = 'none';
  @Prop() columnheader: 'none' | 'ariaLabel' | 'abbr' | 'text' = 'none';
  @Prop() focusModel: 'cell' | 'button' | 'dual' = 'cell';
  @Prop() showInput: boolean = false;

  @State() open = false;

  @State() currentDate: Date;


  /*
   * Private internal properties
   */

  // Ref for the current focus target, should focus need to be called
  private focusRef: HTMLElement;

  // ref for the input element, if it exists
  private inputRef: HTMLInputElement;

  // if set to true, focus will be called in the next render
  private callFocus = false;

  componentDidUpdate() {
    if (!this.focusRef) return;
    
    // handle focus
    this.callFocus && this.focusRef.focus();
    this.callFocus = false;
  }

  render() {
    return <div class={{"datepicker-wrapper": true, "open": this.open}}>
      <div class="field-wrapper">
        {this.showInput ? this.renderInput() : null}
        <button class="datepicker-button" onClick={() => this.open = !this.open}>
          {!this.showInput ? this.currentDate ? this.formatDate(this.currentDate) : 'Select a date' : null}
          <svg viewBox="0 0 26 28"><path d="M2 26h4.5v-4.5h-4.5v4.5zM7.5 26h5v-4.5h-5v4.5zM2 20.5h4.5v-5h-4.5v5zM7.5 20.5h5v-5h-5v5zM2 14.5h4.5v-4.5h-4.5v4.5zM13.5 26h5v-4.5h-5v4.5zM7.5 14.5h5v-4.5h-5v4.5zM19.5 26h4.5v-4.5h-4.5v4.5zM13.5 20.5h5v-5h-5v5zM8 7v-4.5c0-0.266-0.234-0.5-0.5-0.5h-1c-0.266 0-0.5 0.234-0.5 0.5v4.5c0 0.266 0.234 0.5 0.5 0.5h1c0.266 0 0.5-0.234 0.5-0.5zM19.5 20.5h4.5v-5h-4.5v5zM13.5 14.5h5v-4.5h-5v4.5zM19.5 14.5h4.5v-4.5h-4.5v4.5zM20 7v-4.5c0-0.266-0.234-0.5-0.5-0.5h-1c-0.266 0-0.5 0.234-0.5 0.5v4.5c0 0.266 0.234 0.5 0.5 0.5h1c0.266 0 0.5-0.234 0.5-0.5zM26 6v20c0 1.094-0.906 2-2 2h-22c-1.094 0-2-0.906-2-2v-20c0-1.094 0.906-2 2-2h2v-1.5c0-1.375 1.125-2.5 2.5-2.5h1c1.375 0 2.5 1.125 2.5 2.5v1.5h6v-1.5c0-1.375 1.125-2.5 2.5-2.5h1c1.375 0 2.5 1.125 2.5 2.5v1.5h2c1.094 0 2 0.906 2 2z"></path></svg>
        </button>
      </div>
      <div class="popup">
        <dnd-calendar class="calendar" contrast={this.contrast} columnheader={this.columnheader} focusModel={this.focusModel} startDate={this.currentDate} selectedDay={this.currentDate} onDateSelected={this.onDateSelect.bind(this)} />
      </div>
    </div>;
  }

  private formatDate(date: Date) {
    if (!date || !(date instanceof Date)) return '';
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  private onDateSelect(event) {
    this.currentDate = event.detail;
    this.open = false;
    if (this.inputRef) {
      this.inputRef.value = this.formatDate(this.currentDate);
    }
  }

  private parseInput(value: string) {
    const date = new Date(value);
    if (date && !isNaN(date.getTime())) {
      this.currentDate = date;
      if (this.inputRef) {
        this.inputRef.value = this.formatDate(date);
      }
    }
    else {
      this.currentDate = null;
      if (this.inputRef) {
        this.inputRef.value = '';
      }
    }
    this.open = false;
  }

  private renderInput() {
    return <input type="text" class="datepicker-input" onBlur={(ev) => this.parseInput((ev.target as HTMLInputElement).value)} ref={(el) => this.inputRef = el} />
  }
}
