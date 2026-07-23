import type { Preview } from '@storybook/sveltekit';
import StyleDecorator from './StyleDecorator.svelte';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [() => StyleDecorator]
};

export default preview;
