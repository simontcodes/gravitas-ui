import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { Avatar } from './avatar';

@Component({
  selector: 'gv-avatar-demo',
  standalone: true,
  imports: [Avatar],
  template: `
    <div class="p-4 d-flex flex-column gap-4">
      <div>
        <h6 class="mb-1">Gravitas Avatar</h6>
        <p class="text-muted mb-0" style="max-width: 760px;">
          Compact identity primitive for people, assignees, account chips, table rows, comments,
          headers, and lightweight admin UI surfaces.
        </p>
      </div>

      <div>
        <div class="small text-muted mb-2">Initials</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-avatar initials="ST"></gv-avatar>
          <gv-avatar initials="MB" size="sm"></gv-avatar>
          <gv-avatar initials="GV" size="lg"></gv-avatar>
          <gv-avatar initials="UI" size="xl"></gv-avatar>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Image avatars</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-avatar src="https://i.pravatar.cc/80?img=12" alt="User avatar"></gv-avatar>

          <gv-avatar src="https://i.pravatar.cc/80?img=24" alt="User avatar" size="lg"></gv-avatar>

          <gv-avatar src="https://i.pravatar.cc/100?img=31" alt="User avatar" size="xl"></gv-avatar>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Shapes</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-avatar initials="ST" shape="circle"></gv-avatar>
          <gv-avatar initials="ST" shape="rounded"></gv-avatar>
          <gv-avatar initials="ST" shape="square"></gv-avatar>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Fallback behavior</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-avatar initials="NA"></gv-avatar>

          <gv-avatar
            src="https://example.invalid/broken-image.jpg"
            alt="Broken image fallback"
            initials="BK"
          ></gv-avatar>

          <gv-avatar initials="?"></gv-avatar>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Sizes</div>
        <div class="d-flex flex-wrap gap-3 align-items-center">
          <gv-avatar initials="SM" size="sm"></gv-avatar>
          <gv-avatar initials="MD" size="md"></gv-avatar>
          <gv-avatar initials="LG" size="lg"></gv-avatar>
          <gv-avatar initials="XL" size="xl"></gv-avatar>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">In context</div>
        <div
          class="rounded-4 border bg-white p-3 d-flex align-items-center justify-content-between"
          style="border-color: rgba(148, 163, 184, 0.24); max-width: 520px;"
        >
          <div class="d-flex align-items-center gap-3">
            <gv-avatar initials="ST" size="lg"></gv-avatar>

            <div class="min-w-0">
              <div class="fw-semibold text-dark">Simón Tang</div>
              <div class="text-muted small">Agency Owner</div>
            </div>
          </div>

          <span
            class="badge rounded-pill text-bg-light border"
            style="border-color: rgba(148, 163, 184, 0.24);"
          >
            Active
          </span>
        </div>
      </div>

      <div>
        <div class="small text-muted mb-2">Team row example</div>
        <div
          class="rounded-4 border bg-white p-3 d-flex flex-column gap-3"
          style="border-color: rgba(148, 163, 184, 0.24); max-width: 560px;"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <gv-avatar src="https://i.pravatar.cc/80?img=15" alt="Caitlin avatar"></gv-avatar>

              <div>
                <div class="fw-semibold text-dark">Caitlin Morris</div>
                <div class="text-muted small">Senior Coordinator</div>
              </div>
            </div>

            <span class="text-muted small">Toronto</span>
          </div>

          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <gv-avatar initials="AR"></gv-avatar>

              <div>
                <div class="fw-semibold text-dark">Andrés Rojas</div>
                <div class="text-muted small">Broker</div>
              </div>
            </div>

            <span class="text-muted small">Remote</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
class AvatarStoryDemoComponent {}

const meta: Meta<AvatarStoryDemoComponent> = {
  title: 'Gravitas/Avatar',
  component: AvatarStoryDemoComponent,
};

export default meta;

type Story = StoryObj<AvatarStoryDemoComponent>;

export const Default: Story = {};
