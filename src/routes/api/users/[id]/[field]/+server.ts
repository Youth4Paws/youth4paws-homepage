import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { usersTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { isValidUUID } from "$lib/common/validation";

const MAX_FIELD_LENGTH = 64;

const EDITABLE_FIELDS = ["firstName", "lastName", "nickname"] as const;
type EditableField = typeof EDITABLE_FIELDS[number];

function isEditableField(field: string): field is EditableField {
  return (EDITABLE_FIELDS as readonly string[]).includes(field);
}

function parseValue(value: unknown): string | null {
  // invalid input -> returns null
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_FIELD_LENGTH) return null;
  return trimmed;
}

/**
 * @swagger
 * /api/user/{id}/{field}:
 *   patch:
 *     summary: Update one of your own profile fields (firstName, lastName or nickname)
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of your own user account
 *       - in: path
 *         name: field
 *         type: string
 *         enum: [firstName, lastName, nickname]
 *         required: true
 *         description: Which profile field to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Malformed ID, unknown field, or invalid value
 *       401:
 *         description: Unauthorized (not logged in, or id does not match your own account)
 */
export const PATCH: RequestHandler = async ({ locals, params, request }: RequestEvent) => {
  // Check if supplied ID is valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  const field = params.field;
  if (!isEditableField(field)) return error(400, `Unknown field '${field}'.`);

  // user can only change own attributes
  if (locals.user?.id !== params.id) return error(401);

  const body = await request.json().catch(() => null);
  if (body === null || typeof body !== "object") return error(400, "Invalid request body.");

  const value = parseValue(body.value);
  if (value === null) return error(400, "value must be a non-empty string of at most 64 characters.");

  await db.update(usersTable).set({ [field]: value }).where(eq(usersTable.id, params.id));

  return json({ message: "ok" });
}
