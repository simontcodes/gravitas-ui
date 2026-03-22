import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { Divider } from './divider';

@Component({
  selector: 'gv-divider-demo',
  standalone: true,
  imports: [Divider],
  template: `
    <div class="p-4 d-flex flex-column gap-4">
      <div>
        <h6 class="mb-1">Gravitas Divider</h6>
        <p class="text-muted mb-0" style="max-width: 760px;">
          Subtle section separator for cards, toolbars, dropdowns, panels, and settings layouts.
        </p>
      </div>

      <div>
        <div class="small text-muted mb-2">Horizontal</div>
        <div class="rounded-4 border bg-white p-3" style="border-color: rgba(148, 163, 184, 0.24);">
          <div class="mb-3">Section above</div>
          <gv-divider></gv-divider>
          <div class="mt-3">Section below</div>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">With label</div>
        <div class="rounded-4 border bg-white p-3" style="border-color: rgba(148, 163, 184, 0.24);">
          <div class="mb-3">Account settings</div>
          <gv-divider label="Advanced"></gv-divider>
          <div class="mt-3">Danger zone</div>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Inset</div>
        <div class="rounded-4 border bg-white p-3" style="border-color: rgba(148, 163, 184, 0.24);">
          <div class="mb-3">Header content</div>
          <gv-divider [inset]="true"></gv-divider>
          <div class="mt-3">Body content</div>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Vertical</div>
        <div
          class="d-inline-flex align-items-center rounded-4 border bg-white px-3 py-2 gap-3"
          style="border-color: rgba(148, 163, 184, 0.24); min-height: 56px;"
        >
          <span>Overview</span>
          <gv-divider orientation="vertical"></gv-divider>
          <span>Analytics</span>
          <gv-divider orientation="vertical"></gv-divider>
          <span>Exports</span>
        </div>
      </div>
    </div>
  `,
})
class DividerStoryDemoComponent {}

const meta: Meta<DividerStoryDemoComponent> = {
  title: 'Gravitas/Divider',
  component: DividerStoryDemoComponent,
};

export default meta;

type Story = StoryObj<DividerStoryDemoComponent>;

export const Default: Story = {};
