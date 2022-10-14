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
        <p>Demo Page</p>
        <dnd-calendar contrast='none' focusModel='button' />

        <p> </p>

        Datepicker:
        <dnd-datepicker showInput={true} />
      </div>
    );
  }
}
