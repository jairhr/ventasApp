import type { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-column min-h-screen surface-ground">
      {/* Navbar */}
      <div className="flex justify-content-between align-items-center px-4 py-2 shadow-2 bg-primary text-white">
        <h3 className="m-0">Ventas App</h3>
        <Button icon="pi pi-sign-out" label="Salir" severity="secondary" onClick={handleLogout} />
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 overflow-auto">
        {children}
      </div>

      {/* Footer opcional */}
      <footer className="text-center py-2 text-sm text-color-secondary">
        © {new Date().getFullYear()} ventas sv
      </footer>
    </div>
  );
};
