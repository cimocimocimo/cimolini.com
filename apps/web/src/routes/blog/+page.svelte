<script lang="ts">
	let { data } = $props<{ data: import('./$types').PageData }>();
</script>

<div class="max-w-4xl mx-auto py-8 px-4">
	<h1 class="text-4xl font-bold mb-8 text-slate-800">Blog</h1>

	{#if data.posts && data.posts.length > 0}
		<ul class="space-y-6 mt-8">
			{#each data.posts as post}
				<li class="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white">
					<a href="/blog/{post.slug}" class="block">
						<h2 class="text-2xl font-bold text-slate-900 mb-2">{post.title}</h2>
						{#if post.publishedDate}
							<p class="text-sm text-slate-500 mb-4">{new Date(post.publishedDate).toLocaleDateString()}</p>
						{/if}
						{#if post.content && post.content.root && post.content.root.children}
							<!-- Simple text extraction for a short excerpt -->
							<p class="text-slate-600 line-clamp-3">
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
						<span class="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors">Read more &rarr;</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
			<p class="text-lg text-slate-600">No posts found.</p>
		</div>
	{/if}
</div>
