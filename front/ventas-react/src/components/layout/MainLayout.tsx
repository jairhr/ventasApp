import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { MenuSidebar } from '../MenuSidebar';
import { useAuthStore } from '../../store/authStore';
import type { ReactNode } from 'react';
import classNames from 'classnames';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768); // inicia según ancho actual

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Auto-colapsar cuando el ancho de ventana es menor a 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize(); // aplicar inmediatamente al cargar
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-column min-h-screen">
      {/* Navbar */}
      <header className="flex justify-content-between align-items-center px-4 py-3 shadow-2 bg-primary text-white z-5">
        <div className="flex align-items-center gap-2">
          <Button
            icon="pi pi-bars"
            className="p-button-text p-button-plain"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
          />
          <h3 className="m-0 text-xl font-medium">Ventas App</h3>
        </div>
        <Button
          icon="pi pi-sign-out"
          label="Salir"
          severity="secondary"
          className="p-button-sm"
          onClick={handleLogout}
        />
      </header>

      {/* Layout Principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={classNames(
            'bg-white shadow-2 p-3 transition-all duration-300 overflow-hidden',
            sidebarCollapsed ? 'w-5rem' : 'w-16rem'
          )}
        >
          <MenuSidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)} />
        </aside>

        {/* Contenido */}
        <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-top-1 surface-border text-center py-2 text-sm text-color-secondary">
        © {new Date().getFullYear()} ventas sv
      </footer>
    </div>
  );
};
