import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { checkUserPermissions } from "$lib/common/permissions";
import { db } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { Permission } from "../../../types/permissions";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *       401:
 *         description: Unauthorized
 */
export const GET: RequestHandler = async ({ locals, params }: RequestEvent) => {
  // @ts-ignore
  if (!checkUserPermissions([ Permission.ManageUsers ], locals.permissions)) return error(401);

  // Get users
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    active: usersTable.active
  }).from(usersTable);

  return json({ users: users });
}