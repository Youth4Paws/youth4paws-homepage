import { Permission } from "../../types/permissions";

export function checkUserPermissions(required: Permission[], granted: Permission[] | undefined) {
  granted = granted || [];
  return required.every(x => granted.includes(x)) || granted.includes(Permission.Admin);
}