import api from "./api";
import { ApiResponse, Generation, GenerationRequest, DashboardStats } from "@/types";

export const generationService = {
  // Create a new generation
  create: async (data: FormData): Promise<ApiResponse<{ generation_id: string; status: string }>> => {
    const response = await api.post("/generations/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Get generation by ID (polling)
  getById: async (id: string): Promise<ApiResponse<Generation>> => {
    const response = await api.get(`/generations/${id}`);
    return response.data;
  },

  // Get generation history
  getHistory: async (page = 0, size = 20): Promise<ApiResponse<Generation[]>> => {
    const response = await api.get(`/generations/history`, {
      params: { page, size },
    });
    return response.data;
  },

  // Delete generation
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/generations/${id}`);
    return response.data;
  },

  // Regenerate
  regenerate: async (id: string): Promise<ApiResponse<{ generation_id: string }>> => {
    const response = await api.post(`/generations/regenerate`, { generationId: id });
    return response.data;
  },
};

export const providerService = {
  // List all providers
  getAll: async () => {
    const response = await api.get("/providers");
    return response.data;
  },

  // Get models for providers
  getModels: async () => {
    const response = await api.get("/providers/models");
    return response.data;
  },
};

export const presetService = {
  // Get all presets
  getAll: async () => {
    const response = await api.get("/presets");
    return response.data;
  },

  // Get presets by category
  getByCategory: async (category: string) => {
    const response = await api.get(`/presets/category/${category}`);
    return response.data;
  },
};

export const userService = {
  // Get profile
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Update profile
  updateProfile: async (data: { name: string }) => {
    const response = await api.put("/user/profile", data);
    return response.data;
  },

  // Get limits
  getLimits: async () => {
    const response = await api.get("/user/limits");
    return response.data;
  },
};

export const authService = {
  // Login with JWT
  login: async (token: string) => {
    const response = await api.post("/auth/login", { token });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // Get current user
  me: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export const adminService = {
  // Get all users
  getUsers: async () => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  // Get all generations
  getGenerations: async () => {
    const response = await api.get("/admin/generations");
    return response.data;
  },

  // Toggle provider
  toggleProvider: async (providerId: string) => {
    const response = await api.post("/admin/provider/toggle", { providerId });
    return response.data;
  },
};
