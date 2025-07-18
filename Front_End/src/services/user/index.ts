import axiosInstance from "@/lib/axiosInstance";
import { 
  User, 
  CreateUserDto, 
  UpdateUserDto, 
  LoginDto, 
  AuthResponse,
  UsersResponse
} from '@/type';

const userService = {
  // Register a new user
  async register(userData: CreateUserDto): Promise<User> {
    const response = await axiosInstance.post(`auth/users/register`, userData);
    return response.data;
  },

  // Login user
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await axiosInstance.post(`auth/users/login`, credentials);
    return response.data;
  },

  // Get all users
  async getUsers(): Promise<User[]> {
    const response = await axiosInstance.get(`auth/users`);
    return response.data.users;
  },

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const response = await axiosInstance.get(`auth/users/${id}`);
    return response.data;
  },

  // Update user
  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const response = await axiosInstance.put(`auth/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await axiosInstance.delete(`auth/users/${id}`);
  },

  // Set auth token for authenticated requests
  setAuthToken(token: string): void {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  // Remove auth token
  removeAuthToken(): void {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default userService; 