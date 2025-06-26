import axios from 'axios';

const API_URL = 'http://localhost:8080/venta/oms/v1/auth';

interface LoginPayload {
  username: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await axios.post(`${API_URL}/login`, payload);
  return response.data;
}