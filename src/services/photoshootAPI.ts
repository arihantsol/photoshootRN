import axios from 'axios';
import Config from 'react-native-config';
import imageProcessor from '../utils/imageProcessor';

const API_BASE_URL = Config.API_BASE_URL;
const API_TIMEOUT = 120000; // 120 seconds for image generation
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImJtLTIwMjYtMi1kZXZlbG9wbWVudC1hY2NvdW50aW5nIiwidGltZXN0YW1wIjoxNzgwNDY5NjczfQ.KcYtEz7h5P3UXD-b2Ftpv7SLt9oDD_sgDFq2Wlf-fps';

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
      console.log('Generating photoshoot from:', url);

      // Process images - resize and convert to base64
      const processedPayload = await processPayloadImages(payload);

      const response = await axios.post<PhotoshootResponse>(url, processedPayload, {
        timeout: API_TIMEOUT,
        headers: getHeaders(),
      });

      console.log('Photoshoot generation response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Generate photoshoot error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
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
      console.log('Fetching photoshoot options from:', url);

      const response = await axios.get(url, {
        timeout: API_TIMEOUT,
        headers: getHeaders(),
      });

      console.log('Photoshoot options response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Get photoshoot options error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
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
      console.error('Get generation history error:', error);
      throw {
        message: error instanceof Error ? error.message : 'Failed to get generation history',
        error,
      };
    }
  },
};

export default photoshootAPI;
