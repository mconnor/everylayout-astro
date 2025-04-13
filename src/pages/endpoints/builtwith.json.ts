// Outputs: /builtwith.json

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
	return new Response(
		JSON.stringify({
			name: 'Astro',
			url: 'https://astro.build/',
		}),
	);
};
