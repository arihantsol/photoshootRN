import { create } from 'zustand';
import photoshootAPI from '../services/photoshootAPI';

interface GeneratedImage {
  id: string;
  url: string;
}

interface AppSettings {
  aiProvider: string;
  enhancePrompt: boolean;
}

interface PhotoshootState {
  images: GeneratedImage[];
  loading: boolean;
  error: string | null;
  options: any | null;
  optionsLoading: boolean;
  appSettings: AppSettings;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setImages: (images: GeneratedImage[]) => void;
  clearImages: () => void;
  setAppSettings: (settings: Partial<AppSettings>) => void;

  // Async actions
  fetchOptions: () => Promise<void>;
  generatePhotoshoot: (payload: any) => Promise<GeneratedImage[] | null>;
}

export const usePhotoshootStore = create<PhotoshootState>((set, get) => ({
  images: [],
  loading: false,
  error: null,
  options: null,
  optionsLoading: false,
  appSettings: {
    aiProvider: 'openai',
    enhancePrompt: false,
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setImages: (images) => set({ images }),
  clearImages: () => set({ images: [], error: null }),
  setAppSettings: (settings) =>
    set((state) => ({
      appSettings: { ...state.appSettings, ...settings },
    })),

  fetchOptions: async () => {
    set({ optionsLoading: true });
    try {
      const response = await photoshootAPI.getPhotoshootOptions();
      console.log('Store fetchOptions response:', response);

      // API returns {meta: {...}, options: {...}}
      if (response.meta?.code === 200 && response.options) {
        console.log('Setting options:', response.options);
        set({ options: response.options, optionsLoading: false });
      } else {
        set({
          error: response.meta?.message || 'Failed to load options',
          optionsLoading: false,
        });
      }
    } catch (error: any) {
      console.error('Store fetchOptions error:', error);
      set({
        error: error.message || 'Failed to load options',
        optionsLoading: false,
      });
    }
  },

  generatePhotoshoot: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await photoshootAPI.generatePhotoshoot(payload);

      if (response.success && response.data?.images) {
        const images = response.data.images.map((url, index) => ({
          id: `ps-${Date.now()}-${index}`,
          url,
        }));
        set({ images, loading: false });
        return images;
      } else {
        const errorMsg = response.message || 'Generation failed';
        set({ error: errorMsg, loading: false });
        return null;
      }
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to generate photoshoot';
      set({ error: errorMsg, loading: false });
      return null;
    }
  },
}));
