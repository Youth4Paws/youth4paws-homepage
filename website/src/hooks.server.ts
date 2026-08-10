import "dotenv/config"
import { auth, userDataHook } from "./lib/server/auth";
import { sequence } from '@sveltejs/kit/hooks';
import { createGuardHook } from 'svelte-guard';

const guards = import.meta.glob('./routes/**/-guard.*');
const guardHook = createGuardHook(guards);

const authHook = auth.handle;

export const handle = sequence(authHook, userDataHook, guardHook);
