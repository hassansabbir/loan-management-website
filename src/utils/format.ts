/**
 * Format a number as currency
 * @param value - Number to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a date
 * @param date - Date to format (Date object or timestamp)
 * @param format - Format style (default: 'medium')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | number | string,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'en-US'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
    dateStyle: format,
  }).format(dateObj);
}

/**
 * Format a number with commas
 * @param value - Number to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted number string
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format a file size in bytes to a human-readable string
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Format a phone number to a standard format
 * @param phoneNumber - Phone number to format
 * @param format - Format pattern (default: '(XXX) XXX-XXXX')
 * @returns Formatted phone number
 */
export function formatPhoneNumber(
  phoneNumber: string,
  format: string = '(XXX) XXX-XXXX'
): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Return original if not enough digits
  if (cleaned.length < 10) return phoneNumber;
  
  // Replace X with digits
  let formatted = format;
  let digitIndex = 0;
  
  for (let i = 0; i < formatted.length; i++) {
    if (formatted[i] === 'X') {
      if (digitIndex < cleaned.length) {
        formatted = formatted.substring(0, i) + cleaned[digitIndex] + formatted.substring(i + 1);
        digitIndex++;
      }
    }
  }
  
  return formatted;
}

/**
 * Format a date as a relative time (e.g., "5 minutes ago", "2 hours ago")
 * @param date - Date to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(date: Date | number | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
}