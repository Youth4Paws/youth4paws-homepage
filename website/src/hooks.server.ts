import type { Handle } from "@sveltejs/kit";
import { getRedirectPage } from "./lib/common/parsing";
import "dotenv/config"
import { verifyAuthCookie } from "./lib/server/auth";
import { sequence } from '@sveltejs/kit/hooks';
import { createGuardHook } from 'svelte-guard';

const guards = import.meta.glob('./routes/**/-guard.*');
const guardHook = createGuardHook(guards);

const authCookieHook: Handle = async ({ event, resolve }) => {
  const user = await verifyAuthCookie(event.cookies);

  if (user.valid && user.user != null) {
    event.locals.loggedIn = user.valid;
    event.locals.user = user.user;
    event.locals.permissions = user.permissions;
  }

  return await resolve(event)
}

export const handle = sequence(authCookieHook, guardHook);
