import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-demo',
  styleUrl: 'app-demo.css',
  shadow: false,
})
export class AppDemo {

  render() {
    return (
      <div class="app-demo">
        <dnd-calendar contrast='all' focusModel='dual' />

        <p> </p>

        {/* Datepicker:
        <dnd-datepicker showInput={true} /> */}
      </div>
    );
  }
}
