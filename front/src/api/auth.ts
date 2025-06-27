import axios from 'axios';

interface LoginPayload {
  username: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, payload);
  return response.data;
}