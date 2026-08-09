import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { checkUserPermissions } from "$lib/common/permissions";
import { db } from "$lib/server/db";
import { permissionsTable, usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { Permission } from "../../../../../types/permissions";
import { isValidUUID } from "$lib/common/validation";

/**
 * @swagger
 * /api/user/{id}/permissions:
 *   get:
 *     summary: List user permissions
 *     tags:
 *       - users
 *       - permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the user account to query
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       400:
 *         description: Malformed ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User does not exist
 */
export const GET: RequestHandler = async ({ locals, params }: RequestEvent) => {
  // @ts-ignore
  if (!checkUserPermissions([ Permission.ManageUsers ], locals.permissions)) return error(401);

  // Check if the supplied ID is a valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // Check if the user exists
  if ((await db.select().from(usersTable).where(eq(usersTable.id, params.id))).length === 0) return error(404, "The specified user does not exist.");

  // Fetch permissions
  const permissions = await db.select({
    permission: permissionsTable.permission
  }).from(permissionsTable).where(eq(
    permissionsTable.userId, params.id
  ));

  return json({ permissions: permissions.map(x => x.permission) });
}