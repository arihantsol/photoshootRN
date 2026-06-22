import ImageResizer from 'react-native-image-resizer';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

interface ResizedImageResult {
  path: string;
  uri: string;
  width: number;
  height: number;
  size: number;
}

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const QUALITY = 80;

export const imageProcessor = {
  /**
   * Resize and compress image
   */
  async resizeImage(imagePath: string): Promise<ResizedImageResult> {
    try {
      // Get original image info
      const originalInfo = await this.getImageInfo(imagePath);
      console.log('Original image:', originalInfo);

      // Calculate new dimensions maintaining aspect ratio
      let newWidth = originalInfo.width;
      let newHeight = originalInfo.height;

      if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
        const aspectRatio = originalInfo.width / originalInfo.height;
        if (newWidth > newHeight) {
          newWidth = MAX_WIDTH;
          newHeight = Math.round(MAX_WIDTH / aspectRatio);
        } else {
          newHeight = MAX_HEIGHT;
          newWidth = Math.round(MAX_HEIGHT * aspectRatio);
        }
      }

      // Resize image
      const resizedPath = await ImageResizer.createResizedImage(
        imagePath,
        newWidth,
        newHeight,
        Platform.OS === 'ios' ? 'JPEG' : 'JPEG',
        QUALITY,
        0,
        undefined,
        false,
        { mode: 'contain', onlyScaleDown: true }
      );

      const resizedInfo = await this.getImageInfo(resizedPath.path);

      return {
        path: resizedPath.path,
        uri: resizedPath.uri,
        width: newWidth,
        height: newHeight,
        size: resizedInfo.size,
      };
    } catch (error) {
      console.error('Error resizing image:', error);
      throw error;
    }
  },

  /**
   * Get image file size and dimensions
   */
  async getImageInfo(imagePath: string): Promise<{ size: number; width: number; height: number }> {
    try {
      const stat = await RNFS.stat(imagePath);
      return {
        size: stat.size,
        width: 0,
        height: 0,
      };
    } catch (error) {
      console.error('Error getting image info:', error);
      throw error;
    }
  },

  /**
   * Convert image to base64
   */
  async imageToBase64(imagePath: string): Promise<string> {
    try {
      const base64 = await RNFS.readFile(imagePath, 'base64');
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  },

  /**
   * Get file size in MB
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  },
};

export default imageProcessor;
