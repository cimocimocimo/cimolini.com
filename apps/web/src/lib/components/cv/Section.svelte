<script lang="ts">
	import { cn } from '$lib/utils.js';
	let { class: className = [], children, ...restProps } = $props();
	const sectionClasses = ['hello', 'there', 'georgous'];
</script>

<section class={cn(sectionClasses, className)} {...restProps}>
	{@render children?.()}
</section>
