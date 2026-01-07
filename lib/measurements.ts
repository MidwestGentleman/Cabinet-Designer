/**
 * Measurement utilities for US Imperial units (inches)
 * Handles conversion between decimal and fraction formats
 */

// Common fractions in 16ths
const FRACTIONS = [
  { value: 0, label: "0" },
  { value: 1 / 16, label: "1/16" },
  { value: 2 / 16, label: "1/8" },
  { value: 3 / 16, label: "3/16" },
  { value: 4 / 16, label: "1/4" },
  { value: 5 / 16, label: "5/16" },
  { value: 6 / 16, label: "3/8" },
  { value: 7 / 16, label: "7/16" },
  { value: 8 / 16, label: "1/2" },
  { value: 9 / 16, label: "9/16" },
  { value: 10 / 16, label: "5/8" },
  { value: 11 / 16, label: "11/16" },
  { value: 12 / 16, label: "3/4" },
  { value: 13 / 16, label: "13/16" },
  { value: 14 / 16, label: "7/8" },
  { value: 15 / 16, label: "15/16" },
];

const TOLERANCE = 0.001; // For floating point comparison

/**
 * Convert decimal inches to fraction string
 * @param decimal - Decimal value in inches
 * @returns Fraction string (e.g., "24 1/2" or "1/4")
 */
export function decimalToFraction(decimal: number): string {
  if (Math.abs(decimal) < TOLERANCE) return "0";
  
  const isNegative = decimal < 0;
  const absDecimal = Math.abs(decimal);
  const whole = Math.floor(absDecimal);
  const remainder = absDecimal - whole;
  
  // Find closest fraction
  let closestFraction = FRACTIONS[0];
  let minDiff = Math.abs(remainder - closestFraction.value);
  
  for (const frac of FRACTIONS) {
    const diff = Math.abs(remainder - frac.value);
    if (diff < minDiff) {
      minDiff = diff;
      closestFraction = frac;
    }
  }
  
  // If remainder is very close to 0, just return whole number
  if (minDiff < TOLERANCE && closestFraction.value === 0) {
    return isNegative ? `-${whole}` : `${whole}`;
  }
  
  // If remainder is very close to 1, increment whole and return
  if (Math.abs(remainder - 1) < TOLERANCE) {
    return isNegative ? `-${whole + 1}` : `${whole + 1}`;
  }
  
  // Build fraction string
  const sign = isNegative ? "-" : "";
  if (whole === 0) {
    return closestFraction.value === 0 
      ? "0" 
      : `${sign}${closestFraction.label}`;
  }
  
  if (closestFraction.value === 0) {
    return `${sign}${whole}`;
  }
  
  return `${sign}${whole} ${closestFraction.label}`;
}

/**
 * Convert fraction string to decimal inches
 * @param fraction - Fraction string (e.g., "24 1/2", "1/4", "24.5")
 * @returns Decimal value in inches
 */
export function fractionToDecimal(fraction: string): number {
  if (!fraction || fraction.trim() === "") return 0;
  
  const trimmed = fraction.trim();
  
  // Handle decimal input
  if (/^-?\d+\.?\d*$/.test(trimmed)) {
    return parseFloat(trimmed);
  }
  
  // Handle fraction input
  const isNegative = trimmed.startsWith("-");
  const absTrimmed = isNegative ? trimmed.slice(1) : trimmed;
  
  // Match patterns like "24 1/2" or "1/2"
  const wholeMatch = absTrimmed.match(/^(\d+)\s+/);
  const fractionMatch = absTrimmed.match(/(\d+)\/(\d+)$/);
  
  let whole = 0;
  if (wholeMatch) {
    whole = parseInt(wholeMatch[1], 10);
  }
  
  let numerator = 0;
  let denominator = 1;
  if (fractionMatch) {
    numerator = parseInt(fractionMatch[1], 10);
    denominator = parseInt(fractionMatch[2], 10);
  } else if (!wholeMatch) {
    // If no whole number and no fraction, try to parse as decimal
    const decimal = parseFloat(absTrimmed);
    if (!isNaN(decimal)) {
      return isNegative ? -decimal : decimal;
    }
    return 0;
  }
  
  if (denominator === 0) return 0;
  
  const result = whole + numerator / denominator;
  return isNegative ? -result : result;
}

/**
 * Format measurement for display (always as fraction)
 * @param inches - Decimal value in inches
 * @returns Formatted string (e.g., "24 1/2\"")
 */
export function formatMeasurement(inches: number): string {
  const fraction = decimalToFraction(inches);
  return `${fraction}"`;
}

/**
 * Parse user input (accepts both decimal and fraction)
 * @param input - User input string
 * @returns Decimal value in inches, or NaN if invalid
 */
export function parseMeasurement(input: string): number {
  if (!input || input.trim() === "") return NaN;
  
  const cleaned = input.trim().replace(/["']/g, ""); // Remove quotes
  const decimal = fractionToDecimal(cleaned);
  
  if (isNaN(decimal)) return NaN;
  return decimal;
}

/**
 * Round to nearest 16th of an inch
 * @param inches - Decimal value in inches
 * @returns Rounded value
 */
export function roundToNearest16th(inches: number): number {
  return Math.round(inches * 16) / 16;
}

/**
 * Validate measurement (must be positive and within reasonable bounds)
 * @param inches - Decimal value in inches
 * @param min - Minimum value (default: 0.5)
 * @param max - Maximum value (default: 96)
 * @returns True if valid
 */
export function validateMeasurement(
  inches: number,
  min: number = 0.5,
  max: number = 96
): boolean {
  return !isNaN(inches) && inches >= min && inches <= max;
}

