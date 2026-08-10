export enum Permission {
	ManageUsers = "manage_users",
	ManageContent = "manage_content",
	Developer = "developer",
	Admin = "admin",
}

export const permissionNames = {
	[Permission.ManageUsers]: "Benutzerverwaltung",
	[Permission.ManageContent]: "Inhaltsverwaltung",
	[Permission.Developer]: "Entwickler",
	[Permission.Admin]: "Administrator"
}