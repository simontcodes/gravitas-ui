import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from './checkbox';

@Component({
  selector: 'gv-checkbox-demo',
  standalone: true,
  imports: [FormsModule, Checkbox],
  template: `
    <div class="p-4 d-flex flex-column gap-4">
      <div>
        <h6 class="mb-1">Gravitas Checkbox</h6>
        <p class="text-muted mb-0" style="max-width: 760px;">
          Premium, form-friendly checkbox control for settings panels, filters, table bulk actions,
          and admin-style forms.
        </p>
      </div>

      <div>
        <div class="small text-muted mb-2">Basic</div>
        <div class="d-flex flex-column gap-3">
          <gv-checkbox label="Enable notifications" [(ngModel)]="notifications"></gv-checkbox>

          <gv-checkbox
            label="Allow email updates"
            description="Send occasional product and workflow updates."
            [(ngModel)]="emailUpdates"
          ></gv-checkbox>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Sizes</div>
        <div class="d-flex flex-column gap-3">
          <gv-checkbox size="sm" label="Small checkbox" [(ngModel)]="smallChecked"></gv-checkbox>

          <gv-checkbox size="md" label="Medium checkbox" [(ngModel)]="mediumChecked"></gv-checkbox>

          <gv-checkbox size="lg" label="Large checkbox" [(ngModel)]="largeChecked"></gv-checkbox>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Indeterminate and disabled</div>
        <div class="d-flex flex-column gap-3">
          <gv-checkbox
            label="Select all brokers"
            description="Some items are currently selected."
            [indeterminate]="true"
          ></gv-checkbox>

          <gv-checkbox
            label="Archived option"
            description="This setting cannot be changed right now."
            [disabled]="true"
            [ngModel]="true"
          ></gv-checkbox>

          <gv-checkbox label="Disabled unchecked" [disabled]="true" [ngModel]="false"></gv-checkbox>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Helper and error text</div>
        <div class="d-flex flex-column gap-3">
          <gv-checkbox
            label="Accept terms"
            helperText="You must accept before continuing."
            [(ngModel)]="termsAccepted"
          ></gv-checkbox>

          <gv-checkbox
            label="Required consent"
            errorText="This field is required."
            [ngModel]="false"
          ></gv-checkbox>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Settings panel example</div>
        <div
          class="rounded-4 border bg-white p-3 d-flex flex-column gap-3"
          style="border-color: rgba(148, 163, 184, 0.24); max-width: 560px;"
        >
          <gv-checkbox
            label="Email notifications"
            description="Receive an email whenever a new request is assigned to you."
            [(ngModel)]="settings.email"
          ></gv-checkbox>

          <gv-checkbox
            label="Browser alerts"
            description="Show in-app alerts for urgent policy activity."
            [(ngModel)]="settings.browser"
          ></gv-checkbox>

          <gv-checkbox
            label="Weekly summary"
            description="Send a weekly digest every Monday morning."
            [(ngModel)]="settings.weekly"
          ></gv-checkbox>
        </div>
      </div>
    </div>
  `,
})
class CheckboxStoryDemoComponent {
  notifications = true;
  emailUpdates = false;
  smallChecked = true;
  mediumChecked = false;
  largeChecked = true;
  termsAccepted = false;

  settings = {
    email: true,
    browser: true,
    weekly: false,
  };
}

const meta: Meta<CheckboxStoryDemoComponent> = {
  title: 'Gravitas/Checkbox',
  component: CheckboxStoryDemoComponent,
};

export default meta;

type Story = StoryObj<CheckboxStoryDemoComponent>;

export const Default: Story = {};
