import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use(async (config) => {
  // Add auth token if needed
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export interface PhotoshootPayload {
  aiProvider: string;
  frontViewImage: string; // base64
  productName: string;
  productType: string;
  photoshootStyle: string;
  outputType: string;
  numberOfOptions: number;
  aspectRatio: string;
  watermarkType: string;
  backViewImage?: string;
  modelImage?: string;
  modelType?: string;
  modelAge?: number;
  modelOrigin?: string;
  modelPose?: string;
  modelExpression?: string;
  modelBodyType?: string;
  productCount?: string;
  productAngle?: string;
  watermarkText?: string;
  customPrompt?: string;
  modelPrompt?: string;
  [key: string]: any;
}

export interface PhotoshootResponse {
  meta: {
    code: number;
    message: string;
  };
  images: string[];
  metadata?: any;
  usage?: any;
}

export interface PhotoshootOptions {
  options: {
    modelType: Array<{ label: string; value: string; help?: string }>;
    modelOrigin: Array<{ label: string; value: string; help?: string }>;
    modelBodyType: Array<{ label: string; value: string; help?: string }>;
    modelPose: Array<{ label: string; value: string; help?: string }>;
    modelExpression: Array<{ label: string; value: string; help?: string }>;
    productCount: Array<{ label: string; value: string; help?: string }>;
    productAngle: Array<{ label: string; value: string; help?: string }>;
    photoshootStyle: Array<{ label: string; value: string; help?: string }>;
    watermarkType: Array<{ label: string; value: string }>;
    [key: string]: any;
  };
}

export const photoshootAPI = {
  fetchOptions: async (): Promise<PhotoshootOptions> => {
    const response = await apiClient.get('/finalbooksai/photoshoot_options');
    return response.data;
  },

  generatePhotoshoot: async (payload: PhotoshootPayload): Promise<PhotoshootResponse> => {
    const response = await apiClient.post('/finalbooksai/photoshoot', payload);
    return response.data;
  },
};

export default apiClient;
