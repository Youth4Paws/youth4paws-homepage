import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  cookies.delete("token", { path: "/" });
  cookies.delete("tokenPresent", { path: "/" });
	redirect(303, "/");
}