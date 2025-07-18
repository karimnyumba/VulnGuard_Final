export interface Business {
  id: string;
  name: string;
  phone: string;
  description?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusinessDto {
  name: string;
  phone: string;
  description?: string;
  location?: string;
}

export interface UpdateBusinessDto {
  name?: string;
  phone?: string;
  description?: string;
  location?: string;
} 