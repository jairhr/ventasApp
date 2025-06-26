// MenuSidebar.tsx
import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';

interface MenuSidebarProps {
  onNavigate?: () => void;
}

export const MenuSidebar = ({ onNavigate }: MenuSidebarProps) => {
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const items = [
    { label: 'Dashboard', icon: 'pi pi-home', command: () => go('/dashboard') },
    { label: 'Clientes', icon: 'pi pi-users', command: () => go('/clientes') },
    { label: 'Ventas', icon: 'pi pi-shopping-cart', command: () => go('/ventas') },
    { label: 'Productos', icon: 'pi pi-box', command: () => go('/productos') },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.removeItem('auth-storage');
        go('/login');
      }
    }
  ];

  return <PanelMenu model={items} className="w-full" />;
};
