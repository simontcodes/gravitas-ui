import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Textarea } from './textarea';

@Component({
  selector: 'gv-textarea-demo',
  standalone: true,
  imports: [FormsModule, Textarea],
  template: `
    <div class="p-4 d-flex flex-column gap-4">
      <div>
        <h6 class="mb-1">Gravitas Textarea</h6>
        <p class="text-muted mb-0" style="max-width: 760px;">
          Premium multiline text input for notes, descriptions, comments, and structured admin
          workflows.
        </p>
      </div>

      <div>
        <div class="small text-muted mb-2">Basic</div>
        <div class="d-flex flex-column gap-3" style="max-width: 640px;">
          <gv-textarea
            label="Notes"
            placeholder="Add your notes here..."
            [(ngModel)]="notes"
          ></gv-textarea>

          <gv-textarea
            label="Internal description"
            description="Only visible to internal users."
            placeholder="Write an internal description..."
            [(ngModel)]="description"
          ></gv-textarea>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Sizes</div>
        <div class="d-flex flex-column gap-3" style="max-width: 640px;">
          <gv-textarea size="sm" label="Small" rows="3" placeholder="Small textarea"></gv-textarea>

          <gv-textarea
            size="md"
            label="Medium"
            rows="3"
            placeholder="Medium textarea"
          ></gv-textarea>

          <gv-textarea size="lg" label="Large" rows="3" placeholder="Large textarea"></gv-textarea>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Helper, error, and max length</div>
        <div class="d-flex flex-column gap-3" style="max-width: 640px;">
          <gv-textarea
            label="Client-facing note"
            helperText="Keep this concise and professional."
            [maxLength]="200"
            [(ngModel)]="clientNote"
          ></gv-textarea>

          <gv-textarea
            label="Required explanation"
            errorText="This field is required."
            placeholder="Add an explanation..."
          ></gv-textarea>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Disabled and readonly</div>
        <div class="d-flex flex-column gap-3" style="max-width: 640px;">
          <gv-textarea
            label="Readonly content"
            [readonly]="true"
            [ngModel]="readonlyValue"
          ></gv-textarea>

          <gv-textarea
            label="Disabled content"
            [disabled]="true"
            [ngModel]="disabledValue"
          ></gv-textarea>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Resize modes</div>
        <div class="d-flex flex-column gap-3" style="max-width: 640px;">
          <gv-textarea label="No resize" resize="none" placeholder="Resize disabled"></gv-textarea>

          <gv-textarea
            label="Vertical resize"
            resize="vertical"
            placeholder="Vertical resize"
          ></gv-textarea>

          <gv-textarea
            label="Both directions"
            resize="both"
            placeholder="Both directions resize"
          ></gv-textarea>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">In context</div>
        <div
          class="rounded-4 border bg-white p-3 d-flex flex-column gap-3"
          style="border-color: rgba(148, 163, 184, 0.24); max-width: 680px;"
        >
          <gv-textarea
            label="Claim summary"
            description="Provide a concise internal summary for the operations team."
            helperText="This note is used in downstream review workflows."
            [maxLength]="400"
            [(ngModel)]="claimSummary"
          ></gv-textarea>
        </div>
      </div>
    </div>
  `,
})
class TextareaStoryDemoComponent {
  notes = '';
  description = '';
  clientNote = 'Policy renewal discussion scheduled for next week.';
  readonlyValue = 'This content is readonly and can still be selected.';
  disabledValue = 'This content is disabled.';
  claimSummary = '';
}

const meta: Meta<TextareaStoryDemoComponent> = {
  title: 'Gravitas/Textarea',
  component: TextareaStoryDemoComponent,
};

export default meta;

type Story = StoryObj<TextareaStoryDemoComponent>;

export const Default: Story = {};
