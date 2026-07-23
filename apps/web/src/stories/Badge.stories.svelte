<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	const { Story } = defineMeta({
		title: 'Badge',
		component: Badge
	});
</script>

<Story name="Default">Badge</Story>
<Story name="Secondary" args={{ variant: 'secondary' }}>Badge</Story>
<Story name="Destructive" args={{ variant: 'destructive' }}>Badge</Story>
<Story name="Outline" args={{ variant: 'outline' }}>Badge</Story>
<Story name="Ghost" args={{ variant: 'ghost' }}>Badge</Story>
<Story name="Link" args={{ variant: 'link', href: 'https://google.com' }}>Google</Story>
