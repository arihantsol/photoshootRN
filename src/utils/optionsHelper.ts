import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

export interface ProcessedOptions {
  [key: string]: Array<{
    label: string;
    value: string;
    help?: string;
  }>;
}

/**
 * Process options from API response or use fallback from constants
 * @param apiOptions Options from API response
 * @returns Processed options with proper formatting
 */
export const processPhotoshootOptions = (
  apiOptions?: any
): ProcessedOptions => {
  if (!apiOptions || !apiOptions.options) {
    return PHOTOSHOOT_OPTIONS;
  }

  const result: ProcessedOptions = {};

  // Use API options if available, otherwise fall back to constants
  Object.keys(PHOTOSHOOT_OPTIONS).forEach((key) => {
    if (apiOptions.options?.[key] && Array.isArray(apiOptions.options[key])) {
      result[key] = (apiOptions.options[key] as any[]).map((opt: any) => ({
        label: opt.label,
        value: opt.value,
        help: opt.help || opt.description,
      }));
    } else {
      // Use fallback from constants
      result[key] = PHOTOSHOOT_OPTIONS[key as keyof typeof PHOTOSHOOT_OPTIONS];
    }
  });

  return result;
};

/**
 * Get options for a specific field
 * @param fieldName Name of the field
 * @param apiOptions Options from API response
 * @returns Array of options for the field
 */
export const getFieldOptions = (
  fieldName: string,
  apiOptions?: any
) => {
  const processed = processPhotoshootOptions(apiOptions);
  return processed[fieldName] || [];
};

/**
 * Get label for an option value
 * @param fieldName Name of the field
 * @param value Value to find label for
 * @param apiOptions Options from API response
 * @returns Label of the option or value if not found
 */
export const getOptionLabel = (
  fieldName: string,
  value: string,
  apiOptions?: any
): string => {
  const options = getFieldOptions(fieldName, apiOptions);
  const option = options.find((opt) => opt.value === value);
  return option?.label || value;
};

export default {
  processPhotoshootOptions,
  getFieldOptions,
  getOptionLabel,
};
