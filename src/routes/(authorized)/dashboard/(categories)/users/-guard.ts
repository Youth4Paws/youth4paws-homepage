import type { Guard } from 'svelte-guard';
import { checkUserPermissions } from '$lib/common/permissions';
import { Permission } from '$lib/types/permissions';

export const guard: Guard = async ({ locals }) => {
  return checkUserPermissions([ Permission.ManageUsers ], locals.permissions);
};