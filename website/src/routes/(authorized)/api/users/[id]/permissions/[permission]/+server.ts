import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { checkUserPermissions } from "$lib/common/permissions";
import { db } from "$lib/server/db";
import { permissionsTable, usersTable } from "$lib/server/schema";
import { and, eq } from "drizzle-orm";
import { Permission } from "../../../../../../../types/permissions";
import { isValidUUID } from "$lib/common/validation";

/**
 * @swagger
 * /api/user/{id}/permissions/{permission}:
 *   put:
 *     summary: Grant a permission to a user
 *     tags:
 *       - users
 *       - permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the user account
 *       - in: permission
 *         name: permission
 *         type: string
 *         required: true
 *         description: Name of the permission to grant
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
export const PUT: RequestHandler = async ({ locals, params }: RequestEvent) => {
  // @ts-ignore
  if (!checkUserPermissions([ Permission.ManageUsers ], locals.permissions)) return error(401);

  // Check if the permission exists
  if (!(Object.values(Permission) as string[]).includes(params.permission)) return error(400, `Permission with name '${params.permission}' does not exist.`);

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

  // If the user is an administrator, only they can manage their permissions
  // @ts-ignore
  if (targetUser[0].isAdmin !== null && locals.user.id !== targetUser[0].id) return error(401);

  // Assign the permission to the user
  await db.insert(permissionsTable).values({
    userId: targetUser[0].id,
    permission: params.permission
  }).onConflictDoNothing();

  return json({ message: "ok" });
}

/**
 * @swagger
 * /api/user/{id}/permissions/{permission}:
 *   delete:
 *     summary: Revoke a permission from a user
 *     tags:
 *       - users
 *       - permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the user account
 *       - in: permission
 *         name: permission
 *         type: string
 *         required: true
 *         description: Name of the permission to revoke
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
  // @ts-ignore
  if (!checkUserPermissions([ Permission.ManageUsers ], locals.permissions)) return error(401);

  // Check if the permission exists
  if (!(Object.values(Permission) as string[]).includes(params.permission)) return error(400, `Permission with name '${params.permission}' does not exist.`);

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

  // If the user is an administrator, only they can manage their permissions
  // @ts-ignore
  if (targetUser[0].isAdmin !== null && locals.user.id !== targetUser[0].id) return error(401);

  // Assign the permission to the user
  await db.delete(permissionsTable).where(and(
    eq(permissionsTable.userId, targetUser[0].id),
    eq(permissionsTable.permission, params.permission)
  ));

  return json({ message: "ok" });
}