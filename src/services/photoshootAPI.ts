import axios from 'axios';
import config from '../config';
import imageProcessor from '../utils/imageProcessor';

const API_BASE_URL = config.API_BASE_URL || 'http://api.finalbooks.local/catalogue';
const API_TIMEOUT = 120000; // 120 seconds for image generation

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
  success: boolean;
  data?: {
    images: string[];
    jobId?: string;
  };
  message?: string;
  error?: string;
}

/**
 * Process image fields in payload - resize and convert to base64
 */
async function processPayloadImages(payload: PhotoshootPayload): Promise<PhotoshootPayload> {
  const processedPayload = { ...payload };
  const imageFields = ['frontViewImage', 'backViewImage', 'modelImage'];

  for (const field of imageFields) {
    if (processedPayload[field]) {
      try {
        console.log(`Processing ${field}...`);

        // Resize image
        const resizedImage = await imageProcessor.resizeImage(processedPayload[field]);
        console.log(`${field} resized: ${imageProcessor.formatFileSize(resizedImage.size)}`);

        // Convert to base64
        const base64 = await imageProcessor.imageToBase64(resizedImage.path);
        processedPayload[field] = `data:image/jpeg;base64,${base64}`;
      } catch (error) {
        console.error(`Error processing ${field}:`, error);
        throw new Error(`Failed to process ${field}`);
      }
    }
  }

  return processedPayload;
}

export const photoshootAPI = {
  // Generate photoshoot images
  async generatePhotoshoot(payload: PhotoshootPayload): Promise<PhotoshootResponse> {
    try {
      // Process images - resize and convert to base64
      const processedPayload = await processPayloadImages(payload);

      const response = await axios.post<PhotoshootResponse>(
        `${API_BASE_URL}/accounts/finalbooksai/photoshoot`,
        processedPayload,
        {
          timeout: API_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Generate photoshoot error:', error);
      throw {
        message: error instanceof Error ? error.message : 'Failed to generate photoshoot',
        error,
      };
    }
  },

  // Get photoshoot options
  async getPhotoshootOptions(): Promise<{ success: boolean; data?: any }> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/accounts/finalbooksai/photoshoot_options`,
        {
          timeout: API_TIMEOUT,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Get photoshoot options error:', error);
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
