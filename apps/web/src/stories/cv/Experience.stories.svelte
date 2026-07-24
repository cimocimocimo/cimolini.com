<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Experience from '$lib/components/cv/Experience.svelte';

	const { Story } = defineMeta({
		title: 'Experience',
		component: Experience
	});
</script>

<Story name="Experience">This is some experience</Story>
