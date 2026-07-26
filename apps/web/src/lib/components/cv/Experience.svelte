<script lang="ts">
	let { class: className = '', children, ...restProps } = $props();
	const Tags = {
		li: 'li',
		span: 'span',
		p: 'p'
	} as const;
	type TagType = (typeof Tags)[keyof typeof Tags];
	const tag: TagType = Tags.span;
</script>

<svelte:element this={tag} {...restProps}>
	{@render children?.()}
</svelte:element>
