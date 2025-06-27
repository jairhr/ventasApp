import type { Producto } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductos = async (token: string): Promise<Producto[]> => {
  const res = await fetch(`${BASE_URL}/api/productos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};

export const fetchProductoById = async (id: number, token: string): Promise<Producto> => {
  const res = await fetch(`${BASE_URL}/api/productos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al obtener el producto');
  return res.json();
};

export const createProducto = async (producto: Omit<Producto, 'id'>, token: string) => {
  const res = await fetch(`${BASE_URL}/api/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
};

export const updateProducto = async (id: number, producto: Omit<Producto, 'id'>, token: string) => {
  const res = await fetch(`${BASE_URL}/api/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
};

export const deleteProducto = async (id: number, token: string) => {
  const res = await fetch(`${BASE_URL}/api/productos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error al eliminar producto');
};
