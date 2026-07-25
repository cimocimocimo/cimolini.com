<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Section from '$lib/components/cv/Section.svelte';

	const { Story } = defineMeta({
		title: 'Section',
		component: Section,
		tags: ['autodocs'],
		// args: {
		// 			class: ['heythere', 'gooodlookin']
		// 		},
		argTypes: {
			children: { control: 'text' }
		}
	});
</script>

<Story name="Section" args={{ children: 'can I edit this???' }} />
