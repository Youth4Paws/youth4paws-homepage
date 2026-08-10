// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from "$lib/types/users";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			loggedIn: boolean;
			user?: User;
			permissions?: string[];
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
