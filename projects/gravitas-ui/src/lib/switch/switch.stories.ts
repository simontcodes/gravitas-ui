import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Switch } from './switch';

@Component({
  selector: 'gv-switch-demo',
  standalone: true,
  imports: [FormsModule, Switch],
  template: `
    <div class="p-4 d-flex flex-column gap-4">
      <div>
        <h6 class="mb-1">Gravitas Switch</h6>
        <p class="text-muted mb-0" style="max-width: 760px;">
          Premium toggle control for settings, permissions, notifications, and lightweight binary
          preferences in dashboard interfaces.
        </p>
      </div>

      <div>
        <div class="small text-muted mb-2">Basic</div>
        <div class="d-flex flex-column gap-3">
          <gv-switch label="Enable notifications" [(ngModel)]="notifications"></gv-switch>

          <gv-switch
            label="Browser alerts"
            description="Show a notification when important activity happens."
            [(ngModel)]="browserAlerts"
          ></gv-switch>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Sizes</div>
        <div class="d-flex flex-column gap-3">
          <gv-switch size="sm" label="Small switch" [(ngModel)]="smallOn"></gv-switch>

          <gv-switch size="md" label="Medium switch" [(ngModel)]="mediumOn"></gv-switch>

          <gv-switch size="lg" label="Large switch" [(ngModel)]="largeOn"></gv-switch>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Disabled and helper states</div>
        <div class="d-flex flex-column gap-3">
          <gv-switch
            label="Locked setting"
            description="This setting is managed by your administrator."
            [disabled]="true"
            [ngModel]="true"
          ></gv-switch>

          <gv-switch label="Disabled off" [disabled]="true" [ngModel]="false"></gv-switch>

          <gv-switch
            label="Weekly summary"
            helperText="Sent every Monday at 9:00 AM."
            [(ngModel)]="weeklySummary"
          ></gv-switch>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Error state</div>
        <div class="d-flex flex-column gap-3">
          <gv-switch
            label="Required setting"
            errorText="This setting must be reviewed."
            [ngModel]="false"
          ></gv-switch>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Settings panel example</div>
        <div
          class="rounded-4 border bg-white p-3 d-flex flex-column gap-3"
          style="border-color: rgba(148, 163, 184, 0.24); max-width: 560px;"
        >
          <gv-switch
            label="Email notifications"
            description="Receive an email whenever a new task is assigned."
            [(ngModel)]="settings.email"
          ></gv-switch>

          <gv-switch
            label="Push notifications"
            description="Get browser notifications for urgent updates."
            [(ngModel)]="settings.push"
          ></gv-switch>

          <gv-switch
            label="Auto-renew reminders"
            description="Remind me before a policy reaches renewal."
            [(ngModel)]="settings.renewals"
          ></gv-switch>
        </div>
      </div>
    </div>
  `,
})
class SwitchStoryDemoComponent {
  notifications = true;
  browserAlerts = false;
  smallOn = true;
  mediumOn = false;
  largeOn = true;
  weeklySummary = true;

  settings = {
    email: true,
    push: false,
    renewals: true,
  };
}

const meta: Meta<SwitchStoryDemoComponent> = {
  title: 'Gravitas/Switch',
  component: SwitchStoryDemoComponent,
};

export default meta;

type Story = StoryObj<SwitchStoryDemoComponent>;

export const Default: Story = {};
