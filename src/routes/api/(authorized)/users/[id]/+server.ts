import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { checkUserPermissions } from "$lib/common/permissions";
import { db } from "$lib/server/db";
import { permissionsTable, usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { Permission } from "$lib/types/permissions";
import { isValidUUID } from "$lib/common/validation";
import { and } from "drizzle-orm";

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user account
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the user account to delete
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Malformed ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User does not exist
 */
export const DELETE: RequestHandler = async ({ locals, params }: RequestEvent) => {
  if (!checkUserPermissions([ Permission.ManageUsers ], locals.permissions)) return error(401);

  // Check if the supplied ID is a valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // Fetch target user
  const targetUser = await db.select({
    id: usersTable.id,
    isAdmin: permissionsTable.permission
  }).from(usersTable).where(eq(
    usersTable.id, params.id
  )).leftJoin(permissionsTable, and(
    eq(permissionsTable.userId, usersTable.id),
    eq(permissionsTable.permission, Permission.Admin)
  ));

  // If the user does not exist, fail
  if (targetUser.length == 0) return error(404, "Specified user does not exsit.");

  // If the user is an administrator, only they can delete their own account.
  if (targetUser[0].isAdmin !== null && locals.user?.id !== targetUser[0].id) return error(401);

  // Delete the user account
  await db.delete(usersTable).where(eq(usersTable.id, targetUser[0].id));

  return json({ message: "ok" });
}