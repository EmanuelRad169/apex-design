import validator from 'validator';

export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') return '';
  
  // Trim whitespace
  let sanitized = input.trim();
  
  // Limit length
  sanitized = sanitized.substring(0, maxLength);
  
  // Escape HTML to prevent XSS
  sanitized = validator.escape(sanitized);
  
  return sanitized;
}

export function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function sanitizePhone(phone: string): string {
  // Keep only digits, spaces, hyphens, parentheses, and plus sign
  return phone.replace(/[^0-9\s\-\(\)\+]/g, '');
}

export function sanitizeZipCode(zipCode: string): string {
  // Keep only digits
  return zipCode.replace(/\D/g, '').substring(0, 5);
}
