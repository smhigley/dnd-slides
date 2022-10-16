import { Component, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { WEEKDAYS_ABBR, WEEKDAYS_FULL, MONTHS } from './strings';

@Component({
  tag: 'dnd-calendar',
  styleUrl: './calendar.css',
  shadow: true
})
export class Calendar {
  /**
   * Props and State
   */

  // Date object to set the calendar's starting month and year
  @Prop() startDate: Date;

  @Prop() selectedDay: Date;

  // Props for talk-specific choices
  @Prop() contrast: 'none' | 'arrows' | 'all' = 'none';
  @Prop() columnheader: 'none' | 'ariaLabel' | 'abbr' | 'text' = 'none';
  @Prop() focusModel: 'cell' | 'button' | 'dual' = 'cell';

  // activeDate refers to the date info for the current highlighted date within the current month
  @State() activeDate: number;

  // highlight active week/day column
  @State() activeWeek: number;
  @State() activeDayColumn: number;

  // selectedDate refers to the [day, month, year] info for the selected date
  @State() selectedDate: Date | undefined;

  // current month index, 0-based
  @State() month: number;

  // current year
  @State() year: number;

  // grid of dates for the current month
  @State() dates: (number | undefined)[][];

  // public focus method
  @Method()
  async focusDate() {
    console.log('focus date', this.focusRef);
    if (this.focusRef) {
      this.focusRef.focus();
    }
  }

  /*
   * Private internal properties
   */

  // Ref for the current focus target, should focus need to be called
  private focusRef: HTMLElement;

  // if set to true, focus will be called in the next render
  private callFocus = false;

  // save a reference to today
  private today = new Date();

  /*
   * Emit a custom event when a date is selected
   */
  @Event() dateSelected: EventEmitter<Date>;

  /*
   * Update the date grid when the month or year changes
   */
  @Watch('month')
  @Watch('year')
  watchMonth() {
    this.dates = this.generateMonthDates();
  }

  @Watch('selectedDay')
  watchStartDate() {
    if (!this.selectedDay) {
      this.selectedDate = undefined;
      return;
    };

    this.activeDate = this.selectedDay.getDate();
    if (this.selectedDay.getMonth() !== this.month || this.selectedDay.getFullYear() !== this.year) {
      this.month = this.selectedDay.getMonth();
      this.year = this.selectedDay.getFullYear();
      this.generateMonthDates();
    }
  }

  componentWillLoad() {
    this.selectedDate = this.selectedDay ? this.selectedDay : undefined;
    const startDate = this.startDate ? new Date(this.startDate) : new Date();
    this.month = startDate.getMonth();
    this.year = startDate.getFullYear();
    this.activeDate = startDate.getDate();
    this.generateMonthDates();
  }

  componentDidUpdate() {
    if (!this.focusRef) return;
    
    // handle focus
    this.callFocus && this.focusRef.focus();
    this.callFocus = false;
  }

  render() {
    return <div class={`wrapper contrast-${this.contrast}`}>
        <div class="calendar-header">
          <button class="month-nav" aria-label={`Previous month, ${MONTHS[this.month - 1]}`} onClick={() => { this.updateActiveMonth(this.month - 1) }}>
            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M13.891 17.418c0.268 0.272 0.268 0.709 0 0.979s-0.701 0.271-0.969 0l-7.83-7.908c-0.268-0.27-0.268-0.707 0-0.979l7.83-7.908c0.268-0.27 0.701-0.27 0.969 0s0.268 0.709 0 0.979l-7.141 7.419 7.141 7.418z"></path></svg>
          </button>
          <span id={'dnd-calendar-caption'} class="month-title" aria-live="polite" aria-atomic="true">{MONTHS[this.month]} {this.year}</span>
          <button class="month-nav" aria-label={`Next month, ${MONTHS[this.month + 1]}`} onClick={() => { this.updateActiveMonth(this.month + 1) }}>
            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M13.25 10l-7.141-7.42c-0.268-0.27-0.268-0.707 0-0.979 0.268-0.27 0.701-0.27 0.969 0l7.83 7.908c0.268 0.271 0.268 0.709 0 0.979l-7.83 7.908c-0.268 0.271-0.701 0.27-0.969 0s-0.268-0.707 0-0.979l7.141-7.417z"></path></svg>
          </button>
        </div>
        <table role="grid" class="grid" aria-labelledby={'dnd-calendar-caption'} onKeyDown={this.onKeydown.bind(this)}>
        <thead role="rowgroup" class="grid-header">
          <tr role="row" class="row">
            {WEEKDAYS_ABBR.map((day, i) => {
              return (
                <th role="columnheader" class={{'column-header': true}} aria-label={this.columnheader === 'ariaLabel' ? WEEKDAYS_FULL[i] : null} abbr={this.columnheader === 'abbr' ? WEEKDAYS_FULL[i] : null}>
                  {this.columnheader === 'text' ?
                    <span class="visuallyHidden">{WEEKDAYS_FULL[i]}</span>
                  : null}
                    <span aria-hidden={this.columnheader === 'text' ? 'true' : null}>{day}</span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody role="rowgroup" class="grid-body">
          {this.dates.map((weekDays = [], weekIndex) => {
            return (
              <tr role="row" class="row">
                {weekDays.map((day, dayIndex) => this.renderCell(day, weekIndex, dayIndex))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>;
  }

  private generateMonthDates(): (number | undefined)[][] {
    const { month, year } = this;
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    const weeks = [];

    let currentDate = 1 - firstDay;
    let currentWeek = [];
    while (currentDate <= numDays) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      const dayValue = currentDate < 1 ? undefined : currentDate;
      
      currentWeek.push(dayValue);
      currentDate++;
    }

    // handle last week
    while (currentWeek.length < 7) {
      currentWeek.push(undefined);
    }
    weeks.push(currentWeek);

    return weeks;
  };

  private isSameDay(date1: Date, date2: Date) {
    if (!date1 || !date2) {
      return false;
    }

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  private onDateHighlightOn(weekIndex: number, dayIndex: number) {
    this.activeDayColumn = dayIndex;
    this.activeWeek = weekIndex;
  }

  private onDateHighlightOff() {
    this.activeDayColumn = undefined;
    this.activeWeek = undefined;
  }

  private onDateClick(date) {
    if (date) {
      this.activeDate = date;
      this.selectDate(date)
    }
  }

  private onKeydown(event: KeyboardEvent) {
    let activeDate = this.activeDate;
    let activeMonth = this.month;
    switch(event.key) {
      case 'ArrowUp':
        activeDate = activeDate - 7;
        break;
      case 'ArrowDown':
        activeDate = activeDate + 7;
        break;
      case 'ArrowLeft':
        activeDate -= 1;
        break;
      case 'ArrowRight':
        activeDate += 1;
        break;
      case 'Home':
        activeDate = 1;
        break;
      case 'End':
        activeDate = new Date(this.year, this.month + 1, 0).getDate();
        break;
      case ' ':
      case 'Enter':
        this.selectDate(activeDate);
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'PageUp':
        activeMonth -= 1;
        break;
      case 'PageDown':
        activeMonth += 1;
        break;
    }

    if (this.updateActiveMonth(activeMonth) || this.updateActiveDate(activeDate)) {
      this.callFocus = true;
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private renderCell(date: number | undefined, weekIndex: number, dayIndex: number) {
    let isActiveDate = false, isToday = false, isSelected = false;
    if (typeof date === 'number') {
      const cellDate = new Date(this.year, this.month, date);
      isActiveDate = date === this.activeDate;
      isToday = this.isSameDay(cellDate, this.today);
      isSelected = this.selectedDate && this.isSameDay(cellDate, this.selectedDate);
    }
    const isHighlighted = weekIndex === this.activeWeek || dayIndex === this.activeDayColumn;
    const cellFocus = this.focusModel === 'cell' || this.focusModel === 'dual';
    const onDateClick = () => { this.onDateClick(date); };
    return <td
      role='gridcell'
      id={`date-${date}`}
      class={{'cell': true, 'today': isToday, 'selected': isSelected, 'highlight': isHighlighted }}
      aria-selected={`${isSelected}`}
      aria-current={isToday ? 'date' : null}
      tabIndex={cellFocus ? isActiveDate ? 0 : -1 : null}
      ref={cellFocus && isActiveDate ? (el) => {
        this.focusRef = el;
      } : null}
      onClick={onDateClick}
      onBlur={() => this.onDateHighlightOff()}
      onFocus={date ? () => this.onDateHighlightOn(weekIndex, dayIndex) : null}
      onMouseEnter={date ? () => this.onDateHighlightOn(weekIndex, dayIndex) : null}
      onMouseLeave={() => this.onDateHighlightOff()}
    >
      { date ? 
        this.focusModel !== 'cell' ?
          <button
            class="date-button"
            onClick={onDateClick}
            tabIndex={!cellFocus && isActiveDate ? 0 : -1}
            ref={!cellFocus && isActiveDate ? (el) => {
              this.focusRef = el;
            } : null}
          >{date}</button>
          : <span class="date-button">{date}</span>
        : <span></span>
      }
    </td>;
  }

  private selectDate(date: number) {
    if (!this.isSameDay(new Date(this.year, this.month, date), this.selectedDate)) {
      this.selectedDate = new Date(this.year, this.month, date);
      this.dateSelected.emit(this.selectedDate);
    }
  }

  private updateActiveDate(date: number): boolean {
    if (date !== this.activeDate) {
      const newDate = new Date(this.year, this.month, date);
      this.year = newDate.getFullYear();
      this.month = newDate.getMonth();
      this.activeDate = newDate.getDate();
      return true;
    }

    return false;
  }

  private updateActiveMonth(month: number): boolean {
    if (month !== this.month) {
      const nextMonth = new Date(this.year, month, 1);
      const nextMonthMax = new Date(this.year, month + 1, 0).getDate();
      const nextActiveDate = Math.min(nextMonthMax, this.activeDate);
      this.year = nextMonth.getFullYear();
      this.month = nextMonth.getMonth();
      this.activeDate = nextActiveDate;
      return true;
    }

    return false;
  }
}
