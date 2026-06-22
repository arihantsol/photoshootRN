import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PhotoshootSettings {
  id: string;
  name: string;
  description?: string;
  settings: {
    productType: string;
    photoshootStyle: string;
    outputType: string;
    numberOfOptions: number;
    aiProvider: string;
    aspectRatio: string;
    watermarkType: string;
    // Advanced options
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
  };
  createdAt: string;
  isPreset?: boolean;
}

const SETTINGS_KEY = 'photoshoot_settings';
const PRESETS_KEY = 'photoshoot_presets';

// Default presets
const DEFAULT_PRESETS: PhotoshootSettings[] = [
  {
    id: 'preset_fashion_studio',
    name: 'Fashion - Studio',
    description: 'Clean studio lighting for fashion products',
    isPreset: true,
    settings: {
      productType: 'fashion',
      photoshootStyle: 'modern',
      outputType: 'on-human',
      numberOfOptions: 3,
      aspectRatio: '1:1',
      watermarkType: 'none',
      backgroundType: 'white',
      environmentStyle: 'studio',
      lightingType: 'studio',
      lightDirection: 'front',
      shotComposition: 'full-body',
      colorScheme: 'neutral',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'preset_jewelry_luxe',
    name: 'Jewelry - Luxury',
    description: 'Premium lighting for jewelry and accessories',
    isPreset: true,
    settings: {
      productType: 'jewelry',
      photoshootStyle: 'luxury',
      outputType: 'standalone',
      numberOfOptions: 4,
      aspectRatio: '1:1',
      watermarkType: 'none',
      lightingType: 'dramatic',
      lightDirection: 'side',
      shotComposition: 'close-up',
      depthOfField: 'shallow',
      colorScheme: 'warm',
      moodTone: 'luxury',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'preset_product_lifestyle',
    name: 'Product - Lifestyle',
    description: 'Natural lifestyle setting for products',
    isPreset: true,
    settings: {
      productType: 'home',
      photoshootStyle: 'casual',
      outputType: 'lifestyle',
      numberOfOptions: 3,
      aspectRatio: '16:9',
      watermarkType: 'none',
      environmentStyle: 'natural',
      lightingType: 'natural',
      colorScheme: 'warm',
      moodTone: 'friendly',
      timeOfDay: 'afternoon',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'preset_electronics_clean',
    name: 'Electronics - Clean',
    description: 'Minimalist style for tech products',
    isPreset: true,
    settings: {
      productType: 'electronics',
      photoshootStyle: 'minimalist',
      outputType: 'standalone',
      numberOfOptions: 2,
      aspectRatio: '1:1',
      watermarkType: 'none',
      backgroundType: 'gradient',
      environmentStyle: 'studio',
      lightingType: 'soft',
      colorScheme: 'cool',
      moodTone: 'professional',
    },
    createdAt: new Date().toISOString(),
  },
];

export const settingsStorage = {
  // Get all saved settings (user + presets)
  async getAllSettings(): Promise<PhotoshootSettings[]> {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      const presets = await AsyncStorage.getItem(PRESETS_KEY);

      let allSettings: PhotoshootSettings[] = [];

      // Add user settings
      if (saved) {
        allSettings = JSON.parse(saved);
      }

      // Add presets
      if (!presets) {
        // First time - save default presets
        await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(DEFAULT_PRESETS));
        allSettings = [...allSettings, ...DEFAULT_PRESETS];
      } else {
        allSettings = [...allSettings, ...JSON.parse(presets)];
      }

      return allSettings;
    } catch (error) {
      console.error('Error reading settings:', error);
      return DEFAULT_PRESETS;
    }
  },

  // Get only user saved settings
  async getSavedSettings(): Promise<PhotoshootSettings[]> {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error reading saved settings:', error);
      return [];
    }
  },

  // Get only presets
  async getPresets(): Promise<PhotoshootSettings[]> {
    try {
      const presets = await AsyncStorage.getItem(PRESETS_KEY);
      if (!presets) {
        // Initialize with defaults
        await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(DEFAULT_PRESETS));
        return DEFAULT_PRESETS;
      }
      return JSON.parse(presets);
    } catch (error) {
      console.error('Error reading presets:', error);
      return DEFAULT_PRESETS;
    }
  },

  // Save new settings
  async saveSettings(settings: Omit<PhotoshootSettings, 'id' | 'createdAt'>): Promise<PhotoshootSettings> {
    try {
      const newSettings: PhotoshootSettings = {
        ...settings,
        id: `setting_${Date.now()}`,
        createdAt: new Date().toISOString(),
        isPreset: false,
      };

      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      const allSettings = saved ? JSON.parse(saved) : [];
      allSettings.push(newSettings);

      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(allSettings));
      return newSettings;
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  },

  // Delete settings
  async deleteSettings(id: string): Promise<void> {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const allSettings = JSON.parse(saved);
        const filtered = allSettings.filter((s: PhotoshootSettings) => s.id !== id);
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(filtered));
      }
    } catch (error) {
      console.error('Error deleting settings:', error);
      throw error;
    }
  },

  // Update settings
  async updateSettings(id: string, updates: Partial<PhotoshootSettings>): Promise<PhotoshootSettings> {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const allSettings = JSON.parse(saved);
        const index = allSettings.findIndex((s: PhotoshootSettings) => s.id === id);
        if (index !== -1) {
          allSettings[index] = { ...allSettings[index], ...updates };
          await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(allSettings));
          return allSettings[index];
        }
      }
      throw new Error('Settings not found');
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },
};

export default settingsStorage;
