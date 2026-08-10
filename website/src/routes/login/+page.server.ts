import { fail, redirect } from "@sveltejs/kit";
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/schema';
import { getRedirectPage } from "$lib/common/parsing";
import { eq } from "drizzle-orm";
import { permissionsTable } from "$lib/server/schema";
import { Permission } from "$lib/types/permissions";

export const load = async ({ locals, url }) => {
  const session = await locals.auth();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const subject = session?.user?.id;
  if (!session || !name || !email || !subject) return;

  await db.transaction(async (tx) => {
    // Check if user already exists in the database
    const rows = (await db.select({ id: usersTable.id, active: usersTable.active }).from(usersTable).where(eq(usersTable.oidcSubject, subject)).limit(1));
    let userEntry = rows.length === 1 ? rows[0] : null;

    // If the user entry does not yet exist, create it
    if (!userEntry) {
      // Check if first user
      const firstUser = (await db.select().from(usersTable).limit(1)).length == 0;

      // Create user
      const resp = await db.insert(usersTable).values({
        oidcSubject: subject,
        name: name,
        email: email,
        active: true
      }).returning({
        id: usersTable.id,
        active: usersTable.active,
      });
      if (resp.length !== 0) userEntry = resp[0];
      if (!userEntry) {
        tx.rollback();
        return fail(500, "Es ist ein Fehler aufgetreten.")
      }

      // Make administrator if first user
      if (firstUser) {
        if (!await db.insert(permissionsTable).values({
          userId: userEntry.id,
          permission: Permission.Admin,
        }).then(() => true).catch(() => false)) {
          tx.rollback();
          return fail(500, "Es ist ein Fehler aufgetreten.")
        }
      }
    } else {
      // Update the name and email entries if they changed upstream
      db.update(usersTable).set({
        name: name,
        email: email
      }).where(eq(usersTable.id, userEntry.id));
    }

    // Redirect
    redirect(303, getRedirectPage(url));
  });
};