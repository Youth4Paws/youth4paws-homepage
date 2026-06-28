import { verifyAuthCookie } from '../lib/server/auth';

export async function load({ cookies }) {
  const user = await verifyAuthCookie(cookies);
  if (user.valid) return {
    user: user.user,
  }
}