import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Radio } from './radio';

@Component({
  selector: 'gv-radio-demo',
  standalone: true,
  imports: [FormsModule, Radio],
  template: `
    <div class="p-4 d-flex flex-column gap-4">
      <div>
        <h6 class="mb-1">Gravitas Radio</h6>
        <p class="text-muted mb-0" style="max-width: 760px;">
          Premium radio control for single-choice selections in forms, pricing plans, settings
          panels, and dashboard filters.
        </p>
      </div>

      <div>
        <div class="small text-muted mb-2">Basic group</div>
        <div class="d-flex flex-column gap-3">
          <gv-radio
            name="status"
            value="active"
            label="Active"
            description="Only show currently active records."
            [(ngModel)]="selectedStatus"
          ></gv-radio>

          <gv-radio
            name="status"
            value="archived"
            label="Archived"
            description="Show archived records only."
            [(ngModel)]="selectedStatus"
          ></gv-radio>

          <gv-radio
            name="status"
            value="all"
            label="All records"
            description="Include active and archived items."
            [(ngModel)]="selectedStatus"
          ></gv-radio>
        </div>

        <div class="mt-3 small text-muted">
          Selected: <strong>{{ selectedStatus }}</strong>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Sizes</div>
        <div class="d-flex flex-column gap-3">
          <gv-radio
            name="size-sm"
            value="sm"
            size="sm"
            label="Small radio"
            [(ngModel)]="smallChoice"
          ></gv-radio>

          <gv-radio
            name="size-md"
            value="md"
            size="md"
            label="Medium radio"
            [(ngModel)]="mediumChoice"
          ></gv-radio>

          <gv-radio
            name="size-lg"
            value="lg"
            size="lg"
            label="Large radio"
            [(ngModel)]="largeChoice"
          ></gv-radio>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Disabled states</div>
        <div class="d-flex flex-column gap-3">
          <gv-radio
            name="disabled-example"
            value="enabled"
            label="Enabled option"
            [(ngModel)]="disabledExample"
          ></gv-radio>

          <gv-radio
            name="disabled-example"
            value="disabled-selected"
            label="Disabled selected"
            [disabled]="true"
            [ngModel]="'disabled-selected'"
          ></gv-radio>

          <gv-radio
            name="disabled-example-2"
            value="disabled-unselected"
            label="Disabled unselected"
            [disabled]="true"
            [ngModel]="'other-value'"
          ></gv-radio>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Helper and error text</div>
        <div class="d-flex flex-column gap-3">
          <gv-radio
            name="billing"
            value="monthly"
            label="Monthly billing"
            helperText="Billed every 30 days."
            [(ngModel)]="billingCycle"
          ></gv-radio>

          <gv-radio
            name="billing"
            value="annual"
            label="Annual billing"
            description="Save more with a yearly commitment."
            [(ngModel)]="billingCycle"
          ></gv-radio>

          <gv-radio
            name="required-choice"
            value="missing"
            label="Required option"
            errorText="Please choose one option."
            [ngModel]="null"
          ></gv-radio>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Plan selector example</div>
        <div
          class="rounded-4 border bg-white p-3 d-flex flex-column gap-3"
          style="border-color: rgba(148, 163, 184, 0.24); max-width: 560px;"
        >
          <gv-radio
            name="plan"
            value="starter"
            label="Starter"
            description="For smaller teams getting started."
            [(ngModel)]="selectedPlan"
          ></gv-radio>

          <gv-radio
            name="plan"
            value="growth"
            label="Growth"
            description="Best for scaling operations and collaboration."
            [(ngModel)]="selectedPlan"
          ></gv-radio>

          <gv-radio
            name="plan"
            value="enterprise"
            label="Enterprise"
            description="Advanced controls, support, and governance."
            [(ngModel)]="selectedPlan"
          ></gv-radio>
        </div>

        <div class="mt-3 small text-muted">
          Selected plan: <strong>{{ selectedPlan }}</strong>
        </div>
      </div>
    </div>
  `,
})
class RadioStoryDemoComponent {
  selectedStatus = 'active';
  smallChoice = 'sm';
  mediumChoice = 'md';
  largeChoice = 'lg';
  disabledExample = 'enabled';
  billingCycle = 'annual';
  selectedPlan = 'growth';
}

const meta: Meta<RadioStoryDemoComponent> = {
  title: 'Gravitas/Radio',
  component: RadioStoryDemoComponent,
};

export default meta;

type Story = StoryObj<RadioStoryDemoComponent>;

export const Default: Story = {};
