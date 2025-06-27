import { MainLayout } from '../components/layout/MainLayout';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';

export const Dashboard = () => {
  return (
    <MainLayout>
      <div className="flex flex-column align-items-center justify-content-center p-4 gap-4 text-center">

        {/* Icono y título */}
        <i className="pi pi-chart-line text-primary" style={{ fontSize: '3rem' }}></i>
        <h2 className="text-2xl md:text-3xl font-semibold">Bienvenido al Panel de Ventas</h2>
        <p className="text-base md:text-lg text-color-secondary max-w-30rem">
          Gestiona tus clientes, productos y ventas desde un solo lugar. También puedes visualizar el rendimiento general.
        </p>

        <Divider className="w-12rem" />

        {/* Cards en grid responsive */}
        <div className="grid w-full md:max-w-30rem">
          <div className="col-12 md:col-4">
            <Card title="Clientes" className="text-center shadow-2">
              <i className="pi pi-users text-2xl text-primary mb-2"></i>
              <p>Gestiona tus clientes</p>
            </Card>
          </div>
          <div className="col-12 md:col-4">
            <Card title="Ventas" className="text-center shadow-2">
              <i className="pi pi-shopping-cart text-2xl text-primary mb-2"></i>
              <p>Consulta y registra ventas</p>
            </Card>
          </div>
          <div className="col-12 md:col-4">
            <Card title="Productos" className="text-center shadow-2">
              <i className="pi pi-box text-2xl text-primary mb-2"></i>
              <p>Administra el inventario</p>
            </Card>
          </div>
        </div>

        <Message severity="info" text="Puedes revisar las estadísticas para ver al cliente con mayores ingresos." />
      </div>
    </MainLayout>
  );
};
