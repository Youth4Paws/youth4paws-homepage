import adapter from 'svelte-adapter-bun';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({}),
	kit: {
		adapter: adapter({
			precompress: true
		})
	}
};

export default config;
