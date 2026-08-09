import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "../../$types";
import { checkUserPermissions } from "$lib/common/permissions";
import { db } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { Permission } from "../../../../../types/permissions";
import { isValidUUID } from "$lib/common/validation";

/**
 * @swagger
 * /api/user/{id}/activate:
 *   post:
 *     summary: Activate user account
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the user account to activate
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
export const POST: RequestHandler = async ({ locals, params }: RequestEvent) => {
  // @ts-ignore
  if (!checkUserPermissions([ Permission.ManageUsers ], locals.permissions)) return error(401);

  // Check if the supplied ID is a valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // Fetch target user
  const targetUser = await db.select({
    id: usersTable.id,
  }).from(usersTable).where(eq(
    usersTable.id, params.id
  ));

  // If the user does not exist, fail
  if (targetUser.length == 0) return error(404, "Specified user does not exsit.");

  // Activate the user's account
  await db.update(usersTable).set({
    active: true
  }).where(eq(usersTable.id, targetUser[0].id));

  return json({ message: "ok" });
}