import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Card } from './card';
import { Button } from '../button/button';

const meta: Meta<Card> = {
  title: 'Gravitas/Card',
  component: Card,
  decorators: [
    moduleMetadata({
      imports: [Card, Button], // Card is standalone; Button only if used in templates below
    }),
  ],
  args: {
    title: 'Card Title',
    subtitle: 'Optional subtitle',
    fullHeight: false,
    interactive: false,
    disabled: false,
    className: '',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    fullHeight: { control: 'boolean' },
    interactive: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    // Output handlers should not be part of controls
    cardClick: { action: 'cardClick', table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<Card>;

function renderCard(args: any) {
  return {
    props: args,
    template: `
      <div style="max-width: 520px;">
        <gv-card
          [title]="title"
          [subtitle]="subtitle"
          [fullHeight]="fullHeight"
          [interactive]="interactive"
          [disabled]="disabled"
          [className]="className"
          (cardClick)="cardClick($event)"
        >
          <div class="text-2">
            This is the card body content. Use it for dashboard widgets, summaries, and panels.
          </div>

          <div gvCardFooter class="d-flex justify-content-end gap-2 mt-3">
            <gv-button variant="secondary" size="sm">Cancel</gv-button>
            <gv-button variant="primary" size="sm">Save</gv-button>
          </div>
        </gv-card>
      </div>
    `,
  };
}

export const Default: Story = {
  render: renderCard,
};

export const Interactive: Story = {
  args: { interactive: true, subtitle: 'Clickable (hover + keyboard)' },
  render: renderCard,
};

export const DisabledInteractive: Story = {
  args: { interactive: true, disabled: true, subtitle: 'Interactive but disabled' },
  render: renderCard,
};

export const NoHeader: Story = {
  args: { title: null, subtitle: null },
  render: renderCard,
};
