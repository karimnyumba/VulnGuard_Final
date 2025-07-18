import { Business } from './business';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  business?: Business;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  businessName?: string;
  businessPhone?: string;
  businessDescription?: string;
  businessLocation?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UsersResponse {
  users: User[];
} 