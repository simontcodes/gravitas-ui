import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { IconButton } from './icon-button';

@Component({
  selector: 'gv-icon-button-demo',
  standalone: true,
  imports: [IconButton],
  template: `
    <div class="p-4 d-flex flex-column gap-4">
      <div>
        <h6 class="mb-1">Gravitas Icon Button</h6>
        <p class="text-muted mb-0" style="max-width: 760px;">
          Compact icon-only button for utility actions, row controls, toolbar items, close buttons,
          and lightweight contextual interactions.
        </p>
      </div>

      <div>
        <div class="small text-muted mb-2">Variants</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-icon-button ariaLabel="Edit">
            <i class="bi bi-pencil"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="More actions" variant="ghost">
            <i class="bi bi-three-dots"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Pin" variant="primary">
            <i class="bi bi-pin-angle"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Delete" variant="danger">
            <i class="bi bi-trash"></i>
          </gv-icon-button>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Sizes</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-icon-button ariaLabel="Refresh small" size="sm">
            <i class="bi bi-arrow-clockwise"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Refresh medium" size="md">
            <i class="bi bi-arrow-clockwise"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Refresh large" size="lg">
            <i class="bi bi-arrow-clockwise"></i>
          </gv-icon-button>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Shapes</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-icon-button ariaLabel="Default rounded" shape="rounded">
            <i class="bi bi-star"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Circle shape" shape="circle">
            <i class="bi bi-heart"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Square shape" shape="square">
            <i class="bi bi-grid"></i>
          </gv-icon-button>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">States</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-icon-button ariaLabel="Active item" [active]="true">
            <i class="bi bi-layout-sidebar"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Disabled item" [disabled]="true">
            <i class="bi bi-lock"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Ghost disabled" variant="ghost" [disabled]="true">
            <i class="bi bi-eye-slash"></i>
          </gv-icon-button>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Toolbar example</div>
        <div
          class="d-inline-flex align-items-center gap-2 rounded-4 border bg-white px-2 py-2"
          style="border-color: rgba(148, 163, 184, 0.24);"
        >
          <gv-icon-button ariaLabel="Back" variant="ghost" size="sm">
            <i class="bi bi-arrow-left"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Forward" variant="ghost" size="sm">
            <i class="bi bi-arrow-right"></i>
          </gv-icon-button>

          <div class="vr mx-1"></div>

          <gv-icon-button ariaLabel="Refresh" size="sm">
            <i class="bi bi-arrow-clockwise"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Settings" size="sm">
            <i class="bi bi-gear"></i>
          </gv-icon-button>

          <gv-icon-button ariaLabel="Delete" variant="danger" size="sm">
            <i class="bi bi-trash"></i>
          </gv-icon-button>
        </div>
      </div>
    </div>
  `,
})
class IconButtonStoryDemoComponent {}

const meta: Meta<IconButtonStoryDemoComponent> = {
  title: 'Gravitas/Icon Button',
  component: IconButtonStoryDemoComponent,
};

export default meta;

type Story = StoryObj<IconButtonStoryDemoComponent>;

export const Default: Story = {};
