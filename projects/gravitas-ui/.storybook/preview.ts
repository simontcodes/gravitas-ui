import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { ShellWrapperComponent } from './shell-wrapper.component';

setCompodocJson(docJson);

/** ✅ Toolbar: Theme */
export const globalTypes = {
  gvTheme: {
    name: 'Theme',
    description: 'Gravitas theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },

  /** ✅ Toolbar: Density */
  gvDensity: {
    name: 'Density',
    description: 'Gravitas density scale',
    defaultValue: 'compact',
    toolbar: {
      icon: 'sidebar',
      items: [
        { value: 'compact', title: 'Compact' },
        { value: 'comfortable', title: 'Comfortable' },
        { value: 'spacious', title: 'Spacious' },
      ],
      dynamicTitle: true,
    },
  },
};

function applyGravitasGlobals(globals: any) {
  const theme = globals?.gvTheme ?? 'light';
  const density = globals?.gvDensity ?? 'compact';

  document.documentElement.setAttribute('data-gv-theme', theme);
  document.documentElement.setAttribute('data-gv-density', density);
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (storyFn, context) => {
      applyGravitasGlobals(context.globals);

      const story = storyFn();

      return {
        ...story,
        moduleMetadata: {
          ...(story.moduleMetadata ?? {}),
          imports: [
            ...((story.moduleMetadata?.imports as any[]) ?? []),
            ShellWrapperComponent,
          ],
        },
        template: `
          <gv-story-shell>
            ${story.template ?? ''}
          </gv-story-shell>
        `,
        props: story.props ?? {},
      };
    },
  ],
};

export default preview;
