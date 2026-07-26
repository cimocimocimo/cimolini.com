<script lang="ts">
	import { cn } from '$lib/utils.js';
	import Experience from './Experience.svelte';
	let { class: className = [], children, ...restProps } = $props();
	const sectionClasses = ['hello', 'there', 'georgous'];
	const experience = ['this is some exp.', 'this is some more'];
</script>

<section class={cn(sectionClasses, className)} {...restProps}>
	{@render children?.()}
	{#each experience as exp}
		<Experience>{exp}</Experience>
	{/each}
</section>
