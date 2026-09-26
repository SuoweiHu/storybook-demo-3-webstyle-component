import type { Preview } from '@storybook/react-vite'
import '../components/WebStyle/lib/sew-websites-webstyle/styles/js/src/main';
import '../components/WebStyle/lib/sew-websites-webstyle/styles/scss/export.scss';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    options: {
            storySort: {
                order: [
                    'WebStyle', ['Introduction', 'Layout', 'Text', 'Graphics', 'Components']
                ],
            },
        },
  },
};

export default preview;