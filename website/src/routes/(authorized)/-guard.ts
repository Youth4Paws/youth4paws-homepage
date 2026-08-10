import type { Guard } from 'svelte-guard';
import { redirect } from '@sveltejs/kit';

export const guard: Guard = async ({ locals, url }) => {
  if (!locals.loggedIn) return redirect(302, `/login?redirect=${encodeURIComponent(url.pathname)}`);
  return true;
};