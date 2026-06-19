export interface GeneratedImage {
  id: string;
  url: string;
}

export interface PhotoshootPayload {
  aiProvider: string;
  frontViewImage: string;
  productName: string;
  productType: string;
  photoshootStyle: string;
  outputType: string;
  numberOfOptions: number;
  aspectRatio: string;
  watermarkType: string;
  backViewImage?: string;
  modelImage?: string;
  customPrompt?: string;
  modelType?: string;
  modelAge?: number;
  modelOrigin?: string;
  modelPose?: string;
  modelExpression?: string;
  modelBodyType?: string;
  productCount?: string;
  productAngle?: string;
  watermarkText?: string;
  backgroundType?: string;
  environmentStyle?: string;
  colorScheme?: string;
  moodTone?: string;
  lightingType?: string;
  lightDirection?: string;
  shotComposition?: string;
  cameraAngle?: string;
  depthOfField?: string;
  season?: string;
  occasion?: string;
  timeOfDay?: string;
  targetAudience?: string;
  marketSegment?: string;
  propDensity?: string;
  textureEmphasis?: string;
  materialFocus?: string;
  industryType?: string;
  brandPersonality?: string;
  [key: string]: any;
}

export interface SelectOption {
  label: string;
  value: string;
  help?: string;
  description?: string;
}

export interface PhotoshootOptions {
  options: {
    modelType: SelectOption[];
    modelOrigin: SelectOption[];
    modelBodyType: SelectOption[];
    modelPose: SelectOption[];
    modelExpression: SelectOption[];
    productCount: SelectOption[];
    productAngle: SelectOption[];
    photoshootStyle: SelectOption[];
    watermarkType: SelectOption[];
    [key: string]: any;
  };
}

export interface APIResponse<T> {
  meta: {
    code: number;
    message: string;
  };
  data?: T;
  images?: string[];
  metadata?: any;
  usage?: any;
}
