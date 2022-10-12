import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-demo',
  styleUrl: 'app-demo.css',
  shadow: true,
})
export class AppDemo {

  render() {
    return (
      <div class="app-demo">
        <p>Demo Page</p>
        <dnd-calendar></dnd-calendar>
      </div>
    );
  }
}
