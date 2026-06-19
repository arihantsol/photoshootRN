import { create } from 'zustand';
import { photoshootAPI, PhotoshootResponse, PhotoshootOptions } from '../services/api';

interface GeneratedImage {
  id: string;
  url: string;
}

interface PhotoshootState {
  images: GeneratedImage[];
  loading: boolean;
  error: string | null;
  options: PhotoshootOptions | null;
  optionsLoading: boolean;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setImages: (images: GeneratedImage[]) => void;
  clearImages: () => void;

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

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setImages: (images) => set({ images }),
  clearImages: () => set({ images: [], error: null }),

  fetchOptions: async () => {
    set({ optionsLoading: true });
    try {
      const options = await photoshootAPI.fetchOptions();
      set({ options, optionsLoading: false });
    } catch (error: any) {
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

      if (response.meta.code === 200 && response.images) {
        const images = response.images.map((url, index) => ({
          id: `ps-${Date.now()}-${index}`,
          url,
        }));
        set({ images, loading: false });
        return images;
      } else {
        const errorMsg = response.meta.message || 'Generation failed';
        set({ error: errorMsg, loading: false });
        return null;
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.meta?.message || error.message || 'Failed to generate photoshoot';
      set({ error: errorMsg, loading: false });
      return null;
    }
  },
}));
