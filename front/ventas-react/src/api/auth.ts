import axios from 'axios';

const API_URL = 'http://localhost:8080/venta/oms/v1/auth';

interface LoginPayload {
  username: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, payload);
  return response.data;
}