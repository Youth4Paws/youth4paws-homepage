import type { Handle } from "@sveltejs/kit";
import { getRedirectPage } from "./lib/common/parsing";
import "dotenv/config"
import { verifyAuthCookie } from "./lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
  const user = await verifyAuthCookie(event.cookies);
  const currentUrl = new URL(event.request.url)
  const redirectUrl = getRedirectPage(currentUrl)

  if (["/login", "/register"].some(x => currentUrl.pathname.startsWith(x))) {
    if (user.valid) {
      if (user.user?.active) {
        return new Response(null, {
          status: 302,
          headers: {
            location: redirectUrl,
          },
        })
      } else {
        return new Response(null, {
          status: 302,
          headers: {
            location: `/inactive?redirect=${encodeURIComponent(redirectUrl)}`,
          },
        })
      }
    }
  } else if (["/inactive"].some(x => currentUrl.pathname.startsWith(x))) {
    if (!user.valid) {
      return new Response(null, {
        status: 302,
        headers: {
          location: "/login",
        },
      })
    } else if (user.user?.active) {
      return new Response(null, {
        status: 302,
        headers: {
          location: redirectUrl,
        },
      })
    }
  } else if (["/dashboard"].some(x => currentUrl.pathname.startsWith(x))) {
    if (!user.valid) {
      return new Response(null, {
        status: 302,
        headers: {
          location: `/login?redirect=${encodeURIComponent(currentUrl.pathname)}`,
        },
      })
    } else if (!user.user?.active) {
      return new Response(null, {
        status: 302,
        headers: {
          location: `/inactive?redirect=${encodeURIComponent(currentUrl.pathname)}`,
        },
      })
    }
  }

  if (user.valid) {
    // @ts-ignore
    event.locals.loggedIn = user.valid;
    // @ts-ignore
    event.locals.user = user.user;
    // @ts-ignore
    event.locals.permissions = user.permissions;
  }

  return await resolve(event)
}