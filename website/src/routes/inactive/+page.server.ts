import { redirect } from '@sveltejs/kit';
import { getRedirectPage } from '../../lib/common/parsing';
import { verifyAuthCookie } from '../../lib/server/auth';

export async function load({ cookies, url }) {
  const user = await verifyAuthCookie(cookies);
	if (user.valid && user.user?.active) {
		redirect(303, getRedirectPage(url));
	}
}