import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { filesTable, usersTable } from "$lib/server/schema";
import { isSafeText, isValidUUID } from "$lib/common/validation";
import { eq } from "drizzle-orm";
import { checkUserPermissions } from "$lib/common/permissions";
import { Permission } from "$lib/types/permissions";

const EDITABLE_FIELDS = [
  filesTable.displayName.name,
  filesTable.description.name,
] as const;
type EditableField = typeof EDITABLE_FIELDS[number];

/**
 * @swagger
 * /api/files/{id}:
 *   head:
 *     summary: Get file headers (name, etag, modification date)
 *     tags:
 *       - files
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the file
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized (file not public and user not logged in)
 *       404:
 *         description: File does not exist
 */
export const HEAD: RequestHandler = async ({ locals, params, request }: RequestEvent) => {
  // Check if supplied ID is valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // Fetch file
  const rows = await db.select({
    id: filesTable.id,
    displayName: filesTable.displayName,
    extension: filesTable.extension,
    uploadDate: filesTable.uploadDate,
    hash: filesTable.hash,
    public: filesTable.public,
  }).from(filesTable).where(eq(filesTable.id, params.id));

  if (rows.length !== 1) return error(404, "File not found");
  const file = rows[0];

  // Check if the user is allowed to view the file
  if (!file.public && !locals.loggedIn) return error(401, "Unauthorized");

  // Return the file
  return new Response(null, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file.displayName + (file.extension ? `.${file.extension}` : "")}"`,
      "ETag": file.hash.toBase64(),
      "Last-Modified": file.uploadDate.toUTCString(),
    }
  });
}

/**
 * @swagger
 * /api/files/{id}:
 *   get:
 *     summary: Download a file
 *     tags:
 *       - files
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the file
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized (file not public and user not logged in)
 *       404:
 *         description: File does not exist
 */
export const GET: RequestHandler = async ({ locals, params, request }: RequestEvent) => {
  // Check if supplied ID is valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // Fetch file
  const rows = await db.select({
    id: filesTable.id,
    displayName: filesTable.displayName,
    extension: filesTable.extension,
    uploadDate: filesTable.uploadDate,
    content: filesTable.content,
    hash: filesTable.hash,
    public: filesTable.public,
  }).from(filesTable).where(eq(filesTable.id, params.id));

  if (rows.length !== 1) return error(404, "File not found");
  const file = rows[0];

  // Check if the user is allowed to view the file
  if (!file.public && !locals.loggedIn) return error(401, "Unauthorized");

  // Return the file
  return new Response(Buffer.from(file.content), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file.displayName + (file.extension ? `.${file.extension}` : "")}"`,
      "ETag": file.hash.toBase64(),
      "Last-Modified": file.uploadDate.toUTCString(),
    }
  });
}

/**
 * @swagger
 * /api/files/{id}:
 *   patch:
 *     summary: Update file name/description
 *     tags:
 *       - files
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the file
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized (neither file owner nor admin)
 *       404:
 *         description: File does not exist
 *       500:
 *         description: File could not be deleted
 */
export const DELETE: RequestHandler = async ({ locals, params }: RequestEvent) => {
  // Check if supplied ID is valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // Fetch file
  const rows = await db.select({
    uploader: filesTable.uploader
  }).from(filesTable).where(eq(filesTable.id, params.id));

  if (rows.length !== 1) return error(404, "File not found");
  const file = rows[0];

  // Check if the user is allowed to delete the file
  if (file.uploader !== locals.user?.id && !checkUserPermissions([ Permission.Admin ], locals.permissions)) return error(401, "Unauthorized");

  // Delete the file
  const deletedRows = await db.delete(filesTable).where(eq(filesTable.id, params.id)).returning();
  if (deletedRows.length === 0) return error(500, "Could not delete file");

  // Success
  return json({ message: "ok" });
}

/**
 * @swagger
 * /api/files/{id}:
 *   delete:
 *     summary: Delete a file
 *     tags:
 *       - files
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         format: uuid
 *         required: true
 *         description: ID of the file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized (neither file owner nor admin)
 *       404:
 *         description: File does not exist
 *       500:
 *         description: File could not be modified
 */
export const PATCH: RequestHandler = async ({ locals, request, params }: RequestEvent) => {
  // Check if supplied ID is valid UUID
  if (!isValidUUID(params.id)) return error(400, `Invalid UUID '${params.id}'.`);

  // Request must contain a valid request body
  if (!request.headers.get("Content-Type")?.startsWith("multipart/form-data")) return error(400, "Must pass a form body.");

  // Fetch file
  const rows = await db.select({
    name: filesTable.displayName,
    desc: filesTable.description,
    uploader: filesTable.uploader
  }).from(filesTable).where(eq(filesTable.id, params.id));

  if (rows.length !== 1) return error(404, "File not found");
  const file = rows[0];

  // Check if the user is allowed to update the file
  if (file.uploader !== locals.user?.id && !checkUserPermissions([ Permission.Admin ], locals.permissions)) return error(401, "Unauthorized");

  // Parse values
  const form = await request.formData();
  const updates: Partial<Record<EditableField, string>> = {};

  const newName = form.get("name");
  const newDesc = form.get("description");

  if (newName !== null && newName !== file.name && typeof newName === "string") {
    if (!isSafeText(newName) || newName.trim().length === 0) return error(400, "Invalid display name");
    updates.displayName = newName;
  }
  if (newDesc !== null && newDesc !== file.desc && typeof newDesc === "string") {
    if (!isSafeText(newDesc)) return error(400, "Invalid description");
    updates.description = newDesc;
  }

  // Modify file
  const affectedRows = await db.update(filesTable).set(updates).where(eq(filesTable.id, params.id)).returning();
  if (affectedRows.length === 0) return error(500, "Could not modify file");

  // Success
  return json({ message: "ok" });
}