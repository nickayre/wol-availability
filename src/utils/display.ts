/**
 * Converts a name to upper-case initials.
 */
export function getNameInitials(name: string): string {
  const matches = name.match(/\b\w/g);
  return matches ? matches.join('') : '';
}
