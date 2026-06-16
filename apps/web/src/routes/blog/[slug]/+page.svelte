<script lang="ts">
	let { data } = $props<{ data: import('./$types').PageData }>();
</script>

<svelte:head>
	<title>{data.post.title} | Blog</title>
</svelte:head>

<p>
	<a href="/blog">&larr; Back to Blog</a>
</p>

<h1>{data.post.title}</h1>

{#if data.post.publishedDate}
	<p>{new Date(data.post.publishedDate).toLocaleDateString()}</p>
{/if}

{#if data.post.content && data.post.content.root && data.post.content.root.children}
	{#each data.post.content.root.children as block}
		{#if block.type === 'paragraph'}
			<p>
				{#if block.children}
					{#each block.children as child}
						{#if child.type === 'text'}
							<!-- Handle bold, italic, etc using format bitmask if needed, but basic text for now -->
							{#if child.format === 1}
								<strong>{child.text}</strong>
							{:else if child.format === 2}
								<em>{child.text}</em>
							{:else}
								{child.text}
							{/if}
						{/if}
					{/each}
				{/if}
			</p>
		{:else if block.type === 'heading'}
			{#if block.tag === 'h1'}
				<h1>
					{#if block.children}{#each block.children as child}{child.text}{/each}{/if}
				</h1>
			{:else if block.tag === 'h2'}
				<h2>
					{#if block.children}{#each block.children as child}{child.text}{/each}{/if}
				</h2>
			{:else if block.tag === 'h3'}
				<h3>
					{#if block.children}{#each block.children as child}{child.text}{/each}{/if}
				</h3>
			{/if}
		{:else if block.type === 'list'}
			{#if block.listType === 'bullet'}
				<ul>
					{#if block.children}
						{#each block.children as listItem}
							{#if listItem.type === 'listitem'}
								<li>
									{#if listItem.children}
										{#each listItem.children as child}
											{child.text || ''}
										{/each}
									{/if}
								</li>
							{/if}
						{/each}
					{/if}
				</ul>
			{:else if block.listType === 'number'}
				<ol>
					{#if block.children}
						{#each block.children as listItem}
							{#if listItem.type === 'listitem'}
								<li>
									{#if listItem.children}
										{#each listItem.children as child}
											{child.text || ''}
										{/each}
									{/if}
								</li>
							{/if}
						{/each}
					{/if}
				</ol>
			{/if}
		{/if}
	{/each}
{:else}
	<p>No content available.</p>
{/if}
