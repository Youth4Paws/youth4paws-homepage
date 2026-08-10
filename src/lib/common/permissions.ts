import { Permission } from "$lib/types/permissions";

export function checkUserPermissions(required: Permission[], granted: Permission[] | string[] | undefined) {
  granted = granted || [];
  return required.every(x => granted.includes(x)) || granted.includes(Permission.Admin);
}