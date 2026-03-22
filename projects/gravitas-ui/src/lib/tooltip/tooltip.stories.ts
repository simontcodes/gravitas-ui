import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { GvTooltipDirective } from './tooltip-directive';

@Component({
  selector: 'gv-tooltip-demo',
  standalone: true,
  imports: [GvTooltipDirective],
  template: `
    <div class="p-4">
      <div class="mb-4">
        <h6 class="mb-1">Gravitas Tooltip</h6>
        <p class="text-muted mb-0" style="max-width: 720px;">
          Quiet, premium tooltip styling for dashboards, forms, tables, and actions. Supports
          placement, trigger modes, disabled state, and compact text wrapping.
        </p>
      </div>

      <div class="d-flex flex-wrap gap-3 align-items-center">
        <button
          type="button"
          class="btn btn-light border rounded-3"
          gvTooltip="Default top tooltip"
        >
          Top
        </button>

        <button
          type="button"
          class="btn btn-light border rounded-3"
          gvTooltip="Tooltip on the right"
          gvTooltipPlacement="right"
        >
          Right
        </button>

        <button
          type="button"
          class="btn btn-light border rounded-3"
          gvTooltip="Tooltip on the bottom"
          gvTooltipPlacement="bottom"
        >
          Bottom
        </button>

        <button
          type="button"
          class="btn btn-light border rounded-3"
          gvTooltip="Tooltip on the left"
          gvTooltipPlacement="left"
        >
          Left
        </button>
      </div>

      <hr class="my-4" />

      <div class="d-flex flex-wrap gap-3 align-items-center">
        <button
          type="button"
          class="btn btn-light border rounded-3"
          gvTooltip="Shown on focus"
          gvTooltipTrigger="focus"
        >
          Focus trigger
        </button>

        <button
          type="button"
          class="btn btn-light border rounded-3"
          gvTooltip="Shown on click"
          gvTooltipTrigger="click"
          gvTooltipPlacement="bottom"
        >
          Click trigger
        </button>

        <button
          type="button"
          class="btn btn-light border rounded-3"
          gvTooltip="This tooltip is disabled"
          [gvTooltipDisabled]="true"
        >
          Disabled
        </button>
      </div>

      <hr class="my-4" />

      <div class="d-flex gap-3 align-items-center">
        <span
          class="badge text-bg-light border rounded-pill px-3 py-2"
          gvTooltip="Useful for short metadata labels too"
        >
          Status badge
        </span>

        <span
          class="text-decoration-underline"
          tabindex="0"
          gvTooltip="Longer helper copy can wrap across multiple lines without looking cramped."
          [gvTooltipMaxWidth]="220"
          gvTooltipPlacement="bottom"
        >
          Hover or focus this text
        </span>
      </div>
    </div>
  `,
})
class TooltipStoryDemoComponent {}

const meta: Meta<TooltipStoryDemoComponent> = {
  title: 'GRAVITAS/Tooltip',
  component: TooltipStoryDemoComponent,
};

export default meta;

type Story = StoryObj<TooltipStoryDemoComponent>;

export const Default: Story = {};
