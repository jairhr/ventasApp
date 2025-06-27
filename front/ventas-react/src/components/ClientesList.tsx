import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { fetchClientes } from '../api/clientes';
import type { Cliente } from '../types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';

export const ClientesList = () => {
  const token = useAuthStore(state => state.token);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filtroNombre, setFiltroNombre] = useState('');

  useEffect(() => {
    if (!token) return;

    setLoading(true);
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

  // Filtrar clientes por nombre
  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  );

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
      {/* Input de búsqueda */}
      <div className="mb-3 flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={e => setFiltroNombre(e.target.value)}
            className="p-inputtext-sm"
          />
        </span>
      </div>

      <DataTable
        value={clientesFiltrados}
        paginator
        rows={10}
        stripedRows
        responsiveLayout="scroll"
        sortField="nombre"
        sortOrder={1}
      >
        <Column field="id" header="ID" sortable />
        <Column field="nombre" header="Nombre" sortable />
        <Column field="correo" header="Correo" sortable />
      </DataTable>
    </Card>
  );
};
