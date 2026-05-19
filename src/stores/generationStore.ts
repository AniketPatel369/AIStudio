import { create } from "zustand";
import { Generation, GenerationRequest, GenerationStatus } from "@/types";

interface GenerationState {
  // Current generation in progress
  currentGeneration: Partial<GenerationRequest>;
  generationStatus: GenerationStatus | null;
  generationId: string | null;
  isGenerating: boolean;

  // History
  generations: Generation[];
  isLoadingHistory: boolean;

  // Selected presets
  selectedPresets: {
    lighting: string;
    aesthetic: string;
    background: string;
    camera: string;
    colorScheme: string;
  };

  // Actions
  setCurrentGeneration: (data: Partial<GenerationRequest>) => void;
  setGenerationStatus: (status: GenerationStatus | null) => void;
  setGenerationId: (id: string | null) => void;
  setIsGenerating: (generating: boolean) => void;
  setGenerations: (generations: Generation[]) => void;
  setIsLoadingHistory: (loading: boolean) => void;
  setSelectedPreset: (category: string, presetId: string) => void;
  resetGeneration: () => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  currentGeneration: {},
  generationStatus: null,
  generationId: null,
  isGenerating: false,
  generations: [],
  isLoadingHistory: false,
  selectedPresets: {
    lighting: "",
    aesthetic: "",
    background: "",
    camera: "",
    colorScheme: "",
  },

  setCurrentGeneration: (data) =>
    set((state) => ({
      currentGeneration: { ...state.currentGeneration, ...data },
    })),
  setGenerationStatus: (generationStatus) => set({ generationStatus }),
  setGenerationId: (generationId) => set({ generationId }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGenerations: (generations) => set({ generations }),
  setIsLoadingHistory: (isLoadingHistory) => set({ isLoadingHistory }),
  setSelectedPreset: (category, presetId) =>
    set((state) => ({
      selectedPresets: { ...state.selectedPresets, [category]: presetId },
    })),
  resetGeneration: () =>
    set({
      currentGeneration: {},
      generationStatus: null,
      generationId: null,
      isGenerating: false,
      selectedPresets: {
        lighting: "",
        aesthetic: "",
        background: "",
        camera: "",
        colorScheme: "",
      },
    }),
}));
