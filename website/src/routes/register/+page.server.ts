import { fail, redirect } from "@sveltejs/kit";
import { db } from '../../lib/server/db';
import { permissionsTable, usersTable } from '../../lib/server/schema';
import { hashPassword, setAuthCookie } from "../../lib/server/auth";
import { getRedirectPage } from "../../lib/common/parsing";
import { eq, or } from "drizzle-orm";
import { Permission } from "../../types/permissions";

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

    await db.transaction(async (tx) => {
      // Check if user already exists
      const exists = await db.select().from(usersTable).where(or(
        eq(usersTable.name, username),
        eq(usersTable.email, email),
      ));

      if (exists.length != 0) {
        tx.rollback();
        return fail(400, "Für diesen Benutzernamen oder E-Mail Adresse ist bereits ein Konto hinterlegt.");
      }

      const hashed = await hashPassword(password);

      // Check if first user
      const firstUser = (await db.select().from(usersTable).limit(1)).length == 0;

      // Insert user
      const res = await db.insert(usersTable).values({
        name: username,
        password: hashed,
        email: email,
        active: firstUser,
      }).returning({
        id: usersTable.id,
      }).catch(() => {
        tx.rollback();
        fail(500, "Es ist ein Fehler aufgetreten.")
      });

      if (!res || res.length != 1 || !res[0].id) return;

      // Make administrator if the first user
      if (firstUser) {
        const success = await db.insert(permissionsTable).values({
          userId: res[0].id,
          permission: Permission.Admin,
        }).then(() => true).catch(() => {
          tx.rollback();
          fail(500, "Es ist ein Fehler aufgetreten.")
          return false;
        })
        if (!success) return;
      }

      // Set cookie and redirect
      setAuthCookie(res[0].id, "remember" in data, cookies);

      redirect(303, getRedirectPage(url));
    })
  }
}