// ═══════════════════════════════════════════════
// AIStudio Type Definitions
// ═══════════════════════════════════════════════

export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  authProvider: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  createdAt: string;
  updatedAt: string;
}

export interface UserLimit {
  id: string;
  userId: string;
  dailyGenerationCount: number;
  lastResetDate: string;
  blocked: boolean;
}

export interface Provider {
  id: string;
  name: string;
  code: string;
  enabled: boolean;
  priority: number;
  apiUrl: string;
  createdAt: string;
}

export interface AIModel {
  id: string;
  providerId: string;
  name: string;
  code: string;
  modelType: "TEXT" | "IMAGE" | "ENHANCEMENT";
  enabled: boolean;
  freeTier: boolean;
  maxResolution: string;
  supportsIpAdapter: boolean;
}

export interface Preset {
  id: string;
  category: PresetCategory;
  name: string;
  prompt: string;
  negativePrompt: string;
  thumbnail: string;
  enabled: boolean;
}

export type PresetCategory =
  | "lighting"
  | "aesthetic"
  | "background"
  | "camera"
  | "color_scheme";

export interface Generation {
  id: string;
  uuid: string;
  userId: string;
  providerId: string;
  modelId: string;
  status: GenerationStatus;
  prompt: string;
  enhancedPrompt: string;
  outputImage: string;
  inputImage: string;
  generationTime: number;
  failedReason: string | null;
  createdAt: string;
  variants: GenerationVariant[];
}

export type GenerationStatus =
  | "PENDING"
  | "PROCESSING"
  | "UPSCALING"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED";

export interface GenerationVariant {
  id: string;
  generationId: string;
  imageUrl: string;
  upscaleUrl: string;
  width: number;
  height: number;
}

export interface GenerationRequest {
  image: File;
  providerId: string;
  modelId: string;
  lightingPreset: string;
  aestheticPreset: string;
  backgroundPreset: string;
  cameraPreset: string;
  colorScheme: string;
  variants: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
  data?: T;
  timestamp: string;
}

export interface DashboardStats {
  totalGenerations: number;
  todayGenerations: number;
  remainingFree: number;
  successRate: number;
}
