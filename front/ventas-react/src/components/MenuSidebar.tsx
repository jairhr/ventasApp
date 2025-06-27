import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import classNames from 'classnames';

interface MenuSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}

export const MenuSidebar = ({ collapsed = false, onToggleCollapse, onNavigate }: MenuSidebarProps) => {
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

  return (
    <div className="flex flex-column h-full">
      <Button
        icon={collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'}
        className="p-button-sm p-button-text mb-3"
        onClick={onToggleCollapse}
      />
      <div className={classNames('overflow-hidden transition-all', { 'scalein animation-duration-300': !collapsed })}>
        {!collapsed && <PanelMenu model={items} className="w-full" />}
        {collapsed && (
          <ul className="list-none m-0 p-0">
            {items.map((item, i) => (
              <li key={i} className="mb-3 text-center">
                <Button
                  icon={item.icon}
                  className="p-button-rounded p-button-text"
                  onClick={item.command}
                  tooltip={item.label}
                  tooltipOptions={{ position: 'right' }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
