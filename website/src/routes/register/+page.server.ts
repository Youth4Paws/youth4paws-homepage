import { fail, redirect } from "@sveltejs/kit";
import { db } from '../../lib/server/db';
import { usersTable } from '../../lib/server/schema';
import { hashPassword, setAuthCookie } from "../../lib/server/auth";
import { getRedirectPage } from "../../lib/common/parsing";
import { eq, or } from "drizzle-orm";

export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();

    const username = data.get("username")?.toString() || ""
    const email = data.get("email")?.toString() || ""
    const password = data.get("password")?.toString() || ""
    const passwordRepeat = data.get("password-repeat")?.toString() || ""

    if (username.length == 0) return fail(400, "Der Benutzername darf nicht leer sein.")
    if (email.length == 0) return fail(400, "Die E-Mail Adresse darf nicht leer sein.")
    if (password.length == 0) return fail(400, "Das Benutzername darf nicht leer sein.")
    if (passwordRepeat != password) return fail(400, "Die Kennwörter stmimen nicht überein.")

    const exists = await db.select().from(usersTable).where(or(
      eq(usersTable.name, username),
      eq(usersTable.email, email),
    ));

    if (exists.length != 0) return fail(400, "Für diesen Benutzernamen oder E-Mail Adresse ist bereits ein Konto hinterlegt.")

    const hashed = await hashPassword(password);

    const res = await db.insert(usersTable).values({
      name: username,
      password: hashed,
      email: email,
      active: false,
    }).returning({
      id: usersTable.id,
    }).catch(() => {
      fail(500, "Es ist ein Fehler aufgetreten.")
    });

    if (!res || res.length != 1 || !res[0].id) return;

    setAuthCookie(res[0].id, "remember" in data, cookies);

    redirect(303, getRedirectPage(url));
  }
}