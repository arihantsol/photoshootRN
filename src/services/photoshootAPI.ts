import axios, { AxiosError, AxiosResponse } from 'axios';
import Config from 'react-native-config';
import imageProcessor from '../utils/imageProcessor';

const API_BASE_URL = Config.API_BASE_URL;
const API_TIMEOUT = 120000; // 120 seconds for image generation
const AUTH_TOKEN = Config.AUTH_TOKEN || '';

interface PhotoshootPayload {
  productName: string;
  productType: string;
  photoshootStyle: string;
  outputType: string;
  aspectRatio: string;
  numberOfOptions: number;
  customPrompt?: string;
  [key: string]: any;
}

interface PhotoshootResponse {
  meta: {
    code: number;
    message: string;
  };
  data?: {
    images: string[];
    jobId?: string;
  };
}

interface OptionsResponse {
  meta: {
    code: number;
    message: string;
  };
  options: {
    [key: string]: any[];
  };
}

/**
 * Sanitize sensitive data from logs (headers and payload)
 */
function sanitizeForLogging(data: any): any {
  if (!data) return data;
  const sanitized = { ...data };
  const sensitiveKeys = ['authorization', 'Authorization', 'token', 'password', 'apikey'];

  for (const key of sensitiveKeys) {
    if (sanitized[key]) {
      const value = sanitized[key];
      const tokenPreview = typeof value === 'string' ? value.substring(0, 30) + '...' : '***REDACTED***';
      sanitized[key] = tokenPreview;
    }
  }

  return sanitized;
}

/**
 * Generate curl command from axios config for debugging (with full token)
 */
function generateCurlCommand(config: any): string {
  let curl = `curl -X ${config.method?.toUpperCase() || 'GET'}`;

  // Add headers with full token (no sanitization)
  if (config.headers) {
    for (const [key, value] of Object.entries(config.headers)) {
      curl += ` -H "${key}: ${value}"`;
    }
  }

  // Add data/payload for POST/PUT/PATCH
  if (config.data) {
    const dataString = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
    curl += ` -d '${dataString.replace(/'/g, "'\\''")}'`;
  }

  // Add URL
  curl += ` "${config.url}"`;

  return curl;
}

/**
 * Setup axios interceptors for request/response logging
 */
function setupAxiosInterceptors() {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      console.log('🚀 API REQUEST:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: sanitizeForLogging(config.headers),
        payload: sanitizeForLogging(config.data),
        timeout: config.timeout,
      });
      console.log('📋 CURL COMMAND:', generateCurlCommand(config));
      return config;
    },
    (error) => {
      console.error('❌ REQUEST ERROR:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('✅ API RESPONSE:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        headers: sanitizeForLogging(response.headers),
        data: response.data,
      });
      return response;
    },
    (error: AxiosError) => {
      console.error('❌ API ERROR:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        headers: sanitizeForLogging(error.response?.headers),
        data: error.response?.data,
        message: error.message,
      });
      return Promise.reject(error);
    }
  );
}

// Initialize interceptors
setupAxiosInterceptors();

/**
 * Get default headers with authorization
 */
function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': AUTH_TOKEN,
  };
}

/**
 * Process image fields in payload - resize and convert to base64
 */
async function processPayloadImages(payload: PhotoshootPayload): Promise<PhotoshootPayload> {
  const processedPayload = { ...payload };
  const imageFields = [
    { input: 'frontViewImage', output: 'frontViewImage' },
    { input: 'backViewImage', output: 'backViewImage' },
    { input: 'modelImage', output: 'modelImage' },
    { input: 'customModelImage', output: 'modelImage' },
    { input: 'companyLogo', output: 'logoImage' },
  ];

  for (const { input, output } of imageFields) {
    if (processedPayload[input]) {
      try {
        console.log(`Processing ${input}...`);

        // Resize image
        const resizedImage = await imageProcessor.resizeImage(processedPayload[input]);
        console.log(`${input} resized: ${imageProcessor.formatFileSize(resizedImage.size)}`);

        // Convert to base64
        const base64 = await imageProcessor.imageToBase64(resizedImage.path);
        processedPayload[output] = `data:image/jpeg;base64,${base64}`;

        // Remove original field if different from output
        if (input !== output) {
          delete processedPayload[input];
        }
      } catch (error) {
        console.error(`Error processing ${input}:`, error);
        throw new Error(`Failed to process ${input}`);
      }
    }
  }

  return processedPayload;
}

export const photoshootAPI = {
  // Generate photoshoot images
  async generatePhotoshoot(payload: PhotoshootPayload): Promise<PhotoshootResponse> {
    try {
      const url = `${API_BASE_URL}/accounts/finalbooksai/photoshoot`;
      const processedPayload = await processPayloadImages(payload);

      const response = await axios.post<PhotoshootResponse>(url, processedPayload, {
        timeout: API_TIMEOUT,
        headers: getHeaders(),
      });

      return response.data;
    } catch (error: any) {
      throw {
        message: error instanceof Error ? error.message : 'Failed to generate photoshoot',
        error,
      };
    }
  },

  // Get photoshoot options
  async getPhotoshootOptions(): Promise<OptionsResponse> {
    try {
      const url = `${API_BASE_URL}/accounts/finalbooksai/photoshoot_options`;

      const response = await axios.get(url, {
        timeout: API_TIMEOUT,
        headers: getHeaders(),
      });

      return response.data;
    } catch (error: any) {
      throw {
        message: error instanceof Error ? error.message : 'Failed to get photoshoot options',
        error,
      };
    }
  },

  // Get generation history
  async getGenerationHistory(limit: number = 10): Promise<{ success: boolean; data?: any[] }> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/accounts/finalbooksai/photoshoot?limit=${limit}`,
        {
          timeout: API_TIMEOUT,
          headers: getHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      throw {
        message: error instanceof Error ? error.message : 'Failed to get generation history',
        error,
      };
    }
  },
};

export default photoshootAPI;
