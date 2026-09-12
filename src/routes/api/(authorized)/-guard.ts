import type { Guard } from 'svelte-guard';
import { error } from '@sveltejs/kit';

export const guard: Guard = async ({ locals }) => {
  if (!locals.loggedIn) return error(401, "Unauthorized");
  return true;
};