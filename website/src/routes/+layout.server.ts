export const load = async ({ locals }) => {
  return {
    // @ts-ignore
    loggedIn: locals.loggedIn,
    // @ts-ignore
    user: locals.user,
    // @ts-ignore
    permissions: locals.permissions,
  };
};