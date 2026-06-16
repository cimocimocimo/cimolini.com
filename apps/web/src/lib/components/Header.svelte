<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<header>
	<h1>
		<a href="/">Aaron Cimolini</a>
	</h1>
	<p>Agentic Full-Stack Developer</p>

	{#if children}
		{@render children()}
	{/if}
</header>
