import type { ClienteEstadistica, TotalMensual, VentaProducto } from "../types/Ventas";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTopProductos = async (token: string): Promise<VentaProducto[]> => {
  const res = await fetch(`${BASE_URL}/api/ventas/estadisticas/top3-productos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};

export const fetchMayorCliente = async (token: string): Promise<ClienteEstadistica> => {
  const res = await fetch(`${BASE_URL}/api/ventas/estadisticas/mayor-cliente`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Error al obtener cliente');
  return res.json();
};

// Aquí devuelve un objeto, no array:
export const fetchTotalMensual = async (token: string): Promise<TotalMensual> => {
  const res = await fetch(`${BASE_URL}/api/ventas/estadisticas/total-mensual`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Error al obtener ventas mensuales');
  return res.json();
};
