import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="dnd-slides" componentProps={{ className: 'slide-container' }} exact={true} />
            <stencil-route url="/demo" component="app-demo" />
          </stencil-route-switch>
        </stencil-router>
      </main>
    );
  }
}
