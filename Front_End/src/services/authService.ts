import axiosInstance from '@/lib/axiosInstance';
import { useNotification } from '@/hooks/useNotification';

// const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {

  

  
  async login(email: string, password: string) {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get(`/auth/me`);
    return response.data.user;
  },

  async logout() {
    await axiosInstance.post(`/auth/logout`);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  async register(name: string, email: string, password: string, businessName: string, businessPhone: string, businessDescription?: string, businessLocation?: string) {
    const response = await axiosInstance.post(`/auth/register`, {
      name,
      email,
      password,
      businessName,
      businessPhone,
      businessDescription,
      businessLocation
    });
    return response.data;
  },

  async verifyOtp(email: string, otp: string) {
    const response = await axiosInstance.post(`/auth/verify-email`, {
      email,
      otp
    });
    return response.data;
  },

  async resendOtp(email: string) {
    const response = await axiosInstance.post(`/auth/resend-otp`, {
      email
    });
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken
    });
    return response.data;
  },

  async changePassword(currentPassword: string, newPassword: string) {

    console.log(currentPassword, newPassword)
    const response = await axiosInstance.post(`/auth/change-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  async updateProfile(name: string, businessName: string, businessPhone: string, businessDescription?: string, businessLocation?: string) {
    const response = await axiosInstance.put(`/auth/profile`, {
      name,
      businessName,
      businessPhone,
      businessDescription,
      businessLocation
    });
    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await axiosInstance.post(`/auth/forgot-password`, {
      email
    });
    return response;
  },

  async resetPassword(email: string, otp: string, newPassword: string) {
    const response = await axiosInstance.post(`/auth/reset-password`, {
      email,
      otp,
      newPassword
    });
    return response.data;
  }
};
