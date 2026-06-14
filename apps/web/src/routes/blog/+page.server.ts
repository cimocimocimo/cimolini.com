import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Fetch published posts from the Payload CMS REST API
		const res = await fetch('http://127.0.0.1:3000/api/posts?where[status][equals]=published&sort=-publishedDate');
		
		if (!res.ok) {
			console.error("Failed to fetch posts from CMS, status:", res.status);
			return { posts: [] };
		}
		
		const data = await res.json();
		
		return {
			posts: data.docs || []
		};
	} catch (e) {
		console.error("Failed to fetch posts:", e);
		return {
			posts: []
		};
	}
};
