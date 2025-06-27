import { useEffect, useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuthStore } from '../store/authStore';
import { fetchTopProductos, fetchMayorCliente, fetchTotalMensual } from '../api/ventas';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const obtenerMesActual = () => {
  const fecha = new Date();
  return fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
};

export const Ventas = () => {
  const token = useAuthStore((state) => state.token);
  const [topProductos, setTopProductos] = useState<{ cantidad: number; nombre: string }[]>([]);
  const [mayorCliente, setMayorCliente] = useState<{ cliente: string; total: number } | null>(null);
  const [totalMensual, setTotalMensual] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      fetchTopProductos(token),
      fetchMayorCliente(token),
      fetchTotalMensual(token),
    ])
      .then(([productos, cliente, total]) => {
        setTopProductos(Array.isArray(productos) ? productos : []);
        setMayorCliente(cliente || null);
        setTotalMensual(total?.total ?? null);
      })
      .finally(() => setLoading(false));
  };

  const exportarEstadisticasAExcel = () => {
    const wb = XLSX.utils.book_new();

    const hojaTop = XLSX.utils.json_to_sheet(topProductos.map(p => ({
      Producto: p.nombre,
      Cantidad: p.cantidad
    })));
    XLSX.utils.book_append_sheet(wb, hojaTop, 'Top Productos');

    const hojaCliente = XLSX.utils.json_to_sheet([
      {
        Cliente: mayorCliente?.cliente ?? 'N/A',
        Total: mayorCliente?.total ?? 0
      }
    ]);
    XLSX.utils.book_append_sheet(wb, hojaCliente, 'Mayor Cliente');

    const hojaTotal = XLSX.utils.json_to_sheet([
      {
        Mes: obtenerMesActual(),
        Total: totalMensual ?? 0
      }
    ]);
    XLSX.utils.book_append_sheet(wb, hojaTotal, 'Total Mensual');

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'estadisticas_ventas.xlsx');
  };

  useEffect(() => {
    loadData();
  }, [token]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-content-center align-items-center h-10rem">
          <ProgressSpinner />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 flex flex-column gap-5">
        <div className="flex flex-column md:flex-row gap-4">
          <div className="flex-1">
            <Card className="shadow-2" title="Top 3 Productos más vendidos">
              <ul className="list-none p-0 m-0">
                {topProductos.map((p, i) => (
                  <li
                    key={p.nombre}
                    className={`flex align-items-center gap-3 mb-3 ${
                      i === 0 ? 'font-bold text-lg text-primary' : ''
                    }`}
                  >
                    <span className="pi pi-tags text-xl"></span>
                    <span>
                      {p.nombre} — <strong>{p.cantidad}</strong> ventas
                    </span>
                  </li>
                ))}
              </ul>
              <Divider />
              <small className="text-color-secondary">
                Productos más populares en las últimas ventas.
              </small>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="shadow-2" title="Cliente con Mayor Compra">
              <div className="flex flex-column align-items-center">
                <i className="pi pi-user text-6xl text-primary mb-3"></i>
                <h3 className="m-0">{mayorCliente?.cliente}</h3>
                <p className="text-xl font-semibold mt-1">
                  ${mayorCliente?.total.toLocaleString()}
                </p>
                <small className="text-color-secondary">Compras totales registradas</small>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <Card className="shadow-2" title={`Total de Ventas - ${obtenerMesActual()}`}>
            <div
              className="flex flex-column align-items-center justify-content-center"
              style={{ minHeight: '10rem' }}
            >
              <i className="pi pi-dollar text-7xl text-success mb-4"></i>
              <h2 className="text-4xl font-bold">${totalMensual?.toLocaleString() ?? '0.00'}</h2>
              <small className="text-color-secondary">Ingresos totales del mes actual</small>
            </div>
          </Card>
        </div>

        <div className="flex justify-content-center gap-3">
          <Button
            icon="pi pi-refresh"
            label="Actualizar datos"
            onClick={loadData}
            className="p-button-text"
          />
          <Button
            icon="pi pi-file-excel"
            label="Exportar a Excel"
            onClick={exportarEstadisticasAExcel}
            className="p-button-success"
          />
        </div>
      </div>
    </MainLayout>
  );
};
