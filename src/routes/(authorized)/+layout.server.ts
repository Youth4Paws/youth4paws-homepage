import { fail } from "@sveltejs/kit"
 
export const load = async (event) => {
  const session = await event.locals.auth()
  if (!session?.user?.id) return fail(401, "Unauthorized")
}