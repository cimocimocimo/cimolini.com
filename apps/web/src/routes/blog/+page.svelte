<script lang="ts">
	let { data } = $props<{ data: import('./$types').PageData }>();
</script>

<h2>Blog</h2>

{#if data.posts && data.posts.length > 0}
	<ul>
		{#each data.posts as post}
			<li>
				<a href="/blog/{post.slug}">
					<h2>{post.title}</h2>
					{#if post.publishedDate}
						<p>{new Date(post.publishedDate).toLocaleDateString()}</p>
					{/if}
					{#if post.content && post.content.root && post.content.root.children}
						<!-- Simple text extraction for a short excerpt -->
						<p>
							{#each post.content.root.children as block}
								{#if block.type === 'paragraph' && block.children}
									{#each block.children as child}
										{#if child.type === 'text'}
											{child.text}
										{/if}
									{/each}
								{/if}
							{/each}
						</p>
					{/if}
					<span>Read more &rarr;</span>
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No posts found.</p>
{/if}
