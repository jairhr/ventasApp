import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // Ej: ['ROLE_ADMIN', 'ROLE_OPERADOR']
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token);
  const roles = useAuthStore((state) => state.roles);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !roles.some(role => allowedRoles.includes(role))) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
