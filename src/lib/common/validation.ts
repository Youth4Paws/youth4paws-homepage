const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const safeTextRegex = /^[0-9a-zA-Z -?.,!]*$/

export function isValidUUID(str: string): boolean {
  return uuidRegex.test(str);
}

export function isSafeText(str: string): boolean {
  return safeTextRegex.test(str);
}

export const maxFileSize = 5 * 1024 * 1024; // 5MiB