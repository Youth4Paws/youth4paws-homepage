import { fail, redirect } from "@sveltejs/kit";
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/schema';
import { setAuthCookie, verifyPassword } from "$lib/server/auth";
import { getRedirectPage } from "$lib/common/parsing";
import { eq } from "drizzle-orm";

export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();

    const username = data.get("username")?.toString() || ""
    const password = data.get("password")?.toString() || ""

    if (username.length == 0) return fail(400, "Der Benutzername darf nicht leer sein.")
    if (password.length == 0) return fail(400, "Das Benutzername darf nicht leer sein.")

    const res = await db.select({
      id: usersTable.id,
      hash: usersTable.password,
    }).from(usersTable).where(eq(
      usersTable.name, username
    ));

    if (res.length != 1) return fail(400, "Der Benutzername oder das Kennwort ist falsch.");

    const valid = await verifyPassword(password, res[0].hash);

    if (!valid) return fail(400, "Der Benutzername oder das Kennwort ist falsch.");

    setAuthCookie(res[0].id, "remember" in data, cookies);

    redirect(303, getRedirectPage(url));
  }
}