import type { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { MenuSidebar } from '../MenuSidebar';
import { useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-column min-h-screen">

      {/* Navbar */}
      <header className="flex justify-content-between align-items-center px-4 py-3 shadow-2 bg-primary text-white z-5">
        <div className="flex align-items-center gap-2">
          <Button
            icon="pi pi-bars"
            className="p-button-text p-button-plain md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
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

      {/* Content wrapper */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className={`
          bg-white w-16rem shadow-2 p-3
          fixed md:static top-0 left-0 h-full
          z-3 transition-transform transition-duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <MenuSidebar />
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black-alpha-50 z-2 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-top-1 surface-border text-center py-2 text-sm text-color-secondary">
        © {new Date().getFullYear()} ventas sv
      </footer>
    </div>
  );
};
