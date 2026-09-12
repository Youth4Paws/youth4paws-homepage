import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { filesTable } from "$lib/server/schema";
import { isSafeText, maxFileSize } from "$lib/common/validation";
import { sha3_512 } from "@noble/hashes/sha3.js";

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: List uploaded files
 *     tags:
 *       - files
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/file'
 *       401:
 *         description: Unauthorized
 */
export const GET: RequestHandler = async ({ locals, request }: RequestEvent) => {
  // Fetch files
  return json(await db.select({
    id: filesTable.id,
    displayName: filesTable.displayName,
    extension: filesTable.extension,
    description: filesTable.description,
    uploader: filesTable.uploader,
    uploadDate: filesTable.uploadDate,
    public: filesTable.public,
  }).from(filesTable));
}

/**
 * @swagger
 * /api/files:
 *   put:
 *     summary: Upload a file
 *     tags:
 *       - files
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Missing or malformed file, filename, or description
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: File could not be inserted into the database
 */
export const PUT: RequestHandler = async ({ locals, request }: RequestEvent) => {
  // Request must contain a valid file
  if (!request.headers.get("Content-Type")?.startsWith("multipart/form-data")) return error(400, "Must pass a form body.");

  const form = await request.formData();
  if (!form.has("file")) return error(400, "Must specify a file value.");

  const file = form.get("file");
  if (!(file instanceof File)) return error(400, "Must supply a file.");

  if (file.size === 0) return error(400, "Supplied file was empty.");

  if (file.size > maxFileSize) return error(400, "Supplied file was too large.");

  if (file.name.replaceAll(".", "").length === 0) return error(400, "Filename must not be empty.");

  // Request must contain a display name
  if (!form.has("name")) return error(400, "Must specify a display name.");
  const displayName = form.get("name") as string;
  if (!isSafeText(displayName) || displayName.trim().length === 0) return error(400, "Invalid display name");

  // Request may contain a description
  const description = form.get("description") as string | null;
  if (description !== null && !isSafeText(displayName)) return error(400, "Invalid descryption");

  // Parse original file name (name.extension)
  // Could alternatively do this with a regex
  const filenameParts = file.name.split(".");
  const extension = filenameParts.length > 1 ? filenameParts.pop() : null;
  const filename = filenameParts.join(".");

  // Get file content and calculate hash
  const content = await file.arrayBuffer();
  const hash = sha3_512(new Uint8Array(content));

  // Put the file in the database
  const result = await db.insert(filesTable).values({
    uploader: locals.user?.id,
    displayName: displayName,
    originalName: filename,
    extension: extension,
    description: description,
    hash: Buffer.from(hash),
    content: Buffer.from(content),
  }).returning({
    id: filesTable.id,
  });

  // Make sure the file was inserted
  if (result.length !== 1) return error(500, "Could not upload file.")

  return json({ message: "ok", id: result[0].id });
}