export const load = async ({ locals }) => {
  return {
    // @ts-ignore
    user: locals.user,
    // @ts-ignore
    permissions: locals.permisisons,
  };
};