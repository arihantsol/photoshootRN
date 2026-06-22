/**
 * Helper to convert API options format to component format
 * API returns: { value, label, description? }
 * Component expects: { value, label, help? }
 */
export const convertApiOptions = (apiOptions: any[]): any[] => {
  if (!Array.isArray(apiOptions)) return [];

  return apiOptions.map(option => ({
    value: option.value,
    label: option.label,
    help: option.description, // Convert description to help
  }));
};

/**
 * Get options from API response by key
 */
export const getOptionsByKey = (options: any, key: string): any[] => {
  if (!options || !options[key]) return [];
  return convertApiOptions(options[key]);
};

/**
 * Get single option from API response
 */
export const getOptionByValue = (options: any[], value: string): any => {
  return options.find(opt => opt.value === value);
};

export default {
  convertApiOptions,
  getOptionsByKey,
  getOptionByValue,
};
