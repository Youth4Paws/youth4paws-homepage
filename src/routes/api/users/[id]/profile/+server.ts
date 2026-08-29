import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { isValidUUID } from "$lib/common/validation";

const MAX_FIELD_LENGTH = 64;

const EDITABLE_FIELDS = ["firstName", "lastName", "nickname"] as const;
type EditableField = typeof EDITABLE_FIELDS[number];

function parseValue(value: unknown): string | null {
  // invalid input -> returns null
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_FIELD_LENGTH) return null;
  return trimmed;
}

/**
 * @swagger
 * /api/user/{id}/profile:
 *   patch:
 *     summary: Update one or more of your own profile fields (firstName, lastName and/or nickname)
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of your own user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Malformed ID, or an invalid or empty set of fields
 *       401:
 *         description: Unauthorized (not logged in, or id does not match your own account)
 */
export const PATCH: RequestHandler = async ({ locals, params, request }: RequestEvent) => {
  // Check if supplied ID is valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // user can only change own attributes
  if (locals.user?.id !== params.id) return error(401);

  const body = await request.json().catch(() => null);
  if (body === null || typeof body !== "object") return error(400, "Invalid request body.");

  // if one of fields is invalid, throw error
  const updates: Partial<Record<EditableField, string>> = {};
  for (const field of EDITABLE_FIELDS) {
    if (!(field in body)) continue;
    const value = parseValue(body[field]);
    if (value === null) return error(400, `${field} must be a non-empty string of at most ${MAX_FIELD_LENGTH} characters.`);
    updates[field] = value;
  }

  if (Object.keys(updates).length === 0) return error(400, "No valid fields supplied.");

  await db.update(usersTable).set(updates).where(eq(usersTable.id, params.id));

  return json({ message: "ok" });
}
