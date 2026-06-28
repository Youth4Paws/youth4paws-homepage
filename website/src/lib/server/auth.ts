import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import { usersTable } from '$lib/server/schema';
import { db } from "./db";
import { eq } from "drizzle-orm";

const argon2Options = {
  hashLength: 32,
  timeCost: 3,
  memoryCost: 64 * 1024,
  parallelism: 4,
  type: argon2.argon2id
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function hashPassword(password: string) {
  return argon2.hash(password, argon2Options);
}

export function verifyPassword(password: string, hash: string) {
  return argon2.verify(hash, password);
}

function createToken(id: number) {
  return jwt.sign({ id: id }, JWT_SECRET)
}

async function verifyToken(token: string): Promise<number> {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof(decoded) !== "object" || !("id" in decoded) || !Number.isInteger(decoded.id)) throw "Improper JWT payload";
  return decoded.id;
}

export async function setAuthCookie(id: number, remember: boolean, cookies: Cookies) {
  const opts = {
    path: "/",
    httpOnly: false,
    maxAge: undefined as number | undefined,
    sameSite: "lax" as boolean | "strict" | "lax" | "none",
    secure: !(process.env.PUBLIC_URL?.startsWith("http://") || false),
  };

  if (remember) {
    opts.maxAge = COOKIE_MAX_AGE;
  }

  cookies.set("tokenPresent", "true", opts);
  opts.httpOnly = true;
  cookies.set("token", createToken(id), opts);
}

export async function verifyAuthCookie(cookies: Cookies) {
	if (!cookies.get('tokenPresent')) {
    cookies.delete("token", { path: "/" });
    return {
      valid: false,
      user: null
    }
	}

  const token = cookies.get("token");
	if (!token) {
    cookies.delete("tokenPresent", { path: "/" });
    return {
      valid: false,
      user: null
    }
	}

  const decodedId = await verifyToken(token).catch(() => null);
  if (decodedId === null) return {
    valid: false,
    user: null,
  }

  const user = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    active: usersTable.active,
  }).from(usersTable).where(eq(
    usersTable.id, decodedId
  ))

  if (user.length != 1) return {
    valid: false,
    user: null,
  }
 
  return {
    valid: true,
    user: user[0],
  };
}