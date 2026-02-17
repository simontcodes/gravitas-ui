import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
  },

  decorators: [
    (story) => ({
      template: `
        <div class="gv-shell">
          <aside class="gv-sidebar">
            <div class="gv-brand">Gravitas</div>

            <div class="gv-nav">
              <div class="gv-nav-title">Dashboard</div>
              <a class="gv-nav-item gv-nav-item--active" href="javascript:void(0)">Overview</a>
              <a class="gv-nav-item" href="javascript:void(0)">Claims</a>
              <a class="gv-nav-item" href="javascript:void(0)">Invoices</a>
              <a class="gv-nav-item" href="javascript:void(0)">Reports</a>
            </div>

            <div class="gv-sidebar-footer">
              <div class="gv-pill">Copernicus</div>
              <div class="gv-muted">Dense Enterprise</div>
            </div>
          </aside>

          <div class="gv-main">
            <header class="gv-topbar">
              <div class="gv-topbar-left">
                <div class="gv-title">Component Preview</div>
                <div class="gv-subtitle">Gravitas UI</div>
              </div>

              <div class="gv-topbar-right">
                <button class="btn btn-sm btn-outline-primary">Action</button>
              </div>
            </header>

            <main class="gv-content">
              <section class="gv-panel">
                <div class="gv-panel-header">
                  <div class="gv-panel-title">Story</div>
                  <div class="gv-panel-actions">
                    <button class="btn btn-sm btn-primary">Primary</button>
                  </div>
                </div>

                <div class="gv-panel-body">
                  <story />
                </div>
              </section>
            </main>
          </div>
        </div>
      `,
    }),
  ],
};

export default preview;
