import type { Cliente } from "../types";

export async function fetchClientes(token: string): Promise<Cliente[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/clientes`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener clientes');
  }

  return await response.json();
}
