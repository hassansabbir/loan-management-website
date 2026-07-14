/**
 * Validate an email address
 * @param email - Email address to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validate a password strength
 * @param password - Password to validate
 * @param options - Validation options
 * @returns Object with validation result and message
 */
export function validatePassword(
  password: string,
  options = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  }
): { isValid: boolean; message: string } {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }

  if (password.length < options.minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${options.minLength} characters`,
    };
  }

  if (options.requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (options.requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  if (options.requireNumbers && !/\d/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  }

  if (
    options.requireSpecialChars &&
    !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  ) {
    return {
      isValid: false,
      message: "Password must contain at least one special character",
    };
  }

  return { isValid: true, message: "Password is valid" };
}

/**
 * Validate a phone number
 * @param phoneNumber - Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Check if the cleaned number has a valid length (10-15 digits)
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate a URL
 * @param url - URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.log(error, "Invalid URL");
    return false;
  }
}

/**
 * Validate a credit card number using Luhn algorithm
 * @param cardNumber - Credit card number to validate
 * @returns Boolean indicating if the credit card number is valid
 */
export function isValidCreditCard(cardNumber: string): boolean {
  // Remove all non-numeric characters
  const cleaned = cardNumber.replace(/\D/g, "");

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;

  // Loop through values starting from the rightmost digit
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
