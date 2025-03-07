// src/services/api.ts
import axios from 'axios';

// 1) Crear instancia de axios
export const API = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// 2) Función para hacer login
export const login = async (username: string, password: string): Promise<string> => {
  // FakeStore requiere un POST a /auth/login con username y password
  const response = await API.post<{ token: string }>('/auth/login', { username, password });
  return response.data.token;
};

// 3) Obtener categorías
export const getCategories = async (): Promise<string[]> => {
  const response = await API.get<string[]>('/products/categories');
  return response.data;
};

// 4) Obtener productos por categoría
export const getProductsByCategory = async (category: string) => {
  const response = await API.get(`/products/category/${category}`);
  return response.data;
};

// 5) Obtener producto por ID
export const getProductById = async (id: string) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
