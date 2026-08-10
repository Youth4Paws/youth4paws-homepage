import type { Guard } from 'svelte-guard';
import { redirect } from '@sveltejs/kit';
import { getRedirectPage } from '$lib/common/parsing';

export const guard: Guard = async ({ locals, url }) => {
  if (!locals.loggedIn) return true;
  const redirectUrl = getRedirectPage(url);
  if (locals.user?.active) return redirect(302, redirectUrl);
  return redirect(302, `/inactive?redirect=${encodeURIComponent(redirectUrl)}`);
};