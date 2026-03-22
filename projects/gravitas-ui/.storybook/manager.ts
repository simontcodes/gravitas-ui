import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Gravitas UI',
    brandUrl: '/',
    // brandImage: '/styles/gravitas-logo.svg', // add later if you want
  }),

  showNav: true,
  showPanel: true,
  showToolbar: true,
  panelPosition: 'bottom',
});