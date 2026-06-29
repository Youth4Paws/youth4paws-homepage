export const load = async ({ locals }) => {
  return {
    // @ts-ignore
    user: locals.user 
  };
};