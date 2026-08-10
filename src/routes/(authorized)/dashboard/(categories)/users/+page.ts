import type { PageLoad } from "./$types";

export const load: PageLoad = ({ fetch }) => {
  return {
    usersPromise: fetch("/api/users"),
  };
}