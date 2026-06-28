import { redirect } from '@sveltejs/kit';
import { verifyAuthCookie } from '../../lib/server/auth';

export async function load({ cookies, url }) {
  const user = await verifyAuthCookie(cookies);
	if (!user.valid) {
    redirect(303, `/login?redirect=${encodeURIComponent(url.pathname)}`);
  }
	else if (!user.user?.active) {
    redirect(303, `/inactive?redirect=${encodeURIComponent(url.pathname)}`);
  }
}