module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-docs/preset',

    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    '@fs/storybook-addons/dist/grid/register',
    '@fs/storybook-addons/dist/locale-switcher/register',
    '@fs/storybook-addons/dist/sign-in/register',
    '@fs/storybook-addons/dist/env/register',
    '@fs/storybook-addons/dist/theme-switcher/register',
  ],
}
