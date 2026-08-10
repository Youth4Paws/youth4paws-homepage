import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import openapiPlugin from 'sveltekit-openapi-generator';

export default defineConfig({
	plugins: [
		openapiPlugin({
			baseSchemasPath: 'src/lib/server/schema.ts',
			debounceMs: 100,
			info: {
				"title": "Youth4Paws API",
				"version": "1.0.0",
			}
		}),
		sveltekit()
	],
	server: {
		port: 8080
	},
	optimizeDeps: {
		exclude: [
			"svelte-codemirror-editor",
			"codemirror",
			"@codemirror/lang-markdown",
		]
	}
});
