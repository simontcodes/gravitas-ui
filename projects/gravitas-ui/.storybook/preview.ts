import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { ShellWrapperComponent } from './shell-wrapper.component';

setCompodocJson(docJson);

/* ----------------------------------------
   🌍 GLOBAL TOOLBARS (Theme + Density)
---------------------------------------- */
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

/* ----------------------------------------
   🎨 APPLY GLOBALS TO DOM
---------------------------------------- */
function applyGravitasGlobals(globals: any) {
  const theme = globals?.gvTheme ?? 'light';
  const density = globals?.gvDensity ?? 'compact';

  const root = document.documentElement;

  root.setAttribute('data-gv-theme', theme);
  root.setAttribute('data-gv-density', density);
}

/* ----------------------------------------
   🧱 PREVIEW CONFIG
---------------------------------------- */
const preview: Preview = {
  parameters: {
    layout: 'fullscreen',

    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      source: { excludeDecorators: true },
    },

    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', 'Patterns', 'Examples'],
      },
    },
  },

  decorators: [
    (storyFn: any, context: any) => {
      // ✅ Apply theme + density globally
      applyGravitasGlobals(context.globals);

      // ✅ DO NOT WRAP DOCS (important for clean docs rendering)
      if (context?.viewMode === 'docs') {
        return storyFn();
      }

      const story = storyFn();

      // ✅ Wrap only Canvas stories with your design shell
      return {
        ...story,
        moduleMetadata: {
          ...(story.moduleMetadata ?? {}),
          imports: [...((story.moduleMetadata?.imports as any[]) ?? []), ShellWrapperComponent],
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
