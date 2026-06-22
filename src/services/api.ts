import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_BASE_URL, LOG_LEVEL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - log headers and request
apiClient.interceptors.request.use(
  (config) => {
    if (LOG_LEVEL === 'debug') {
      console.group('📤 API REQUEST');
      console.log('URL:', `${config.baseURL}${config.url}`);
      console.log('Method:', config.method?.toUpperCase());
      console.log('Headers:', config.headers);
      console.log('Data:', config.data);
      console.groupEnd();
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - log response and handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (LOG_LEVEL === 'debug') {
      console.group('📥 API RESPONSE');
      console.log('URL:', response.config.url);
      console.log('Status:', response.status);
      console.log('Headers:', response.headers);
      console.log('Data:', response.data);
      console.groupEnd();
    }
    return response;
  },
  (error: AxiosError) => {
    console.group('❌ API ERROR');
    console.error('URL:', error.config?.url);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
    console.error('Error Data:', error.response?.data || error.message);
    console.groupEnd();
    return Promise.reject(error);
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
