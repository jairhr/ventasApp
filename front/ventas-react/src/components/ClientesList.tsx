import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { fetchClientes } from '../api/clientes';
import type { Cliente } from '../types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';

export const ClientesList = () => {
  const token = useAuthStore(state => state.token);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetchClientes(token)
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center h-10rem">
        <ProgressSpinner />
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <Card title="Lista de Clientes" className="mt-4">
      <DataTable value={clientes} paginator rows={5} stripedRows responsiveLayout="scroll">
        <Column field="id" header="id" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="correo" header="Correo" sortable />
      </DataTable>
    </Card>
  );
};
