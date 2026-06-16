import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const res = await fetch(`http://127.0.0.1:3000/api/posts?where[slug][equals]=${params.slug}&where[status][equals]=published`);
		
		if (!res.ok) {
			throw error(500, "Failed to fetch post from CMS");
		}
		
		const data = await res.json();
		
		if (!data.docs || data.docs.length === 0) {
			throw error(404, 'Post not found');
		}
		
		return {
			post: data.docs[0]
		};
	} catch (e) {
		console.error("Error fetching post:", e);
		throw error(404, 'Post not found');
	}
};
