/**
 * Truncate a string to a specified length and add ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length (default: 100)
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 */
export function truncate(
  str: string,
  maxLength: number = 100,
  suffix: string = '...'
): string {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return str.substring(0, maxLength).trim() + suffix;
}

/**
 * Convert a string to title case
 * @param str - String to convert
 * @returns Title-cased string
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert a string to kebab case (lowercase with hyphens)
 * @param str - String to convert
 * @returns Kebab-cased string
 */
export function toKebabCase(str: string): string {
  if (!str) return '';
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert a string to camel case
 * @param str - String to convert
 * @returns Camel-cased string
 */
export function toCamelCase(str: string): string {
  if (!str) return '';
  
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/[\s-_]+/g, '');
}

/**
 * Convert a string to snake case (lowercase with underscores)
 * @param str - String to convert
 * @returns Snake-cased string
 */
export function toSnakeCase(str: string): string {
  if (!str) return '';
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Generate a random string of specified length
 * @param length - Length of the random string (default: 10)
 * @param chars - Characters to use (default: alphanumeric)
 * @returns Random string
 */
export function randomString(
  length: number = 10,
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  const charsLength = chars.length;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  
  return result;
}

/**
 * Strip HTML tags from a string
 * @param html - HTML string to strip
 * @returns Plain text string
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  
  return html.replace(/<[^>]*>/g, '');
}