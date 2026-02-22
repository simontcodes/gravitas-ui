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
    docs: {
      // This helps keep the Docs page clean (no extra wrappers in source blocks).
      source: { excludeDecorators: true },
    },
  },

  decorators: [
    (storyFn: any, context: any) => {
      applyGravitasGlobals(context.globals);

      // ✅ In Docs, do NOT wrap in the shell at all.
      if (context?.viewMode === 'docs') {
        return storyFn();
      }

      // ✅ In Canvas (story view), wrap in the Gravitas shell.
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