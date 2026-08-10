import type { Guard } from 'svelte-guard';
import { redirect } from '@sveltejs/kit';
import { getRedirectPage } from '$lib/common/parsing';

export const guard: Guard = async ({ locals, url }) => {
  if (!locals.loggedIn) return true;
  if (!locals.user?.active) return true;
  return redirect(302, getRedirectPage(url));
};