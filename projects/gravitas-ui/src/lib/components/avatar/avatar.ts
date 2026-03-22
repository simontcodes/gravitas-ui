import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export type GvAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GvAvatarShape = 'circle' | 'rounded' | 'square';
export type GvAvatarBackground = 'subtle' | 'primary' | 'neutral';

@Component({
  selector: 'gv-avatar',
  standalone: true,
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() name?: string;
  @Input() initials?: string;
  @Input() size: GvAvatarSize = 'md';
  @Input() shape: GvAvatarShape = 'circle';
  @Input() background: GvAvatarBackground = 'subtle';

  imageFailed = false;

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'gv-avatar-host',
      `gv-avatar-host--${this.size}`,
      `gv-avatar-host--${this.shape}`,
      `gv-avatar-host--${this.background}`,
    ].join(' ');
  }

  get hasImage(): boolean {
    return !!this.src && !this.imageFailed;
  }

  get computedAlt(): string {
    return this.alt?.trim() || this.name?.trim() || 'Avatar';
  }

  get displayInitials(): string {
    if (this.initials?.trim()) {
      return this.initials.trim().slice(0, 2).toUpperCase();
    }

    if (!this.name?.trim()) {
      return '';
    }

    const parts = this.name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

    return parts
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  get shouldShowInitials(): boolean {
    return !this.hasImage && !!this.displayInitials;
  }

  get shouldShowProjectedContent(): boolean {
    return !this.hasImage && !this.displayInitials;
  }

  onImageError(): void {
    this.imageFailed = true;
  }
}
