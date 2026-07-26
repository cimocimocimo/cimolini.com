<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Section from '$lib/components/cv/Section.svelte';

	const { Story } = defineMeta({
		title: 'Section',
		component: Section,
		tags: ['autodocs'],
		args: {
			class: ['some-class', 'some-other-class']
		}
	});
</script>

<Story name="Section">Some experience in the slot.</Story>
