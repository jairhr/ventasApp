import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Clientes } from './pages/Clientes';
import { Productos } from './pages/Productos';
import { Ventas } from './pages/Ventas';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <Clientes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_OPERADOR']}>
              <Productos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventas"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <Ventas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

