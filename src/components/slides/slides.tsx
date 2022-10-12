import { Component, h } from '@stencil/core';

@Component({
  tag: 'dnd-slides',
  styleUrl: 'slides.css',
  shadow: true,
})
export class Slides {

  render() {
    return (
      <div class="slides">
        <p>Hello world</p>
      </div>
    );
  }
}
