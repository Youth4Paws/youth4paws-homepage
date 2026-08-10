export const load = async ({ locals }) => {
  return {
    loggedIn: locals.loggedIn,
    user: locals.user,
    permissions: locals.permissions,
  };
};