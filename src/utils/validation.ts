export const validateFormData = (data: any) => {
  const errors: string[] = [];

  // Required fields
  if (!data.productName || !data.productName.trim()) {
    errors.push('Product name is required');
  } else if (data.productName.trim().length < 2) {
    errors.push('Product name must be at least 2 characters');
  } else if (data.productName.trim().length > 100) {
    errors.push('Product name must be less than 100 characters');
  }

  if (!data.productType) {
    errors.push('Product type is required');
  }

  if (!data.photoshootStyle) {
    errors.push('Photoshoot style is required');
  }

  if (!data.outputType) {
    errors.push('Output type is required');
  }

  if (!data.aspectRatio) {
    errors.push('Aspect ratio is required');
  }

  // Image validations
  if (!data.frontViewImage) {
    errors.push('Front view image is required');
  }

  // Model type - required for mannequin or on-human
  if ((data.outputType === 'mannequin' || data.outputType === 'on-human') && !data.modelType) {
    errors.push('Model type is required for this output type - please select from Advanced Options > Model');
  }

  // Model age validation
  if (data.modelAge && data.modelAge.toString().trim()) {
    const age = parseInt(data.modelAge);
    if (isNaN(age)) {
      errors.push('Age must be a valid number');
    } else if (age < 1 || age > 100) {
      errors.push('Age must be between 1 and 100');
    }
  }

  // Number of options validation
  if (!data.numberOfOptions || data.numberOfOptions < 1 || data.numberOfOptions > 5) {
    errors.push('Number of options must be between 1 and 5');
  }

  // Watermark validation
  if (data.watermarkType === 'text' && !data.watermarkText?.trim()) {
    errors.push('Watermark text is required when text watermark is selected');
  }

  if (data.watermarkText && data.watermarkText.length > 100) {
    errors.push('Watermark text must be less than 100 characters');
  }

  // Custom prompt validation
  if (data.customPrompt && data.customPrompt.length > 500) {
    errors.push('Custom prompt must be less than 500 characters');
  }

  return errors;
};

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
