import { Component, h, Prop, State } from '@stencil/core';

// Purely example data
const COLUMN_NAMES = ['A', 'B', 'C'];
const CELL_NAMES = ['Wizard', 'Druid', 'Bard'];

@Component({
  tag: 'dnd-mini-grid',
  styleUrl: './mini-grid.css',
  shadow: true
})
export class MiniGrid {
  /**
   * Props and State
   */
  @Prop() cellFocus: boolean = true;

  // activeDate refers to the date info for the current highlighted date within the current month
  @State() activeCell: number = 1;

  // selectedDate refers to the [day, month, year] info for the selected date
  @State() selectedCell: number = 1;

  /*
   * Private internal properties
   */

  // Ref for the current focus target, should focus need to be called
  private focusRef: HTMLElement;

  // if set to true, focus will be called in the next render
  private callFocus = false;

  componentDidUpdate() {
    if (!this.focusRef) return;
    
    // handle focus
    this.callFocus && this.focusRef.focus();
    this.callFocus = false;
  }

  render() {
    console.log('render');
    return <div class="wrapper">
        <table role="grid" class="grid" aria-label="Grid interaction example" onKeyDown={this.onKeydown.bind(this)}>
        <thead role="rowgroup" class="grid-header">
          <tr role="row" class="row">
            {COLUMN_NAMES.map((col, i) => {
              return (
                <th role="columnheader" class="column-header">
                  <span>{col}</span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody role="rowgroup" class="grid-body">
          <tr role="row" class="row">
            {CELL_NAMES.map((cell, i) => this.renderCell(cell, i))}
          </tr>
        </tbody>
      </table>
    </div>;
  }

  private onDateClick(value: string, index: number) {
    if (value) {
      this.activeCell = index;
      this.selectDate(index)
    }
  }

  private onKeydown(event: KeyboardEvent) {
    let activeCell = this.activeCell;
    switch(event.key) {
      case 'ArrowLeft':
        activeCell = Math.max(0, activeCell - 1);
        break;
      case 'ArrowRight':
        activeCell = Math.min(2, activeCell + 1);
        break;
      case 'Home':
        activeCell = 0;
        break;
      case 'End':
        activeCell = 2;
        break;
      case ' ':
      case 'Enter':
        this.selectDate(activeCell);
        event.preventDefault();
        event.stopPropagation();
        break;
    }

    if (activeCell !== this.activeCell) {
      this.callFocus = true;
      this.activeCell = activeCell;
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private renderCell(value: string, index: number) {
    const isActiveDate = index === this.activeCell;
    const isSelected = index === this.selectedCell;
    const onDateClick = () => { this.onDateClick(value, index); };
    return <td
      role='gridcell'
      id={`date-${index}`}
      class={{'cell': true, 'selected': isSelected }}
      aria-selected={`${isSelected}`}
      tabIndex={this.cellFocus ? isActiveDate ? 0 : -1 : null}
      ref={this.cellFocus && isActiveDate ? (el) => {
        this.focusRef = el;
      } : null}
      onClick={onDateClick}
    >
      { !this.cellFocus ? 
        <button
          class="date-button"
          onClick={onDateClick}
          aria-pressed={!this.cellFocus ? `${isSelected}` : null}
          tabIndex={!this.cellFocus && isActiveDate ? 0 : -1}
          ref={!this.cellFocus && isActiveDate ? (el) => {
            this.focusRef = el;
          } : null}
        >
          {value}
        </button>
        : <span class="date-button">{value}</span>
      }
    </td>;
  }

  private selectDate(index: number) {
    this.selectedCell = index;
  }
}
