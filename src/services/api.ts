import axios from 'axios';


export const API = axios.create({
  baseURL: 'https://fakestoreapi.com',
});


export const login = async (username: string, password: string): Promise<string> => {
  const response = await API.post<{ token: string }>('/auth/login', { username, password });
  return response.data.token;
};


export const getCategories = async (): Promise<string[]> => {
  const response = await API.get<string[]>('/products/categories');
  return response.data;
};


export const getProductsByCategory = async (category: string) => {
  const response = await API.get(`/products/category/${category}`);
  return response.data;
};


export const getProductById = async (id: string) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
