import type { Handle } from "@sveltejs/kit";
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import type { Provider } from '@auth/core/providers';
import Authentik from "@auth/core/providers/authentik";
import { JWT_SECRET, AUTHENTIK_CLIENT_ID, AUTHENTIK_CLIENT_SECRET, AUTHENTIK_URL } from "$env/static/private";
import { permissionsTable, usersTable } from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

const config: SvelteKitAuthConfig = {
  providers: [
    Authentik({
      id: "authentik",
      clientId: AUTHENTIK_CLIENT_ID,
      clientSecret: AUTHENTIK_CLIENT_SECRET,
      issuer: AUTHENTIK_URL,
    }) as Provider
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) token.id = profile.sub;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    }
  },
  secret: JWT_SECRET,
  session: {
    maxAge: 1800 // 30 mins
  }
};

export const auth = SvelteKitAuth(config);

export const userDataHook: Handle = async ({ event, resolve }) => {
  const session = await event.locals.auth();
  const subject = session?.user?.id;
  if (!session || !subject) return await resolve(event);

  // Get user
  const user = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    active: usersTable.active
  }).from(usersTable).where(eq(
    usersTable.oidcSubject, subject
  ));

  if (user.length != 1) return await resolve(event);

  // Get permissions
  const permissions = await db.select({
    permission: permissionsTable.permission,
  }).from(permissionsTable).where(eq(
    permissionsTable.userId, user[0].id
  ))

  event.locals.loggedIn = true;
  event.locals.user = user[0];
  event.locals.permissions = permissions.map(x => x.permission);

  return await resolve(event);
}